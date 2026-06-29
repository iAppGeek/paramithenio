-- Grant read access on public tables to the anon and authenticated roles.
-- RLS policies (defined in earlier migrations) further restrict which rows
-- each role can actually see. Without these grants, RLS is never reached —
-- Postgres rejects the query before evaluating any policy.

grant usage on schema public to anon, authenticated;
grant select on public.stories to anon, authenticated;
grant select on public.narrations to anon, authenticated;
