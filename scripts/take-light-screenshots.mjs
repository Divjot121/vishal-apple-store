import puppeteer from 'puppeteer-core';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '../screenshots');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function captureLightScreenshots() {
  console.log('Launching headless Chrome to capture light theme screenshots...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--window-size=1600,1000'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 920, deviceScaleFactor: 2 });

    // Enable light theme helper
    const enableLight = async () => {
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('vas_theme', 'light');
      });
      await new Promise((r) => setTimeout(r, 600));
    };

    // 1. Catalog in Light Mode
    console.log('Capturing Catalog (Light)...');
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
    await enableLight();
    await page.evaluate(() => {
      const el = document.getElementById('catalog');
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(outDir, '03-catalog-filters-light.png'),
      clip: { x: 0, y: 150, width: 1440, height: 1100 },
    });

    // 2. Product Detail (Light)
    console.log('Capturing Product Detail (Light)...');
    await page.goto('http://localhost:3001/product/iphone-16-pro-max', { waitUntil: 'networkidle0' });
    await enableLight();
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(outDir, '04-product-detail-light.png'),
      clip: { x: 0, y: 0, width: 1440, height: 1150 },
    });

    // 3. Compare Specs (Light)
    console.log('Capturing Compare Specs (Light)...');
    await page.goto('http://localhost:3001/compare', { waitUntil: 'networkidle0' });
    await enableLight();
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(outDir, '05-compare-specs-light.png'),
      clip: { x: 0, y: 0, width: 1440, height: 1100 },
    });

    // 4. EMI & Trade-In Tools (Light)
    console.log('Capturing EMI Tools (Light)...');
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
    await enableLight();
    await page.evaluate(() => {
      const el = document.getElementById('tools');
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(outDir, '06-emi-tradein-tools-light.png'),
      clip: { x: 0, y: 100, width: 1440, height: 950 },
    });

    // 5. Admin Dashboard (Light)
    console.log('Capturing Admin Dashboard (Light)...');
    await page.goto('http://localhost:3001/admin', { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      const btn = document.querySelector('button[type="button"]');
      if (btn && btn.textContent && btn.textContent.includes('Demo Fast-Login')) {
        btn.click();
      }
    });
    await new Promise((r) => setTimeout(r, 1000));
    await enableLight();
    await page.screenshot({
      path: path.join(outDir, '07-admin-dashboard-light.png'),
      clip: { x: 0, y: 0, width: 1440, height: 1050 },
    });

    // 6. Mobile Storefront (Light)
    console.log('Capturing Mobile Storefront (Light)...');
    await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
    await enableLight();
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(outDir, '08-mobile-storefront-light.png'),
      clip: { x: 0, y: 0, width: 393, height: 852 },
    });

    console.log('All light theme screenshots captured successfully!');
  } finally {
    await browser.close();
  }
}

captureLightScreenshots().catch((err) => {
  console.error('Failed to capture light screenshots:', err);
  process.exit(1);
});
