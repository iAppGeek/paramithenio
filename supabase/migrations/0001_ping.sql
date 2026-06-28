-- Tiny table used by the keep-alive scheduled job to prevent Supabase from
-- pausing the project due to inactivity on the free tier.
create table if not exists _ping (
  id   serial      primary key,
  ts   timestamptz not null default now()
);

insert into _ping default values;
