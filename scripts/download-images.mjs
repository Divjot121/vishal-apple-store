import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../public/devices');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  { name: 'iphone-16-pro-natural.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'iphone-16-pro-black.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'iphone-16-pro-desert.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'iphone-16-pro-white.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-whitetitanium?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'iphone-16-black.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'iphone-16-teal.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'iphone-16-pink.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'iphone-15-pro-natural.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'iphone-15-pro-blue.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'iphone-15-blue.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'iphone-14-midnight.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'macbook-pro-14.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'macbook-pro-16.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'macbook-air-15.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202306?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'macbook-air-13.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-spacegray-select-202402?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'ipad-pro-13.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spaceblack-202405?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'ipad-air-11.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-unselect-gallery-1-202405?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'ipad-10th-gen.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-silver-wifi?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'airpods-pro-2.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'airpods-max.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-midnight?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'airpods-4.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-anc-select-202409?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'watch-ultra-2.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-ultra2-202409?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'watch-series-10.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-s10-202409?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'watch-se-2.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-se-202409?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'magsafe-charger.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX6X3?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'power-adapter.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MNWM3?wid=1000&hei=1000&fmt=png-alpha' },
  { name: 'apple-pencil-pro.png', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX2D3?wid=1000&hei=1000&fmt=png-alpha' }
];

async function downloadAll() {
  console.log(`Starting download of ${assets.length} official Apple stock renders...`);
  for (const item of assets) {
    const dest = path.join(targetDir, item.name);
    try {
      const res = await fetch(item.url);
      if (!res.ok) {
        console.error(`Failed ${item.name}: ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`✓ Saved ${item.name} (${Math.round(buffer.length / 1024)} KB)`);
    } catch (err) {
      console.error(`Error saving ${item.name}:`, err.message);
    }
  }
  console.log('All downloads completed!');
}

downloadAll();
