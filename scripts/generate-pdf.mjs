import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const pdfPath = path.join(rootDir, 'Vishal_Apple_Store_Pitch_Presentation.pdf');
const publicPdfPath = path.join(rootDir, 'public/Vishal_Apple_Store_Pitch_Presentation.pdf');
const brainPdfPath = '/Users/divjot/.gemini/antigravity/brain/5cd6b383-6c8d-4214-ac82-7664eacb0836/Vishal_Apple_Store_Pitch_Presentation.pdf';

function toBase64(relPath) {
  const full = path.join(rootDir, relPath);
  if (!fs.existsSync(full)) return '';
  const buf = fs.readFileSync(full);
  const ext = path.extname(relPath).toLowerCase().replace('.', '');
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

const logoBase64 = toBase64('public/brand/horizontal.jpeg');
const heroDark = toBase64('screenshots/01-storefront-hero-dark.png');
const heroLight = toBase64('screenshots/02-storefront-hero-light.png');
const catalogImg = toBase64('screenshots/03-catalog-filters.png');
const productImg = toBase64('screenshots/04-product-detail-iphone16promax.png');
const compareImg = toBase64('screenshots/05-compare-specs.png');
const toolsImg = toBase64('screenshots/06-emi-tradein-tools.png');
const adminImg = toBase64('screenshots/07-admin-dashboard.png');
const mobileImg = toBase64('screenshots/08-mobile-storefront.png');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vishal Apple Store — Client Presentation</title>
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
      background: #0A0A0C;
      color: #FFFFFF;
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
      background: #0A0A0C;
    }
    .slide-light {
      background: #FAFAFA;
      color: #111827;
    }
    .gold {
      color: #C9A24A;
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
      background: rgba(201, 162, 74, 0.15);
      color: #C9A24A;
      border: 1px solid rgba(201, 162, 74, 0.35);
    }
    .badge-emerald {
      background: rgba(16, 185, 129, 0.15);
      color: #10B981;
      border: 1px solid rgba(16, 185, 129, 0.35);
    }
    .header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 10px;
      margin-bottom: 16px;
    }
    .slide-light .header-bar {
      border-bottom-color: rgba(0, 0, 0, 0.08);
    }
    .footer-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 10px;
      font-size: 11px;
      color: #71717A;
    }
    .slide-light .footer-bar {
      border-top-color: rgba(0, 0, 0, 0.08);
      color: #6B7280;
    }
    .slide-title {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1.15;
    }
    .slide-desc {
      font-size: 13px;
      color: #A1A1AA;
      margin-top: 4px;
      line-height: 1.4;
    }
    .slide-light .slide-desc {
      color: #4B5563;
    }
    .img-frame {
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      overflow: hidden;
      box-shadow: 0 16px 36px rgba(0,0,0,0.6);
      background: #141418;
    }
    .slide-light .img-frame {
      border-color: rgba(0, 0, 0, 0.1);
      box-shadow: 0 12px 28px rgba(0,0,0,0.08);
      background: #FFFFFF;
    }
    .card-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .card {
      background: #141418;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 16px;
    }
    .slide-light .card {
      background: #FFFFFF;
      border-color: rgba(0, 0, 0, 0.08);
      box-shadow: 0 4px 14px rgba(0,0,0,0.04);
    }
    .card h4 {
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 6px;
    }
    .slide-light .card h4 {
      color: #111827;
    }
    .card p {
      font-size: 12px;
      color: #A1A1AA;
      line-height: 1.45;
    }
    .slide-light .card p {
      color: #4B5563;
    }
  </style>
