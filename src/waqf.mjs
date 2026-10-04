// Renders the Waqf (sustainable giving) campaign page: calmer, premium layout.
// Flow: Hero → what is the waqf → impact → waqf projects → amount + donate →
// companies & major donors → trust → FAQ → final CTA.
// Shared shell (head, header + language switch, footer, consent) lives in ./shared.mjs.
import { esc, icon, pageContext, baseLd, shell } from './shared.mjs';

// Page-specific UI strings (content lives in campaigns/waqf.mjs + campaigns/en/waqf.mjs)
const W = {
  ar: {
    yourGift: 'مساهمتك', choose: 'اختر مبلغًا', otherPh: 'اكتب المبلغ', cur: 'ر.ع.',
    bankTitle: 'أو بالتحويل البنكي',
    bankNote: 'بعد التحويل، أرسل إشعار التحويل عبر واتساب مع ذكر «وقف بهجة» لتخصيص مساهمتك للوقف.',
    sendReceipt: 'إرسال إشعار التحويل',
    kTrust: 'الثقة والشفافية', trustTitle: 'جهة موثوقة تخدم الأيتام منذ 2014',
    profile: 'تحميل الملف التعريفي للجمعية (PDF)', call: 'اتصال', email: 'البريد الإلكتروني',
    viewSource: 'عرض المصدر',
  },
  en: {
    yourGift: 'Your gift', choose: 'Choose an amount', otherPh: 'Enter amount', cur: 'OMR',
    bankTitle: 'Or by bank transfer',
    bankNote: 'After transferring, send the receipt on WhatsApp mentioning "وقف بهجة" (Bahjah Waqf) so your gift is allocated to the waqf.',
    sendReceipt: 'Send the transfer receipt',
    kTrust: 'Trust & transparency', trustTitle: 'A trusted society serving orphans since 2014',
    profile: "Download Bahjah's official profile (PDF)", call: 'Call', email: 'Email',
    viewSource: 'View source',
  },
};

