const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LOGO_SRC = "/Users/danyvassily/.gemini/antigravity-ide/brain/df593cf6-00c4-4788-82a3-10538c568c0d/media__1784879251469.jpg";
const BANNER_SRC = "/Users/danyvassily/.gemini/antigravity-ide/brain/df593cf6-00c4-4788-82a3-10538c568c0d/media__1784879251469.jpg";

const RES_DIR = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

// Copy main logo to root
fs.copyFileSync(LOGO_SRC, path.join(__dirname, 'artframe_logo.png'));
fs.copyFileSync(LOGO_SRC, path.join(__dirname, 'www', 'artframe_logo.png'));
console.log("✅ Copied artframe_logo.png to root and www/");

const iconSizes = [
  { folder: 'mipmap-mdpi', iconSize: 48, foreSize: 108 },
  { folder: 'mipmap-hdpi', iconSize: 72, foreSize: 162 },
  { folder: 'mipmap-xhdpi', iconSize: 96, foreSize: 216 },
  { folder: 'mipmap-xxhdpi', iconSize: 144, foreSize: 324 },
  { folder: 'mipmap-xxxhdpi', iconSize: 192, foreSize: 432 }
];

for (const s of iconSizes) {
  const dir = path.join(RES_DIR, s.folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const launcherPath = path.join(dir, 'ic_launcher.png');
  const launcherRoundPath = path.join(dir, 'ic_launcher_round.png');
  const launcherForePath = path.join(dir, 'ic_launcher_foreground.png');

  fs.copyFileSync(LOGO_SRC, launcherPath);
  fs.copyFileSync(LOGO_SRC, launcherRoundPath);
  fs.copyFileSync(LOGO_SRC, launcherForePath);

  execSync(`sips -z ${s.iconSize} ${s.iconSize} "${launcherPath}"`);
  execSync(`sips -z ${s.iconSize} ${s.iconSize} "${launcherRoundPath}"`);
  execSync(`sips -z ${s.foreSize} ${s.foreSize} "${launcherForePath}"`);

  console.log(`✅ Generated ${s.folder} launcher icons (${s.iconSize}x${s.iconSize})`);
}

// Banners for TV Leanback
const bannerFolders = [
  'drawable',
  'drawable-hdpi',
  'drawable-mdpi',
  'drawable-xhdpi',
  'drawable-xxhdpi',
  'drawable-xxxhdpi',
  'drawable-land-hdpi',
  'drawable-land-mdpi',
  'drawable-land-xhdpi',
  'drawable-land-xxhdpi',
  'drawable-land-xxxhdpi'
];

for (const bf of bannerFolders) {
  const bDir = path.join(RES_DIR, bf);
  if (!fs.existsSync(bDir)) fs.mkdirSync(bDir, { recursive: true });
  const bannerPath = path.join(bDir, 'banner.png');
  const splashPath = path.join(bDir, 'splash.png');

  fs.copyFileSync(BANNER_SRC, bannerPath);
  fs.copyFileSync(BANNER_SRC, splashPath);

  execSync(`sips -z 180 320 "${bannerPath}"`);
  execSync(`sips -z 720 1280 "${splashPath}"`);

  console.log(`✅ Generated Android TV banner.png in ${bf}`);
}

console.log("\n🎉 All Android TV launcher icons & banners updated!");