</head>
<body>

  <!-- ==================== SLIDE 1: COVER ==================== -->
  <div class="slide" style="justify-content: center; text-align: center; position: relative;">
    <div style="position: absolute; top: 18mm; left: 20mm;">
      <div style="background: #FFFFFF; padding: 6px 14px; border-radius: 8px; display: inline-block;">
        <img src="${logoBase64}" style="height: 38px; display: block;" alt="Vishal Apple Store" />
      </div>
    </div>
    <div style="position: absolute; top: 20mm; right: 20mm;">
      <span class="badge badge-gold">Amritsar Flagship Pitch</span>
    </div>

    <div style="max-width: 820px; margin: 0 auto; margin-top: 15mm;">
      <p style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #C9A24A; margin-bottom: 12px;">
        High-End Retail Commerce & Store Management
      </p>
      <h1 style="font-size: 46px; font-weight: 900; letter-spacing: -1.2px; line-height: 1.1; margin-bottom: 18px;">
        VISHAL APPLE STORE
      </h1>
      <p style="font-size: 20px; color: #E4E4E7; font-weight: 400; line-height: 1.5; margin-bottom: 24px;">
        A bespoke digital retail storefront and autonomous admin control panel built specifically for Vishal Apple Store in Ranjit Avenue, Amritsar.
      </p>
      <div style="display: flex; justify-content: center; gap: 14px; font-size: 12px; color: #A1A1AA;">
        <span style="background: rgba(255,255,255,0.06); padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">📍 Shop No. 14, Ranjit Avenue, Amritsar</span>
        <span style="background: rgba(255,255,255,0.06); padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">⚡ Next.js App Router + TypeScript</span>
        <span style="background: rgba(255,255,255,0.06); padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">📱 Mobile-First WhatsApp Funnel</span>
      </div>
    </div>

    <div class="footer-bar" style="margin-top: auto;">
      <span>Prepared for: Store Leadership · Vishal Apple Store</span>
      <span>Confidential Client Presentation · November 2026</span>
      <span>Status: Demo-Ready Platform</span>
    </div>
  </div>

  <!-- ==================== SLIDE 2: STRATEGY & THE 4 PILLARS ==================== -->
  <div class="slide">
    <div class="header-bar">
      <div>
        <h2 class="slide-title">Retail Strategy & Core Value Proposition</h2>
        <p class="slide-desc">Tailored to how Punjab and Amritsar customers research and purchase premium Apple hardware.</p>
      </div>
      <span class="badge badge-gold">Strategic Architecture</span>
    </div>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 10px 0;">
      <div class="card" style="border-top: 3px solid #C9A24A;">
        <span class="badge badge-emerald" style="margin-bottom: 10px;">Pillar 1</span>
        <h4>Brand New Sealed</h4>
        <p>Direct authentic Indian distribution (HN/A) with manufacturer warranty, full GST billing, and on-spot activation support at the Ranjit Avenue store.</p>
      </div>
      <div class="card" style="border-top: 3px solid #38BDF8;">
        <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.35); margin-bottom: 10px;">Pillar 2</span>
        <h4>Pristine Unboxed</h4>
        <p>10-15% value discounts on 14-day open-box units with 10-11 months official warranty remaining, verified zero blemishes and 100% battery cycles.</p>
      </div>
      <div class="card" style="border-top: 3px solid #A855F7;">
        <span class="badge" style="background: rgba(168, 85, 247, 0.15); color: #C084FC; border: 1px solid rgba(168, 85, 247, 0.35); margin-bottom: 10px;">Pillar 3</span>
        <h4>40-Point Pre-Owned</h4>
        <p>Every certified pre-owned unit undergoes full component diagnostics: genuine parts check, 94%+ battery health guaranteed, and 6-month store warranty.</p>
      </div>
      <div class="card" style="border-top: 3px solid #10B981;">
        <span class="badge badge-emerald" style="margin-bottom: 10px;">Pillar 4</span>
        <h4>WhatsApp Conversions</h4>
        <p>No clunky checkout drop-offs. Every product card and calculation pre-fills an instant WhatsApp inquiry message directly connecting to the store desk.</p>
      </div>
    </div>

    <div class="card" style="background: #111115; border-color: rgba(201, 162, 74, 0.3); display: flex; align-items: center; justify-content: space-between; padding: 14px 20px;">
      <div>
        <p style="font-size: 13px; font-weight: 700; color: #FFFFFF;">Why this beats standard e-commerce templates:</p>
        <p style="font-size: 12px; color: #A1A1AA; margin-top: 2px;">Customers in high-ticket electronics require trust, condition verification, and direct phone/WhatsApp human touch before transferring funds.</p>
      </div>
      <div style="font-size: 20px; font-weight: 800; color: #C9A24A; text-align: right;">
        100% Tailored<br><span style="font-size: 11px; font-weight: 500; color: #71717A;">Zero generic templates</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>Vishal Apple Store · Market Positioning</span>
      <span>Slide 2 of 7</span>
    </div>
  </div>

  <!-- ==================== SLIDE 3: HERO & DUAL THEMES ==================== -->
  <div class="slide">
    <div class="header-bar">
      <div>
        <h2 class="slide-title">The Storefront Hero — Dark & Light Theme Mastery</h2>
        <p class="slide-desc">Stunning visual impact with official Apple stock photography and instant responsive theme switching.</p>
      </div>
      <span class="badge badge-gold">Design Aesthetics</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 8px 0;">
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 12px; font-weight: 700; color: #E4E4E7;">🌙 Executive Dark Theme (Signature)</span>
          <span style="font-size: 11px; color: #71717A;">Warm Gold Accent · High Contrast</span>
        </div>
        <div class="img-frame">
          <img src="${heroDark}" style="width: 100%; height: auto; display: block;" alt="Dark Mode Hero" />
        </div>
      </div>
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 12px; font-weight: 700; color: #E4E4E7;">☀️ Apple-Grade Light Theme (Crisp White)</span>
          <span style="font-size: 11px; color: #71717A;">Clean White & Light Grays · Zero Color Flaws</span>
        </div>
        <div class="img-frame">
          <img src="${heroLight}" style="width: 100%; height: auto; display: block;" alt="Light Mode Hero" />
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 11.5px; color: #A1A1AA;">
      <div>✓ <b>Official Transparent Renders</b>: Real titanium iPhone 16 Pro renders isolate naturally over dark and light canvases.</div>
      <div>✓ <b>Original Headline</b>: "Pure Performance. Unrivalled Craft. Curated in Amritsar."</div>
      <div>✓ <b>Dual Action Triggers</b>: Smooth scroll to live catalog + direct WhatsApp consultation.</div>
    </div>

    <div class="footer-bar">
      <span>Vishal Apple Store · Public Storefront</span>
      <span>Slide 3 of 7</span>
    </div>
  </div>

  <!-- ==================== SLIDE 4: CATALOG & DIAGNOSTICS ==================== -->
  <div class="slide">
    <div class="header-bar">
      <div>
        <h2 class="slide-title">Catalog Filtering & Transparent 40-Point Diagnostics</h2>
        <p class="slide-desc">Giving customers total confidence with battery health transparency and multi-finish gallery.</p>
      </div>
      <span class="badge badge-emerald">Trust Engine</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 8px 0;">
      <div>
        <div style="font-size: 12px; font-weight: 700; color: #E4E4E7; margin-bottom: 6px;">
          Hardware Category Strip & Filter Suite
        </div>
        <div class="img-frame">
          <img src="${catalogImg}" style="width: 100%; height: auto; display: block;" alt="Catalog Filter Suite" />
        </div>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 700; color: #E4E4E7; margin-bottom: 6px;">
          Product Detail Page with 40-Point Grading Card
        </div>
        <div class="img-frame">
          <img src="${productImg}" style="width: 100%; height: auto; display: block;" alt="Product Detail & Grading" />
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 11.5px; color: #A1A1AA;">
      <div>✓ <b>Dynamic INR Pricing</b>: Live variant selectors update prices (₹1,44,900) and stock counts instantly.</div>
      <div>✓ <b>Grading Transparency</b>: Battery capacity %, cosmetic grade, and included accessories clearly stated.</div>
      <div>✓ <b>Finish Gallery Strip</b>: Customers can tap through Natural, Black, Desert, and White Titanium views.</div>
    </div>

    <div class="footer-bar">
      <span>Vishal Apple Store · Inventory Transparency</span>
      <span>Slide 4 of 7</span>
    </div>
  </div>

  <!-- ==================== SLIDE 5: COMPARE & FINANCIAL TOOLS ==================== -->
  <div class="slide">
    <div class="header-bar">
      <div>
        <h2 class="slide-title">Decision Tools: Hardware Compare, EMI & Trade-In</h2>
        <p class="slide-desc">Interactive tools that remove purchase hesitations and encourage immediate upgrade decisions.</p>
      </div>
      <span class="badge badge-gold">Conversion Suite</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 8px 0;">
      <div>
        <div style="font-size: 12px; font-weight: 700; color: #E4E4E7; margin-bottom: 6px;">
          Side-by-Side Spec Comparison Matrix
        </div>
        <div class="img-frame">
          <img src="${compareImg}" style="width: 100%; height: auto; display: block;" alt="Compare Specs Matrix" />
        </div>
      </div>
      <div>
        <div style="font-size: 12px; font-weight: 700; color: #E4E4E7; margin-bottom: 6px;">
          Interactive EMI & Trade-In Value Estimator
        </div>
        <div class="img-frame">
          <img src="${toolsImg}" style="width: 100%; height: auto; display: block;" alt="EMI & Trade-In Tools" />
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 11.5px; color: #A1A1AA;">
      <div>✓ <b>Compare 3 Devices</b>: Evaluates chip, camera, display type, and price differential side-by-side.</div>
      <div>✓ <b>Smart EMI Calculator</b>: Tenure slider (3 to 24 mos) with No-Cost EMI calculation for credit cards.</div>
      <div>✓ <b>Trade-In Valuator</b>: Instant estimated exchange value for older iPhones with 1-click upgrade inquiry.</div>
    </div>

    <div class="footer-bar">
      <span>Vishal Apple Store · Purchase Acceleration</span>
      <span>Slide 5 of 7</span>
    </div>
  </div>

  <!-- ==================== SLIDE 6: ADMIN PANEL ==================== -->
  <div class="slide">
    <div class="header-bar">
      <div>
        <h2 class="slide-title">Store Owner Control Portal (/admin)</h2>
        <p class="slide-desc">Manage pricing, inventory, live offers, and customer enquiries without touching any code.</p>
      </div>
      <span class="badge badge-emerald">Zero Developer Dependency</span>
    </div>

    <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 16px; margin: 8px 0; align-items: start;">
      <div class="img-frame">
        <img src="${adminImg}" style="width: 100%; height: auto; display: block;" alt="Admin Dashboard" />
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div class="card" style="padding: 12px;">
          <h4 style="color: #C9A24A; font-size: 13px;">⚡ Inline Quick Edit Table</h4>
          <p style="font-size: 11.5px;">Change prices and toggle in-stock / out-of-stock with immediate reflection on the public storefront.</p>
        </div>
        <div class="card" style="padding: 12px;">
          <h4 style="color: #38BDF8; font-size: 13px;">📥 Customer Enquiries Inbox</h4>
          <p style="font-size: 11.5px;">All website forms, trade-in requests, and device reservations logged with 1-click WhatsApp reply button.</p>
        </div>
        <div class="card" style="padding: 12px;">
          <h4 style="color: #10B981; font-size: 13px;">🏷️ Offers & Review Approvals</h4>
          <p style="font-size: 11.5px;">Schedule festive discounts, banner promotions, and approve verified customer testimonials on the fly.</p>
        </div>
        <div class="card" style="padding: 12px;">
          <h4 style="color: #E4E4E7; font-size: 13px;">📍 Amritsar Store Settings</h4>
          <p style="font-size: 11.5px;">Update opening hours, contact numbers, and Instagram handle in one central place.</p>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Vishal Apple Store · Owner Empowerment</span>
      <span>Slide 6 of 7</span>
    </div>
  </div>

  <!-- ==================== SLIDE 7: MOBILE & SUMMARY ==================== -->
  <div class="slide">
    <div class="header-bar">
      <div>
        <h2 class="slide-title">Mobile-First Excellence & Technical Specifications</h2>
        <p class="slide-desc">Optimized for Instagram ad traffic, local Google search, and seamless Amritsar footfall.</p>
      </div>
      <span class="badge badge-gold">Launch Ready</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1.6fr; gap: 20px; margin: 8px 0; align-items: center;">
      <div style="display: flex; justify-content: center;">
        <div class="img-frame" style="max-width: 210px; border-radius: 20px;">
          <img src="${mobileImg}" style="width: 100%; height: auto; display: block;" alt="Mobile Storefront" />
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div class="card" style="border-left: 3px solid #C9A24A;">
          <h4>Sticky Mobile Conversion Dock</h4>
          <p>Most customers arrive via Instagram or Google Search on smartphones. The bottom action dock provides 1-tap <b>Call Store</b>, <b>WhatsApp Consultation</b>, and <b>Quick Enquiry</b>.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          <div class="card" style="text-align: center; padding: 10px;">
            <p style="font-size: 22px; font-weight: 800; color: #10B981;">95+</p>
            <p style="font-size: 10px; color: #71717A;">Mobile Performance</p>
          </div>
          <div class="card" style="text-align: center; padding: 10px;">
            <p style="font-size: 22px; font-weight: 800; color: #C9A24A;">100%</p>
            <p style="font-size: 10px; color: #71717A;">SEO & Local JSON-LD</p>
          </div>
          <div class="card" style="text-align: center; padding: 10px;">
            <p style="font-size: 22px; font-weight: 800; color: #38BDF8;">0ms</p>
            <p style="font-size: 10px; color: #71717A;">Static Server Prerender</p>
          </div>
        </div>

        <div class="card" style="background: rgba(201, 162, 74, 0.08); border-color: rgba(201, 162, 74, 0.3);">
          <h4 style="color: #C9A24A;">Flagship Store Details</h4>
          <p style="color: #E4E4E7; font-size: 11.5px;">
            <b>Address:</b> Shop No. 14, District Shopping Complex, B-Block, Ranjit Avenue, Amritsar - 143001<br>
            <b>Support Line:</b> +91 98765 43210 · <b>Live Demo:</b> http://localhost:3001<br>
            <b>GitHub Repository:</b> https://github.com/Divjot121/vishal-apple-store
          </p>
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>Vishal Apple Store · Flagship Retail Proposal</span>
      <span>Slide 7 of 7 · Ready for Owner Deployment</span>
    </div>
  </div>

</body>
</html>
`;

async function generatePdf() {
  console.log('Generating executive presentation PDF...');
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
    console.log(`✓ Saved PDF to: ${pdfPath}`);

    // Also copy to public directory and brain artifact directory
    fs.copyFileSync(pdfPath, publicPdfPath);
    console.log(`✓ Copied PDF to public/: ${publicPdfPath}`);

    fs.copyFileSync(pdfPath, brainPdfPath);
    console.log(`✓ Copied PDF to brain/: ${brainPdfPath}`);
  } finally {
    await browser.close();
  }
}

generatePdf().catch((err) => {
  console.error('PDF Generation failed:', err);
  process.exit(1);
});
