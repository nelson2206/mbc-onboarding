# ESTADO · Panel de Administrador

Memoria de trabajo del proyecto "panel admin" (3 fases). **Léeme antes de retomar**
para no re-investigar lo ya resuelto.

Última actualización: 2026-08-05

---

## Objetivo

Que un admin vea, por cada consultor: avance del onboarding, avance de cursos y
notas de las evaluaciones.

## Contexto fijo (ya investigado — no re-investigar)

- **Next.js 16.2.6** con `output: "export"` → GitHub Pages
  (`nelson2206.github.io/mbc-onboarding`). No hay servidor: todo corre en el
  navegador. Ningún breaking change de Next 16 afecta a este trabajo (solo tocan
  `params`/`searchParams` async, `middleware`→`proxy` y `next/image`; nada de eso
  se usa en el panel).
- **Supabase en modo real y confirmado** en producción: el bundle desplegado
  embebe `ycawlnypcznfjmxwecom.supabase.co`. En local **no** hay `.env.local`,
  así que `npm run dev` corre en modo localStorage.
- **Catálogo del Journey**: 6 semanas, 41 retos, 1.110 XP (contado desde el
  fichero: 7+5+7+8+6+8 retos). Vive en
  `src/lib/journeyLevels.ts` (se movió ahí desde `journey/page.tsx` en la Fase 1
  para que admin y consultor calculen el % con los mismos pesos).

## Riesgo abierto · decisión pendiente del negocio

`signIn()` en `src/lib/userStorage.ts` tiene un "acceso sin fricción": si el
usuario entra **sin contraseña** —incluidos los 3 botones de SSO del login, que
pasan password vacío— el correo se guarda en localStorage y **nunca se toca
Supabase**. Esas personas no existen en `profiles` ni en `journey_progress`.

**Consecuencia:** el panel solo mide a quien entró con correo + contraseña. Es
probable que hoy muestre 0 o casi 0 consultores. Las Fases 2 y 3 heredan el
problema: si las notas se guardan igual, tampoco llegarán a la BD.

**Decisión pendiente:** ¿el login pasa a exigir contraseña real? Nadie la ha
tomado todavía. No se cambió nada del login por iniciativa propia.

---

## Fase 1 · Rol admin + lista de consultores → CÓDIGO LISTO, MIGRACIÓN PENDIENTE

### Entregado

| Archivo | Qué hace |
|---|---|
| `supabase/migrations/003_admin_role.sql` | Columna `role`, `is_admin()`, RLS "admin lee todo", blindaje anti-autoascenso |
| `src/lib/journeyLevels.ts` | Catálogo de retos + `summarizeJourney()` |
| `src/lib/adminData.ts` | `useAdminSession()`, `fetchConsultants()`, `useConsultants()` |
| `src/app/(app)/admin/page.tsx` | Panel: KPIs, buscador, tabla con barra de avance |
| `src/components/layout/Sidebar.tsx` | Enlace "Panel Admin" solo para admins |
| `supabase/README.md` | Documenta la migración 003 y corrige la tabla de permisos |

`journey/page.tsx` pasó de 1.423 a 923 líneas: solo se movió el catálogo, sin
cambio de comportamiento.

### Hallazgo de seguridad (resuelto en 003)

La política `profiles update own` deja a cualquiera actualizar su propia fila.
Con una columna `role` ahí, **cualquier consultor podía hacerse admin** desde la
consola del navegador. RLS no lo impide porque la fila sí es suya. Se cerró
retirando el `UPDATE` a nivel de tabla sobre `profiles` y re-otorgándolo solo
sobre `display_name`, `display_initials`, `career_level`, `maturity_percent`.

### Verificado

- `npx tsc --noEmit` limpio.
- `npm run build` pasa; `/admin` se prerenderiza como estático.
- `/admin` renderiza en el navegador sin errores de consola (camino de fallo:
  muestra "Supabase no está configurado" al no haber credenciales locales).

### Migración 003 · verificada contra PostgreSQL 16 real

Se ejecutó `00_prelude` (stubs de `auth.uid()`/`storage`) + 001 + 002 + 003 en un
cluster desechable (PostgreSQL 16 local, puerto 55432). Las tres migraciones
corren sin error. Comprobaciones de comportamiento, todas en verde:

| # | Comprobación | Resultado |
|---|---|---|
| 1 | `role` existe, default `consultor` | OK |
| 2 | 2 políticas `... read all when admin` (SELECT) | OK |
| 3 | `authenticated`: UPDATE tabla = false, columna `role` = false, `career_level`/`maturity_percent` = true | OK |
| 4 | Sesión consultor: `is_admin()` false, ve 1 perfil (el suyo) | OK |
| 5 | Consultor intenta `set role='admin'` → *permiso denegado* | OK |
| 6 | Consultor sí puede editar `maturity_percent` | OK |
| 7 | Sesión admin: `is_admin()` true, ve los 2 perfiles y el progreso ajeno | OK |
| 8 | Admin intenta escribir fila ajena → 0 filas afectadas | OK |

### APLICADA EN PRODUCCIÓN · 2026-08-05

La migración 003 se ejecutó en el proyecto `mbc-onboarding` (org `poderosa-hr`)
desde el SQL Editor: **"Success. No rows returned"**. `nelson@minsait.com` quedó
con `role = 'admin'`.

Censo de cuentas con sesión real de Supabase en ese momento — **solo 4**:

| Correo | Rol | Nivel | Retos |
|---|---|---|---|
| alice.demo@minsait.com | consultor | analyst | 0 |
| bob.demo@minsait.com | consultor | senior_consultant | 14 |
| corporate.demo@minsait.com | consultor | analyst | 6 |
| nelson@minsait.com | admin | analyst | 2 |

Tres de las cuatro son cuentas demo. **Esto confirma el riesgo del login
descrito arriba**: el equipo real no está llegando a la base de datos.

### NO verificado

- El panel `/admin` **no está desplegado**: el código sigue solo en local, sin
  commit ni push. GitHub Pages aún sirve la versión anterior. Hasta desplegar (o
  crear `.env.local` y correr `npm run dev`), no se ha visto la pantalla con
  datos reales.
- La verificación de aislamiento RLS contra la base de producción quedó a medias:
  el entorno bloqueó la simulación de `set role authenticated`. El comportamiento
  sí está demostrado contra PostgreSQL 16 local (tabla de 8 comprobaciones).

### Siguiente paso para ver el panel

Desplegar (`git commit` + `push` a `main` dispara GitHub Pages) o correrlo en
local con `.env.local`. Después, entrar con `nelson@minsait.com` **y contraseña**
— no con los botones de acceso rápido, que no crean sesión de Supabase.

---

## Fase 2 · Persistir notas de evaluaciones → NO EMPEZADA

Hoy las notas no se guardan en ningún lado: el quiz de
`src/app/(app)/escuelita/` y el simulador de `src/app/(app)/simulator/` muestran
la nota en pantalla y la pierden.

Plan: tabla `evaluaciones` (own-write, admin-read) siguiendo el mismo patrón de
`003_admin_role.sql`. Antes de escribir la migración, resolver el riesgo del
login de arriba — si no, las notas tampoco llegarán a la BD.

## Fase 3 · Cursos + notas + gráficos + ranking → NO EMPEZADA

Depende de la Fase 2.
