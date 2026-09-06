-- ============================================================================
-- Minsait Business Consulting · 003 · Rol admin + lectura global (Panel Admin)
-- ----------------------------------------------------------------------------
-- Objetivo: que un administrador pueda LEER (nunca escribir) las filas de
-- todos los consultores, sin montar un backend nuevo. El panel /admin corre
-- 100% en el navegador con el mismo cliente Supabase de siempre; es la
-- política RLS la que decide qué filas devuelve.
--
-- Seguro de re-ejecutar: todo usa IF NOT EXISTS / CREATE OR REPLACE y las
-- políticas se borran antes de recrearse.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. profiles.role · consultor (por defecto) | admin
-- ----------------------------------------------------------------------------
alter table public.profiles
  add column if not exists role text not null check (role in (
    'consultor','admin'
  )) default 'consultor';

create index if not exists profiles_role_idx on public.profiles(role);

-- ----------------------------------------------------------------------------
-- 2. is_admin() · ¿el usuario de la sesión actual es admin?
-- ----------------------------------------------------------------------------
-- Tiene que ser SECURITY DEFINER. Si una política de `profiles` consultara
-- `profiles` directamente, Postgres volvería a evaluar la política sobre esa
-- consulta y entraría en recursión infinita ("infinite recursion detected in
-- policy for relation profiles"). Al correr como el dueño de la función
-- (postgres), la lectura interna salta RLS y corta el ciclo.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- ----------------------------------------------------------------------------
-- 3. Políticas "admin lee todo"
-- ----------------------------------------------------------------------------
-- Se SUMAN a las políticas "own-only" que ya existen: en Postgres varias
-- políticas PERMISSIVE del mismo comando se combinan con OR. Un consultor
-- sigue viendo solo lo suyo; un admin ve todo. Nadie gana permisos de
-- escritura sobre filas ajenas: esto es solo SELECT.

drop policy if exists "profiles read all when admin" on public.profiles;
create policy "profiles read all when admin"
  on public.profiles for select
  to authenticated
  using (public.is_admin());

drop policy if exists "progress read all when admin" on public.journey_progress;
create policy "progress read all when admin"
  on public.journey_progress for select
  to authenticated
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- 4. Blindaje: que nadie se auto-ascienda a admin
-- ----------------------------------------------------------------------------
-- La política "profiles update own" permite a cualquier usuario actualizar su
-- propia fila. Sin este bloque, un consultor podría ejecutar desde el
-- navegador `update profiles set role='admin' where id = <su id>` y quedar
-- como administrador. RLS no lo impide (la fila SÍ es suya), así que hay que
-- cortarlo con permisos a nivel de columna.
--
-- Nota de Postgres: un GRANT a nivel de tabla cubre todas las columnas y no se
-- puede recortar con un REVOKE de columna. Hay que quitar el UPDATE de tabla
-- y volver a otorgarlo solo sobre las columnas que la app sí edita.
revoke update on public.profiles from anon, authenticated;

grant update (display_name, display_initials, career_level, maturity_percent)
  on public.profiles to authenticated;

-- `role` queda fuera a propósito: solo se cambia desde el SQL Editor de
-- Supabase (o con la service_role key), nunca desde el navegador.
--
-- INSERT no necesita blindaje: la fila de cada usuario la crea el trigger
-- `on_auth_user_created` y no existe política de DELETE sobre `profiles`, así
-- que un usuario no puede borrar su fila para reinsertarla con role='admin'.

-- ----------------------------------------------------------------------------
-- 5. Nombrar al primer administrador
-- ----------------------------------------------------------------------------
-- Ejecuta esto en el SQL Editor cambiando el correo. El usuario debe haber
-- iniciado sesión al menos una vez CON CONTRASEÑA (así existe en auth.users y
-- el trigger ya le creó su fila en profiles).
--
--   update public.profiles
--      set role = 'admin'
--    where email = 'tu.correo@minsait.com';
--
-- Verificación:
--
--   select email, role from public.profiles order by role, email;
