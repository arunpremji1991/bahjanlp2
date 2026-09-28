# Bahjah campaign landing page

A reusable, mobile-first Arabic (RTL) landing page for paid campaigns (Meta and Google Ads) run by **جمعية بهجة العمانية للأيتام**. Each campaign is a single config file. The build produces a fast static page: no framework, no runtime rendering, and about 76 KB of HTML/CSS/JS (about 16 KB gzipped) plus roughly 200 KB of images.

```
campaigns/
  renovation.mjs        ← LIVE campaign: بناء وترميم منازل الأيتام (default page)
  hardship-relief.mjs   ← example: فك كربة
  kaffarat.mjs          ← example with official fixed amounts (15 / 1.5 / 45 OMR)
  _org.mjs              ← shared org facts (about, awards, contact, bank accounts)
  _tracking.mjs         ← GTM / GA4 / Meta Pixel / Google Ads IDs, consent
src/template.mjs        ← page template (all 9 sections)
src/styles.css, app.js  ← styles; UTM persistence, tracking, sticky CTA
assets/img/             ← optimised official images (WebP)
assets/official/        ← original official files + CREDITS.md
tracking/woocommerce-thankyou.php ← final-donation conversion snippet for bahjah.org.om
dist/                   ← build output (deploy this)
```

## Design (v2)

A "safe home" campaign design (warm paper, deep teal, Bahjah green; Readex Pro + IBM Plex Sans Arabic):
hero with an interactive **before/after slider** using Bahjah's real renovation photos (drag, tap, or arrow keys; thumbnails switch pairs), the work types supported, an impact gallery (`#impact`, the target of «اكتشف أثر مساهمتك»), why renovation is needed, how a donation reaches the home (the CV's visit → assess → execute method), documented work, the donation card with the OMR 1 = quantity helper, other ways to give, why Bahjah and its awards, FAQ, and a final CTA. Slider pairs are configured in `compare` in the campaign file.

**Image resolution:** the only official before/after photos are the six small side-by-side images in the CV PDF (each half ≈ 210×158 px), so they look soft at large sizes. Ask Bahjah for the original photos and drop them into `assets/img/compare/` with the same names.

## Build and preview

```bash
node build.mjs            # all campaigns → dist/<slug>/index.html (+ dist/index.html = renovation)
node build.mjs renovation # one campaign
node serve.mjs            # http://localhost:5173/renovation/
```

The build refuses a campaign whose payment URL is not `https://bahjah.org.om/…`, or whose progress bar is enabled without an official source, date and figures.

## Launch a new campaign

1. Copy `campaigns/renovation.mjs` to `campaigns/<slug>.mjs`.
2. Edit it: `seo`, `payment.url` (the official product page), `cta.primary` (campaign-specific, e.g. «ساهم الآن في …»), `hero`, `need`, `supports` (3–4 cards), `evidence`, `amount`, `faq`, `final`.
3. Put official images in `assets/img/` and add each one's source URL to `assets/credits.mjs`.
4. Run `node build.mjs <slug>` and deploy `dist/`.
5. Point the ad at `https://…/<slug>/?utm_source=…&utm_medium=paid&utm_campaign=…`.

**Content rule:** every sentence must come from an official Bahjah source (website, CV PDF, official posts or posters), and each config records where it came from. Do not add targets, donor counts, deadlines, urgency, or beneficiary stories unless Bahjah publishes them for that exact campaign.

