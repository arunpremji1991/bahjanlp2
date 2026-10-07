// Renders the Waqf (sustainable giving) campaign page on the shared Bahjah
// landing-page design system (same look & feel as the renovation and orphan-
// sponsorship pages; only the content and objective differ).
// Flow: hero → impact → what is the waqf + donate card → how waqf works →
// waqf projects → companies & major donors → Why Bahjah → On the ground → FAQ → final CTA.
import { esc, icon, use, sectionHead, pageContext, baseLd, shell, trustSection, newsSection, faqSection, finalSection } from './shared.mjs';

// Page-specific UI strings (content lives in campaigns/waqf.mjs + campaigns/en/waqf.mjs)
const W = {
  ar: {
    yourGift: 'مساهمتك', choose: 'اختر مبلغًا', otherPh: 'اكتب المبلغ', cur: 'ر.ع.',
    bankTitle: 'أو بالتحويل البنكي',
    bankNote: 'بعد التحويل، أرسل إشعار التحويل عبر واتساب مع ذكر «وقف بهجة» لتخصيص مساهمتك للوقف.',
    sendReceipt: 'إرسال إشعار التحويل', email: 'البريد الإلكتروني', viewSource: 'عرض المصدر',
    howKicker: 'كيف يعمل الوقف؟',
  },
  en: {
    yourGift: 'Your gift', choose: 'Choose an amount', otherPh: 'Enter amount', cur: 'OMR',
    bankTitle: 'Or by bank transfer',
    bankNote: 'After transferring, send the receipt on WhatsApp mentioning "وقف بهجة" (Bahjah Waqf) so your gift is allocated to the waqf.',
    sendReceipt: 'Send the transfer receipt', email: 'Email', viewSource: 'View source',
    howKicker: 'How does a waqf work?',
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
    return `<a class="btn btn-primary ${extra}" href="${esc(d.href)}" ${d.attrs}>${isContact ? use('whatsapp') : ''} ${esc(label)}${isContact ? '' : ` ${use('arrow', 'flip')}`}</a>`;
  };
  const toGive = (loc, extra = '', label = c.cta.hero) => `<a class="btn btn-primary ${extra}" href="#give" data-cta="${loc}">${esc(label)} ${use('arrow', 'flip')}</a>`;

  const h = c.hero;
  const P = c.projects;
  const I = c.idea;

  const hero = `<section class="hero hero--card" id="hero" aria-labelledby="hero-title" data-section="hero">
  <div class="wrap hero-grid">
    <figure class="hero-media hero-media--plain">
      <span class="halo" aria-hidden="true"></span>
      <img src="${a(h.image.src)}" srcset="${a(h.image.srcSm)} 254w, ${a(h.image.src)} 508w" sizes="(min-width: 960px) 440px, 80vw" width="${h.image.width}" height="${h.image.height}" alt="${esc(h.image.alt)}" fetchpriority="high"${src(h.image.src)}>
    </figure>
    <div class="hero-copy">
      <span class="eyebrow">${use('repeat')} ${esc(h.eyebrow)}</span>
      <h1 id="hero-title">${esc(h.title)}${h.titleAccent ? ` <span class="accent">${esc(h.titleAccent)}</span>` : ''}</h1>
      <p class="lede">${esc(h.tagline)} ${esc(h.supporting)}</p>
      <div class="hero-cta cta-block" id="cta-hero">
        ${toGive('hero', 'btn-lg')}
        <a class="btn btn-ghost btn-lg" href="#about-waqf" data-cta="hero_secondary">${esc(c.cta.secondary)}</a>
      </div>
      ${h.note ? `<p class="hero-note">${use('shield')} ${esc(h.note)}</p>` : ''}
    </div>
  </div>
</section>`;

  const impact = `<section class="section" id="covers" aria-labelledby="covers-title" data-section="impact">
  <div class="wrap">
    ${sectionHead({ kicker: c.impact.kicker, title: c.impact.title, id: 'covers-title' })}
    <ul class="covers covers--3 reveal">
      ${c.impact.items.map((it) => `<li class="cover"><span class="cover-ico">${icon(it.icon)}</span><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></li>`).join('\n      ')}
    </ul>
  </div>
</section>`;

  const give = `<section class="section section-sand" id="give" aria-labelledby="need-title" data-section="amount">
  <div class="wrap need-grid">
    <article class="need-story reveal" id="about-waqf">
      <img src="${a('assets/img/waqf/sadaqa-640.webp')}" alt="" width="640" height="480" loading="lazy"${src('assets/img/waqf/sadaqa-640.webp')}>
      <div class="need-body">
        <span class="kicker">${esc(I.kicker)}</span>
        <h2 id="need-title">${esc(I.title)}</h2>
        <p><b>${esc(I.lead)}</b></p>
        <p>${esc(I.text)}</p>
        <blockquote class="hadith">«${esc(h.quote.text)}»<small>${esc(h.quote.cite)}</small></blockquote>
        <p class="src">${esc(I.source)}</p>
      </div>
    </article>
    <aside class="sponsor-card reveal" aria-labelledby="card-title">
      <h3 id="card-title">${esc(am.title)}</h3>
      <fieldset class="picks" data-w-amounts>
        <legend class="sr-only">${esc(w.choose)}</legend>
        ${am.presets.map((v) => `<label class="pick"><input type="radio" name="w-amount" value="${v}"${v === defaultAmt ? ' checked' : ''}><span><b>${v}</b> ${esc(w.cur)}</span></label>`).join('\n        ')}
        <label class="pick pick-other"><input type="radio" name="w-amount" value="other"><span>${esc(am.otherLabel)}</span></label>
      </fieldset>
      <div class="other-row" data-w-other hidden>
        <label class="sr-only" for="w-other-input">${esc(am.otherLabel)}</label>
        <input id="w-other-input" type="number" inputmode="numeric" min="1" step="1" placeholder="${esc(w.otherPh)}" data-w-other-input>
        <span>${esc(w.cur)}</span>
      </div>
      <p class="gift-summary" aria-live="polite">${esc(w.yourGift)}: <b data-w-summary>${defaultAmt} ${esc(w.cur)}</b></p>
      <div class="cta-block" id="cta-mid">
        ${donateBtn('amount', 'btn-lg btn-block')}
        <p class="secure">${use('lock')} ${esc(pay.domainNote)}</p>
      </div>
      ${isContact ? `<p class="card-note">${esc(am.note)}</p>` : ''}
      <div class="bank-box">
        <h4>${icon('bank')} ${esc(w.bankTitle)}</h4>
        <ul class="accounts">
          ${oc.bankAccounts.map((b) => `<li><span class="acc-bank">${esc(b.bank)}</span><span class="acc-num" dir="ltr">${esc(b.number)}</span><button type="button" class="copy-btn" data-copy="${esc(b.number)}" data-copy-label="${esc(b.bank)}" aria-label="${t.copyAria}${esc(b.bank)}">${icon('copy')}<span>${t.copy}</span></button></li>`).join('\n          ')}
        </ul>
        <p class="small">${t.accName}${esc(oc.accountName)}</p>
        <p class="small muted">${esc(w.bankNote)}</p>
        <a class="btn btn-ghost btn-sm" href="${esc(waLink(pay.whatsappMessageNoAmount))}" target="_blank" rel="noopener" data-contact="whatsapp_receipt">${use('whatsapp')} ${esc(w.sendReceipt)}</a>
      </div>
    </aside>
  </div>
</section>`;

  const howIcons = ['hands', 'building', 'seed'];
  const how = `<section class="section" id="how" aria-labelledby="how-title" data-section="idea">
  <div class="wrap">
    ${sectionHead({ kicker: w.howKicker, title: I.lead, id: 'how-title' })}
    <ol class="steps reveal">
      ${I.flow.map((f, i) => `<li class="step"><span class="step-ico">${i === 0 ? use('hands') : icon(howIcons[i])}</span><div><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div></li>`).join('\n      ')}
    </ol>
  </div>
</section>`;

  const projects = `<section class="section section-sand" id="projects" aria-labelledby="projects-title" data-section="projects">
  <div class="wrap">
    ${sectionHead({ kicker: P.kicker, title: P.title, text: P.intro, id: 'projects-title' })}
    <ul class="facts reveal">
      ${P.stats.map((s, i) => `<li class="fact">${use(['award', 'calendar', 'users', 'shield'][i % 4], 'fact-ico')}<b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join('\n      ')}
    </ul>
    <ul class="proj-grid reveal">
      ${P.items
        .map(
          (it) => `<li class="proj${it.featured ? ' is-featured' : ''}"><img src="${a(it.image.src)}" width="${it.image.width}" height="${it.image.height}" alt="${esc(it.image.alt)}" loading="lazy"${src(it.image.src)}><div><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p>${it.detail ? `<p class="proj-detail">${esc(it.detail)}</p>` : ''}</div></li>`
        )
        .join('\n      ')}
    </ul>
    <p class="src">${esc(P.source)} · <a href="${esc(P.sourceUrl)}" target="_blank" rel="noopener" data-outbound="cv_pdf">${esc(w.viewSource)}</a></p>
  </div>
