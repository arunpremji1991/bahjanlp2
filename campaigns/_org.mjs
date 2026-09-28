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
    iso:          { title: 'شهادة الأيزو', year: '2023', img: null },
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
