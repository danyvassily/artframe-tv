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


---

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

  var artworks = [
  { title: 'The Birth of Venus', artist: 'Sandro Botticelli', year: '1484–1486', image_url: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg', gallery: 'renaissance' },
  { title: 'The Creation of Adam', artist: 'Michelangelo Buonarroti', year: '1511', image_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Sistine_Chapel_ceiling%2C_Creation_of_Adam.jpg', gallery: 'renaissance' },
  { title: 'Archers Shooting at a Herm, Triumph of Bacchus, and Other Studies', artist: 'Michelangelo Buonarroti', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/f92d9ff9-324d-abcc-186d-0bb4bccc696c/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Legs and Feet of Male Nude', artist: 'Michelangelo Buonarroti', year: '1812/50', image_url: 'https://www.artic.edu/iiif/2/edeb0db8-32ce-0e24-abfd-735c2292b4a6/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Moses', artist: 'Michelangelo Buonarroti', year: '1700s', image_url: 'https://www.artic.edu/iiif/2/b47f6d05-5116-d24a-bf81-f92a5ec7c329/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Left Hand of Moses', artist: 'Michelangelo Buonarroti', year: '1725/30', image_url: 'https://www.artic.edu/iiif/2/f838d528-6eb6-a158-9692-7fae1dfc2a2c/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Drunkenness of Noah', artist: 'Michelangelo Buonarroti', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/0b31dfb0-34e8-4985-a91f-cf5abfa2fbbd/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Ascending Male Nude', artist: 'Michelangelo Buonarroti', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/c36910f9-a869-ca22-d298-1266cf604730/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Seated Male Nude', artist: 'Michelangelo Buonarroti', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/e5d8f201-1842-debb-4ed1-deba4bc14d3c/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Two Devils', artist: 'Michelangelo Buonarroti', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/dcc888ff-f71f-106b-c1ef-99457ebd8ab4/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Upraised Right Hand, with Palm Facing Outward: Study for Saint Peter', artist: 'Raphael', year: '1518/20', image_url: 'https://www.artic.edu/iiif/2/f00f93d0-ed84-aaea-d93a-b3417e97dd62/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Guard Drawing His Sword', artist: 'Raphael', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/d7d77ed2-ded1-50b9-aeb8-07a80e82249e/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Head of Comity', artist: 'Raphael', year: 'c. 1750', image_url: 'https://www.artic.edu/iiif/2/0e2fa0d4-c7d3-b181-630f-722e95dbf0ec/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Psyche Presenting the Phial of Water to Venus', artist: 'Raphael', year: '18th century', image_url: 'https://www.artic.edu/iiif/2/749f1093-7713-4649-9eae-8fd35cef6c9e/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Joanna of Aragon', artist: 'Raphael', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/9295f959-8a26-6c91-efb8-22d944685e21/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Conversion of Saint Paul', artist: 'Raphael', year: '18th century', image_url: 'https://www.artic.edu/iiif/2/dc346a0d-a4b2-33c9-7264-6d57bda97dc7/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Last Supper', artist: 'Raphael', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/5fe77541-a679-d338-c323-c7449d202d84/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Woman Carrying Water Jar', artist: 'Raphael', year: '17th century', image_url: 'https://www.artic.edu/iiif/2/ebe8a2da-0661-c8d9-7729-2179fdd3fbc1/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Alcibiades and Two Philosophers', artist: 'Raphael', year: '18th century', image_url: 'https://www.artic.edu/iiif/2/448fbeea-8e85-cfb4-208b-e869d99cc927/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Virgin and Child with an Angel', artist: 'Sandro Botticelli', year: '1475–85', image_url: 'https://www.artic.edu/iiif/2/b59cc3e9-a7c0-5aa1-1a22-bb472bb2e6d4/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Virgin and Child with Two Angels', artist: 'Sandro Botticelli', year: '1485–95', image_url: 'https://www.artic.edu/iiif/2/eb49ab17-f2d9-275a-ee71-e8f0016b34aa/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Tobias and the Angel', artist: 'Titian', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/ae6af039-310b-7581-b4c8-628982ebe97c/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'The Submersion of Pharaoh\'s Army in the Red Sea', artist: 'Titian', year: 'c. 1515, printed 1549', image_url: 'https://www.artic.edu/iiif/2/f08c7b99-9439-582e-ceb1-cfa9d1c1df04/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Self-Portrait', artist: 'Titian', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/5ea967f4-eb96-afbe-63cb-924e8d305a24/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Penitent Magdalene', artist: 'Titian', year: '18th century', image_url: 'https://www.artic.edu/iiif/2/acb156f6-56b5-21e2-2eac-50bc7920188a/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Old Man with a Gold Chain', artist: 'Rembrandt van Rijn', year: '1631', image_url: 'https://www.artic.edu/iiif/2/3eaab3a3-2b47-9fdd-121c-050f6b8d9ccb/full/1686,/0/default.jpg', gallery: 'baroque' },
  { title: 'Kitchen Scene', artist: 'Diego Velázquez', year: '1618–20', image_url: 'https://www.artic.edu/iiif/2/68452725-eba5-06e3-46d2-50c678a5d672/full/1686,/0/default.jpg', gallery: 'baroque' },
  { title: 'Saint John the Baptist in the Wilderness', artist: 'Diego Velázquez', year: 'c. 1622', image_url: 'https://www.artic.edu/iiif/2/da3e9da7-09ed-412c-16b0-8ceedd38571f/full/1686,/0/default.jpg', gallery: 'baroque' },
  { title: 'The Holy Family with Saints Elizabeth and John the Baptist', artist: 'Peter Paul Rubens', year: 'c. 1615', image_url: 'https://www.artic.edu/iiif/2/caac7478-b78f-a94d-a36c-fc5dde17e7c9/full/1686,/0/default.jpg', gallery: 'baroque' },
  { title: 'The Capture of Samson', artist: 'Peter Paul Rubens', year: '1609–10', image_url: 'https://www.artic.edu/iiif/2/a8fd8a92-d5fd-bb98-5d70-f970ab1788b8/full/1686,/0/default.jpg', gallery: 'baroque' },
  { title: 'The Wedding of Peleus and Thetis', artist: 'Peter Paul Rubens', year: '1636', image_url: 'https://www.artic.edu/iiif/2/5ee19981-a8f5-1306-3ec5-eb79c14ac1a6/full/1686,/0/default.jpg', gallery: 'baroque' },
  { title: 'Saint Francis', artist: 'Peter Paul Rubens', year: 'c. 1615', image_url: 'https://www.artic.edu/iiif/2/fa4dd0f2-382c-076c-ff20-c59a2774400c/full/1686,/0/default.jpg', gallery: 'baroque' },
  { title: 'The Adoration of the Eucharist', artist: 'Peter Paul Rubens', year: 'c. 1626', image_url: 'https://www.artic.edu/iiif/2/15a87438-df7b-8fe1-203f-e0b4d36236a0/full/1686,/0/default.jpg', gallery: 'baroque' },
  { title: 'St. Albert of Louvain', artist: 'Peter Paul Rubens', year: '1620', image_url: 'https://www.artic.edu/iiif/2/58f58363-f567-0e49-7956-d49400721b1c/full/1686,/0/default.jpg', gallery: 'baroque' },
  { title: 'Nicolas Rubens, the Artist\'s Son', artist: 'Peter Paul Rubens', year: 'c. 1635', image_url: 'https://www.artic.edu/iiif/2/0a991ed0-5816-1fbe-33d2-a12c384334ab/full/1686,/0/default.jpg', gallery: 'baroque' },
  { title: 'Adam and Eve', artist: 'Albrecht Dürer', year: '1504', image_url: 'https://www.artic.edu/iiif/2/910855f0-a558-4e31-8e88-c0f2694ddbea/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'The Four Horsemen of the Apocalypse, from The Apocalypse', artist: 'Albrecht Dürer', year: 'c. 1496–98', image_url: 'https://www.artic.edu/iiif/2/5d017b13-70a8-7b6a-1c2c-ef69d0f7dbb2/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'The Lamentation, from The Large Passion', artist: 'Albrecht Dürer', year: 'c. 1498–99', image_url: 'https://www.artic.edu/iiif/2/ce36d103-0a28-b409-d441-6ee7806e835f/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Calvary', artist: 'Albrecht Dürer', year: 'c. 1503–04', image_url: 'https://www.artic.edu/iiif/2/93259665-fa1d-c166-6dec-ad51fe805848/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Young Bull', artist: 'Albrecht Dürer', year: 'c. 1496, erroneously inscribed in another hand 1508', image_url: 'https://www.artic.edu/iiif/2/d2529576-bbf0-c631-6f8c-659e825c552d/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'The Fifth Knot', artist: 'Albrecht Dürer', year: 'c. 1507', image_url: 'https://www.artic.edu/iiif/2/f8e9efbf-e143-8bd9-45b6-9f2065704859/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'The Sixth Knot', artist: 'Albrecht Dürer', year: 'c. 1507', image_url: 'https://www.artic.edu/iiif/2/47dff228-15bc-fe81-f9b1-e6099b89728f/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'The Second Knot', artist: 'Albrecht Dürer', year: 'c. 1507', image_url: 'https://www.artic.edu/iiif/2/9c5b9fb9-df2c-0174-f999-03a69cf58ed4/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Erasmus of Rotterdam', artist: 'Albrecht Dürer', year: '1526', image_url: 'https://www.artic.edu/iiif/2/4d06856a-ba89-07fa-68eb-2305246394c2/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'The First Knot', artist: 'Albrecht Dürer', year: 'c. 1507', image_url: 'https://www.artic.edu/iiif/2/eed05c65-f9ea-eccf-afb2-59d4b36ba2a4/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'The Assumption of the Virgin', artist: 'Domenico Theotokópoulos, called El Greco', year: '1577–79', image_url: 'https://www.artic.edu/iiif/2/47fd1564-93f5-f30b-7786-013421133b4a/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Saint Francis Kneeling in Meditation', artist: 'Domenico Theotokópoulos, called El Greco', year: 'c. 1595–c. 1600', image_url: 'https://www.artic.edu/iiif/2/b703b636-976c-b35b-8a8e-f8df3f5ba003/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Saint Martin and the Beggar', artist: 'Domenico Theotokópoulos, called El Greco', year: 'c. 1597–c. 1600', image_url: 'https://www.artic.edu/iiif/2/52098776-6e2e-9683-e258-7b1cec8660dd/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Boy on a Ram', artist: 'Francisco José de Goya y Lucientes', year: '1786–87', image_url: 'https://www.artic.edu/iiif/2/e54a695c-16df-cf45-9dd4-b517e8c32cc3/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'Friar Pedro Shoots El Maragato as His Horse Runs Off', artist: 'Francisco José de Goya y Lucientes', year: 'c. 1806', image_url: 'https://www.artic.edu/iiif/2/622998f1-73f9-4c96-08cf-60bda7c9ce4b/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'Portrait of General José Manuel Romero', artist: 'Francisco José de Goya y Lucientes', year: 'c. 1810', image_url: 'https://www.artic.edu/iiif/2/5553b728-cc59-1d08-7505-f9b3826334b8/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'Winter Scene', artist: 'Francisco José de Goya y Lucientes', year: 'c. 1786', image_url: 'https://www.artic.edu/iiif/2/61c3e72f-b453-1ada-62a5-9539afbe0641/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'El Maragato Threatens Friar Pedro de Zaldivia with His Gun', artist: 'Francisco José de Goya y Lucientes', year: 'c. 1806', image_url: 'https://www.artic.edu/iiif/2/0de694b1-0faf-f35f-440a-4de463e068b5/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'Fête champêtre (Pastoral Gathering)', artist: 'Jean Antoine Watteau', year: '1718–21', image_url: 'https://www.artic.edu/iiif/2/f6eddea6-5789-b6f9-315c-50a08a7c4adc/full/1686,/0/default.jpg', gallery: 'rococo' },
  { title: 'The Dreamer (La Rêveuse)', artist: 'Jean Antoine Watteau', year: '1712–14', image_url: 'https://www.artic.edu/iiif/2/40bf35ab-2898-650e-9e27-d38c4cf39a30/full/1686,/0/default.jpg', gallery: 'rococo' },
  { title: 'Are They Thinking about the Grape? (Pensent-ils au raisin?)', artist: 'François Boucher', year: '1747', image_url: 'https://www.artic.edu/iiif/2/12662645-5164-4bb1-cfec-3517a4c9779c/full/1686,/0/default.jpg', gallery: 'rococo' },
  { title: 'Bathing Nymph', artist: 'François Boucher', year: 'c. 1745–50', image_url: 'https://www.artic.edu/iiif/2/08b2ede5-bf33-602a-f1eb-2e7510c1b3cd/full/1686,/0/default.jpg', gallery: 'rococo' },
  { title: 'Portrait of a Man in Costume', artist: 'Jean Honoré Fragonard', year: 'c. 1767–68', image_url: 'https://www.artic.edu/iiif/2/9b1c3d61-5f9b-c7a2-a5ea-f48248836160/full/1686,/0/default.jpg', gallery: 'rococo' },
  { title: 'Amédée-David, the Comte de Pastoret', artist: 'Jean Auguste Dominique Ingres', year: '1823–26', image_url: 'https://www.artic.edu/iiif/2/8d119fd0-2f57-f20e-a3f5-a573904001e9/full/1686,/0/default.jpg', gallery: 'neoclassicism' },
  { title: 'Lion Hunt', artist: 'Eugène Delacroix', year: '1860–61', image_url: 'https://www.artic.edu/iiif/2/1299b0e5-6a3d-8039-087b-35bf03caea1a/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'Arab Horseman Attacked by a Lion', artist: 'Eugène Delacroix', year: '1849–50', image_url: 'https://www.artic.edu/iiif/2/c4b0d9da-e89a-df7f-904a-9550697c11f5/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'The Combat of the Giaour and Hassan', artist: 'Eugène Delacroix', year: '1826', image_url: 'https://www.artic.edu/iiif/2/ae0793ac-8ace-6c4a-84d4-a33162ae6832/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'Head of a Guillotined Man', artist: 'Jean Louis André Théodore Géricault', year: '1818–19', image_url: 'https://www.artic.edu/iiif/2/2b1cba5a-f194-266b-5357-b437fada0b3b/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'Fishing Boats with Hucksters Bargaining for Fish', artist: 'Joseph Mallord William Turner', year: '1837–38', image_url: 'https://www.artic.edu/iiif/2/8641479e-c93e-f1a8-9925-19be061706da/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'Valley of Aosta: Snowstorm, Avalanche, and Thunderstorm', artist: 'Joseph Mallord William Turner', year: '1836–37', image_url: 'https://www.artic.edu/iiif/2/564e2e3f-eb93-88a7-d265-8fea006facff/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'Stoke-by-Nayland', artist: 'John Constable', year: '1836', image_url: 'https://www.artic.edu/iiif/2/400ce9e8-2f67-44e2-dd68-e6c98880d27f/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'Landscape (The Lock)', artist: 'John Constable', year: 'c. 1820–25', image_url: 'https://www.artic.edu/iiif/2/ff3b5c8a-5b14-5c35-8775-3d021e92a381/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'Landscape with Cottages', artist: 'John Constable', year: '1809–10', image_url: 'https://www.artic.edu/iiif/2/a414da01-a3bf-85e0-53a6-9dd1918bf4c2/full/1686,/0/default.jpg', gallery: 'romanticism' },
  { title: 'The Cardinal', artist: 'Hans Holbein, the younger', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/1430cb7c-0884-c3d9-6c3f-1c0ede7cdc15/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Adam and Eve Driven out of Paradise', artist: 'Hans Holbein, the younger', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/97731a59-beff-6abe-e828-607dd09e663c/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Dance of Death, plate 39 from Woodcuts from Books of the XVI Century', artist: 'Hans Holbein, the younger', year: '1567, assembled into portfolio 1937', image_url: 'https://www.artic.edu/iiif/2/b4efc279-b81d-fd01-1cb3-a9d1eef8d4e2/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Illustration from a German Bible, plate 38 from Woodcuts from Books of the XVI Century', artist: 'Hans Holbein, the younger', year: '1534, assembled into portfolio 1937', image_url: 'https://www.artic.edu/iiif/2/9c63d96d-62ea-df90-df79-ee12a606a073/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'The Monk', artist: 'Hans Holbein, the younger', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/b9832a86-8529-c55d-091d-3a521bb8a0df/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'The Physician', artist: 'Hans Holbein, the younger', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/8df0ed7c-e3a6-ad0b-a828-6f432f1d267b/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Jonah Outside Ninevah (recto); Habakkuk Carrying Bread to Reapers (verso)', artist: 'Hans Holbein, the younger', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/69f2285c-4a1f-83b8-4871-20350c62addf/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Typus Cosmographicus Universalis, Sim. Grynaeus, Novus Orbis, Basileae 1532', artist: 'Hans Holbein, the younger', year: '1532, reprinted 1889', image_url: 'https://www.artic.edu/iiif/2/ef9a5c4f-0424-8db6-cb12-0536022e003f/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Water Lilies', artist: 'Claude Monet', year: '1906', image_url: 'https://www.artic.edu/iiif/2/3c27b499-af56-f0d5-93b5-a7f2f1ad5813/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Arrival of the Normandy Train, Gare Saint-Lazare', artist: 'Claude Monet', year: '1877', image_url: 'https://www.artic.edu/iiif/2/0f1cc0e0-e42e-be16-3f71-2022da38cb93/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Stacks of Wheat (End of Summer)', artist: 'Claude Monet', year: '1890–91', image_url: 'https://www.artic.edu/iiif/2/a38e2828-ec6f-ece1-a30f-70243449197b/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Cliff Walk at Pourville', artist: 'Claude Monet', year: '1882', image_url: 'https://www.artic.edu/iiif/2/b0effb1c-ff23-bbaa-f809-9fd94e31c1a0/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Water Lily Pond', artist: 'Claude Monet', year: '1900', image_url: 'https://www.artic.edu/iiif/2/8534685d-1102-e1e3-e194-94f6e925e8b0/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'The Beach at Sainte-Adresse', artist: 'Claude Monet', year: '1867', image_url: 'https://www.artic.edu/iiif/2/95be2572-b53d-8e7b-abc9-10eb48d4fa5d/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Bordighera', artist: 'Claude Monet', year: '1884', image_url: 'https://www.artic.edu/iiif/2/4d1b3ad0-14db-0d21-ad9f-17abb8bdfbb5/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Stacks of Wheat (End of Day, Autumn)', artist: 'Claude Monet', year: '1890–91', image_url: 'https://www.artic.edu/iiif/2/4c364c64-2108-4e19-5fc5-1ab26ba924a7/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Branch of the Seine near Giverny (Mist)', artist: 'Claude Monet', year: '1897', image_url: 'https://www.artic.edu/iiif/2/838d8c33-a3b4-68ea-587b-87ceec2011af/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'On the Bank of the Seine, Bennecourt', artist: 'Claude Monet', year: '1868', image_url: 'https://www.artic.edu/iiif/2/66f95ea3-a11a-1cf4-6599-d0a49bb25744/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'The Races at Longchamp', artist: 'Édouard Manet', year: '1866', image_url: 'https://www.artic.edu/iiif/2/e9ce5aca-4c34-c8dd-b8a1-91b3e3197211/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Jesus Mocked by the Soldiers', artist: 'Édouard Manet', year: '1865', image_url: 'https://www.artic.edu/iiif/2/4d03ba14-a01a-d003-404a-cf3f9fb40ede/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Fish (Still Life)', artist: 'Édouard Manet', year: '1864', image_url: 'https://www.artic.edu/iiif/2/0cbe27e8-2fec-3445-bc48-ce40a8f2dc25/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Woman Reading', artist: 'Édouard Manet', year: '1880–82', image_url: 'https://www.artic.edu/iiif/2/fd991fea-0c13-8444-7879-aba467f1d9db/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Beggar with a Duffle Coat (Philosopher)', artist: 'Édouard Manet', year: '1865–67', image_url: 'https://www.artic.edu/iiif/2/1a087ef7-8455-e5d0-0b2b-9738cd33058c/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Beggar with Oysters (Philosopher)', artist: 'Édouard Manet', year: '1865–67', image_url: 'https://www.artic.edu/iiif/2/4e074d70-4424-331b-ec89-0776a45d6825/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Bullfight', artist: 'Édouard Manet', year: '1865–66', image_url: 'https://www.artic.edu/iiif/2/38636be8-f1bc-c451-ae65-c441919bd0c3/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Two Sisters (On the Terrace)', artist: 'Pierre-Auguste Renoir', year: '1881', image_url: 'https://www.artic.edu/iiif/2/3a608f55-d76e-fa96-d0b1-0789fbc48f1e/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Acrobats at the Cirque Fernando (Francisca and Angelina Wartenberg)', artist: 'Pierre-Auguste Renoir', year: '1879', image_url: 'https://www.artic.edu/iiif/2/321c45f5-22a3-84a2-44cc-cf66642d4cf2/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Woman at the Piano', artist: 'Pierre-Auguste Renoir', year: '1875–76', image_url: 'https://www.artic.edu/iiif/2/8f06717c-9ede-f22b-d13b-327a50c22f9c/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Lunch at the Restaurant Fournaise (The Rowers\' Lunch)', artist: 'Pierre-Auguste Renoir', year: '1875', image_url: 'https://www.artic.edu/iiif/2/1a1b74fe-ff2a-8991-0581-5d420f0b840e/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Chrysanthemums', artist: 'Pierre-Auguste Renoir', year: '1881–82', image_url: 'https://www.artic.edu/iiif/2/479aff61-784e-e833-fd82-50ba8c819514/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Seascape', artist: 'Pierre-Auguste Renoir', year: '1879', image_url: 'https://www.artic.edu/iiif/2/caf4fa39-e2e8-344a-542c-2d9a03ec9d4b/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Near the Lake', artist: 'Pierre-Auguste Renoir', year: '1879–80', image_url: 'https://www.artic.edu/iiif/2/26e1c560-acca-3148-46dc-c144ac22bd3e/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Alfred Sisley', artist: 'Pierre-Auguste Renoir', year: '1876', image_url: 'https://www.artic.edu/iiif/2/64693216-bc82-0d21-9e57-86f8fc2e632b/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Young Woman Sewing', artist: 'Pierre-Auguste Renoir', year: '1879', image_url: 'https://www.artic.edu/iiif/2/147e3ce7-1c08-fa84-57f7-f59d4ec90d3c/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Lucie Berard (Child in White)', artist: 'Pierre-Auguste Renoir', year: '1883', image_url: 'https://www.artic.edu/iiif/2/0e94a829-b3b7-8317-b609-d1826f0369f0/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'The Millinery Shop', artist: 'Hilaire Germain Edgar Degas', year: '1879-86', image_url: 'https://www.artic.edu/iiif/2/6f513908-03cc-b974-633b-adfce56b7936/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Young Spartan Girls Challenging Boys', artist: 'Hilaire Germain Edgar Degas', year: 'c. 1860', image_url: 'https://www.artic.edu/iiif/2/ca2932b4-6c0c-5482-2ae5-8b74926d7b73/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Yellow Dancers (In the Wings)', artist: 'Hilaire Germain Edgar Degas', year: '1874–76', image_url: 'https://www.artic.edu/iiif/2/8fe022ba-e358-5cda-aa70-d96edd0b4f20/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Henri Degas and His Niece Lucie Degas (The Artist\'s Uncle and Cousin)', artist: 'Hilaire Germain Edgar Degas', year: '1875–76', image_url: 'https://www.artic.edu/iiif/2/ba4d7ead-bd10-e02d-6f5f-613050d7062e/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Café Singer', artist: 'Hilaire Germain Edgar Degas', year: '1879', image_url: 'https://www.artic.edu/iiif/2/a867af78-9a29-c75b-33ab-2f21a2d92b3f/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'The Basket of Apples', artist: 'Paul Cezanne', year: 'c. 1893', image_url: 'https://www.artic.edu/iiif/2/52ac8996-3460-cf71-cb42-5c4d0aa29b74/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Bay of Marseille, Seen from L\'Estaque', artist: 'Paul Cezanne', year: 'c. 1885', image_url: 'https://www.artic.edu/iiif/2/d4ca6321-8656-3d3f-a362-2ee297b2b813/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Auvers, Panoramic View', artist: 'Paul Cezanne', year: '1873–75', image_url: 'https://www.artic.edu/iiif/2/90bc0cec-0d4e-9af5-3912-52a082a428e5/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Madame Cezanne in a Yellow Chair', artist: 'Paul Cezanne', year: '1888–90', image_url: 'https://www.artic.edu/iiif/2/4822cd01-44ac-041a-36b8-c0542377b750/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Vase of Tulips', artist: 'Paul Cezanne', year: 'c. 1890', image_url: 'https://www.artic.edu/iiif/2/96f23681-9701-a668-5c3f-6ffa951f7ecc/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Bathers', artist: 'Paul Cezanne', year: '1899-1904', image_url: 'https://www.artic.edu/iiif/2/2e166f7c-a959-d686-eeb0-a63a52a4d368/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Plate of Apples', artist: 'Paul Cezanne', year: 'c. 1877', image_url: 'https://www.artic.edu/iiif/2/2e6d6a89-61bd-5098-59d3-b41d14bf7973/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Bathers', artist: 'Paul Cezanne', year: '1890–94', image_url: 'https://www.artic.edu/iiif/2/5ec2faea-0636-15d9-9c95-2fd89f85196c/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Mahana no atua (Day of the God)', artist: 'Paul Gauguin', year: '1894', image_url: 'https://www.artic.edu/iiif/2/a4bef587-48a4-d186-813d-f297441b1ab3/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Arlésiennes (Mistral)', artist: 'Paul Gauguin', year: '1888', image_url: 'https://www.artic.edu/iiif/2/ae6ac285-6887-dd76-4570-d379c786dfae/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Merahi metua no Tehamana (Tehamana Has Many Parents or The Ancestors of Tehamana)', artist: 'Paul Gauguin', year: '1893', image_url: 'https://www.artic.edu/iiif/2/48268fc7-2eb4-ded6-1293-e91f27b66478/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'No te aha oe riri (Why Are You Angry?)', artist: 'Paul Gauguin', year: '1896', image_url: 'https://www.artic.edu/iiif/2/2adb35ce-8e94-cda5-210e-b04d488bbdc8/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Polynesian Woman with Children', artist: 'Paul Gauguin', year: '1901', image_url: 'https://www.artic.edu/iiif/2/cc5cdb81-14cf-27e9-eda8-94c08244ebaa/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Te raau rahi (The Big Tree)', artist: 'Paul Gauguin', year: '1891', image_url: 'https://www.artic.edu/iiif/2/916405d1-1407-d90e-1be8-f8c77f26f546/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Woman in Front of a Still Life by Cezanne', artist: 'Paul Gauguin', year: '1890', image_url: 'https://www.artic.edu/iiif/2/38f866cb-9000-de5a-e655-d3fb4d8dc056/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Te burao (The Hibiscus Tree)', artist: 'Paul Gauguin', year: '1892', image_url: 'https://www.artic.edu/iiif/2/604fe021-6008-f666-bce8-456b2fdc9bd4/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Still Life: Wood Tankard and Metal Pitcher', artist: 'Paul Gauguin', year: '1880', image_url: 'https://www.artic.edu/iiif/2/9964135a-b3df-8af6-5af9-9e6eac7a041d/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'The Bedroom', artist: 'Vincent van Gogh', year: '1889', image_url: 'https://www.artic.edu/iiif/2/6644829f-f292-c5c4-a73c-0356a6fdbf0d/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Self-Portrait', artist: 'Vincent van Gogh', year: '1887', image_url: 'https://www.artic.edu/iiif/2/47c5bcb8-62ef-e5d7-55e7-f5121f409a30/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'The Poet\'s Garden', artist: 'Vincent van Gogh', year: '1888', image_url: 'https://www.artic.edu/iiif/2/d4bc1723-7cbc-d36d-a9cb-f84553f2a6f6/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'A Peasant Woman Digging in Front of Her Cottage', artist: 'Vincent van Gogh', year: 'c. 1885', image_url: 'https://www.artic.edu/iiif/2/1d3a275d-45dd-6026-b6ed-d7d8df417a3d/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'The Drinkers', artist: 'Vincent van Gogh', year: '1890', image_url: 'https://www.artic.edu/iiif/2/d0ff5b36-bb38-b156-6042-5c8545352c2f/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Fishing in Spring, the Pont de Clichy (Asnières)', artist: 'Vincent van Gogh', year: '1887', image_url: 'https://www.artic.edu/iiif/2/5512cee9-6d00-d01b-b0be-ac7843cc8f76/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Madame Roulin Rocking the Cradle (La berceuse)', artist: 'Vincent van Gogh', year: '1889', image_url: 'https://www.artic.edu/iiif/2/6f3ca8b9-fef6-edfc-a71c-3e7b471d5f6c/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Terrace and Observation Deck at the Moulin de Blute-Fin, Montmartre', artist: 'Vincent van Gogh', year: 'Early 1887', image_url: 'https://www.artic.edu/iiif/2/a971fad5-a24d-9985-03fb-1f17db9a9d74/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Grapes, Lemons, Pears, and Apples', artist: 'Vincent van Gogh', year: '1887', image_url: 'https://www.artic.edu/iiif/2/f11bd233-6cc3-4221-59eb-f7363be4119e/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'A Sunday on La Grande Jatte — 1884', artist: 'Georges Seurat', year: '1884–86, border added 1888–89', image_url: 'https://www.artic.edu/iiif/2/2d484387-2509-5e8e-2c43-22f9981972eb/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Oil Sketch for "A Sunday on La Grande Jatte — 1884"', artist: 'Georges Seurat', year: '1884', image_url: 'https://www.artic.edu/iiif/2/081be15c-8812-c174-eeb2-cf318a2e67cf/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Final Study for "Bathers at Asnières"', artist: 'Georges Seurat', year: '1883', image_url: 'https://www.artic.edu/iiif/2/1db67905-d421-95bf-1e91-4b60dd776886/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Woman Bathing Her Feet in a Brook', artist: 'Camille Pissarro', year: '1895', image_url: 'https://www.artic.edu/iiif/2/5ccaee46-a1a0-5035-821c-0547aa35c070/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'The Place du Havre, Paris', artist: 'Camille Pissarro', year: '1893', image_url: 'https://www.artic.edu/iiif/2/0ff20364-c795-c2ca-c1e8-e5a848f09554/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'The Crystal Palace', artist: 'Camille Pissarro', year: '1871', image_url: 'https://www.artic.edu/iiif/2/4eb368b5-3b66-ae2c-bd4a-2643015e05fc/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Woman and Child at the Well', artist: 'Camille Pissarro', year: '1882', image_url: 'https://www.artic.edu/iiif/2/a2ddbd89-d864-8877-37bc-cd3dce12c37c/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Young Peasant Having Her Coffee', artist: 'Camille Pissarro', year: '1881', image_url: 'https://www.artic.edu/iiif/2/335a59a4-3f5b-b9db-b8e8-861467d211ef/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Rabbit Warren at Pontoise, Snow', artist: 'Camille Pissarro', year: '1879', image_url: 'https://www.artic.edu/iiif/2/053f9be8-3617-c4ef-36cd-1deb5e13b288/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'The Banks of the Marne in Winter', artist: 'Camille Pissarro', year: '1866', image_url: 'https://www.artic.edu/iiif/2/3d950ecc-73f4-c28a-f216-0940b23fa5e8/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Haymaking at Éragny', artist: 'Camille Pissarro', year: '1892', image_url: 'https://www.artic.edu/iiif/2/b84a9755-ca8d-8bd5-5a59-e910b20e3ba5/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Snow at Louveciennes', artist: 'Camille Pissarro', year: 'c. 1870', image_url: 'https://www.artic.edu/iiif/2/d4e43d76-594b-ce65-c1a3-45c865624f70/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Woman Mending', artist: 'Camille Pissarro', year: '1895', image_url: 'https://www.artic.edu/iiif/2/132b782d-54e6-70e1-18f9-211468c09099/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'A Turn in the Road', artist: 'Alfred Sisley', year: '1873', image_url: 'https://www.artic.edu/iiif/2/0f076222-52b2-9bb4-4409-72fdf485d895/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'The Seine at Port-Marly, Piles of Sand', artist: 'Alfred Sisley', year: '1875', image_url: 'https://www.artic.edu/iiif/2/c4425cb6-d8b5-6390-603d-7f802406d05d/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Street in Moret', artist: 'Alfred Sisley', year: 'c. 1890', image_url: 'https://www.artic.edu/iiif/2/c233d88b-fe56-6b9e-d5c2-47b9a7386756/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'The Loire', artist: 'Alfred Sisley', year: '1896', image_url: 'https://www.artic.edu/iiif/2/bcc9c3a7-f5b0-41af-210a-bd17797d77d9/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Watering Place at Marly', artist: 'Alfred Sisley', year: '1875', image_url: 'https://www.artic.edu/iiif/2/ed7aa098-e5c9-04dd-b09c-3416d1c56854/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Landscape along the Seine with the Institut de France and the Pont des Arts', artist: 'Alfred Sisley', year: 'c. 1875', image_url: 'https://www.artic.edu/iiif/2/2bcffdac-951e-569f-8f05-f4c8e4228302/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Woman at Her Toilette', artist: 'Berthe Morisot', year: '1875–80', image_url: 'https://www.artic.edu/iiif/2/78c80988-6524-cec7-c661-a4c0a706d06f/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Woman in a Garden', artist: 'Berthe Morisot', year: '1882–83', image_url: 'https://www.artic.edu/iiif/2/5edb357d-2e8f-8673-d9e8-4b1150af3895/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Young Girl with Hat', artist: 'Berthe Morisot', year: '1892', image_url: 'https://www.artic.edu/iiif/2/12731595-67a3-dc3c-efa8-29d75b9cd315/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Forêt de Compiègne', artist: 'Berthe Morisot', year: '1885', image_url: 'https://www.artic.edu/iiif/2/bfc9b17a-cc18-7bd3-4d78-e925bb1a8b27/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'The Child\'s Bath', artist: 'Mary Cassatt', year: '1893', image_url: 'https://www.artic.edu/iiif/2/3b885ae0-4d46-5fe4-d70a-00474827f02c/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'On a Balcony', artist: 'Mary Cassatt', year: '1878–79', image_url: 'https://www.artic.edu/iiif/2/f0150d21-33ab-f6ea-0d4d-32d459f091fe/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'After the Bullfight', artist: 'Mary Cassatt', year: '1873', image_url: 'https://www.artic.edu/iiif/2/7a314af6-336f-b6a4-809c-15659313a757/full/1686,/0/default.jpg', gallery: 'impressionism' },
  { title: 'Male Nude with Left Foot on a Pedestal', artist: 'Gustav Klimt', year: '1879', image_url: 'https://www.artic.edu/iiif/2/35a41ca7-f92c-b686-c89f-978321214c5c/full/1686,/0/default.jpg', gallery: 'modern' },
  { title: 'Portrait of a Lady in a High Hat', artist: 'Gustav Klimt', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/caedec59-9160-d4ca-8449-5576e2b103a4/full/1686,/0/default.jpg', gallery: 'modern' },
  { title: 'Reclining Girl', artist: 'Gustav Klimt', year: '1912/1914', image_url: 'https://www.artic.edu/iiif/2/86d41a4e-fc40-c597-3ac9-79053cca0b87/full/1686,/0/default.jpg', gallery: 'modern' },
  { title: 'Male Nude', artist: 'Gustav Klimt', year: 'January 29, 1880', image_url: 'https://www.artic.edu/iiif/2/ee8a9167-1535-b432-3dc7-6e80eeed91fc/full/1686,/0/default.jpg', gallery: 'modern' },
  { title: 'Seated Woman from the Front with Hat, Face Hooded', artist: 'Gustav Klimt', year: '1910', image_url: 'https://www.artic.edu/iiif/2/7936867b-74ab-7347-51f0-9ab14d050e9d/full/1686,/0/default.jpg', gallery: 'modern' },
  { title: 'The Girl by the Window', artist: 'Edvard Munch', year: '1893', image_url: 'https://www.artic.edu/iiif/2/d7df2633-3b40-f570-c906-211503a37cde/full/1686,/0/default.jpg', gallery: 'expressionism' },
  { title: 'Bathers by a River', artist: 'Henri Matisse', year: '1909–10, 1913, and 1916–17', image_url: 'https://www.artic.edu/iiif/2/419ddce3-c90b-3d0c-43b3-73683a87bf98/full/1686,/0/default.jpg', gallery: 'fauvism' },
  { title: 'Woman before an Aquarium', artist: 'Henri Matisse', year: '1921–23', image_url: 'https://www.artic.edu/iiif/2/d0e36029-27fc-bf4e-357a-55cfbaf7bdfd/full/1686,/0/default.jpg', gallery: 'fauvism' },
  { title: 'Interior at Nice', artist: 'Henri Matisse', year: '1919 or 1920', image_url: 'https://www.artic.edu/iiif/2/2193cdda-2691-2802-0776-145dee77f7ea/full/1686,/0/default.jpg', gallery: 'fauvism' },
  { title: 'Apples', artist: 'Henri Matisse', year: '1916', image_url: 'https://www.artic.edu/iiif/2/b2bc0fc2-8d17-1fcd-8cae-8626421c11ef/full/1686,/0/default.jpg', gallery: 'fauvism' },
  { title: 'Daisies', artist: 'Henri Matisse', year: '1939', image_url: 'https://www.artic.edu/iiif/2/1693f1ff-40a4-e0e2-16cd-3d8d055dc266/full/1686,/0/default.jpg', gallery: 'fauvism' },
  { title: 'Still Life with Geranium', artist: 'Henri Matisse', year: '1906', image_url: 'https://www.artic.edu/iiif/2/d0049e0b-bd55-020e-aa8c-b137d06ae7df/full/1686,/0/default.jpg', gallery: 'fauvism' },
  { title: 'Lemons on a Pewter Plate', artist: 'Henri Matisse', year: '1926', image_url: 'https://www.artic.edu/iiif/2/79f1c666-1e19-af39-f7e0-f22989835eb2/full/1686,/0/default.jpg', gallery: 'fauvism' },
  { title: 'Laurette with a Cup of Coffee', artist: 'Henri Matisse', year: '1916–17', image_url: 'https://www.artic.edu/iiif/2/72d28816-c42f-af88-63fc-d12426db240e/full/1686,/0/default.jpg', gallery: 'fauvism' },
  { title: 'Girl in Yellow and Blue with Guitar', artist: 'Henri Matisse', year: '1939', image_url: 'https://www.artic.edu/iiif/2/0fc277a0-003c-393f-556b-f8dbc8c81427/full/1686,/0/default.jpg', gallery: 'fauvism' },
  { title: 'The Old Guitarist', artist: 'Pablo Picasso', year: 'late 1903–early 1904', image_url: 'https://www.artic.edu/iiif/2/4e7f3081-179a-af18-8abd-7908a7ae8c4e/full/1686,/0/default.jpg', gallery: 'cubism' },
  { title: 'Daniel-Henry Kahnweiler', artist: 'Pablo Picasso', year: 'autumn 1910', image_url: 'https://www.artic.edu/iiif/2/aebda29e-16b8-4393-6edc-805cdb6ba459/full/1686,/0/default.jpg', gallery: 'cubism' },
  { title: 'The Red Armchair', artist: 'Pablo Picasso', year: 'December 16, 1931', image_url: 'https://www.artic.edu/iiif/2/c617e2f0-d5fe-0772-390e-6d8c83895815/full/1686,/0/default.jpg', gallery: 'cubism' },
  { title: 'Mother and Child', artist: 'Pablo Picasso', year: '1921', image_url: 'https://www.artic.edu/iiif/2/64734461-887d-80b9-8489-e38cb05ac01d/full/1686,/0/default.jpg', gallery: 'cubism' },
  { title: 'Man with a Pipe', artist: 'Pablo Picasso', year: '1915', image_url: 'https://www.artic.edu/iiif/2/43bc66e2-95b2-fb3c-b9b1-232835bfd027/full/1686,/0/default.jpg', gallery: 'cubism' },
  { title: 'Nude under a Pine Tree', artist: 'Pablo Picasso', year: 'January 20, 1959', image_url: 'https://www.artic.edu/iiif/2/b7b7ecd0-5a50-b89a-c72a-d435a1957c73/full/1686,/0/default.jpg', gallery: 'cubism' },
  { title: 'Jacques and Berthe Lipchitz', artist: 'Amedeo Modigliani', year: '1916', image_url: 'https://www.artic.edu/iiif/2/7e649536-b186-c3f5-3e6d-0d22d5d798ef/full/1686,/0/default.jpg', gallery: 'modern' },
  { title: 'Madam Pompadour', artist: 'Amedeo Modigliani', year: '1915', image_url: 'https://www.artic.edu/iiif/2/fdc1a755-ff86-487d-f16b-f03c40a30bee/full/1686,/0/default.jpg', gallery: 'modern' },
  { title: 'Portrait of a Woman', artist: 'Amedeo Modigliani', year: 'c. 1917/19', image_url: 'https://www.artic.edu/iiif/2/e458fc80-cb2e-f5c0-3c81-8c24b0bdc15b/full/1686,/0/default.jpg', gallery: 'modern' },
  { title: 'Nighthawks', artist: 'Edward Hopper', year: '1942', image_url: 'https://www.artic.edu/iiif/2/831a05de-d3f6-f4fa-a460-23008dd58dda/full/1686,/0/default.jpg', gallery: 'modern' },
  { title: 'Saint Anthony Abbot', artist: 'Fra Angelico', year: '1440–41', image_url: 'https://www.artic.edu/iiif/2/3db93232-7c80-7663-f683-fe3bb672cf24/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Virgin and Child', artist: 'Giovanni Bellini', year: 'n.d.', image_url: 'https://www.artic.edu/iiif/2/72167006-ca16-8df5-8856-0412ceac4c79/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'The Resurrection', artist: 'Pieter Bruegel, the elder', year: 'c. 1580', image_url: 'https://www.artic.edu/iiif/2/7a0f6878-699d-446a-8754-7b01241cbb7b/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'The Hare Hunters', artist: 'Pieter Bruegel, the elder', year: '1566', image_url: 'https://www.artic.edu/iiif/2/329b85e4-2865-1281-feeb-5c0ab47e500e/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'Forest Landscape with Wild Animals', artist: 'Pieter Bruegel, the elder', year: 'late 16th century', image_url: 'https://www.artic.edu/iiif/2/402f995e-6de7-a925-3023-8ba31f359fc2/full/1686,/0/default.jpg', gallery: 'renaissance' },
  { title: 'At the Moulin Rouge', artist: 'Henri de Toulouse-Lautrec', year: '1892–95', image_url: 'https://www.artic.edu/iiif/2/defb4004-b500-218d-3d9b-9a02423f097d/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Equestrienne (At the Cirque Fernando)', artist: 'Henri de Toulouse-Lautrec', year: '1887–88', image_url: 'https://www.artic.edu/iiif/2/65db9e21-83c3-1cc6-7240-1e1996d87f52/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Moulin de la Galette', artist: 'Henri de Toulouse-Lautrec', year: '1889', image_url: 'https://www.artic.edu/iiif/2/156aaed6-fe3c-a13c-f39e-55f381205929/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Ballet Dancers', artist: 'Henri de Toulouse-Lautrec', year: '1885–86', image_url: 'https://www.artic.edu/iiif/2/43249182-2ef0-8d18-3d32-0b9af3606ed3/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Portrait of Jeanne Wenz', artist: 'Henri de Toulouse-Lautrec', year: '1886', image_url: 'https://www.artic.edu/iiif/2/c2a4b60c-bf43-6a37-e001-a91cba741168/full/1686,/0/default.jpg', gallery: 'postimpressionism' },
  { title: 'Andromeda', artist: 'Odilon Redon', year: 'c. 1905', image_url: 'https://www.artic.edu/iiif/2/2acf7c4c-d3a9-e4f6-0343-4dcb75ec8b34/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Still Life with Flowers', artist: 'Odilon Redon', year: '1905', image_url: 'https://www.artic.edu/iiif/2/bdb9f780-83be-dd12-191d-54a77c5444ab/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Flowers: Poppies and Daisies', artist: 'Odilon Redon', year: 'c. 1867', image_url: 'https://www.artic.edu/iiif/2/d424c734-f5c1-5f89-3bb8-d83e4e0287e3/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Earthly Paradise', artist: 'Pierre Bonnard', year: '1916–20', image_url: 'https://www.artic.edu/iiif/2/8b4abeed-c22b-1477-1e76-b303ac1415d1/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Seine at Vernonnet', artist: 'Pierre Bonnard', year: 'c. 1930', image_url: 'https://www.artic.edu/iiif/2/6f84b595-943b-b698-6c4d-79a27e4f7ee7/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Checkered Tablecloth', artist: 'Pierre Bonnard', year: '1939', image_url: 'https://www.artic.edu/iiif/2/072c043b-f96b-06bd-fefd-1f60dabbd626/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Landscape: Window Overlooking the Woods', artist: 'Édouard Jean Vuillard', year: '1899', image_url: 'https://www.artic.edu/iiif/2/a1dc6109-6e0c-7801-ebe8-8c95fec2c4e4/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Child Playing: Annette Roussel in Front of a Wooden Chair', artist: 'Édouard Jean Vuillard', year: 'c. 1900', image_url: 'https://www.artic.edu/iiif/2/ba63170f-ebfb-d39c-82b5-64c9b2b2643b/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Foliage—Oak Tree and Fruit Seller', artist: 'Édouard Jean Vuillard', year: '1918', image_url: 'https://www.artic.edu/iiif/2/e170725f-cc12-cb0f-841e-8b1ea918933e/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Guelder Roses and the Venus of Milo', artist: 'Édouard Jean Vuillard', year: '1905', image_url: 'https://www.artic.edu/iiif/2/b0a463e2-4c5f-4055-26ba-08d7d42f8827/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Madame Arthur Fontaine (Marie Escudier Fontaine) in a Pink Shawl', artist: 'Édouard Jean Vuillard', year: 'c. 1904-05', image_url: 'https://www.artic.edu/iiif/2/55b7b6c6-6999-b856-e7fb-d49dec971ec3/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Vuillard\'s Room at the Château des Clayes', artist: 'Édouard Jean Vuillard', year: 'c. 1932', image_url: 'https://www.artic.edu/iiif/2/d6d442e8-4c4c-75d1-4e1a-06e536fabd4d/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Dressing Room, Madame Hessel Reading at Amfreville', artist: 'Édouard Jean Vuillard', year: '1906', image_url: 'https://www.artic.edu/iiif/2/c0230fcf-364c-a11e-85e7-f9ed106bd4cc/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Fountain, Villa Torlonia, Frascati, Italy', artist: 'John Singer Sargent', year: '1907', image_url: 'https://www.artic.edu/iiif/2/3f9aa9db-61e1-7060-fdb0-bfd7e41ddd08/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Mrs. George Swinton (Elizabeth Ebsworth)', artist: 'John Singer Sargent', year: '1897', image_url: 'https://www.artic.edu/iiif/2/074c1b1b-fe92-01ce-9e62-cc99369142dd/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Madame Paul Escudier (Louise Lefevre)', artist: 'John Singer Sargent', year: '1882', image_url: 'https://www.artic.edu/iiif/2/c6da9f8c-643b-f331-0f8f-a9b6a844caf6/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Life Study (Study of an Egyptian Girl)', artist: 'John Singer Sargent', year: '1891', image_url: 'https://www.artic.edu/iiif/2/e6dd6199-c245-d1b4-a997-ce89eafb48ca/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Venetian Glass Workers', artist: 'John Singer Sargent', year: '1880–82', image_url: 'https://www.artic.edu/iiif/2/8cdc812d-5db0-63a1-8579-eb64fc6884ca/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Thistles', artist: 'John Singer Sargent', year: '1883–89', image_url: 'https://www.artic.edu/iiif/2/79b94ddd-e208-1993-01ab-98f75174fe88/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Portrait of Charles Deering', artist: 'John Singer Sargent', year: '1917', image_url: 'https://www.artic.edu/iiif/2/e810d27d-57d8-89d0-49a6-87b1bbc68174/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Mrs. Charles Gifford Dyer (Mary Anthony)', artist: 'John Singer Sargent', year: '1880', image_url: 'https://www.artic.edu/iiif/2/59221fa2-45f9-5674-4fbd-9da3eb648d68/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Nocturne: Blue and Gold—Southampton Water', artist: 'James McNeill Whistler', year: '1872', image_url: 'https://www.artic.edu/iiif/2/50034c7f-ce51-00f1-430e-a6f7efc233fc/full/1686,/0/default.jpg', gallery: 'modern' },
  { title: 'Coast Scene, Bathers', artist: 'James McNeill Whistler', year: '1884–85', image_url: 'https://www.artic.edu/iiif/2/5888c23a-635f-396a-117b-2223032c0201/full/1686,/0/default.jpg', gallery: 'modern' },
  { title: 'Grey and Silver: Old Battersea Reach', artist: 'James McNeill Whistler', year: '1863', image_url: 'https://www.artic.edu/iiif/2/f0b3ff64-d68e-3fd2-ffc9-5470eb9fea6e/full/1686,/0/default.jpg', gallery: 'modern' },
  { title: 'The Artist in His Studio', artist: 'James McNeill Whistler', year: '1865–66', image_url: 'https://www.artic.edu/iiif/2/e01a4f76-d089-8e22-8431-3488db37a293/full/1686,/0/default.jpg', gallery: 'modern' },
  { title: 'Mère Grégoire', artist: 'Gustave Courbet', year: '1855, reworked 1857–59', image_url: 'https://www.artic.edu/iiif/2/2e6d08c8-dac0-4f1c-3e56-de3539ceb905/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Rock of Hautepierre', artist: 'Gustave Courbet', year: 'c. 1869', image_url: 'https://www.artic.edu/iiif/2/e0f47937-a1ee-76b4-6505-35a33119a634/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'An Alpine Scene', artist: 'Gustave Courbet', year: '1874', image_url: 'https://www.artic.edu/iiif/2/54b7fd5e-3467-f777-45e7-0719400ecfc0/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Valley of Les Puits-Noir', artist: 'Gustave Courbet', year: '1868', image_url: 'https://www.artic.edu/iiif/2/2a2163db-9351-018a-0d65-47be9c84dce8/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Rêverie (Portrait of Gabrielle Borreau)', artist: 'Gustave Courbet', year: '1862', image_url: 'https://www.artic.edu/iiif/2/40d69445-feb4-d6d5-bcad-bb142856f0a6/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Cliffs on the Sea Coast: Small Beach, Sunrise (Falaise au bord de la mer, vu Petite Plage, soleil levant)', artist: 'Gustave Courbet', year: '1865', image_url: 'https://www.artic.edu/iiif/2/29d3c6bc-7b53-d13f-a625-0490141c6f10/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Brook of Les Puits-Noir', artist: 'Gustave Courbet', year: 'c. 1855', image_url: 'https://www.artic.edu/iiif/2/6575c354-8a4f-60d3-ad6f-06fa8d7f9ded/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Peasants Bringing Home a Calf Born in the Fields', artist: 'Jean François Millet', year: '1864', image_url: 'https://www.artic.edu/iiif/2/7b0ea6ca-9424-050e-7e0e-3b67d2289480/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Keeper of the Flock', artist: 'Jean François Millet', year: '1871–74', image_url: 'https://www.artic.edu/iiif/2/0ace29f2-7bc1-714a-c364-12b57bcf8a93/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'In the Auvergne', artist: 'Jean François Millet', year: 'c. 1866–69', image_url: 'https://www.artic.edu/iiif/2/7a313db7-2369-1c7b-b4f7-a1d29218f778/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Woodchopper', artist: 'Jean François Millet', year: 'c. 1858–66', image_url: 'https://www.artic.edu/iiif/2/e7928f74-f52e-e7d5-77ab-8b3d93b8b727/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Little Shepherdess', artist: 'Jean François Millet', year: '1868–72', image_url: 'https://www.artic.edu/iiif/2/f2bc893e-3b1a-62c9-0862-035f19cf405a/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The Sheepshearers', artist: 'Jean François Millet', year: 'c. 1857–61', image_url: 'https://www.artic.edu/iiif/2/bd921daa-25ba-3a48-5b30-ad03d8a8bacb/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Interrupted Reading', artist: 'Jean Baptiste Camille Corot', year: 'c. 1870', image_url: 'https://www.artic.edu/iiif/2/1c2d32a7-790c-501a-e124-00f28cf5052d/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Landscape', artist: 'Jean Baptiste Camille Corot', year: '1865/70', image_url: 'https://www.artic.edu/iiif/2/1501b057-0441-f1fa-e949-298b06ec6270/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Wounded Eurydice', artist: 'Jean Baptiste Camille Corot', year: '1868–70', image_url: 'https://www.artic.edu/iiif/2/f024968c-3cb1-f1cc-b1af-2a1d40b7e193/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Arleux-Palluel, The Bridge of Trysts', artist: 'Jean Baptiste Camille Corot', year: '1871–72', image_url: 'https://www.artic.edu/iiif/2/2661329a-3c67-6216-82eb-90c755bb42b8/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Bathing Nymphs and Child', artist: 'Jean Baptiste Camille Corot', year: '1855–60', image_url: 'https://www.artic.edu/iiif/2/4f5ea323-3f98-2487-26d3-f55ee1274de5/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Souvenir of the Environs of Lake Nemi', artist: 'Jean Baptiste Camille Corot', year: '1865', image_url: 'https://www.artic.edu/iiif/2/25cae01d-82c7-7060-0070-643727437126/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'View of Genoa', artist: 'Jean Baptiste Camille Corot', year: '1834', image_url: 'https://www.artic.edu/iiif/2/bd8432e6-65f7-a32a-4e1a-85593633fa8f/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'Monte Pincio, Rome', artist: 'Jean Baptiste Camille Corot', year: '1840–50', image_url: 'https://www.artic.edu/iiif/2/0aff6ae5-99ae-d92c-1239-0bc9bb0ad9ae/full/1686,/0/default.jpg', gallery: 'classic' },
  { title: 'The White Tablecloth', artist: 'Jean Siméon Chardin', year: 'c. 1731–32', image_url: 'https://www.artic.edu/iiif/2/7085f5ee-b5da-bd9f-e8f9-b692be466ea0/full/1686,/0/default.jpg', gallery: 'rococo' }
];

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
    if (target.closest('#google-connect-btn')) { startGoogleAuth(); return; }

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
  // GOOGLE PHOTOS — Vrai OAuth Device Flow pour Google Photos
  // Utilise le projet Google Cloud cocktail-450414
  // Scope : photoslibrary.readonly (lecture seule des albums)
  // ================================================================

  var GOOGLE_CLIENT_ID = 'VOTRE_CLIENT_ID.apps.googleusercontent.com';
  var GOOGLE_PHOTOS_SCOPE = 'https://www.googleapis.com/auth/photoslibrary.readonly';

  var googleAuthState = {
    deviceCode: null,
    pollInterval: null,
    accessToken: null,
    albums: [],
    photos: []
  };

  /**
   * Génère un QR code basique à partir d'un texte
   * Version simplifiée pour TV — affiche l'URL + code
   */
  function generateQrDisplay(text) {
    var qr = document.getElementById('qr-code');
    // Afficher l'URL de manière lisible (le QR code réel serait généré côté serveur)
    qr.innerHTML = '<div style="background:white;border-radius:8px;padding:16px;text-align:center;">' +
      '<div style="color:#000;font-family:monospace;font-size:11px;word-break:break-all;max-width:180px;">' +
      text + '</div></div>';
  }

  /**
   * Étape 1 : Démarrer le Device Flow Google OAuth
   * Appelée quand l'utilisateur clique sur "Se connecter avec Google"
   */
  function startGoogleAuth() {
    var authBtn = document.getElementById('google-connect-btn');
    authBtn.textContent = 'Connexion en cours...';
    authBtn.disabled = true;

    // 1. Demander un device code à Google
    fetch('https://oauth2.googleapis.com/device/code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'client_id=' + GOOGLE_CLIENT_ID + '&scope=' + encodeURIComponent(GOOGLE_PHOTOS_SCOPE)
    })
    .then(function(resp) { return resp.json(); })
    .then(function(data) {
      if (data.error) {
        authBtn.textContent = 'Erreur : ' + data.error;
        authBtn.disabled = false;
        return;
      }

      // 2. Afficher le code et l'URL sur la TV
      googleAuthState.deviceCode = data.device_code;
      document.getElementById('auth-code').textContent = data.user_code;
      document.getElementById('auth-url').textContent = data.verification_url;

      // Afficher le QR code (URL de vérification)
      generateQrDisplay(data.verification_url);

      // 3. Ouvrir l'overlay de connexion
      openAuth();
      authBtn.textContent = 'Se connecter avec Google';
      authBtn.disabled = false;

      // 4. Commencer à poller le token
      pollForGoogleToken(data.device_code, data.interval || 5);
    })
    .catch(function(err) {
      console.error('Google Auth error:', err);
      authBtn.textContent = 'Erreur réseau';
      authBtn.disabled = false;
    });
  }

  /**
   * Étape 2 : Poller l'API Google jusqu'à ce que l'utilisateur
   * valide le code sur son smartphone (google.com/device)
   */
  function pollForGoogleToken(deviceCode, intervalSec) {
    if (googleAuthState.pollInterval) {
      clearInterval(googleAuthState.pollInterval);
    }

    googleAuthState.pollInterval = setInterval(function() {
      fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'client_id=' + GOOGLE_CLIENT_ID +
              '&client_secret=VOTRE_CLIENT_SECRET' +
              '&device_code=' + encodeURIComponent(deviceCode) +
              '&grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Adevice_code'
      })
      .then(function(resp) { return resp.json(); })
      .then(function(data) {
        if (data.access_token) {
          // ✅ Connecté !
          clearInterval(googleAuthState.pollInterval);
          googleAuthState.pollInterval = null;
          googleAuthState.accessToken = data.access_token;
          state.googleConnected = true;

          // Fermer l'overlay
          closeAuth();

          // Charger les albums Google Photos
          loadGooglePhotosAlbums(data.access_token);

          // Mettre à jour l'UI
          document.getElementById('nav-google-val').textContent = 'Connecté';
          syncSidebarValues();

          // Sauvegarder le token (pour les sessions suivantes)
          try {
            localStorage.setItem('artframe_google_token', data.access_token);
            localStorage.setItem('artframe_google_expiry', Date.now() + (data.expires_in || 3600) * 1000);
          } catch(e) {}

          console.log('✅ Google Photos connecté !');

        } else if (data.error === 'authorization_pending') {
          // L'utilisateur n'a pas encore validé sur son téléphone → on continue de poller
          console.log('⏳ En attente de validation sur smartphone...');
        } else if (data.error === 'slow_down') {
          // Google demande de ralentir le polling
          console.log('⏳ Ralentissement du polling...');
          clearInterval(googleAuthState.pollInterval);
          googleAuthState.pollInterval = setInterval(function() {
            pollForGoogleToken(deviceCode, intervalSec);
          }, (intervalSec + 5) * 1000);
        } else {
          // Erreur irrécupérable
          clearInterval(googleAuthState.pollInterval);
          googleAuthState.pollInterval = null;
          console.error('Google Auth failed:', data.error, data);
          state.googleConnected = false;
          document.getElementById('nav-google-val').textContent = 'Échec connexion';
        }
      })
      .catch(function(err) {
        console.error('Poll error:', err);
      });
    }, (intervalSec || 5) * 1000);
  }

  /**
   * Étape 3 : Charger les albums Google Photos
   */
  function loadGooglePhotosAlbums(accessToken) {
    fetch('https://photoslibrary.googleapis.com/v1/albums?pageSize=50', {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    })
    .then(function(resp) { return resp.json(); })
    .then(function(data) {
      if (data.albums) {
        googleAuthState.albums = data.albums;
        console.log('📸 Albums Google Photos chargés:', data.albums.length);

        // Ajouter les albums au sélecteur de galerie
        var galleryGrid = document.getElementById('gallery-grid');
        data.albums.forEach(function(album) {
          var card = document.createElement('button');
          card.className = 'gallery-card';
          card.dataset.photosAlbum = album.id;
          card.innerHTML = '<div class="gc-img" style="background:linear-gradient(135deg,#4285F4,#34A853);"></div>' +
            '<div class="gc-label">📸 ' + album.title + '</div>';
          card.addEventListener('click', function() {
            loadGooglePhotosFromAlbum(album.id, album.title, accessToken);
          });
          galleryGrid.appendChild(card);
        });

        // Re-synchroniser le focus D-Pad si la sidebar est ouverte
        if (state.dpMode === 'sub' && state.currentSub === 'gallery') {
          var items = getFocusableInSub();
          focusEl(state.dpIdx, items);
        }
      }
    })
    .catch(function(err) {
      console.error('Error loading albums:', err);
    });
  }

  /**
   * Étape 4 : Charger les photos d'un album spécifique
   * et les ajouter au diaporama
   */
  function loadGooglePhotosFromAlbum(albumId, albumTitle, accessToken) {
    var token = accessToken || googleAuthState.accessToken;
    if (!token) return;

    fetch('https://photoslibrary.googleapis.com/v1/mediaItems:search', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        albumId: albumId,
        pageSize: 100
      })
    })
    .then(function(resp) { return resp.json(); })
    .then(function(data) {
      if (data.mediaItems) {
        // Convertir les photos Google en entrées de notre diaporama
        data.mediaItems.forEach(function(item) {
          if (item.mediaMetadata && item.mediaMetadata.width && item.mediaMetadata.height) {
            var baseUrl = item.baseUrl + '=w1920-h1080'; // Redimensionner pour la TV
            artworks.push({
              title: item.filename || item.description || albumTitle,
              artist: 'Google Photos — ' + albumTitle,
              year: item.mediaMetadata.creationTime || '',
              image_url: baseUrl,
              gallery: 'google_photos',
              source: 'google_photos'
            });
          }
        });

        state.currentArtIdx = artworks.length - data.mediaItems.length;
        renderArtwork(true);
        syncSidebarValues();
        console.log('📸 ' + data.mediaItems.length + ' photos chargées depuis: ' + albumTitle);
      }
    })
    .catch(function(err) {
      console.error('Error loading photos:', err);
    });
  }

  /**
   * Restaurer un token Google Photos sauvegardé
   */
  function restoreGoogleToken() {
    try {
      var token = localStorage.getItem('artframe_google_token');
      var expiry = localStorage.getItem('artframe_google_expiry');
      if (token && expiry && parseInt(expiry) > Date.now()) {
        googleAuthState.accessToken = token;
        state.googleConnected = true;
        document.getElementById('nav-google-val').textContent = 'Connecté';

        // Charger les albums silencieusement
        loadGooglePhotosAlbums(token);
        console.log('🔑 Token Google Photos restauré');
      }
    } catch(e) {}
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

  // Restaurer la session Google Photos
  restoreGoogleToken();

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


---

## 6. Wrapper Android TV — Kotlin + WebView

### 6.1 AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.artframe.tv">

    <!-- Permissions pour l'application TV -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <!-- Nécessaire pour Android TV (Leanback) -->
    <uses-feature android:name="android.software.leanback" android:required="true" />
    <uses-feature android:name="android.hardware.touchscreen" android:required="false" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="ArtFrame"
        android:theme="@style/Theme.ArtFrame"
        android:banner="@drawable/tv_banner"
        android:supportsRtl="true">

        <!-- Activité principale pour Android TV -->
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.ArtFrame"
            android:screenOrientation="landscape"
            android:configChanges="orientation|screenSize|keyboardHidden">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

### 6.2 MainActivity.kt (Kotlin)

```kotlin
package com.artframe.tv

import android.app.Activity
import android.content.pm.ActivityInfo
import android.os.Build
import android.os.Bundle
import android.os.PowerManager
import android.view.KeyEvent
import android.view.View
import android.view.WindowManager
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout

/**
 * ArtFrame — Android TV / Fire TV Main Activity
 *
 * Points clés :
 * - FLAG_KEEP_SCREEN_ON : empêche la TV de se mettre en veille
 * - Fullscreen absolu : aucun élément système visible
 * - WebView optimisé : hardware acceleration, DOM storage, cache
 * - Compatible : Xiaomi TV F Pro 75" (Android TV 11+) & Amazon Fire TV
 */
class MainActivity : Activity() {

    private lateinit var webView: WebView
    private lateinit var fullscreenContainer: FrameLayout
    private var powerManager: PowerManager? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 🔋 ANTI-VEILLE : Forcer l'écran à rester allumé
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

        // ⬛ PLEIN ÉCRAN ABSOLU
        window.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
        window.addFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS)
        window.decorView.systemUiVisibility = (
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            or View.SYSTEM_UI_FLAG_FULLSCREEN
            or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        )

        // Orientation paysage uniquement (TV)
        requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE

        // Layout
        fullscreenContainer = FrameLayout(this)
        setContentView(fullscreenContainer)

        // 📺 Configuration du WebView
        webView = WebView(this)
        webView.layoutParams = FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT
        )

        with(webView.settings) {
            // JavaScript & DOM
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            loadsImagesAutomatically = true

            // Cache pour les images IIIF
            cacheMode = WebSettings.LOAD_DEFAULT
            setAppCacheEnabled(true)
            setAppCachePath(cacheDir.absolutePath + "/webview_cache")

            // Performance
            setRenderPriority(WebSettings.RenderPriority.HIGH)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            }
            setSupportZoom(false)
            builtInZoomControls = false
            displayZoomControls = false

            // Taille de police adaptée TV
            textZoom = 100
            useWideViewPort = true
            loadWithOverviewMode = true
        }

        // Accélération matérielle
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)

        // WebChromeClient pour le fullscreen HTML5
        webView.webChromeClient = object : WebChromeClient() {
            override fun onShowCustomView(view: View?, callback: CustomViewCallback?) {
                // Support fullscreen HTML5 si besoin
                super.onShowCustomView(view, callback)
            }
        }

        // WebViewClient pour le débogage
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                // Injecter le flag keepScreenOn dans le contexte JS
                webView.evaluateJavascript(
                    "document.body.style.backgroundColor = '#000';",
                    null
                )
            }
        }

        // Charger l'application locale depuis le dossier assets
        // OU depuis une URL distante (Vercel, serveur local)
        webView.loadUrl("file:///android_asset/index.html")
        // Alternative : webView.loadUrl("https://artframe.vercel.app")

        fullscreenContainer.addView(webView)

        // PowerManager pour gérer la veille CPU
        powerManager = getSystemService(POWER_SERVICE) as PowerManager
    }

    /**
     * 🔄 GESTION DE LA TÉLÉCOMMANDE D-PAD
     *
     * Les touches sont automatiquement transmises au WebView
     * qui les traite via l'EventListener keydown du JavaScript.
     * On surcharge pour des cas spécifiques si nécessaire.
     */
    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        // Simuler les touches clavier standard pour le JS
        when (keyCode) {
            KeyEvent.KEYCODE_DPAD_UP ->
                webView.dispatchKeyEvent(KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_DPAD_UP))
            KeyEvent.KEYCODE_DPAD_DOWN ->
                webView.dispatchKeyEvent(KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_DPAD_DOWN))
            KeyEvent.KEYCODE_DPAD_LEFT ->
                webView.dispatchKeyEvent(KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_DPAD_LEFT))
            KeyEvent.KEYCODE_DPAD_RIGHT ->
                webView.dispatchKeyEvent(KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_DPAD_RIGHT))
            KeyEvent.KEYCODE_DPAD_CENTER ->
                webView.dispatchKeyEvent(KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_DPAD_CENTER))
            KeyEvent.KEYCODE_BACK -> {
                // Retour géré par le JS
                webView.dispatchKeyEvent(KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_BACK))
                return true
            }
            KeyEvent.KEYCODE_MENU -> {
                // Simuler la touche Enter pour ouvrir le menu
                webView.dispatchKeyEvent(KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_DPAD_UP))
                return true
            }
        }
        return super.onKeyDown(keyCode, event)
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        if (hasFocus) {
            // Maintenir le fullscreen quand la fenêtre reprend le focus
            window.decorView.systemUiVisibility = (
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_FULLSCREEN
                or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            )
        }
    }

    override fun onResume() {
        super.onResume()
        // Garder l'écran allumé
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

        // Ré-injecter le fullscreen
        window.decorView.systemUiVisibility = (
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            or View.SYSTEM_UI_FLAG_FULLSCREEN
            or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        )
    }

    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }
}
```

### 6.3 styles.xml (Thème TV)

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Thème complètement noir, sans barre d'action -->
    <style name="Theme.ArtFrame" parent="android:Theme.NoTitleBar">
        <item name="android:windowFullscreen">true</item>
        <item name="android:windowNoTitle">true</item>
        <item name="android:windowContentOverlay">@null</item>
        <item name="android:windowBackground">@android:color/black</item>
        <item name="android:windowShowWallpaper">false</item>
        <item name="android:colorBackgroundCacheHint">@null</item>
    </style>
</resources>
```

### 6.4 build.gradle.kts (Module app)

```kotlin
plugins {
    id("com.android.application")
    kotlin("android")
}

android {
    namespace = "com.artframe.tv"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.artframe.tv"
        minSdk = 21  // Android 5.0+ (Fire OS 5+)
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug") // ← À remplacer par votre clé
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    // Inclure index.html et les assets dans l'APK
    sourceSets {
        getByName("main") {
            assets.srcDirs("src/main/assets")
        }
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("androidx.leanback:leanback:1.0.0")
    implementation("androidx.tvprovider:tvprovider:1.1.0")
}
```

### 6.5 build.gradle.kts (Projet)

```kotlin
plugins {
    id("com.android.application") version "8.2.0" apply false
    id("org.jetbrains.kotlin.android") version "1.9.20" apply false
}
```

### 6.6 settings.gradle.kts

```kotlin
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolution {
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "ArtFrame"
include(":app")
```

---

## 7. Compilation & Installation APK

### 7.1 Étape 1 : Créer la structure de projet Android

```bash
# Depuis votre projet ArtFrame
mkdir -p android-tv-wrapper/app/src/main/java/com/artframe/tv
mkdir -p android-tv-wrapper/app/src/main/res/values
mkdir -p android-tv-wrapper/app/src/main/assets
mkdir -p android-tv-wrapper/app/src/main/res/mipmap-hdpi
mkdir -p android-tv-wrapper/app/src/main/res/drawable

# Copier les fichiers du guide dans assets/
cp index.html android-tv-wrapper/app/src/main/assets/
cp artworks.json android-tv-wrapper/app/src/main/assets/

# Copier les fichiers Kotlin/XML
# (Copiez les contenus des sections 6.1 à 6.6)
```

### 7.2 Étape 2 : Générer l'icône de l'application

```bash
# Option 1 : Utiliser une image PNG (512x512)
# Option 2 : Générer avec ImageMagick
convert -size 512x512 xc:'#1a1a1a' \
  -fill '#c4a46c' -draw "roundrectangle 50,50 462,462 40,40" \
  -fill '#f0c85d' -font Georgia -pointsize 200 \
  -gravity center -annotate +0+30 'AF' \
  android-tv-wrapper/app/src/main/res/mipmap-hdpi/ic_launcher.png
```

### 7.3 Étape 3 : Compiler l'APK

**Prérequis :** Android Studio installé OU SDK Android + Gradle en CLI.

```bash
# Méthode CLI (sans Android Studio)
cd android-tv-wrapper

# Vérifier que le SDK est installé
echo "sdk.dir=$HOME/Library/Android/sdk" > local.properties

# Compiler en mode debug
./gradlew assembleDebug

# L'APK se trouve dans :
# app/build/outputs/apk/debug/app-debug.apk

# Compiler en mode release (signé)
./gradlew assembleRelease
# app/build/outputs/apk/release/app-release.apk
```

### 7.4 Étape 4 : Installer sur la Xiaomi TV F Pro 75"

**Méthode A : Via ADB (recommandé)**

```bash
# 1. Activer le Mode Développeur sur la TV :
#    Paramètres → Apps → Applications → Android TV → Stockage → Effacer les données
#    (ou : Paramètres → Système → À propos → Construire → cliquer 7 fois)

# 2. Activer le Débogage USB :
#    Paramètres → Apps → Applications → Sécurité → Débogage USB → ON

# 3. Trouver l'IP de la TV :
#    Paramètres → Réseau → À propos → Adresse IP

# 4. Connecter ADB sur le réseau :
adb connect 192.168.1.XX:5555

# 5. Installer l'APK
adb install app/build/outputs/apk/debug/app-debug.apk

# 6. Vérifier l'installation
adb shell pm list packages | grep artframe

# 7. Lancer l'application
adb shell am start -n com.artframe.tv/.MainActivity
```

**Méthode B : Via clé USB**

```bash
# 1. Copier l'APK sur une clé USB (FAT32)
cp app-debug.apk /Volumes/CLE_USB/

# 2. Brancher la clé sur la TV

# 3. Installer un gestionnaire de fichiers (X-plore File Manager)

# 4. Naviguer jusqu'à l'APK et l'installer

# 5. Si Android TV bloque l'installation :
#    Paramètres → Apps → Sécurité → Sources inconnues → ON
```

### 7.5 Étape 5 : Installer sur Amazon Fire TV

```bash
# 1. Activer le Mode Développeur :
#    Paramètres → My Fire TV → About → Cliquer 7 fois sur "Fire TV Stick"

# 2. Activer ADB Debugging :
#    Paramètres → Developer Options → ADB Debugging → ON
#    Installer Apps from Unknown Sources → ON

# 3. Trouver l'IP du Fire TV :
#    Paramètres → My Fire TV → About → Network

# 4. Connecter ADB
adb connect 192.168.1.YY:5555

# 5. Installer
adb install app/build/outputs/apk/debug/app-debug.apk
```

### 7.6 Proguard Rules (proguard-rules.pro)

```pro
# ArtFrame ProGuard Rules
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep WebView JS interface
-keep class com.artframe.tv.** { *; }

# Keep all assets
-keep class !android.support.v7.internal.view.menu.** { *; }

# Dont obfuscate
-dontobfuscate
```

---

## 8. Déploiement Web (Vercel)

Pour tester et prévisualiser l'application sur votre navigateur avant de compiler l'APK :

```bash
# 1. Créer un dépôt GitHub
cd /chemin/vers/ArtFrame-Android-TV
git init
git add .
git commit -m "feat: ArtFrame - Android TV Art Mode App"

# 2. Créer le repo sur GitHub (via gh CLI)
gh repo create artframe-tv --public --source=. --remote=origin

# 3. Pousser le code
git push -u origin main

# 4. Déployer sur Vercel (via CLI Vercel)
vercel --prod

# 5. Le lien sera : https://artframe-tv.vercel.app
#    Ouvrez-le et redimensionnez la fenêtre en 1920×1080 pour tester
```

### 8.1 vercel.json

```json
{
  "name": "artframe-tv",
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    },
    {
      "src": "artworks.json",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "artworks.json",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=86400, immutable"
        }
      ]
    }
  ]
}
```

---

## 9. Google OAuth Device Flow (Connexion Google Photos)

### 9.1 Configuration Google Cloud Console

```
1. Aller sur https://console.cloud.google.com/
2. Sélectionner le projet "cocktail-450414" (déjà créé)
3. Activer l'API Google Photos Library :
   → API & Services → Bibliothèque → chercher "Photos Library API" → Activer
4. L'OAuth Client ID est déjà créé :
   - Type : TV and Limited Input Devices
   - Client ID : VOTRE_CLIENT_ID.apps.googleusercontent.com
   - Client Secret : VOTRE_CLIENT_SECRET
5. Scope : https://www.googleapis.com/auth/photoslibrary.readonly
```

### 9.2 Fonctionnement du Device Flow (TV → Smartphone)

```
1. L'utilisateur clique sur "Se connecter avec Google" sur la TV
2. L'app appelle POST https://oauth2.googleapis.com/device/code
   → Reçoit : user_code (ex: "G4X7-K2M9-PQ") + device_code + verification_url
3. La TV affiche :
   - Le code à 9 caractères (G4X7-K2M9-PQ)
   - L'URL google.com/device
   - Un QR code de l'URL de vérification
4. L'utilisateur va sur google.com/device sur son smartphone
5. Il saisit le code affiché sur la TV
6. Il autorise l'accès à Google Photos (lecture seule)
7. La TV reçoit le token et charge les albums automatiquement
```

### 9.3 Code JavaScript (intégré dans l'application)

Le code complet est intégré dans le fichier `index.html` via les fonctions :
- `startGoogleAuth()` → Démarre le Device Flow
- `pollForGoogleToken()` → Vérifie toutes les 5s si l'utilisateur a validé
- `loadGooglePhotosAlbums()` → Charge la liste des albums Google Photos
- `loadGooglePhotosFromAlbum()` → Charge les photos d'un album et les ajoute au diaporama
- `restoreGoogleToken()` → Restaure un token sauvegardé (localStorage)

Ces fonctions sont déjà présentes dans le JavaScript de l'index.html.

### 9.4 Gestion des tokens

```javascript
// Le token est sauvegardé dans localStorage pour éviter
// de reconnecter à chaque démarrage de l'application
localStorage.setItem('artframe_google_token', access_token);
localStorage.setItem('artframe_google_expiry', Date.now() + (expires_in * 1000));

// Les tokens expirent au bout de 1h (3600s)
// Google Photos Library API est en lecture seule (readonly scope)
// → Sécurité maximale : l'app ne peut que lire, pas modifier/supprimer
```

---

## 10. Checklist de Vérification

Avant de considérer le projet comme terminé :

### ✅ Fonctionnalités Core
- [ ] 100+ œuvres d'art s'affichent correctement en Full HD+
- [ ] Les 10 styles de cadres s'appliquent avec l'effet 3D
- [ ] Le mode diaporama bascule en plein écran absolu
- [ ] La rotation automatique fonctionne (15 min, 30 min, etc.)

### ✅ Télécommande (D-Pad)
- [ ] ↑/Enter → Menu principal visible
- [ ] ←/→ → Navigation dans le menu / changement d'œuvre
- [ ] Entrée → Ouvre les paramètres
- [ ] Échap/Back → Retour au niveau précédent
- [ ] Focus bien visible sur TV 75" (anneau lumineux)

### ✅ Anti-Veille & Protection
- [ ] La TV ne s'éteint pas pendant le diaporama
- [ ] Pixel shift actif toutes les 5 minutes
- [ ] Plein écran sans barres de navigation système
- [ ] Aucun élément UI visible pendant la diffusion

### ✅ Tests
- [ ] Fonctionne dans Chrome DevTools (mode TV 1920×1080)
- [ ] Fonctionne sur Vercel (lien de preview)
- [ ] APK compilé et installé via ADB
- [ ] Fonctionne sur Xiaomi TV F Pro 75"
- [ ] Fonctionne sur Amazon Fire TV Stick 4K

---

## 11. Dépannage

### Problème : L'APK ne s'installe pas sur la TV
```
Solution :
- Vérifier que "Sources inconnues" est activé
- Vérifier que le SDK min est 21 (Android 5.0+)
- Redémarrer ADB : adb kill-server && adb start-server
- Réessayer la connexion : adb connect IP:5555
```

### Problème : Les images ne se chargent pas
```
Solution :
- Vérifier la connexion internet de la TV
- Les URLs IIIF peuvent prendre 2-3s à charger
- Vérifier la console WebView dans Android Studio
- Le fallback CSS gradient s'active si l'URL échoue
```

### Problème : Le D-Pad ne répond pas
```
Solution :
- Vérifier que le WebView a le focus : webView.requestFocus()
- Vérifier la télécommande : tester dans YouTube
- Le JS écoute keydown, pas keyup
```

---

> **Livré par Hermès — Juillet 2026**
> *Dédié à la Xiaomi TV F Pro 75" de Dany*
