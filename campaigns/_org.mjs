// ═══════════════════════════════════════════════════════════════════════════
// Shared organisation facts: identical on every campaign page.
// Sources: bahjah.org.om (home, من نحن, تواصل, الأسئلة الشائعة), official CV PDF,
// official campaign poster (18/3/2026). Captured Sep 2026 via web.archive.org
// because bahjah.org.om was refusing connections at build time.
// ═══════════════════════════════════════════════════════════════════════════

export const org = {
  nameAr: 'جمعية بهجة العمانية للأيتام',
  nameEn: 'Omani Bahjah Orphan Society',
  website: 'https://bahjah.org.om/wp/',
  donationsHub: 'https://bahjah.org.om/wp/%D8%A7%D9%84%D8%AA%D8%A8%D8%B1%D8%B9%D8%A7%D8%AA/',
  logo: { src: 'assets/img/logo-192.webp', src1x: 'assets/img/logo-96.webp', width: 96, height: 107 },

  // من نحن (verbatim)
  about: {
    classification: 'تُصنَّف جمعية بهجة العمانية للأيتام كجمعية خيرية غير حكومية للأيتام.',
    founded: 'تأسست بتاريخ 10 / 2 / 2014 وفقًا للمرسوم السلطاني رقم 14 / 2000.',
    vision: 'تقديم الرعاية والمساعدات للأيتام داخل وخارج منازلهم. هدفنا أن نعطيهم الأمل لمستقبل آمن وفرص أفضل، لجعل كل طفل تحت رعايتنا ينمو نموًا سليمًا نفسيًا واجتماعيًا بشكل متكامل داخل المجتمع.',
    goal: 'ضمان وصول كافة أنواع الرعاية والدعم لجميع الأيتام، وتشمل دعمًا ماليًا شهريًا بالإضافة للدعم المعنوي والصحي والتعليمي والاجتماعي.',
  },

  // شهادات وجوائز حصلت عليها الجمعية (homepage, wording preserved)
  awards: {
    iso:          { title: 'شهادة الأيزو', year: '2023', img: 'assets/img/award-iso-160.webp' },
    sultanQaboos: { title: 'جائزة السلطان قابوس للعمل التطوعي', year: '2013', img: 'assets/img/award-sultan-qaboos-160.webp' },
    sanabel:      { title: 'جائزة السنابل للتميز الخدمي بدول مجلس التعاون الخليجي', year: '2016', img: 'assets/img/award-sanabel-160.webp' },
    ohrc:         { title: 'كُرّمت كأفضل جمعية من لجنة حقوق الإنسان', year: '2019', img: 'assets/img/award-ohrc-160.webp' },
    oq:           { title: 'المركز الأول على مستوى السلطنة في مستوى أوكيو', year: '2020', img: 'assets/img/award-oq-160.webp' },
    bahrain:      { title: 'جائزة المؤسسة الدولية المتميزة في الابتكار الاجتماعي بمملكة البحرين', year: '2023', img: 'assets/img/award-bahrain-160.webp' },
    kuwait:       { title: 'جائزة خالد العيسى الصالح بالكويت على مستوى الوطن العربي', year: '2024', img: 'assets/img/award-kuwait-160.webp' },
  },

  // تواصل معنا
  contact: {
    phones: ['92877577', '23289966'],
    whatsapp: '96892877577',
    email: 'bahjah1.omani@gmail.com',
    addressAr: 'ظفار – صلالة الشرقية – شارع 23 يوليو – بجوار بنك ظفار',
    x: 'https://x.com/bahjah1_omani',
    appAndroid: 'https://play.google.com/store/apps/details?id=om.digitalorbits.bahjah',
    appIos: 'https://apps.apple.com/om/app/bahjah-association-for-orphans/id1574084411',
  },

  // الأسئلة الشائعة (verbatim)
  paymentMethodsOfficial: 'نقبل بطاقات الائتمان والخصم عبر بوابة بنك مسقط SmartPay.',

  // طرق التبرع الأخرى: official campaign poster (18/3/2026)
  otherChannels: {
    bankAccounts: [
      { bank: 'بنك مسقط', number: '0397000008880035' },
      { bank: 'بنك ظفار', number: '01041328888001' },
    ],
    accountName: 'جمعية بهجة العمانية للأيتام',
    sms: { keyword: 'تبرع', number: '90021', value: 'ريال واحد', operators: 'عمانتل وأوريدو' },
    source: 'إعلان الجمعية الرسمي لحملة الترميم (مارس 2026)',
  },
};

