import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const pdfPath = path.join(rootDir, 'Vishal_Apple_Store_Pitch_Presentation_Light.pdf');
const publicPdfPath = path.join(rootDir, 'public/Vishal_Apple_Store_Pitch_Presentation_Light.pdf');
const brainPdfPath = '/Users/divjot/.gemini/antigravity/brain/5cd6b383-6c8d-4214-ac82-7664eacb0836/Vishal_Apple_Store_Pitch_Presentation_Light.pdf';

function toBase64(relPath) {
  const full = path.join(rootDir, relPath);
  if (!fs.existsSync(full)) return '';
  const buf = fs.readFileSync(full);
  const ext = path.extname(relPath).toLowerCase().replace('.', '');
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

const logoBase64 = toBase64('public/brand/horizontal.jpeg');
const heroLight = toBase64('screenshots/02-storefront-hero-light.png');
const heroDark = toBase64('screenshots/01-storefront-hero-dark.png');
const catalogLight = toBase64('screenshots/03-catalog-filters-light.png');
const productLight = toBase64('screenshots/04-product-detail-light.png');
const compareLight = toBase64('screenshots/05-compare-specs-light.png');
const toolsLight = toBase64('screenshots/06-emi-tradein-tools-light.png');
const adminLight = toBase64('screenshots/07-admin-dashboard-light.png');
const mobileLight = toBase64('screenshots/08-mobile-storefront-light.png');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vishal Apple Store — Client Presentation (Light Theme)</title>
  <style>
    @page {
      size: 297mm 210mm;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #FAFAFA;
      color: #111827;
      -webkit-font-smoothing: antialiased;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .slide {
      width: 297mm;
      height: 210mm;
      page-break-after: always;
      position: relative;
      overflow: hidden;
      padding: 16mm 20mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #FAFAFA;
    }
    .gold {
      color: #B8860B;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }
    .badge-gold {
      background: rgba(184, 134, 11, 0.12);
      color: #996515;
      border: 1px solid rgba(184, 134, 11, 0.28);
    }
    .badge-emerald {
      background: rgba(16, 185, 129, 0.12);
      color: #047857;
      border: 1px solid rgba(16, 185, 129, 0.28);
    }
    .header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      padding-bottom: 10px;
      margin-bottom: 16px;
    }
    .footer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      padding-top: 10px;
      font-size: 11px;
      color: #6B7280;
    }
    .slide-title {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1.15;
      color: #111827;
    }
    .slide-desc {
      font-size: 13px;
      color: #4B5563;
      margin-top: 4px;
      line-height: 1.4;
    }
    .img-frame {
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      overflow: hidden;
      box-shadow: 0 14px 30px rgba(0, 0, 0, 0.06);
      background: #FFFFFF;
    }
    .card-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .card {
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
    }
    .card h4 {
      font-size: 14px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 6px;
    }
    .card p {
      font-size: 12px;
      color: #4B5563;
      line-height: 1.45;
    }
  </style>
</head>
<body>

  <!-- ==================== SLIDE 1: COVER (LIGHT THEME) ==================== -->
  <div class="slide" style="justify-content: center; text-align: center; position: relative; background: #FFFFFF;">
    <div style="position: absolute; top: 18mm; left: 20mm;">
      <img src="${logoBase64}" style="height: 42px; display: block;" alt="Vishal Apple Store" />
    </div>
    <div style="position: absolute; top: 20mm; right: 20mm;">
      <span class="badge badge-gold">Light Theme Presentation</span>
    </div>

    <div style="max-width: 840px; margin: 0 auto; margin-top: 15mm;">
      <p style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #B8860B; margin-bottom: 12px;">
        High-End Retail Platform & Client Proposal
      </p>
      <h1 style="font-size: 46px; font-weight: 900; letter-spacing: -1.2px; line-height: 1.1; margin-bottom: 18px; color: #111827;">
        VISHAL APPLE STORE
      </h1>
      <p style="font-size: 20px; color: #374151; font-weight: 400; line-height: 1.5; margin-bottom: 24px;">
        A pristine, Apple-minimalist retail experience and autonomous store management panel for Ranjit Avenue, Amritsar.
      </p>
      <div style="display: flex; justify-content: center; gap: 14px; font-size: 12px; color: #4B5563;">
        <span style="background: #F3F4F6; padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.08);">📍 Shop No. 14, Ranjit Avenue, Amritsar</span>
        <span style="background: #F3F4F6; padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.08);">⚡ Next.js App Router + TypeScript</span>
        <span style="background: #F3F4F6; padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.08);">📱 Mobile-First High Conversion</span>
      </div>
    </div>

    <div class="footer-bar" style="margin-top: auto;">
      <span>Prepared for: Vishal Apple Store Leadership</span>
      <span>Confidential Client Presentation · Light Theme Edition</span>
      <span>Status: Demo Ready (localhost:3001)</span>
    </div>
  </div>

  <!-- ==================== SLIDE 2: STRATEGY & THE 4 PILLARS ==================== -->
  <div class="slide">
    <div class="header-bar">
      <div>
        <h2 class="slide-title">Retail Strategy & The 4 Pillars of Customer Trust</h2>
        <p class="slide-desc">Designed to convert premium local buyers searching on Instagram and Google Maps across Punjab.</p>
      </div>
      <span class="badge badge-gold">Strategic Architecture</span>
    </div>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 10px 0;">
      <div class="card" style="border-top: 3px solid #B8860B;">
        <span class="badge badge-emerald" style="margin-bottom: 10px;">Pillar 1</span>
        <h4>Brand New Sealed</h4>
        <p>100% genuine Indian distribution stock (HN/A) with official brand warranty, authentic GST tax invoice, and in-store activation support in Amritsar.</p>
      </div>
      <div class="card" style="border-top: 3px solid #0284C7;">
        <span class="badge" style="background: rgba(2, 132, 199, 0.12); color: #0369A1; border: 1px solid rgba(2, 132, 199, 0.28); margin-bottom: 10px;">Pillar 2</span>
        <h4>Pristine Unboxed</h4>
        <p>Direct unboxed units with 10-11 months official manufacturer warranty remaining, verified zero blemishes and 100% battery cycles.</p>
      </div>
      <div class="card" style="border-top: 3px solid #7C3AED;">
        <span class="badge" style="background: rgba(124, 58, 237, 0.12); color: #6D28D9; border: 1px solid rgba(124, 58, 237, 0.28); margin-bottom: 10px;">Pillar 3</span>
        <h4>40-Point Pre-Owned</h4>
        <p>Strict diagnostic inspection: never opened, all original components guaranteed, 94%+ genuine battery health, and 6-month Vishal Store warranty.</p>
      </div>
      <div class="card" style="border-top: 3px solid #059669;">
        <span class="badge badge-emerald" style="margin-bottom: 10px;">Pillar 4</span>
        <h4>Direct WhatsApp Funnel</h4>
        <p>Instant frictionless communication: every product specification and EMI estimate pre-fills directly into WhatsApp for high conversion rate.</p>
      </div>
    </div>

    <div class="card" style="background: #FFFFFF; border-color: rgba(184, 134, 11, 0.35); display: flex; align-items: center; justify-content: space-between; padding: 14px 20px;">
      <div>
        <p style="font-size: 13px; font-weight: 700; color: #111827;">Why this outperforms standard electronics shop websites:</p>
        <p style="font-size: 12px; color: #4B5563; margin-top: 2px;">Apple device buyers in Punjab seek authenticity verification, diagnostic transparency, and direct personal communication over impersonal checkouts.</p>
      </div>
      <div style="font-size: 20px; font-weight: 800; color: #B8860B; text-align: right;">
        100% Bespoke<br><span style="font-size: 11px; font-weight: 500; color: #6B7280;">Boutique Luxury Aesthetic</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>Vishal Apple Store · Market Positioning</span>
      <span>Slide 2 of 7</span>
    </div>
  </div>

  <!-- ==================== SLIDE 3: STOREFRONT HERO & THEMES ==================== -->
  <div class="slide">
    <div class="header-bar">
      <div>
        <h2 class="slide-title">The Public Storefront — Apple-Grade Light & Dark Themes</h2>
        <p class="slide-desc">Featuring authentic transparent titanium renders and an instant one-click responsive theme switcher.</p>
      </div>
      <span class="badge badge-gold">Design Mastery</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 8px 0;">
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 12px; font-weight: 700; color: #111827;">☀️ Apple-Grade Light Theme (Pristine Luxury)</span>
          <span style="font-size: 11px; color: #6B7280;">White & Soft Grays · High Contrast</span>
        </div>
        <div class="img-frame">
          <img src="${heroLight}" style="width: 100%; height: auto; display: block;" alt="Light Mode Hero" />
        </div>
      </div>
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 12px; font-weight: 700; color: #111827;">🌙 Signature Dark Theme (Executive Mood)</span>
          <span style="font-size: 11px; color: #6B7280;">Deep Charcoal · Warm Gold Halo</span>
        </div>
        <div class="img-frame">
          <img src="${heroDark}" style="width: 100%; height: auto; display: block;" alt="Dark Mode Hero" />
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 11.5px; color: #4B5563;">
      <div>✓ <b>Official Apple Stock Renders</b>: Transparent alpha renders look flawless against white and dark backgrounds alike.</div>
      <div>✓ <b>Original Brand Copy</b>: "Pure Performance. Unrivalled Craft. Curated in Amritsar."</div>
      <div>✓ <b>Persistent Preference</b>: Theme state saved in localStorage with zero-flash pre-hydration.</div>
    </div>

    <div class="footer-bar">
      <span>Vishal Apple Store · Public Storefront</span>
      <span>Slide 3 of 7</span>
    </div>
  </div>

  <!-- ==================== SLIDE 4: CATALOG & DIAGNOSTICS (LIGHT) ==================== -->
  <div class="slide">
    <div class="header-bar">
      <div>
        <h2 class="slide-title">Product Catalog & Verified Diagnostics (Light Theme)</h2>
        <p class="slide-desc">Providing transparent condition grades, Indian Rupee pricing, and multi-finish gallery exploration.</p>
      </div>
      <span class="badge badge-emerald">Trust Engine</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 8px 0;">
      <div>
        <div style="font-size: 12px; font-weight: 700; color: #111827; margin-bottom: 6px;">
          Hardware Category Navigation & Filter Suite (Light)
        </div>
        <div class="img-frame">
          <img src="${catalogLight}" style="width: 100%; height: auto; display: block;" alt="Catalog Filter Suite" />
        </div>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 700; color: #111827; margin-bottom: 6px;">
          iPhone 16 Pro Max Detail Page & 40-Point Grading Card (Light)
        </div>
        <div class="img-frame">
          <img src="${productLight}" style="width: 100%; height: auto; display: block;" alt="Product Detail & Grading" />
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 11.5px; color: #4B5563;">
      <div>✓ <b>Dynamic INR Pricing</b>: Live variant selectors update prices (₹1,44,900) and stock counts immediately.</div>
      <div>✓ <b>Store Diagnostic Report</b>: Battery capacity %, cosmetic grade, and included accessories transparently listed.</div>
      <div>✓ <b>Finish Angle Picker</b>: Tap between Natural, Black, Desert, and White Titanium renders.</div>
    </div>

    <div class="footer-bar">
      <span>Vishal Apple Store · Inventory Transparency</span>
      <span>Slide 4 of 7</span>
    </div>
  </div>

  <!-- ==================== SLIDE 5: COMPARE & FINANCIAL TOOLS (LIGHT) ==================== -->
  <div class="slide">
    <div class="header-bar">
      <div>
        <h2 class="slide-title">Hardware Comparison Matrix, EMI & Trade-In (Light Theme)</h2>
        <p class="slide-desc">Clear, high-converting interactive tools that eliminate customer friction before store visits.</p>
      </div>
      <span class="badge badge-gold">Conversion Tools</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 8px 0;">
      <div>
        <div style="font-size: 12px; font-weight: 700; color: #111827; margin-bottom: 6px;">
          Side-by-Side Spec Comparison Matrix (Light)
        </div>
        <div class="img-frame">
          <img src="${compareLight}" style="width: 100%; height: auto; display: block;" alt="Compare Specs Matrix" />
        </div>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 700; color: #111827; margin-bottom: 6px;">
          Interactive EMI & Trade-In Estimator (Light)
        </div>
        <div class="img-frame">
          <img src="${toolsLight}" style="width: 100%; height: auto; display: block;" alt="EMI & Trade-In Tools" />
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 11.5px; color: #4B5563;">
      <div>✓ <b>Compare 3 Devices</b>: Side-by-side analysis of chips, cameras, displays, and Indian Rupee prices.</div>
      <div>✓ <b>EMI Calculator</b>: Tenure slider (3 to 24 mos) with No-Cost EMI credit card options.</div>
      <div>✓ <b>Trade-In Valuator</b>: Instant valuation for older models with 1-click upgrade inquiry to WhatsApp.</div>
    </div>

    <div class="footer-bar">
      <span>Vishal Apple Store · Conversion Tools</span>
      <span>Slide 5 of 7</span>
    </div>
  </div>

  <!-- ==================== SLIDE 6: ADMIN PANEL (LIGHT) ==================== -->
  <div class="slide">
    <div class="header-bar">
      <div>
        <h2 class="slide-title">Store Owner Control Portal (/admin) — Light Edition</h2>
        <p class="slide-desc">Full control over pricing, stock, enquiries, and promotional banners with zero developer dependency.</p>
      </div>
      <span class="badge badge-emerald">Zero Developer Dependency</span>
    </div>

    <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 16px; margin: 8px 0; align-items: start;">
      <div class="img-frame">
        <img src="${adminLight}" style="width: 100%; height: auto; display: block;" alt="Admin Dashboard Light" />
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div class="card" style="padding: 12px;">
          <h4 style="color: #B8860B; font-size: 13px;">⚡ Inline Quick Edit Table</h4>
          <p style="font-size: 11.5px;">Update prices and toggle stock availability in seconds, with immediate reflection on the live storefront.</p>
        </div>
        <div class="card" style="padding: 12px;">
          <h4 style="color: #0284C7; font-size: 13px;">📥 Customer Enquiries Inbox</h4>
          <p style="font-size: 11.5px;">All general inquiries, trade-in submissions, and EMI requests collected with direct WhatsApp reply buttons.</p>
        </div>
        <div class="card" style="padding: 12px;">
          <h4 style="color: #059669; font-size: 13px;">🏷️ Offers & Review Approvals</h4>
          <p style="font-size: 11.5px;">Schedule festive offers, limited-stock flash deals, and approve verified Amritsar customer testimonials.</p>
        </div>
        <div class="card" style="padding: 12px;">
          <h4 style="color: #111827; font-size: 13px;">📍 Amritsar Store Settings</h4>
          <p style="font-size: 11.5px;">Manage opening hours, phone numbers, and Instagram handles in one simple configuration panel.</p>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Vishal Apple Store · Owner Empowerment</span>
      <span>Slide 6 of 7</span>
    </div>
  </div>

  <!-- ==================== SLIDE 7: MOBILE & SUMMARY (LIGHT) ==================== -->
  <div class="slide">
    <div class="header-bar">
      <div>
        <h2 class="slide-title">Mobile-First Excellence & Technical Specifications</h2>
        <p class="slide-desc">Optimized for Instagram traffic, local Google search, and seamless Amritsar footfall.</p>
      </div>
      <span class="badge badge-gold">Launch Ready</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1.6fr; gap: 20px; margin: 8px 0; align-items: center;">
      <div style="display: flex; justify-content: center;">
        <div class="img-frame" style="max-width: 210px; border-radius: 20px;">
          <img src="${mobileLight}" style="width: 100%; height: auto; display: block;" alt="Mobile Storefront Light" />
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div class="card" style="border-left: 3px solid #B8860B;">
          <h4>Sticky Mobile Conversion Dock</h4>
          <p>Over 75% of buyers browse from smartphones. The sticky bottom action dock provides 1-tap <b>Call Store</b>, <b>WhatsApp Consultation</b>, and <b>Quick Enquiry</b>.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          <div class="card" style="text-align: center; padding: 10px;">
            <p style="font-size: 22px; font-weight: 800; color: #059669;">95+</p>
            <p style="font-size: 10px; color: #6B7280;">Mobile Performance</p>
          </div>
          <div class="card" style="text-align: center; padding: 10px;">
            <p style="font-size: 22px; font-weight: 800; color: #B8860B;">100%</p>
            <p style="font-size: 10px; color: #6B7280;">SEO & Local JSON-LD</p>
          </div>
          <div class="card" style="text-align: center; padding: 10px;">
            <p style="font-size: 22px; font-weight: 800; color: #0284C7;">0ms</p>
            <p style="font-size: 10px; color: #6B7280;">Static Server Prerender</p>
          </div>
        </div>

        <div class="card" style="background: rgba(184, 134, 11, 0.05); border-color: rgba(184, 134, 11, 0.25);">
          <h4 style="color: #B8860B;">Flagship Store Details</h4>
          <p style="color: #374151; font-size: 11.5px;">
            <b>Address:</b> Shop No. 14, District Shopping Complex, B-Block, Ranjit Avenue, Amritsar - 143001<br>
            <b>Support Line:</b> +91 98765 43210 · <b>Live Demo:</b> http://localhost:3001<br>
            <b>GitHub Repository:</b> https://github.com/Divjot121/vishal-apple-store
          </p>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Vishal Apple Store · Flagship Retail Proposal</span>
      <span>Slide 7 of 7 · Light Theme Edition</span>
    </div>
  </div>

</body>
</html>
`;

async function generateLightPdf() {
  console.log('Generating light theme presentation PDF...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: pdfPath,
      printBackground: true,
      preferCSSPageSize: true,
    });
    console.log(`✓ Saved Light Theme PDF to: ${pdfPath}`);

    fs.copyFileSync(pdfPath, publicPdfPath);
    console.log(`✓ Copied to public/: ${publicPdfPath}`);

    fs.copyFileSync(pdfPath, brainPdfPath);
    console.log(`✓ Copied to brain/: ${brainPdfPath}`);
  } finally {
    await browser.close();
  }
}

generateLightPdf().catch((err) => {
  console.error('Light PDF Generation failed:', err);
  process.exit(1);
});
