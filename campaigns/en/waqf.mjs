// ENGLISH version of campaigns/waqf.mjs: same facts, links, images and flow;
// text only. Keep it faithful to the Arabic/official sources.
import ar from '../waqf.mjs';
import { orgEn } from '../_org.mjs';

const projectText = [
  {
    title: 'Charitable waqf buildings',
    text: 'Bahjah aims to complete 10 charitable endowment buildings for orphans by 2040 to ensure a sustainable income, which companies and individuals can sponsor for years. The first building was completed in 2020.',
    alt: 'Administration of Charity Buildings logo – Bahjah',
  },
  {
    title: 'Bahjah Waqf Complex for Orphans',
    text: 'A residential and commercial complex on 2,000 m² of land: four 10-storey buildings with 156 apartments and 28 shops, plus a library, a sewing workshop and classrooms.',
    detail: 'Estimated project cost: OMR 2,000,000 (per Bahjah\'s profile)',
    alt: 'Bahjah Complex logo',
  },
  {
    title: 'Bahjah Industrial Waqf Complex',
    text: 'An environmentally friendly project with three production lines: bottling mineral water, tissue paper and wood recycling.',
    detail: 'Estimated cost: OMR 80k for water, 75k for tissue, 60k for wood recycling',
    alt: 'Bahjah Industrial Complex logo',
  },
  {
    title: 'Khairat Najd agricultural complex',
    text: 'Agricultural projects as a sustainable income for orphans, from wheat and other crops.',
    alt: 'Khairat Najd (Charity farmland) logo',
  },
  {
    title: 'Bahjah Hall',
    text: 'A hall equipped for courses, workshops and lectures, seating more than 80 people, rented out as a source of income for orphans.',
    alt: 'Bahjah Hall logo',
  },
];

