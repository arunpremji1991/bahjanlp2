// Renders a project campaign page (renovation, hardship relief, kaffarat …) on the
// shared Bahjah landing-page design system. Section order mirrors the orphan-
// sponsorship page: hero → what you support → need + donate card → impact →
// how it works → documented work → other ways → Why Bahjah → On the ground →
// FAQ → final CTA. Shared frame + shared sections live in ./shared.mjs.
import { esc, icon, use, sectionHead, pageContext, baseLd, shell, trustSection, newsSection, faqSection, finalSection } from './shared.mjs';

export function render(c, tracking, credits, base = '', opts = {}) {
  const ctx = pageContext(c, credits, base, opts);
  const { lang, t, o, a, src } = ctx;


  const payUrl = c.payment.url;
  const ctaBtn = (loc, extra = '', label = c.cta.primary) =>
    `<a class="btn btn-primary ${extra}" href="${esc(payUrl)}" data-cta="${loc}" data-payment rel="noopener">${esc(label)} ${use('arrow', 'flip')}</a>`;

  // ── Before/after slider ───────────────────────────────────────────────────
  const cmp = c.compare;
  const slider = (pr, { size = 'lg', eager = false, idx = 0 } = {}) => `
    <div class="ba ba-${size}" data-ba style="--pos:50%">
      <img class="ba-img ba-after" src="${a(size === 'lg' ? pr.after : pr.afterSm)}" ${size === 'lg' ? `srcset="${a(pr.afterSm)} 320w, ${a(pr.after)} 640w" sizes="(min-width: 960px) 540px, 100vw"` : ''} width="${pr.width}" height="${pr.height}" alt="${t.afterAlt}${esc(pr.caption)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" draggable="false"${src(pr.after)} data-ba-after>
      <div class="ba-before-wrap">
        <img class="ba-img ba-before" src="${a(size === 'lg' ? pr.before : pr.beforeSm)}" ${size === 'lg' ? `srcset="${a(pr.beforeSm)} 320w, ${a(pr.before)} 640w" sizes="(min-width: 960px) 540px, 100vw"` : ''} width="${pr.width}" height="${pr.height}" alt="${t.beforeAlt}${esc(pr.caption)}" ${eager ? '' : 'loading="lazy"'} decoding="async" draggable="false"${src(pr.before)} data-ba-before>
      </div>
      <span class="ba-tag ba-tag-before">${t.before}</span>
      <span class="ba-tag ba-tag-after">${t.after}</span>
      <div class="ba-line" aria-hidden="true"><span class="ba-knob">${icon('handle')}</span></div>
      <input class="ba-range" dir="ltr" type="range" min="0" max="100" value="50" aria-label="${t.compare}${esc(pr.caption)}" data-ba-range data-ba-idx="${idx}">
    </div>`;

  // ── Hero ──────────────────────────────────────────────────────────────────
  const h = c.hero;
  const heroPair = cmp ? cmp.pairs[cmp.heroIndex || 0] : null;
  const heroMedia = heroPair
    ? `<div class="hero-media">
        <div class="hero-card" data-hero-ba>
          ${slider(heroPair, { size: 'lg', eager: true })}
          <div class="hero-card-foot">
            <p class="hero-cap" data-hero-caption>${esc(heroPair.caption)}</p>
            <p class="hero-cap-src">${t.heroCapSrc}</p>
          </div>
        </div>
        <div class="thumbs" role="group" aria-label="${t.thumbs}">
          ${cmp.pairs
            .map(
              (pr, i) => `<button type="button" class="thumb${i === (cmp.heroIndex || 0) ? ' is-active' : ''}" data-thumb="${i}" aria-label="${esc(pr.caption)}" aria-pressed="${i === (cmp.heroIndex || 0)}"><img src="${a(pr.afterSm)}" width="80" height="60" alt="" loading="lazy" decoding="async"></button>`
            )
            .join('')}
        </div>
      </div>`
    : h.image
      ? `<figure class="hero-media"><img src="${a(h.image.src)}" width="${h.image.width}" height="${h.image.height}" alt="${esc(h.image.alt)}" fetchpriority="high"${src(h.image.src)}></figure>`
      : '';

  const p = h.progress;
  const progress =
    p && p.enabled && p.target && p.raised != null && p.sourceUrl
      ? `<div class="progress" role="group" aria-label="${t.progress}">
          <div class="progress-row"><strong>${Number(p.raised).toLocaleString('en-US')} ${esc(p.currency)}</strong><span>${t.of} ${Number(p.target).toLocaleString('en-US')} ${esc(p.currency)}</span></div>
          <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${p.target}" aria-valuenow="${p.raised}"><span style="width:${Math.min(100, (p.raised / p.target) * 100).toFixed(1)}%"></span></div>
          <p class="progress-src">${t.per} <a href="${esc(p.sourceUrl)}" rel="noopener" target="_blank">${t.officialAnn}</a> ${esc(p.asOf)}</p>
        </div>`
      : '';

  const hero = `<section class="hero${heroPair ? ' hero--card' : ''}" id="hero" aria-labelledby="hero-title" data-section="hero">
  <div class="wrap hero-grid">
    ${heroMedia}
    <div class="hero-copy">
      <span class="eyebrow">${use('shield')} ${esc(h.eyebrow)}</span>
      <h1 id="hero-title">${esc(h.title)}${h.titleAccent ? ` <span class="accent">${esc(h.titleAccent)}</span>` : ''}</h1>
      <p class="lede">${h.supportingLines ? h.supportingLines.map(esc).join('<br>') : esc(h.supporting || h.need)}</p>
      ${progress}
      <div class="hero-cta cta-block" id="cta-hero">
        ${h.priceTag ? `<p class="price-tag"><b>${esc(h.priceTag.value)}</b><span>${esc(h.priceTag.text)}</span></p>` : ''}
        ${ctaBtn('hero', 'btn-lg', c.cta.hero || c.cta.primary)}
        ${cmp && c.cta.secondary ? `<a class="btn btn-ghost btn-lg" href="#impact" data-cta="hero_secondary">${esc(c.cta.secondary)}</a>` : ''}
      </div>
      ${h.note ? `<p class="hero-note">${use('shield')} ${esc(h.note)}</p>` : ''}
    </div>
  </div>
</section>`;

  // ── What your donation supports ───────────────────────────────────────────
  const S = c.supports;
  const supports = `<section class="section" id="covers" aria-labelledby="covers-title" data-section="supports">
  <div class="wrap">
    ${sectionHead({ kicker: t.kSupports, title: S.title, text: S.intro, id: 'covers-title' })}
    <ul class="covers covers--${[3, 4, 6].includes(S.items.length) ? S.items.length : 5} reveal">
      ${S.items.map((s) => `<li class="cover"><span class="cover-ico">${icon(s.icon)}</span><h3>${esc(s.title)}</h3>${s.text ? `<p>${esc(s.text)}</p>` : ''}</li>`).join('\n      ')}
    </ul>
    <p class="covers-note">${esc([S.itemsSource, S.note].filter(Boolean).join(' '))}</p>
  </div>
</section>`;

  // ── Optional story sections (content only; built from existing components) ──
  const HM = c.homeMeaning;
  const homeMeaning = HM
    ? `<section class="section section-sand" id="home-meaning" aria-labelledby="home-title" data-section="home_meaning">
  <div class="wrap">
    ${sectionHead({ kicker: HM.kicker, title: HM.title, id: 'home-title' })}
    <div class="prose prose-center reveal">
      ${HM.lines.map((x) => `<p${x.strong ? ' class="strong"' : ''}>${esc(x.text || x)}</p>`).join('\n      ')}
    </div>
  </div>
</section>`
    : '';
  const M = c.mercy;
  const mercy = M
    ? `<section class="section section-mercy" id="mercy" aria-labelledby="mercy-title" data-section="mercy">
  <div class="wrap">
    ${sectionHead({ kicker: M.kicker, title: M.title, id: 'mercy-title' })}
    <figure class="verse reveal">
      <blockquote lang="ar" dir="rtl">${esc(M.verse)}</blockquote>
      <figcaption>${esc(M.ref)}</figcaption>
    </figure>
    <div class="prose prose-center reveal">
      ${M.lines.map((x) => `<p${x.strong ? ' class="strong"' : ''}>${esc(x.text || x)}</p>`).join('\n      ')}
    </div>
    ${M.cta ? `<div class="section-cta cta-block">${ctaBtn('mercy', 'btn-lg', M.cta)}</div>` : ''}
  </div>
</section>`
    : '';

  // ── Need + donate card ────────────────────────────────────────────────────
  const am = c.amount;
  const unit = am.unit;
  const qtyFor = (v) => (unit ? Math.round((v / unit.value) * 1000) / 1000 : null);
  const chips = am.officialAmounts.length
    ? `<fieldset class="amounts" data-amounts>
        <legend class="sr-only">${t.chooseAmount}</legend>
        ${am.officialAmounts
          .map(
            (x, i) => `<label class="amount"><input type="radio" name="amount" value="${x.value}" ${unit ? `data-qty="${qtyFor(x.value)}"` : ''} ${i === 0 ? 'checked' : ''}><span class="amount-v">${x.value} <small>${t.cur}</small></span><span class="amount-l">${esc(x.label)}</span>${unit ? `<span class="amount-n">${t.qtyOnPay}${qtyFor(x.value)}</span>` : ''}</label>`
          )
          .join('')}
      </fieldset>`
    : '';
  const unitBox = unit
    ? `<div class="unit">
        <p class="unit-eq"><span class="unit-shown" dir="rtl" lang="ar">${esc(unit.display)}</span><span class="unit-eqs" aria-hidden="true">=</span><span>${unit.value === 1 ? t.unitOne : `${unit.value} ${t.cur}`}</span></p>
        <p class="unit-txt">${t.unitTxt}${unit.value === 1 ? t.unitTxt1 : t.unitTxtN(unit.value)}</p>
      </div>`
    : '';
  const calc =
    unit && !am.officialAmounts.length && unit.value === 1
      ? `<div class="calc" data-calc>
          <label for="calc-amount">${t.calcLabel}</label>
          <div class="calc-row"><input id="calc-amount" type="number" inputmode="numeric" min="1" step="1" placeholder="0" data-calc-input><span class="calc-cur">${t.cur}</span></div>
          <p class="calc-out" data-calc-out aria-live="polite">${t.calcHint}</p>
        </div>`
      : '';
  const N = c.need;
  const needImg = c.needImage || (heroPair ? { src: cmp.pairs[cmp.pairs.length - 1].after, width: 640, height: 480, alt: '' } : null);
  const need = `<section class="section section-sand" id="give" aria-labelledby="need-title" data-section="need">
  <div class="wrap need-grid">
    <article class="need-story reveal">
      ${needImg ? `<img src="${a(needImg.src)}" alt="${esc(needImg.alt || '')}" width="${needImg.width}" height="${needImg.height}" loading="lazy"${src(needImg.src)}>` : ''}
      <div class="need-body">
        <span class="kicker">${t.kNeed}</span>
        <h2 id="need-title">${esc(N.title)}</h2>
        ${N.paragraphs.map((x) => `<p>${esc(x)}</p>`).join('\n        ')}
        ${N.quote ? `<blockquote class="hadith">${esc(N.quote.text)}<small>${esc(N.quote.cite)}</small></blockquote>` : ''}
        <p class="src">${t.source}${esc(N.source)}</p>
      </div>
    </article>
    <aside class="sponsor-card reveal" aria-labelledby="card-title">
      <h3 id="card-title">${esc(am.title)}</h3>
      ${am.introLines ? `<div class="card-intro">${am.introLines.map((x) => `<p>${esc(x)}</p>`).join('')}</div>` : ''}
      <div class="plan-opt"><b>${use('hands')} ${esc(c.payment.label)}</b>${unit ? `<span class="plan-amount">${unit.value} <small>${t.cur}</small></span>` : ''}</div>
      ${chips}
      ${am.anyAmountNote && !am.officialAmounts.length ? `<p class="hadith">${esc(am.anyAmountNote)}</p>` : ''}
      ${unitBox}
      ${calc}
      <div class="cta-block" id="cta-mid">
        ${ctaBtn('amount', 'btn-lg btn-block', am.cta || c.cta.primary)}
        <p class="secure">${use('lock')} ${esc(c.payment.domainNote)}${t.secureTail}</p>
      </div>
      ${c.otherWays.show ? `<p class="alt-link"><a href="#other-ways" data-outbound="other_ways">${t.otherTitle} ↓</a></p>` : ''}
    </aside>
  </div>
</section>`;

  // ── Impact gallery (before/after) ─────────────────────────────────────────
  const impact = cmp
    ? `<section class="section" id="impact" aria-labelledby="impact-title" data-section="impact">
  <div class="wrap">
    ${sectionHead({ kicker: t.kImpact, title: cmp.title, text: cmp.introLines || cmp.intro, id: 'impact-title' })}
    <ul class="ba-grid reveal" data-impact-grid>
      ${cmp.pairs.map((pr, i) => `<li class="ba-card">${slider(pr, { size: 'sm', idx: i })}<p>${esc(pr.caption)}</p></li>`).join('\n      ')}
    </ul>
    ${cmp.pairs.length > 3 ? `<button type="button" class="btn btn-ghost more-btn" data-more>${t.more(cmp.pairs.length - 3)}</button>` : ''}
    <p class="src">${esc(cmp.source)} · <a href="${esc(cmp.sourceUrl)}" target="_blank" rel="noopener" data-outbound="cv_pdf">${t.viewProfile}</a></p>
    <div class="section-cta cta-block">${ctaBtn('impact', 'btn-lg')}</div>
  </div>
</section>`
    : '';

  // ── How it works ──────────────────────────────────────────────────────────
  const stepIcons = ['card', 'users', 'check', 'hands'];
  const how = c.process
    ? `<section class="section${cmp ? ' section-sand' : ''}" id="how" aria-labelledby="how-title" data-section="process">
  <div class="wrap">
    ${sectionHead({ kicker: c.process.kicker || t.kProcess, title: c.process.title, id: 'how-title' })}
    <ol class="steps${c.process.steps.length === 4 ? ' steps--4' : ''} reveal">
      ${c.process.steps.map((s, i) => `<li class="step"><span class="step-ico">${use(s.icon || stepIcons[i % stepIcons.length])}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></li>`).join('\n      ')}
    </ol>
    ${c.process.source ? `<p class="src">${esc(c.process.source)}</p>` : ''}
  </div>
</section>`
    : '';

  // ── Documented work ───────────────────────────────────────────────────────
  const ev = c.evidence;
  const evidence =
    ev && ev.items && ev.items.length
      ? `<section class="section" id="evidence" aria-labelledby="evidence-title" data-section="evidence">
  <div class="wrap">
    ${sectionHead({ kicker: ev.kicker || t.kEvidence, title: ev.title, id: 'evidence-title' })}
    ${ev.intro ? `<div class="prose reveal">
      ${ev.intro.map((x) => `<p>${esc(x)}</p>`).join('\n      ')}
      ${ev.bullets ? `<ul class="checks">${ev.bullets.map((x) => `<li>${use('check')}<span>${esc(x)}</span></li>`).join('')}</ul>` : ''}
      ${(ev.outro || []).map((x) => `<p>${esc(x)}</p>`).join('\n      ')}
      ${ev.introLink ? `<p class="src"><a href="${esc(ev.introLink)}" target="_blank" rel="noopener" data-outbound="evidence">${t.evSourceArchived}</a></p>` : ''}
    </div>` : ''}
    <ul class="ev-grid reveal">
      ${ev.items
        .map(
          (e) => `<li class="ev">
        <div class="ev-top">${e.image ? `<img class="ev-img" src="${a(e.image.src)}" width="${e.image.width}" height="${e.image.height}" alt="${esc(e.image.alt)}" loading="lazy"${src(e.image.src)}>` : `<span class="ev-img ev-img-ph">${icon(e.icon || 'roof')}</span>`}<p class="ev-date">${esc(e.date)}</p></div>
        <h3>${esc(e.title)}</h3>
        <p>${esc(e.text)}</p>
        ${e.note ? `<p class="ev-note">${esc(e.note)}</p>` : ''}
        ${e.link ? `<a class="ev-link" href="${esc(e.link)}" target="_blank" rel="noopener" data-outbound="evidence">${e.linkArchived ? t.evSourceArchived : t.evSource}</a>` : ''}
      </li>`
        )
        .join('\n      ')}
    </ul>
  </div>
</section>`
      : '';

  // ── Other ways to give ────────────────────────────────────────────────────
  const oc = o.otherChannels;
  const other = c.otherWays.show
    ? `<section class="section section-sand" id="other-ways" aria-labelledby="other-title" data-section="other_ways">
  <div class="wrap">
    ${sectionHead({ kicker: t.kOther, title: c.otherWays.title || t.otherTitle, id: 'other-title' })}
    <div class="ways reveal">
      <div class="way">
        <h3>${icon('bank')} ${t.bank}</h3>
        <ul class="accounts">
          ${oc.bankAccounts.map((b) => `<li><span class="acc-bank">${esc(b.bank)}</span><span class="acc-num" dir="ltr">${esc(b.number)}</span><button type="button" class="copy-btn" data-copy="${esc(b.number)}" data-copy-label="${esc(b.bank)}" aria-label="${t.copyAria}${esc(b.bank)}">${icon('copy')}<span>${t.copy}</span></button></li>`).join('\n          ')}
        </ul>
        <p class="small">${t.accName}${esc(oc.accountName)}</p>
        <p class="small muted">${esc(c.otherWays.earmarkNote)}</p>
      </div>
      <div class="way">
        <h3>${use('phone')} ${t.sms}</h3>
        <p>${t.smsText({ keyword: esc(oc.sms.keyword), number: esc(oc.sms.number), value: esc(oc.sms.value), operators: esc(oc.sms.operators) })}</p>
        <a class="btn btn-ghost btn-sm" href="sms:${esc(oc.sms.number)}?&body=${encodeURIComponent(oc.sms.keyword)}" data-contact="sms">${t.smsBtn}</a>
      </div>
      <div class="way">
        <h3>${use('app')} ${t.app}</h3>
        <p>${t.appText}</p>
        <p class="app-links">
          <a class="btn btn-ghost btn-sm" href="${esc(o.contact.appIos)}" target="_blank" rel="noopener" data-contact="app_ios">${use('app')} App Store</a>
          <a class="btn btn-ghost btn-sm" href="${esc(o.contact.appAndroid)}" target="_blank" rel="noopener" data-contact="app_android">${use('app')} Google Play</a>
        </p>
      </div>
    </div>
    <p class="src">${t.source}${esc(oc.source)}.</p>
  </div>
</section>`
    : '';

  const finalBg = heroPair
    ? { src: cmp.pairs[cmp.pairs.length - 1].after, w: 640, h: 480 }
    : { src: 'assets/img/shared/photo-event.webp', w: 689, h: 331 };

  const main = `<main id="main">
${hero}
${homeMeaning}
${supports}
${mercy}
${need}
${impact}
${how}
${evidence}
${other}
${trustSection(ctx, c.trust)}
${newsSection(ctx)}
${faqSection(ctx, c.faq, { kicker: t.faqKicker, title: c.faqTitle || t.faqTitle })}
${finalSection(ctx, { title: c.final.title, text: c.final.lines || c.final.text, note: c.final.note, cta: ctaBtn('final', 'btn-light btn-lg'), bg: finalBg })}
</main>`;

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
    compare: cmp ? cmp.pairs.map((pr) => ({ caption: pr.caption, before: a(pr.before), after: a(pr.after), beforeSm: a(pr.beforeSm), afterSm: a(pr.afterSm) })) : null,
  };

  const payCta = (loc, label) => ({ href: payUrl, attrs: `data-cta="${loc}" data-payment rel="noopener"`, label });
  return shell(c, ctx, {
    tracking,
    pageConfig,
    ld: baseLd(c, ctx),
    main,
    preload: heroPair ? `<link rel="preload" as="image" href="${a(heroPair.before)}" fetchpriority="high">` : h.image ? `<link rel="preload" as="image" href="${a(h.image.src)}" fetchpriority="high">` : '',
    // Quran verse: Amiri, subset to the verse's characters only (tiny download)
    extraHead: c.mercy ? `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&text=${encodeURIComponent(c.mercy.verse)}&display=swap">` : '',
    headerCta: payCta('header', c.cta.short),
    stickyCta: { ...payCta('sticky', c.cta.short), price: c.sticky || null },
  });
}