// English display version of the same facts (faithful translation; official
// English wording used where Bahjah publishes it, e.g. the address and CV text).
export const orgEn = {
  ...org,
  about: {
    classification: 'Omani Bahjah Orphan Society is classified as a non-governmental charitable association for orphans.',
    founded: 'Founded on 10/2/2014 in accordance with Royal Decree No. 14/2000.',
    vision: 'To provide care and assistance to orphans inside and outside their homes. Our goal is to give them hope for a secure future and better opportunities, so that every child in our care grows up psychologically and socially healthy, fully integrated in society.',
    goal: 'To ensure that every kind of care and support reaches all orphans, including monthly financial support as well as emotional, health, educational and social support.',
  },
  awards: {
    iso:          { ...org.awards.iso,          title: 'ISO certification' },
    sultanQaboos: { ...org.awards.sultanQaboos, title: 'Sultan Qaboos Award for Voluntary Work' },
    sanabel:      { ...org.awards.sanabel,      title: 'Al Sanabel Award for Service Excellence in the GCC' },
    ohrc:         { ...org.awards.ohrc,         title: 'Honoured as best association by the Human Rights Commission' },
    oq:           { ...org.awards.oq,           title: 'First place in the Sultanate at the OQ level' },
    bahrain:      { ...org.awards.bahrain,      title: 'Distinguished International Institution Award for Social Innovation, Kingdom of Bahrain' },
    kuwait:       { ...org.awards.kuwait,       title: 'Khalid Al-Essa Al-Saleh Award (Kuwait), Arab-world level' },
  },
  contact: { ...org.contact, addressAr: 'Dhofar / Salalah East / 23 July Street / next to Bank Dhofar' },
  paymentMethodsOfficial: 'We accept credit and debit cards through the Bank Muscat SmartPay gateway.',
  otherChannels: {
    ...org.otherChannels,
    bankAccounts: [
      { bank: 'Bank Muscat', number: '0397000008880035' },
      { bank: 'Bank Dhofar', number: '01041328888001' },
    ],
    accountName: 'Omani Bahjah Orphan Society (جمعية بهجة العمانية للأيتام)',
    sms: { keyword: 'تبرع', number: '90021', value: '1 OMR', operators: 'Omantel and Ooredoo' },
    source: "Bahjah's official renovation campaign announcement (March 2026)",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// SHARED SECTIONS (identical on all Bahjah landing pages: renovation, waqf and
// orphan sponsorship). Wording matches the sponsorship landing page.
// ═══════════════════════════════════════════════════════════════════════════
const NEWS_JAZER = 'https://bahjah.org.om/wp/%d8%aa%d9%88%d9%82%d9%8a%d8%b9-%d8%a7%d8%aa%d9%81%d8%a7%d9%82%d9%8a%d8%a9-%d8%aa%d8%b9%d8%a7%d9%88%d9%86-%d9%84%d9%83%d9%81%d8%a7%d9%84%d8%a9-%d8%a7%d9%84%d8%a3%d9%8a%d8%aa%d8%a7%d9%85-%d8%a8%d9%8a/';
const NEWS_SADAH = 'https://bahjah.org.om/wp/%d8%a5%d8%a8%d8%b1%d8%a7%d9%85-%d8%a7%d8%aa%d9%81%d8%a7%d9%82%d9%8a%d8%a9-%d8%aa%d8%b9%d8%a7%d9%88%d9%86-%d9%88%d8%b4%d8%b1%d8%a7%d9%83%d8%a9-%d8%a8%d9%8a%d9%86-%d8%a8%d9%87%d8%ac%d8%a9-%d8%a7%d9%84/';
const AWARD_IMGS = [
  { key: 'sultanQaboos', src: 'assets/img/shared/awards/qaboos.webp', w: 64, h: 64 },
  { key: 'iso', src: 'assets/img/shared/awards/iso.webp', w: 64, h: 64 },
  { key: 'kuwait', src: 'assets/img/shared/awards/alissa.webp', w: 64, h: 64 },
  { key: 'bahrain', src: 'assets/img/shared/awards/salam.webp', w: 64, h: 47 },
  { key: 'oq', src: 'assets/img/shared/awards/oq.webp', w: 64, h: 40 },
  { key: 'ohrc', src: 'assets/img/shared/awards/ohrc.webp', w: 64, h: 58 },
  { key: 'sanabel', src: 'assets/img/shared/awards/sanabel.webp', w: 64, h: 64 },
];
const GALLERY = [
  { src: 'assets/img/shared/program-education.webp', w: 689, h: 382 },
  { src: 'assets/img/shared/program-aid-supplies.webp', w: 346, h: 201 },
  { src: 'assets/img/shared/photo-signing.webp', w: 691, h: 384 },
];

org.shared = {
  trust: {
    kicker: 'لماذا بهجة؟',
    title: 'جمعية لرعاية الأيتام في عُمان منذ 2014',
    text: 'جمعية خيرية غير حكومية تأسست بالمرسوم السلطاني رقم 14/2000، ترعى الأيتام داخل منازلهم وخارجها.',
    facts: [
      { icon: 'calendar', value: '2014', label: 'سنة التأسيس' },
      { icon: 'users', value: '1,361', label: 'يتيمًا مسجّلًا', note: '2023' }, // CV "Statistics - 2023: Registered orphans 1361"
      { icon: 'shield', value: 'ISO', label: 'شهادة الأيزو', note: '2023' },
      { icon: 'award', value: '7', label: 'جوائز وتكريمات', note: '2013 – 2024' },
    ],
    awards: AWARD_IMGS.map((x) => ({ ...x, alt: `${org.awards[x.key].title} ${org.awards[x.key].year}` })),
    awardsAria: 'جوائز وشهادات الجمعية',
    note: 'عدد الأيتام رقمٌ تاريخي من ملف الجمعية التعريفي (إحصائيات 2023)، والجوائز كما تعرضها الجمعية على موقعها مع سنواتها.',
  },
  news: {
    kicker: 'بهجة على أرض الواقع',
    title: 'أنشطة وشراكات تخدم الأيتام',
    galleryAria: 'صور من أنشطة الجمعية',
    gallery: [
      { ...GALLERY[0], alt: 'طلاب مدارس في إحدى فعاليات جمعية بهجة', caption: 'فعالية تعليمية للأطفال' },
      { ...GALLERY[1], alt: 'مساعدات عينية أمام مبنى جمعية بهجة العمانية للأيتام', caption: 'مساعدات عينية أمام مقر الجمعية' },
      { ...GALLERY[2], alt: 'توقيع اتفاقية تمويل جمعيات أهلية', caption: 'توقيع اتفاقيات تمويل — مارس 2021' },
    ],
    links: [
      { href: NEWS_JAZER, date: '2026-02-04', dateLabel: '4 فبراير 2026', title: 'اتفاقية تعاون لكفالة الأيتام مع والي ولاية الجازر', id: 'news_jazer' },
      { href: NEWS_SADAH, date: '2026-02-11', dateLabel: '11 فبراير 2026', title: 'اتفاقية تعاون وشراكة بين بهجة وولاية سدح', id: 'news_sadah' },
    ],
  },
  privacyUrl: 'https://bahjah.org.om/wp/%d8%b3%d9%8a%d8%a7%d8%b3%d8%a9-%d8%a7%d9%84%d8%ae%d8%b5%d9%88%d8%b5%d9%8a%d8%a9/',
};

orgEn.shared = {
  trust: {
    kicker: 'Why Bahjah?',
    title: 'Orphan care in Oman since 2014',
    text: 'A non-governmental charity established under Royal Decree No. 14/2000, caring for orphans inside and outside their homes.',
    facts: [
      { icon: 'calendar', value: '2014', label: 'Year established' },
      { icon: 'users', value: '1,361', label: 'Registered orphans', note: '2023' },
      { icon: 'shield', value: 'ISO', label: 'Certified', note: '2023' },
      { icon: 'award', value: '7', label: 'Awards & honours', note: '2013 – 2024' },
    ],
    awards: AWARD_IMGS.map((x) => ({ ...x, alt: `${orgEn.awards[x.key].title}, ${orgEn.awards[x.key].year}` })),
    awardsAria: "The Society's awards and certificates",
    note: "The orphan count is a historical figure from the Society's published profile (2023 statistics); awards are as displayed on the Society's website, with their years.",
  },
  news: {
    kicker: 'Bahjah on the ground',
    title: 'Activities and partnerships serving orphans',
    galleryAria: "Photos from the Society's activities",
    gallery: [
      { ...GALLERY[0], alt: 'School students at a Bahjah Society event', caption: 'An educational event for children' },
      { ...GALLERY[1], alt: 'In-kind aid outside the Omani Bahjah Orphan Society building', caption: "In-kind aid outside the Society's headquarters" },
      { ...GALLERY[2], alt: 'Signing of funding agreements for civil associations', caption: 'Signing funding agreements — March 2021' },
    ],
    links: [
      { href: NEWS_JAZER, date: '2026-02-04', dateLabel: '4 February 2026', title: 'Cooperation agreement for orphan sponsorship with the Wali of Al Jazer (Arabic)', id: 'news_jazer' },
      { href: NEWS_SADAH, date: '2026-02-11', dateLabel: '11 February 2026', title: 'Cooperation and partnership agreement between Bahjah and the Wilayat of Sadah (Arabic)', id: 'news_sadah' },
    ],
  },
  privacyUrl: org.shared.privacyUrl,
};
