// Renders a campaign config into a complete static HTML page.
// Pure function: (campaign, tracking, credits, assetBase) => html string.

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const icons = {
  roof: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 9.5V20h13V9.5"/><path d="M9.5 20v-5h5v5"/>',
  wall: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9.3h18M3 14.7h18M9 4v5.3M15 9.3v5.4M9 14.7V20"/><path d="m13 4 -1.5 3 2 2.5-1.5 3" stroke-dasharray="0"/>',
  kitchen: '<path d="M7 3v5a2 2 0 0 0 4 0V3M9 8v13"/><path d="M17 21V3c-2 1.5-3 4-3 7v3h3"/>',
  home: '<path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M12 11.2c-1-1.4-3.4-.8-3.4 1.1 0 1.7 2.2 3 3.4 3.9 1.2-.9 3.4-2.2 3.4-3.9 0-1.9-2.4-2.5-3.4-1.1z"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  arrow: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  bank: '<path d="M3 10h18L12 4zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  sms: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>',
  app: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h9"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
};
const icon = (name, cls = 'ico') =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[name] || ''}</svg>`;

export function render(c, tracking, credits, base = '') {
  const o = c.org;
  const a = (p) => base + p; // asset path helper
  const src = (p) => (credits[p] ? ` data-source="${esc(credits[p])}"` : '');
  const fillOrg = (s) =>
    s
      .replace('{org.phones}', o.contact.phones.join(' – '))
      .replace('{org.whatsapp}', o.contact.whatsapp.replace(/^968/, ''))
      .replace('{org.email}', o.contact.email)
      .replace('{org.address}', o.contact.addressAr);

  const payUrl = c.payment.url;
  const ctaBtn = (loc, extra = '') =>
    `<a class="btn btn-primary ${extra}" href="${esc(payUrl)}" data-cta="${loc}" data-payment rel="noopener">${esc(c.cta.primary)} ${icon('arrow', 'ico ico-dir')}</a>`;
  const trust = `<p class="trust">${icon('lock')} <span>${esc(c.payment.domainNote)}، والدفع ببطاقات الائتمان والخصم عبر بوابة بنك مسقط SmartPay.</span></p>`;

  // ── progress (only if officially sourced & enabled) ───────────────────────
  const p = c.hero.progress;
  const progress =
    p && p.enabled && p.target && p.raised != null && p.sourceUrl
      ? `<div class="progress" role="group" aria-label="تقدم الحملة">
          <div class="progress-row"><strong>${Number(p.raised).toLocaleString('en-US')} ${esc(p.currency)}</strong><span>من ${Number(p.target).toLocaleString('en-US')} ${esc(p.currency)}</span></div>
          <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${p.target}" aria-valuenow="${p.raised}"><span style="width:${Math.min(100, (p.raised / p.target) * 100).toFixed(1)}%"></span></div>
          <p class="progress-src">حسب <a href="${esc(p.sourceUrl)}" rel="noopener" target="_blank">الإعلان الرسمي للجمعية</a> ${esc(p.asOf)}</p>
        </div>`
      : '';

  // ── amount section ────────────────────────────────────────────────────────
  const am = c.amount;
  const unit = am.unit;
  const qtyFor = (v) => (unit ? Math.round((v / unit.value) * 1000) / 1000 : null);
  const chips = am.officialAmounts.length
    ? `<fieldset class="amounts" data-amounts>
        <legend class="sr-only">اختر مبلغًا</legend>
        ${am.officialAmounts
          .map(
            (x, i) => `<label class="amount">
              <input type="radio" name="amount" value="${x.value}" ${unit ? `data-qty="${qtyFor(x.value)}"` : ''} ${i === 0 ? 'checked' : ''}>
              <span class="amount-v">${x.value} <small>ر.ع.</small></span>
              <span class="amount-l">${esc(x.label)}</span>
              ${unit ? `<span class="amount-n">الكمية في صفحة الدفع: ${qtyFor(x.value)}</span>` : ''}
            </label>`
          )
          .join('')}
      </fieldset>`
    : am.anyAmountNote ? `<p class="big-quote">${esc(am.anyAmountNote)}</p>` : '';
  const unitExplainer = unit
    ? `<div class="unit">
        <p class="unit-eq"><span class="unit-shown" dir="rtl">${esc(unit.display)}</span><span class="unit-arrow" aria-hidden="true">=</span><span class="unit-real">${unit.value === 1 ? 'ريال عماني واحد' : `${unit.value} ر.ع.`}</span></p>
        <p>تعرض صفحة الدفع الرسمية الريال بثلاث خانات عشرية (1,000 بيسة). ${
          unit.value === 1
            ? 'اكتب مبلغ تبرعك بالريال في خانة <strong>«الكمية»</strong>.'
            : `كل وحدة تساوي ${unit.value} ر.ع.، فحدّد عدد الوحدات في خانة <strong>«الكمية»</strong>.`
        }</p>
        ${
          !am.officialAmounts.length && unit.value === 1
            ? `<div class="calc" data-calc>
          <label for="calc-amount">كم تريد أن تتبرع؟</label>
          <div class="calc-row">
            <input id="calc-amount" type="number" inputmode="numeric" min="1" step="1" placeholder="المبلغ" data-calc-input>
            <span>ر.ع.</span>
          </div>
          <p class="calc-out" data-calc-out aria-live="polite">اكتب المبلغ لتعرف ماذا تُدخل في خانة الكمية.</p>
        </div>`
            : ''
        }
      </div>`
    : '';
  const amountBody = chips + unitExplainer + (am.source ? `<p class="amount-src">${esc(am.source)}</p>` : '');
  const smaller = '';

  // ── JSON-LD ───────────────────────────────────────────────────────────────
  const ld = [
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
      address: { '@type': 'PostalAddress', addressLocality: 'صلالة', addressRegion: 'ظفار', addressCountry: 'OM' },
      sameAs: [o.contact.x],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: fillOrg(f.a) },
      })),
    },
  ];

  const pageConfig = {
    slug: c.slug,
    paymentUrl: payUrl,
    unit: unit ? unit.value : null,
    addToCart: c.payment.addToCart && c.payment.addToCart.enabled ? c.payment.addToCart.productId : null,
    content: c.analytics,
    currency: 'OMR',
    tracking,
  };

  const oc = o.otherChannels;

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(c.seo.title)}</title>
<meta name="description" content="${esc(c.seo.description)}">
<link rel="canonical" href="${esc(c.seo.canonical)}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#14323f">
<meta name="color-scheme" content="light">
<meta property="og:type" content="website">
<meta property="og:locale" content="ar_OM">
<meta property="og:site_name" content="${esc(o.nameAr)}">
<meta property="og:title" content="${esc(c.seo.title)}">
<meta property="og:description" content="${esc(c.seo.description)}">
<meta property="og:url" content="${esc(c.seo.canonical)}">
<meta property="og:image" content="${esc(new URL(a(c.seo.ogImage), c.seo.canonical).href)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(c.seo.ogImageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@bahjah1_omani">
<link rel="icon" href="${a('assets/img/logo-96.webp')}" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;700&display=swap">
${c.hero.image ? `<link rel="preload" as="image" href="${a(c.hero.image.src)}" fetchpriority="high">` : ''}
<link rel="stylesheet" href="${a('assets/styles.css')}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script>window.BAHJAH_LP=${JSON.stringify(pageConfig)};</script>
<script src="${a('assets/app.js')}" defer></script>
</head>
<body>
<a class="skip" href="#main">تخطَّ إلى المحتوى</a>

<header class="site-header">
  <div class="wrap header-in">
    <a class="brand" href="${esc(o.website)}" rel="noopener" data-outbound="org_home">
      <img src="${a(o.logo.src1x)}" srcset="${a(o.logo.src1x)} 1x, ${a(o.logo.src)} 2x" width="40" height="44" alt="شعار ${esc(o.nameAr)}"${src(o.logo.src)}>
      <span>${esc(o.nameAr)}</span>
    </a>
    <a class="btn btn-sm btn-primary header-cta" href="${esc(payUrl)}" data-cta="header" data-payment rel="noopener">${esc(c.cta.short)}</a>
  </div>
</header>

<main id="main">

  <!-- ═════ 1. HERO (campaign block) ═════ -->
  <section class="hero" data-section="hero">
    <div class="wrap hero-grid${c.hero.image ? '' : ' no-media'}">
      <div class="hero-copy">
        <p class="eyebrow">${esc(c.hero.eyebrow)}</p>
        <h1>${esc(c.hero.title)}</h1>
        <p class="lede">${esc(c.hero.need)}</p>
        <p class="src">المصدر: ${esc(c.hero.needSource)}</p>
        ${progress}
        <div class="cta-block" id="cta-hero">
          ${ctaBtn('hero', 'btn-lg')}
          ${trust}
        </div>
      </div>
      ${c.hero.image ? `      <figure class="hero-media">
        <img src="${a(c.hero.image.src)}" width="${c.hero.image.width}" height="${c.hero.image.height}" alt="${esc(c.hero.image.alt)}" fetchpriority="high" decoding="async"${src(c.hero.image.src)}>
        <figcaption>${esc(c.hero.image.caption)}</figcaption>
      </figure>` : ''}
    </div>
  </section>

  <!-- ═════ 2. THE NEED ═════ -->
  <section class="section need" data-section="need">
    <div class="wrap narrow">
      <h2>${esc(c.need.title)}</h2>
      ${c.need.paragraphs.map((t) => `<p>${esc(t)}</p>`).join('\n      ')}
      ${c.need.quote ? `<blockquote>
        <p>${esc(c.need.quote.text)}</p>
        <cite>${esc(c.need.quote.cite)}</cite>
      </blockquote>` : ''}
      <p class="src">المصدر: ${esc(c.need.source)}</p>
    </div>
  </section>

  <!-- ═════ 3. WHAT YOUR DONATION SUPPORTS ═════ -->
  <section class="section supports" data-section="supports">
    <div class="wrap">
      <h2>${esc(c.supports.title)}</h2>
      <p class="section-intro">${esc(c.supports.intro)}</p>
      <ul class="cards" role="list">
        ${c.supports.items
          .map(
            (s) => `<li class="card">
          <span class="card-ico">${icon(s.icon)}</span>
          <h3>${esc(s.title)}</h3>
          ${s.text ? `<p>${esc(s.text)}</p>` : ''}
        </li>`
          )
          .join('\n        ')}
      </ul>
      ${c.supports.itemsSource ? `<p class="src">${esc(c.supports.itemsSource)}</p>` : ''}
      <p class="note">${esc(c.supports.note)}</p>
    </div>
  </section>

  <!-- ═════ 4. WHY BAHJAH ═════ -->
  <section class="section why" data-section="why">
    <div class="wrap">
      <div class="why-grid">
        <div>
          <h2>لماذا جمعية بهجة؟</h2>
          <p class="why-lead">${esc(o.about.classification)} ${esc(o.about.founded)}</p>
          <h3 class="sub">رؤيتنا</h3>
          <p>${esc(o.about.vision)}</p>
          <h3 class="sub">من أهدافنا</h3>
          <p>${esc(o.about.goal)}</p>
        </div>
        <div>
          <h3 class="sub">شهادات وجوائز حصلت عليها الجمعية</h3>
          <ul class="awards" role="list">
            ${c.awardsToShow
              .map((k) => o.awards[k])
              .filter(Boolean)
              .map(
                (w) => `<li class="award">
              ${w.img ? `<img src="${a(w.img)}" width="56" height="56" alt="" loading="lazy" decoding="async"${src(w.img)}>` : `<span class="award-ph">${icon('award')}</span>`}
              <span><strong>${esc(w.title)}</strong><small>${esc(w.year)}م</small></span>
            </li>`
              )
              .join('\n            ')}
          </ul>
          <p class="src">كما وردت في موقع الجمعية الرسمي.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ═════ 5. DOCUMENTED EVIDENCE ═════ -->
  ${c.evidence && (c.evidence.gallery || c.evidence.items.length) ? `  <section class="section evidence" data-section="evidence">
    <div class="wrap">
      <h2>${esc(c.evidence.title)}</h2>
