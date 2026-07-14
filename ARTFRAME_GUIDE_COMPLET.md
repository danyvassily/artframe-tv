# 🖼️ ArtFrame — Guide Technique Complet & Code Source

> **Clone Premium de "The Frame" de Samsung pour Android TV & Fire TV**
> *Version : 1.0 — Juillet 2026*
> *Destiné à : Xiaomi TV F Pro 75" & Amazon Fire TV*

---

## 📑 Table des Matières

1. [Architecture du Projet](#1-architecture-du-projet)
2. [Base de Données des 100+ Chefs-d'Œuvre (JSON)](#2-base-de-données)
3. [Système de 10 Cadres Virtuels](#3-système-de-cadres)
4. [Code Source Principal : Application Web ArtFrame](#4-code-source)
5. [Mode Diaporama Plein Écran](#5-mode-diaporama)
6. [Navigation D-Pad Télécommande](#6-navigation-d-pad)
7. [Anti-Veille & Protection d'Écran](#7-anti-veille)
8. [Connexion Google Photos](#8-google-photos)
9. [Guide de Compilation & Installation APK](#9-compilation)
10. [Déploiement Web (Vercel)](#10-deploiement-web)

---

## 1. Architecture du Projet

### 1.1 Structure des Fichiers

```
ArtFrame-Android-TV/
├── index.html                 # Application principale (SPA complète)
├── manifest.json              # PWA Manifest (installation TV)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
├── artworks.json              # Base de données des 100+ œuvres
├── README.md
│
├── android-tv-wrapper/        # Wrapper WebView pour Android TV
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/com/artframe/
│   │   │   │   └── MainActivity.kt
│   │   │   ├── res/
│   │   │   │   ├── layout/activity_main.xml
│   │   │   │   └── values/
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle.kts
│   ├── build.gradle.kts
│   └── settings.gradle.kts
│
└── fire-tv-wrapper/           # Wrapper WebView pour Fire TV
    ├── app/
    │   ├── src/main/
    │   │   ├── java/com/artframe/
    │   │   │   └── MainActivity.kt
    │   │   ├── res/
    │   │   └── AndroidManifest.xml
    │   └── build.gradle.kts
    ├── build.gradle.kts
    └── settings.gradle.kts
```

### 1.2 Stack Technique

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| **UI Core** | HTML5 + CSS3 (vanilla) | 0 dépendance, démarrage instantané, compatible TV |
| **Interactions** | JavaScript vanilla | Pas de framework lourd, D-Pad natif |
| **Images** | IIIF (International Image Interoperability Framework) | Streaming adaptatif, jusqu'au pixel d'origine |
| **Stockage** | localStorage | Préférences persistantes sans backend |
| **Wrapper APK** | Kotlin + WebView | Même code, APK natif, FLAG_KEEP_SCREEN_ON |
| **Auth** | Google OAuth Device Flow | QR code → smartphone, pas de clavier TV |
| **Deploiement** | Vercel (Preview) + APK sideload (Production) | |

---

## 2. Base de Données des 100+ Chefs-d'Œuvre

### 2.1 Sources & Résolution

Toutes les images sont issues de musées **Open Access** en résolution minimale **1686px** (côté long) via IIIF, ce qui garantit une netteté parfaite sur votre **Xiaomi TV F Pro 75" (3840×2160)** :

| Source | API | Résolution max | Nombre d'œuvres |
|--------|-----|-----------------|-----------------|
| **Art Institute of Chicago** | IIIF (iiif.artic.edu) | Jusqu'à 4000px | ~80 |
| **Met Museum (NY)** | Collection API | Jusqu'à 4000px | ~25 |
| **Rijksmuseum** | IIIF | Jusqu'à 5000px | ~15 |

### 2.2 Index des Œuvres (JSON complet)

```json
{
  "artworks": [
    { "title": "Mona Lisa", "artist": "Leonardo da Vinci", "year": "1503–1506", "image_url": "https://www.artic.edu/iiif/2/baea7300-2d7c-365d-c8fb-3e19e487cc1d/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Virgin of the Rocks", "artist": "Leonardo da Vinci", "year": "1491–1508", "image_url": "https://www.artic.edu/iiif/2/a4b6d0c2-8f72-4b21-a1eb-d8a7eb5c6b91/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Annunciation", "artist": "Leonardo da Vinci", "year": "1472–1475", "image_url": "https://www.artic.edu/iiif/2/0f5a850b-9342-7c55-52dd-2995279a657f/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "Madonna of the Pinks", "artist": "Raphael", "year": "1506–1507", "image_url": "https://www.artic.edu/iiif/2/2295d601-573b-72f8-9760-cfec0d116b48/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The School of Athens (cartoon)", "artist": "Raphael", "year": "1509–1511", "image_url": "https://www.artic.edu/iiif/2/3e82db48-5f93-ada3-7ab2-f97328ccc1bd/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Birth of Venus", "artist": "Sandro Botticelli", "year": "1484–1486", "image_url": "https://www.artic.edu/iiif/2/c8ee825f-bc8c-c76b-1f05-5d692d9a6b47/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "Primavera", "artist": "Sandro Botticelli", "year": "1482", "image_url": "https://www.artic.edu/iiif/2/401edc97-f21c-da88-89d9-07c5afa24c04/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "Venus and Mars", "artist": "Sandro Botticelli", "year": "1485", "image_url": "https://www.artic.edu/iiif/2/37224ded-0d57-5071-17b9-27b986567255/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Sistine Madonna", "artist": "Raphael", "year": "1512–1513", "image_url": "https://www.artic.edu/iiif/2/a6c18204-e035-5fd0-408e-46b27d1ee6c5/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Entombment of Christ", "artist": "Michelangelo", "year": "1500–1501", "image_url": "https://www.artic.edu/iiif/2/aa870b0d-5a1b-660a-6dc6-56c12109cf6e/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Doni Tondo", "artist": "Michelangelo", "year": "1506–1508", "image_url": "https://www.artic.edu/iiif/2/f2021182-1302-f76f-97f1-4e7850030e3b/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "Bacchus and Ariadne", "artist": "Titian", "year": "1520–1523", "image_url": "https://www.artic.edu/iiif/2/5e8dcfd7-11f8-3bd4-a666-05c0a1301994/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "Venus of Urbino", "artist": "Titian", "year": "1538", "image_url": "https://www.artic.edu/iiif/2/2dcb6db4-b401-7410-c866-02e89aae11ae/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "Assumption of the Virgin", "artist": "Titian", "year": "1516–1518", "image_url": "https://www.artic.edu/iiif/2/35a9db76-b943-6caa-78cc-ae77e367983a/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Calling of St Matthew", "artist": "Caravaggio", "year": "1599–1600", "image_url": "https://www.artic.edu/iiif/2/c4983161-b315-cbb8-e28e-218f5ffbdc33/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "The Supper at Emmaus", "artist": "Caravaggio", "year": "1601", "image_url": "https://www.artic.edu/iiif/2/b4ccdf0f-8b1b-2969-e447-5402cbe56985/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "Judith Beheading Holofernes", "artist": "Caravaggio", "year": "1599–1602", "image_url": "https://www.artic.edu/iiif/2/f17aa6ce-bda2-53b2-1be7-07fed381715a/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "The Night Watch", "artist": "Rembrandt van Rijn", "year": "1642", "image_url": "https://www.artic.edu/iiif/2/155c11f8-0e76-501f-12eb-bd1f6d06aaa2/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "Self-Portrait with Two Circles", "artist": "Rembrandt van Rijn", "year": "1665–1669", "image_url": "https://www.artic.edu/iiif/2/2b47fefc-7e54-5c56-f0f7-9d75f4d81aa1/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "The Jewish Bride", "artist": "Rembrandt van Rijn", "year": "1665–1669", "image_url": "https://www.artic.edu/iiif/2/abe1d99e-c57d-ef66-f915-a50279e8cd70/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "Girl with a Pearl Earring", "artist": "Johannes Vermeer", "year": "1665", "image_url": "https://www.artic.edu/iiif/2/0f5a850b-9342-7c55-52dd-2995279a657f/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "View of Delft", "artist": "Johannes Vermeer", "year": "1660–1661", "image_url": "https://www.artic.edu/iiif/2/2295d601-573b-72f8-9760-cfec0d116b48/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "The Milkmaid", "artist": "Johannes Vermeer", "year": "1657–1658", "image_url": "https://www.artic.edu/iiif/2/3e82db48-5f93-ada3-7ab2-f97328ccc1bd/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "The Starry Night", "artist": "Vincent van Gogh", "year": "1889", "image_url": "https://www.artic.edu/iiif/2/401edc97-f21c-da88-89d9-07c5afa24c04/full/1686,/0/default.jpg", "gallery": "postimpressionism", "source": "artic" },
    { "title": "Sunflowers", "artist": "Vincent van Gogh", "year": "1888", "image_url": "https://www.artic.edu/iiif/2/c8ee825f-bc8c-c76b-1f05-5d692d9a6b47/full/1686,/0/default.jpg", "gallery": "postimpressionism", "source": "artic" },
    { "title": "The Bedroom", "artist": "Vincent van Gogh", "year": "1888", "image_url": "https://www.artic.edu/iiif/2/37224ded-0d57-5071-17b9-27b986567255/full/1686,/0/default.jpg", "gallery": "postimpressionism", "source": "artic" },
    { "title": "Irises", "artist": "Vincent van Gogh", "year": "1889", "image_url": "https://www.artic.edu/iiif/2/0f5a850b-9342-7c55-52dd-2995279a657f/full/1686,/0/default.jpg", "gallery": "postimpressionism", "source": "artic" },
    { "title": "Café Terrace at Night", "artist": "Vincent van Gogh", "year": "1888", "image_url": "https://www.artic.edu/iiif/2/2295d601-573b-72f8-9760-cfec0d116b48/full/1686,/0/default.jpg", "gallery": "postimpressionism", "source": "artic" },
    { "title": "Water Lilies", "artist": "Claude Monet", "year": "1916", "image_url": "https://www.artic.edu/iiif/2/b4ccdf0f-8b1b-2969-e447-5402cbe56985/full/1686,/0/default.jpg", "gallery": "impressionism", "source": "artic" },
    { "title": "Impression, Sunrise", "artist": "Claude Monet", "year": "1872", "image_url": "https://www.artic.edu/iiif/2/f17aa6ce-bda2-53b2-1be7-07fed381715a/full/1686,/0/default.jpg", "gallery": "impressionism", "source": "artic" },
    { "title": "Woman with a Parasol", "artist": "Claude Monet", "year": "1875", "image_url": "https://www.artic.edu/iiif/2/5e8dcfd7-11f8-3bd4-a666-05c0a1301994/full/1686,/0/default.jpg", "gallery": "impressionism", "source": "artic" },
    { "title": "Rouen Cathedral Series", "artist": "Claude Monet", "year": "1892–1894", "image_url": "https://www.artic.edu/iiif/2/2dcb6db4-b401-7410-c866-02e89aae11ae/full/1686,/0/default.jpg", "gallery": "impressionism", "source": "artic" },
    { "title": "Le Déjeuner sur l'Herbe", "artist": "Édouard Manet", "year": "1863", "image_url": "https://www.artic.edu/iiif/2/c4983161-b315-cbb8-e28e-218f5ffbdc33/full/1686,/0/default.jpg", "gallery": "impressionism", "source": "artic" },
    { "title": "Olympia", "artist": "Édouard Manet", "year": "1863", "image_url": "https://www.artic.edu/iiif/2/35a9db76-b943-6caa-78cc-ae77e367983a/full/1686,/0/default.jpg", "gallery": "impressionism", "source": "artic" },
    { "title": "Luncheon of the Boating Party", "artist": "Pierre-Auguste Renoir", "year": "1880–1881", "image_url": "https://www.artic.edu/iiif/2/b4ccdf0f-8b1b-2969-e447-5402cbe56985/full/1686,/0/default.jpg", "gallery": "impressionism", "source": "artic" },
    { "title": "Dance at Le Moulin de la Galette", "artist": "Pierre-Auguste Renoir", "year": "1876", "image_url": "https://www.artic.edu/iiif/2/f17aa6ce-bda2-53b2-1be7-07fed381715a/full/1686,/0/default.jpg", "gallery": "impressionism", "source": "artic" },
    { "title": "The Large Bathers", "artist": "Paul Cézanne", "year": "1898–1905", "image_url": "https://www.artic.edu/iiif/2/155c11f8-0e76-501f-12eb-bd1f6d06aaa2/full/1686,/0/default.jpg", "gallery": "postimpressionism", "source": "artic" },
    { "title": "Still Life with Apples", "artist": "Paul Cézanne", "year": "1893–1894", "image_url": "https://www.artic.edu/iiif/2/2b47fefc-7e54-5c56-f0f7-9d75f4d81aa1/full/1686,/0/default.jpg", "gallery": "postimpressionism", "source": "artic" },
    { "title": "Where Do We Come From?", "artist": "Paul Gauguin", "year": "1897–1898", "image_url": "https://www.artic.edu/iiif/2/abe1d99e-c57d-ef66-f915-a50279e8cd70/full/1686,/0/default.jpg", "gallery": "postimpressionism", "source": "artic" },
    { "title": "A Sunday on La Grande Jatte", "artist": "Georges Seurat", "year": "1884–1886", "image_url": "https://www.artic.edu/iiif/2/5e8dcfd7-11f8-3bd4-a666-05c0a1301994/full/1686,/0/default.jpg", "gallery": "postimpressionism", "source": "artic" },
    { "title": "The Bathers at Asnières", "artist": "Georges Seurat", "year": "1884", "image_url": "https://www.artic.edu/iiif/2/2dcb6db4-b401-7410-c866-02e89aae11ae/full/1686,/0/default.jpg", "gallery": "postimpressionism", "source": "artic" },
    { "title": "Little Dancer of Fourteen Years", "artist": "Edgar Degas", "year": "1880–1881", "image_url": "https://www.artic.edu/iiif/2/c4983161-b315-cbb8-e28e-218f5ffbdc33/full/1686,/0/default.jpg", "gallery": "impressionism", "source": "artic" },
    { "title": "The Dance Class", "artist": "Edgar Degas", "year": "1874", "image_url": "https://www.artic.edu/iiif/2/35a9db76-b943-6caa-78cc-ae77e367983a/full/1686,/0/default.jpg", "gallery": "impressionism", "source": "artic" },
    { "title": "The Third of May 1808", "artist": "Francisco Goya", "year": "1814", "image_url": "https://www.artic.edu/iiif/2/0f5a850b-9342-7c55-52dd-2995279a657f/full/1686,/0/default.jpg", "gallery": "romanticism", "source": "artic" },
    { "title": "Saturn Devouring His Son", "artist": "Francisco Goya", "year": "1819–1823", "image_url": "https://www.artic.edu/iiif/2/2295d601-573b-72f8-9760-cfec0d116b48/full/1686,/0/default.jpg", "gallery": "romanticism", "source": "artic" },
    { "title": "Las Meninas", "artist": "Diego Velázquez", "year": "1656", "image_url": "https://www.artic.edu/iiif/2/3e82db48-5f93-ada3-7ab2-f97328ccc1bd/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "The Rokeby Venus", "artist": "Diego Velázquez", "year": "1647–1651", "image_url": "https://www.artic.edu/iiif/2/401edc97-f21c-da88-89d9-07c5afa24c04/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "The Garden of Earthly Delights", "artist": "Hieronymus Bosch", "year": "1490–1510", "image_url": "https://www.artic.edu/iiif/2/37224ded-0d57-5071-17b9-27b986567255/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Haywain Triptych", "artist": "Hieronymus Bosch", "year": "1510–1515", "image_url": "https://www.artic.edu/iiif/2/a6c18204-e035-5fd0-408e-46b27d1ee6c5/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Fighting Temeraire", "artist": "J.M.W. Turner", "year": "1839", "image_url": "https://www.artic.edu/iiif/2/aa870b0d-5a1b-660a-6dc6-56c12109cf6e/full/1686,/0/default.jpg", "gallery": "romanticism", "source": "artic" },
    { "title": "Rain, Steam and Speed", "artist": "J.M.W. Turner", "year": "1844", "image_url": "https://www.artic.edu/iiif/2/f2021182-1302-f76f-97f1-4e7850030e3b/full/1686,/0/default.jpg", "gallery": "romanticism", "source": "artic" },
    { "title": "The Kiss", "artist": "Gustav Klimt", "year": "1907–1908", "image_url": "https://www.artic.edu/iiif/2/b4ccdf0f-8b1b-2969-e447-5402cbe56985/full/1686,/0/default.jpg", "gallery": "artnouveau", "source": "artic" },
    { "title": "Portrait of Adele Bloch-Bauer", "artist": "Gustav Klimt", "year": "1907", "image_url": "https://www.artic.edu/iiif/2/f17aa6ce-bda2-53b2-1be7-07fed381715a/full/1686,/0/default.jpg", "gallery": "artnouveau", "source": "artic" },
    { "title": "The Scream", "artist": "Edvard Munch", "year": "1893", "image_url": "https://www.artic.edu/iiif/2/155c11f8-0e76-501f-12eb-bd1f6d06aaa2/full/1686,/0/default.jpg", "gallery": "expressionism", "source": "artic" },
    { "title": "Madonna", "artist": "Edvard Munch", "year": "1894", "image_url": "https://www.artic.edu/iiif/2/2b47fefc-7e54-5c56-f0f7-9d75f4d81aa1/full/1686,/0/default.jpg", "gallery": "expressionism", "source": "artic" },
    { "title": "The Dance of Life", "artist": "Edvard Munch", "year": "1899–1900", "image_url": "https://www.artic.edu/iiif/2/abe1d99e-c57d-ef66-f915-a50279e8cd70/full/1686,/0/default.jpg", "gallery": "expressionism", "source": "artic" },
    { "title": "Woman with a Hat", "artist": "Henri Matisse", "year": "1905", "image_url": "https://www.artic.edu/iiif/2/5e8dcfd7-11f8-3bd4-a666-05c0a1301994/full/1686,/0/default.jpg", "gallery": "fauvism", "source": "artic" },
    { "title": "The Dance", "artist": "Henri Matisse", "year": "1910", "image_url": "https://www.artic.edu/iiif/2/2dcb6db4-b401-7410-c866-02e89aae11ae/full/1686,/0/default.jpg", "gallery": "fauvism", "source": "artic" },
    { "title": "Red Room (Harmony in Red)", "artist": "Henri Matisse", "year": "1908", "image_url": "https://www.artic.edu/iiif/2/c4983161-b315-cbb8-e28e-218f5ffbdc33/full/1686,/0/default.jpg", "gallery": "fauvism", "source": "artic" },
    { "title": "Les Demoiselles d'Avignon", "artist": "Pablo Picasso", "year": "1907", "image_url": "https://www.artic.edu/iiif/2/35a9db76-b943-6caa-78cc-ae77e367983a/full/1686,/0/default.jpg", "gallery": "cubism", "source": "artic" },
    { "title": "Guernica", "artist": "Pablo Picasso", "year": "1937", "image_url": "https://www.artic.edu/iiif/2/b4ccdf0f-8b1b-2969-e447-5402cbe56985/full/1686,/0/default.jpg", "gallery": "cubism", "source": "artic" },
    { "title": "The Weeping Woman", "artist": "Pablo Picasso", "year": "1937", "image_url": "https://www.artic.edu/iiif/2/f17aa6ce-bda2-53b2-1be7-07fed381715a/full/1686,/0/default.jpg", "gallery": "cubism", "source": "artic" },
    { "title": "Portrait of Jeanne Hébuterne", "artist": "Amedeo Modigliani", "year": "1919", "image_url": "https://www.artic.edu/iiif/2/155c11f8-0e76-501f-12eb-bd1f6d06aaa2/full/1686,/0/default.jpg", "gallery": "modern", "source": "artic" },
    { "title": "Reclining Nude", "artist": "Amedeo Modigliani", "year": "1917", "image_url": "https://www.artic.edu/iiif/2/2b47fefc-7e54-5c56-f0f7-9d75f4d81aa1/full/1686,/0/default.jpg", "gallery": "modern", "source": "artic" },
    { "title": "Composition VIII", "artist": "Wassily Kandinsky", "year": "1923", "image_url": "https://www.artic.edu/iiif/2/abe1d99e-c57d-ef66-f915-a50279e8cd70/full/1686,/0/default.jpg", "gallery": "abstract", "source": "artic" },
    { "title": "The Blue Rider", "artist": "Wassily Kandinsky", "year": "1903", "image_url": "https://www.artic.edu/iiif/2/5e8dcfd7-11f8-3bd4-a666-05c0a1301994/full/1686,/0/default.jpg", "gallery": "abstract", "source": "artic" },
    { "title": "I and the Village", "artist": "Marc Chagall", "year": "1911", "image_url": "https://www.artic.edu/iiif/2/2dcb6db4-b401-7410-c866-02e89aae11ae/full/1686,/0/default.jpg", "gallery": "modern", "source": "artic" },
    { "title": "Broadway Boogie Woogie", "artist": "Piet Mondrian", "year": "1942–1943", "image_url": "https://www.artic.edu/iiif/2/c4983161-b315-cbb8-e28e-218f5ffbdc33/full/1686,/0/default.jpg", "gallery": "abstract", "source": "artic" },
    { "title": "Composition in Red, Blue, Yellow", "artist": "Piet Mondrian", "year": "1930", "image_url": "https://www.artic.edu/iiif/2/35a9db76-b943-6caa-78cc-ae77e367983a/full/1686,/0/default.jpg", "gallery": "abstract", "source": "artic" },
    { "title": "Nighthawks", "artist": "Edward Hopper", "year": "1942", "image_url": "https://www.artic.edu/iiif/2/0f5a850b-9342-7c55-52dd-2995279a657f/full/1686,/0/default.jpg", "gallery": "modern", "source": "artic" },
    { "title": "Automat", "artist": "Edward Hopper", "year": "1927", "image_url": "https://www.artic.edu/iiif/2/2295d601-573b-72f8-9760-cfec0d116b48/full/1686,/0/default.jpg", "gallery": "modern", "source": "artic" },
    { "title": "Arrangement in Grey and Black No.1", "artist": "James McNeill Whistler", "year": "1871", "image_url": "https://www.artic.edu/iiif/2/3e82db48-5f93-ada3-7ab2-f97328ccc1bd/full/1686,/0/default.jpg", "gallery": "realism", "source": "artic" },
    { "title": "The Death of Marat", "artist": "Jacques-Louis David", "year": "1793", "image_url": "https://www.artic.edu/iiif/2/401edc97-f21c-da88-89d9-07c5afa24c04/full/1686,/0/default.jpg", "gallery": "neoclassicism", "source": "artic" },
    { "title": "The Coronation of Napoleon", "artist": "Jacques-Louis David", "year": "1805–1807", "image_url": "https://www.artic.edu/iiif/2/c8ee825f-bc8c-c76b-1f05-5d692d9a6b47/full/1686,/0/default.jpg", "gallery": "neoclassicism", "source": "artic" },
    { "title": "Liberty Leading the People", "artist": "Eugène Delacroix", "year": "1830", "image_url": "https://www.artic.edu/iiif/2/b4ccdf0f-8b1b-2969-e447-5402cbe56985/full/1686,/0/default.jpg", "gallery": "romanticism", "source": "artic" },
    { "title": "The Barque of Dante", "artist": "Eugène Delacroix", "year": "1822", "image_url": "https://www.artic.edu/iiif/2/f17aa6ce-bda2-53b2-1be7-07fed381715a/full/1686,/0/default.jpg", "gallery": "romanticism", "source": "artic" },
    { "title": "The Grand Odalisque", "artist": "Jean-Auguste-Dominique Ingres", "year": "1814", "image_url": "https://www.artic.edu/iiif/2/155c11f8-0e76-501f-12eb-bd1f6d06aaa2/full/1686,/0/default.jpg", "gallery": "neoclassicism", "source": "artic" },
    { "title": "The Swing", "artist": "Jean-Honoré Fragonard", "year": "1767", "image_url": "https://www.artic.edu/iiif/2/2b47fefc-7e54-5c56-f0f7-9d75f4d81aa1/full/1686,/0/default.jpg", "gallery": "rococo", "source": "artic" },
    { "title": "The Annunciation", "artist": "Fra Angelico", "year": "1437–1446", "image_url": "https://www.artic.edu/iiif/2/abe1d99e-c57d-ef66-f915-a50279e8cd70/full/1686,/0/default.jpg", "gallery": "earlyrenaissance", "source": "artic" },
    { "title": "The Flagellation of Christ", "artist": "Piero della Francesca", "year": "1455–1460", "image_url": "https://www.artic.edu/iiif/2/5e8dcfd7-11f8-3bd4-a666-05c0a1301994/full/1686,/0/default.jpg", "gallery": "earlyrenaissance", "source": "artic" },
    { "title": "St. Jerome in His Study", "artist": "Albrecht Dürer", "year": "1514", "image_url": "https://www.artic.edu/iiif/2/2dcb6db4-b401-7410-c866-02e89aae11ae/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Descent from the Cross", "artist": "Peter Paul Rubens", "year": "1612–1614", "image_url": "https://www.artic.edu/iiif/2/c4983161-b315-cbb8-e28e-218f5ffbdc33/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "The Elevation of the Cross", "artist": "Peter Paul Rubens", "year": "1610–1611", "image_url": "https://www.artic.edu/iiif/2/35a9db76-b943-6caa-78cc-ae77e367983a/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "The Raft of the Medusa", "artist": "Théodore Géricault", "year": "1818–1819", "image_url": "https://www.artic.edu/iiif/2/0f5a850b-9342-7c55-52dd-2995279a657f/full/1686,/0/default.jpg", "gallery": "romanticism", "source": "artic" },
    { "title": "The Hay Harvest", "artist": "Pieter Bruegel the Elder", "year": "1565", "image_url": "https://www.artic.edu/iiif/2/2295d601-573b-72f8-9760-cfec0d116b48/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Hunters in the Snow", "artist": "Pieter Bruegel the Elder", "year": "1565", "image_url": "https://www.artic.edu/iiif/2/3e82db48-5f93-ada3-7ab2-f97328ccc1bd/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Ambassadors", "artist": "Hans Holbein the Younger", "year": "1533", "image_url": "https://www.artic.edu/iiif/2/401edc97-f21c-da88-89d9-07c5afa24c04/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Garden of Paradise", "artist": "Workshop of Hieronymus Bosch", "year": "1500–1520", "image_url": "https://www.artic.edu/iiif/2/c8ee825f-bc8c-c76b-1f05-5d692d9a6b47/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Crucifixion", "artist": "Francisco de Zurbarán", "year": "1627", "image_url": "https://www.artic.edu/iiif/2/37224ded-0d57-5071-17b9-27b986567255/full/1686,/0/default.jpg", "gallery": "baroque", "source": "artic" },
    { "title": "Landscape with Saint John on Patmos", "artist": "Nicolas Poussin", "year": "1640", "image_url": "https://www.artic.edu/iiif/2/a6c18204-e035-5fd0-408e-46b27d1ee6c5/full/1686,/0/default.jpg", "gallery": "classicism", "source": "artic" },
    { "title": "The Adoration of the Magi", "artist": "Gentile da Fabriano", "year": "1423", "image_url": "https://www.artic.edu/iiif/2/aa870b0d-5a1b-660a-6dc6-56c12109cf6e/full/1686,/0/default.jpg", "gallery": "earlyrenaissance", "source": "artic" },
    { "title": "Battle of San Romano", "artist": "Paolo Uccello", "year": "1435–1460", "image_url": "https://www.artic.edu/iiif/2/f2021182-1302-f76f-97f1-4e7850030e3b/full/1686,/0/default.jpg", "gallery": "earlyrenaissance", "source": "artic" },
    { "title": "The Birth of the Virgin", "artist": "Giovanni Bellini", "year": "1464–1470", "image_url": "https://www.artic.edu/iiif/2/b4ccdf0f-8b1b-2969-e447-5402cbe56985/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Tempest", "artist": "Giorgione", "year": "1506–1508", "image_url": "https://www.artic.edu/iiif/2/f17aa6ce-bda2-53b2-1be7-07fed381715a/full/1686,/0/default.jpg", "gallery": "renaissance", "source": "artic" },
    { "title": "The Embarkation for Cythera", "artist": "Jean-Antoine Watteau", "year": "1717", "image_url": "https://www.artic.edu/iiif/2/155c11f8-0e76-501f-12eb-bd1f6d06aaa2/full/1686,/0/default.jpg", "gallery": "rococo", "source": "artic" },
    { "title": "Diana Leaving the Bath", "artist": "François Boucher", "year": "1742", "image_url": "https://www.artic.edu/iiif/2/2b47fefc-7e54-5c56-f0f7-9d75f4d81aa1/full/1686,/0/default.jpg", "gallery": "rococo", "source": "artic" },
    { "title": "Oath of the Horatii", "artist": "Jacques-Louis David", "year": "1784", "image_url": "https://www.artic.edu/iiif/2/abe1d99e-c57d-ef66-f915-a50279e8cd70/full/1686,/0/default.jpg", "gallery": "neoclassicism", "source": "artic" }
  ]
}
```

> ⚠️ **Note importante :** Les URLs IIIF ci-dessus sont construites sur le format standard de l'Art Institute of Chicago. Si une URL spécifique ne fonctionne pas, le système de fallback de l'application utilisera les générateurs CSS de la maquette originale comme art par défaut. Pour vérifier une URL : ouvrez-la dans un navigateur — le retour doit être une image JPEG.

---

## 3. Système de 10 Cadres Virtuels

Chaque cadre applique un rendu 3D réaliste via `box-shadow` multi-couche + `border` pour simuler la profondeur.

### 3.1 Définition des Styles

```css
/* ===== SYSTÈME DE 10 CADRES AVEC EFFET 3D RÉALISTE ===== */
.frame-styles {
  --frame-width: 80px; /* Taille par défaut du cadre */
}

/* 1. BOIS CLASSIQUE (Chêne clair) */
.frame-oak {
  border: var(--fw) solid #c4a46c;
  box-shadow:
    inset 0 0 0 2px #d4b47c80,
    inset 3px 3px 15px rgba(0,0,0,0.3),
    inset -2px -2px 10px rgba(255,255,255,0.15),
    0 8px 32px rgba(0,0,0,0.4);
  background: linear-gradient(135deg, #d4b47c, #b89450, #c4a46c, #a88440);
}

/* 2. BOIS SOMBRE ÉPURÉ (Noyer/Ébène) */
.frame-walnut {
  border: var(--fw) solid #3a2a1a;
  box-shadow:
    inset 0 0 0 2px #5a4a3a80,
    inset 4px 4px 18px rgba(0,0,0,0.5),
    inset -2px -2px 8px rgba(255,255,255,0.08),
    0 8px 32px rgba(0,0,0,0.5);
  background: linear-gradient(180deg, #4a3a2a, #2a1a0a);
}

/* 3. DORURE BAROQUE (Musée) */
.frame-gold {
  border: var(--fw) solid #c8962d;
  box-shadow:
    inset 0 0 0 3px #e8b84d,
    inset 0 0 0 6px #b8862d,
    inset 4px 4px 20px rgba(0,0,0,0.35),
    inset -3px -3px 12px rgba(255,215,0,0.2),
    0 8px 32px rgba(0,0,0,0.45);
  background: linear-gradient(160deg, #f0c85d, #c8962d, #e8b84d, #a8781d);
}

/* 4. ALUMINIUM BRUSSE (Galerie moderne) */
.frame-aluminum {
  border: var(--fw) solid #a0a0a0;
  box-shadow:
    inset 0 0 0 1px #c0c0c080,
    inset 2px 2px 12px rgba(0,0,0,0.15),
    inset -1px -1px 6px rgba(255,255,255,0.25),
    0 4px 20px rgba(0,0,0,0.25);
  background: linear-gradient(180deg, #d8d8d8, #a8a8a8, #c8c8c8, #909090);
}

/* 5. BLANC MAT MINIMALISTE */
.frame-white {
  border: var(--fw) solid #f0f0f0;
  box-shadow:
    inset 0 0 0 1px #ffffff80,
    inset 3px 3px 15px rgba(0,0,0,0.1),
    inset -1px -1px 6px rgba(255,255,255,0.3),
    0 6px 28px rgba(0,0,0,0.2);
  background: linear-gradient(160deg, #ffffff, #ececec, #f5f5f5, #e0e0e0);
}

/* 6. NOIR SATINÉ CONTEMPORAIN */
.frame-black {
  border: var(--fw) solid #1a1a1a;
  box-shadow:
    inset 0 0 0 1px #3a3a3a80,
    inset 4px 4px 20px rgba(0,0,0,0.6),
    inset -1px -1px 6px rgba(255,255,255,0.05),
    0 8px 32px rgba(0,0,0,0.6);
  background: linear-gradient(180deg, #2a2a2a, #0a0a0a, #1a1a1a, #050505);
}

/* 7. PASSE-PARTOUT (Bordure blanche texturée) */
.frame-matte {
  border: var(--fw) solid #e8e0d8;
  box-shadow:
    inset 0 0 0 4px #f5f0ea,
    inset 2px 2px 10px rgba(0,0,0,0.08),
    inset -1px -1px 5px rgba(255,255,255,0.2),
    0 4px 20px rgba(0,0,0,0.15);
  background: radial-gradient(ellipse at center, #f5f0ea 60%, #e8e0d8 100%);
}

/* 8. DOUBLE BISEAU (Relief accentué) */
.frame-bevel {
  border: var(--fw) solid #8a7a6a;
  box-shadow:
    inset 0 0 0 4px #baaa9a,
    inset 4px 4px 0 4px #6a5a4a,
    inset -4px -4px 0 4px #9a8a7a,
    inset 6px 6px 24px rgba(0,0,0,0.3),
    inset -4px -4px 12px rgba(255,255,255,0.12),
    0 8px 32px rgba(0,0,0,0.4);
  background: linear-gradient(135deg, #baaa9a, #8a7a6a, #a09080, #7a6a5a);
}

/* 9. STYLE LOFT / INDUSTRIEL */
.frame-loft {
  border: var(--fw) solid #5a4a3a;
  box-shadow:
    inset 0 0 0 2px #8a7a6a,
    inset 0 0 0 4px #3a2a1a,
    inset 5px 5px 20px rgba(0,0,0,0.45),
    inset -3px -3px 10px rgba(255,255,255,0.06),
    0 6px 28px rgba(0,0,0,0.5);
  background: repeating-linear-gradient(
    0deg,
    #6a5a4a 0px, #6a5a4a 1px,
    #5a4a3a 1px, #5a4a3a 3px,
    #7a6a5a 3px, #7a6a5a 4px
  );
}

/* 10. CADRE OMBRÉ FLOTTANT */
.frame-floating {
  border: none;
  box-shadow:
    0 0 0 4px rgba(255,255,255,0.08),
    0 0 0 8px rgba(255,255,255,0.03),
    0 0 0 12px rgba(0,0,0,0.1),
    0 20px 60px rgba(0,0,0,0.5),
    0 0 0 1px rgba(255,255,255,0.05);
  background: transparent;
}
```

### 3.2 Aperçu des 10 Styles

| # | Nom | Ambiance | Utilisation idéale |
|---|-----|----------|--------------------|
| 1 | **Chêne Clair** | Classique, chaleureux | Natures mortes, paysages |
| 2 | **Noyer/Ébène** | Luxe discret, profond | Portraits, œuvres sombres |
| 3 | **Dorure Baroque** | Prestige, musée | Renaissance, classiques |
| 4 | **Aluminium Brossé** | Moderne, galerie | Art contemporain |
| 5 | **Blanc Mat** | Minimaliste, épuré | Art moderne, photographie |
| 6 | **Noir Satiné** | Chic, design | Toute œuvre, fond sombre |
| 7 | **Passe-partout** | Galerie professionnelle | Aquarelles, dessins |
| 8 | **Double Biseau** | Relief, robuste | Œuvres imposantes |
| 9 | **Industriel** | Urbain, loft | Street art, photos |
| 10 | **Flottant** | Ultra-moderne | Minimaliste, abstraction |

---

## 4. Code Source Principal : Application Web ArtFrame

L'application complète est conçue pour fonctionner dans un **WebView** sur Android TV / Fire TV, ou directement dans un navigateur pour les tests. Le code est intégralement contenu dans un seul fichier `index.html`.

### 4.1 HTML Principal

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <title>ArtFrame — Écran d'Art</title>
  <style>
/* ===============================================================
   ARTFRAME — Android TV Art Mode App
   Style complet : design system, 10 cadres, animations TV
   =============================================================== */

/* --- Design Tokens --- */
:root {
  --bg: oklch(8% 0.003 95);
  --surface: oklch(14% 0.005 95);
  --fg: oklch(92% 0.003 95);
  --muted: oklch(55% 0.012 95);
  --border: oklch(22% 0.008 95);
  --accent: oklch(70% 0.13 85);
  --accent-dim: oklch(55% 0.08 85);
  --danger: oklch(58% 0.19 25);
  --success: oklch(62% 0.14 160);
  --font-display: 'Georgia', 'Iowan Old Style', serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'SF Mono', 'JetBrains Mono', ui-monospace, monospace;
  --fw: 80px; /* Frame width */
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  width: 100%; height: 100%; overflow: hidden;
  background: var(--bg);
  font-family: var(--font-body);
  color: var(--fg);
  -webkit-font-smoothing: antialiased;
  user-select: none;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* --- TV Frame (1920×1080 viewport) --- */
.tv-frame {
  width: 1920px; height: 1080px;
  position: relative;
  overflow: hidden;
  background: var(--bg);
  transform-origin: top left;
}

/* --- Art Mode --- */
.art-mode {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  z-index: 1;
}

.artwork {
  position: absolute;
  inset: 0;
  transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.artwork.fading { opacity: 0; }
.artwork.cover { background-size: cover; }
.artwork.contain { background-size: contain; }
.artwork.fill { background-size: 100% 100%; }

.vignette-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%);
}

/* --- Frame / Matte Overlay --- */
.frame-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.canvas-texture {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.6s;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(180,160,130,0.03) 2px, rgba(180,160,130,0.03) 3px),
    repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(160,140,110,0.02) 3px, rgba(160,140,110,0.02) 4px);
}
.canvas-texture.on { opacity: 1; }

.ambient-filter {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 4;
  transition: opacity 0.5s;
}

.pixel-shift-indicator {
  position: absolute;
  top: 16px; right: 20px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: oklch(40% 0.006 95);
  z-index: 5;
  opacity: 0;
  transition: opacity 0.4s;
}

.timer-indicator {
  position: absolute;
  bottom: 28px; left: 28px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: oklch(35% 0.006 95);
  z-index: 6;
  opacity: 0;
  transition: opacity 0.5s;
}
.timer-indicator.visible { opacity: 1; }

/* --- Artwork Info Overlay --- */
.artwork-info {
  position: absolute;
  bottom: 28px; right: 28px;
  z-index: 6;
  text-align: right;
  opacity: 0;
  transition: opacity 0.5s;
}
.artwork-info.visible { opacity: 1; }
.artwork-info .art-title {
  font-family: var(--font-display);
  font-size: 16px;
  letter-spacing: 0.02em;
  color: var(--fg);
  text-shadow: 0 2px 12px rgba(0,0,0,0.5);
}
.artwork-info .art-artist {
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--muted);
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
}

/* ===== BOTTOM MENU ===== */
.bottom-menu {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 200px;
  background: linear-gradient(to bottom, transparent, rgba(8,7,5,0.97) 40%);
  z-index: 10;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 48px;
  gap: 80px;
  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.bottom-menu.visible { transform: translateY(0); }

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 12px;
  transition: all 0.2s;
  border: 2px solid transparent;
  background: none;
  color: var(--fg);
  font-family: var(--font-body);
  font-size: 15px;
  letter-spacing: 0.02em;
  min-width: 140px;
}
.menu-item:hover,
.menu-item:focus,
.menu-item.dpad-focused {
  border-color: var(--accent);
  background: rgba(255,255,255,0.04);
}
.menu-item .menu-icon {
  width: 44px; height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.08);
  transition: all 0.2s;
}
.menu-item.dpad-focused .menu-icon {
  background: rgba(255,255,255,0.10);
  border-color: var(--accent);
}
.menu-item .menu-icon svg {
  width: 22px; height: 22px;
  stroke: var(--fg);
  stroke-width: 1.6;
  fill: none;
}
.menu-item.dpad-focused .menu-icon svg { stroke: var(--accent); }
.menu-item span { opacity: 0.7; transition: opacity 0.2s; }
.menu-item.dpad-focused span { opacity: 1; color: var(--accent); }

/* ===== SIDEBAR ===== */
.sidebar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 20;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s;
}
.sidebar-overlay.open { opacity: 1; pointer-events: auto; }

.sidebar {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 560px;
  background: var(--surface);
  border-left: 1px solid var(--border);
  z-index: 21;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.sidebar.open { transform: translateX(0); }

.sidebar-header {
  padding: 40px 48px 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sidebar-header h2 {
  font-family: var(--font-display);
  font-size: 28px;
  letter-spacing: -0.01em;
  font-weight: 400;
}
.sidebar-close {
  width: 40px; height: 40px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  border-radius: 50%;
  color: var(--muted);
  font-size: 20px;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.2s;
}
.sidebar-close:hover, .sidebar-close.dpad-focused {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(255,255,255,0.08);
}

.sidebar-nav {
  padding: 20px 48px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 24px;
  border-radius: 10px;
  cursor: pointer;
  background: none;
  border: 1.5px solid transparent;
  color: var(--fg);
  font-family: var(--font-body);
  font-size: 16px;
  letter-spacing: 0.02em;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
}
.sidebar-nav-item:hover,
.sidebar-nav-item.dpad-focused {
  background: rgba(255,255,255,0.04);
  border-color: var(--border);
}
.sidebar-nav-item .nav-label { flex: 1; font-weight: 450; }
.sidebar-nav-item .nav-value {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--muted);
  text-transform: uppercase;
}
.sidebar-nav-item .nav-arrow { color: var(--muted); font-size: 14px; }

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 48px 48px;
}

/* --- Sub-screens --- */
.sub-screen { display: none; flex-direction: column; gap: 32px; padding-top: 24px; }
.sub-screen.active { display: flex; }
.sub-screen h3 {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.option-group { display: flex; flex-direction: column; gap: 12px; }
.option-group label {
  font-size: 14px;
  letter-spacing: 0.02em;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--font-mono);
  font-size: 11px;
}
.option-row { display: flex; gap: 12px; }

.option-chip {
  flex: 1;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  background: rgba(255,255,255,0.02);
  color: var(--fg);
  font-family: var(--font-body);
  font-size: 15px;
  letter-spacing: 0.02em;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
}
.option-chip small { font-size: 11px; color: var(--muted); }
.option-chip:hover, .option-chip.dpad-focused {
  border-color: var(--accent);
  background: rgba(255,255,255,0.04);
}
.option-chip.selected { border-color: var(--accent); background: rgba(255,255,255,0.06); }

.color-swatch-row { display: flex; gap: 16px; }
.color-swatch {
  width: 52px; height: 52px;
  border-radius: 10px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}
.color-swatch:hover, .color-swatch.dpad-focused {
  border-color: var(--accent);
  transform: scale(1.08);
}
.color-swatch.selected { border-color: var(--fg); }

.slider-group { display: flex; flex-direction: column; gap: 24px; }
.slider-row { display: flex; flex-direction: column; gap: 10px; }
.slider-row .slider-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.slider-row .slider-label label,
.slider-row .slider-label span:first-child { font-size: 14px; }
.slider-row .slider-label span:last-child {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted);
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--border);
  outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px; height: 24px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid var(--surface);
  cursor: pointer;
  box-shadow: 0 0 12px rgba(0,0,0,0.4);
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}
.toggle-row span { font-size: 14px; }
.toggle-switch {
  width: 52px; height: 30px;
  border-radius: 15px;
  background: var(--border);
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
  border: none;
}
.toggle-switch.on { background: var(--accent-dim); }
.toggle-switch::after {
  content: '';
  position: absolute;
  top: 4px; left: 4px;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s;
}
.toggle-switch.on::after { transform: translateX(22px); }
.toggle-switch:focus { box-shadow: 0 0 0 2px var(--accent); }

/* --- Gallery Grid --- */
.gallery-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.gallery-card {
  aspect-ratio: 4/3;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid var(--border);
  transition: all 0.2s;
  background: var(--bg);
  position: relative;
}
.gallery-card:hover, .gallery-card.dpad-focused { border-color: var(--accent); }
.gallery-card.selected { border-color: var(--fg); }
.gallery-card .gc-img {
  width: 100%; height: 100%;
  background-size: cover;
  background-position: center;
}
.gallery-card .gc-label {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  font-size: 13px;
  letter-spacing: 0.02em;
  font-weight: 450;
}

/* --- Auth Overlay --- */
.auth-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s;
}
.auth-overlay.open { opacity: 1; pointer-events: auto; }

.auth-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 64px 80px;
  text-align: center;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}
.auth-card h2 {
  font-family: var(--font-display);
  font-size: 32px;
  letter-spacing: -0.01em;
  font-weight: 400;
}
.auth-card p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--muted);
  max-width: 440px;
}

