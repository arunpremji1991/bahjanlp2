<?php
/**
 * Bahjah: final donation conversion tracking (WooCommerce "order received" page).
 *
 * The landing page can only measure the click to the payment page. The donation
 * itself completes on bahjah.org.om (WooCommerce + Bank Muscat SmartPay), so the
 * final conversion must fire THERE. Install this snippet on bahjah.org.om via the
 * "Code Snippets" / "WPCode" plugin (run everywhere, PHP), or in a child theme's
 * functions.php. Fill the IDs below (same as campaigns/_tracking.mjs).
 *
 * Fires once per paid order:
 *   dataLayer  → event "donation_complete" (for GTM)
 *   Meta Pixel → Purchase   (eventID = order id, for dedupe with Conversions API)
 *   GA4        → purchase   (transaction_id = order id)
 *   Google Ads → conversion (transaction_id = order id)
 * and attaches the landing-page attribution (UTMs, gclid, fbclid) stored in
 * localStorage by the landing page. This works when the landing page is hosted on
 * bahjah.org.om (same origin). Otherwise it falls back to URL params kept on the
 * payment link.
 *
 * Recommended in addition: Meta Conversions API (e.g. the official "Meta for
 * WooCommerce" plugin) using the same event_id, for iOS/ad-blocker resilience.
 */

if (!defined('ABSPATH')) exit;

const BAHJAH_GTM_ID          = '';  // 'GTM-XXXXXXX'  (if set, prefer configuring tags in GTM)
const BAHJAH_META_PIXEL_ID   = '';  // '123456789012345'
const BAHJAH_GA4_ID          = '';  // 'G-XXXXXXXXXX'
const BAHJAH_ADS_ID          = '';  // 'AW-XXXXXXXXXX'
const BAHJAH_ADS_DONATION_LABEL = ''; // conversion label for "Donation"

add_action('woocommerce_thankyou', function ($order_id) {
    if (!$order_id) return;
    $order = wc_get_order($order_id);
    if (!$order || $order->get_meta('_bahjah_conv_tracked')) return;
    if (!in_array($order->get_status(), ['processing', 'completed'], true)) return; // paid only

    $items = [];
    foreach ($order->get_items() as $item) {
        $items[] = [
            'item_id'   => (string) $item->get_product_id(),
            'item_name' => $item->get_name(),
            'quantity'  => (int) $item->get_quantity(),
            'price'     => (float) $order->get_item_total($item, true),
        ];
    }
    $payload = [
        'transaction_id' => (string) $order->get_order_number(),
        'value'          => (float) $order->get_total(),
        'currency'       => $order->get_currency() ?: 'OMR',
        'items'          => $items,
    ];
    $order->update_meta_data('_bahjah_conv_tracked', 1);
    $order->save();
    ?>
<script>
(function () {
  var p = <?php echo wp_json_encode($payload); ?>;
  var attr = {};
  try { attr = (JSON.parse(localStorage.getItem('bahjah_lp_attribution')) || {}).last || {}; } catch (e) {}
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({ event: 'donation_complete' }, p, attr));

  var consent = null;
  try { consent = JSON.parse(localStorage.getItem('bahjah_lp_consent')); } catch (e) {}
  if (consent === 'denied') return; // respect the landing-page choice

  <?php if (BAHJAH_META_PIXEL_ID) : ?>
  if (!window.fbq) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '<?php echo esc_js(BAHJAH_META_PIXEL_ID); ?>');
  }
  fbq('track', 'Purchase', {
    value: p.value, currency: p.currency, content_type: 'product',
    content_ids: p.items.map(function (i) { return i.item_id; }),
    contents: p.items.map(function (i) { return { id: i.item_id, quantity: i.quantity }; })
  }, { eventID: 'order_' + p.transaction_id });
  <?php endif; ?>

  <?php if (BAHJAH_GA4_ID || BAHJAH_ADS_ID) : ?>
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };
  var s = document.createElement('script'); s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=<?php echo esc_js(BAHJAH_GA4_ID ?: BAHJAH_ADS_ID); ?>';
  document.head.appendChild(s);
  gtag('js', new Date());
  <?php if (BAHJAH_GA4_ID) : ?>
  gtag('config', '<?php echo esc_js(BAHJAH_GA4_ID); ?>');
  gtag('event', 'purchase', { transaction_id: p.transaction_id, value: p.value, currency: p.currency, items: p.items });
  <?php endif; ?>
  <?php if (BAHJAH_ADS_ID && BAHJAH_ADS_DONATION_LABEL) : ?>
  gtag('config', '<?php echo esc_js(BAHJAH_ADS_ID); ?>');
  gtag('event', 'conversion', {
    send_to: '<?php echo esc_js(BAHJAH_ADS_ID . '/' . BAHJAH_ADS_DONATION_LABEL); ?>',
    value: p.value, currency: p.currency, transaction_id: p.transaction_id
  });
  <?php endif; ?>
  <?php endif; ?>
})();
</script>
    <?php
}, 20);
