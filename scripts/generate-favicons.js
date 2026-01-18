const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public');
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

  // Generate favicon.ico (contains 16x16 and 32x32)
  // First create the individual sizes as buffers
  const icon16 = await sharp(logoPath)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const icon32 = await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  // For favicon.ico, we'll use the 32x32 version converted to ico format
  // Since sharp doesn't support ico directly, we'll create a simple ico file
  // using the PNG data with ICO header

  // Create ICO file with both sizes
  const icoBuffer = createIcoFromPngs([
    { buffer: icon16, size: 16 },
    { buffer: icon32, size: 32 }
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Created favicon.ico');

  console.log('\nAll favicons generated successfully!');
}

function createIcoFromPngs(images) {
  // ICO file format:
  // - 6 byte header
  // - 16 byte entry for each image
  // - image data

  const headerSize = 6;
  const entrySize = 16;
  const numImages = images.length;

  // Calculate total size
  let dataOffset = headerSize + (entrySize * numImages);
  const entries = [];

  for (const img of images) {
    entries.push({
      width: img.size === 256 ? 0 : img.size,
      height: img.size === 256 ? 0 : img.size,
      buffer: img.buffer,
      offset: dataOffset
    });
    dataOffset += img.buffer.length;
  }

  // Create the ICO buffer
  const icoBuffer = Buffer.alloc(dataOffset);

  // Write header
  icoBuffer.writeUInt16LE(0, 0);      // Reserved
  icoBuffer.writeUInt16LE(1, 2);      // Type (1 = ICO)
  icoBuffer.writeUInt16LE(numImages, 4); // Number of images

  // Write entries
  let entryOffset = headerSize;
  for (const entry of entries) {
    icoBuffer.writeUInt8(entry.width, entryOffset);      // Width
    icoBuffer.writeUInt8(entry.height, entryOffset + 1); // Height
    icoBuffer.writeUInt8(0, entryOffset + 2);            // Color palette
    icoBuffer.writeUInt8(0, entryOffset + 3);            // Reserved
    icoBuffer.writeUInt16LE(1, entryOffset + 4);         // Color planes
    icoBuffer.writeUInt16LE(32, entryOffset + 6);        // Bits per pixel
    icoBuffer.writeUInt32LE(entry.buffer.length, entryOffset + 8);  // Size
    icoBuffer.writeUInt32LE(entry.offset, entryOffset + 12);        // Offset
    entryOffset += entrySize;
  }

  // Write image data
  for (const entry of entries) {
    entry.buffer.copy(icoBuffer, entry.offset);
  }

  return icoBuffer;
}

generateFavicons().catch(console.error);