export default {
  ...ar,
  lang: 'en',
  org: orgEn,

  seo: {
    ...ar.seo,
    title: 'Bahjah Waqf | Sadaqah Jariyah for Orphans in Oman – Omani Bahjah Orphan Society',
    description:
      "Give to Bahjah Waqf: ongoing charity (Sadaqah Jariyah) with lasting impact. The revenue of the Omani Bahjah Orphan Society's endowments returns to the society and its projects serving orphans, including its charity buildings and the Bahjah Waqf Complex.",
    canonical: '', // set at build time from campaigns/_site.mjs
    ogImageAlt: 'Bahjah Waqf – Sadaqah Jariyah for orphans',
  },

  payment: {
    ...ar.payment,
    label: 'Bahjah Waqf',
    // Messages go to Bahjah's Arabic-speaking team, so keep them bilingual.
    whatsappMessage: 'السلام عليكم، أرغب بالمساهمة في وقف بهجة بمبلغ {amount} ر.ع. | Hello, I would like to give {amount} OMR to Bahjah Waqf.',
    whatsappMessageNoAmount: 'السلام عليكم، أرغب بالمساهمة في وقف بهجة. | Hello, I would like to give to Bahjah Waqf.',
    corporateMessage: 'السلام عليكم، أرغب بالاستفسار عن المساهمة في وقف بهجة. | Hello, I would like to discuss a corporate / major gift to Bahjah Waqf.',
    domainNote: "You contact the Omani Bahjah Orphan Society directly on its official WhatsApp.",
  },

  cta: {
    primary: 'Give to Bahjah Waqf now',
    short: 'Give to the Waqf',
    hero: 'Give to Bahjah Waqf',
    secondary: 'What is Bahjah Waqf?',
  },

  hero: {
    ...ar.hero,
    eyebrow: 'Bahjah Waqf · Sadaqah Jariyah for orphans',
    title: 'Make your giving',
    titleAccent: 'an impact that never ends',
    note: 'A charity since 2014 · ISO certified 2023',
    tagline: "Today's charity… its impact continues.",
    supporting: "Your gift doesn't only meet a moment's need; it helps build a sustainable source of income that serves orphans.",
    quote: { text: 'Ongoing charity whose benefit lasts and whose reward multiplies', cite: "From Bahjah's website (translated from Arabic)" },
    image: { ...ar.hero.image, alt: "A hand holding a young seedling – image from the ongoing-charity section of Bahjah's website" },
    trust: ['Non-governmental charity since 2014', 'Endowment revenue returns to Bahjah and its projects', 'Direct contact with Bahjah'],
  },

  idea: {
    ...ar.idea,
    kicker: 'The idea of waqf',
    title: 'What is Bahjah Waqf?',
    lead: 'A waqf is ongoing charity (Sadaqah Jariyah): the asset remains, and its benefit continues.',
    text: 'The Omani Bahjah Orphan Society holds endowments of apartments, land and anything that can be endowed, and all of their revenue returns to the society and its projects. Through them it seeks a sustainable income for all orphans and widows.',
    flow: [
      { icon: 'hand', title: 'Your gift', text: 'The amount you choose' },
      { icon: 'building', title: 'An endowed asset', text: 'Buildings, apartments, land and anything that can be endowed' },
      { icon: 'seed', title: 'Lasting revenue', text: "Returns to Bahjah and its projects serving orphans" },
    ],
    source: "Source: Bahjah's official profile.",
  },

  impact: {
    ...ar.impact,
    kicker: 'Impact',
    title: 'Impact that lasts for years',
    items: [
      { icon: 'family', title: 'Supporting families', text: 'Through its endowments, Bahjah seeks a sustainable income for all orphans and widows.' },
      { icon: 'heart', title: 'Caring for orphans', text: 'Monthly financial support, alongside emotional, health, educational and social support.' },
      { icon: 'seed', title: 'Sustainable impact', text: 'Ongoing charity whose benefit lasts; its revenue returns to Bahjah and its projects.' },
    ],
  },

  projects: {
    ...ar.projects,
    kicker: "Bahjah's waqf projects",
    title: "Endowments building orphans' future",
    intro: "Projects through which Bahjah aims to create a sustainable income for orphans, as described in its profile and project pages.",
    stats: [
      { value: '10', label: 'charitable waqf buildings for orphans: the 2040 goal' },
      { value: '2020', label: 'first charity building completed' },
      { value: '156', label: 'apartments in the Bahjah Waqf Complex' },
      { value: '2014', label: 'year Bahjah was founded' },
    ],
    items: ar.projects.items.map((it, i) => ({
      ...it,
      title: projectText[i].title,
      text: projectText[i].text,
      detail: projectText[i].detail,
      image: { ...it.image, alt: projectText[i].alt },
    })),
    source: "Source: Bahjah's official profile (pages 10 and 19) and the project pages on its website. Figures and estimated costs as published by Bahjah.",
  },

  amount: {
    ...ar.amount,
    kicker: 'Your gift',
    title: 'Choose your gift to the waqf',
    otherLabel: 'Other amount',
    note: "The button opens Bahjah's WhatsApp with a ready message including your amount; Bahjah's team then contacts you to complete the gift and allocate it to the waqf.",
  },

  corporate: {
    ...ar.corporate,
    kicker: 'For companies & major donors',
    title: 'Help build an endowment that lasts',
    text: "Bahjah's charitable waqf buildings are designed so companies and individuals can sponsor them for years, and Bahjah holds endowments of apartments, land and anything that can be endowed.",
    points: ['Sponsor a charitable waqf building', 'Endow an apartment, land or other asset', 'Corporate and family giving'],
    cta: 'Contact Bahjah',
  },

  faq: [
    { q: 'What is Bahjah Waqf?', a: "It is your contribution to the endowments (waqf) of the Omani Bahjah Orphan Society. Bahjah holds endowments of apartments, land and anything that can be endowed, and all of their revenue returns to the society and its projects, seeking a sustainable income for orphans and widows." },
    { q: 'Can I give any amount?', a: 'Yes. Choose 10, 25, 50 or 100 OMR, or type your own amount under "Other amount".' },
    { q: 'How do I give?', a: 'Choose an amount and tap "Give to Bahjah Waqf now". Bahjah\'s official WhatsApp opens with a ready message and the team contacts you to complete the gift. You can also transfer to Bahjah\'s bank accounts and send the transfer receipt on WhatsApp, mentioning "وقف بهجة" (Bahjah Waqf).' },
    { q: 'Is it a one-off gift, or can I give regularly?', a: 'You can give once or repeat your gift whenever you like. For regular giving, or to sponsor a charitable waqf building for years, contact Bahjah to arrange the right method.' },
    { q: 'Where does my gift go?', a: "Waqf contributions go to Bahjah's endowments, whose revenue returns to the society and its projects serving orphans and widows. To make sure your gift is allocated to the waqf, mention \"Bahjah Waqf\" when you contact Bahjah or send your transfer receipt." },
    { q: 'Can I endow an apartment or land?', a: 'Yes. According to Bahjah\'s profile: "We hold endowments of apartments, land and anything that can be endowed." Contact Bahjah for details.' },
    { q: 'Can companies contribute?', a: "Yes. Bahjah's charitable waqf buildings are designed so companies and individuals can sponsor them for years. Contact Bahjah to discuss the form of your contribution." },
    { q: 'How can I contact Bahjah?', a: 'Phone: {org.phones} · WhatsApp: {org.whatsapp} · Email: {org.email} · Address: {org.address}' },
  ],

  final: {
    title: 'Make your charity an impact that never ends',
    text: "Today's charity… its impact continues.",
  },

  faqTitle: 'Questions about Bahjah Waqf',
  sources: [
    "bahjah.org.om/wp/ — about, founding date, awards, contact details, the «ongoing charity» section and its image",
    "Society profile (CV-Print-Proof.pdf) — long-term plan, charitable waqf buildings, Bahjah Waqf Complex, 2023 statistics, activity photos",
    "Bahjah project pages (archived 16/4/2026) — Waqf Complex, charity buildings, industrial complex, Khairat Najd, Bahjah Hall",
    'bahjah.org.om/wp/product/صدقة/ — charity (sadaqah) image',
    'bahjah.org.om/wp/المركز-الاعلامي/ — news',
  ],
  disclaimer: "This landing page directs visitors to the Society's official contact and donation channels. It does not process payments or store financial data.",
  nav: [
    { href: '#about-waqf', label: 'What is waqf?' },
    { href: '#projects', label: 'Waqf projects' },
    { href: '#corporate', label: 'For companies' },
    { href: '#faq', label: 'FAQ' },
  ],
};
