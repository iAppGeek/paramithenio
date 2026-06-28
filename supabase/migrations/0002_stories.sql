-- Stories table: metadata for each audio fable.
-- Audio files live in Supabase Storage (bucket: audio).
-- Artwork lives in Supabase Storage (bucket: artwork).

create table if not exists stories (
  id               uuid        primary key default gen_random_uuid(),
  slug             text        not null unique,
  title_en         text        not null,
  title_el         text        not null,
  description_en   text,
  description_el   text,
  duration_seconds integer,
  audio_path       text        not null,  -- storage path inside the "audio" bucket
  artwork_path     text,                  -- storage path inside the "artwork" bucket, nullable
  tags             text[]      not null default '{}',
  category         text,
  published_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Full-text search index (English + Greek).
create index if not exists stories_fts_en on stories
  using gin(to_tsvector('english', coalesce(title_en, '') || ' ' || coalesce(description_en, '')));

create index if not exists stories_fts_el on stories
  using gin(to_tsvector('simple', coalesce(title_el, '') || ' ' || coalesce(description_el, '')));

-- Trigram index for fuzzy search.
create extension if not exists pg_trgm;
create index if not exists stories_trgm on stories using gin(title_en gin_trgm_ops, title_el gin_trgm_ops);

-- Enable Row Level Security.
alter table stories enable row level security;

-- Everyone can read published stories (published_at is not null and in the past).
create policy "stories_select_published" on stories
  for select
  using (published_at is not null and published_at <= now());