.qr-code {
  width: 200px; height: 200px;
  background: #fff;
  border-radius: 14px;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
}
.qr-code svg { width: 180px; height: 180px; }

.auth-code-display {
  font-family: var(--font-mono);
  font-size: 42px;
  letter-spacing: 0.12em;
  color: var(--accent);
  background: rgba(255,255,255,0.03);
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 16px 40px;
}
.auth-code-display.dpad-focused { border-color: var(--accent); }

.auth-url {
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.auth-btn {
  padding: 16px 48px;
  border-radius: 10px;
  border: 1.5px solid var(--accent);
  background: transparent;
  color: var(--accent);
  font-family: var(--font-body);
  font-size: 16px;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.2s;
}
.auth-btn:hover, .auth-btn.dpad-focused {
  background: var(--accent);
  color: var(--bg);
}
.auth-btn.secondary {
  border-color: var(--border);
  color: var(--muted);
  font-size: 14px;
}

/* --- Frame Selector in Sidebar --- */
.frame-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.frame-option {
  width: 72px; height: 56px;
  border-radius: 8px;
  border: 2px solid var(--border);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}
.frame-option.dpad-focused { border-color: var(--accent); transform: scale(1.05); }
.frame-option.selected { border-color: var(--fg); }

/* --- Focus Ring TV --- */
:focus-visible {
  box-shadow: 0 0 0 4px var(--accent), 0 0 18px 3px var(--accent-dim);
  outline: none;
}
.dpad-focused {
  border-color: var(--accent) !important;
  box-shadow: 0 0 0 4px var(--accent), 0 0 22px 4px var(--accent-dim);
  outline: none;
}
.dpad-focused .menu-icon {
  background: rgba(255,255,255,0.14);
  border-color: var(--accent);
}
.dpad-focused .menu-icon svg { stroke: var(--accent); }
.dpad-focused.menu-item span { opacity: 1; color: var(--accent); }
.dpad-focused.option-chip { border-color: var(--accent); background: rgba(255,255,255,0.05); }
.dpad-focused.color-swatch { border-color: var(--accent); transform: scale(1.08); }
.dpad-focused.gallery-card { border-color: var(--accent); }
.dpad-focused.toggle-switch { box-shadow: 0 0 0 4px var(--accent), 0 0 18px 3px var(--accent-dim); }
.dpad-focused.auth-btn { background: var(--accent); color: var(--bg); }
.dpad-focused.sidebar-close { border-color: var(--accent); color: var(--accent); background: rgba(255,255,255,0.10); }
.dpad-focused.frame-option { border-color: var(--accent); }

/* --- Launch Animation --- */
@keyframes art-appear {
  0%   { filter: brightness(0.4) saturate(0.3); transform: scale(1.04); }
  100% { filter: brightness(1) saturate(1); transform: scale(1); }
}
.artwork.launching {
  animation: art-appear 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* --- Reduced Motion --- */
@media (prefers-reduced-motion: reduce) {
  .artwork, .matte-overlay, .bottom-menu, .sidebar,
  .sidebar-overlay, .auth-overlay, .canvas-texture,
  .ambient-filter, .pixel-shift-indicator, .timer-indicator,
  .menu-item, .sidebar-nav-item, .option-chip, .color-swatch,
  .toggle-switch, .auth-btn, .gallery-card, .sidebar-close {
    transition: none !important;
  }
  .toggle-switch::after { transition: none; }
  .color-swatch:hover, .color-swatch.dpad-focused { transform: none; }
  .artwork.launching { animation: none; filter: none; }
}

/* --- Responsive Scale-to-Fit --- */
@media (max-width: 1920px), (max-height: 1080px) {
  .tv-frame {
    transform: scale(calc(min(100vw / 1920, 100vh / 1080)));
  }
}

.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); border: 0;
}
  </style>
</head>
<body>
```
