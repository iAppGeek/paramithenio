/**
 * CLI to import a story narration into Supabase.
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.
 *
 * Usage:
 *   pnpm add-story \
 *     --slug="fox-grapes" \
 *     --title-en="The Fox and the Grapes" \
 *     --title-el="Η Αλεπού και τα Σταφύλια" \
 *     --narrator-voice=female_adult \
 *     --audio="./audio/fox-grapes-female-adult.mp3" \
 *     --duration=310 \
 *     --description-en="A fox tries in vain to reach some grapes." \
 *     --description-el="Μια αλεπού προσπαθεί μάταια να φτάσει κάποια σταφύλια." \
 *     --category="fable" \
 *     --tags="fox,grapes" \
 *     --publish
 *
 * Audio storage path: {slug}/{narrator_voice}.mp3
 * Running the same --slug + --narrator-voice again will overwrite (upsert).
 */

import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { createClient } from '@supabase/supabase-js';

const VALID_VOICES = ['male_adult', 'female_adult', 'male_child', 'female_child'] as const;
type NarratorVoice = (typeof VALID_VOICES)[number];

const { values } = parseArgs({
  options: {
    slug: { type: 'string' },
    'title-en': { type: 'string' },
    'title-el': { type: 'string' },
    'description-en': { type: 'string', default: '' },
    'description-el': { type: 'string', default: '' },
    'narrator-voice': { type: 'string' },
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
const narratorVoiceRaw = values['narrator-voice'];

if (!slug || !titleEn || !titleEl || !audioFile || !narratorVoiceRaw) {
  console.error('Required: --slug, --title-en, --title-el, --narrator-voice, --audio');
  console.error(`Valid narrator voices: ${VALID_VOICES.join(', ')}`);
  process.exit(1);
}

if (!(VALID_VOICES as readonly string[]).includes(narratorVoiceRaw)) {
  console.error(
    `Invalid --narrator-voice "${narratorVoiceRaw}". Must be one of: ${VALID_VOICES.join(', ')}`,
  );
  process.exit(1);
}
const narratorVoice = narratorVoiceRaw as NarratorVoice;

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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
const audioStoragePath = `${slug}/${narratorVoice}.mp3`;

console.log(`Uploading audio → audio/${audioStoragePath}`);
const { error: uploadError } = await supabase.storage
  .from('audio')
  .upload(audioStoragePath, audioBuffer, { contentType: 'audio/mpeg', upsert: true });

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
    .upload(artworkStoragePath, artworkBuffer, { contentType: `image/${ext}`, upsert: true });
  if (artworkError !== null) {
    console.error('Artwork upload failed:', artworkError.message);
    process.exit(1);
  }
}

const durationRaw = values['duration'];
const durationSeconds = durationRaw !== '' ? parseInt(durationRaw, 10) : null;
const tags = values['tags'] !== '' ? values['tags']!.split(',').map((t) => t.trim()) : [];

// Upsert the story (content only, no audio fields).
const { data: storyData, error: storyError } = await supabase
  .from('stories')
  .upsert(
    {
      slug,
      title_en: titleEn,
      title_el: titleEl,
      description_en: values['description-en'] !== '' ? values['description-en'] : null,
      description_el: values['description-el'] !== '' ? values['description-el'] : null,
      artwork_path: artworkStoragePath,
      category: values['category'] ?? 'fable',
      tags,
      published_at: values['publish'] ? new Date().toISOString() : null,
    },
    { onConflict: 'slug' },
  )
  .select('id')
  .single();

if (storyError !== null) {
  console.error('Story upsert failed:', storyError.message);
  process.exit(1);
}

// Upsert the narration (audio for this specific voice).
const { error: narrationError } = await supabase.from('narrations').upsert(
  {
    story_id: storyData.id,
    narrator_voice: narratorVoice,
    audio_path: audioStoragePath,
    duration_seconds: durationSeconds,
  },
  { onConflict: 'story_id,narrator_voice' },
);

if (narrationError !== null) {
  console.error('Narration upsert failed:', narrationError.message);
  process.exit(1);
}

console.log(`✓ Story "${titleEn}" (${slug}) — voice: ${narratorVoice} — saved successfully.`);
console.log(`  Published: ${values['publish'] ? 'yes' : 'no (use --publish to make it visible)'}`);
