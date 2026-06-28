/**
 * CLI to import a story into Supabase.
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.
 *
 * Usage:
 *   pnpm add-story \
 *     --slug="fox-grapes" \
 *     --title-en="The Fox and the Grapes" \
 *     --title-el="Η Αλεπού και τα Σταφύλια" \
 *     --description-en="A fox tries in vain to reach some grapes." \
 *     --description-el="Μια αλεπού προσπαθεί μάταια να φτάσει κάποια σταφύλια." \
 *     --audio="./audio/fox-grapes.mp3" \
 *     --duration=310 \
 *     --category="fable" \
 *     --tags="fox,grapes" \
 *     --publish
 */

import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { createClient } from '@supabase/supabase-js';

const { values } = parseArgs({
  options: {
    slug: { type: 'string' },
    'title-en': { type: 'string' },
    'title-el': { type: 'string' },
    'description-en': { type: 'string', default: '' },
    'description-el': { type: 'string', default: '' },
    audio: { type: 'string' },
    artwork: { type: 'string', default: '' },
    duration: { type: 'string', default: '' },
    category: { type: 'string', default: 'fable' },
    tags: { type: 'string', default: '' },
    publish: { type: 'boolean', default: false },
  },
  strict: true,
});

const slug = values['slug'];
const titleEn = values['title-en'];
const titleEl = values['title-el'];
const audioFile = values['audio'];

if (!slug || !titleEn || !titleEl || !audioFile) {
  console.error('Required: --slug, --title-en, --title-el, --audio');
  process.exit(1);
}

const url = process.env['SUPABASE_URL'];
const serviceKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];

if (!url || !serviceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

const audioPath = path.resolve(audioFile);
if (!fs.existsSync(audioPath)) {
  console.error(`Audio file not found: ${audioPath}`);
  process.exit(1);
}

const audioBuffer = fs.readFileSync(audioPath);
const storagePath = `${slug}.mp3`;

console.log(`Uploading audio → audio/${storagePath}`);
const { error: uploadError } = await supabase.storage
  .from('audio')
  .upload(storagePath, audioBuffer, { contentType: 'audio/mpeg', upsert: true });

if (uploadError !== null) {
  console.error('Audio upload failed:', uploadError.message);
  process.exit(1);
}

let artworkStoragePath: string | null = null;
const artworkFile = values['artwork'];
if (artworkFile !== '') {
  const artworkPath = path.resolve(artworkFile);
  if (!fs.existsSync(artworkPath)) {
    console.error(`Artwork file not found: ${artworkPath}`);
    process.exit(1);
  }
  const ext = path.extname(artworkPath).slice(1) || 'jpg';
  artworkStoragePath = `${slug}.${ext}`;
  const artworkBuffer = fs.readFileSync(artworkPath);
  console.log(`Uploading artwork → artwork/${artworkStoragePath}`);
  const { error: artworkError } = await supabase.storage
    .from('artwork')
    .upload(artworkStoragePath, artworkBuffer, {
      contentType: `image/${ext}`,
      upsert: true,
    });
  if (artworkError !== null) {
    console.error('Artwork upload failed:', artworkError.message);
    process.exit(1);
  }
}

const durationRaw = values['duration'];
const durationSeconds = durationRaw !== '' ? parseInt(durationRaw, 10) : null;
const tags = values['tags'] !== '' ? values['tags']!.split(',').map((t) => t.trim()) : [];

const { error: insertError } = await supabase.from('stories').upsert(
  {
    slug,
    title_en: titleEn,
    title_el: titleEl,
    description_en: values['description-en'] !== '' ? values['description-en'] : null,
    description_el: values['description-el'] !== '' ? values['description-el'] : null,
    audio_path: storagePath,
    artwork_path: artworkStoragePath,
    duration_seconds: durationSeconds,
    category: values['category'] ?? 'fable',
    tags,
    published_at: values['publish'] ? new Date().toISOString() : null,
  },
  { onConflict: 'slug' },
);

if (insertError !== null) {
  console.error('Database insert failed:', insertError.message);
  process.exit(1);
}

console.log(`✓ Story "${titleEn}" (${slug}) saved successfully.`);
if (values['publish']) {
  console.log('  Published: yes');
} else {
  console.log('  Published: no (use --publish to make it visible)');
}
