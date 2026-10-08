import { readFileSync } from 'node:fs';
// Shared building blocks for every landing-page template: escaping, icons,
// UI strings (ar/en), page context, JSON-LD and the page shell (head, header
// with language switch, footer, sticky CTA, consent banner).

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const icons = {
  roof: '<path d="M2.5 12 12 4l9.5 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  wall: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9.3h18M3 14.7h18M9 4v5.3M15 9.3v5.4M9 14.7V20"/><path d="m14.5 4-1.8 3.2 2.2 2.4-1.6 3.3"/>',
  kitchen: '<path d="M7 3v5a2 2 0 0 0 4 0V3M9 8v13"/><path d="M17 21V3c-2 1.5-3 4-3 7v3h3"/>',
  bath: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M6 12V6a2 2 0 0 1 3.5-1.3"/><path d="M7 19l-1 2M17 19l1 2"/>',
  tools: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.5 17.3a1.8 1.8 0 0 0 2.6 2.6l5.8-5.8a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.2-.6-.6-2.2z"/>',
  home: '<path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M12 11.2c-1-1.4-3.4-.8-3.4 1.1 0 1.7 2.2 3 3.4 3.9 1.2-.9 3.4-2.2 3.4-3.9 0-1.9-2.4-2.5-3.4-1.1z"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  arrow: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  bank: '<path d="M3 10h18L12 4zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  sms: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>',
  app: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h9"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
  handle: '<path d="m9 7-5 5 5 5M15 7l5 5-5 5"/>',
  hand: '<path d="M4 14h3l4 2h4a2 2 0 0 0 0-4h-3"/><path d="M7 14v6M7 20h8l6-4a2 2 0 0 0-2.4-3.2L15 15"/><path d="M14 8.5c0-1.4 1.1-2.5 2.5-2.5S19 7.1 19 8.5c0 2-2.5 3.5-2.5 3.5S14 10.5 14 8.5z"/>',
  building: '<path d="M4 21V5l8-2v18M12 8l8 2v11M3 21h18"/><path d="M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
  seed: '<path d="M12 21v-9"/><path d="M12 12C12 8 9 5 4 5c0 4 3 7 8 7zM12 14c0-3.5 2.5-6 7-6 0 3.5-2.5 6-7 6z"/>',
  family: '<circle cx="8" cy="6" r="2.5"/><circle cx="16.5" cy="8.5" r="2"/><path d="M3.5 20v-3.5A4.5 4.5 0 0 1 8 12a4.5 4.5 0 0 1 4.5 4.5V20M13 20v-2.5a3.5 3.5 0 0 1 7 0V20"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
  whatsapp: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-1.9-1-1 .8a3.5 3.5 0 0 1-2.2-2.2l.8-1-1-1.9z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
  quote: '<path fill="currentColor" stroke="none" d="M9.6 6C6.5 6.3 4 9 4 12.3V18h6.2v-6.2H7.1c0-2.2 1.2-3.6 2.9-3.9zM19.6 6c-3.1.3-5.6 3-5.6 6.3V18h6.2v-6.2h-3.1c0-2.2 1.2-3.6 2.9-3.9z"/>',
};
export const icon = (name, cls = 'ico') =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[name] || ''}</svg>`;


// ── UI strings (page content itself lives in the campaign configs) ─────────
export const STR = {
  ar: {
    skip: 'تخطَّ إلى المحتوى', logo: 'شعار ', before: 'قبل', after: 'بعد',
    beforeAlt: 'قبل الترميم: ', afterAlt: 'بعد الترميم: ', compare: 'مقارنة قبل وبعد: ',
    heroCapSrc: 'من أعمال الجمعية الموثقة', thumbs: 'اختر صورة للمقارنة',
    progress: 'تقدم الحملة', of: 'من', per: 'حسب', officialAnn: 'الإعلان الرسمي للجمعية',
    cur: 'ر.ع.', chooseAmount: 'اختر مبلغًا', qtyOnPay: 'الكمية في صفحة الدفع: ',
    calcLabel: 'كم تريد أن تساهم؟', calcHint: 'اكتب المبلغ لتعرف ماذا تُدخل في خانة «الكمية».',
    calcOut: 'اكتب <strong>{n}</strong> في خانة «الكمية» بصفحة الدفع = تبرع بـ <strong>{v} ر.ع.</strong>',
    unitOne: 'ريال عماني واحد',
    unitTxt: 'تعرض صفحة الدفع الرسمية الريال بثلاث خانات عشرية (1,000 بيسة). ',
    unitTxt1: 'اكتب مبلغ مساهمتك بالريال في خانة <strong>«الكمية»</strong>.',
    unitTxtN: (v) => `كل وحدة تساوي ${v} ر.ع.، فحدّد عدد الوحدات في خانة <strong>«الكمية»</strong>.`,
    kSupports: 'الأعمال التي تدعمها', kImpact: 'اكتشف أثر مساهمتك', kNeed: 'لماذا الترميم؟',
    kProcess: 'من مساهمتك إلى المنزل', kEvidence: 'سجلّ موثّق', kGive: 'طريقة المساهمة',
    kOther: 'طرق أخرى', kWhy: 'لماذا بهجة؟', kFaq: 'أسئلة شائعة',
    more: (n) => `عرض ${n} صور أخرى`, viewProfile: 'عرض الملف التعريفي', source: 'المصدر: ',
    evSource: 'المصدر على موقع الجمعية', evSourceArchived: 'المصدر (نسخة مؤرشفة من موقع الجمعية)',
    step1: (cta) => `اضغط «${cta}».`,
    step2: (label, unit) => `في صفحة «${label}» الرسمية، ${unit ? 'اكتب المبلغ في خانة «الكمية»' : 'حدّد المبلغ'} ثم اضغط «تبرع الآن».`,
    step3: 'أكمل الدفع بالبطاقة عبر بوابة بنك مسقط SmartPay.',
    secureTail: '، والدفع ببطاقات الائتمان والخصم عبر بوابة بنك مسقط SmartPay.',
    otherTitle: 'طرق أخرى للتبرع', bank: 'التحويل البنكي', copy: 'نسخ', copied: 'تم النسخ', copyAria: 'نسخ رقم حساب ',
    accName: 'الحسابات باسم: ', sms: 'رسالة نصية',
    smsText: (s) => `أرسل كلمة <strong>«${s.keyword}»</strong> إلى الرقم المجاني <strong dir="ltr">${s.number}</strong> للتبرع بـ${s.value} للأيتام (${s.operators}).`,
    smsBtn: 'إرسال الرسالة', app: 'تطبيق بهجة', appText: 'حمّل تطبيق الجمعية للتبرع والمتابعة.',
    whyTitle: 'جهة موثوقة ترعى الأيتام منذ 2014', fact1: 'جمعية خيرية غير حكومية', fact2: 'تأسست في 10 فبراير 2014', fact3: 'رؤيتنا',
    awardsTitle: 'شهادات وجوائز حصلت عليها الجمعية', yearSfx: 'م', awardsSrc: 'كما وردت في موقع الجمعية الرسمي.',
    faqTitle: 'كل ما تحتاج معرفته', whatsapp: 'واتساب', email: 'البريد الإلكتروني',
    official: 'الموقع الرسمي', allDon: 'كل أبواب التبرع',
    consentAria: 'ملفات تعريف الارتباط', consent: 'نستخدم ملفات تعريف الارتباط لقياس أداء حملاتنا الإعلانية وتحسينها.',
    accept: 'موافق', decline: 'رفض',
    langLabel: 'English', langShort: 'EN', langAria: 'Switch to English', langCode: 'en',
    whatsappAria: 'تواصل عبر واتساب', navAria: 'أقسام الصفحة', officialSite: 'الموقع الرسمي', privacy: 'سياسة الخصوصية', sourcesTitle: 'مصادر المحتوى والصور', faqKicker: 'الأسئلة الشائعة',
    city: 'صلالة', region: 'ظفار', locale: 'ar_OM',
  },
  en: {
    skip: 'Skip to content', logo: 'Logo of ', before: 'Before', after: 'After',
    beforeAlt: 'Before renovation: ', afterAlt: 'After renovation: ', compare: 'Before/after comparison: ',
    heroCapSrc: "From Bahjah's documented work", thumbs: 'Choose a photo to compare',
    progress: 'Campaign progress', of: 'of', per: 'According to', officialAnn: "Bahjah's official announcement",
    cur: 'OMR', chooseAmount: 'Choose an amount', qtyOnPay: 'Quantity on the payment page: ',
    calcLabel: 'How much would you like to give?', calcHint: 'Type an amount to see what to enter in the “الكمية” (Quantity) field.',
    calcOut: 'Enter <strong>{n}</strong> in the “الكمية” (Quantity) field on the payment page = a gift of <strong>{v} OMR</strong>',
    unitOne: 'One Omani rial',
    unitTxt: 'The official payment page (in Arabic) shows rials with three decimal places (1,000 baisa). ',
    unitTxt1: 'Type your gift in rials in the <strong>“الكمية” (Quantity)</strong> field.',
    unitTxtN: (v) => `Each unit is ${v} OMR, so enter the number of units in the <strong>“الكمية” (Quantity)</strong> field.`,
    kSupports: 'The work you support', kImpact: 'See the impact', kNeed: 'Why renovation?',
    kProcess: 'From your gift to the home', kEvidence: 'Documented record', kGive: 'How to give',
    kOther: 'More options', kWhy: 'Why Bahjah?', kFaq: 'FAQ',
    more: (n) => `Show ${n} more photos`, viewProfile: 'View the profile', source: 'Source: ',
    evSource: "Source on Bahjah's website", evSourceArchived: "Source (archived copy of Bahjah's website)",
    step1: (cta) => `Tap “${cta}”.`,
    step2: (label, unit, labelAr) => `On the official “${labelAr || label}” (${label}) page, ${unit ? 'enter your amount in the “الكمية” (Quantity) field' : 'choose the amount'}, then tap “تبرع الان” (Donate now).`,
    step3: 'Complete payment by card through the Bank Muscat SmartPay gateway.',
    secureTail: ' Credit and debit card payments go through the Bank Muscat SmartPay gateway.',
    otherTitle: 'Other ways to donate', bank: 'Bank transfer', copy: 'Copy', copied: 'Copied', copyAria: 'Copy account number: ',
    accName: 'Account name: ', sms: 'Text message',
    smsText: (s) => `Text the word <strong>“${s.keyword}”</strong> to the toll-free number <strong dir="ltr">${s.number}</strong> to donate ${s.value} to orphans (${s.operators}).`,
    smsBtn: 'Send the text', app: 'Bahjah app', appText: "Download Bahjah's app to donate and follow its work.",
    whyTitle: 'A trusted orphan-care society since 2014', fact1: 'Non-governmental charity', fact2: 'Founded 10 February 2014', fact3: 'Our vision',
    awardsTitle: 'Certificates and awards received by Bahjah', yearSfx: '', awardsSrc: "As listed on Bahjah's official website.",
    faqTitle: 'Everything you need to know', whatsapp: 'WhatsApp', email: 'Email',
    official: 'Official website', allDon: 'All donation options',
    consentAria: 'Cookies', consent: 'We use cookies to measure and improve our advertising campaigns.',
    accept: 'Accept', decline: 'Decline',
    langLabel: 'العربية', langShort: 'عربي', langAria: 'التبديل إلى العربية', langCode: 'ar',
    whatsappAria: 'Contact us on WhatsApp', navAria: 'Page sections', officialSite: 'Official website (Arabic)', privacy: 'Privacy policy', sourcesTitle: 'Content and image sources', faqKicker: 'FAQ',
    city: 'Salalah', region: 'Dhofar', locale: 'en_US',
  },
};


// ── Per-page context ──────────────────────────────────────────────────────
export function pageContext(c, credits, base = '', opts = {}) {
  const lang = c.lang || 'ar';
  const o = c.org;
  const ctx = {
    lang,
    t: STR[lang],
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    orgName: lang === 'ar' ? o.nameAr : o.nameEn,
    alt: opts.alt, // { href, abs } of the other-language page
    o,
    a: (p) => base + p,
    src: (p) => (credits[p] ? ` data-source="${esc(credits[p])}"` : ''),
    fillOrg: (s) =>
      s
        .replace('{org.phones}', o.contact.phones.join(' – '))
        .replace('{org.whatsapp}', o.contact.whatsapp.replace(/^968/, ''))
        .replace('{org.email}', o.contact.email)
        .replace('{org.address}', o.contact.addressAr),
  };
  return ctx;
}

export function baseLd(c, ctx) {
  const { o, t, a, fillOrg } = ctx;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'NGO',
      name: o.nameAr,
      alternateName: o.nameEn,
      url: o.website,
      logo: new URL(a(o.logo.src), c.seo.canonical).href,
      foundingDate: '2014-02-10',
      email: o.contact.email,
      telephone: '+968' + o.contact.phones[0],
      address: { '@type': 'PostalAddress', addressLocality: t.city, addressRegion: t.region, addressCountry: 'OM' },
      sameAs: [o.contact.x],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: fillOrg(f.a) } })),
    },
  ];
}

// ── Shared icon sprite (same file/ids as the orphan-sponsorship landing page) ──
const SPRITE = readFileSync(new URL('./sprite.svg', import.meta.url), 'utf8');
export const use = (id, cls = '') => `<svg${cls ? ` class="${cls}"` : ''} aria-hidden="true"><use href="#i-${id}"/></svg>`;

export const sectionHead = ({ kicker, title, text, id, lead }) => `<div class="section-head reveal">
        ${kicker ? `<span class="kicker">${esc(kicker)}</span>` : ''}
        <h2${id ? ` id="${id}"` : ''}>${esc(title)}</h2>
        ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
        ${text ? (Array.isArray(text) ? text : [text]).map((x) => `<p>${esc(x)}</p>`).join('') : ''}
      </div>`;

// ── Shared sections (identical on every Bahjah landing page) ─────────────────
export function trustSection(ctx, override = null) {
  const { a } = ctx;
  const T = { ...ctx.o.shared.trust, ...(override || {}) };
  return `<section class="section section-sand" id="trust" aria-labelledby="trust-title" data-section="trust">
  <div class="wrap">
    <div class="why-grid">
      ${sectionHead({ kicker: T.kicker, title: T.title, text: T.text, id: 'trust-title' })}
      <ul class="facts reveal">
        ${T.facts.map((f) => `<li class="fact">${use(f.icon, 'fact-ico')}<b>${esc(f.value)}</b><span>${esc(f.label)}</span>${f.note ? `<small>${esc(f.note)}</small>` : ''}</li>`).join('\n        ')}
      </ul>
    </div>
    <ul class="awards reveal" aria-label="${esc(T.awardsAria)}">
      ${T.awards.map((w) => `<li><img src="${a(w.src)}" alt="${esc(w.alt)}" title="${esc(w.alt)}" width="${w.w}" height="${w.h}" loading="lazy"></li>`).join('\n      ')}
    </ul>
    <p class="awards-note">${esc(T.note)}</p>
  </div>
