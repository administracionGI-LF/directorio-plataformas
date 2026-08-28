# Directorio de Plataformas

Directorio interno con login para encontrar los distintos dashboards/plataformas
de **Chifa Lung Fung** y **Golden Palace**, agrupados por marca. Un
administrador gestiona las cards (nombre, marca, link, activa/inactiva, orden)
y los usuarios/contraseñas desde un panel de Configuración.

Implementado en **Next.js (App Router)** con **Supabase (Postgres)** como
almacenamiento compartido — así todos los usuarios ven los mismos datos sin
importar desde qué máquina o navegador entren, a diferencia del prototipo de
diseño original que guardaba todo en `localStorage`.

## 1. Crear el proyecto de Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Abre **SQL Editor** y ejecuta el contenido de [`scripts/supabase.sql`](./scripts/supabase.sql).
   Esto crea las tablas `app_users` y `platforms`, activa Row Level Security
   sin políticas (solo la app, usando la service role key, puede leer/escribir),
   y siembra:
   - un usuario `admin` con contraseña **`ChangeMe2026!`** — cámbiala
     apenas entres (Configuración → Usuarios y contraseña → "Cambiar mi
     contraseña"),
   - las 6 cards del brief original, con los links vacíos hasta que los
     configures desde el panel.
3. En **Project Settings → API**, copia:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** key (la secreta, no la `anon`/`publishable`) → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Variables de entorno

Copia `.env.example` a `.env.local` y completa:

| Variable | De dónde sale | Notas |
|---|---|---|
| `SUPABASE_URL` | Supabase → Project Settings → API | |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API (secreta) | Nunca la expongas al cliente; por eso no lleva prefijo `NEXT_PUBLIC_`. Las tablas no tienen policies de RLS, así que solo esta key puede leerlas/escribirlas. |
| `SESSION_SECRET` | Generarla vos: `openssl rand -base64 32` | Firma las cookies de sesión (JWT HS256). Rotarla cierra la sesión de todos. |

En Vercel, cargalas en **Project Settings → Environment Variables** (mismos
tres nombres, para Production y Preview).

## 3. Desarrollo local

```bash
npm install
npm run dev
```

Abrí http://localhost:3000 — te manda a `/login`. Entrá con `admin` /
`ChangeMe2026!` y cambiá la contraseña de inmediato.

## 4. Deploy a Vercel

Conectá el repo (con `web/` como root directory del proyecto, si el repo
tiene más carpetas) y cargá las 3 variables de entorno de arriba. Nada más —
Next.js se builda y sirve solo.

## Cómo está armado

- **Auth propia (no Supabase Auth):** login por usuario/contraseña, no por
  email, tal como se pidió — "solo el administrador puede crear usuarios y
  contraseñas". Contraseñas con `bcrypt` (`lib/auth.ts`), sesión en una
  cookie httpOnly firmada con `jose` (`lib/session.ts`), verificada en
  `proxy.ts` (el middleware de rutas) en cada request a `/directory` y
  `/admin`.
- **Datos en Supabase, acceso solo server-side:** `lib/data.ts` es el único
  módulo que habla con Supabase, siempre con la service role key
  (`lib/supabase-server.ts`, marcado `server-only`). El cliente nunca ve esa
  key ni pega directo a Supabase.
- **Casi sin JavaScript de cliente:** login, directorio y panel de admin son
  Server Components; las mutaciones (crear/editar/borrar/reordenar cards,
  crear usuarios, cambiar contraseña) son Server Actions con `<form
  action={...}>` simple. Solo el botón "Mostrar/Ocultar" contraseña en el
  login es un Client Component.
- **Reordenar cards:** cada card tiene una columna `position`; ▲/▼
  intercambia la posición con la card más cercana de la misma marca (igual
  que el prototipo).
- **Último admin protegido:** no se puede eliminar al usuario con sesión
  activa ni al último administrador restante (mismas reglas que el
  prototipo).
- **Contraseña por card:** cada card tiene un campo opcional "Contraseña del
  link" (columna `link_password`) — es la contraseña de acceso a esa
  plataforma externa, no la del login de este sitio. Se completa desde
  Editar en Configuración y aparece en el directorio oculta con puntos;
  el ícono de ojo la revela. Se guarda en texto plano (hay que poder
  mostrarla, no solo verificarla) protegida por las mismas reglas de RLS
  que el resto de la tabla — ver el comentario en `scripts/supabase.sql`.

## Scripts

```bash
npm run dev             # desarrollo
npm run build            # build de producción
npm run start             # sirve el build
npm run lint               # eslint
npm run hash-password -- 'unaContraseña'   # imprime un hash bcrypt, para setear
                                              # o resetear una contraseña a mano
                                              # desde el SQL editor de Supabase
```
