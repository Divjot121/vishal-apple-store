import puppeteer from 'puppeteer-core';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '../screenshots');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function capture() {
  console.log('Launching headless Chrome to capture high-res screenshots...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--window-size=1600,1000'],
  });

  try {
    const page = await browser.newPage();

    // 1. Desktop Hero (Dark Theme)
    console.log('1. Capturing Desktop Hero (Dark Mode)...');
    await page.setViewport({ width: 1440, height: 920, deviceScaleFactor: 2 });
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('vas_theme', 'dark');
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(outDir, '01-storefront-hero-dark.png'),
      clip: { x: 0, y: 0, width: 1440, height: 920 },
    });

    // 2. Desktop Hero (Light Theme)
    console.log('2. Capturing Desktop Hero (Light Mode)...');
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('vas_theme', 'light');
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(outDir, '02-storefront-hero-light.png'),
      clip: { x: 0, y: 0, width: 1440, height: 920 },
    });

    // Reset back to dark
    await page.evaluate(() => {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('vas_theme', 'dark');
    });
    await new Promise((r) => setTimeout(r, 400));

    // 3. Product Catalog with Filters
    console.log('3. Capturing Product Catalog & Filters...');
    await page.evaluate(() => {
      const el = document.getElementById('catalog');
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(outDir, '03-catalog-filters.png'),
      clip: { x: 0, y: 150, width: 1440, height: 1100 },
    });

    // 4. Product Detail Page (iPhone 16 Pro Max)
    console.log('4. Capturing Product Detail Page...');
    await page.goto('http://localhost:3001/product/iphone-16-pro-max', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(outDir, '04-product-detail-iphone16promax.png'),
      clip: { x: 0, y: 0, width: 1440, height: 1150 },
    });

    // 5. Comparison Matrix
    console.log('5. Capturing Compare Specs Matrix...');
    await page.goto('http://localhost:3001/compare', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(outDir, '05-compare-specs.png'),
      clip: { x: 0, y: 0, width: 1440, height: 1100 },
    });

    // 6. EMI & Trade-In Tools
    console.log('6. Capturing EMI & Trade-In Calculator...');
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      const el = document.getElementById('tools');
      if (el) el.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(outDir, '06-emi-tradein-tools.png'),
      clip: { x: 0, y: 100, width: 1440, height: 950 },
    });

    // 7. Store Owner Admin Dashboard
    console.log('7. Capturing Admin Dashboard & Inventory Manager...');
    await page.goto('http://localhost:3001/admin', { waitUntil: 'networkidle0' });
    // If login is shown, auto login
    await page.evaluate(() => {
      const btn = document.querySelector('button[type="button"]');
      if (btn && btn.textContent && btn.textContent.includes('Demo Fast-Login')) {
        btn.click();
      }
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(outDir, '07-admin-dashboard.png'),
      clip: { x: 0, y: 0, width: 1440, height: 1050 },
    });

    // 8. Mobile Viewport (iPhone 15 Pro 393x852 @3x)
    console.log('8. Capturing Mobile Storefront...');
    await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(outDir, '08-mobile-storefront.png'),
      clip: { x: 0, y: 0, width: 393, height: 852 },
    });

    console.log('All 8 high-resolution screenshots generated successfully!');
  } finally {
    await browser.close();
  }
}

capture().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
