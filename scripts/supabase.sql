-- Directorio de Plataformas — schema + seed data for Supabase (Postgres).
-- Run this once in the Supabase SQL editor for a new project.

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  role text not null check (role in ('admin', 'viewer')),
  created_at timestamptz not null default now()
);

create table if not exists platforms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null check (brand in ('lungfung', 'golden')),
  link text not null default '',
  link_password text not null default '',
  active boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Safe to re-run: adds link_password to a platforms table created by an
-- earlier version of this script that didn't have it yet.
alter table platforms add column if not exists link_password text not null default '';

create index if not exists platforms_brand_position_idx on platforms (brand, position);

-- link_password is stored in PLAIN TEXT on purpose: it's the login password
-- for the *external* platform the card links to (e.g. a dashboard the
-- manager keeps forgetting), and the admin panel needs to display it back,
-- not just verify it — unlike app_users.password_hash, which is a one-way
-- hash because the app only ever needs to check a login, never show it.
-- Its only protection is the same one as the rest of this table: RLS with no
-- policies, so only server-side code holding SUPABASE_SERVICE_ROLE_KEY can
-- read or write it. Don't reuse a real, sensitive password as a card's link
-- password if that's a concern for your organization.

-- Row Level Security is enabled with NO policies below. That blocks the
-- anon/authenticated Postgres roles from reading or writing these tables at
-- all through Supabase's public API. The app only ever talks to Supabase
-- through the service_role key from server-side code (see
-- SUPABASE_SERVICE_ROLE_KEY), and service_role always bypasses RLS — so the
-- app keeps working, but the anon key alone (which is safe to leak) cannot
-- reach this data.
alter table app_users enable row level security;
alter table platforms enable row level security;

-- Seed: one default admin account, username "admin", password "ChangeMe2026!".
-- CHANGE THIS PASSWORD IMMEDIATELY after your first login (Configuración →
-- Usuarios y contraseña → "Cambiar mi contraseña").
--
-- The hash below was generated with:
--   npm run hash-password -- 'ChangeMe2026!'
-- Use that same command to generate a hash for a different password if you'd
-- rather seed a custom one instead of changing it after the fact.
insert into app_users (username, password_hash, role)
values (
  'admin',
  '$2a$12$PImffw6..g2KW1N3gaPYNOdWWtrv3PMmv/3R5EfBF7yA9.SoMr2pK',
  'admin'
)
on conflict (username) do nothing;

-- Seed: the 6 cards from the original brief, links left empty until
-- configured from the admin panel.
insert into platforms (name, brand, link, active, position)
select * from (
  values
    ('Estados Financieros Chifa', 'lungfung', '', true, 1),
    ('Estados Financieros Golden', 'golden', '', true, 2),
    ('Detalle de EEFF Golden', 'golden', '', true, 3),
    ('Seguimiento Infraestructura', 'golden', '', true, 4),
    ('Seguimiento Movilidades Clientes', 'golden', '', true, 5),
    ('Seguimiento movilidades Personal', 'golden', '', true, 6)
) as seed(name, brand, link, active, position)
where not exists (select 1 from platforms);