</section>`;
}

export function newsSection(ctx) {
  const { a } = ctx;
  const N = ctx.o.shared.news;
  return `<section class="section" id="news" aria-labelledby="news-title" data-section="news">
  <div class="wrap">
    ${sectionHead({ kicker: N.kicker, title: N.title, id: 'news-title' })}
    <ul class="gallery reveal" aria-label="${esc(N.galleryAria)}">
      ${N.gallery.map((g) => `<li><figure><img src="${a(g.src)}" alt="${esc(g.alt)}" width="${g.w}" height="${g.h}" loading="lazy"><figcaption>${esc(g.caption)}</figcaption></figure></li>`).join('\n      ')}
    </ul>
    <ul class="news-links reveal">
      ${N.links.map((l) => `<li><a href="${esc(l.href)}" target="_blank" rel="noopener" data-outbound="${esc(l.id)}"><span><time datetime="${l.date}">${esc(l.dateLabel)}</time><b>${esc(l.title)}</b></span>${use('chev', 'flip')}</a></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;
}

export function faqSection(ctx, faq, { kicker, title }) {
  return `<section class="section section-sand" id="faq" aria-labelledby="faq-title" data-section="faq">
  <div class="wrap">
    ${sectionHead({ kicker, title, id: 'faq-title' })}
    <div class="faq">
      ${faq.map((f) => `<details>
        <summary>${esc(f.q)}</summary>
        <div><p>${esc(ctx.fillOrg(f.a))}</p></div>
      </details>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

// Final CTA: bg image + title + one button + contact row (WhatsApp, phone)
export function finalSection(ctx, { title, text, cta, bg, note }) {
  const { a, t, o } = ctx;
  return `<section class="final" id="final" aria-labelledby="final-title" data-section="final">
  <div class="final-bg" aria-hidden="true"><img src="${a(bg.src)}" alt="" width="${bg.w}" height="${bg.h}" loading="lazy"></div>
  <div class="wrap final-inner reveal">
    <h2 id="final-title">${esc(title)}</h2>
    ${(Array.isArray(text) ? text : [text]).map((x) => `<p class="final-line">${esc(x)}</p>`).join('\n    ')}
    <div class="cta-block" id="cta-final">${cta}</div>
    ${note ? `<p class="final-note">${esc(note)}</p>` : ''}
    <div class="final-contact">
      <a href="https://wa.me/${esc(o.contact.whatsapp)}" target="_blank" rel="noopener" data-contact="whatsapp_final">${use('whatsapp')} ${t.whatsapp}</a>
      <a href="tel:+968${esc(o.contact.phones[0])}" data-contact="phone_final">${use('phone')} <span dir="ltr">${esc(o.contact.phones[0])}</span></a>
    </div>
  </div>
</section>`;
}

// ── Page shell ────────────────────────────────────────────────────────────
// headerCta / stickyCta: { href, attrs, label }; stickyCta.price: { value, note } (optional)
// c.sources: list shown in the footer «مصادر المحتوى والصور»; c.disclaimer: footer note
export function shell(c, ctx, { tracking, pageConfig, ld, preload = '', headerCta, stickyCta, main, extraHead = '' }) {
  // c.nav: [{ href: '#section', label }] → header section menu (desktop)
  const { lang, t, dir, orgName, alt, o, a } = ctx;
  const sh = o.shared;
  const tel = (n) => `<a href="tel:+968${n}" data-contact="phone_footer" dir="ltr">${lang === 'en' ? `+968 ${n.slice(0, 4)} ${n.slice(4)}` : n}</a>`;
  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(c.seo.title)}</title>
<meta name="description" content="${esc(c.seo.description)}">
<link rel="canonical" href="${esc(c.seo.canonical)}">
${alt ? `<link rel="alternate" hreflang="${lang}" href="${esc(c.seo.canonical)}">\n<link rel="alternate" hreflang="${t.langCode}" href="${esc(alt.abs)}">` : ''}
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0b3b33">
<meta name="color-scheme" content="light">
<meta property="og:type" content="website">
<meta property="og:locale" content="${t.locale}">
<meta property="og:site_name" content="${esc(orgName)}">
<meta property="og:title" content="${esc(c.seo.title)}">
<meta property="og:description" content="${esc(c.seo.description)}">
<meta property="og:url" content="${esc(c.seo.canonical)}">
<meta property="og:image" content="${esc(new URL(a(c.seo.ogImage), c.seo.canonical).href)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(c.seo.ogImageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@bahjah1_omani">
<link rel="icon" href="${a('assets/img/shared/bahjah-logo.webp')}" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alexandria:wght@600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap">
${preload}
${extraHead}
<link rel="stylesheet" href="${a('assets/styles.css')}">
<script>document.documentElement.classList.add('js');</script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script>window.BAHJAH_LP=${JSON.stringify(pageConfig)};</script>
<script src="${a('assets/app.js')}" defer></script>
</head>
<body>
${SPRITE}
<a class="skip-link" href="#main">${t.skip}</a>

<header class="site-header" id="siteHeader" data-header>
  <div class="wrap header-inner">
    <a class="brand" href="#main" aria-label="${esc(orgName)}">
      <img src="${a('assets/img/shared/bahjah-logo.webp')}" alt="${t.logo}${esc(orgName)}" width="36" height="40">
      <span class="brand-name">${esc(orgName)}</span>
    </a>
    ${c.nav && c.nav.length ? `<nav class="header-nav" aria-label="${t.navAria}">
      ${c.nav.map((n) => `<a href="${esc(n.href)}" data-nav="${esc(n.href.slice(1))}">${esc(n.label)}</a>`).join('\n      ')}
    </nav>` : ''}
    <div class="header-actions">
      ${alt ? `<a class="lang-btn" href="${esc(alt.href)}" hreflang="${t.langCode}" lang="${t.langCode}" aria-label="${t.langAria}" data-lang-switch="${t.langCode}">${use('globe')}${t.langShort}</a>` : ''}
      <a class="icon-btn" href="https://wa.me/${esc(o.contact.whatsapp)}" target="_blank" rel="noopener" aria-label="${t.whatsappAria}" data-contact="whatsapp_header">${use('whatsapp')}</a>
      <a class="btn btn-primary btn-sm header-cta" href="${esc(headerCta.href)}" ${headerCta.attrs}>${esc(headerCta.label)}</a>
    </div>
  </div>
</header>

${main}

<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <img src="${a('assets/img/shared/bahjah-logo.webp')}" alt="" width="40" height="44" loading="lazy">
      <p><b>${esc(orgName)}</b><br>${esc(o.contact.addressAr)}</p>
    </div>
    <p class="footer-links">
      ${o.contact.phones.map(tel).join('\n      ')}
      <a href="mailto:${esc(o.contact.email)}" data-contact="email_footer">${esc(o.contact.email)}</a>
      <a href="${esc(o.website)}" target="_blank" rel="noopener" data-outbound="org_home">${t.officialSite}</a>
      <a href="${esc(sh.privacyUrl)}" target="_blank" rel="noopener">${t.privacy}</a>
      ${alt ? `<a href="${esc(alt.href)}" hreflang="${t.langCode}" lang="${t.langCode}" data-lang-switch="${t.langCode}">${t.langLabel}</a>` : ''}
    </p>
    <details class="sources">
      <summary>${t.sourcesTitle}</summary>
      <ul>
        ${(c.sources || []).map((x) => `<li>${esc(x)}</li>`).join('\n        ')}
      </ul>
    </details>
    <p class="copy">${esc(c.disclaimer || '')}</p>
  </div>
</footer>

<div class="sticky-cta" id="stickyCta" data-sticky aria-hidden="true">
  ${stickyCta.price ? `<span class="sticky-price"><b data-sticky-value>${esc(stickyCta.price.value)}</b><small>${esc(stickyCta.price.note)}</small></span>` : ''}
  <a class="btn btn-primary" href="${esc(stickyCta.href)}" ${stickyCta.attrs} tabindex="-1">${esc(stickyCta.label)}</a>
</div>

${
  tracking.requireConsent
    ? `<div class="consent" data-consent hidden role="dialog" aria-live="polite" aria-label="${t.consentAria}">
  <p>${t.consent}</p>
  <div class="row">
    <button type="button" class="btn btn-sm btn-primary" data-consent-accept>${t.accept}</button>
    <button type="button" class="btn btn-sm btn-ghost" data-consent-decline>${t.decline}</button>
  </div>
</div>`
    : ''
}
<noscript><style>.sticky-cta{display:none}.ba-range{display:none}</style></noscript>
</body>
</html>
`;
}
