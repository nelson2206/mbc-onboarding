# Setup de Supabase

La app funciona en dos modos:

| Modo | Activación | Auth | Progreso del Journey | Documentos |
|------|------------|------|----------------------|------------|
| **Demo** | Sin env vars | localStorage + email | localStorage por email | Sección oculta |
| **Supabase** | Env vars definidas | `supabase.auth` real | Tabla Postgres `journey_progress` | Bucket privado `documents` |

Esta guía pasa la app a **modo Supabase**. Toma ~5 minutos.

---

## 1 · Crear proyecto Supabase

1. Entra a https://supabase.com y crea cuenta (puedes usar GitHub).
2. **New Project** → nombre `mbc-onboarding`, contraseña fuerte de DB, región más cercana.
3. Espera ~1 min a que aprovisione.

## 2 · Aplicar el schema

1. En el panel del proyecto, abre **SQL Editor** (icono de base de datos en la barra izquierda).
2. Crea un nuevo query y pega el contenido completo de `supabase/migrations/001_init.sql`.
3. Pulsa **Run**. Verifica que termine sin errores: deben crearse 3 tablas (`profiles`, `journey_progress`, `documents`), un trigger en `auth.users`, el bucket `documents` y las políticas RLS.

## 3 · Desactivar confirmación de email (solo demo)

Para que el flujo de signup/signin sea fluido sin enviar emails reales:

1. **Authentication → Providers → Email**.
2. Desactiva el toggle **Confirm email**.
3. Guarda.

> En producción real déjalo activo y configura el SMTP de la organización.

## 4 · Copiar las credenciales

1. **Project Settings → API**.
2. Copia los dos valores:
   - `Project URL` → será `NEXT_PUBLIC_SUPABASE_URL`
   - `Project API keys → anon public` → será `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> El anon key es público por diseño — viaja al navegador. Lo que protege los datos es RLS, ya configurado en el schema.

## 5 · Añadir secrets al repo de GitHub

1. En GitHub: **Settings → Secrets and variables → Actions → New repository secret**.
2. Crea:
   - `NEXT_PUBLIC_SUPABASE_URL` = (la URL del paso 4)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (el anon key del paso 4)
3. Dispara un redeploy: **Actions → Deploy to GitHub Pages → Run workflow** (o haz cualquier push a `main`).

Cuando termine, el footer del login dirá **"Modo Supabase · sesiones reales"** y la sección **Mis Documentos** aparecerá en `/resources` para usuarios logueados.

---

## Desarrollo local

Crea `.env.local` (no se commitea) en la raíz:

```sh
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

`npm run dev` levantará la app con Supabase activo en `http://localhost:3000`.

---

## Estructura

```
supabase/
├── README.md              ← este archivo
└── migrations/
    └── 001_init.sql       ← schema + RLS + bucket
```

### Tablas creadas

- **`profiles`** — extensión 1:1 de `auth.users`. Se rellena automáticamente vía trigger al crear usuario.
- **`journey_progress`** — `(user_id, challenge_id)` PK compuesta. Cada fila = un reto completado.
- **`documents`** — metadata de archivos: título, descripción, categoría, ruta en Storage, mime, tamaño.

### Storage

- Bucket `documents`, **privado**.
- Convención de rutas: `<auth.uid()>/<timestamp>-<filename>`.
- Las políticas RLS solo permiten a un usuario leer/escribir bajo su propio prefijo.
- Descargas usan URLs firmadas con validez 1h, generadas desde el cliente en cada click.

### RLS — qué garantiza

| Tabla | Quién puede leer | Quién puede escribir |
|-------|------------------|----------------------|
| `profiles` | Solo el dueño (`auth.uid() = id`) | Solo el dueño |
| `journey_progress` | Solo el dueño (`auth.uid() = user_id`) | Solo el dueño |
| `documents` | Solo el dueño | Solo el dueño |
| `storage.objects` (bucket `documents`) | Solo si la ruta empieza con su `auth.uid()` | Solo si la ruta empieza con su `auth.uid()` |

Cualquier intento de leer datos de otro usuario devuelve filas vacías; cualquier intento de escribir con `user_id` ajeno es rechazado por la policy.

## Borrar todo y volver a empezar

Si necesitas resetear el schema:

```sql
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop table if exists public.documents;
drop table if exists public.journey_progress;
drop table if exists public.profiles;
-- el bucket se borra desde Storage → documents → Delete bucket
```

Luego vuelve a correr `001_init.sql`.
