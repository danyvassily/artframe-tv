#!/usr/bin/env node

/**
 * ArtFrame — Diverse Art Masters Fetcher
 * 
 * Fetches masterpieces by famous painters across Renaissance, Baroque,
 * Impressionist, and Modern eras from the Art Institute of Chicago API
 * and merges them into artworks.json.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ARTWORKS_FILE = path.join(__dirname, 'artworks.json');
const DELAY_MS = 150;
const LANDSCAPE_RATIO_MIN = 1.15;

const ARTIST_MAP = {
  // Renaissance
  'Leonardo da Vinci': 'renaissance',
  'Michelangelo': 'renaissance',
  'Raphael': 'renaissance',
  'Sandro Botticelli': 'renaissance',
  'Titian': 'renaissance',
  'Albrecht Dürer': 'renaissance',
  'Jan van Eyck': 'renaissance',
  'Hieronymus Bosch': 'renaissance',
  'Pieter Bruegel': 'renaissance',
  'Tintoretto': 'renaissance',
  'Veronese': 'renaissance',

  // Baroque
  'Rembrandt': 'baroque',
  'Vermeer': 'baroque',
  'Velázquez': 'baroque',
  'Rubens': 'baroque',
  'Caravaggio': 'baroque',
  'Frans Hals': 'baroque',
  'Jan Steen': 'baroque',
  'Poussin': 'baroque',

  // Neoclassicism / Romanticism
  'Goya': 'romanticism',
  'Delacroix': 'romanticism',
  'Caspar David Friedrich': 'romanticism',
  'Turner': 'romanticism',
  'Jacques-Louis David': 'classic',
  'Ingres': 'classic',

  // Impressionism / Post-Impressionism
  'Monet': 'impressionism',
  'Renoir': 'impressionism',
  'Degas': 'impressionism',
  'Pissarro': 'impressionism',
  'Manet': 'impressionism',
  'Van Gogh': 'postimpressionism',
  'Cézanne': 'postimpressionism',
  'Gauguin': 'postimpressionism',
  'Seurat': 'postimpressionism',
  'Toulouse-Lautrec': 'postimpressionism',

  // Modern / Expressionism / Cubism / Fauvism
  'Klimt': 'modern',
  'Munch': 'modern',
  'Matisse': 'fauvism',
  'Picasso': 'cubism',
  'Kandinsky': 'modern',
  'Klee': 'modern',
};

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'ArtFrame-TV-App/2.0 (diverse-fetcher; contact: artframe@example.com)',
        'Accept': 'application/json'
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function cleanArtistName(displayName) {
  if (!displayName) return 'Unknown Artist';
  // Extract name before parenthesis or comma or linebreaks
  let name = displayName.split('\n')[0];
  name = name.split(',')[0];
  name = name.split('(')[0];
  return name.trim();
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║  🖼️  ArtFrame — Diverse Art Masters Fetcher           ║');
  console.log('║  Renaissance, Baroque, Impressionist & Modern        ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  // Load existing artworks to prevent duplicates
  let existing = { artworks: [] };
  try {
    existing = JSON.parse(fs.readFileSync(ARTWORKS_FILE, 'utf8'));
    console.log(`📚 Loaded ${existing.artworks.length} existing artworks.`);
  } catch (e) {
    console.log('⚠️ No existing artworks.json found. Creating a new database.');
  }

  const existingKeys = new Set(
    existing.artworks.map(a => `${(a.title || '').toLowerCase().trim()}__${(a.artist || '').toLowerCase().trim()}`)
  );

  const newArtworks = [];
  const artists = Object.keys(ARTIST_MAP);
  let index = 0;

  for (const artist of artists) {
    index++;
    const gallery = ARTIST_MAP[artist];
    console.log(`\n[${index}/${artists.length}] 🔍 Fetching ${artist} (${gallery})...`);

    const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(artist)}&fields=id,title,artist_display,date_display,image_id,medium_display,dimensions,thumbnail&query[bool][must][][term][is_public_domain]=true&query[bool][must][][exists][field]=image_id&limit=40`;
    
    try {
      await sleep(DELAY_MS);
      const res = await fetchJSON(url);
      if (!res.data || !res.data.length) {
        console.log(`   ⚠️ No public domain artworks found for ${artist}`);
        continue;
      }

      let artistAdded = 0;
      for (const art of res.data) {
        if (!art.image_id) continue;
        const thumb = art.thumbnail;
        if (!thumb || !thumb.width || !thumb.height) continue;

        const ratio = thumb.width / thumb.height;
        if (ratio < LANDSCAPE_RATIO_MIN) continue; // Landscape format only

        const artistName = cleanArtistName(art.artist_display);
        const title = art.title || 'Untitled';
        const key = `${title.toLowerCase().trim()}__${artistName.toLowerCase().trim()}`;

        if (existingKeys.has(key)) continue; // Skip duplicates

        const artwork = {
          title: title,
          artist: artistName,
          year: art.date_display || 'n.d.',
          image_url: `https://www.artic.edu/iiif/2/${art.image_id}/full/1920,/0/default.jpg`,
          gallery: gallery,
          source: 'artic',
          width: thumb.width,
          height: thumb.height,
          ratio: +ratio.toFixed(3)
        };

        newArtworks.push(artwork);
        existingKeys.add(key); // Prevent duplicates in this run too
        artistAdded++;
      }

      console.log(`   ✅ Added ${artistAdded} new landscape artworks for ${artist}`);
    } catch (e) {
      console.log(`   ❌ Error fetching for ${artist}: ${e.message}`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📊 Total masterworks fetched : ${newArtworks.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (newArtworks.length === 0) {
    console.log('⚠️ No new artworks found. All fetched items are already in artworks.json.');
    return;
  }

  // Backup existing artworks.json
  try {
    const backupFile = ARTWORKS_FILE.replace('.json', '.backup-masters.json');
    fs.writeFileSync(backupFile, JSON.stringify(existing, null, 2), 'utf8');
    console.log(`🔒 Backup created at: ${path.basename(backupFile)}`);

    // Merge and save
    const merged = { artworks: [...existing.artworks, ...newArtworks] };
    fs.writeFileSync(ARTWORKS_FILE, JSON.stringify(merged, null, 2), 'utf8');
    console.log(`🎉 Success! artworks.json updated: ${existing.artworks.length} → ${merged.artworks.length} artworks.`);
  } catch (e) {
    console.log(`❌ Failed to write or backup: ${e.message}`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