### Progress bar
The progress bar is off by default (`hero.progress.enabled: false`). Turn it on only with a **current** official update, filling `target`, `raised`, `asOf` (e.g. «التحديث 4 – 1/10/2026") and `sourceUrl`.

### Amounts: read this before editing
Bahjah's WooCommerce store prints rials with **3 decimals and a comma decimal separator**, so:

| Product page shows | Means | Proof |
|---|---|---|
| `1,000 ر.ع.` | **OMR 1** per unit | Sponsorship shows `25,000 ر.ع.` while its description says "25 ريال شهرياً" |
| `1,500 ر.ع.` (كفارات) | OMR 1.5 per unit | Official text: fasting day = 1.5 OMR |

The donor sets the amount through the **quantity** field (quantity 20 = OMR 20). The page explains this and includes a small "how much do you want to give?" helper. `amount.unit` handles the conversion, and `amount.officialAmounts` shows chips (used only for kaffarat, where Bahjah publishes the amounts). Optionally, `payment.addToCart.enabled` pre-fills the quantity using WooCommerce's `?add-to-cart=<id>&quantity=<n>`. It is **disabled** until it has been tested on the live site.

## Tracking

Set IDs in `campaigns/_tracking.mjs`. The recommended setup is **GTM only**, with tags configured from these dataLayer events:

| dataLayer event | When | Meta (direct mode) | GA4 (direct mode) |
|---|---|---|---|
| `view_content` | page load | `ViewContent` | `view_item` |
| `cta_click` (`cta_location`: hero / amount / final / sticky / header) | any campaign CTA | `CTAClick` (custom) | `cta_click` |
| `payment_click` | click to the official payment page | `InitiateCheckout` | `begin_checkout` (+ optional Ads conversion) |
| `select_amount` | chip chosen / amount typed | – | `select_amount` |
| `contact_click`, `copy_bank_account` | WhatsApp / phone / SMS / app / bank copy | `Contact` | same name |
| `donation_complete` | **on bahjah.org.om** order-received page | `Purchase` | `purchase` (+ Ads conversion) |

Every event carries `campaign_slug`, `content_id`, `content_name`, `content_category`, and last-touch `utm_*`.

- **UTM persistence:** `utm_*`, `gclid`, `gbraid`, `wbraid`, `fbclid`, `ttclid` and `msclkid` are stored first-touch and last-touch in `localStorage` for 30 days (`bahjah_lp_attribution`) and appended to every payment link.
- **Final conversion:** the donation completes on bahjah.org.om, so install `tracking/woocommerce-thankyou.php` there (Code Snippets or WPCode). **Host the landing page on bahjah.org.om** (e.g. `/campaign/renovation/`) so the thank-you page can read the stored attribution. Add Meta Conversions API with the same `eventID` (`order_<id>`).
- **Consent:** `requireConsent: true` shows an Arabic consent bar, sets Google Consent Mode v2 to denied by default, and loads no ad or analytics scripts until the visitor accepts (Oman PDPL). Set it to `false` only if Bahjah's legal review says so.
- **Optimise ads for** `Purchase` / `donation_complete`. Use `InitiateCheckout` only while conversion volume is too low.

## Pre-launch checklist

- [ ] Open each `payment.url` on the **live** site: it loads, the description matches the ad, and checkout reaches SmartPay.
- [ ] Confirm the product still shows `1,000 ر.ع.` = OMR 1, and update `amount.unit` if the price format changed.
- [ ] For فك كربة, check which case the product page currently shows (see the comment in the config).
- [ ] Confirm the bank accounts and SMS 90021 are still valid (source: the March 2026 poster).
- [ ] Set the real `seo.canonical` URL, then fill the tracking IDs and test with Meta Pixel Helper and GA4 DebugView (`debug: true`).
- [ ] Install the thank-you snippet and place one test donation.
- [ ] Make sure the ad copy matches the page: no claims about the closed "10 homes" campaign or its figures.

## Source log (verified 28 Sep 2026)

bahjah.org.om refused connections during the build, so content was taken from Internet Archive captures of the official pages (Feb–Jun 2026) and the official CV PDF:

- **Payment URL:** the official poster's "موقع بهجة" QR code decodes to `/wp/product/بناء-و-ترميم/`.
- **"حملة ترميم 10 منازل أرامل وأيتام"** (poster, 18/3/2026, update 3: target 35,000; paid 28,812.5). The matching Jood listing shows it **closed on 30/3/2026**, so the page treats it as dated evidence and shows no figures.
- **Renovation programme** (CV §16): started after Cyclone Mekunu (2018), with a team visit, case recording, and quantity assessment before execution. Five houses were maintained in Mirbat on the Minister of Social Development's recommendation, and the work continues year-round.
- **About and awards:** bahjah.org.om home and «من نحن». **Payment methods:** «الأسئلة الشائعة» page.

Items to confirm with Bahjah:
- Sultan Qaboos Award listed as **2013**, before the 2014 founding date (kept as published).
- ISO is labelled «الايزو ٢٠٢٣م» on the website, while the poster shows "ISO 9001:2015". The page says «شهادة الأيزو – 2023».
