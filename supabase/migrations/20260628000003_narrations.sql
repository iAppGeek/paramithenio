-- Each story can have up to one narration per voice type.
-- Audio files live in Supabase Storage (bucket: audio).
-- Storage key convention: {slug}/{narrator_voice}.mp3

create table if not exists narrations (
  id               uuid        primary key default gen_random_uuid(),
  story_id         uuid        not null references stories(id) on delete cascade,
  narrator_voice   text        not null
                               check (narrator_voice in ('male_adult', 'female_adult', 'male_child', 'female_child')),
  audio_path       text        not null,
  duration_seconds integer,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (story_id, narrator_voice)
);

-- RLS on with no write policies: service role can insert/update, anon key
-- can only read narrations for published stories.
alter table narrations enable row level security;

create policy "narrations_select_published" on narrations
  for select using (
    exists (
      select 1 from stories
      where stories.id = narrations.story_id
        and stories.published_at is not null
        and stories.published_at <= now()
    )
  );
