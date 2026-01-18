const sharp = require('sharp');
const toIco = require('to-ico');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public');
const appDir = path.join(__dirname, '..', 'src', 'app');
const logoPath = path.join(publicDir, 'logo.webp');

async function generateFavicons() {
  console.log('Generating favicons from logo.webp...');

  // Generate favicon-16x16.png
  await sharp(logoPath)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('Created favicon-16x16.png');

  // Generate favicon-32x32.png
  await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Created favicon-32x32.png');

  // Generate apple-touch-icon.png (180x180)
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // Generate PNG buffers for ICO
  const png16 = await sharp(logoPath)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const png32 = await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const png48 = await sharp(logoPath)
    .resize(48, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  // Generate favicon.ico using to-ico (proper ICO format)
  const icoBuffer = await toIco([png16, png32, png48]);

  // Write to both public and src/app (Next.js uses src/app/favicon.ico by default)
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('Created favicon.ico (in public/ and src/app/)');

  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
