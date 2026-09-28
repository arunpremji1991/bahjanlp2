// ═══════════════════════════════════════════════════════════════════════════
// CAMPAIGN: بناء وترميم منازل الأيتام  (Building & Renovation)
// ---------------------------------------------------------------------------
// Every fact below is taken from an official Bahjah source. The `source` field
// next to each claim records where it came from so reviewers can verify it.
// Edit this file (or copy it) to launch a new campaign, then run:
//     node build.mjs renovation
// ═══════════════════════════════════════════════════════════════════════════
import { org } from './_org.mjs';

export default {
  slug: 'renovation',
  org,

  // ── SEO / social ─────────────────────────────────────────────────────────
  seo: {
    title: 'ساهم في ترميم منازل الأيتام | جمعية بهجة العمانية للأيتام',
    description:
      'تبرّع عبر الموقع الرسمي لجمعية بهجة العمانية للأيتام لدعم صيانة وترميم وبناء منازل أسر الأيتام: إصلاح الأسقف المتهالكة، وترميم الجدران المتصدعة، وتجهيز المرافق الأساسية.',
    canonical: 'https://bahjah.org.om/campaign/renovation/', // ← set to the real published URL
    ogImage: 'assets/img/og-renovation.jpg',
    ogImageAlt: 'صور قبل وبعد من أعمال الصيانة والترميم لجمعية بهجة العمانية للأيتام',
  },

  // ── Analytics labels for this campaign ──────────────────────────────────
  analytics: {
    contentName: 'بناء وترميم',
    contentCategory: 'building_renovation',
    contentId: 'bahjah-renovation',
  },

  // ── Payment destination (the ONLY place donations are taken) ────────────
  payment: {
    // Optional: pre-fill the quantity on the official page using WooCommerce's
    // standard ?add-to-cart=<id>&quantity=<n>. Product id 4028 comes from the
    // official form. Keep disabled until tested on the live site.
    addToCart: { enabled: false, productId: 4028 },
    // Official WooCommerce product. Confirmed as the target of the "موقع بهجة" QR
    // code on the official "حملة ترميم 10 منازل أرامل وأيتام" poster (18/3/2026).
    url: 'https://bahjah.org.om/wp/product/%D8%A8%D9%86%D8%A7%D8%A1-%D9%88-%D8%AA%D8%B1%D9%85%D9%8A%D9%85/',
    label: 'بناء وترميم',
    // Shown under CTAs so donors know where they are going.
    domainNote: 'يتم التبرع عبر الموقع الرسمي للجمعية bahjah.org.om',
  },

  // ── CTA copy (repeated across hero, mid-page, final section, sticky bar) ─
  cta: {
    primary: 'ساهم الآن في ترميم منازل الأيتام',
    short: 'ساهم في الترميم',
  },

  // ── 1. HERO ──────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'حملة بناء وترميم منازل الأيتام',
    title: 'بيتٌ آمن لأسرة يتيم يبدأ بمساهمتك',
    // Official wording, Bahjah profile (CV) – "Houses maintenance" project.
    need: 'تحرص جمعية بهجة العمانية للأيتام على توفير مسكن آمن وسليم، لذا تقوم بصيانة وترميم منازل الأيتام المتضررة.',
    needSource: 'الملف التعريفي للجمعية',
    image: {
      src: 'assets/img/before-after-5-427.webp',
      width: 427,
      height: 180,
      alt: 'غرفة في أحد منازل الأيتام قبل الترميم وبعده، من ملف جمعية بهجة التعريفي',
      caption: 'قبل وبعد: من أعمال الصيانة والترميم الموثقة في ملف الجمعية التعريفي',
    },
    // Progress bar. ONLY enable with a current, official Bahjah figure.
    // The last official figures found (Update 3, 18/3/2026, 10-homes campaign:
    // target 35,000 / paid 28,812.5 OMR) are out of date, and the matching Jood
    // listing shows that campaign closed on 30/3/2026, so this stays OFF.
    progress: {
      enabled: false,
      target: null,
      raised: null,
      currency: 'ر.ع.',
      asOf: '',        // e.g. 'التحديث 4 – 1/10/2026'
      sourceUrl: '',   // link to the official post the numbers came from
    },
  },

  // ── 2. THE NEED ──────────────────────────────────────────────────────────
  need: {
    title: 'لماذا نرمم منازل الأيتام؟',
    paragraphs: [
      // CV §16 Maintenance and Restoration
      'بدأت الجمعية أعمال الصيانة والترميم بعد الحالة المدارية (إعصار مكونو) عام 2018؛ إذ قام فريق مختص من الجمعية بزيارة المنازل وتسجيل الحالات وتقييم كميات الصيانة والترميم، ثم بدأ التنفيذ.',
      'وتستمر أعمال الصيانة والترميم طوال السنة، وتزداد وتيرتها عند تأثر السلطنة بالأنواء المناخية.',
    ],
    quote: {
      // Official campaign poster text (حملة ترميم 10 منازل أرامل وأيتام, 18/3/2026)
      text: 'ترميم منازل الأيتام والأرامل ليس مجرد إصلاح لـ"خرسانة"، بل هو أمان لقلوبهم.',
      cite: 'من إعلان الجمعية لحملة ترميم 10 منازل أرامل وأيتام – مارس 2026',
    },
    source: 'الملف التعريفي لجمعية بهجة (أعمال الصيانة والترميم) وإعلان الحملة الرسمي',
  },

  // ── 3. WHAT YOUR DONATION SUPPORTS (3–4 cards) ───────────────────────────
  supports: {
    title: 'ماذا يدعم تبرعك؟',
    intro: 'يُوجَّه التبرع عبر باب «بناء وترميم» الرسمي، الذي تصفه الجمعية بـ: «ساهم معنا بترميم وبناء منازل الأيتام».',
    items: [
      { icon: 'roof',    title: 'إصلاح الأسقف المتهالكة', text: '' },
      { icon: 'wall',    title: 'ترميم الجدران المتصدعة', text: '' },
      { icon: 'kitchen', title: 'تجهيز المرافق الأساسية', text: 'كالمطابخ والحمامات وغيرها.' },
      { icon: 'home',    title: 'بناء منازل الأيتام',      text: '«ساهم معنا بترميم وبناء منازل الأيتام».' },
    ],
    // Items 1–3: official poster wording. Item 4: official product description.
    itemsSource: 'البنود من إعلان الجمعية لحملة الترميم (مارس 2026) ووصف باب «بناء وترميم» في موقعها.',
    note: 'يحدد فريق الجمعية الأعمال المطلوبة لكل منزل بعد الزيارة والتقييم، كما هو موثق في منهجية الجمعية لأعمال الصيانة والترميم.',
  },

  // ── 4. WHY BAHJAH ───────────────────────────────────────────────────────
  // Shared org facts live in _org.mjs. Choose which awards to show:
  awardsToShow: ['iso', 'sultanQaboos', 'sanabel', 'ohrc', 'oq', 'bahrain', 'kuwait'],

  // ── 5. DOCUMENTED EVIDENCE ──────────────────────────────────────────────
  evidence: {
    title: 'من أعمال الجمعية الموثقة',
    gallery: {
      title: 'قبل وبعد: أعمال الصيانة والترميم',
      source: 'الصور من الملف التعريفي الرسمي للجمعية (قسم الصيانة والترميم)',
      sourceUrl: 'https://bahjah.org.om/wp/wp-content/uploads/2025/08/CV-Print-Proof.pdf',
      images: [1, 2, 3, 4, 5, 6].map((n) => ({
        src: `assets/img/before-after-${n}-427.webp`,
        width: 427,
        height: 180,
        alt: 'صورة مقارنة قبل وبعد لأعمال صيانة وترميم منزل، من ملف جمعية بهجة',
      })),
    },
    items: [
      {
        date: 'مارس 2026',
        title: 'حملة ترميم 10 منازل أرامل وأيتام',
        text: 'أطلقت الجمعية خلال شهر رمضان (مارس 2026) حملة لترميم عشرة منازل لأسر الأيتام والأرامل، تشمل إصلاح الأسقف المتهالكة وترميم الجدران المتصدعة وتجهيز المرافق الأساسية كالمطابخ والحمامات.',
        note: 'حملة مؤرخة؛ للاستفسار عن حالتها تواصل مع الجمعية.',
        link: 'https://bahjah.org.om/wp/%D8%AD%D9%85%D9%84%D8%A9-%D8%AA%D8%B1%D9%85%D9%8A%D9%85-10-%D9%85%D9%86%D8%A7%D8%B2%D9%84-%D8%A3%D8%B1%D8%A7%D9%85%D9%84-%D9%88%D8%A3%D9%8A%D8%AA%D8%A7%D9%85/',
        image: { src: 'assets/img/houses-maintenance-300.webp', width: 300, height: 300, alt: 'شعار مشروع ترميم وصيانة المنازل – جمعية بهجة' },
      },
      {
        date: 'منذ 2018',
        title: 'ترميم وصيانة المنازل',
        text: 'بعد إعصار مكونو، زار فريق الجمعية المنازل وسجّل الحالات وقيّم أعمال الصيانة ثم نفّذها. كما نفّذت الجمعية توصية معالي وزير التنمية الاجتماعية بصيانة 5 منازل في ولاية مرباط.',
        link: '',
        image: null,
      },
      {
        date: 'من مشاريع الجمعية',
        title: 'مجمع بهجة السكني',
        text: 'مجمع سكني تجاري يوفر سكنًا للأيتام، ويتكوّن من أربعة مبانٍ وبه حديقة ومساحات خارجية.',
        link: 'https://bahjah.org.om/wp/%D9%85%D8%AC%D9%85%D8%B9-%D8%A8%D9%87%D8%AC%D8%A9-%D8%A7%D9%84%D9%88%D9%82%D9%81%D9%8A/',
        image: { src: 'assets/img/residential-complex-218.webp', width: 218, height: 224, alt: 'شعار مجمع بهجة السكني' },
      },
      {
        date: 'هدف 2040',
        title: 'إدارة المباني الخيرية',
        text: 'تهدف الجمعية إلى إنجاز 10 مبانٍ خيرية بحلول عام 2040 لضمان دخل مستدام، وقد أنجزت المبنى الأول بحمد الله.',
        link: 'https://bahjah.org.om/wp/%D8%A7%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D8%A8%D8%A7%D9%86%D9%8A-%D8%A7%D9%84%D8%AE%D9%8A%D8%B1%D9%8A%D8%A9/',
        image: { src: 'assets/img/charity-buildings-240.webp', width: 240, height: 240, alt: 'شعار إدارة المباني الخيرية – جمعية بهجة' },
      },
    ],
  },

  // ── 6. AMOUNT ───────────────────────────────────────────────────────────
  // Only list amounts that an official Bahjah source states. If the list is
  // empty, the section explains that the amount is chosen on the official page.
  amount: {
    title: 'كم أتبرع؟',
    // Official product page (archived 16/4/2026) shows a unit price of "1,000 ر.ع."
    // WooCommerce there prints OMR with 3 decimals and a comma decimal separator:
    // "1,000 ر.ع." = OMR 1.000 (proof: the sponsorship product shows "25,000 ر.ع."
    // while its description says 25 OMR/month; كفارات shows "1,500" = OMR 1.5).
    // So the donor's amount in rials = the quantity they enter.
    unit: {
      value: 1,                 // OMR per unit
      display: '1,000 ر.ع.',     // exactly as printed on the official page
    },
    officialAmounts: [],        // no official suggested amounts for Building & Renovation
    anyAmountNote: '«ساهم ولو بريال»، كما جاء في إعلان الجمعية لحملة الترميم.',
    source: 'المصدر: صفحة «بناء وترميم» في موقع الجمعية وإعلان حملة الترميم.',
  },

  // ── 8. FAQ ──────────────────────────────────────────────────────────────
  // {org.*} placeholders are filled in at build time.
  faq: [
    {
      q: 'أين يذهب تبرعي؟',
      a: 'يذهب تبرعك مباشرة إلى جمعية بهجة العمانية للأيتام عبر صفحة «بناء وترميم» على موقعها الرسمي، وتصفها الجمعية بـ: «ساهم معنا بترميم وبناء منازل الأيتام».',
    },
    {
      q: 'ماذا تدعم هذه الحملة تحديدًا؟',
      a: 'صيانة وترميم وبناء منازل أسر الأيتام، ومن ذلك إصلاح الأسقف المتهالكة، وترميم الجدران المتصدعة، وتجهيز المرافق الأساسية كالمطابخ والحمامات. ويحدد فريق الجمعية الأعمال المطلوبة بعد زيارة كل حالة وتقييمها.',
    },
    {
      q: 'هل ما زالت حملة «ترميم 10 منازل» مفتوحة؟',
      a: 'أُعلنت تلك الحملة في مارس 2026. هذه الصفحة تستقبل التبرعات لباب «بناء وترميم» الدائم لدى الجمعية. للاستفسار عن حالة حملة بعينها، تواصل مع الجمعية مباشرة.',
    },
    {
      q: 'كيف أتبرع؟',
      a: 'اضغط زر «ساهم الآن»، فتنتقل إلى صفحة «بناء وترميم» على موقع الجمعية الرسمي. تظهر هناك قيمة الوحدة «1,000 ر.ع.» وتعني ريالًا عمانيًا واحدًا، فاكتب مبلغ تبرعك بالريال في خانة الكمية (مثلًا: 20 = عشرون ريالًا)، ثم اضغط «تبرع الآن» وأكمل الدفع.',
    },
    {
      q: 'ما طرق الدفع المتاحة؟',
      a: 'بحسب صفحة الأسئلة الشائعة في موقع الجمعية: «نقبل بطاقات الائتمان والخصم عبر بوابة بنك مسقط SmartPay».',
    },
    {
      q: 'هل توجد طريقة أخرى للمساهمة؟',
      a: 'نعم. يمكنك التحويل إلى حسابات الجمعية البنكية، أو إرسال كلمة «تبرع» إلى الرقم المجاني 90021 للتبرع بريال (عمانتل وأوريدو)، أو التبرع عبر تطبيق بهجة. التفاصيل في قسم «طرق أخرى للتبرع» أدناه.',
    },
    {
      q: 'كيف أتواصل مع جمعية بهجة؟',
      a: 'هاتف: {org.phones} · واتساب: {org.whatsapp} · البريد: {org.email} · العنوان: {org.address}',
    },
  ],

  // ── 7. OTHER WAYS TO GIVE ───────────────────────────────────────────────
  // Source: official campaign poster (18/3/2026) + bahjah.org.om footer.
  // These go to Bahjah's general channels; donors should contact Bahjah if they
  // want a bank transfer earmarked for renovation.
  otherWays: {
    show: true,
    earmarkNote: 'للتأكد من تخصيص التحويل البنكي لباب الترميم، تواصل مع الجمعية بعد التحويل.',
  },

  // ── 9. FINAL CTA ────────────────────────────────────────────────────────
  final: {
    title: 'ساهم في بيت آمن لأسرة يتيم',
    text: 'مساهمتك، مهما كانت، تذهب إلى باب «بناء وترميم» منازل الأيتام في جمعية بهجة العمانية للأيتام.',
  },
};
