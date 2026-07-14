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
2. Créer un projet (ou utiliser "cocktail-450414")
3. Activer l'API Google Photos Library
4. Créer un OAuth Client ID :
   - Type : TV and Limited Input Devices
   - Nom : ArtFrame TV
5. Noter le Client ID
```

### 9.2 Endpoints OAuth TV

```
Authorization URL:
  https://accounts.google.com/o/oauth2/auth
  ?client_id=CLIENT_ID
  &scope=https://www.googleapis.com/auth/photoslibrary.readonly
  &redirect_uri=urn:ietf:wg:oauth:2.0:oob
  &response_type=code

Token Exchange:
  POST https://oauth2.googleapis.com/token
  Body: client_id=CLIENT_ID&client_secret=CLIENT_SECRET
        &code=AUTH_CODE&grant_type=authorization_code

Device Flow (adapté TV):
  POST https://oauth2.googleapis.com/device/code
  Body: client_id=CLIENT_ID&scope=photoslibrary.readonly
```

### 9.3 Intégration dans le JavaScript

```javascript
// Google TV Device Flow
var GOOGLE_CLIENT_ID = 'VOTRE_CLIENT_ID.apps.googleusercontent.com';

function startGoogleAuth() {
  // Request device code
  fetch('https://oauth2.googleapis.com/device/code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'client_id=' + GOOGLE_CLIENT_ID + '&scope=https://www.googleapis.com/auth/photoslibrary.readonly'
  })
  .then(function(resp) { return resp.json(); })
  .then(function(data) {
    // Display QR code and verification URL
    document.getElementById('auth-code').textContent = data.user_code;
    document.getElementById('auth-url').textContent = data.verification_url;
    generateQrCode(data.verification_url + '?code=' + data.user_code);

    // Poll for token
    return pollForToken(data.device_code, data.interval);
  })
  .then(function(token) {
    state.googleConnected = true;
    state.googleToken = token;
    loadGooglePhotos(token);
    closeAuth();
    syncSidebarValues();
  })
  .catch(function(err) {
    console.error('Google Auth failed:', err);
  });
}

function pollForDeviceToken(deviceCode, interval) {
  return new Promise(function(resolve, reject) {
    var poll = setInterval(function() {
      fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'client_id=' + GOOGLE_CLIENT_ID +
              '&device_code=' + deviceCode +
              '&grant_type=urn:ietf:params:oauth:grant-type:device_code'
      })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.access_token) {
          clearInterval(poll);
          resolve(data.access_token);
        } else if (data.error === 'authorization_pending') {
          // Still waiting for user — keep polling
        } else if (data.error === 'expired_token' || data.error === 'access_denied') {
          clearInterval(poll);
          reject(data.error);
        }
      });
    }, (interval || 5) * 1000);
  });
}
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
