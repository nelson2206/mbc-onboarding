-- ============================================================================
-- Minsait Business Consulting · 002 · Career fields on profiles + CV bucket
-- ============================================================================

-- Career fields persisted with the user
alter table public.profiles
  add column if not exists career_level text check (career_level in (
    'analyst','consultant','senior_consultant','manager','senior_manager','partner'
  )) default 'analyst';

alter table public.profiles
  add column if not exists maturity_percent int check (maturity_percent between 0 and 100) default 0;

alter table public.profiles
  add column if not exists display_initials text;

-- CV documents bucket (separate from generic documents to allow listing+RLS by
-- category without leaking other files). Files live under <auth.uid()>/.
insert into storage.buckets (id, name, public)
values ('cv', 'cv', false)
on conflict (id) do nothing;

drop policy if exists "cv read own"   on storage.objects;
drop policy if exists "cv insert own" on storage.objects;
drop policy if exists "cv delete own" on storage.objects;

create policy "cv read own"
  on storage.objects for select
  using (bucket_id = 'cv' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "cv insert own"
  on storage.objects for insert
  with check (bucket_id = 'cv' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "cv delete own"
  on storage.objects for delete
  using (bucket_id = 'cv' and auth.uid()::text = (storage.foldername(name))[1]);

-- CV metadata table — keeps version history with a "category" (eficiencia,
-- medios-pago, data, banca-corporativa, banca-inversion, general)
create table if not exists public.cv_versions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null check (category in (
    'general','eficiencia','medios-pago','data','banca-corporativa','banca-inversion'
  )),
  notes text,
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create index if not exists cv_versions_user_id_idx on public.cv_versions(user_id);
create index if not exists cv_versions_category_idx on public.cv_versions(user_id, category);

alter table public.cv_versions enable row level security;

drop policy if exists "cv_versions read own"   on public.cv_versions;
drop policy if exists "cv_versions insert own" on public.cv_versions;
drop policy if exists "cv_versions delete own" on public.cv_versions;

create policy "cv_versions read own"   on public.cv_versions for select using (auth.uid() = user_id);
create policy "cv_versions insert own" on public.cv_versions for insert with check (auth.uid() = user_id);
create policy "cv_versions delete own" on public.cv_versions for delete using (auth.uid() = user_id);
