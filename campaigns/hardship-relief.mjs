// ═══════════════════════════════════════════════════════════════════════════
// CAMPAIGN: فك كربة  (Hardship Relief / urgent & exceptional aid)
// Example of reusing the template. Build: node build.mjs hardship-relief
//
// ⚠ BEFORE LAUNCH: the official "فك كربة" product page sometimes presents ONE
// specific case (archived Apr 2026 it showed "فك كربة – حالة 140"). Open the live
// payment URL, check which case it currently shows, and make sure the ad and this
// page do not describe a different case. Never copy a family's personal details
// into ads.
// ═══════════════════════════════════════════════════════════════════════════
import { org } from './_org.mjs';

export default {
  slug: 'hardship-relief',
  org,

  seo: {
    title: 'فك كربة أسر الأيتام | جمعية بهجة العمانية للأيتام',
    description:
      'ساهم عبر الموقع الرسمي لجمعية بهجة العمانية للأيتام في «فك كربة»: عون مادي سريع لأسر الأيتام في الظروف الطارئة، بعد دراسة كل حالة على حدة.',
    canonical: 'https://bahjah.org.om/campaign/hardship-relief/',
    ogImage: 'assets/img/og-renovation.jpg', // ← replace with a campaign-specific official image
    ogImageAlt: 'جمعية بهجة العمانية للأيتام',
  },

  analytics: { contentName: 'فك كربة', contentCategory: 'hardship_relief', contentId: 'bahjah-hardship-relief' },

  payment: {
    url: 'https://bahjah.org.om/wp/product/%D9%81%D9%83-%D9%83%D8%B1%D8%A8%D8%A9/',
    label: 'فك كربة',
    domainNote: 'يتم التبرع عبر الموقع الرسمي للجمعية bahjah.org.om',
    addToCart: { enabled: false, productId: null },
  },

  cta: { primary: 'ساهم الآن في فك كربة أسرة يتيم', short: 'ساهم في فك كربة' },

  hero: {
    eyebrow: 'فك كربة',
    title: 'عونٌ سريع لأسر الأيتام في وقت الشدة',
    // Official: "المساعدات العاجلة والاستثنائية" (website + CV)
    need: 'للحالات التي تحتاج لعون مادي سريع نظرًا لبعض الظروف التي تمر بها أسر الأيتام، وتتم عبر دراسة الحالات كلًّا على حدة ومن ثم عرضها على مجلس الإدارة.',
    needSource: 'صفحة «المساعدات العاجلة والاستثنائية» في موقع الجمعية',
    image: {
      src: 'assets/img/hardship-626.webp',
      width: 626,
      height: 417,
      alt: 'الصورة الرسمية لباب «فك كربة» في موقع جمعية بهجة',
      caption: 'الصورة المعتمدة لباب «فك كربة» في موقع الجمعية',
    },
    progress: { enabled: false, target: null, raised: null, currency: 'ر.ع.', asOf: '', sourceUrl: '' },
  },

  need: {
    title: 'متى تحتاج أسرة اليتيم إلى «فك كربة»؟',
    paragraphs: [
      'تمر بعض أسر الأيتام بظروف تستدعي عونًا ماديًا سريعًا. تدرس الجمعية كل حالة على حدة، ثم تعرضها على مجلس الإدارة.',
    ],
    quote: null,
    source: 'الملف التعريفي للجمعية: المساعدات العاجلة والاستثنائية',
  },

  supports: {
    title: 'كيف يُدار تبرعك؟',
    intro: 'يُوجَّه التبرع عبر باب «فك كربة» الرسمي في موقع الجمعية.',
    items: [
      { icon: 'home', title: 'عون مادي سريع', text: 'لأسر الأيتام التي تمر بظروف طارئة.' },
      { icon: 'wall', title: 'دراسة كل حالة على حدة', text: '' },
      { icon: 'roof', title: 'العرض على مجلس الإدارة', text: '' },
    ],
    itemsSource: 'بحسب وصف الجمعية للمساعدات العاجلة والاستثنائية.',
    note: 'لا تُنشر تفاصيل الحالات الشخصية في هذه الصفحة حفاظًا على كرامة الأسر.',
  },

  awardsToShow: ['iso', 'sultanQaboos', 'sanabel', 'ohrc', 'oq', 'bahrain', 'kuwait'],

  evidence: {
    title: 'من أعمال الجمعية',
    gallery: null,
    items: [
      {
        date: 'برنامج قائم',
        title: 'المساعدات العاجلة والاستثنائية',
        text: 'عون مادي سريع لأسر الأيتام بعد دراسة كل حالة وعرضها على مجلس الإدارة.',
        link: 'https://bahjah.org.om/wp/%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D8%B9%D8%AF%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D8%A7%D8%AC%D9%84%D8%A9-%D9%88%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%AB%D9%86%D8%A7%D8%A6%D9%8A%D8%A9/',
        image: { src: 'assets/img/aid-department-240.webp', width: 240, height: 232, alt: 'شعار قسم المساعدات – جمعية بهجة' },
      },
    ],
  },

  amount: {
    title: 'كم أتبرع؟',
    unit: { value: 1, display: '1,000 ر.ع.' }, // official product shows "1,000 ر.ع." = OMR 1
    officialAmounts: [],
    anyAmountNote: '',
    source: 'المصدر: صفحة «فك كربة» في موقع الجمعية.',
  },

  faq: [
    { q: 'أين يذهب تبرعي؟', a: 'يذهب تبرعك مباشرة إلى جمعية بهجة العمانية للأيتام عبر صفحة «فك كربة» على موقعها الرسمي.' },
    { q: 'ماذا تدعم هذه الحملة تحديدًا؟', a: 'الحالات التي تحتاج لعون مادي سريع نظرًا لظروف تمر بها أسر الأيتام، وتُدرس كل حالة على حدة ثم تُعرض على مجلس الإدارة.' },
    { q: 'كيف أتبرع؟', a: 'اضغط «ساهم الآن»، فتنتقل إلى صفحة «فك كربة» الرسمية. تظهر قيمة الوحدة «1,000 ر.ع.» وتعني ريالًا عمانيًا واحدًا، فاكتب مبلغ تبرعك بالريال في خانة الكمية، ثم اضغط «تبرع الآن» وأكمل الدفع.' },
    { q: 'ما طرق الدفع المتاحة؟', a: 'بحسب صفحة الأسئلة الشائعة في موقع الجمعية: «نقبل بطاقات الائتمان والخصم عبر بوابة بنك مسقط SmartPay».' },
    { q: 'هل توجد طريقة أخرى للمساهمة؟', a: 'نعم. التحويل إلى حسابات الجمعية البنكية، أو إرسال «تبرع» إلى الرقم المجاني 90021 للتبرع بريال (عمانتل وأوريدو)، أو عبر تطبيق بهجة.' },
    { q: 'كيف أتواصل مع جمعية بهجة؟', a: 'هاتف: {org.phones} · واتساب: {org.whatsapp} · البريد: {org.email} · العنوان: {org.address}' },
  ],

  otherWays: { show: true, earmarkNote: 'للتأكد من تخصيص التحويل البنكي لباب «فك كربة»، تواصل مع الجمعية بعد التحويل.' },

  final: {
    title: 'كن سببًا في فك كربة أسرة يتيم',
    text: 'مساهمتك، مهما كانت، تذهب إلى باب «فك كربة» في جمعية بهجة العمانية للأيتام.',
  },
};
