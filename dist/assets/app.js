/* Bahjah campaign landing page: behaviour & measurement.
 * No dependencies. Reads window.BAHJAH_LP (injected at build time).
 *
 * Events (all pushed to window.dataLayer, and mirrored to Meta / GA4 / Google Ads
 * when their IDs are configured and consent is granted):
 *   view_content    → Meta ViewContent   | GA4 view_item
 *   cta_click       → Meta CTAClick (custom) | GA4 cta_click
 *   payment_click   → Meta InitiateCheckout | GA4 begin_checkout | Ads conversion (optional)
 *   contact_click / copy_bank_account / select_amount / outbound_click
 * Final conversion (Purchase/Donate) happens on bahjah.org.om; see
 * tracking/thank-you-snippet.html.
 */
(function () {
  'use strict';
  var LP = window.BAHJAH_LP || {};
  var T = LP.tracking || {};
  var C = LP.content || {};
  var CURRENCY = LP.currency || 'OMR';
  var I = LP.i18n || {};
  var LTR = document.documentElement.dir === 'ltr';
  window.dataLayer = window.dataLayer || [];

  /* ── Safe storage ───────────────────────────────────────────────────── */
  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };

  /* ── 1. UTM / click-ID persistence ──────────────────────────────────── */
  var ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
    'gclid', 'gbraid', 'wbraid', 'fbclid', 'ttclid', 'msclkid'];
  var ATTR_STORE = 'bahjah_lp_attribution';
  var TTL = (T.attributionDays || 30) * 864e5;

  var attribution = (function () {
    var qs = new URLSearchParams(location.search);
    var now = Date.now();
    var fresh = {};
    ATTR_KEYS.forEach(function (k) { var v = qs.get(k); if (v) fresh[k] = v.slice(0, 200); });
    var saved = store.get(ATTR_STORE);
    if (saved && now - saved.ts > TTL) saved = null;
    var has = Object.keys(fresh).length > 0;
    var rec = {
      first: (saved && saved.first) || (has ? fresh : {}),
      last: has ? fresh : (saved && saved.last) || {},
      landing: (saved && saved.landing) || location.pathname,
      ts: has || !saved ? now : saved.ts,
    };
    store.set(ATTR_STORE, rec);
    return rec;
  })();

  // Append last-touch params to every outbound donation link.
  function decorate(url) {
    try {
      var u = new URL(url, location.href);
      Object.keys(attribution.last).forEach(function (k) {
        if (!u.searchParams.has(k)) u.searchParams.set(k, attribution.last[k]);
      });
      return u.toString();
    } catch (e) { return url; }
  }
  document.querySelectorAll('a[data-payment]').forEach(function (a) { a.href = decorate(a.getAttribute('href')); });

  /* ── 2. Consent + tracker loading ───────────────────────────────────── */
  var CONSENT_KEY = 'bahjah_lp_consent';
  var loaded = false;

  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Google Consent Mode v2 defaults (denied until the visitor accepts).
  if (T.requireConsent) {
    gtag('consent', 'default', {
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
      analytics_storage: 'denied', wait_for_update: 500,
    });
  }

  function loadScript(src) {
    var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s);
  }

  function loadTrackers() {
    if (loaded) return; loaded = true;
    if (T.requireConsent) {
      gtag('consent', 'update', {
        ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted',
      });
    }
    // Google Tag Manager (recommended: configure Meta/GA4/Ads tags inside GTM
    // from the dataLayer events below, and leave the direct IDs empty).
    if (T.gtmId) {
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      loadScript('https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(T.gtmId));
    }
    // Direct gtag (GA4 and/or Google Ads)
    var gid = T.ga4Id || T.googleAdsId;
    if (gid) {
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gid));
      gtag('js', new Date());
      if (T.ga4Id) gtag('config', T.ga4Id, T.crossDomains && T.crossDomains.length ? { linker: { domains: T.crossDomains } } : {});
      if (T.googleAdsId) gtag('config', T.googleAdsId);
    }
    // Meta Pixel
    if (T.metaPixelId && !window.fbq) {
      /* eslint-disable */
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
      window.fbq('init', T.metaPixelId);
      window.fbq('track', 'PageView');
    }
    // Flush events that happened before consent.
    queue.splice(0).forEach(function (e) { sendToVendors(e.name, e.params); });
  }

  /* ── 3. Event API ───────────────────────────────────────────────────── */
  var queue = [];
  var base = function () {
    return {
      campaign_slug: LP.slug,
      content_id: C.contentId,
      content_name: C.contentName,
      content_category: C.contentCategory,
      utm_source: attribution.last.utm_source || '',
      utm_medium: attribution.last.utm_medium || '',
      utm_campaign: attribution.last.utm_campaign || '',
      utm_content: attribution.last.utm_content || '',
    };
  };

  function sendToVendors(name, p) {
    var fb = window.fbq, item = { item_id: C.contentId, item_name: C.contentName, item_category: C.contentCategory };
    var meta = { content_name: C.contentName, content_category: C.contentCategory, content_ids: [C.contentId], content_type: 'product' };
    if (p.value) { meta.value = p.value; meta.currency = CURRENCY; }
    var direct = !!(T.ga4Id || T.googleAdsId);
    switch (name) {
      case 'view_content':
        fb && fb('track', 'ViewContent', meta);
        direct && gtag('event', 'view_item', { currency: CURRENCY, items: [item] });
        break;
      case 'payment_click':
        fb && fb('track', 'InitiateCheckout', meta);
        if (direct) {
          gtag('event', 'begin_checkout', { currency: CURRENCY, value: p.value || undefined, items: [item], cta_location: p.cta_location });
          if (T.googleAdsId && T.googleAdsPaymentClickLabel) {
            gtag('event', 'conversion', { send_to: T.googleAdsId + '/' + T.googleAdsPaymentClickLabel, transport_type: 'beacon' });
          }
        }
        break;
      case 'lead_click': // contact-mode donation (e.g. WhatsApp to Bahjah for the waqf)
        fb && fb('track', 'Lead', { content_name: C.contentName, content_category: C.contentCategory, value: p.value || undefined, currency: CURRENCY });
        if (direct) {
          gtag('event', 'generate_lead', { currency: CURRENCY, value: p.value || undefined, method: p.method, cta_location: p.cta_location });
          if (T.googleAdsId && T.googleAdsLeadLabel) {
            gtag('event', 'conversion', { send_to: T.googleAdsId + '/' + T.googleAdsLeadLabel, value: p.value || undefined, currency: CURRENCY, transport_type: 'beacon' });
          }
        }
        break;
      case 'cta_click':
        fb && fb('trackCustom', 'CTAClick', { cta_location: p.cta_location, content_name: C.contentName });
        direct && gtag('event', 'cta_click', { cta_location: p.cta_location });
        break;
      case 'contact_click':
      case 'copy_bank_account':
        fb && fb('track', 'Contact', { content_name: C.contentName, method: p.method });
        direct && gtag('event', name, { method: p.method });
        break;
      default:
        direct && gtag('event', name, p);
    }
  }

  function track(name, params) {
    var p = Object.assign(base(), params || {});
    window.dataLayer.push(Object.assign({ event: name }, p));
    if (loaded) sendToVendors(name, p); else queue.push({ name: name, params: p });
    if (T.debug) console.info('[bahjah-lp]', name, p);
  }
  window.bahjahTrack = track;

  /* ── 4. Consent banner ──────────────────────────────────────────────── */
  (function () {
    if (!T.requireConsent) { loadTrackers(); return; }
    var choice = store.get(CONSENT_KEY);
    if (choice === 'granted') { loadTrackers(); return; }
    if (choice === 'denied') return;
    var el = document.querySelector('[data-consent]');
    if (!el) return;
    var close = function () { el.hidden = true; document.body.classList.remove('consent-open'); };
    el.hidden = false; document.body.classList.add('consent-open');
    el.querySelector('[data-consent-accept]').addEventListener('click', function () {
      store.set(CONSENT_KEY, 'granted'); close(); loadTrackers();
    });
    el.querySelector('[data-consent-decline]').addEventListener('click', function () {
      store.set(CONSENT_KEY, 'denied'); close();
    });
  })();

  /* ── 5. Page events ─────────────────────────────────────────────────── */
  track('view_content');

  var selectedAmount = null;
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest('a, button');
    if (!a) return;
    if (a.hasAttribute('data-cta')) {
      var loc = a.getAttribute('data-cta');
      track('cta_click', { cta_location: loc });
      if (a.hasAttribute('data-payment')) {
        track('payment_click', { cta_location: loc, value: selectedAmount || undefined, destination: LP.paymentUrl });
      }
      if (a.hasAttribute('data-lead')) {
        track('lead_click', { cta_location: loc, method: a.getAttribute('data-lead'), value: a.getAttribute('data-lead') === 'whatsapp' ? selectedAmount || undefined : undefined });
      }
    } else if (a.hasAttribute('data-contact')) {
      track('contact_click', { method: a.getAttribute('data-contact') });
    } else if (a.hasAttribute('data-outbound')) {
      track('outbound_click', { target: a.getAttribute('data-outbound') });
    }
  });

  /* ── 6. Official amount chips (only rendered when the config has them) ─ */
  var amounts = document.querySelector('[data-amounts]');
  if (amounts) {
    var sync = function () {
      var r = amounts.querySelector('input:checked');
      selectedAmount = r ? Number(r.value) : null;
    };
    amounts.addEventListener('change', function () {
      sync();
      track('select_amount', { value: selectedAmount, currency: CURRENCY });
    });
    sync();
  }

  /* ── 6a. Waqf amount picker → pre-filled WhatsApp message ───────────── */
  var wAmounts = document.querySelector('[data-w-amounts]');
  if (wAmounts && LP.lead) {
    var wOther = document.querySelector('[data-w-other]');
    var wInput = document.querySelector('[data-w-other-input]');
    var wSummary = document.querySelector('[data-w-summary]');
    var leadLinks = document.querySelectorAll('a[data-lead="whatsapp"]');
    var setLead = function (v) {
      selectedAmount = v > 0 ? v : null;
      var msg = selectedAmount ? LP.lead.message.replace(/\{amount\}/g, String(v)) : LP.lead.messageNoAmount;
      var href = 'https://wa.me/' + LP.lead.whatsapp + '?text=' + encodeURIComponent(msg);
      leadLinks.forEach(function (a) { a.href = href; });
      if (wSummary) wSummary.textContent = selectedAmount ? v + ' ' + (I.cur || '') : '—';
      var sv = document.querySelector('[data-sticky-value]');
      if (sv) sv.textContent = selectedAmount ? v + ' ' + (I.cur || '') : '—';
    };
    var wSync = function (fromUser) {
      var r = wAmounts.querySelector('input:checked');
      var isOther = r && r.value === 'other';
      if (wOther) wOther.hidden = !isOther;
      var v = isOther ? Math.floor(Number(wInput && wInput.value)) : Number(r && r.value);
      setLead(v);
      if (isOther && fromUser && wInput) wInput.focus();
      return v;
    };
    var wTimer;
    wAmounts.addEventListener('change', function () {
      var v = wSync(true);
      if (v > 0) track('select_amount', { value: v, currency: CURRENCY });
    });
    if (wInput) wInput.addEventListener('input', function () {
      var v = wSync(false);
      clearTimeout(wTimer);
      if (v > 0) wTimer = setTimeout(function () { track('select_amount', { value: v, currency: CURRENCY, method: 'custom' }); }, 800);
    });
    wSync(false);
  }

  /* ── 6b. Amount → quantity helper (unit-priced WooCommerce products) ─ */
  var calc = document.querySelector('[data-calc-input]');
  var calcOut = document.querySelector('[data-calc-out]');
  var payLinks = document.querySelectorAll('a[data-payment]');
  function setPaymentQuantity(qty) {
    if (!LP.addToCart) return; // pre-fill only when enabled in the campaign config
    payLinks.forEach(function (a) {
      try {
        var u = new URL(a.href);
        if (qty > 0) { u.searchParams.set('add-to-cart', LP.addToCart); u.searchParams.set('quantity', qty); }
        else { u.searchParams.delete('add-to-cart'); u.searchParams.delete('quantity'); }
        a.href = u.toString();
      } catch (e) {}
    });
  }
  if (calc && calcOut) {
    var calcTimer;
    calc.addEventListener('input', function () {
      var v = Math.floor(Number(calc.value));
      if (v > 0) {
        selectedAmount = v;
        calcOut.innerHTML = (I.calcOut || '{n} = {v}').replace('{n}', String(v / (LP.unit || 1))).replace('{v}', String(v));
        setPaymentQuantity(v / (LP.unit || 1));
        clearTimeout(calcTimer);
        calcTimer = setTimeout(function () { track('select_amount', { value: v, currency: CURRENCY, method: 'custom' }); }, 800);
      } else {
        selectedAmount = null;
        calcOut.textContent = I.calcHint || '';
        setPaymentQuantity(0);
      }
    });
  }
  if (amounts) {
    var syncQty = function () { var r = amounts.querySelector('input:checked'); if (r && r.dataset.qty) setPaymentQuantity(Number(r.dataset.qty)); };
    amounts.addEventListener('change', syncQty); syncQty();
  }

  /* ── 7. Copy bank account ───────────────────────────────────────────── */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var txt = btn.getAttribute('data-copy');
      var label = btn.querySelector('span');
      var done = function () {
        btn.classList.add('is-done'); if (label) label.textContent = I.copied || '✓';
        setTimeout(function () { btn.classList.remove('is-done'); if (label) label.textContent = I.copy || ''; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, done);
      else { var t = document.createElement('textarea'); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) {} t.remove(); done(); }
      track('copy_bank_account', { method: 'bank_transfer', bank: btn.getAttribute('data-copy-label') });
    });
  });

  /* ── 8. Sticky mobile CTA: visible when no other CTA is on screen ───── */
  var sticky = document.querySelector('[data-sticky]');
  var blocks = document.querySelectorAll('.cta-block');
  if (sticky && 'IntersectionObserver' in window && blocks.length) {
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); });
      var past = window.scrollY > 200;
      var show = past && visible.size === 0;
      sticky.classList.toggle('is-visible', show);
      sticky.setAttribute('aria-hidden', show ? 'false' : 'true');
      var link = sticky.querySelector('a'); if (link) link.tabIndex = show ? 0 : -1;
    });
    blocks.forEach(function (b) { io.observe(b); });
    window.addEventListener('scroll', function () {
      if (window.scrollY <= 200) { sticky.classList.remove('is-visible'); sticky.setAttribute('aria-hidden', 'true'); }
      else if (visible.size === 0) { sticky.classList.add('is-visible'); sticky.setAttribute('aria-hidden', 'false'); }
    }, { passive: true });
  }

  /* ── 9. Before / after sliders ──────────────────────────────────────── */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var interacted = new WeakSet();

  function setPos(el, pos) {
    pos = Math.max(0, Math.min(100, pos));
    el.style.setProperty('--pos', pos + '%');
    var r = el.querySelector('[data-ba-range]');
    if (r) r.value = Math.round(pos);
    var lo = LTR ? 'after' : 'before', hi = LTR ? 'before' : 'after';
    el.dataset.side = pos < 22 ? lo : pos > 78 ? hi : '';
  }
  function firstInteraction(el) {
    if (interacted.has(el)) return;
    interacted.add(el);
    track('before_after_interact', { slider: el.closest('[data-hero-ba]') ? 'hero' : 'gallery' });
  }

  function initBA(el) {
    var range = el.querySelector('[data-ba-range]');
    var active = false, startX = 0, startY = 0, decided = false, isTouch = false;
    var posFromEvent = function (e) {
      var rect = el.getBoundingClientRect();
      return ((e.clientX - rect.left) / rect.width) * 100;
    };
    el.addEventListener('pointerdown', function (e) {
      if (e.button && e.button !== 0) return;
      active = true; decided = false; isTouch = e.pointerType !== 'mouse';
      startX = e.clientX; startY = e.clientY;
      el._stopHint = true;
      if (!isTouch) { decided = true; el.classList.add('is-dragging'); setPos(el, posFromEvent(e)); firstInteraction(el); try { el.setPointerCapture(e.pointerId); } catch (_) {} }
    });
    el.addEventListener('pointermove', function (e) {
      if (!active) return;
      if (!decided) {
        var dx = Math.abs(e.clientX - startX), dy = Math.abs(e.clientY - startY);
        if (dx < 6 && dy < 6) return;
        if (dy > dx) { active = false; return; } // vertical scroll wins
        decided = true; el.classList.add('is-dragging'); firstInteraction(el);
        try { el.setPointerCapture(e.pointerId); } catch (_) {}
      }
      setPos(el, posFromEvent(e));
    });
    var end = function (e) {
      if (active && isTouch && !decided && e.type === 'pointerup') { setPos(el, posFromEvent(e)); firstInteraction(el); } // tap to jump
      active = false; el.classList.remove('is-dragging');
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('lostpointercapture', function () { active = false; el.classList.remove('is-dragging'); });
    if (range) range.addEventListener('input', function () { el._stopHint = true; setPos(el, Number(range.value)); firstInteraction(el); });
    setPos(el, 50);
  }
  document.querySelectorAll('[data-ba]').forEach(initBA);

  // Gentle one-time hint on the hero slider so visitors see it is interactive.
  var heroBA = document.querySelector('[data-hero-ba] [data-ba]');
  if (heroBA && !reduceMotion && 'requestAnimationFrame' in window) {
    setTimeout(function () {
      if (heroBA._stopHint) return;
      var t0 = null, dur = 1600;
      var step = function (t) {
        if (heroBA._stopHint) return;
        if (t0 === null) t0 = t;
        var k = Math.min(1, (t - t0) / dur);
        setPos(heroBA, 50 + Math.sin(k * Math.PI * 2) * 14 * (1 - k * 0.3));
        if (k < 1) requestAnimationFrame(step); else setPos(heroBA, 50);
      };
      requestAnimationFrame(step);
    }, 900);
  }

  // Hero thumbnails switch the pair shown in the hero slider.
  var pairs = LP.compare || [];
  var heroCap = document.querySelector('[data-hero-caption]');
  document.querySelectorAll('[data-thumb]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var i = Number(btn.getAttribute('data-thumb')), pr = pairs[i];
      if (!pr || !heroBA) return;
      var after = heroBA.querySelector('[data-ba-after]'), before = heroBA.querySelector('[data-ba-before]');
      after.srcset = pr.afterSm + ' 320w, ' + pr.after + ' 640w'; after.src = pr.after; after.alt = (I.afterAlt || '') + pr.caption;
      before.srcset = pr.beforeSm + ' 320w, ' + pr.before + ' 640w'; before.src = pr.before; before.alt = (I.beforeAlt || '') + pr.caption;
      var r = heroBA.querySelector('[data-ba-range]'); if (r) r.setAttribute('aria-label', (I.compare || '') + pr.caption);
      if (heroCap) heroCap.textContent = pr.caption;
      heroBA._stopHint = true; setPos(heroBA, 50);
      document.querySelectorAll('[data-thumb]').forEach(function (b) {
        var on = b === btn; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      track('before_after_select', { index: i, caption: pr.caption });
    });
  });

  var more = document.querySelector('[data-more]');
  if (more) more.addEventListener('click', function () {
    var g = document.querySelector('[data-impact-grid]'); if (g) g.classList.add('is-expanded');
    more.remove(); track('gallery_expand');
  });

  /* ── Language switch: keep UTMs / click IDs when changing language ──── */
  document.querySelectorAll('[data-lang-switch]').forEach(function (a) {
    a.addEventListener('click', function () {
      try {
        var u = new URL(a.getAttribute('href'), location.href);
        new URLSearchParams(location.search).forEach(function (v, k) { if (!u.searchParams.has(k)) u.searchParams.set(k, v); });
        a.href = u.toString();
      } catch (e) {}
      track('language_switch', { to: a.getAttribute('data-lang-switch') });
    });
  });

  /* ── 10. Header shadow + reveal on scroll ───────────────────────────── */
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
  // Reveal-on-scroll for elements marked .reveal (hidden by CSS only when <html> has .js).
  var reveals = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();
