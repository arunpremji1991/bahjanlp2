// ═══════════════════════════════════════════════════════════════════════════
// CAMPAIGN: كفارات  (Kaffarat: oath & fasting expiation)
// Example with OFFICIAL fixed amounts (amount chips). Build: node build.mjs kaffarat
// Official product text (archived 7/2/2026): «كفارتك نجاتك.. نستقبل كفارات اليمين
// والصيام: كفارة اليمين (15) ريال، كفارة الصيام عن يوم واحد 1,5 (ريال ونصف) وعن
// شهر رمضان كاملاً (45) ريالاً». Product unit shows "1,500 ر.ع." = OMR 1.5.
// Hero image: the official كفارات image could not be retrieved at build time;
// add it to assets/img and set hero.image when available.
// ═══════════════════════════════════════════════════════════════════════════
import { org } from './_org.mjs';

export default {
  slug: 'kaffarat',
  org,

  seo: {
    title: 'أخرج كفارتك للأيتام | جمعية بهجة العمانية للأيتام',
    description: 'تستقبل جمعية بهجة العمانية للأيتام كفارات اليمين والصيام عبر موقعها الرسمي: كفارة اليمين 15 ر.ع.، وكفارة الصيام 1.5 ر.ع. عن اليوم و45 ر.ع. عن شهر رمضان كاملًا.',
    canonical: '', // set at build time from campaigns/_site.mjs
    ogImage: 'assets/img/og-renovation.jpg', // ← replace with a campaign-specific official image
    ogImageAlt: 'جمعية بهجة العمانية للأيتام',
  },

  analytics: { contentName: 'كفارات', contentCategory: 'kaffarat', contentId: 'bahjah-kaffarat' },

  payment: {
    url: 'https://bahjah.org.om/wp/product/%D9%83%D9%81%D8%A7%D8%B1%D8%A7%D8%AA/',
    label: 'كفارات',
    domainNote: 'يتم التبرع عبر الموقع الرسمي للجمعية bahjah.org.om',
    addToCart: { enabled: false, productId: null },
  },

  cta: { primary: 'أخرج كفارتك الآن مع بهجة', short: 'أخرج كفارتك' },

  hero: {
    eyebrow: 'كفارات',
    title: 'كفارتك نجاتك',
    need: 'تستقبل جمعية بهجة العمانية للأيتام كفارات اليمين والصيام عبر موقعها الرسمي.',
    needSource: 'صفحة «كفارات» في موقع الجمعية',
    image: null,
    progress: { enabled: false, target: null, raised: null, currency: 'ر.ع.', asOf: '', sourceUrl: '' },
  },

  need: {
    title: 'ما الكفارات التي تستقبلها الجمعية؟',
    paragraphs: [
      'كفارة اليمين: 15 ريالًا عمانيًا.',
      'كفارة الصيام: ريال ونصف عن اليوم الواحد، و45 ريالًا عن شهر رمضان كاملًا.',
    ],
    quote: null,
    source: 'صفحة «كفارات» في موقع الجمعية.',
  },

  supports: {
    title: 'أنواع الكفارات',
    intro: 'اختر نوع الكفارة كما تحددها الجمعية.',
    items: [
      { icon: 'check', title: 'كفارة اليمين', text: '15 ر.ع.' },
      { icon: 'check', title: 'كفارة الصيام عن يوم', text: '1.5 ر.ع.' },
      { icon: 'check', title: 'كفارة الصيام عن شهر رمضان', text: '45 ر.ع.' },
    ],
    itemsSource: 'القيم كما تعلنها الجمعية في صفحة «كفارات».',
    note: 'تُدفع الكفارة عبر صفحة الجمعية الرسمية.',
  },

  awardsToShow: ['iso', 'sultanQaboos', 'sanabel', 'ohrc', 'oq', 'bahrain', 'kuwait'],

  evidence: { title: '', gallery: null, items: [] },

  amount: {
    title: 'اختر كفارتك',
    unit: { value: 1.5, display: '1,500 ر.ع.' },
    officialAmounts: [
      { value: 15, label: 'كفارة اليمين' },
      { value: 1.5, label: 'كفارة الصيام عن يوم واحد' },
      { value: 45, label: 'كفارة الصيام عن شهر رمضان كاملًا' },
    ],
    source: 'المصدر: صفحة «كفارات» في موقع الجمعية.',
  },

  faq: [
    { q: 'أين تذهب كفارتي؟', a: 'تذهب مباشرة إلى جمعية بهجة العمانية للأيتام عبر صفحة «كفارات» على موقعها الرسمي.' },
    { q: 'كم قيمة الكفارة؟', a: 'بحسب صفحة الجمعية: كفارة اليمين 15 ريالًا، وكفارة الصيام ريال ونصف عن اليوم الواحد و45 ريالًا عن شهر رمضان كاملًا.' },
    { q: 'كيف أدفع؟', a: 'اضغط «أخرج كفارتك الآن»، فتنتقل إلى صفحة «كفارات» الرسمية. قيمة الوحدة هناك «1,500 ر.ع.» أي ريال ونصف (يوم صيام واحد). اكتب في خانة الكمية: 1 لكفارة يوم، أو 10 لكفارة اليمين، أو 30 لشهر رمضان كاملًا.' },
    { q: 'ما طرق الدفع المتاحة؟', a: 'بحسب صفحة الأسئلة الشائعة في موقع الجمعية: «نقبل بطاقات الائتمان والخصم عبر بوابة بنك مسقط SmartPay».' },
    { q: 'كيف أتواصل مع جمعية بهجة؟', a: 'هاتف: {org.phones} · واتساب: {org.whatsapp} · البريد: {org.email} · العنوان: {org.address}' },
  ],

  otherWays: { show: false, earmarkNote: '' },

  final: { title: 'أخرج كفارتك مع بهجة', text: 'عبر صفحة «كفارات» في الموقع الرسمي لجمعية بهجة العمانية للأيتام.' },

  sources: [
    'bahjah.org.om/wp/ — التعريف، تاريخ التأسيس، الجوائز، بيانات التواصل',
    'bahjah.org.om/wp/الاسئلة-الشائعة/ — طرق الدفع (بوابة بنك مسقط SmartPay)',
    'الملف التعريفي للجمعية (CV-Print-Proof.pdf) — البرامج، إحصائيات 2023، صور الأنشطة',
  ],
  disclaimer: 'صفحة هبوط توجّه الزوار إلى صفحة التبرع الرسمية للجمعية، ولا تُجري أي عملية دفع أو تخزّن بيانات مالية.',
  nav: [
    { href: '#covers', label: 'أنواع الكفارات' },
    { href: '#give', label: 'اختر كفارتك' },
    { href: '#trust', label: 'لماذا بهجة؟' },
    { href: '#faq', label: 'أسئلة شائعة' },
  ],
};
