-- ============================================================================
-- Minsait Business Consulting · Onboarding · Initial schema
-- ----------------------------------------------------------------------------
-- Run this once in the Supabase SQL Editor of a fresh project.
-- Safe to re-run: every CREATE uses IF NOT EXISTS and policies are dropped
-- before being recreated.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. profiles · 1:1 extension of auth.users
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles read own"   on public.profiles;
drop policy if exists "profiles insert own" on public.profiles;
drop policy if exists "profiles update own" on public.profiles;

create policy "profiles read own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles insert own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles update own"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 2. journey_progress · which onboarding quests each user has completed
-- ----------------------------------------------------------------------------
create table if not exists public.journey_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  challenge_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, challenge_id)
);

alter table public.journey_progress enable row level security;

drop policy if exists "progress read own"   on public.journey_progress;
drop policy if exists "progress insert own" on public.journey_progress;
drop policy if exists "progress delete own" on public.journey_progress;

create policy "progress read own"
  on public.journey_progress for select
  using (auth.uid() = user_id);

create policy "progress insert own"
  on public.journey_progress for insert
  with check (auth.uid() = user_id);

create policy "progress delete own"
  on public.journey_progress for delete
  using (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- 3. documents · metadata for user-uploaded files (binaries live in Storage)
-- ----------------------------------------------------------------------------
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  category text,
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create index if not exists documents_user_id_idx on public.documents(user_id);

alter table public.documents enable row level security;

drop policy if exists "documents read own"   on public.documents;
drop policy if exists "documents insert own" on public.documents;
drop policy if exists "documents update own" on public.documents;
drop policy if exists "documents delete own" on public.documents;

create policy "documents read own"
  on public.documents for select
  using (auth.uid() = user_id);

create policy "documents insert own"
  on public.documents for insert
  with check (auth.uid() = user_id);

create policy "documents update own"
  on public.documents for update
  using (auth.uid() = user_id);

create policy "documents delete own"
  on public.documents for delete
  using (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- 4. Storage bucket · "documents"
-- ----------------------------------------------------------------------------
-- Create the bucket if it doesn't exist. Set public = false: downloads will
-- use signed URLs generated on demand from the client (1h validity).
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

-- Storage policies are defined on storage.objects. Files are namespaced by
-- user id so the path looks like "<auth.uid()>/<original-filename>".
drop policy if exists "storage read own"   on storage.objects;
drop policy if exists "storage insert own" on storage.objects;
drop policy if exists "storage update own" on storage.objects;
drop policy if exists "storage delete own" on storage.objects;

create policy "storage read own"
  on storage.objects for select
  using (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "storage insert own"
  on storage.objects for insert
  with check (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "storage update own"
  on storage.objects for update
  using (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "storage delete own"
  on storage.objects for delete
  using (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
