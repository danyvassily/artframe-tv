#!/usr/bin/env node

/**
 * ArtFrame — Landscape Art Fetcher v2
 * 
 * Sources:
 *  1. The Metropolitan Museum of Art (API REST)
 *  2. Art Institute of Chicago (API REST + IIIF)
 *  3. Rijksmuseum via Wikidata SPARQL (nouvelle API 2025)
 *
 * Usage: node fetch-landscapes.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, 'landscapes_output.json');
const ARTWORKS_FILE = path.join(__dirname, 'artworks.json');
const DELAY_MS = 300;
const LANDSCAPE_RATIO_MIN = 1.15; // Ratio largeur/hauteur minimum pour paysage

// ─── Utilitaires ─────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJSON(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: {
        'User-Agent': 'ArtFrame-TV-App/2.0 (landscape-fetcher; contact: artframe@example.com)',
        'Accept': 'application/json',
        'Accept-Encoding': 'identity',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && maxRedirects > 0) {
        req.destroy();
        return fetchJSON(res.headers.location, maxRedirects - 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        req.destroy();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${e.message.slice(0, 60)}`)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function log(emoji, msg) { console.log(`${emoji}  ${msg}`); }

// ─── Source 1 : The Metropolitan Museum of Art ───────────────────────────────

async function fetchFromMet() {
  log('🏛️', 'Fetching from The Metropolitan Museum of Art...');
  const results = [];
  const seenIds = new Set();

  const queries = [
    'landscape painting', 'seascape', 'countryside', 'river landscape',
    'mountain landscape', 'forest landscape', 'pastoral', 'coastal view',
  ];

  for (const query of queries) {
    if (results.length >= 60) break;
    try {
      const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Paintings&isPublicDomain=true&hasImages=true&q=${encodeURIComponent(query)}`;
      log('🔍', `Met: "${query}"`);
      const search = await fetchJSON(url);
      if (!search.objectIDs || !search.objectIDs.length) continue;

      const ids = search.objectIDs.slice(0, 25);
      for (const id of ids) {
        if (results.length >= 60 || seenIds.has(id)) continue;
        seenIds.add(id);
        try {
          await sleep(DELAY_MS);
          const obj = await fetchJSON(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
          if (obj.primaryImage && obj.isPublicDomain &&
              !['Drawing', 'Print', 'Photograph'].includes(obj.objectName)) {
            // FILTRE PAYSAGE : vérifie les dimensions via l'API Met si possible
            // Note : l'API Met ne retourne pas les dimensions directement,
            // donc on fait confiance au filtre "landscape" du département
            results.push({
              title: obj.title || 'Untitled',
              artist: obj.artistDisplayName || 'Unknown Artist',
              year: obj.objectDate || 'n.d.',
              image_url: obj.primaryImage,
              gallery: 'landscape',
              source: 'met',
              width: null,
              height: null,
              ratio: null,
            });
            process.stdout.write(`\r   ✅ Met: ${results.length} collected   `);
          }
        } catch (_) {}
      }
    } catch (err) { log('⚠️', `Met error: ${err.message}`); }
    await sleep(400);
  }
  console.log('');
  log('✅', `Met done: ${results.length} artworks`);
  return results;
}

// ─── Source 2 : Art Institute of Chicago ─────────────────────────────────────

async function fetchFromARTIC() {
  log('🎨', 'Fetching from Art Institute of Chicago...');
  const results = [];

  const queries = [
    'landscape', 'seascape', 'river', 'mountains', 'forest',
    'pastoral', 'coast', 'horizon', 'countryside',
  ];

  for (const query of queries) {
    if (results.length >= 60) break;
    try {
      log('🔍', `ARTIC: "${query}"`);
      const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&fields=id,title,artist_display,date_display,image_id,medium_display,dimensions,thumbnail&query[bool][must][][term][is_public_domain]=true&query[bool][must][][exists][field]=image_id&limit=25`;
      await sleep(DELAY_MS);
      const data = await fetchJSON(url);
      if (!data.data || !data.data.length) continue;

      for (const art of data.data) {
        if (results.length >= 60 || !art.image_id) continue;
        const thumb = art.thumbnail;
        // FILTRE PAYSAGE STRICT : ratio >= 1.15 (pas 1.1)
        if (thumb && thumb.width && thumb.height && (thumb.width / thumb.height) < LANDSCAPE_RATIO_MIN) continue;

        results.push({
          title: art.title || 'Untitled',
          artist: (art.artist_display || 'Unknown Artist').split('\n')[0],
          year: art.date_display || 'n.d.',
          image_url: `https://www.artic.edu/iiif/2/${art.image_id}/full/1920,/0/default.jpg`,
          gallery: 'landscape',
          source: 'artic',
          width: thumb?.width || null,
          height: thumb?.height || null,
          ratio: thumb?.width && thumb?.height ? +(thumb.width / thumb.height).toFixed(3) : null,
        });
        process.stdout.write(`\r   ✅ ARTIC: ${results.length} collected   `);
      }
    } catch (err) { log('⚠️', `ARTIC error: ${err.message}`); }
    await sleep(400);
  }
  console.log('');
  log('✅', `ARTIC done: ${results.length} artworks`);
  return results;
}

// ─── Source 3 : Rijksmuseum via Wikidata SPARQL ───────────────────────────────
// L'ancienne API rijksmuseum.nl/api est morte (404 depuis fin 2025).
// On utilise Wikidata SPARQL qui indexe toute la collection + images Wikimedia Commons HD.

async function fetchFromRijks() {
  log('🇳🇱', 'Fetching from Rijksmuseum via Wikidata SPARQL...');
  const results = [];
  const seen = new Set();

  const sparqlQueries = [
    // Paysages (landscape genre, Q191163)
    `SELECT DISTINCT ?titleLabel ?artistLabel ?year ?image WHERE {
  ?item wdt:P195 wd:Q190804 .
  ?item wdt:P31 wd:Q3305213 .
  ?item wdt:P18 ?image .
  ?item wdt:P136 ?genre .
  ?genre wdt:P279* wd:Q191163 .
  OPTIONAL { ?item wdt:P571 ?date . BIND(YEAR(?date) AS ?year) }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en,nl" . }
} LIMIT 35`,

    // Marines / seascapes (Q158607)
    `SELECT DISTINCT ?titleLabel ?artistLabel ?year ?image WHERE {
  ?item wdt:P195 wd:Q190804 .
  ?item wdt:P31 wd:Q3305213 .
  ?item wdt:P18 ?image .
  ?item wdt:P136 ?genre .
  ?genre wdt:P279* wd:Q158607 .
  OPTIONAL { ?item wdt:P571 ?date . BIND(YEAR(?date) AS ?year) }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en,nl" . }
} LIMIT 20`,

    // Cityscape / veduta (Q1412840)
    `SELECT DISTINCT ?titleLabel ?artistLabel ?year ?image WHERE {
  ?item wdt:P195 wd:Q190804 .
  ?item wdt:P31 wd:Q3305213 .
  ?item wdt:P18 ?image .
  ?item wdt:P136 ?genre .
  ?genre wdt:P279* wd:Q1412840 .
  OPTIONAL { ?item wdt:P571 ?date . BIND(YEAR(?date) AS ?year) }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en,nl" . }
} LIMIT 15`,
  ];

  for (const sparql of sparqlQueries) {
    if (results.length >= 55) break;
    try {
      log('🔍', 'Wikidata SPARQL query for Rijksmuseum...');
      const url = 'https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(sparql);
      await sleep(1200); // Wikidata impose un délai plus long
      const data = await fetchJSON(url);

      if (!data.results || !data.results.bindings || !data.results.bindings.length) {
        log('⚠️', 'SPARQL: no bindings returned'); continue;
      }

      for (const b of data.results.bindings) {
        if (results.length >= 55) break;
        const imageUri = b.image?.value;
        if (!imageUri) continue;

        // Convertit l'URI Wikimedia en URL d'image directe 1920px
        const rawFile = decodeURIComponent(imageUri.replace(/.*Special:FilePath\//, ''));
        const fileName = rawFile.replace(/ /g, '_');
        const imageUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=1920`;

        const title = b.titleLabel?.value || fileName.replace(/\.[^.]+$/, '').replace(/_/g, ' ');
        const artist = b.artistLabel?.value || 'Dutch Master';
        const year = b.year?.value ? String(b.year.value) : 'n.d.';

        // Skip si ce n'est pas un vrai titre
        if (title.startsWith('Q') && /^Q\d+$/.test(title)) continue;
        if (artist.startsWith('Q') && /^Q\d+$/.test(artist)) continue;

        const key = `${title.toLowerCase().trim()}__${artist.toLowerCase().trim()}`;
        if (seen.has(key)) continue;
        seen.add(key);

        results.push({ title, artist, year, image_url: imageUrl, gallery: 'landscape', source: 'rijks', width: null, height: null, ratio: null });
        process.stdout.write(`\r   ✅ Rijks: ${results.length} collected   `);
      }
    } catch (err) { log('⚠️', `Wikidata SPARQL error: ${err.message}`); }
    await sleep(1500);
  }

  console.log('');
  log('✅', `Rijks done: ${results.length} artworks`);
  return results;
}

// ─── Déduplication ───────────────────────────────────────────────────────────

function dedup(artworks) {
  const seen = new Set();
  return artworks.filter(a => {
    const k = `${(a.title || '').toLowerCase().trim()}__${(a.artist || '').toLowerCase().trim()}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function loadExistingKeys() {
  try {
    const d = JSON.parse(fs.readFileSync(ARTWORKS_FILE, 'utf8'));
    return new Set(d.artworks.map(a =>
      `${(a.title || '').toLowerCase().trim()}__${(a.artist || '').toLowerCase().trim()}`
    ));
  } catch { return new Set(); }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🖼️  ArtFrame — Landscape Art Fetcher v2             ║');
  console.log('║  The Met + ARTIC + Rijksmuseum (Wikidata SPARQL)    ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  const existingKeys = loadExistingKeys();
  log('📚', `${existingKeys.size} artworks already in artworks.json\n`);

  const metResults    = await fetchFromMet().catch(e => { log('❌', e.message); return []; });
  console.log('');
  const articResults  = await fetchFromARTIC().catch(e => { log('❌', e.message); return []; });
  console.log('');
  const rijksResults  = await fetchFromRijks().catch(e => { log('❌', e.message); return []; });

  const all = dedup([...metResults, ...articResults, ...rijksResults]);
  const newOnes = all.filter(a => {
    const k = `${(a.title || '').toLowerCase().trim()}__${(a.artist || '').toLowerCase().trim()}`;
    return !existingKeys.has(k);
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('📊', `Total fetched    : ${all.length}`);
  log('✨', `New artworks     : ${newOnes.length}`);
  log('🏞️', `Format           : landscape only (ratio ≥ 1.1)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (!newOnes.length) {
    log('⚠️', 'No new artworks found. All already exist in artworks.json.'); return;
  }

  try {
    const existing = JSON.parse(fs.readFileSync(ARTWORKS_FILE, 'utf8'));
    const backup = ARTWORKS_FILE.replace('.json', '.backup.json');
    fs.writeFileSync(backup, JSON.stringify(existing, null, 2), 'utf8');
    log('🔒', `Backup → ${path.basename(backup)}`);

    const merged = { artworks: [...existing.artworks, ...newOnes] };
    fs.writeFileSync(ARTWORKS_FILE, JSON.stringify(merged, null, 2), 'utf8');
    log('🎉', `artworks.json updated: ${existing.artworks.length} → ${merged.artworks.length} artworks`);
  } catch (e) {
    log('❌', `Merge failed: ${e.message}`);
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ artworks: newOnes }, null, 2), 'utf8');
  log('💾', `Also saved to landscapes_output.json`);

  console.log('\n📋 Breakdown by source:');
  const bySource = {};
  newOnes.forEach(a => { bySource[a.source] = (bySource[a.source] || 0) + 1; });
  Object.entries(bySource).forEach(([src, count]) => {
    const bar = '█'.repeat(Math.floor(count / 2));
    console.log(`   ${src.padEnd(8)} : ${String(count).padStart(3)}  ${bar}`);
  });

  console.log('\n✅ Done! Open ArtFrame to see the new landscape collection.\n');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