export function renderWaqf(c, tracking, credits, base = '', opts = {}) {
  const ctx = pageContext(c, credits, base, opts);
  const { lang, t, o, a, src } = ctx;
  const w = W[lang];
  const oc = o.otherChannels;
  const pay = c.payment;
  const am = c.amount;
  const wa = o.contact.whatsapp;

  // ── Donation CTA: WhatsApp lead (contact mode) or official product page ────
  const waLink = (msg) => `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`;
  const fillAmt = (m, v) => m.replace(/\{amount\}/g, String(v));
  const defaultAmt = am.defaultPreset || am.presets[0];
  const isContact = pay.mode !== 'product';
  const donate = (loc) =>
    isContact
      ? { href: waLink(fillAmt(pay.whatsappMessage, defaultAmt)), attrs: `data-cta="${loc}" data-lead="whatsapp" target="_blank" rel="noopener"` }
      : { href: pay.url, attrs: `data-cta="${loc}" data-payment rel="noopener"` };
  const donateBtn = (loc, extra = '', label = c.cta.primary) => {
    const d = donate(loc);
    return `<a class="btn btn-primary ${extra}" href="${esc(d.href)}" ${d.attrs}>${isContact ? icon('whatsapp') : ''}<span>${esc(label)}</span>${isContact ? '' : icon('arrow', 'ico ico-dir')}</a>`;
  };
  const toGive = (loc, extra = '', label = c.cta.hero) =>
    `<a class="btn btn-primary ${extra}" href="#give" data-cta="${loc}"><span>${esc(label)}</span>${icon('down', 'ico')}</a>`;

  const h = c.hero;
  const awards = c.awardsToShow.map((k) => o.awards[k]).filter(Boolean);
  const trustChips = (h.trust || []).map((x, i) => `<li>${icon(['shield', 'seed', 'whatsapp'][i % 3])}<span>${esc(x)}</span></li>`).join('');
  const P = c.projects;

  const main = `<main id="main" class="waqf">

  <!-- ═════ HERO ═════ -->
  <section class="w-hero" data-section="hero">
    <div class="wrap w-hero-grid">
      <div class="w-hero-copy">
        <p class="w-eyebrow">${esc(h.eyebrow)}</p>
        <h1>${esc(h.title)}</h1>
        <p class="w-tagline">${esc(h.tagline)}</p>
        <p class="w-lede">${esc(h.supporting)}</p>
        <div class="hero-ctas cta-block" id="cta-hero">
          ${toGive('hero', 'btn-lg')}
          <a class="btn btn-lg btn-soft" href="#about-waqf" data-cta="hero_secondary">${esc(c.cta.secondary)}</a>
        </div>
        ${trustChips ? `<ul class="trust-chips" role="list">${trustChips}</ul>` : ''}
      </div>
      <figure class="w-hero-visual">
        <div class="w-halo" aria-hidden="true"></div>
        <img src="${a(h.image.src)}" srcset="${a(h.image.srcSm)} 254w, ${a(h.image.src)} 508w" sizes="(min-width: 960px) 460px, 80vw" width="${h.image.width}" height="${h.image.height}" alt="${esc(h.image.alt)}" fetchpriority="high" decoding="async"${src(h.image.src)}>
        <figcaption class="w-quote">
          <span class="w-quote-text">«${esc(h.quote.text)}»</span>
          <span class="w-quote-cite">${esc(h.quote.cite)}</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <!-- ═════ WHAT IS THE WAQF ═════ -->
  <section class="section w-idea" id="about-waqf" data-section="idea">
    <div class="wrap">
      <header class="sec-head w-center">
        <p class="kicker">${esc(c.idea.kicker)}</p>
        <h2>${esc(c.idea.title)}</h2>
        <p class="w-big">${esc(c.idea.lead)}</p>
        <p class="sec-intro">${esc(c.idea.text)}</p>
      </header>
      <ol class="w-flow">
        ${c.idea.flow
          .map(
            (f, i) => `<li class="w-flow-step">
          <span class="w-flow-ico">${icon(f.icon)}</span>
          <span class="w-flow-n">${i + 1}</span>
          <h3>${esc(f.title)}</h3>
          <p>${esc(f.text)}</p>
        </li>`
          )
          .join('\n        ')}
      </ol>
      <p class="src w-center">${esc(c.idea.source)}</p>
    </div>
  </section>

  <!-- ═════ IMPACT ═════ -->
  <section class="section w-impact" data-section="impact">
    <div class="wrap">
      <header class="sec-head w-center">
        <p class="kicker">${esc(c.impact.kicker)}</p>
        <h2>${esc(c.impact.title)}</h2>
      </header>
      <ul class="w-cards" role="list">
        ${c.impact.items
          .map(
            (it) => `<li class="w-card">
          <span class="w-card-ico">${icon(it.icon)}</span>
          <h3>${esc(it.title)}</h3>
          <p>${esc(it.text)}</p>
        </li>`
          )
          .join('\n        ')}
      </ul>
    </div>
  </section>

  <!-- ═════ WAQF PROJECTS ═════ -->
  <section class="section w-projects" data-section="projects">
    <div class="wrap">
      <header class="sec-head">
        <p class="kicker">${esc(P.kicker)}</p>
        <h2>${esc(P.title)}</h2>
        <p class="sec-intro">${esc(P.intro)}</p>
      </header>
      <dl class="w-stats">
        ${P.stats.map((s) => `<div class="w-stat"><dt>${esc(s.value)}</dt><dd>${esc(s.label)}</dd></div>`).join('\n        ')}
      </dl>
      <ul class="w-proj-grid" role="list">
        ${P.items
          .map(
            (it) => `<li class="w-proj${it.featured ? ' is-featured' : ''}">
          <img class="w-proj-img" src="${a(it.image.src)}" width="${it.image.width}" height="${it.image.height}" alt="${esc(it.image.alt)}" loading="lazy" decoding="async"${src(it.image.src)}>
          <div>
            <h3>${esc(it.title)}</h3>
            <p>${esc(it.text)}</p>
            ${it.detail ? `<p class="w-proj-detail">${esc(it.detail)}</p>` : ''}
          </div>
        </li>`
          )
          .join('\n        ')}
      </ul>
      <p class="src">${esc(P.source)} · <a href="${esc(P.sourceUrl)}" target="_blank" rel="noopener" data-outbound="cv_pdf">${esc(w.viewSource)}</a></p>
    </div>
  </section>

  <!-- ═════ AMOUNT + DONATE ═════ -->
  <section class="section w-give" id="give" data-section="amount">
    <div class="wrap w-give-wrap">
      <header class="sec-head w-center">
        <p class="kicker">${esc(am.kicker)}</p>
        <h2>${esc(am.title)}</h2>
      </header>
      <div class="w-give-card">
        <fieldset class="w-amounts" data-w-amounts>
          <legend class="sr-only">${esc(w.choose)}</legend>
          ${am.presets
            .map(
              (v) => `<label class="w-amount"><input type="radio" name="w-amount" value="${v}"${v === defaultAmt ? ' checked' : ''}><span><strong>${v}</strong> ${esc(w.cur)}</span></label>`
            )
            .join('\n          ')}
          <label class="w-amount w-amount-other"><input type="radio" name="w-amount" value="other"><span>${esc(am.otherLabel)}</span></label>
        </fieldset>
        <div class="w-other" data-w-other hidden>
          <label class="sr-only" for="w-other-input">${esc(am.otherLabel)}</label>
          <input id="w-other-input" type="number" inputmode="numeric" min="1" step="1" placeholder="${esc(w.otherPh)}" data-w-other-input>
          <span>${esc(w.cur)}</span>
        </div>
        <p class="w-summary" aria-live="polite">${esc(w.yourGift)}: <strong data-w-summary>${defaultAmt} ${esc(w.cur)}</strong></p>
        <div class="cta-block" id="cta-mid">
          ${donateBtn('amount', 'btn-lg btn-block')}
          <p class="secure">${icon('lock')}<span>${esc(pay.domainNote)}</span></p>
        </div>
        ${isContact ? `<p class="w-note">${esc(am.note)}</p>` : ''}

        <div class="w-bank">
          <h3>${icon('bank')} ${esc(w.bankTitle)}</h3>
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
          <p class="small muted">${esc(w.bankNote)}</p>
          <a class="btn btn-ghost btn-sm" href="${esc(waLink(pay.whatsappMessageNoAmount))}" target="_blank" rel="noopener" data-contact="whatsapp_receipt">${icon('whatsapp')} ${esc(w.sendReceipt)}</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ═════ COMPANIES & MAJOR DONORS ═════ -->
  <section class="section w-corp" data-section="corporate">
    <div class="wrap w-corp-grid">
      <div>
        <p class="kicker kicker-light">${esc(c.corporate.kicker)}</p>
        <h2>${esc(c.corporate.title)}</h2>
        <p class="w-corp-text">${esc(c.corporate.text)}</p>
      </div>
      <div class="w-corp-box">
        <ul class="w-points" role="list">
          ${c.corporate.points.map((x) => `<li>${icon('check')}<span>${esc(x)}</span></li>`).join('\n          ')}
        </ul>
        <div class="row">
          <a class="btn btn-light" href="${esc(waLink(pay.corporateMessage))}" target="_blank" rel="noopener" data-cta="corporate" data-lead="whatsapp_corporate">${icon('whatsapp')}<span>${esc(c.corporate.cta)}</span></a>
          <a class="btn btn-outline-light" href="tel:+968${esc(o.contact.phones[0])}" data-contact="phone">${icon('phone')}<span dir="ltr">${esc(o.contact.phones[0])}</span></a>
          <a class="btn btn-outline-light" href="mailto:${esc(o.contact.email)}" data-contact="email">${esc(w.email)}</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ═════ TRUST ═════ -->
  <section class="section why" data-section="trust">
    <div class="wrap">
      <header class="sec-head">
        <p class="kicker">${esc(w.kTrust)}</p>
        <h2>${esc(w.trustTitle)}</h2>
      </header>
      <div class="facts">
        <div class="fact"><span class="fact-ico">${icon('shield')}</span><h3>${t.fact1}</h3><p>${esc(o.about.classification)}</p></div>
        <div class="fact"><span class="fact-ico">${icon('check')}</span><h3>${t.fact2}</h3><p>${esc(o.about.founded)}</p></div>
        <div class="fact"><span class="fact-ico">${icon('seed')}</span><h3>${t.fact3}</h3><p>${esc(o.about.vision)}</p></div>
      </div>
      <h3 class="awards-title">${t.awardsTitle}</h3>
      <ul class="awards" role="list">
        ${awards
          .map(
            (aw) => `<li class="award">
          <span class="award-logo">${aw.img ? `<img src="${a(aw.img)}" width="64" height="64" alt="" loading="lazy" decoding="async"${src(aw.img)}>` : icon('award')}</span>
          <strong>${esc(aw.title)}</strong>
          <small>${esc(aw.year)}${t.yearSfx}</small>
        </li>`
          )
          .join('\n        ')}
      </ul>
      <p class="src">${t.awardsSrc}</p>
      <p class="w-profile"><a href="${esc(P.sourceUrl)}" target="_blank" rel="noopener" data-outbound="cv_pdf">${esc(w.profile)}</a></p>
    </div>
  </section>

  <!-- ═════ FAQ ═════ -->
  <section class="section faq" data-section="faq">
    <div class="wrap faq-grid">
      <header class="sec-head">
        <p class="kicker">${t.kFaq}</p>
        <h2>${t.faqTitle}</h2>
        <div class="contact-row">
          <a class="btn btn-ghost btn-sm" href="https://wa.me/${esc(wa)}" target="_blank" rel="noopener" data-contact="whatsapp">${icon('whatsapp')} ${t.whatsapp}</a>
          <a class="btn btn-ghost btn-sm" href="tel:+968${esc(o.contact.phones[0])}" data-contact="phone">${icon('phone')} <span dir="ltr">${esc(o.contact.phones[0])}</span></a>
        </div>
      </header>
      <div class="faq-list">
        ${c.faq
          .map(
            (f, i) => `<details${i === 0 ? ' open' : ''}>
          <summary>${esc(f.q)}</summary>
          <p>${esc(ctx.fillOrg(f.a))}</p>
        </details>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <!-- ═════ FINAL CTA ═════ -->
  <section class="final w-final" data-section="final">
    <img class="final-bg" src="${a('assets/img/waqf/sadaqa-1024.webp')}" srcset="${a('assets/img/waqf/sadaqa-640.webp')} 640w, ${a('assets/img/waqf/sadaqa-1024.webp')} 1024w" sizes="100vw" width="1024" height="768" alt="" loading="lazy" decoding="async"${src('assets/img/waqf/sadaqa-1024.webp')}>
    <div class="wrap final-in">
      <h2>${esc(c.final.title)}</h2>
      <p>${esc(c.final.text)}</p>
      <div class="cta-block" id="cta-final">
        ${donateBtn('final', 'btn-lg btn-light')}
      </div>
    </div>
  </section>
</main>`;

  const pageConfig = {
    slug: c.slug,
    paymentUrl: isContact ? null : pay.url,
    content: c.analytics,
    currency: 'OMR',
    lang,
    i18n: { copy: t.copy, copied: t.copied, cur: w.cur },
    lead: isContact ? { whatsapp: wa, message: pay.whatsappMessage, messageNoAmount: pay.whatsappMessageNoAmount, defaultAmount: defaultAmt } : null,
    tracking,
  };

  // Header + sticky buttons lead to the amount picker first (choose → give).
  const toGiveCta = (loc, label) => ({ href: '#give', attrs: `data-cta="${loc}"`, label });
  return shell(c, ctx, {
    tracking,
    pageConfig,
    ld: baseLd(c, ctx),
    main,
    bodyClass: 'theme-waqf',
    extraFonts: lang === 'ar' ? '&family=Amiri:wght@400;700' : '&family=Cormorant+Garamond:wght@600;700',
    preload: `<link rel="preload" as="image" href="${a(h.image.src)}" fetchpriority="high">`,
    headerCta: toGiveCta('header', c.cta.short),
    stickyCta: toGiveCta('sticky', c.cta.primary),
  });
}
