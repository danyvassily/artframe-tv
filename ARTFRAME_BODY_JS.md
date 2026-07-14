### 4.2 Body HTML (Structure de l'interface)

```html
<div class="tv-frame" id="tv-frame">

  <!-- ===== ART MODE ===== -->
  <section class="art-mode" id="art-mode">
    <div class="artwork" id="artwork-current"></div>
    <div class="vignette-overlay"></div>
    <div class="frame-overlay" id="frame-overlay"></div>
    <div class="canvas-texture" id="canvas-texture"></div>
    <div class="ambient-filter" id="ambient-filter"></div>
    <div class="pixel-shift-indicator" id="shift-indicator">PIXEL SHIFT ACTIF</div>
    <div class="timer-indicator" id="timer-indicator">Prochain changement · --:--</div>
    <div class="artwork-info" id="artwork-info">
      <div class="art-title" id="art-title"></div>
      <div class="art-artist" id="art-artist"></div>
    </div>
  </section>

  <!-- ===== BOTTOM MENU ===== -->
  <nav class="bottom-menu" id="bottom-menu">
    <button class="menu-item" data-action="gallery">
      <div class="menu-icon">
        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
      </div>
      <span>Galeries</span>
    </button>
    <button class="menu-item" data-action="frame">
      <div class="menu-icon">
        <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="0"/><rect x="4" y="6" width="16" height="12" rx="0" fill="currentColor" fill-opacity="0.15"/></svg>
      </div>
      <span>Cadre</span>
    </button>
    <button class="menu-item" data-action="slideshow">
      <div class="menu-icon">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><polyline points="12,9 12,13 15,15"/></svg>
      </div>
      <span>Diffusion</span>
    </button>
    <button class="menu-item" data-action="settings">
      <div class="menu-icon">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v3m0 16v3m-9.9-11.1h3m13.8 0h3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M4.2 19.8l2.1-2.1m11.4-11.4 2.1-2.1"/></svg>
      </div>
      <span>Paramètres</span>
    </button>
  </nav>

  <!-- ===== SIDEBAR ===== -->
  <div class="sidebar-overlay" id="sidebar-overlay"></div>
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <h2>Paramètres</h2>
      <button class="sidebar-close" id="sidebar-close">&times;</button>
    </div>
    <nav class="sidebar-nav" id="sidebar-nav">
      <button class="sidebar-nav-item" data-sub="frame">
        <span class="nav-label">Cadre</span>
        <span class="nav-value" id="nav-frame-val">Bois classique</span>
        <span class="nav-arrow">›</span>
      </button>
      <button class="sidebar-nav-item" data-sub="slideshow">
        <span class="nav-label">Minuterie</span>
        <span class="nav-value" id="nav-timer-val">15 minutes</span>
        <span class="nav-arrow">›</span>
      </button>
      <button class="sidebar-nav-item" data-sub="ambient">
        <span class="nav-label">Tonalité ambiante</span>
        <span class="nav-value" id="nav-ambient-val">Auto</span>
        <span class="nav-arrow">›</span>
      </button>
      <button class="sidebar-nav-item" data-sub="gallery">
        <span class="nav-label">Galeries</span>
        <span class="nav-value" id="nav-gallery-val">Toutes</span>
        <span class="nav-arrow">›</span>
      </button>
      <button class="sidebar-nav-item" data-sub="google">
        <span class="nav-label">Google Photos</span>
        <span class="nav-value" id="nav-google-val">Non connecté</span>
        <span class="nav-arrow">›</span>
      </button>
    </nav>
    <div class="sidebar-content" id="sidebar-content">

      <!-- Frame sub-screen -->
      <div class="sub-screen" id="sub-frame">
        <h3>Style de cadre</h3>
        <button class="sidebar-nav-item" data-back style="margin-left:-24px;width:auto;padding:12px 24px;font-size:14px;">
          <span class="nav-arrow" style="transform:rotate(180deg);display:inline-block;">›</span>
          <span class="nav-label">Retour</span>
        </button>
        <div class="frame-selector" id="frame-selector">
          <button class="frame-option selected" data-frame="oak" style="background:linear-gradient(135deg,#d4b47c,#a88440);" title="Chêne Clair"></button>
          <button class="frame-option" data-frame="walnut" style="background:linear-gradient(180deg,#4a3a2a,#2a1a0a);" title="Noyer/Ébène"></button>
          <button class="frame-option" data-frame="gold" style="background:linear-gradient(160deg,#f0c85d,#a8781d);" title="Dorure Baroque"></button>
          <button class="frame-option" data-frame="aluminum" style="background:linear-gradient(180deg,#d8d8d8,#909090);" title="Aluminium Brossé"></button>
          <button class="frame-option" data-frame="white" style="background:#f0f0f0;" title="Blanc Mat"></button>
          <button class="frame-option" data-frame="black" style="background:#1a1a1a;" title="Noir Satiné"></button>
          <button class="frame-option" data-frame="matte" style="background:#e8e0d8;" title="Passe-partout"></button>
          <button class="frame-option" data-frame="bevel" style="background:linear-gradient(135deg,#baaa9a,#7a6a5a);" title="Double Biseau"></button>
          <button class="frame-option" data-frame="loft" style="background:repeating-linear-gradient(0deg,#6a5a4a 0px,#6a5a4a 1px,#5a4a3a 1px,#5a4a3a 3px);" title="Industriel"></button>
          <button class="frame-option" data-frame="floating" style="background:transparent;border:1.5px solid rgba(255,255,255,0.15);" title="Flottant"></button>
        </div>
        <div class="option-group">
          <label>Taille du cadre</label>
          <div class="option-row">
            <button class="option-chip" data-frame-size="thin">Fin<small>40 px</small></button>
            <button class="option-chip selected" data-frame-size="medium">Moyen<small>80 px</small></button>
            <button class="option-chip" data-frame-size="thick">Large<small>140 px</small></button>
          </div>
        </div>
        <div class="option-group">
          <label>Effet d'ombre (profondeur 3D)</label>
          <div class="slider-row">
            <div class="slider-label">
              <label for="shadow-slider">Intensité</label>
              <span id="shadow-val">50%</span>
            </div>
            <input type="range" min="0" max="100" value="50" id="shadow-slider" />
          </div>
        </div>
        <div class="option-group">
          <label>Texture de toile</label>
          <button class="toggle-switch" id="canvas-toggle"></button>
        </div>
      </div>

      <!-- Timer sub-screen -->
      <div class="sub-screen" id="sub-slideshow">
        <h3>Minuterie</h3>
        <button class="sidebar-nav-item" data-back style="margin-left:-24px;width:auto;padding:12px 24px;font-size:14px;">
          <span class="nav-arrow" style="transform:rotate(180deg);display:inline-block;">›</span>
          <span class="nav-label">Retour</span>
        </button>
        <div class="option-group">
          <label>Intervalle de changement</label>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <button class="option-chip selected" data-timer="15">15 minutes<small>Rotation régulière</small></button>
            <button class="option-chip" data-timer="30">30 minutes<small>Rotation modérée</small></button>
            <button class="option-chip" data-timer="60">1 heure<small>Contemplation</small></button>
            <button class="option-chip" data-timer="120">2 heures<small>Longue contemplation</small></button>
            <button class="option-chip" data-timer="static">Statique<small>Changement manuel uniquement</small></button>
          </div>
        </div>
      </div>

      <!-- Ambient tone sub-screen -->
      <div class="sub-screen" id="sub-ambient">
        <h3>Tonalité ambiante</h3>
        <button class="sidebar-nav-item" data-back style="margin-left:-24px;width:auto;padding:12px 24px;font-size:14px;">
          <span class="nav-arrow" style="transform:rotate(180deg);display:inline-block;">›</span>
          <span class="nav-label">Retour</span>
        </button>
        <div class="slider-group">
          <div class="slider-row">
            <div class="slider-label">
              <label for="brightness-slider">Luminosité</label>
              <span id="brightness-val">100%</span>
            </div>
            <input type="range" min="30" max="100" value="100" id="brightness-slider" />
          </div>
          <div class="slider-row">
            <div class="slider-label">
              <label for="temperature-slider">Température des couleurs</label>
              <span id="temperature-val">Neutre</span>
            </div>
            <input type="range" min="0" max="100" value="50" id="temperature-slider" />
          </div>
        </div>
      </div>

      <!-- Gallery sub-screen -->
      <div class="sub-screen" id="sub-gallery">
        <h3>Galeries</h3>
        <button class="sidebar-nav-item" data-back style="margin-left:-24px;width:auto;padding:12px 24px;font-size:14px;">
          <span class="nav-arrow" style="transform:rotate(180deg);display:inline-block;">›</span>
          <span class="nav-label">Retour</span>
        </button>
        <div class="option-group">
          <label>Filtrer par mouvement</label>
          <button class="option-chip selected" data-gallery-filter="all" id="gallery-all">Toutes les œuvres<small>100+ chefs-d'œuvre</small></button>
        </div>
        <div class="gallery-grid" id="gallery-grid">
          <!-- Dynamically populated -->
        </div>
      </div>

      <!-- Google Auth sub-screen -->
      <div class="sub-screen" id="sub-google">
        <h3>Google Photos</h3>
        <button class="sidebar-nav-item" data-back style="margin-left:-24px;width:auto;padding:12px 24px;font-size:14px;">
          <span class="nav-arrow" style="transform:rotate(180deg);display:inline-block;">›</span>
          <span class="nav-label">Retour</span>
        </button>
        <div style="display:flex;flex-direction:column;gap:16px;">
          <button class="auth-btn" id="google-connect-btn">Se connecter avec Google</button>
          <p style="font-size:13px;color:var(--muted);line-height:1.6;">Connectez-vous pour synchroniser vos albums Google Photos et les afficher en plein écran sur votre téléviseur.</p>
        </div>
      </div>

    </div>
  </aside>

  <!-- ===== GOOGLE AUTH OVERLAY ===== -->
  <div class="auth-overlay" id="auth-overlay">
    <div class="auth-card">
      <h2>Connexion Google</h2>
      <p>Scannez le QR code avec votre smartphone ou saisissez le code ci-dessous sur <strong>google.com/device</strong></p>
      <div class="qr-code" id="qr-code">
        <!-- QR SVG will be dynamically generated -->
      </div>
      <div class="auth-code-display" tabindex="-1" id="auth-code">--</div>
      <div class="auth-url">google.com/device</div>
      <button class="auth-btn secondary" data-back id="auth-back">Annuler</button>
    </div>
  </div>

</div>

<script>
(function() {
  'use strict';

  // ================================================================
  // ARTWORK DATABASE — 100+ chefs-d'œuvre
  // Sources : Art Institute of Chicago (IIIF), Metropolitan Museum, Rijksmuseum
  // Résolution minimale : 1686px (côté long) via IIIF
  // ================================================================

  var artworks = [/* INSÉRER ICI LE JSON COMPLET DE LA SECTION 2.2 */];

  // ================================================================
  // ÉTAT DE L'APPLICATION
  // ================================================================

  var state = {
    currentArtIdx: 0,
    menuVisible: false,
    menuFocusIdx: 0,
    sidebarOpen: false,
    currentSub: null,
    dpMode: 'art',         // art | menu | sidebar-nav | sub | auth
    dpIdx: 0,
    frameStyle: 'oak',
    frameWidth: 80,
    shadowIntensity: 50,
    canvasTexture: false,
    timerInterval: 15,
    brightness: 100,
    temperature: 50,
    selectedGalleries: ['renaissance', 'baroque', 'impressionism', 'postimpressionism', 'romanticism', 'modern', 'cubism', 'abstract', 'artnouveau', 'expressionism', 'fauvism', 'neoclassicism', 'rococo', 'classicism', 'earlyrenaissance', 'realism'],
    googleConnected: false,
    pixelShift: { x: 0, y: 0 },
    slideshowActive: true,
    galleryFilter: 'all',
    imageLoadMode: 'contain',
  };

  // ================================================================
  // RÉFÉRENCES DOM
  // ================================================================

  var els = {
    artwork: document.getElementById('artwork-current'),
    frame: document.getElementById('frame-overlay'),
    canvasTex: document.getElementById('canvas-texture'),
    ambientFilter: document.getElementById('ambient-filter'),
    bottomMenu: document.getElementById('bottom-menu'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebar-overlay'),
    sidebarContent: document.getElementById('sidebar-content'),
    authOverlay: document.getElementById('auth-overlay'),
    shiftIndicator: document.getElementById('shift-indicator'),
    timerIndicator: document.getElementById('timer-indicator'),
    artworkInfo: document.getElementById('artwork-info'),
    artTitle: document.getElementById('art-title'),
    artArtist: document.getElementById('art-artist'),
  };

  // ================================================================
  // SCALE-TO-FIT
  // ================================================================

  function fitFrame() {
    var frame = document.getElementById('tv-frame');
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    frame.style.transform = 'scale(' + s + ')';
  }
  window.addEventListener('resize', fitFrame);
  fitFrame();

  // ================================================================
  // FONCTIONS DE RENDU
  // ================================================================

  var _artTimer = null;

  function getFilteredArtworks() {
    if (state.galleryFilter === 'all') {
      return artworks.filter(function(a) {
        return state.selectedGalleries.indexOf(a.gallery) !== -1;
      });
    }
    return artworks.filter(function(a) {
      return a.gallery === state.galleryFilter && state.selectedGalleries.indexOf(a.gallery) !== -1;
    });
  }

  function renderArtwork(crossfade) {
    var filtered = getFilteredArtworks();
    if (filtered.length === 0) filtered = artworks;
    var art = filtered[state.currentArtIdx % filtered.length];

    if (crossfade) {
      els.artwork.classList.add('fading');
      setTimeout(function() {
        applyArtworkBackground(art);
        els.artwork.classList.remove('fading');
        updateArtworkInfo(art);
      }, 450);
    } else {
      applyArtworkBackground(art);
      updateArtworkInfo(art);
    }
  }

  function applyArtworkBackground(art) {
    // Try to load the image; fallback to CSS gradient
    var img = new Image();
    img.onload = function() {
      els.artwork.style.backgroundImage = 'url("' + art.image_url + '")';
      els.artwork.style.backgroundSize = state.imageLoadMode === 'cover' ? 'cover' : 'contain';
    };
    img.onerror = function() {
      // Fallback: générer un dégradé artistique CSS
      els.artwork.style.backgroundImage = generateArtGradient(art.title);
      var gallerBG = {
        'renaissance': 'radial-gradient(ellipse at 40% 40%, oklch(55% 0.14 30), oklch(20% 0.05 270))',
        'baroque': 'radial-gradient(ellipse at 50% 45%, oklch(45% 0.12 20), oklch(10% 0.04 250))',
        'impressionism': 'radial-gradient(ellipse at 30% 50%, oklch(65% 0.10 80), oklch(40% 0.06 200))',
        'postimpressionism': 'radial-gradient(ellipse at 45% 50%, oklch(60% 0.15 40), oklch(25% 0.08 240))',
        'modern': 'conic-gradient(from 30deg, oklch(55% 0.10 260), oklch(75% 0.05 90), oklch(50% 0.12 20))',
        'abstract': 'conic-gradient(from 0deg, oklch(50% 0.12 300), oklch(70% 0.08 60), oklch(45% 0.10 180))',
      };
      els.artwork.style.backgroundImage = gallerBG[art.gallery] || gallerBG.renaissance;
      els.artwork.style.backgroundSize = 'cover';
    };
    img.src = art.image_url;
    // Timeout fallback after 8s
    setTimeout(function() {
      if (!img.complete) {
        img.src = ''; // cancel
        img.onerror();
      }
    }, 8000);
  }

  function generateArtGradient(title) {
    // Generate a unique gradient based on the title hash
    var hash = 0;
    for (var i = 0; i < title.length; i++) {
      hash = ((hash << 5) - hash) + title.charCodeAt(i);
    }
    var h1 = Math.abs(hash % 360);
    var h2 = (h1 + 60 + Math.abs(hash * 7) % 120) % 360;
    var s = 30 + Math.abs(hash % 40);
    var l = 30 + Math.abs((hash >> 8) % 30);
    return 'radial-gradient(ellipse at ' + (30 + hash % 40) + '% ' + (40 + (hash >> 4) % 30) + '%, ' +
      'oklch(' + (l + 20) + '% ' + (s/200) + ' ' + h1 + '), ' +
      'oklch(' + (l - 10) + '% ' + (s/250) + ' ' + h2 + '), ' +
      'oklch(' + (l - 20) + '% 0.03 ' + (h1 + h2)/2 + '))';
  }

  function updateArtworkInfo(art) {
    els.artTitle.textContent = art.title;
    els.artArtist.textContent = art.artist + (art.year ? ' · ' + art.year : '');
    els.artworkInfo.classList.add('visible');
    // Auto-hide info after 12s
    clearTimeout(window._infoTimer);
    window._infoTimer = setTimeout(function() {
      els.artworkInfo.classList.remove('visible');
    }, 12000);
  }

  // ================================================================
  // SYSTÈME DE 10 CADRES AVEC OMBRE 3D
  // ================================================================

  function renderFrame() {
    var fw = state.frameWidth + 'px';
    var intensity = state.shadowIntensity / 100;

    var frameStyles = {
      oak: {
        border: fw + ' solid #c4a46c',
        bg: 'linear-gradient(135deg, #d4b47c, #b89450, #c4a46c, #a88440)',
        shadow: [
          'inset 0 0 0 2px #d4b47c80',
          'inset ' + (3*intensity) + 'px ' + (3*intensity) + 'px ' + (15*intensity) + 'px rgba(0,0,0,' + (0.3*intensity) + ')',
          'inset -' + (2*intensity) + 'px -' + (2*intensity) + 'px ' + (10*intensity) + 'px rgba(255,255,255,' + (0.15*intensity) + ')',
          '0 ' + (8*intensity) + 'px ' + (32*intensity) + 'px rgba(0,0,0,' + (0.4*intensity) + ')'
        ].join(', ')
      },
      walnut: {
        border: fw + ' solid #3a2a1a',
        bg: 'linear-gradient(180deg, #4a3a2a, #2a1a0a)',
        shadow: ['inset 0 0 0 2px #5a4a3a80','inset '+(4*intensity)+'px '+(4*intensity)+'px '+(18*intensity)+'px rgba(0,0,0,'+(0.5*intensity)+')','inset -'+(2*intensity)+'px -'+(2*intensity)+'px '+(8*intensity)+'px rgba(255,255,255,'+(0.08*intensity)+')','0 '+(8*intensity)+'px '+(32*intensity)+'px rgba(0,0,0,'+(0.5*intensity)+')'].join(', ')
      },
      gold: {
        border: fw + ' solid #c8962d',
        bg: 'linear-gradient(160deg, #f0c85d, #c8962d, #e8b84d, #a8781d)',
        shadow: ['inset 0 0 0 3px #e8b84d','inset 0 0 0 6px #b8862d','inset '+(4*intensity)+'px '+(4*intensity)+'px '+(20*intensity)+'px rgba(0,0,0,'+(0.35*intensity)+')','inset -'+(3*intensity)+'px -'+(3*intensity)+'px '+(12*intensity)+'px rgba(255,215,0,'+(0.2*intensity)+')','0 '+(8*intensity)+'px '+(32*intensity)+'px rgba(0,0,0,'+(0.45*intensity)+')'].join(', ')
      },
      aluminum: {
        border: fw + ' solid #a0a0a0',
        bg: 'linear-gradient(180deg, #d8d8d8, #a8a8a8, #c8c8c8, #909090)',
        shadow: ['inset 0 0 0 1px #c0c0c080','inset '+(2*intensity)+'px '+(2*intensity)+'px '+(12*intensity)+'px rgba(0,0,0,'+(0.15*intensity)+')','inset -'+(1*intensity)+'px -'+(1*intensity)+'px '+(6*intensity)+'px rgba(255,255,255,'+(0.25*intensity)+')','0 '+(4*intensity)+'px '+(20*intensity)+'px rgba(0,0,0,'+(0.25*intensity)+')'].join(', ')
      },
      white: {
        border: fw + ' solid #f0f0f0',
        bg: 'linear-gradient(160deg, #ffffff, #ececec, #f5f5f5, #e0e0e0)',
        shadow: ['inset 0 0 0 1px #ffffff80','inset '+(3*intensity)+'px '+(3*intensity)+'px '+(15*intensity)+'px rgba(0,0,0,'+(0.1*intensity)+')','inset -'+(1*intensity)+'px -'+(1*intensity)+'px '+(6*intensity)+'px rgba(255,255,255,'+(0.3*intensity)+')','0 '+(6*intensity)+'px '+(28*intensity)+'px rgba(0,0,0,'+(0.2*intensity)+')'].join(', ')
      },
      black: {
        border: fw + ' solid #1a1a1a',
        bg: 'linear-gradient(180deg, #2a2a2a, #0a0a0a, #1a1a1a, #050505)',
        shadow: ['inset 0 0 0 1px #3a3a3a80','inset '+(4*intensity)+'px '+(4*intensity)+'px '+(20*intensity)+'px rgba(0,0,0,'+(0.6*intensity)+')','inset -'+(1*intensity)+'px -'+(1*intensity)+'px '+(6*intensity)+'px rgba(255,255,255,'+(0.05*intensity)+')','0 '+(8*intensity)+'px '+(32*intensity)+'px rgba(0,0,0,'+(0.6*intensity)+')'].join(', ')
      },
      matte: {
        border: fw + ' solid #e8e0d8',
        bg: 'radial-gradient(ellipse at center, #f5f0ea 60%, #e8e0d8 100%)',
        shadow: ['inset 0 0 0 4px #f5f0ea','inset '+(2*intensity)+'px '+(2*intensity)+'px '+(10*intensity)+'px rgba(0,0,0,'+(0.08*intensity)+')','inset -'+(1*intensity)+'px -'+(1*intensity)+'px '+(5*intensity)+'px rgba(255,255,255,'+(0.2*intensity)+')','0 '+(4*intensity)+'px '+(20*intensity)+'px rgba(0,0,0,'+(0.15*intensity)+')'].join(', ')
      },
      bevel: {
        border: fw + ' solid #8a7a6a',
        bg: 'linear-gradient(135deg, #baaa9a, #8a7a6a, #a09080, #7a6a5a)',
        shadow: ['inset 0 0 0 4px #baaa9a','inset '+(4*intensity)+'px '+(4*intensity)+'px 0 '+(4*intensity)+'px #6a5a4a','inset -'+(4*intensity)+'px -'+(4*intensity)+'px 0 '+(4*intensity)+'px #9a8a7a','inset '+(6*intensity)+'px '+(6*intensity)+'px '+(24*intensity)+'px rgba(0,0,0,'+(0.3*intensity)+')','inset -'+(4*intensity)+'px -'+(4*intensity)+'px '+(12*intensity)+'px rgba(255,255,255,'+(0.12*intensity)+')','0 '+(8*intensity)+'px '+(32*intensity)+'px rgba(0,0,0,'+(0.4*intensity)+')'].join(', ')
      },
      loft: {
        border: fw + ' solid #5a4a3a',
        bg: 'repeating-linear-gradient(0deg, #6a5a4a 0px, #6a5a4a 1px, #5a4a3a 1px, #5a4a3a 3px, #7a6a5a 3px, #7a6a5a 4px)',
        shadow: ['inset 0 0 0 2px #8a7a6a','inset 0 0 0 4px #3a2a1a','inset '+(5*intensity)+'px '+(5*intensity)+'px '+(20*intensity)+'px rgba(0,0,0,'+(0.45*intensity)+')','inset -'+(3*intensity)+'px -'+(3*intensity)+'px '+(10*intensity)+'px rgba(255,255,255,'+(0.06*intensity)+')','0 '+(6*intensity)+'px '+(28*intensity)+'px rgba(0,0,0,'+(0.5*intensity)+')'].join(', ')
      },
      floating: {
        border: 'none',
        bg: 'transparent',
        shadow: '0 0 0 '+(4*intensity)+'px rgba(255,255,255,'+(0.08*intensity)+'), 0 0 0 '+(8*intensity)+'px rgba(255,255,255,'+(0.03*intensity)+'), 0 0 0 '+(12*intensity)+'px rgba(0,0,0,'+(0.1*intensity)+'), 0 '+(20*intensity)+'px '+(60*intensity)+'px rgba(0,0,0,'+(0.5*intensity)+')'
      }
    };

    var style = frameStyles[state.frameStyle] || frameStyles.oak;
    els.frame.style.border = style.border;
    els.frame.style.background = style.bg;
    els.frame.style.boxShadow = style.shadow;
  }

  function renderCanvasTexture() {
    els.canvasTex.classList.toggle('on', state.canvasTexture);
  }

  function renderAmbient() {
    var b = state.brightness / 100;
    var t = state.temperature / 100;
    var warm = 1 + (t - 0.5) * 0.4;
    var cool = 1 - (t - 0.5) * 0.3;
    els.ambientFilter.style.background =
      'linear-gradient(rgba(255,' + Math.round(240 * warm) + ',' + Math.round(210 * cool) + ',0.08), rgba(0,0,0,' + (1 - b) * 0.6 + '))';
  }

  function renderTimerIndicator() {
    if (state.timerInterval === 'static') {
      els.timerIndicator.classList.remove('visible');
      return;
    }
    els.timerIndicator.classList.add('visible');
    var mins = parseInt(state.timerInterval);
    var now = new Date();
    now.setMinutes(now.getMinutes() + mins);
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    els.timerIndicator.textContent = 'Prochain changement · ' + h + ':' + m;
  }

  // ================================================================
  // PIXEL SHIFTING — Anti burn-in (toutes les 5 minutes)
  // ================================================================

  function pixelShift() {
    state.pixelShift.x = (state.pixelShift.x + (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 3 + 2)) % 4;
    state.pixelShift.y = (state.pixelShift.y + (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 3 + 2)) % 4;
    els.artwork.style.transform = 'translate(' + state.pixelShift.x + 'px,' + state.pixelShift.y + 'px)';
    els.shiftIndicator.style.opacity = '1';
    setTimeout(function() { els.shiftIndicator.style.opacity = '0'; }, 800);
  }
  setInterval(pixelShift, 5 * 60 * 1000); // Every 5 minutes

  // ================================================================
  // ROTATION AUTOMATIQUE (Slideshow)
  // ================================================================

  function rotateArt() {
    if (state.timerInterval === 'static' && !state.slideshowActive) return;
    var filtered = getFilteredArtworks();
    if (filtered.length === 0) filtered = artworks;
    var parentFiltered = artworks.filter(function(a) {
      return state.selectedGalleries.indexOf(a.gallery) !== -1;
    });
    var next;
    do {
      next = Math.floor(Math.random() * filtered.length);
    } while (filtered.length > 1 && filtered[next].title === parentFiltered[state.currentArtIdx % parentFiltered.length].title);
    for (var i = 0; i < parentFiltered.length; i++) {
      if (parentFiltered[i].title === filtered[next].title) {
        state.currentArtIdx = i;
        break;
      }
    }
    renderArtwork(true);
    renderTimerIndicator();
  }

  function resetTimer() {
    clearInterval(window._artTimer);
    if (state.timerInterval !== 'static') {
      window._artTimer = setInterval(rotateArt, parseInt(state.timerInterval) * 60 * 1000);
    }
  }

  // ================================================================
  // MENU & SIDEBAR CONTROLS
  // ================================================================

  var menuItems = document.querySelectorAll('.menu-item');
  var sidebarNavItems = document.querySelectorAll('#sidebar-nav .sidebar-nav-item');

  function clearAllFocus() {
    document.querySelectorAll('.dpad-focused').forEach(function(el) {
      el.classList.remove('dpad-focused');
    });
  }

  function focusEl(idx, list) {
    clearAllFocus();
    if (list && list[idx]) {
      list[idx].classList.add('dpad-focused');
      list[idx].focus({ preventScroll: false });
      // Ensure the focused element is visible (scroll into view)
      if (list[idx].scrollIntoViewIfNeeded) {
        list[idx].scrollIntoViewIfNeeded(false);
      }
    }
  }

  function getFocusableInSub() {
    var sub = document.getElementById('sub-' + state.currentSub);
    if (!sub) return [];
    return Array.prototype.slice.call(sub.querySelectorAll(
      '.option-chip:not([data-back]), .color-swatch, .toggle-switch, .gallery-card, .auth-btn, .frame-option, .sidebar-nav-item[data-back], input[type="range"]'
    ));
  }

  function showMenu() {
    state.menuVisible = true;
    state.dpMode = 'menu';
    state.dpIdx = 0;
    els.bottomMenu.classList.add('visible');
    focusEl(state.dpIdx, menuItems);
  }

  function hideMenu() {
    state.menuVisible = false;
    state.dpMode = 'art';
    els.bottomMenu.classList.remove('visible');
    clearAllFocus();
  }

  function openSidebar(sub) {
    state.sidebarOpen = true;
    state.dpMode = sub ? 'sub' : 'sidebar-nav';
    state.dpIdx = 0;
    els.sidebar.classList.add('open');
    els.sidebarOverlay.classList.add('open');
    if (sub) {
      openSubScreen(sub);
    } else {
      focusEl(0, sidebarNavItems);
      document.querySelectorAll('.sub-screen.active').forEach(function(s) { s.classList.remove('active'); });
      state.currentSub = null;
    }
    syncSidebarValues();
  }

  function closeSidebar() {
    state.sidebarOpen = false;
    state.currentSub = null;
    state.dpMode = 'art';
    els.sidebar.classList.remove('open');
    els.sidebarOverlay.classList.remove('open');
    document.querySelectorAll('.sub-screen.active').forEach(function(s) { s.classList.remove('active'); });
    clearAllFocus();
  }

  function openSubScreen(sub) {
    state.currentSub = sub;
    state.dpMode = 'sub';
    state.dpIdx = 0;
    document.querySelectorAll('.sub-screen.active').forEach(function(s) { s.classList.remove('active'); });
    var target = document.getElementById('sub-' + sub);
    if (target) target.classList.add('active');
    requestAnimationFrame(function() {
      var items = getFocusableInSub();
      focusEl(0, items);
    });
  }

  function backToSidebarNav() {
    state.currentSub = null;
    state.dpMode = 'sidebar-nav';
    state.dpIdx = 0;
    document.querySelectorAll('.sub-screen.active').forEach(function(s) { s.classList.remove('active'); });
    focusEl(0, sidebarNavItems);
    syncSidebarValues();
  }

  function openAuth() {
    state.dpMode = 'auth';
    state.dpIdx = 0;
    els.authOverlay.classList.add('open');
    var authItems = Array.prototype.slice.call(
      document.querySelectorAll('#auth-overlay .auth-btn, #auth-overlay .auth-code-display')
    );
    focusEl(0, authItems);
  }

  function closeAuth() {
    state.dpMode = state.sidebarOpen ? 'sidebar-nav' : 'art';
    els.authOverlay.classList.remove('open');
    clearAllFocus();
    if (state.sidebarOpen) focusEl(0, sidebarNavItems);
  }

  function syncSidebarValues() {
    var frameLabels = {
      oak: 'Chêne clair', walnut: 'Noyer/ébène', gold: 'Dorure baroque',
      aluminum: 'Aluminium', white: 'Blanc mat', black: 'Noir satiné',
      matte: 'Passe-partout', bevel: 'Double biseau', loft: 'Industriel',
      floating: 'Flottant'
    };
    document.getElementById('nav-frame-val').textContent = frameLabels[state.frameStyle] || 'Chêne clair';

    var timerLabels = { 15: '15 min', 30: '30 min', 60: '1 heure', 120: '2 heures', 'static': 'Statique' };
    document.getElementById('nav-timer-val').textContent = timerLabels[state.timerInterval];

    document.getElementById('nav-ambient-val').textContent =
      state.brightness === 100 && state.temperature === 50 ? 'Auto' :
      state.brightness + '% · ' + (state.temperature > 60 ? 'Chaud' : state.temperature < 40 ? 'Froid' : 'Neutre');

    document.getElementById('nav-gallery-val').textContent =
      state.galleryFilter === 'all' ? 'Toutes' : state.galleryFilter;

    document.getElementById('nav-google-val').textContent =
      state.googleConnected ? 'Connecté' : 'Non connecté';

    document.getElementById('shadow-val').textContent = state.shadowIntensity + '%';
    document.getElementById('brightness-val').textContent = state.brightness + '%';

    var tempVal = document.getElementById('temperature-val');
    tempVal.textContent = state.temperature > 60 ? 'Chaud' : state.temperature < 40 ? 'Froid' : 'Neutre';

    document.getElementById('canvas-toggle').classList.toggle('on', state.canvasTexture);
    document.querySelectorAll('[data-frame-size]').forEach(function(b) {
      b.classList.toggle('selected', b.dataset.frameSize ===
        (state.frameWidth === 40 ? 'thin' : state.frameWidth === 80 ? 'medium' : 'thick'));
    });
    document.querySelectorAll('[data-timer]').forEach(function(b) {
      b.classList.toggle('selected', String(b.dataset.timer) === String(state.timerInterval));
    });
    document.getElementById('brightness-slider').value = state.brightness;
    document.getElementById('temperature-slider').value = state.temperature;
    document.getElementById('shadow-slider').value = state.shadowIntensity;
  }

  // ================================================================
  // CLICK HANDLER (pour tests navigateur + fallback souris)
  // ================================================================

  document.addEventListener('click', function(e) {
    var target = e.target.closest('[data-action], [data-sub], [data-back], .toggle-switch, #sidebar-close, #google-connect-btn, #auth-back, [data-frame], [data-frame-size], [data-timer], [data-gallery], [data-gallery-filter], .frame-option, .option-chip:not([data-back])');

    if (!target) {
      // Click on art background → show menu
      if (e.target.closest('#art-mode') && !state.menuVisible && !state.sidebarOpen) {
        showMenu();
      }
      // Click on overlay → close sidebar
      if (e.target === els.sidebarOverlay) closeSidebar();
      return;
    }

    if (target.closest('.menu-item')) {
      var a = target.closest('.menu-item').dataset.action;
      hideMenu();
      openSidebar(a === 'settings' ? null : a);
      return;
    }

    if (target.closest('[data-frame]')) {
      state.frameStyle = target.closest('[data-frame]').dataset.frame;
      document.querySelectorAll('.frame-option').forEach(function(f) {
        f.classList.toggle('selected', f.dataset.frame === state.frameStyle);
      });
      renderFrame();
      syncSidebarValues();
      return;
    }

    if (target.closest('[data-frame-size]')) {
      var sizes = { thin: 40, medium: 80, thick: 140 };
      state.frameWidth = sizes[target.closest('[data-frame-size]').dataset.frameSize];
      renderFrame();
      syncSidebarValues();
      return;
    }

    if (target.closest('[data-timer]')) {
      var v = target.closest('[data-timer]').dataset.timer;
      state.timerInterval = v === 'static' ? 'static' : parseInt(v);
      renderTimerIndicator();
      resetTimer();
      syncSidebarValues();
      // Visually restart slideshow
      state.slideshowActive = true;
      return;
    }

    if (target.closest('[data-gallery-filter]')) {
      state.galleryFilter = target.closest('[data-gallery-filter]').dataset.galleryFilter;
      state.currentArtIdx = 0;
      renderArtwork(false);
      syncSidebarValues();
      return;
    }

    if (target.closest('.toggle-switch')) {
      if (target.id === 'canvas-toggle') {
        state.canvasTexture = !state.canvasTexture;
        renderCanvasTexture();
      }
      syncSidebarValues();
      return;
    }

    if (target.closest('#sidebar-close')) { closeSidebar(); return; }
    if (target.closest('#auth-back')) { closeAuth(); return; }
    if (target.closest('#google-connect-btn')) { openAuth(); return; }

    if (target.closest('[data-back]')) { backToSidebarNav(); return; }

    if (target.closest('.sidebar-nav-item')) {
      var ni = target.closest('.sidebar-nav-item');
      if (ni.dataset.sub === 'google') { openAuth(); return; }
      if (ni.dataset.sub) { openSubScreen(ni.dataset.sub); return; }
    }
  });

  // ================================================================
  // SLIDERS
  // ================================================================

  document.getElementById('brightness-slider').addEventListener('input', function() {
    state.brightness = parseInt(this.value);
    document.getElementById('brightness-val').textContent = state.brightness + '%';
    renderAmbient();
  });
  document.getElementById('temperature-slider').addEventListener('input', function() {
    state.temperature = parseInt(this.value);
    var tv = document.getElementById('temperature-val');
    tv.textContent = state.temperature > 60 ? 'Chaud' : state.temperature < 40 ? 'Froid' : 'Neutre';
    renderAmbient();
  });
  document.getElementById('shadow-slider').addEventListener('input', function() {
    state.shadowIntensity = parseInt(this.value);
    document.getElementById('shadow-val').textContent = state.shadowIntensity + '%';
    renderFrame();
  });

  // ================================================================
  // D-PAD NAVIGATION — Télécommande Android TV / Fire TV
  // Modes : art → menu → sidebar-nav → sub → auth
  // ================================================================

  document.addEventListener('keydown', function(e) {
    var key = e.key;
    var mode = state.dpMode;

    // --- MODE: AUTH ---
    if (mode === 'auth') {
      var authItems = Array.prototype.slice.call(
        document.querySelectorAll('#auth-overlay .auth-btn, #auth-overlay .auth-code-display')
      );
      if (key === 'ArrowUp' || key === 'ArrowLeft') {
        e.preventDefault();
        state.dpIdx = Math.max(0, state.dpIdx - 1);
        focusEl(state.dpIdx, authItems);
        return;
      }
      if (key === 'ArrowDown' || key === 'ArrowRight') {
        e.preventDefault();
        state.dpIdx = Math.min(authItems.length - 1, state.dpIdx + 1);
        focusEl(state.dpIdx, authItems);
        return;
      }
      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        if (authItems[state.dpIdx]) authItems[state.dpIdx].click();
        return;
      }
      if (key === 'Escape' || key === 'Backspace') { e.preventDefault(); closeAuth(); return; }
      return;
    }

    // --- MODE: SUB-SCREEN ---
    if (mode === 'sub') {
      var subItems = getFocusableInSub();
      if (key === 'ArrowUp') {
        e.preventDefault();
        state.dpIdx = Math.max(0, state.dpIdx - 1);
        focusEl(state.dpIdx, subItems);
        return;
      }
      if (key === 'ArrowDown') {
        e.preventDefault();
        state.dpIdx = Math.min(subItems.length - 1, state.dpIdx + 1);
        focusEl(state.dpIdx, subItems);
        return;
      }
      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        var fel = subItems[state.dpIdx];
        if (!fel) return;
        if (fel.type === 'range') {
          fel.focus();
        } else {
          fel.click();
          if (fel.dataset.back !== undefined) backToSidebarNav();
          syncSidebarValues();
        }
        return;
      }
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        e.preventDefault();
        var fel2 = subItems[state.dpIdx];
        if (fel2 && fel2.type === 'range') {
          var step = key === 'ArrowRight' ? 5 : -5;
          fel2.value = Math.max(parseInt(fel2.min), Math.min(parseInt(fel2.max), parseInt(fel2.value) + step));
          fel2.dispatchEvent(new Event('input', { bubbles: true }));
          syncSidebarValues();
        }
        return;
      }
      if (key === 'Escape' || key === 'Backspace') { e.preventDefault(); backToSidebarNav(); return; }
      return;
    }

    // --- MODE: SIDEBAR NAV ---
    if (mode === 'sidebar-nav') {
      if (key === 'ArrowUp') { e.preventDefault(); state.dpIdx = Math.max(0, state.dpIdx - 1); focusEl(state.dpIdx, sidebarNavItems); return; }
      if (key === 'ArrowDown') { e.preventDefault(); state.dpIdx = Math.min(sidebarNavItems.length - 1, state.dpIdx + 1); focusEl(state.dpIdx, sidebarNavItems); return; }
      if (key === 'ArrowRight' || key === 'Enter' || key === ' ') {
        e.preventDefault();
        var ni = sidebarNavItems[state.dpIdx];
        if (!ni) return;
        if (ni.dataset.sub === 'google') { openAuth(); return; }
        if (ni.dataset.sub) { openSubScreen(ni.dataset.sub); return; }
        return;
      }
      if (key === 'ArrowLeft' || key === 'Escape' || key === 'Backspace') { e.preventDefault(); closeSidebar(); return; }
      return;
    }

    // --- MODE: BOTTOM MENU ---
    if (mode === 'menu') {
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        e.preventDefault();
        var dir = key === 'ArrowRight' ? 1 : -1;
        state.dpIdx = (state.dpIdx + dir + menuItems.length) % menuItems.length;
        focusEl(state.dpIdx, menuItems);
        return;
      }
      if (key === 'ArrowDown' || key === 'Escape' || key === 'Backspace') { e.preventDefault(); hideMenu(); return; }
      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        var mi = menuItems[state.dpIdx];
        if (mi) {
          var action = mi.dataset.action;
          hideMenu();
          openSidebar(action === 'settings' ? null : action);
        }
        return;
      }
      return;
    }

    // --- MODE: ART (default) ---
    if (mode === 'art') {
      if (key === 'ArrowUp' || key === 'Enter' || key === ' ') { e.preventDefault(); showMenu(); return; }
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        e.preventDefault();
        var filtered = getFilteredArtworks();
        if (filtered.length === 0) filtered = artworks;
        var parentFiltered = artworks.filter(function(a) {
          return state.selectedGalleries.indexOf(a.gallery) !== -1;
        });
        var dir2 = key === 'ArrowRight' ? 1 : -1;
        // Find current artwork in parentFiltered and move
        var currentArt = parentFiltered[state.currentArtIdx % parentFiltered.length];
        var currentInFiltered = -1;
        for (var fi = 0; fi < filtered.length; fi++) {
          if (filtered[fi].title === currentArt.title) { currentInFiltered = fi; break; }
        }
        var newIdx = (currentInFiltered + dir2 + filtered.length) % filtered.length;
        for (var pi = 0; pi < parentFiltered.length; pi++) {
          if (parentFiltered[pi].title === filtered[newIdx].title) {
            state.currentArtIdx = pi;
            break;
          }
        }
        renderArtwork(true);
        renderTimerIndicator();
        resetTimer();
        return;
      }
      return;
    }
  });

  // ================================================================
  // GOOGLE AUTH — Device Flow (simulation QR code)
  // ================================================================

  function generateQrCode(text) {
    // Simplified QR code representation for TV display
    var qr = document.getElementById('qr-code');
    qr.innerHTML = '<div style="display:grid;grid-template-columns:repeat(11,1fr);gap:2px;padding:12px;background:white;border-radius:8px;">';
    // Generate a deterministic pseudo-QR pattern from the text
    var seed = 0;
    for (var i = 0; i < text.length; i++) seed = ((seed << 5) - seed) + text.charCodeAt(i);
    for (var r = 0; r < 11; r++) {
      for (var c = 0; c < 11; c++) {
        var isBorder = r === 0 || r === 10 || c === 0 || c === 10;
        var isCorner = (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3);
        var val = Math.abs(seed + r * 17 + c * 31) % 2 === 0;
        qr.innerHTML += '<div style="width:12px;height:12px;border-radius:1px;background:' +
          (isBorder || isCorner || val ? '#000' : '#fff') + ';"></div>';
      }
    }
    qr.innerHTML += '</div>';
  }

  function simulateGoogleAuthFlow() {
    // Simulate device code generation
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var code = '';
    for (var i = 0; i < 9; i++) {
      if (i === 3 || i === 6) code += '-';
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    document.getElementById('auth-code').textContent = code;
    generateQrCode(code);
  }

  // ================================================================
  // FORCER LE PLEIN ÉCRAN (Fullscreen API)
  // ================================================================

  function enterFullscreen() {
    var el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(function() {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
  }

  // Auto fullscreen on start
  setTimeout(enterFullscreen, 1000);

  // Re-enter fullscreen if user exits (for kiosk mode)
  document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
      setTimeout(enterFullscreen, 2000);
    }
  });

  // ================================================================
  // STOCKAGE LOCAL — Sauvegarder les préférences
  // ================================================================

  function saveState() {
    try {
      localStorage.setItem('artframe_state', JSON.stringify({
        frameStyle: state.frameStyle,
        frameWidth: state.frameWidth,
        shadowIntensity: state.shadowIntensity,
        canvasTexture: state.canvasTexture,
        timerInterval: state.timerInterval,
        brightness: state.brightness,
        temperature: state.temperature,
        selectedGalleries: state.selectedGalleries,
        galleryFilter: state.galleryFilter
      }));
    } catch(e) {}
  }

  function loadState() {
    try {
      var saved = localStorage.getItem('artframe_state');
      if (saved) {
        var data = JSON.parse(saved);
        Object.assign(state, data);
      }
    } catch(e) {}
  }

  // Sauvegarder à intervalle régulier
  setInterval(saveState, 30000);

  // Sauvegarder avant de quitter
  window.addEventListener('beforeunload', saveState);

  // ================================================================
  // INITIALISATION
  // ================================================================

  loadState();
  renderArtwork(false);
  renderFrame();
  renderCanvasTexture();
  renderAmbient();
  renderTimerIndicator();
  resetTimer();
  syncSidebarValues();

  // Launch animation
  els.artwork.classList.add('launching');
  setTimeout(function() { els.artwork.classList.remove('launching'); }, 2300);

  // Auto-focus body for keyboard
  document.body.setAttribute('tabindex', '-1');
  document.body.focus({ preventScroll: true });

  // Init Google Auth simulation
  simulateGoogleAuthFlow();

  // Populate gallery grid
  var grid = document.getElementById('gallery-grid');
  var added = {};
  artworks.forEach(function(art) {
    if (added[art.gallery]) return;
    added[art.gallery] = true;
    var card = document.createElement('button');
    card.className = 'gallery-card' + (state.selectedGalleries.indexOf(art.gallery) !== -1 ? ' selected' : '');
    card.dataset.gallery = art.gallery;
    var gradientHue = Math.abs(art.gallery.length * 37 + art.artist.length * 13) % 360;
    card.innerHTML = '<div class="gc-img" style="background:linear-gradient(135deg,oklch(55% 0.08 ' + gradientHue + '),oklch(45% 0.06 ' + (gradientHue + 60) + '));"></div><div class="gc-label">' + art.gallery.charAt(0).toUpperCase() + art.gallery.slice(1) + '</div>';
    card.addEventListener('click', function() {
      var g = this.dataset.gallery;
      var idx = state.selectedGalleries.indexOf(g);
      if (idx === -1) {
        state.selectedGalleries.push(g);
        this.classList.add('selected');
      } else {
        state.selectedGalleries.splice(idx, 1);
        this.classList.remove('selected');
      }
      state.currentArtIdx = 0;
      renderArtwork(false);
      syncSidebarValues();
    });
    grid.appendChild(card);
  });

  console.log('ArtFrame prêt — Appuyez sur ↑ ou Entrée pour le menu');
  console.log('📺 Fonctionne sur : Xiaomi TV F Pro 75", Amazon Fire TV');
  console.log('🖼️ ' + artworks.length + ' œuvres chargées');
  console.log('🛡️ Anti-burn-in actif (pixel shift toutes les 5 min)');
  console.log('🔋 Anti-veille : FLAG_KEEP_SCREEN_ON (via wrapper APK)');

})();
</script>

</body>
</html>
```

> **Note :** Le fichier complet `index.html` est le résultat de la fusion de la section [4.1 HTML Principal] et [4.2 Body HTML + JavaScript]. Remplacez le commentaire `/* INSÉRER ICI LE JSON COMPLET DE LA SECTION 2.2 */` par le tableau JSON complet de la section 2.
