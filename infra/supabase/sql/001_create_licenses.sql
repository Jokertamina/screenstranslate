-- Esquema de licencias para ScreensTranslate Pro

-- Tabla principal de licencias
create table if not exists public.licenses (
  id uuid primary key default gen_random_uuid(),
  license_key text not null unique,
  email text,
  plan text not null default 'pro'
    check (plan in ('basic', 'pro')),
  status text not null default 'active'
    check (status in ('active', 'revoked')),
  daily_limit integer,
  max_devices integer not null default 3,
  payment_provider text,
  payment_reference text unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz null
);

create index if not exists licenses_plan_status_idx
  on public.licenses (plan, status);

create index if not exists licenses_email_idx
  on public.licenses (email);

-- Tabla de activaciones por dispositivo
create table if not exists public.license_activations (
  id uuid primary key default gen_random_uuid(),
  license_id uuid not null references public.licenses(id) on delete cascade,
  device_id text not null,
  device_label text,
  app_version text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  unique (license_id, device_id)
);

create index if not exists license_activations_license_id_idx
  on public.license_activations (license_id);

-- Activar RLS (las Edge Functions con service-role key lo ignoran,
-- pero es buena prÃ¡ctica tenerlo activado para otros clientes).
alter table public.licenses enable row level security;
alter table public.license_activations enable row level security;

