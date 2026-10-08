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
    title: 'ترميم وبناء منازل الأيتام في عُمان | جمعية بهجة العمانية للأيتام',
    description:
      'بيتٌ آمن يعني كرامةً وطمأنينةً لأسرة اليتيم. ساهم في ترميم وبناء منازل الأيتام في عُمان مع جمعية بهجة العمانية للأيتام عبر صفحة «بناء وترميم» الرسمية، ولو بريال.',
    canonical: '', // set at build time from campaigns/_site.mjs
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
    hero: 'ساهم في بناء بيت آمن',
    secondary: 'اكتشف أثر مساهمتك',   // scrolls to the before/after impact gallery
  },

  // ── 1. HERO ──────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'بناء وترميم منازل الأيتام في عُمان',
    title: 'بيتٌ آمن…',
    titleAccent: 'يعني قلبًا أكثر طمأنينة',
    note: 'جمعية خيرية منذ 2014 · شهادة الأيزو 2023',
    priceTag: { value: '1', text: 'ر.ع. · ساهم ولو بريال.' },
    // Official wording, Bahjah profile (CV) – "Houses maintenance" project.
    need: 'تحرص جمعية بهجة العمانية للأيتام على توفير مسكن آمن وسليم، لذا تقوم بصيانة وترميم منازل الأيتام المتضررة.',
    needSource: 'الملف التعريفي للجمعية',
    // Supporting line under the headline (campaign copy, consistent with the CV text above).
    supporting: 'تساهم جمعية بهجة العمانية للأيتام في صيانة وترميم منازل الأسر المستفيدة، لتوفير بيئة سكنية أكثر أماناً واستقراراً.',
    supportingLines: [
      'أسرة اليتيم لا تحتاج إلى جدرانٍ جديدة فقط، بل إلى بيتٍ يحفظ كرامتها، ويمنح أبناءها الأمان والسكينة.',
      'ساهم بما تستطيع في ترميم وبناء منازل الأيتام مع جمعية بهجة العمانية للأيتام.',
      'قد يكون تبرعك بسيطًا… لكنه قد يكون سببًا في أن تنام أسرةٌ بأمان.',
    ],
    // Short trust chips under the hero (all from official sources).
    trust: [
      'جمعية خيرية غير حكومية منذ 2014',
      'التبرع عبر الموقع الرسمي للجمعية',
      'الدفع عبر بوابة بنك مسقط SmartPay',
    ],
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

  // ── BEFORE / AFTER (hero slider + impact gallery) ─────────────────────────
  // REAL photos from the official profile PDF, p.17 (§16 Maintenance & Restoration).
  // Each official side-by-side image was split into its "قبل" and "بعد" halves.
  // Captions describe only what is visible in the photo.
  compare: {
    title: 'من منزلٍ يحتاج إلى العناية… إلى بيتٍ أكثر أمانًا',
    intro: 'صور قبل وبعد من أعمال الصيانة والترميم التي نفّذتها الجمعية، كما وردت في ملفها التعريفي الرسمي. اسحب المؤشر للمقارنة.',
    introLines: [
      'هذه ليست مجرد صور قبل وبعد؛ إنها لحظات من حياة أسرٍ احتاجت إلى من يقف معها.',
      'خلف كل صورة… أسرة. وخلف كل مساهمة… إنسان.',
    ],
    source: 'اسحب المؤشر للمقارنة · الصور من الملف التعريفي الرسمي لجمعية بهجة (قسم الصيانة والترميم).',
    sourceUrl: 'https://bahjah.org.om/wp/wp-content/uploads/2025/08/CV-Print-Proof.pdf',
    heroIndex: 3, // which pair opens in the hero slider (walls & floors)
    pairs: [
      { id: 1, caption: 'ترميم سقف غرفة متضرر' },
      { id: 5, caption: 'معالجة سقف متهالك' },
      { id: 3, caption: 'إصلاح السقف والسطح' },
      { id: 4, caption: 'ترميم الجدران والأرضيات' },
      { id: 6, caption: 'تجديد دورة مياه' },
      { id: 2, caption: 'تجديد الواجهة الخارجية للمنزل' },
    ].map((p) => ({
      ...p,
      before: `assets/img/compare/${p.id}-before-640.webp`,
      after: `assets/img/compare/${p.id}-after-640.webp`,
      beforeSm: `assets/img/compare/${p.id}-before-320.webp`,
      afterSm: `assets/img/compare/${p.id}-after-320.webp`,
      width: 640,
      height: 480,
    })),
  },

  // ── HOW TO GIVE (3 steps) ────────────────────────────────────────────────
  process: {
    kicker: 'خطوات بسيطة',
    title: 'كيف تساهم؟',
    steps: [
      { icon: 'wallet', title: 'اختر قيمة تبرعك', text: 'اختر المبلغ الذي تستطيع تقديمه.' },
      { icon: 'shield', title: 'انتقل إلى صفحة «بناء وترميم»', text: 'اضغط على «ساهم الآن» وانتقل إلى صفحة التبرع الرسمية لجمعية بهجة.' },
      { icon: 'card', title: 'أكمل تبرعك', text: 'يمكنك الدفع بالبطاقات عبر بوابة بنك مسقط SmartPay.' },
    ],
    source: '',
  },

  // ── STORY: «البيت ليس جدرانًا فقط» (right after the hero) ─────────────────
  homeMeaning: {
    kicker: 'معنى البيت',
    title: 'البيت ليس جدرانًا فقط',
    lines: [
      'البيت هو المكان الذي يشعر فيه الطفل بالأمان.',
      'هو السقف الذي يحميه من المطر والحرارة.',
      'هو المكان الذي تعود إليه الأسرة بعد يوم طويل.',
      'هو المكان الذي يجب أن يجد فيه اليتيم الطمأنينة، لا الخوف من سقفٍ متهالك أو جدارٍ متصدع.',
      { text: 'ولهذا، فإن ترميم منزل أسرة يتيم ليس مجرد إصلاحٍ لبيت…', strong: true },
      { text: 'إنه إصلاحٌ لمساحة يعيش فيها الإنسان بكرامة.', strong: true },
      'ومساهمتك قد تكون جزءًا من هذا الأمان.',
    ],
    photo: { src: 'assets/img/story/home-window-720.webp', srcLg: 'assets/img/story/home-window-1280.webp', w: 720, h: 478, alt: 'صورة تعبيرية: طفل عُماني يذاكر قرب نافذة منزله بينما تجهّز والدته حقيبته المدرسية' }, // صورة تعبيرية (AI)
  },

  // ── STORY: Islamic values (Quran verse quoted exactly, with reference) ───
  mercy: {
    kicker: 'رحمة وإحسان',
    title: 'الخير الذي تفعله… لا يضيع عند الله',
    verse: '﴿وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ﴾',
    ref: '[البقرة: 110]',
    lines: [
      'العطاء في الإسلام ليس مجرد مالٍ يخرج من اليد.',
      { text: 'إنه رحمة. وإحسان. وتفريجٌ لحاجة. وأجرٌ نرجو أن يجده العبد عند الله.', strong: true },
      'فحين تساهم في ترميم منزل أسرة يتيم، أنت لا تساهم في بناء جدران فقط… بل تساهم في صناعة أمانٍ وطمأنينة.',
    ],
    cta: 'اجعل لك أثرًا في هذا الخير',
    photo: { src: 'assets/img/story/doorway-guardian-720.webp', srcLg: 'assets/img/story/doorway-guardian-1280.webp', w: 720, h: 478, alt: 'صورة تعبيرية: طفل عُماني يمسك بيد وليّه عند باب منزلهما وقت الغروب' }, // صورة تعبيرية (AI)
  },

  // ── 2. THE NEED ──────────────────────────────────────────────────────────
  need: {
    title: 'لأن الأمان يبدأ من البيت',
    paragraphs: [
      // CV §16 Maintenance and Restoration
      'بدأت جمعية بهجة أعمال صيانة وترميم منازل الأيتام بعد الحالة المدارية إعصار مكونو عام 2018، حيث قام فريق مختص بزيارة المنازل وتسجيل الحالات وتقييم احتياجات الصيانة والترميم.',
      // CV wording: «وتستمر أعمال الصيانة والترميم طوال السنة ويزداد وتيرة العمل عند التأثر بالأنواء المناخية»
      'ومنذ ذلك الوقت، تستمر أعمال الصيانة والترميم على مدار العام، وتزداد وتيرتها عند تأثر السلطنة بالأنواء المناخية.',
      'كل منزل له احتياجه. وكل أسرة لها قصتها. وكل مساهمة قد تكون سببًا في تغيير شيءٍ مهم في حياة أسرة.',
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
    title: 'أين يمكن أن يصل أثرك؟',
    intro: 'يُوجَّه التبرع عبر باب «بناء وترميم» الرسمي، الذي تصفه الجمعية بـ: «ساهم معنا بترميم وبناء منازل الأيتام».',
    items: [
      { icon: 'roof', title: 'إصلاح الأسقف المتهالكة', text: 'سقفٌ أكثر أمانًا يحمي الأسرة من الظروف الجوية.' },
      { icon: 'wall', title: 'ترميم الجدران المتصدعة', text: 'حتى يبقى المنزل مكانًا آمنًا وصالحًا للحياة.' },
      { icon: 'tools', title: 'تجهيز المرافق الأساسية', text: 'المطابخ والحمامات وغيرها مما يجعل المنزل ملائمًا للأسرة.' },
      { icon: 'home', title: 'بناء منازل الأيتام', text: 'حين لا يكفي الترميم، قد يكون البناء بداية بيتٍ جديد أكثر أمانًا.' },
    ],
    // Items 1–3: official poster wording. Item 4: official product description.
    itemsSource: 'المصدر: إعلان حملة الترميم (مارس 2026) ووصف باب «بناء وترميم».',
    note: 'يحدد فريق الجمعية ما يحتاجه كل منزل بعد الزيارة والتقييم.',
  },

  // ── 4. WHY BAHJAH ───────────────────────────────────────────────────────
  // Shared org facts live in _org.mjs. Choose which awards to show:
  awardsToShow: ['iso', 'sultanQaboos', 'sanabel', 'ohrc', 'oq', 'bahrain', 'kuwait'],

  // ── 5. DOCUMENTED EVIDENCE ──────────────────────────────────────────────
  evidence: {
    kicker: 'من أعمال الجمعية',
    title: 'حملة ترميم 10 منازل… أثرٌ من رمضان',
    // Historical campaign (Ramadan, March 2026). The matching Jood listing closed
    // on 30/3/2026, so it is presented as past, distinct from the permanent fund.
    intro: [
      'خلال شهر رمضان، مارس 2026، أطلقت جمعية بهجة حملة لترميم عشرة منازل لأسر الأيتام والأرامل.',
      'شملت الحملة أعمالًا مثل:',
    ],
    bullets: ['إصلاح الأسقف المتهالكة', 'ترميم الجدران المتصدعة', 'تجهيز المطابخ والحمامات والمرافق الأساسية'],
    outro: ['وقد تستمر الحاجة إلى الترميم بعد انتهاء الحملة، لذلك يبقى باب «بناء وترميم» مفتوحًا للمساهمة في الحالات التي تحتاج إلى الدعم.'],
    introLink: 'https://web.archive.org/web/20260510045208/https://bahjah.org.om/wp/%D8%AD%D9%85%D9%84%D8%A9-%D8%AA%D8%B1%D9%85%D9%8A%D9%85-10-%D9%85%D9%86%D8%A7%D8%B2%D9%84-%D8%A3%D8%B1%D8%A7%D9%85%D9%84-%D9%88%D8%A3%D9%8A%D8%AA%D8%A7%D9%85/',
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
        date: 'منذ 2018',
        title: 'صيانة منازل في ولاية مرباط',
        text: 'نفّذت الجمعية توصية معالي وزير التنمية الاجتماعية بصيانة 5 منازل في ولاية مرباط، ضمن أعمال الصيانة والترميم التي بدأت بعد إعصار مكونو.',
        link: '',
        image: null,
      },
      {
        date: 'من مشاريع الجمعية',
        title: 'مجمع بهجة السكني',
        text: 'مجمع سكني تجاري يوفر سكنًا للأيتام، ويتكوّن من أربعة مبانٍ وبه حديقة ومساحات خارجية.',
        linkArchived: true,
        link: 'https://web.archive.org/web/20260416182845/https://bahjah.org.om/wp/%D9%85%D8%AC%D9%85%D8%B9-%D8%A8%D9%87%D8%AC%D8%A9-%D8%A7%D9%84%D9%88%D9%82%D9%81%D9%8A/',
        image: { src: 'assets/img/residential-complex-218.webp', width: 218, height: 224, alt: 'شعار مجمع بهجة السكني' },
      },
      {
        date: 'هدف 2040',
        title: 'إدارة المباني الخيرية',
        text: 'تهدف الجمعية إلى إنجاز 10 مبانٍ خيرية بحلول عام 2040 لضمان دخل مستدام، وقد أنجزت المبنى الأول بحمد الله.',
        linkArchived: true,
        link: 'https://web.archive.org/web/20260416171725/https://bahjah.org.om/wp/%D8%A7%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D8%A8%D8%A7%D9%86%D9%8A-%D8%A7%D9%84%D8%AE%D9%8A%D8%B1%D9%8A%D8%A9/',
        image: { src: 'assets/img/charity-buildings-240.webp', width: 240, height: 240, alt: 'شعار إدارة المباني الخيرية – جمعية بهجة' },
      },
    ],
  },

  // ── 6. AMOUNT ───────────────────────────────────────────────────────────
  // Only list amounts that an official Bahjah source states. If the list is
  // empty, the section explains that the amount is chosen on the official page.
  amount: {
    title: 'ساهم ولو بريال',
    introLines: [
      'ليس المهم أن يكون عطاؤك كبيرًا… المهم أن يكون فيه خير.',
      'قد يكون ريالًا. وقد يكون عشرة. وقد يكون مائة.',
      'المهم أن يكون عطاؤك سببًا في إصلاح شيءٍ يحتاج إليه بيت أسرة يتيم.',
    ],
    cta: 'أريد أن أساهم',
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
    anyAmountNote: '', // the card title «ساهم ولو بريال» is the official campaign phrase (see FAQ)
    source: 'المصدر: صفحة «بناء وترميم» في موقع الجمعية وإعلان حملة الترميم.',
  },

  // ── 8. FAQ ──────────────────────────────────────────────────────────────
  // {org.*} placeholders are filled in at build time.
  faq: [
    {
      q: 'أين يذهب تبرعي؟',
      a: 'يذهب تبرعك إلى باب «بناء وترميم» لدى جمعية بهجة العمانية للأيتام، للمساهمة في أعمال صيانة وترميم وبناء منازل الأسر المستفيدة، وفق احتياج كل حالة وتقييم فريق الجمعية.',
    },
    {
      q: 'ماذا يشمل الترميم؟',
      a: 'يمكن أن يشمل إصلاح الأسقف المتهالكة، وترميم الجدران المتصدعة، وتجهيز المرافق الأساسية مثل المطابخ والحمامات، إضافة إلى أعمال البناء عند الحاجة.',
    },
    {
      q: 'هل ما زالت حملة ترميم 10 منازل مفتوحة؟',
      a: 'كانت حملة ترميم عشرة منازل معلنة في مارس 2026. أما باب «بناء وترميم» فهو باب دائم للتبرع، وللاستفسار عن حالة حملة محددة يمكن التواصل مباشرة مع الجمعية.',
    },
    {
      q: 'هل يمكنني التبرع بمبلغ بسيط؟',
      a: 'نعم. يمكنك المساهمة بالمبلغ الذي تستطيع، وقد أعلنت الجمعية في حملة الترميم عبارة «ساهم ولو بريال».',
    },
    {
      q: 'كيف أتبرع؟',
      a: 'يمكنك الضغط على زر التبرع والانتقال إلى صفحة «بناء وترميم» الرسمية، ثم اختيار الكمية والمبلغ وإكمال الدفع عبر القنوات المتاحة. تظهر في الصفحة قيمة الوحدة «1,000 ر.ع.» وتعني ريالًا عمانيًا واحدًا، فاكتب مبلغ تبرعك بالريال في خانة «الكمية» (مثلًا: 20 = عشرون ريالًا).',
    },
    {
      q: 'ما طرق الدفع المتاحة؟',
      a: 'بحسب صفحة الأسئلة الشائعة في موقع الجمعية: «نقبل بطاقات الائتمان والخصم عبر بوابة بنك مسقط SmartPay».',
    },
    {
      q: 'هل توجد طرق أخرى للمساهمة؟',
      a: 'نعم، يسعدنا أن تختار ما يناسبك: التحويل إلى حسابات الجمعية البنكية، أو إرسال كلمة «تبرع» إلى الرقم المجاني 90021 للتبرع بريال (عمانتل وأوريدو)، أو التبرع عبر تطبيق بهجة. تجد التفاصيل في قسم الطرق الأخرى أدناه.',
    },
    {
      q: 'كيف أتواصل مع جمعية بهجة؟',
      a: 'يسعد فريق الجمعية بتواصلك: هاتف {org.phones} · واتساب {org.whatsapp} · البريد {org.email} · العنوان: {org.address}',
    },
  ],

  // ── 7. OTHER WAYS TO GIVE ───────────────────────────────────────────────
  // Source: official campaign poster (18/3/2026) + bahjah.org.om footer.
  // These go to Bahjah's general channels; donors should contact Bahjah if they
  // want a bank transfer earmarked for renovation.
  otherWays: {
    show: true,
    title: 'اختر الطريقة التي تناسبك… وافتح بابًا من أبواب الخير',
    earmarkNote: 'للتأكد من تخصيص التحويل البنكي لباب الترميم، تواصل مع الجمعية بعد التحويل.',
  },

  // ── 9. FINAL CTA ────────────────────────────────────────────────────────
  final: {
    title: 'اجعل بيتًا أكثر أمانًا… صدقةً لك',
    lines: [
      'قد لا تعرف اسم الأسرة. وقد لا ترى لحظة فرحتها.',
      'وقد لا تعرف كم كان عطاؤك سببًا في تغيير شيءٍ في حياتها… لكن الله يعلم.',
      'ساهم بما تستطيع في ترميم وبناء منازل الأيتام.',
      'ريالٌ منك… قد يكون بداية أمان. ومساهمتك اليوم… قد تكون أثرًا يبقى لك عند الله.',
    ],
    text: 'مساهمتك، مهما كانت، تذهب إلى باب «بناء وترميم» منازل الأيتام في جمعية بهجة العمانية للأيتام.',
    note: 'اللهم تقبل منا ومنكم صالح الأعمال.',
    photo: { src: 'assets/img/story/threshold-evening-720.webp', srcLg: 'assets/img/story/threshold-evening-1280.webp', w: 720, h: 478, alt: 'صورة تعبيرية: طفلة تقف عند باب بيتها الدافئ مساءً' }, // صورة تعبيرية (AI)
  },

  // ── WHY BAHJAH (shared facts + awards; page-specific heading and copy) ───
  trust: {
    title: 'حين تتصدق… من حقك أن تطمئن',
    text: [
      'جمعية بهجة العمانية للأيتام جمعية خيرية غير حكومية تُعنى برعاية الأيتام، تأسست في 10 فبراير 2014 وفقًا للمرسوم السلطاني رقم 14/2000.',
      'وتعمل الجمعية على تقديم الرعاية والمساعدة للأيتام، بما يشمل الدعم المالي والمعنوي والصحي والتعليمي والاجتماعي.',
      'وهدفها ليس فقط أن يعيش اليتيم… بل أن ينمو في بيئة أكثر أمانًا وكرامة وأملًا.',
    ],
  },

  // Footer «مصادر المحتوى والصور» + disclaimer (same pattern on every Bahjah landing page)
  faqTitle: 'أسئلة شائعة عن التبرع لترميم منازل الأيتام',
  sources: [
    'صور «معنى البيت» و«رحمة وإحسان» والدعوة الختامية: صور تعبيرية مُنشأة بالذكاء الاصطناعي ولا تمثّل أسرًا حقيقية',
    'bahjah.org.om/wp/ — التعريف، تاريخ التأسيس، الجوائز، بيانات التواصل',
    'bahjah.org.om/wp/product/بناء-و-ترميم/ — باب التبرع «بناء وترميم» وقيمة الوحدة',
    'bahjah.org.om/wp/الاسئلة-الشائعة/ — طرق الدفع (بوابة بنك مسقط SmartPay)',
    'bahjah.org.om/wp/المركز-الاعلامي/ — الأخبار',
    'الملف التعريفي للجمعية (CV-Print-Proof.pdf) — أعمال الصيانة والترميم، صور قبل وبعد، إحصائيات 2023، صور الأنشطة',
    'إعلان الجمعية لحملة ترميم 10 منازل أرامل وأيتام (مارس 2026) — بنود الحملة وطرق التبرع الأخرى',
  ],
  disclaimer: 'صفحة هبوط توجّه الزوار إلى صفحة التبرع الرسمية للجمعية، ولا تُجري أي عملية دفع أو تخزّن بيانات مالية.',
  sticky: { value: '1 ر.ع.', note: 'ساهم ولو بريال' },
  nav: [
    { href: '#covers', label: 'أين يصل أثرك' },
    { href: '#impact', label: 'قبل وبعد' },
    { href: '#trust', label: 'لماذا بهجة؟' },
    { href: '#faq', label: 'أسئلة شائعة' },
  ],
};
