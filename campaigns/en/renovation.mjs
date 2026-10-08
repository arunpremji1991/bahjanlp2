// ═══════════════════════════════════════════════════════════════════════════
// ENGLISH version of campaigns/renovation.mjs
// Reuses every link, image, number and setting from the Arabic config and only
// overrides text. Translations are faithful to the Arabic/official sources; do
// not add claims here that the Arabic page does not make.
// Built to dist/en/renovation/ (and dist/en/ for the default campaign).
// ═══════════════════════════════════════════════════════════════════════════
import ar from '../renovation.mjs';
import { orgEn } from '../_org.mjs';

const captions = {
  1: 'Restoring a damaged room ceiling',
  5: 'Repairing a deteriorated ceiling',
  3: 'Repairing the roof',
  4: 'Restoring walls and floors',
  6: 'Renovating a bathroom',
  2: "Renewing the home's exterior",
};

export default {
  ...ar,
  lang: 'en',
  org: orgEn,

  seo: {
    ...ar.seo,
    title: "Renovating & Building Orphans' Homes in Oman | Omani Bahjah Orphan Society",
    description:
      "A safe home means dignity and peace of mind for an orphan family. Help renovate and build orphans' homes in Oman with the Omani Bahjah Orphan Society through its official \"Building & Renovation\" page, even with one rial.",
    canonical: '', // set at build time from campaigns/_site.mjs
    ogImageAlt: "Before and after photos of Bahjah's home maintenance and renovation work",
  },

  payment: {
    ...ar.payment,
    label: 'Building & Renovation',
    labelAr: 'بناء وترميم',
    domainNote: "You donate on Bahjah's official website, bahjah.org.om (in Arabic).",
  },

  cta: {
    primary: "Donate now to renovate orphans' homes",
    short: 'Donate',
    hero: 'Help build a safe home',
    secondary: 'See the impact of your gift',
  },

  hero: {
    ...ar.hero,
    eyebrow: "Building & renovating orphans' homes in Oman",
    title: 'A safe home…',
    titleAccent: 'means a more peaceful heart',
    note: 'A charity since 2014 · ISO certified 2023',
    priceTag: { value: '1', text: 'OMR · Give, even if only one rial.' },
    need: "The Omani Bahjah Orphan Society is committed to providing safe, sound housing, so it maintains and renovates orphans' damaged homes.",
    needSource: "Bahjah's official profile",
    supporting:
      'The Omani Bahjah Orphan Society maintains and renovates the homes of the families it supports, to give them a safer and more stable place to live.',
    supportingLines: [
      "An orphan's family needs more than new walls; it needs a home that protects its dignity and gives its children safety and calm.",
      "Give what you can to renovate and build orphans' homes with the Omani Bahjah Orphan Society.",
      'Your gift may be small… but it may be the reason a family sleeps safely.',
    ],
    trust: [
      'Non-governmental charity since 2014',
      "Donations via Bahjah's official website",
      'Payment through Bank Muscat SmartPay',
    ],
  },

  homeMeaning: {
    kicker: 'What a home means',
    title: 'A home is more than walls',
    lines: [
      'A home is where a child feels safe.',
      'It is the roof that shelters them from rain and heat.',
      'It is where the family returns after a long day.',
      'It is where an orphan should find peace, not fear of a crumbling roof or a cracked wall.',
      { text: "That is why renovating an orphan family's home is not just repairing a house…", strong: true },
      { text: 'It is restoring a space where people live with dignity.', strong: true },
      'And your gift can be part of that safety.',
    ],
  },

  mercy: {
    ...ar.mercy, // the verse and its reference stay exactly as in Arabic
    kicker: 'Mercy and kindness',
    title: 'The good you do is never lost with Allah',
    lines: [
      'Translation of the meaning: "And whatever good you put forward for yourselves, you will find it with Allah." (Al-Baqarah 2:110)',
      'In Islam, giving is more than money leaving your hand.',
      { text: 'It is mercy. And kindness. And relief of a need. And a reward we hope to find with Allah.', strong: true },
      "When you help renovate an orphan family's home, you are not only building walls… you are helping create safety and peace of mind.",
    ],
    cta: 'Be part of this good',
  },

  compare: {
    ...ar.compare,
    title: 'From a home in need of care… to a safer home',
    intro: "Before and after photos of maintenance and renovation work carried out by Bahjah, as published in its official profile. Drag the handle to compare.",
    introLines: [
      'These are not just before-and-after photos; they are moments from the lives of families who needed someone to stand with them.',
      'Before the renovation: needs and problems waiting to be fixed. After: a safer, more comfortable space for the family.',
      'Behind every photo… a family. Behind every gift… a person.',
      "Drag the handle to compare. The photos come from the maintenance and renovation work documented in Bahjah's official profile.",
    ],
    source: "Photos from Bahjah's official profile (maintenance and renovation section).",
    pairs: ar.compare.pairs.map((p) => ({ ...p, caption: captions[p.id] || p.caption })),
  },

  process: {
    kicker: 'Simple steps',
    title: 'How to give',
    steps: [
      { icon: 'wallet', title: 'Choose your amount', text: 'Choose the amount you are able to give.' },
      { icon: 'shield', title: 'Go to the "Building & Renovation" page', text: "Tap \"Donate now\" to go to Bahjah's official donation page." },
      { icon: 'card', title: 'Complete your gift', text: 'You can pay by card through the Bank Muscat SmartPay gateway.' },
    ],
    source: '',
  },

  need: {
    title: 'Because safety begins at home',
    paragraphs: [
      "Bahjah began maintaining and renovating orphans' homes after Cyclone Mekunu in 2018, when a specialist team visited homes, recorded cases and assessed the maintenance and renovation needed.",
      'Since then, maintenance and renovation work has continued throughout the year, and its pace increases when Oman is affected by severe weather.',
      "Every home has its need. Every family has its story. And every gift can change something important in a family's life.",
    ],
    quote: {
      text: 'Renovating the homes of orphans and widows is not just repairing "concrete"; it is security for their hearts.',
      cite: "From Bahjah's announcement of the campaign to renovate 10 homes of widows and orphans, March 2026 (translated from Arabic)",
    },
    source: "Bahjah's official profile (maintenance and renovation) and the official campaign announcement",
  },

  supports: {
    ...ar.supports,
    title: 'Where can your impact reach?',
    intro: 'Donations go through Bahjah\'s official "Building & Renovation" page, which Bahjah describes as: "Help us renovate and build orphans\' homes."',
    items: [
      { icon: 'roof', title: 'Repairing deteriorated roofs', text: 'A safer roof means better protection for the family from the weather.' },
      { icon: 'wall', title: 'Restoring cracked walls', text: 'Fixing what needs fixing, so the home stays a sound and safe place to live.' },
      { icon: 'tools', title: 'Preparing essential facilities', text: 'Kitchens, bathrooms and other essentials that make a home more suitable for the family.' },
      { icon: 'home', title: "Building orphans' homes", text: 'When renovation is not enough, building can be the start of a new and safer home.' },
    ],
    itemsSource: 'Items from Bahjah\'s renovation campaign announcement (March 2026) and its description of the "Building & Renovation" donation page.',
    note: "Bahjah's team decides the work needed for each home after a visit and assessment, as documented in its maintenance and renovation method.",
  },

  evidence: {
    kicker: "From Bahjah's work",
    title: 'The 10-homes campaign… a legacy of Ramadan',
    intro: [
      'During Ramadan, in March 2026, Bahjah launched a campaign to renovate ten homes of orphan and widow families.',
      'The campaign included work such as:',
    ],
    bullets: ['Repairing deteriorated roofs', 'Restoring cracked walls', 'Preparing kitchens, bathrooms and essential facilities'],
    outro: ['The need for renovation may continue after the campaign, so the "Building & Renovation" fund remains open for cases that need support.'],
    introLink: ar.evidence.introLink,
    gallery: null,
    items: [
      {
        ...ar.evidence.items[0],
        date: 'Since 2018',
        title: 'Home renovation and maintenance',
        text: "After Cyclone Mekunu, Bahjah's team visited homes, recorded cases, assessed the maintenance needed and carried it out. Bahjah also implemented the Minister of Social Development's recommendation to maintain 5 homes in Wilayat Mirbat.",
      },
      {
        ...ar.evidence.items[1],
        date: 'A Bahjah project',
        title: 'Bahjah Residential Complex',
        text: 'A residential and commercial complex that provides housing for orphans, made up of four buildings with a garden and outdoor spaces.',
        image: { ...ar.evidence.items[1].image, alt: 'Bahjah Complex logo' },
      },
      {
        ...ar.evidence.items[2],
        date: 'Goal: 2040',
        title: 'Charity Buildings Administration',
        text: 'Bahjah aims to complete 10 charitable buildings by 2040 to ensure a sustainable income, and has completed the first building, thank God.',
        image: { ...ar.evidence.items[2].image, alt: 'Administration of Charity Buildings logo – Bahjah' },
      },
    ],
  },

  amount: {
    ...ar.amount,
    title: 'Give, even if only one rial',
    introLines: [
      'What matters is not how big your gift is… but the good in it.',
      'It may be one rial. It may be ten. It may be a hundred.',
      "What matters is that your gift helps fix something an orphan family's home needs.",
    ],
    cta: 'I want to give',
    anyAmountNote: '',
    source: 'Source: the "Building & Renovation" page on Bahjah\'s website and the renovation campaign announcement.',
  },

  faq: [
    {
      q: 'Where does my donation go?',
      a: 'Your gift goes to the "Building & Renovation" (بناء وترميم) fund of the Omani Bahjah Orphan Society, to support maintaining, renovating and building the homes of the families it serves, according to each case\'s needs and the assessment of Bahjah\'s team.',
    },
    {
      q: 'What does renovation include?',
      a: 'It can include repairing deteriorated roofs, restoring cracked walls and preparing essential facilities such as kitchens and bathrooms, as well as building work when needed.',
    },
    {
      q: 'Is the 10-homes campaign still open?',
      a: 'The campaign to renovate ten homes was announced in March 2026. The "Building & Renovation" fund is a permanent donation option; to ask about a specific campaign, you can contact Bahjah directly.',
    },
    {
      q: 'Can I give a small amount?',
      a: 'Yes. You can give whatever you are able to; in its renovation campaign, Bahjah used the phrase "Give, even if only one rial."',
    },
    {
      q: 'How do I donate?',
      a: 'Tap the donate button to go to the official "Building & Renovation" page (in Arabic), choose the quantity and amount, and complete payment through the available channels. The page shows a unit value of "1,000 ر.ع.", which means one Omani rial, so type your amount in rials in the "الكمية" (Quantity) field (for example, 20 = twenty rials), then tap "تبرع الان" (Donate now).',
    },
    {
      q: 'Which payment methods are available?',
      a: 'According to the FAQ page on Bahjah\'s website: "We accept credit and debit cards through the Bank Muscat SmartPay gateway."',
    },
    {
      q: 'Are there other ways to contribute?',
      a: 'Yes, choose whatever suits you: transfer to Bahjah\'s bank accounts, text the word "تبرع" to the toll-free number 90021 to donate 1 OMR (Omantel and Ooredoo), or donate through the Bahjah app. Details are in the section below.',
    },
    {
      q: 'How can I contact Bahjah?',
      a: "Bahjah's team is happy to hear from you: Phone {org.phones} · WhatsApp {org.whatsapp} · Email {org.email} · Address: {org.address}",
    },
  ],

  otherWays: {
    ...ar.otherWays,
    title: 'Choose the way that suits you… and open a door to good',
    earmarkNote: 'To make sure a bank transfer is allocated to renovation, contact Bahjah after transferring.',
  },

  final: {
    title: 'Make a safer home… a charity for you',
    lines: [
      "You may not know the family's name. You may not see their moment of joy.",
      'You may not know how much your gift changed in their life… but Allah knows.',
      "Give what you can to renovate and build orphans' homes.",
      'One rial from you… may be the beginning of safety. And your gift today… may be a lasting good for you with Allah.',
    ],
    text: 'Whatever the amount, your gift goes to the "Building & Renovation" fund for orphans\' homes at the Omani Bahjah Orphan Society.',
    note: 'May Allah accept our good deeds and yours.',
  },

  trust: {
    title: 'When you give… you deserve peace of mind',
    text: [
      'The Omani Bahjah Orphan Society is a non-governmental charity dedicated to caring for orphans, founded on 10 February 2014 under Royal Decree No. 14/2000.',
      'Bahjah provides care and assistance to orphans, including financial, emotional, health, educational and social support.',
      'Our goal is not only that an orphan lives… but that they grow up in a safer, more dignified and hopeful environment.',
    ],
  },

  faqTitle: "Questions about giving to renovate orphans' homes",
  sources: [
    'bahjah.org.om/wp/ — about, founding date, awards, contact details',
    'bahjah.org.om/wp/product/بناء-و-ترميم/ — the "Building & Renovation" donation page and unit value',
    'bahjah.org.om/wp/الاسئلة-الشائعة/ — payment methods (Bank Muscat SmartPay)',
    'bahjah.org.om/wp/المركز-الاعلامي/ — news',
    "Society profile (CV-Print-Proof.pdf) — maintenance & renovation work, before/after photos, 2023 statistics, activity photos",
    "Bahjah's announcement of the campaign to renovate 10 homes of widows and orphans (March 2026) — campaign items and other donation channels",
  ],
  disclaimer: "This landing page directs visitors to the Society's official donation page. It does not process payments or store financial data.",
  sticky: { value: '1 OMR', note: 'minimum gift' },
  nav: [
    { href: '#covers', label: 'What you support' },
    { href: '#impact', label: 'Before & after' },
    { href: '#trust', label: 'Why Bahjah' },
    { href: '#faq', label: 'FAQ' },
  ],
};