${c.evidence.gallery ? `      <h3 class="sub">${esc(c.evidence.gallery.title)}</h3>
      <p class="gallery-hint">اسحب لمشاهدة المزيد ←</p>
      <ul class="gallery" role="list">
        ${c.evidence.gallery.images
          .map(
            (g) => `<li><figure><img src="${a(g.src)}" width="${g.width}" height="${g.height}" alt="${esc(g.alt)}" loading="lazy" decoding="async"${src(g.src)}></figure></li>`
          )
          .join('\n        ')}
      </ul>
      <p class="src">${esc(c.evidence.gallery.source)} · <a href="${esc(c.evidence.gallery.sourceUrl)}" target="_blank" rel="noopener" data-outbound="cv_pdf">عرض الملف</a></p>` : ''}

      <ul class="timeline" role="list">
        ${c.evidence.items
          .map(
            (e) => `<li class="tl-item">
          ${e.image ? `<img class="tl-img" src="${a(e.image.src)}" width="${e.image.width}" height="${e.image.height}" alt="${esc(e.image.alt)}" loading="lazy" decoding="async"${src(e.image.src)}>` : `<span class="tl-img tl-img-ph">${icon(e.icon || 'roof')}</span>`}
          <div>
            <p class="tl-date">${esc(e.date)}</p>
            <h3>${esc(e.title)}</h3>
            <p>${esc(e.text)}</p>
            ${e.note ? `<p class="tl-note">${esc(e.note)}</p>` : ''}
            ${e.link ? `<a class="tl-link" href="${esc(e.link)}" target="_blank" rel="noopener" data-outbound="evidence">المصدر على موقع الجمعية</a>` : ''}
          </div>
        </li>`
          )
          .join('\n        ')}
      </ul>
    </div>
  </section>` : ''}

  <!-- ═════ 6. AMOUNT + 7. PAYMENT ═════ -->
  <section class="section give" id="give" data-section="amount">
    <div class="wrap narrow">
      <div class="give-box">
        <h2>${esc(am.title)}</h2>
        ${amountBody}
        ${am.controlNote ? `<p class="control-note">${esc(am.controlNote)}</p>` : ''}
        <ol class="steps">
          <li>اضغط «${esc(c.cta.primary)}».</li>
          <li>في صفحة «${esc(c.payment.label)}» الرسمية، ${unit ? 'اكتب الكمية' : 'حدّد المبلغ'} ثم اضغط «تبرع الآن».</li>
          <li>أكمل الدفع بالبطاقة عبر بوابة بنك مسقط SmartPay.</li>
        </ol>
        <div class="cta-block" id="cta-mid">
          ${ctaBtn('amount', 'btn-lg btn-block')}
          ${trust}
        </div>
        ${smaller}
      </div>
    </div>
  </section>

  <!-- ═════ OTHER WAYS TO GIVE ═════ -->
  ${
    c.otherWays.show
      ? `<section class="section other" data-section="other_ways" id="other-ways">
    <div class="wrap">
      <h2>طرق أخرى للتبرع</h2>
      <div class="ways">
        <div class="way">
          <h3>${icon('bank')} التحويل البنكي</h3>
          <ul class="accounts" role="list">
            ${oc.bankAccounts
              .map(
                (b) => `<li><span class="acc-bank">${esc(b.bank)}</span>
              <span class="acc-num" dir="ltr">${esc(b.number)}</span>
              <button type="button" class="copy" data-copy="${esc(b.number)}" data-copy-label="${esc(b.bank)}" aria-label="نسخ رقم حساب ${esc(b.bank)}">${icon('copy')}<span>نسخ</span></button></li>`
              )
              .join('\n            ')}
          </ul>
          <p class="small">الحسابات باسم: ${esc(oc.accountName)}</p>
          <p class="small muted">${esc(c.otherWays.earmarkNote)}</p>
        </div>
        <div class="way">
          <h3>${icon('sms')} رسالة نصية</h3>
          <p>أرسل كلمة <strong>«${esc(oc.sms.keyword)}»</strong> إلى الرقم المجاني <strong dir="ltr">${esc(oc.sms.number)}</strong> للتبرع بـ${esc(oc.sms.value)} للأيتام (${esc(oc.sms.operators)}).</p>
          <a class="btn btn-ghost btn-sm" href="sms:${esc(oc.sms.number)}?&body=${encodeURIComponent(oc.sms.keyword)}" data-contact="sms">إرسال الرسالة</a>
        </div>
        <div class="way">
          <h3>${icon('app')} تطبيق بهجة</h3>
          <p>حمّل تطبيق الجمعية للتبرع والمتابعة.</p>
          <div class="row">
            <a class="btn btn-ghost btn-sm" href="${esc(o.contact.appAndroid)}" target="_blank" rel="noopener" data-contact="app_android">Android</a>
            <a class="btn btn-ghost btn-sm" href="${esc(o.contact.appIos)}" target="_blank" rel="noopener" data-contact="app_ios">iPhone</a>
          </div>
        </div>
      </div>
      <p class="src">المصدر: ${esc(oc.source)}.</p>
    </div>
  </section>`
      : ''
  }

  <!-- ═════ 8. FAQ ═════ -->
  <section class="section faq" data-section="faq">
    <div class="wrap narrow">
      <h2>الأسئلة الشائعة</h2>
      <div class="faq-list">
        ${c.faq
          .map(
            (f, i) => `<details${i === 0 ? ' open' : ''}>
          <summary>${esc(f.q)}</summary>
          <p>${esc(fillOrg(f.a))}</p>
        </details>`
          )
          .join('\n        ')}
      </div>
      <div class="contact-row">
        <a class="btn btn-ghost btn-sm" href="https://wa.me/${esc(o.contact.whatsapp)}" target="_blank" rel="noopener" data-contact="whatsapp">${icon('sms')} واتساب</a>
        <a class="btn btn-ghost btn-sm" href="tel:+968${esc(o.contact.phones[0])}" data-contact="phone">${icon('phone')} <span dir="ltr">${esc(o.contact.phones[0])}</span></a>
        <a class="btn btn-ghost btn-sm" href="mailto:${esc(o.contact.email)}" data-contact="email">البريد الإلكتروني</a>
      </div>
    </div>
  </section>

  <!-- ═════ 9. FINAL CTA ═════ -->
  <section class="final" data-section="final">
    <div class="wrap narrow">
      <h2>${esc(c.final.title)}</h2>
      <p>${esc(c.final.text)}</p>
      <div class="cta-block" id="cta-final">
        ${ctaBtn('final', 'btn-lg btn-light')}
        <p class="trust trust-light">${icon('lock')} <span>${esc(c.payment.domainNote)}</span></p>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="wrap">
    <p><strong>${esc(o.nameAr)}</strong> · ${esc(o.nameEn)}</p>
    <p>${esc(o.contact.addressAr)} · <span dir="ltr">${esc(o.contact.phones.join(' – '))}</span> · ${esc(o.contact.email)}</p>
    <p><a href="${esc(o.website)}" rel="noopener" data-outbound="org_home">الموقع الرسمي</a> · <a href="${esc(o.donationsHub)}" rel="noopener" data-outbound="donations_hub">كل أبواب التبرع</a> · <a href="${esc(o.contact.x)}" target="_blank" rel="noopener" data-outbound="x">X</a></p>
  </div>
</footer>

<!-- Sticky mobile CTA -->
<div class="sticky-cta" data-sticky aria-hidden="true">
  <a class="btn btn-primary btn-block" href="${esc(payUrl)}" data-cta="sticky" data-payment rel="noopener" tabindex="-1">${esc(c.cta.primary)}</a>
</div>

${
  tracking.requireConsent
    ? `<div class="consent" data-consent hidden role="dialog" aria-live="polite" aria-label="ملفات تعريف الارتباط">
  <p>نستخدم ملفات تعريف الارتباط لقياس أداء حملاتنا الإعلانية وتحسينها.</p>
  <div class="row">
    <button type="button" class="btn btn-sm btn-primary" data-consent-accept>موافق</button>
    <button type="button" class="btn btn-sm btn-ghost" data-consent-decline>رفض</button>
  </div>
</div>`
    : ''
}
<noscript><style>.sticky-cta{display:none}</style></noscript>
</body>
</html>
`;
}
