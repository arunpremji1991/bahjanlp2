# Image credits and sources

Every image on the landing pages is an **official asset of جمعية بهجة العمانية للأيتام (Omani Bahjah Orphan Society)**. No stock, AI-generated, or third-party imagery is used.

Originals are kept in `assets/official/src/`. Optimised WebP versions live in `assets/img/`. Each `<img>` on the page carries a `data-source="…"` attribute with the original URL (from `assets/credits.mjs`).

Retrieved 28 Sep 2026 from Internet Archive captures of bahjah.org.om (Feb–Jun 2026) because the live server was refusing connections at build time.

| Local file | Original official source | Used on |
|---|---|---|
| `logo-96/192.webp` | `bahjah.org.om/wp/wp-content/uploads/2025/08/Bahjah.png` | header, all pages |
| `compare/<n>-before/after-320/640.webp` | Same six official photos (CV p.17), each split at its divider into the «قبل» and «بعد» halves, bottom label strip cropped, resized with Lanczos + light sharpening. **No AI enhancement or content changes.** | before/after sliders (hero + gallery) |
| `before-after-1…6-427.webp` | Official profile PDF `…/2025/08/CV-Print-Proof.pdf`, page 17 (§16 Maintenance and Restoration, "قبل/بعد" photos) | renovation hero + gallery |
| `houses-maintenance-300.webp` | `…/2026/02/c34.jpg` (logo of the "ترميم وصيانة المنازل" project, projects page) | renovation evidence |
| `residential-complex-218.webp` | `…/2026/02/Screenshot-2026-02-08-at-12.37.55-AM.png` (مجمع بهجة السكني) | renovation evidence |
| `charity-buildings-240/480.webp` | `…/2026/02/v45we.jpg` (إدارة المباني الخيرية) | renovation evidence |
| `aid-department-240/480.webp` | `…/2026/02/Gr4444oup-2-1024x990.png` (قسم المساعدات) | hardship-relief evidence |
| `hardship-626.webp` | `…/2025/08/فك-كربة.jpeg` (official image of the فك كربة donation product) | hardship-relief hero |
| `award-*.webp` | Homepage section "شهادات وجوائز حصلت عليها الجمعية": `…/2025/08/جائزه_السلطان_قابوس_للعمل_التطوعي-1-1024x1024.png`, `7b28eb1a-….png`, `ohrclogo.png`, `OQ-Logo.png`, `Screenshot-2025-08-27-at-6.24.15-PM.png`, `c18dccd0a3dc546592ee909b93f8f3bb.png` | "Why Bahjah" |
| `award-iso-160.webp` | `…/2025/08/what-is-iso-9001-compliance.webp` (homepage awards) | all pages |
| `waqf/seedling-254/508.webp` | `…/2025/08/waqf-home-bg-1.png`, the image of the homepage's «ابهج العالم بعطائك – صدقة جارية» block | waqf hero |
| `waqf/charity-buildings`, `waqf-complex`, `industrial`, `agri`, `hall` | Project logos from bahjah.org.om projects section (`…/2026/02/v45we.jpg`, `Screenshot-2026-02-08-at-12.37.55-AM.png`, `Geeeeeeeeeeeee-3-1024x972.png`, `ny65r5.jpg`, `v45e3.jpg`) | waqf projects |
| `waqf/sadaqa-640/1024.webp` | `…/2025/08/الصدقة.jpeg`, the official image of the «صدقة» donation product | waqf final CTA background |
| `og-waqf.jpg` | Composite of the seedling image + logo (both above) | waqf social share image |
| `og-renovation.jpg` | Composite of before/after photo #5 + logo (both above) | social share image |
| `campaign-10-homes.jpeg` (src only, **not shown on the page**) | `…/2026/03/IMG_0515.jpeg`, official poster "حملة ترميم 10 منازل أرامل وأيتام – تحديث 3 – 18/3/2026" | Reference: campaign wording, donation channels, and the QR code confirming the payment URL |

**Not retrieved** (archive unavailable): the ISO badge (`what-is-iso-9001-compliance.webp`, shown as an icon instead), the بناء وترميم product photo (`WhatsApp-Image-2026-02-06-at-10.32.07-AM.jpeg`), the كفارات product image, and the bank-accounts banner. When bahjah.org.om is back online, add them to `assets/official/src/`, export WebP versions to `assets/img/`, and reference them in the campaign config.

The before/after photos show buildings only, with no identifiable beneficiaries.
