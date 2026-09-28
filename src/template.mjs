// Renders a campaign config into a complete static HTML page.
// Pure function: (campaign, tracking, credits, assetBase) => html string.

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const icons = {
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
  quote: '<path fill="currentColor" stroke="none" d="M9.6 6C6.5 6.3 4 9 4 12.3V18h6.2v-6.2H7.1c0-2.2 1.2-3.6 2.9-3.9zM19.6 6c-3.1.3-5.6 3-5.6 6.3V18h6.2v-6.2h-3.1c0-2.2 1.2-3.6 2.9-3.9z"/>',
};
const icon = (name, cls = 'ico') =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[name] || ''}</svg>`;

export function render(c, tracking, credits, base = '') {
  const o = c.org;
  const a = (p) => base + p;
  const src = (p) => (credits[p] ? ` data-source="${esc(credits[p])}"` : '');
  const fillOrg = (s) =>
    s
      .replace('{org.phones}', o.contact.phones.join(' – '))
      .replace('{org.whatsapp}', o.contact.whatsapp.replace(/^968/, ''))
      .replace('{org.email}', o.contact.email)
      .replace('{org.address}', o.contact.addressAr);

  const payUrl = c.payment.url;
  const ctaBtn = (loc, extra = '', label = c.cta.primary) =>
    `<a class="btn btn-primary ${extra}" href="${esc(payUrl)}" data-cta="${loc}" data-payment rel="noopener"><span>${esc(label)}</span>${icon('arrow', 'ico ico-dir')}</a>`;

  // ── Before/after slider component ─────────────────────────────────────────
  const cmp = c.compare;
  const slider = (pr, { size = 'lg', eager = false, idx = 0 } = {}) => `
    <div class="ba ba-${size}" data-ba style="--pos:50%">
      <img class="ba-img ba-after" src="${a(size === 'lg' ? pr.after : pr.afterSm)}" ${size === 'lg' ? `srcset="${a(pr.afterSm)} 320w, ${a(pr.after)} 640w" sizes="(min-width: 960px) 560px, 100vw"` : ''} width="${pr.width}" height="${pr.height}" alt="بعد الترميم: ${esc(pr.caption)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" draggable="false"${src(pr.after)} data-ba-after>
      <div class="ba-before-wrap">
        <img class="ba-img ba-before" src="${a(size === 'lg' ? pr.before : pr.beforeSm)}" ${size === 'lg' ? `srcset="${a(pr.beforeSm)} 320w, ${a(pr.before)} 640w" sizes="(min-width: 960px) 560px, 100vw"` : ''} width="${pr.width}" height="${pr.height}" alt="قبل الترميم: ${esc(pr.caption)}" ${eager ? '' : 'loading="lazy"'} decoding="async" draggable="false"${src(pr.before)} data-ba-before>
      </div>
      <span class="ba-tag ba-tag-before">قبل</span>
      <span class="ba-tag ba-tag-after">بعد</span>
      <div class="ba-line" aria-hidden="true"><span class="ba-knob">${icon('handle')}</span></div>
      <input class="ba-range" dir="ltr" type="range" min="0" max="100" value="50" aria-label="مقارنة قبل وبعد: ${esc(pr.caption)}" data-ba-range data-ba-idx="${idx}">
    </div>`;

  // ── Hero visual ───────────────────────────────────────────────────────────
  const heroPair = cmp ? cmp.pairs[cmp.heroIndex || 0] : null;
  const heroVisual = heroPair
    ? `<div class="hero-visual">
        <div class="hero-card" data-hero-ba>
          ${slider(heroPair, { size: 'lg', eager: true })}
          <div class="hero-card-foot">
            <p class="hero-cap"><span class="dot"></span><span data-hero-caption>${esc(heroPair.caption)}</span></p>
            <p class="hero-cap-src">من أعمال الجمعية الموثقة</p>
          </div>
        </div>
        <div class="thumbs" role="group" aria-label="اختر صورة للمقارنة">
          ${cmp.pairs
            .map(
              (pr, i) => `<button type="button" class="thumb${i === (cmp.heroIndex || 0) ? ' is-active' : ''}" data-thumb="${i}" aria-label="${esc(pr.caption)}" aria-pressed="${i === (cmp.heroIndex || 0)}">
            <img src="${a(pr.afterSm)}" width="80" height="60" alt="" loading="lazy" decoding="async">
          </button>`
            )
            .join('')}
        </div>
      </div>`
    : c.hero.image
      ? `<figure class="hero-visual hero-figure">
          <img src="${a(c.hero.image.src)}" width="${c.hero.image.width}" height="${c.hero.image.height}" alt="${esc(c.hero.image.alt)}" fetchpriority="high" decoding="async"${src(c.hero.image.src)}>
          <figcaption>${esc(c.hero.image.caption)}</figcaption>
        </figure>`
      : '';

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

  // ── amount ────────────────────────────────────────────────────────────────
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
    : am.anyAmountNote
      ? `<p class="give-quote">${esc(am.anyAmountNote)}</p>`
      : '';
  const calc =
    unit && !am.officialAmounts.length && unit.value === 1
      ? `<div class="calc" data-calc>
          <label for="calc-amount">كم تريد أن تساهم؟</label>
          <div class="calc-row">
            <input id="calc-amount" type="number" inputmode="numeric" min="1" step="1" placeholder="0" data-calc-input>
            <span class="calc-cur">ر.ع.</span>
          </div>
          <p class="calc-out" data-calc-out aria-live="polite">اكتب المبلغ لتعرف ماذا تُدخل في خانة «الكمية».</p>
        </div>`
      : '';
  const unitExplainer = unit
    ? `<div class="unit">
        <p class="unit-eq"><span class="unit-shown">${esc(unit.display)}</span><span class="unit-eqs" aria-hidden="true">=</span><span class="unit-real">${unit.value === 1 ? 'ريال عماني واحد' : `${unit.value} ر.ع.`}</span></p>
        <p class="unit-txt">تعرض صفحة الدفع الرسمية الريال بثلاث خانات عشرية (1,000 بيسة). ${
          unit.value === 1
            ? 'اكتب مبلغ مساهمتك بالريال في خانة <strong>«الكمية»</strong>.'
            : `كل وحدة تساوي ${unit.value} ر.ع.، فحدّد عدد الوحدات في خانة <strong>«الكمية»</strong>.`
        }</p>
      </div>`
    : '';

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
      mainEntity: c.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: fillOrg(f.a) } })),
    },
  ];

  const pageConfig = {
    slug: c.slug,
    paymentUrl: payUrl,
    content: c.analytics,
    currency: 'OMR',
    unit: unit ? unit.value : null,
    addToCart: c.payment.addToCart && c.payment.addToCart.enabled ? c.payment.addToCart.productId : null,
    tracking,
    compare: cmp
      ? cmp.pairs.map((pr) => ({ caption: pr.caption, before: a(pr.before), after: a(pr.after), beforeSm: a(pr.beforeSm), afterSm: a(pr.afterSm) }))
      : null,
  };

  const oc = o.otherChannels;
  const trustChips = (c.hero.trust || [])
    .map((t, i) => `<li>${icon(['shield', 'check', 'lock'][i % 3])}<span>${esc(t)}</span></li>`)
    .join('');
  const awards = c.awardsToShow.map((k) => o.awards[k]).filter(Boolean);
  const ev = c.evidence;
  const hasEvidence = ev && ev.items && ev.items.length;

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(c.seo.title)}</title>
<meta name="description" content="${esc(c.seo.description)}">
<link rel="canonical" href="${esc(c.seo.canonical)}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#faf7f1">
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=Readex+Pro:wght@500;600;700&display=swap">
${heroPair ? `<link rel="preload" as="image" href="${a(heroPair.before)}" fetchpriority="high">` : c.hero.image ? `<link rel="preload" as="image" href="${a(c.hero.image.src)}" fetchpriority="high">` : ''}
<link rel="stylesheet" href="${a('assets/styles.css')}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script>window.BAHJAH_LP=${JSON.stringify(pageConfig)};</script>
<script src="${a('assets/app.js')}" defer></script>
</head>
<body>
<a class="skip" href="#main">تخطَّ إلى المحتوى</a>

<header class="site-header" data-header>
  <div class="wrap header-in">
    <a class="brand" href="${esc(o.website)}" rel="noopener" data-outbound="org_home">
      <img src="${a(o.logo.src1x)}" srcset="${a(o.logo.src1x)} 1x, ${a(o.logo.src)} 2x" width="38" height="42" alt="شعار ${esc(o.nameAr)}"${src(o.logo.src)}>
      <span class="brand-name">${esc(o.nameAr)}</span>
    </a>
    <a class="btn btn-sm btn-primary header-cta" href="${esc(payUrl)}" data-cta="header" data-payment rel="noopener">${esc(c.cta.short)}</a>
  </div>
</header>

<main id="main">

  <!-- ═════ HERO ═════ -->
  <section class="hero" data-section="hero">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="wrap hero-grid${heroVisual ? '' : ' no-media'}">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-dot"></span>${esc(c.hero.eyebrow)}</p>
        <h1>${esc(c.hero.title)}</h1>
        <p class="lede">${esc(c.hero.supporting || c.hero.need)}</p>
        ${progress}
        <div class="hero-ctas cta-block" id="cta-hero">
          ${ctaBtn('hero', 'btn-lg', c.cta.hero || c.cta.primary)}
          ${cmp && c.cta.secondary ? `<a class="btn btn-lg btn-soft" href="#impact" data-cta="hero_secondary">${esc(c.cta.secondary)}${icon('down', 'ico')}</a>` : ''}
        </div>
        ${trustChips ? `<ul class="trust-chips" role="list">${trustChips}</ul>` : ''}
      </div>
      ${heroVisual}
    </div>
  </section>

  <!-- ═════ WHAT YOUR DONATION SUPPORTS ═════ -->
  <section class="section supports" data-section="supports">
    <div class="wrap">
      <header class="sec-head">
        <p class="kicker">الأعمال التي تدعمها</p>
        <h2>${esc(c.supports.title)}</h2>
        <p class="sec-intro">${esc(c.supports.intro)}</p>
      </header>
      <ul class="work-grid" role="list">
        ${c.supports.items
          .map(
            (s) => `<li class="work">
          <span class="work-ico">${icon(s.icon)}</span>
          <h3>${esc(s.title)}</h3>
          ${s.text ? `<p>${esc(s.text)}</p>` : ''}
        </li>`
          )
          .join('\n        ')}
      </ul>
      ${c.supports.itemsSource ? `<p class="src">${esc(c.supports.itemsSource)}</p>` : ''}
    </div>
  </section>

  ${
    cmp
      ? `<!-- ═════ IMPACT GALLERY ═════ -->
  <section class="section impact" id="impact" data-section="impact">
    <div class="wrap">
      <header class="sec-head">
        <p class="kicker">اكتشف أثر مساهمتك</p>
        <h2>${esc(cmp.title)}</h2>
        <p class="sec-intro">${esc(cmp.intro)}</p>
      </header>
      <ul class="impact-grid" role="list" data-impact-grid>
        ${cmp.pairs
          .map(
            (pr, i) => `<li class="impact-card">
          ${slider(pr, { size: 'sm', idx: i })}
          <p class="impact-cap">${esc(pr.caption)}</p>
        </li>`
          )
          .join('\n        ')}
      </ul>
      ${cmp.pairs.length > 3 ? `<button type="button" class="btn btn-ghost more-btn" data-more>عرض ${cmp.pairs.length - 3} صور أخرى</button>` : ''}
      <p class="src">${esc(cmp.source)} · <a href="${esc(cmp.sourceUrl)}" target="_blank" rel="noopener" data-outbound="cv_pdf">عرض الملف التعريفي</a></p>
      <div class="inline-cta cta-block">${ctaBtn('impact', 'btn-lg')}</div>
    </div>
  </section>`
      : ''
  }

  <!-- ═════ WHY RENOVATION / THE NEED ═════ -->
  <section class="section need" data-section="need">
    <div class="wrap need-grid">
      <div class="need-copy">
        <p class="kicker">لماذا الترميم؟</p>
        <h2>${esc(c.need.title)}</h2>
        ${c.need.paragraphs.map((t) => `<p>${esc(t)}</p>`).join('\n        ')}
        <p class="src">المصدر: ${esc(c.need.source)}</p>
      </div>
      ${
        c.need.quote
          ? `<figure class="quote-card">
        ${icon('quote', 'ico quote-ico')}
        <blockquote><p>${esc(c.need.quote.text)}</p></blockquote>
        <figcaption>${esc(c.need.quote.cite)}</figcaption>
      </figure>`
          : ''
      }
    </div>
  </section>

  ${
    c.process
      ? `<!-- ═════ HOW IT REACHES THE HOME ═════ -->
  <section class="section process" data-section="process">
    <div class="wrap">
      <header class="sec-head">
        <p class="kicker">من مساهمتك إلى المنزل</p>
        <h2>${esc(c.process.title)}</h2>
      </header>
      <ol class="steps-path">
        ${c.process.steps
          .map(
            (s, i) => `<li class="step">
          <span class="step-n">${i + 1}</span>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
        </li>`
          )
          .join('\n        ')}
      </ol>
      <p class="src">${esc(c.process.source)}</p>
    </div>
  </section>`
      : ''
  }

  ${
    hasEvidence
      ? `<!-- ═════ DOCUMENTED WORK ═════ -->
  <section class="section evidence" data-section="evidence">
    <div class="wrap">
      <header class="sec-head">
        <p class="kicker">سجلّ موثّق</p>
        <h2>${esc(ev.title)}</h2>
      </header>
      <ul class="ev-grid" role="list">
        ${ev.items
          .map(
            (e) => `<li class="ev">
          <div class="ev-top">
            ${e.image ? `<img class="ev-img" src="${a(e.image.src)}" width="${e.image.width}" height="${e.image.height}" alt="${esc(e.image.alt)}" loading="lazy" decoding="async"${src(e.image.src)}>` : `<span class="ev-img ev-img-ph">${icon(e.icon || 'roof')}</span>`}
            <p class="ev-date">${esc(e.date)}</p>
          </div>
          <h3>${esc(e.title)}</h3>
          <p>${esc(e.text)}</p>
          ${e.note ? `<p class="ev-note">${esc(e.note)}</p>` : ''}
          ${e.link ? `<a class="ev-link" href="${esc(e.link)}" target="_blank" rel="noopener" data-outbound="evidence">المصدر على موقع الجمعية</a>` : ''}
        </li>`
          )
          .join('\n        ')}
      </ul>
    </div>
  </section>`
      : ''
  }

  <!-- ═════ DONATE ═════ -->
  <section class="section give" id="give" data-section="amount">
    <div class="wrap give-grid">
      <div class="give-intro">
        <p class="kicker kicker-light">طريقة المساهمة</p>
        <h2>${esc(am.title)}</h2>
        <ol class="give-steps">
          <li><span>1</span>اضغط «${esc(c.cta.primary)}».</li>
          <li><span>2</span>في صفحة «${esc(c.payment.label)}» الرسمية، ${unit ? 'اكتب المبلغ في خانة «الكمية»' : 'حدّد المبلغ'} ثم اضغط «تبرع الآن».</li>
          <li><span>3</span>أكمل الدفع بالبطاقة عبر بوابة بنك مسقط SmartPay.</li>
        </ol>
      </div>
      <div class="give-card">
        ${chips}
        ${unitExplainer}
        ${calc}
        <div class="cta-block" id="cta-mid">
          ${ctaBtn('amount', 'btn-lg btn-block')}
          <p class="secure">${icon('lock')}<span>${esc(c.payment.domainNote)}، والدفع ببطاقات الائتمان والخصم عبر بوابة بنك مسقط SmartPay.</span></p>
        </div>
        ${am.source ? `<p class="src">${esc(am.source)}</p>` : ''}
      </div>
    </div>
  </section>

  ${
    c.otherWays.show
      ? `<!-- ═════ OTHER WAYS ═════ -->
  <section class="section other" id="other-ways" data-section="other_ways">
    <div class="wrap">
      <header class="sec-head">
        <p class="kicker">طرق أخرى</p>
        <h2>طرق أخرى للتبرع</h2>
      </header>
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

  <!-- ═════ WHY BAHJAH ═════ -->
  <section class="section why" data-section="why">
    <div class="wrap">
      <header class="sec-head">
        <p class="kicker">لماذا بهجة؟</p>
        <h2>جهة موثوقة ترعى الأيتام منذ 2014</h2>
      </header>
      <div class="facts">
        <div class="fact">
          <span class="fact-ico">${icon('shield')}</span>
          <h3>جمعية خيرية غير حكومية</h3>
          <p>${esc(o.about.classification)}</p>
        </div>
        <div class="fact">
          <span class="fact-ico">${icon('check')}</span>
          <h3>تأسست في 10 فبراير 2014</h3>
          <p>${esc(o.about.founded)}</p>
        </div>
        <div class="fact">
          <span class="fact-ico">${icon('home')}</span>
          <h3>رؤيتنا</h3>
          <p>${esc(o.about.vision)}</p>
        </div>
      </div>
      <h3 class="awards-title">شهادات وجوائز حصلت عليها الجمعية</h3>
      <ul class="awards" role="list">
        ${awards
          .map(
            (w) => `<li class="award">
          <span class="award-logo">${w.img ? `<img src="${a(w.img)}" width="64" height="64" alt="" loading="lazy" decoding="async"${src(w.img)}>` : icon('award')}</span>
          <strong>${esc(w.title)}</strong>
          <small>${esc(w.year)}م</small>
        </li>`
          )
          .join('\n        ')}
      </ul>
      <p class="src">كما وردت في موقع الجمعية الرسمي.</p>
    </div>
  </section>

  <!-- ═════ FAQ ═════ -->
  <section class="section faq" data-section="faq">
    <div class="wrap faq-grid">
      <header class="sec-head">
        <p class="kicker">أسئلة شائعة</p>
        <h2>كل ما تحتاج معرفته</h2>
        <div class="contact-row">
          <a class="btn btn-ghost btn-sm" href="https://wa.me/${esc(o.contact.whatsapp)}" target="_blank" rel="noopener" data-contact="whatsapp">${icon('sms')} واتساب</a>
          <a class="btn btn-ghost btn-sm" href="tel:+968${esc(o.contact.phones[0])}" data-contact="phone">${icon('phone')} <span dir="ltr">${esc(o.contact.phones[0])}</span></a>
        </div>
      </header>
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
    </div>
  </section>

  <!-- ═════ FINAL CTA ═════ -->
  <section class="final" data-section="final">
    ${heroPair ? `<img class="final-bg" src="${a(cmp.pairs[cmp.pairs.length - 1].after)}" width="640" height="480" alt="" loading="lazy" decoding="async">` : ''}
    <div class="wrap final-in">
      <h2>${esc(c.final.title)}</h2>
      <p>${esc(c.final.text)}</p>
      <div class="cta-block" id="cta-final">
        ${ctaBtn('final', 'btn-lg btn-light')}
        <p class="secure secure-light">${icon('lock')}<span>${esc(c.payment.domainNote)}</span></p>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="wrap foot-in">
    <div class="foot-brand">
      <img src="${a(o.logo.src1x)}" width="38" height="42" alt="" loading="lazy">
      <div><strong>${esc(o.nameAr)}</strong><span>${esc(o.nameEn)}</span></div>
    </div>
    <p>${esc(o.contact.addressAr)} · <span dir="ltr">${esc(o.contact.phones.join(' – '))}</span> · ${esc(o.contact.email)}</p>
    <p><a href="${esc(o.website)}" rel="noopener" data-outbound="org_home">الموقع الرسمي</a> · <a href="${esc(o.donationsHub)}" rel="noopener" data-outbound="donations_hub">كل أبواب التبرع</a> · <a href="${esc(o.contact.x)}" target="_blank" rel="noopener" data-outbound="x">X</a></p>
  </div>
</footer>

<div class="sticky-cta" data-sticky aria-hidden="true">
  <a class="btn btn-primary btn-block" href="${esc(payUrl)}" data-cta="sticky" data-payment rel="noopener" tabindex="-1"><span>${esc(c.cta.primary)}</span>${icon('arrow', 'ico ico-dir')}</a>
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
<noscript><style>.sticky-cta{display:none}.ba-range{display:none}</style></noscript>
</body>
</html>
`;
}
