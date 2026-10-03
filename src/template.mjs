// Renders the renovation-style campaign page (before/after slider, work types,
// impact gallery, process, donate card). Shared shell lives in ./shared.mjs.
import { esc, icon, pageContext, baseLd, shell } from './shared.mjs';

export function render(c, tracking, credits, base = '', opts = {}) {
  const ctx = pageContext(c, credits, base, opts);
  const { lang, t, o, a, src, fillOrg } = ctx;

  const payUrl = c.payment.url;
  const ctaBtn = (loc, extra = '', label = c.cta.primary) =>
    `<a class="btn btn-primary ${extra}" href="${esc(payUrl)}" data-cta="${loc}" data-payment rel="noopener"><span>${esc(label)}</span>${icon('arrow', 'ico ico-dir')}</a>`;

  // ── Before/after slider component ─────────────────────────────────────────
  const cmp = c.compare;
  const slider = (pr, { size = 'lg', eager = false, idx = 0 } = {}) => `
    <div class="ba ba-${size}" data-ba style="--pos:50%">
      <img class="ba-img ba-after" src="${a(size === 'lg' ? pr.after : pr.afterSm)}" ${size === 'lg' ? `srcset="${a(pr.afterSm)} 320w, ${a(pr.after)} 640w" sizes="(min-width: 960px) 560px, 100vw"` : ''} width="${pr.width}" height="${pr.height}" alt="${t.afterAlt}${esc(pr.caption)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" draggable="false"${src(pr.after)} data-ba-after>
      <div class="ba-before-wrap">
        <img class="ba-img ba-before" src="${a(size === 'lg' ? pr.before : pr.beforeSm)}" ${size === 'lg' ? `srcset="${a(pr.beforeSm)} 320w, ${a(pr.before)} 640w" sizes="(min-width: 960px) 560px, 100vw"` : ''} width="${pr.width}" height="${pr.height}" alt="${t.beforeAlt}${esc(pr.caption)}" ${eager ? '' : 'loading="lazy"'} decoding="async" draggable="false"${src(pr.before)} data-ba-before>
      </div>
      <span class="ba-tag ba-tag-before">${t.before}</span>
      <span class="ba-tag ba-tag-after">${t.after}</span>
      <div class="ba-line" aria-hidden="true"><span class="ba-knob">${icon('handle')}</span></div>
      <input class="ba-range" dir="ltr" type="range" min="0" max="100" value="50" aria-label="${t.compare}${esc(pr.caption)}" data-ba-range data-ba-idx="${idx}">
    </div>`;

  // ── Hero visual ───────────────────────────────────────────────────────────
  const heroPair = cmp ? cmp.pairs[cmp.heroIndex || 0] : null;
  const heroVisual = heroPair
    ? `<div class="hero-visual">
        <div class="hero-card" data-hero-ba>
          ${slider(heroPair, { size: 'lg', eager: true })}
          <div class="hero-card-foot">
            <p class="hero-cap"><span class="dot"></span><span data-hero-caption>${esc(heroPair.caption)}</span></p>
            <p class="hero-cap-src">${t.heroCapSrc}</p>
          </div>
        </div>
        <div class="thumbs" role="group" aria-label="${t.thumbs}">
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
      ? `<div class="progress" role="group" aria-label="${t.progress}">
          <div class="progress-row"><strong>${Number(p.raised).toLocaleString('en-US')} ${esc(p.currency)}</strong><span>${t.of} ${Number(p.target).toLocaleString('en-US')} ${esc(p.currency)}</span></div>
          <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${p.target}" aria-valuenow="${p.raised}"><span style="width:${Math.min(100, (p.raised / p.target) * 100).toFixed(1)}%"></span></div>
          <p class="progress-src">${t.per} <a href="${esc(p.sourceUrl)}" rel="noopener" target="_blank">${t.officialAnn}</a> ${esc(p.asOf)}</p>
        </div>`
      : '';

  // ── amount ────────────────────────────────────────────────────────────────
  const am = c.amount;
  const unit = am.unit;
  const qtyFor = (v) => (unit ? Math.round((v / unit.value) * 1000) / 1000 : null);
  const chips = am.officialAmounts.length
    ? `<fieldset class="amounts" data-amounts>
        <legend class="sr-only">${t.chooseAmount}</legend>
        ${am.officialAmounts
          .map(
            (x, i) => `<label class="amount">
              <input type="radio" name="amount" value="${x.value}" ${unit ? `data-qty="${qtyFor(x.value)}"` : ''} ${i === 0 ? 'checked' : ''}>
              <span class="amount-v">${x.value} <small>${t.cur}</small></span>
              <span class="amount-l">${esc(x.label)}</span>
              ${unit ? `<span class="amount-n">${t.qtyOnPay}${qtyFor(x.value)}</span>` : ''}
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
          <label for="calc-amount">${t.calcLabel}</label>
          <div class="calc-row">
            <input id="calc-amount" type="number" inputmode="numeric" min="1" step="1" placeholder="0" data-calc-input>
            <span class="calc-cur">${t.cur}</span>
          </div>
          <p class="calc-out" data-calc-out aria-live="polite">${t.calcHint}</p>
        </div>`
      : '';
  const unitExplainer = unit
    ? `<div class="unit">
        <p class="unit-eq"><span class="unit-shown" dir="rtl" lang="ar">${esc(unit.display)}</span><span class="unit-eqs" aria-hidden="true">=</span><span class="unit-real">${unit.value === 1 ? t.unitOne : `${unit.value} ${t.cur}`}</span></p>
        <p class="unit-txt">${t.unitTxt}${
          unit.value === 1
            ? t.unitTxt1
            : t.unitTxtN(unit.value)
        }</p>
      </div>`
    : '';

  const ld = baseLd(c, ctx);

  const pageConfig = {
    slug: c.slug,
    paymentUrl: payUrl,
    content: c.analytics,
    currency: 'OMR',
    unit: unit ? unit.value : null,
    addToCart: c.payment.addToCart && c.payment.addToCart.enabled ? c.payment.addToCart.productId : null,
    lang,
    i18n: { copy: t.copy, copied: t.copied, calcHint: t.calcHint, calcOut: t.calcOut, beforeAlt: t.beforeAlt, afterAlt: t.afterAlt, compare: t.compare },
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

  const main = `<main id="main">

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
        <p class="kicker">${t.kSupports}</p>
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
        <p class="kicker">${t.kImpact}</p>
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
      ${cmp.pairs.length > 3 ? `<button type="button" class="btn btn-ghost more-btn" data-more>${t.more(cmp.pairs.length - 3)}</button>` : ''}
      <p class="src">${esc(cmp.source)} · <a href="${esc(cmp.sourceUrl)}" target="_blank" rel="noopener" data-outbound="cv_pdf">${t.viewProfile}</a></p>
      <div class="inline-cta cta-block">${ctaBtn('impact', 'btn-lg')}</div>
    </div>
  </section>`
      : ''
  }

  <!-- ═════ WHY RENOVATION / THE NEED ═════ -->
  <section class="section need" data-section="need">
    <div class="wrap need-grid">
      <div class="need-copy">
        <p class="kicker">${t.kNeed}</p>
        <h2>${esc(c.need.title)}</h2>
        ${c.need.paragraphs.map((t) => `<p>${esc(t)}</p>`).join('\n        ')}
        <p class="src">${t.source}${esc(c.need.source)}</p>
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
        <p class="kicker">${t.kProcess}</p>
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
        <p class="kicker">${t.kEvidence}</p>
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
          ${e.link ? `<a class="ev-link" href="${esc(e.link)}" target="_blank" rel="noopener" data-outbound="evidence">${t.evSource}</a>` : ''}
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
        <p class="kicker kicker-light">${t.kGive}</p>
        <h2>${esc(am.title)}</h2>
        <ol class="give-steps">
          <li><span>1</span>${esc(t.step1(c.cta.primary))}</li>
          <li><span>2</span>${esc(t.step2(c.payment.label, unit, c.payment.labelAr))}</li>
          <li><span>3</span>${t.step3}</li>
        </ol>
      </div>
      <div class="give-card">
        ${chips}
        ${unitExplainer}
        ${calc}
        <div class="cta-block" id="cta-mid">
          ${ctaBtn('amount', 'btn-lg btn-block')}
          <p class="secure">${icon('lock')}<span>${esc(c.payment.domainNote)}${t.secureTail}</span></p>
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
        <p class="kicker">${t.kOther}</p>
        <h2>${t.otherTitle}</h2>
      </header>
      <div class="ways">
        <div class="way">
          <h3>${icon('bank')} ${t.bank}</h3>
          <ul class="accounts" role="list">
            ${oc.bankAccounts
              .map(
                (b) => `<li><span class="acc-bank">${esc(b.bank)}</span>
              <span class="acc-num" dir="ltr">${esc(b.number)}</span>
              <button type="button" class="copy" data-copy="${esc(b.number)}" data-copy-label="${esc(b.bank)}" aria-label="${t.copyAria}${esc(b.bank)}">${icon('copy')}<span>${t.copy}</span></button></li>`
              )
              .join('\n            ')}
          </ul>
          <p class="small">${t.accName}${esc(oc.accountName)}</p>
          <p class="small muted">${esc(c.otherWays.earmarkNote)}</p>
        </div>
        <div class="way">
          <h3>${icon('sms')} ${t.sms}</h3>
          <p>${t.smsText({ keyword: esc(oc.sms.keyword), number: esc(oc.sms.number), value: esc(oc.sms.value), operators: esc(oc.sms.operators) })}</p>
          <a class="btn btn-ghost btn-sm" href="sms:${esc(oc.sms.number)}?&body=${encodeURIComponent(oc.sms.keyword)}" data-contact="sms">${t.smsBtn}</a>
        </div>
        <div class="way">
          <h3>${icon('app')} ${t.app}</h3>
          <p>${t.appText}</p>
          <div class="row">
            <a class="btn btn-ghost btn-sm" href="${esc(o.contact.appAndroid)}" target="_blank" rel="noopener" data-contact="app_android">Android</a>
            <a class="btn btn-ghost btn-sm" href="${esc(o.contact.appIos)}" target="_blank" rel="noopener" data-contact="app_ios">iPhone</a>
          </div>
        </div>
      </div>
      <p class="src">${t.source}${esc(oc.source)}.</p>
    </div>
  </section>`
      : ''
  }

  <!-- ═════ WHY BAHJAH ═════ -->
  <section class="section why" data-section="why">
    <div class="wrap">
      <header class="sec-head">
        <p class="kicker">${t.kWhy}</p>
        <h2>${t.whyTitle}</h2>
      </header>
      <div class="facts">
        <div class="fact">
          <span class="fact-ico">${icon('shield')}</span>
          <h3>${t.fact1}</h3>
          <p>${esc(o.about.classification)}</p>
        </div>
        <div class="fact">
          <span class="fact-ico">${icon('check')}</span>
          <h3>${t.fact2}</h3>
          <p>${esc(o.about.founded)}</p>
        </div>
        <div class="fact">
          <span class="fact-ico">${icon('home')}</span>
          <h3>${t.fact3}</h3>
          <p>${esc(o.about.vision)}</p>
        </div>
      </div>
      <h3 class="awards-title">${t.awardsTitle}</h3>
      <ul class="awards" role="list">
        ${awards
          .map(
            (w) => `<li class="award">
          <span class="award-logo">${w.img ? `<img src="${a(w.img)}" width="64" height="64" alt="" loading="lazy" decoding="async"${src(w.img)}>` : icon('award')}</span>
          <strong>${esc(w.title)}</strong>
          <small>${esc(w.year)}${t.yearSfx}</small>
        </li>`
          )
          .join('\n        ')}
      </ul>
      <p class="src">${t.awardsSrc}</p>
    </div>
  </section>

  <!-- ═════ FAQ ═════ -->
  <section class="section faq" data-section="faq">
    <div class="wrap faq-grid">
      <header class="sec-head">
        <p class="kicker">${t.kFaq}</p>
        <h2>${t.faqTitle}</h2>
        <div class="contact-row">
          <a class="btn btn-ghost btn-sm" href="https://wa.me/${esc(o.contact.whatsapp)}" target="_blank" rel="noopener" data-contact="whatsapp">${icon('sms')} ${t.whatsapp}</a>
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
</main>`;

  const payCta = (loc, label) => ({ href: payUrl, attrs: `data-cta="${loc}" data-payment rel="noopener"`, label });
  return shell(c, ctx, {
    tracking, pageConfig, ld, main,
    preload: heroPair ? `<link rel="preload" as="image" href="${a(heroPair.before)}" fetchpriority="high">` : c.hero.image ? `<link rel="preload" as="image" href="${a(c.hero.image.src)}" fetchpriority="high">` : '',
    headerCta: payCta('header', c.cta.short),
    stickyCta: payCta('sticky', c.cta.primary),
  });
}
