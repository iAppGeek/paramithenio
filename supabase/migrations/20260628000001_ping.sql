-- Tiny table used by the keep-alive scheduled job to prevent Supabase from
-- pausing the project due to inactivity on the free tier.
create table if not exists _ping (
  id   serial      primary key,
  ts   timestamptz not null default now()
);

-- RLS on with no policies: service role bypasses RLS and can still insert,
-- but the anon key cannot read or write this table.
alter table _ping enable row level security;

insert into _ping default values;
