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
    title: "Help renovate orphan families' homes | Omani Bahjah Orphan Society",
    description:
      "Donate through the official website of the Omani Bahjah Orphan Society to support the maintenance, renovation and building of orphan families' homes: repairing deteriorated roofs, restoring cracked walls and preparing essential facilities.",
    canonical: 'https://bahjah.org.om/campaign/en/renovation/', // ← set to the real published URL
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
    hero: 'Donate now',
    secondary: 'See the impact of your gift',
  },

  hero: {
    ...ar.hero,
    eyebrow: "Building & renovating orphans' homes",
    title: 'A safe home for an orphan family starts with you',
    need: "The Omani Bahjah Orphan Society is committed to providing safe, sound housing, so it maintains and renovates orphans' damaged homes.",
    needSource: "Bahjah's official profile",
    supporting:
      'The Omani Bahjah Orphan Society maintains and renovates the homes of the families it supports, to give them a safer and more stable place to live.',
    trust: [
      'Non-governmental charity since 2014',
      "Donations via Bahjah's official website",
      'Payment through Bank Muscat SmartPay',
    ],
  },

  compare: {
    ...ar.compare,
    title: "Real results from Bahjah's work",
    intro: "Before and after photos of maintenance and renovation work carried out by Bahjah, as published in its official profile. Drag the handle to compare.",
    source: "Photos from Bahjah's official profile (maintenance and renovation section).",
    pairs: ar.compare.pairs.map((p) => ({ ...p, caption: captions[p.id] || p.caption })),
  },

  process: {
    title: 'How does your gift reach the home?',
    steps: [
      { title: 'You donate on the official website', text: 'Through the "Building & Renovation" page on Bahjah\'s website, paying via the Bank Muscat SmartPay gateway.' },
      { title: 'Home visits and case records', text: "A specialist team from Bahjah visits the homes and records each case." },
      { title: 'Assessing the work', text: 'The team assesses the damage and calculates the maintenance and renovation work needed.' },
      { title: 'The work is carried out', text: 'Maintenance and renovation work begins, and continues throughout the year.' },
    ],
    source: "Method as described in Bahjah's official profile (maintenance and renovation).",
  },

  need: {
    title: "Why renovate orphans' homes?",
    paragraphs: [
      "Bahjah began its maintenance and renovation work after Cyclone Mekunu in 2018: a specialist team visited homes, recorded cases and assessed the maintenance and renovation needed, then began the work.",
      'Maintenance and renovation work continues throughout the year, and increases when Oman is affected by severe weather.',
    ],
    quote: {
      text: 'Renovating the homes of orphans and widows is not just repairing "concrete"; it is security for their hearts.',
      cite: "From Bahjah's announcement of the campaign to renovate 10 homes of widows and orphans, March 2026 (translated from Arabic)",
    },
    source: "Bahjah's official profile (maintenance and renovation) and the official campaign announcement",
  },

  supports: {
    ...ar.supports,
    title: 'What does your gift support?',
    intro: 'Donations go through Bahjah\'s official "Building & Renovation" page, which Bahjah describes as: "Help us renovate and build orphans\' homes."',
    items: [
      { icon: 'roof', title: 'Repairing deteriorated roofs', text: '' },
      { icon: 'wall', title: 'Restoring cracked walls', text: '' },
      { icon: 'kitchen', title: 'Preparing kitchens', text: '' },
      { icon: 'bath', title: 'Preparing bathrooms', text: '' },
      { icon: 'tools', title: 'Essential facilities and more', text: '' },
      { icon: 'home', title: "Building orphans' homes", text: '' },
    ],
    itemsSource: 'Items from Bahjah\'s renovation campaign announcement (March 2026) and its description of the "Building & Renovation" donation page.',
    note: "Bahjah's team decides the work needed for each home after a visit and assessment, as documented in its maintenance and renovation method.",
  },

  evidence: {
    title: "Bahjah's documented work",
    gallery: null,
    items: [
      {
        ...ar.evidence.items[0],
        date: 'March 2026',
        title: 'Campaign to renovate 10 homes of widows and orphans',
        text: 'During Ramadan (March 2026), Bahjah launched a campaign to renovate ten homes of orphan and widow families, including repairing deteriorated roofs, restoring cracked walls and preparing essential facilities such as kitchens and bathrooms.',
        note: 'A dated campaign; contact Bahjah to ask about its status.',
        image: { ...ar.evidence.items[0].image, alt: 'Logo of the Houses Maintenance project – Bahjah' },
      },
      {
        ...ar.evidence.items[1],
        date: 'Since 2018',
        title: 'Home renovation and maintenance',
        text: "After Cyclone Mekunu, Bahjah's team visited homes, recorded cases, assessed the maintenance needed and carried it out. Bahjah also implemented the Minister of Social Development's recommendation to maintain 5 homes in Wilayat Mirbat.",
      },
      {
        ...ar.evidence.items[2],
        date: 'A Bahjah project',
        title: 'Bahjah Residential Complex',
        text: 'A residential and commercial complex that provides housing for orphans, made up of four buildings with a garden and outdoor spaces.',
        image: { ...ar.evidence.items[2].image, alt: 'Bahjah Complex logo' },
      },
      {
        ...ar.evidence.items[3],
        date: 'Goal: 2040',
        title: 'Charity Buildings Administration',
        text: 'Bahjah aims to complete 10 charitable buildings by 2040 to ensure a sustainable income, and has completed the first building, thank God.',
        image: { ...ar.evidence.items[3].image, alt: 'Administration of Charity Buildings logo – Bahjah' },
      },
    ],
  },

  amount: {
    ...ar.amount,
    title: 'How much should I give?',
    anyAmountNote: '"Give, even if only one rial," as Bahjah\'s renovation campaign announcement puts it.',
    source: 'Source: the "Building & Renovation" page on Bahjah\'s website and the renovation campaign announcement.',
  },

  faq: [
    {
      q: 'Where does my donation go?',
      a: 'Directly to the Omani Bahjah Orphan Society, through the "Building & Renovation" (بناء وترميم) page on its official website, which Bahjah describes as: "Help us renovate and build orphans\' homes."',
    },
    {
      q: 'What exactly does this campaign support?',
      a: "Maintaining, renovating and building orphan families' homes, including repairing deteriorated roofs, restoring cracked walls and preparing essential facilities such as kitchens and bathrooms. Bahjah's team decides the work needed after visiting and assessing each case.",
    },
    {
      q: 'Is the "10 homes" campaign still open?',
      a: 'That campaign was announced in March 2026. This page accepts donations for Bahjah\'s ongoing "Building & Renovation" fund. To ask about a specific campaign, please contact Bahjah directly.',
    },
    {
      q: 'How do I donate?',
      a: 'Tap "Donate now" to go to the "Building & Renovation" page on Bahjah\'s official website (in Arabic). It shows a unit value of "1,000 ر.ع.", which means one Omani rial, so type your amount in rials in the "الكمية" (Quantity) field (for example, 20 = twenty rials), then tap "تبرع الان" (Donate now) and complete payment.',
    },
    {
      q: 'Which payment methods are available?',
      a: 'According to the FAQ page on Bahjah\'s website: "We accept credit and debit cards through the Bank Muscat SmartPay gateway."',
    },
    {
      q: 'Are there other ways to contribute?',
      a: 'Yes. You can transfer to Bahjah\'s bank accounts, text the word "تبرع" to the toll-free number 90021 to donate 1 OMR (Omantel and Ooredoo), or donate through the Bahjah app. See "Other ways to donate" below.',
    },
    {
      q: 'How can I contact Bahjah?',
      a: 'Phone: {org.phones} · WhatsApp: {org.whatsapp} · Email: {org.email} · Address: {org.address}',
    },
  ],

  otherWays: {
    ...ar.otherWays,
    earmarkNote: 'To make sure a bank transfer is allocated to renovation, contact Bahjah after transferring.',
  },

  final: {
    title: 'Help give an orphan family a safe home',
    text: 'Whatever the amount, your gift goes to the "Building & Renovation" fund for orphans\' homes at the Omani Bahjah Orphan Society.',
  },
};
