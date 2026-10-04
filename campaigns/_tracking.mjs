// ═══════════════════════════════════════════════════════════════════════════
// Analytics / ad-platform IDs, shared by all campaign pages.
// Leave a value empty ('') to disable that vendor. Nothing loads until filled.
//
// RECOMMENDED: set only `gtmId` and configure Meta Pixel, GA4 and Google Ads tags
// inside Google Tag Manager using the dataLayer events documented in README.md.
// If you instead fill the direct IDs, do NOT also fire the same tags in GTM
// (they would double-count).
// ═══════════════════════════════════════════════════════════════════════════
export const tracking = {
  gtmId: '',                       // 'GTM-XXXXXXX'
  ga4Id: '',                       // 'G-XXXXXXXXXX'
  metaPixelId: '',                 // '123456789012345'
  googleAdsId: '',                 // 'AW-XXXXXXXXXX'
  googleAdsPaymentClickLabel: '',  // conversion label for "payment page click" (secondary conversion)
  googleAdsLeadLabel: '',          // conversion label for contact-mode donations (waqf WhatsApp click)

  // GA4 cross-domain measurement, needed only if this page is NOT hosted on bahjah.org.om
  crossDomains: ['bahjah.org.om'],

  // Oman PDPL (Royal Decree 6/2022): ask before loading ad/analytics cookies.
  requireConsent: true,

  attributionDays: 30,  // how long stored UTMs/click-IDs stay valid
  debug: false,         // true → log every event to the browser console
};
