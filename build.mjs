#!/usr/bin/env node
// Build static campaign pages.
//   node build.mjs              → builds every campaigns/*.mjs (except _*.mjs)
//   node build.mjs renovation   → builds one campaign
// Output: dist/<slug>/index.html + dist/assets/ (shared)
// The campaign marked DEFAULT is also written to dist/index.html.
import { readdir, mkdir, writeFile, copyFile, cp, rm, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { render } from './src/template.mjs';
import { tracking } from './campaigns/_tracking.mjs';
import { credits } from './assets/credits.mjs';

const DEFAULT = 'renovation';
const only = process.argv[2];

const files = (await readdir('campaigns')).filter((f) => f.endsWith('.mjs') && !f.startsWith('_'));
const slugs = files.map((f) => f.replace(/\.mjs$/, '')).filter((s) => !only || s === only);
if (!slugs.length) {
  console.error(`No campaign found${only ? ` named "${only}"` : ''}. Available: ${files.join(', ')}`);
  process.exit(1);
}

// Basic guard-rails so a config can't ship with obviously wrong data.
function validate(c) {
  const errs = [];
  if (!/^https:\/\/bahjah\.org\.om\//.test(c.payment?.url || '')) errs.push('payment.url must be an official https://bahjah.org.om/ URL');
  if (!c.cta?.primary) errs.push('cta.primary is required');
  const p = c.hero?.progress;
  if (p?.enabled && !(p.target && p.raised != null && p.sourceUrl && p.asOf))
    errs.push('hero.progress.enabled requires target, raised, asOf and an official sourceUrl');
  for (const x of c.amount?.officialAmounts || []) if (!x.value || !x.label) errs.push('each officialAmounts entry needs value + label');
  if ((c.amount?.officialAmounts || []).length && !c.amount.source) errs.push('amount.source is required when officialAmounts are listed');
  return errs;
}

await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });
await cp('assets/img', 'dist/assets/img', { recursive: true });
await copyFile('src/styles.css', 'dist/assets/styles.css');
await copyFile('src/app.js', 'dist/assets/app.js');

// Cache-busting: append a content hash to CSS/JS URLs (they are cached for 7 days).
const ver = createHash('sha1').update(await readFile('src/styles.css')).update(await readFile('src/app.js')).digest('hex').slice(0, 8);
const bust = (html) => html.replace(/(assets\/(?:styles\.css|app\.js))"/g, `$1?v=${ver}"`);

// Credits map keys are "assets/…"; published paths are relative to each page.
for (const slug of slugs) {
  const { default: c } = await import(pathToFileURL(`campaigns/${slug}.mjs`).href);
  if (c.template === 'waqf') { console.log(`… ${slug}: waqf template not built yet (src/waqf.mjs pending), skipped`); continue; }
  const errs = validate(c);
  if (errs.length) {
    console.error(`✗ ${slug}:\n  - ${errs.join('\n  - ')}`);
    process.exitCode = 1;
    continue;
  }
  for (const img of [c.hero.image?.src, ...(c.evidence.gallery?.images || []).map((i) => i.src)].filter(Boolean))
    if (!existsSync(img)) console.warn(`  ! ${slug}: missing image ${img}`);

  // English counterpart (campaigns/en/<slug>.mjs), if one exists.
  const enPath = `campaigns/en/${slug}.mjs`;
  const en = existsSync(enPath) ? (await import(pathToFileURL(enPath).href)).default : null;
  if (en) {
    const enErrs = validate(en);
    if (enErrs.length) { console.error(`✗ en/${slug}:\n  - ${enErrs.join('\n  - ')}`); process.exitCode = 1; }
  }
  const isDefault = slug === DEFAULT;

  await mkdir(`dist/${slug}`, { recursive: true });
  await writeFile(`dist/${slug}/index.html`, bust(render(c, tracking, credits, '../', en ? { alt: { href: `../en/${slug}/`, abs: en.seo.canonical } } : {})));
  if (isDefault) await writeFile('dist/index.html', bust(render(c, tracking, credits, '', en ? { alt: { href: 'en/', abs: en.seo.canonical } } : {})));
  if (en) {
    await mkdir(`dist/en/${slug}`, { recursive: true });
    await writeFile(`dist/en/${slug}/index.html`, bust(render(en, tracking, credits, '../../', { alt: { href: `../../${slug}/`, abs: c.seo.canonical } })));
    if (isDefault) await writeFile('dist/en/index.html', bust(render(en, tracking, credits, '../', { alt: { href: '../', abs: c.seo.canonical } })));
    console.log(`✓ dist/en/${slug}/index.html${isDefault ? '  (+ dist/en/index.html)' : ''}`);
  }
  console.log(`✓ dist/${slug}/index.html${slug === DEFAULT ? '  (+ dist/index.html)' : ''}`);
}
