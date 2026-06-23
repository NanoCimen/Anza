/**
 * Lightweight, consent-aware analytics loader.
 *
 * Pixels load only when their ID is provided via Vite env vars AND the visitor
 * has accepted analytics cookies (localStorage `anza_cookie_consent === 'all'`).
 * Set any of these in your build environment (.env / host dashboard):
 *   VITE_GA_ID            e.g. G-XXXXXXXXXX   (Google Analytics 4)
 *   VITE_META_PIXEL_ID    e.g. 1234567890     (Meta / Facebook Pixel)
 *   VITE_TIKTOK_PIXEL_ID  e.g. CXXXXXXXXXXXX  (TikTok Pixel)
 */

const GA_ID = import.meta.env.VITE_GA_ID;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const TIKTOK_PIXEL_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID;

let initialized = false;

export function hasAnalyticsConsent() {
  try {
    return window.localStorage.getItem('anza_cookie_consent') === 'all';
  } catch {
    return false;
  }
}

function loadGA(id) {
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id);
}

function loadMetaPixel(id) {
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq('init', id);
  window.fbq('track', 'PageView');
}

function loadTikTokPixel(id) {
  /* eslint-disable */
  !(function (w, d, t) {
    w.TiktokAnalyticsObject = t;
    var ttq = (w[t] = w[t] || []);
    ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'];
    ttq.setAndDefer = function (e, n) {
      e[n] = function () {
        e.push([n].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
    ttq.load = function (e) {
      var n = 'https://analytics.tiktok.com/i18n/pixel/events.js';
      ttq._i = ttq._i || {};
      ttq._i[e] = [];
      ttq._i[e]._u = n;
      ttq._t = ttq._t || {};
      ttq._t[e] = +new Date();
      var o = d.createElement('script');
      o.type = 'text/javascript';
      o.async = !0;
      o.src = n + '?sdkid=' + e + '&lib=' + t;
      var a = d.getElementsByTagName('script')[0];
      a.parentNode.insertBefore(o, a);
    };
    ttq.load(id);
    ttq.page();
  })(window, document, 'ttq');
  /* eslint-enable */
}

/** Load any configured pixels once, if the visitor consented. */
export function initAnalytics() {
  if (initialized || !hasAnalyticsConsent()) return;
  initialized = true;
  if (GA_ID) loadGA(GA_ID);
  if (META_PIXEL_ID) loadMetaPixel(META_PIXEL_ID);
  if (TIKTOK_PIXEL_ID) loadTikTokPixel(TIKTOK_PIXEL_ID);
}

/** Fire a waitlist conversion across whichever pixels are loaded. */
export function trackWaitlistSignup({ audience } = {}) {
  if (!initialized) return;
  if (window.gtag) window.gtag('event', 'sign_up', { method: 'waitlist', audience });
  if (window.fbq) window.fbq('track', 'Lead', { content_category: audience });
  if (window.ttq) window.ttq.track('SubmitForm', { content_type: audience });
}
