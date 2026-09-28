// Image credits: every image on the page is an official Bahjah asset.
// Key = local optimised file; value = original official source.
// Rendered on each <img> as data-source="…". Mirrored in assets/official/CREDITS.md.
const U = 'https://bahjah.org.om/wp/wp-content/uploads';
const CV = `${U}/2025/08/CV-Print-Proof.pdf`;

export const credits = {
  'assets/img/logo-96.webp': `${U}/2025/08/Bahjah.png`,
  'assets/img/logo-192.webp': `${U}/2025/08/Bahjah.png`,
  ...Object.fromEntries(
    [1, 2, 3, 4, 5, 6].map((n) => [`assets/img/before-after-${n}-427.webp`, `${CV}#page=17 (قسم الصيانة والترميم)`])
  ),
  ...Object.fromEntries(
    [1, 2, 3, 4, 5, 6].flatMap((n) =>
      ['before', 'after'].flatMap((k) =>
        [320, 640].map((w) => [`assets/img/compare/${n}-${k}-${w}.webp`, `${CV}#page=17 (قسم الصيانة والترميم – ${k === 'before' ? 'قبل' : 'بعد'})`])
      )
    )
  ),
  'assets/img/houses-maintenance-300.webp': `${U}/2026/02/c34.jpg`,
  'assets/img/residential-complex-218.webp': `${U}/2026/02/Screenshot-2026-02-08-at-12.37.55-AM.png`,
  'assets/img/charity-buildings-240.webp': `${U}/2026/02/v45we.jpg`,
  'assets/img/charity-buildings-480.webp': `${U}/2026/02/v45we.jpg`,
  'assets/img/aid-department-240.webp': `${U}/2026/02/Gr4444oup-2-1024x990.png`,
  'assets/img/aid-department-480.webp': `${U}/2026/02/Gr4444oup-2-1024x990.png`,
  'assets/img/award-sultan-qaboos-160.webp': `${U}/2025/08/جائزه_السلطان_قابوس_للعمل_التطوعي-1-1024x1024.png`,
  'assets/img/award-sanabel-160.webp': `${U}/2025/08/7b28eb1a-cb41-4428-8a4e-1f8cb5dd54b4.png`,
  'assets/img/award-ohrc-160.webp': `${U}/2025/08/ohrclogo.png`,
  'assets/img/award-oq-160.webp': `${U}/2025/08/OQ-Logo.png`,
  'assets/img/award-bahrain-160.webp': `${U}/2025/08/Screenshot-2025-08-27-at-6.24.15-PM.png`,
  'assets/img/award-kuwait-160.webp': `${U}/2025/08/c18dccd0a3dc546592ee909b93f8f3bb.png`,
  'assets/img/hardship-626.webp': `${U}/2025/08/فك-كربة.jpeg`,
  'assets/img/og-renovation.jpg': `${CV}#page=17 + ${U}/2025/08/Bahjah.png (composited)`,
};
