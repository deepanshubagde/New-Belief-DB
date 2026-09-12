const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create a 64x64 RGBA buffer matching the Monkhood Belief Favicon
const size = 64;
const buffer = Buffer.alloc(size * size * 4);

function setPixel(x, y, r, g, b, a) {
  if (x < 0 || x >= size || y < 0 || y >= size) return;
  const idx = (y * size + x) * 4;
  // Alpha blending
  const currentA = buffer[idx + 3] / 255;
  const newA = a / 255;
  const outA = newA + currentA * (1 - newA);
  if (outA > 0) {
    buffer[idx] = Math.round((r * newA + buffer[idx] * currentA * (1 - newA)) / outA);
    buffer[idx + 1] = Math.round((g * newA + buffer[idx + 1] * currentA * (1 - newA)) / outA);
    buffer[idx + 2] = Math.round((b * newA + buffer[idx + 2] * currentA * (1 - newA)) / outA);
    buffer[idx + 3] = Math.round(outA * 255);
  }
}

// Distance helper
function dist(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

// Render the icon pixels
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    // 1. Squircle background (center at 31.5, 31.5, radius ~28 with rounded corners)
    const dx = Math.abs(x - 31.5);
    const dy = Math.abs(y - 31.5);
    const cornerDist = Math.hypot(Math.max(0, dx - 17), Math.max(0, dy - 17));

    if (cornerDist <= 13.5) {
      // Dark zen radial background
      const dCenter = dist(x, y, 31.5, 31.5) / 32;
      const bgR = Math.round(36 * (1 - dCenter * 0.7));
      const bgG = Math.round(27 * (1 - dCenter * 0.7));
      const bgB = Math.round(18 * (1 - dCenter * 0.7));
      setPixel(x, y, bgR, bgG, bgB, 255);

      // Amber border
      if (cornerDist >= 12.0 && cornerDist <= 13.5) {
        setPixel(x, y, 229, 154, 70, 180);
      }
    }

    // 2. Subtle 4D Sacred Orbit Circle
    const dCircle = Math.abs(dist(x, y, 31.5, 31.5) - 22);
    if (dCircle < 1.0) {
      setPixel(x, y, 229, 154, 70, 60);
    }

    // 3. Four-point Astroid Belief Star (M 32 11 Q 32 32 53 32 Q 32 32 32 53 Q 32 32 11 32 Q 32 32 32 11)
    // Implicit equation for astroid: (x/a)^(2/3) + (y/b)^(2/3) <= 1
    const sx = Math.abs(x - 31.5) / 21;
    const sy = Math.abs(y - 31.5) / 21;
    const astroidVal = Math.pow(sx, 0.666) + Math.pow(sy, 0.666);
    if (astroidVal <= 1.05) {
      const edgeFactor = Math.max(0, Math.min(1, (1.05 - astroidVal) * 8));
      // Monk Amber / Gold gradient
      const goldR = Math.round(253 - (y / size) * 50);
      const goldG = Math.round(210 - (y / size) * 65);
      const goldB = Math.round(90 - (y / size) * 40);
      setPixel(x, y, goldR, goldG, goldB, Math.round(255 * edgeFactor));
    }

    // 4. Inner Mind Diamond
    const manhattan = Math.abs(x - 31.5) + Math.abs(y - 31.5);
    if (manhattan <= 12) {
      const diamondR = 255;
      const diamondG = Math.round(250 - manhattan * 4);
      const diamondB = Math.round(210 - manhattan * 10);
      setPixel(x, y, diamondR, diamondG, diamondB, 240);
    }

    // 5. Central luminous awakening core
    const dCore = dist(x, y, 31.5, 31.5);
    if (dCore <= 3.2) {
      setPixel(x, y, 255, 255, 255, 255);
    }
    if (dCore <= 1.5) {
      setPixel(x, y, 180, 83, 9, 255);
    }
  }
}

// 6. Draw 4 sacred dimensional nodes
function drawDot(cx, cy, r, g, b) {
  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      if (dx * dx + dy * dy <= 4.5) {
        setPixel(cx + dx, cy + dy, r, g, b, 255);
      }
    }
  }
}
drawDot(32, 10, 226, 109, 92); // D1 Coral Red
drawDot(53, 32, 229, 168, 75); // D2 Gold
drawDot(32, 53, 157, 113, 232); // D3 Violet
drawDot(10, 32, 54, 179, 126); // D4 Emerald

// PNG encoding helper (pure Node)
function createPng(width, height, rgbaBuffer) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // RGBA color type
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Scanlines with filter byte 0 (None)
  const rawScanlines = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (width * 4 + 1);
    rawScanlines[rowOffset] = 0; // filter None
    rgbaBuffer.copy(rawScanlines, rowOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressedData = zlib.deflateSync(rawScanlines);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([length, typeAndData, crc]);
}

// Write PNG files
const pngBuffer = createPng(size, size, buffer);
const publicDir = path.resolve(__dirname, '../public');

fs.writeFileSync(path.join(publicDir, 'favicon.png'), pngBuffer);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), pngBuffer);

// Create valid ICO wrapping the PNG
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // image type (1 = icon)
icoHeader.writeUInt16LE(1, 4); // number of images

const icoEntry = Buffer.alloc(16);
icoEntry.writeUInt8(size, 0); // width
icoEntry.writeUInt8(size, 1); // height
icoEntry.writeUInt8(0, 2); // color count
icoEntry.writeUInt8(0, 3); // reserved
icoEntry.writeUInt16LE(1, 4); // color planes
icoEntry.writeUInt16LE(32, 6); // bits per pixel
icoEntry.writeUInt32LE(pngBuffer.length, 8); // image size
icoEntry.writeUInt32LE(22, 12); // image offset (6 + 16 = 22)

const icoBuffer = Buffer.concat([icoHeader, icoEntry, pngBuffer]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

console.log('Successfully generated favicon.png, apple-touch-icon.png, and favicon.ico in public/');