</section>`;

  const C = c.corporate;
  const corporate = `<section class="section band" id="corporate" aria-labelledby="corp-title" data-section="corporate">
  <div class="wrap band-grid">
    <div class="reveal">
      <span class="kicker">${esc(C.kicker)}</span>
      <h2 id="corp-title">${esc(C.title)}</h2>
      <p>${esc(C.text)}</p>
    </div>
    <div class="band-box reveal">
      <ul class="checks">
        ${C.points.map((x) => `<li>${use('check')}<span>${esc(x)}</span></li>`).join('\n        ')}
      </ul>
      <div class="row">
        <a class="btn btn-light" href="${esc(waLink(pay.corporateMessage))}" target="_blank" rel="noopener" data-cta="corporate" data-lead="whatsapp_corporate">${use('whatsapp')} ${esc(C.cta)}</a>
        <a class="btn btn-outline-light" href="tel:+968${esc(o.contact.phones[0])}" data-contact="phone">${use('phone')} <span dir="ltr">${esc(o.contact.phones[0])}</span></a>
        <a class="btn btn-outline-light" href="mailto:${esc(o.contact.email)}" data-contact="email">${esc(w.email)}</a>
      </div>
    </div>
  </div>
</section>`;

  const main = `<main id="main">
${hero}
${impact}
${give}
${how}
${projects}
${corporate}
${trustSection(ctx)}
${newsSection(ctx)}
${faqSection(ctx, c.faq, { kicker: t.faqKicker, title: c.faqTitle || t.faqTitle })}
${finalSection(ctx, { title: c.final.title, text: c.final.text, cta: donateBtn('final', 'btn-light btn-lg'), bg: { src: 'assets/img/waqf/sadaqa-1024.webp', w: 1024, h: 768 } })}
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
    preload: `<link rel="preload" as="image" href="${a(h.image.src)}" fetchpriority="high">`,
    headerCta: toGiveCta('header', c.cta.short),
    stickyCta: { ...toGiveCta('sticky', c.cta.short), price: { value: `${defaultAmt} ${w.cur}`, note: w.yourGift } },
  });
}
