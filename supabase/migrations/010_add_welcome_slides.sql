-- Adds a "welcome slides" table for the home-page welcome modal (e.g. parish
-- priest's message on the website launch). Max 3 rows, enforced at the
-- application layer (admin UI hides "add" once 3 exist).
-- Run this in the Supabase SQL editor after migrations 001-009.

create table welcome_slides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  name text,
  photo_url text,
  content text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table welcome_slides enable row level security;

create policy "public read published welcome_slides" on welcome_slides
  for select using (status = 'published');

create policy "authenticated read welcome_slides" on welcome_slides
  for select to authenticated using (true);

create policy "authenticated insert welcome_slides" on welcome_slides
  for insert to authenticated with check (true);

create policy "authenticated update welcome_slides" on welcome_slides
  for update to authenticated using (true) with check (true);

create policy "authenticated delete welcome_slides" on welcome_slides
  for delete to authenticated using (true);
