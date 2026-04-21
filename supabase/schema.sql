-- ════════════════════════════════════════════════════════════════════════
-- Fase 2 · Schema Supabase · Gestión IA Autónomos
-- ════════════════════════════════════════════════════════════════════════
-- Ejecutar en Supabase Studio → SQL Editor → pegar todo → Run.
-- El orden importa: primero enum types, luego tablas, índices, RLS, seed.
-- ════════════════════════════════════════════════════════════════════════

-- ─── Extensions ─────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Enum types ─────────────────────────────────────────────────────────
do $$ begin
  create type user_role as enum ('autonomo', 'cliente');
exception when duplicate_object then null; end $$;

do $$ begin
  create type estado_cliente as enum ('activo', 'iguala', 'en_negociacion', 'propuesta_enviada', 'lead', 'pausado');
exception when duplicate_object then null; end $$;

do $$ begin
  create type estado_factura as enum ('borrador', 'ia_lista', 'enviada', 'cobrada', 'vencida');
exception when duplicate_object then null; end $$;

do $$ begin
  create type estado_factura_recibida as enum ('pendiente', 'procesada', 'rechazada');
exception when duplicate_object then null; end $$;

do $$ begin
  create type estado_propuesta as enum ('borrador', 'enviada', 'en_negociacion', 'aceptada', 'perdida');
exception when duplicate_object then null; end $$;

do $$ begin
  create type estado_proyecto as enum ('en_plazo', 'en_revision_final', 'entrega_proxima', 'cerrado');
exception when duplicate_object then null; end $$;

do $$ begin
  create type canal_mensaje as enum ('email', 'whatsapp', 'portal', 'voz');
exception when duplicate_object then null; end $$;

-- ─── profiles ───────────────────────────────────────────────────────────
-- Extiende auth.users con info de perfil de negocio.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'autonomo',
  nombre text not null,
  apellidos text,
  email text not null unique,
  empresa text,
  avatar_iniciales text,
  created_at timestamptz default now()
);

-- Trigger: crea profile automáticamente cuando se crea un auth.user
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, nombre, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email, '@', 1)), coalesce((new.raw_user_meta_data->>'role')::user_role, 'autonomo'));
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── clientes ───────────────────────────────────────────────────────────
create table if not exists public.clientes (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  nombre text not null,
  contacto text,
  email text,
  telefono text,
  cif text,
  direccion text,
  sector text,
  empleados int,
  facturacion_anual text,
  proyecto_actual text,
  inicio text,
  facturado_periodo text,
  estado estado_cliente not null default 'activo',
  nps int,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_clientes_owner on public.clientes(owner_id);

-- ─── proyectos ──────────────────────────────────────────────────────────
create table if not exists public.proyectos (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  cliente_id uuid references public.clientes(id) on delete set null,
  titulo text not null,
  periodo text,
  estado estado_proyecto not null default 'en_plazo',
  horas_actuales int default 0,
  horas_total int default 0,
  tarifa_hora numeric(10,2),
  margen_pct int,
  fases jsonb default '[]'::jsonb,
  tareas jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_proyectos_owner on public.proyectos(owner_id);

-- ─── facturas_emitidas ──────────────────────────────────────────────────
create table if not exists public.facturas_emitidas (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  cliente_id uuid references public.clientes(id) on delete set null,
  numero text not null,
  concepto text,
  fecha date not null default current_date,
  fecha_vencimiento date,
  base_imponible numeric(10,2) not null,
  iva_pct int default 21,
  iva_importe numeric(10,2),
  irpf_pct int default 15,
  irpf_importe numeric(10,2),
  total numeric(10,2) not null,
  estado estado_factura not null default 'borrador',
  pdf_url text,
  enviada_at timestamptz,
  cobrada_at timestamptz,
  created_at timestamptz default now()
);
create index if not exists idx_facturas_emitidas_owner on public.facturas_emitidas(owner_id);
create unique index if not exists idx_facturas_emitidas_numero on public.facturas_emitidas(owner_id, numero);

-- ─── facturas_recibidas ─────────────────────────────────────────────────
create table if not exists public.facturas_recibidas (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  proveedor text not null,
  subtipo text, -- 'cliente · portal', 'proveedor', 'banco', 'ticket'
  concepto text,
  canal canal_mensaje default 'email',
  fecha date not null default current_date,
  importe numeric(10,2) not null,
  iva_pct int default 21,
  iva_importe numeric(10,2),
  deducibilidad_pct int default 100,
  estado estado_factura_recibida not null default 'pendiente',
  archivo_url text,
  created_at timestamptz default now()
);
create index if not exists idx_facturas_recibidas_owner on public.facturas_recibidas(owner_id);

-- ─── gastos ─────────────────────────────────────────────────────────────
create table if not exists public.gastos (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  concepto text not null,
  categoria text,
  fecha date not null default current_date,
  importe numeric(10,2) not null,
  deducibilidad_pct int default 100,
  ticket_url text,
  cliente_relacionado text,
  created_at timestamptz default now()
);
create index if not exists idx_gastos_owner on public.gastos(owner_id);

-- ─── tesoreria_movimientos ─────────────────────────────────────────────
create table if not exists public.tesoreria_movimientos (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  fecha date not null default current_date,
  categoria text,
  concepto text,
  entrada numeric(10,2) default 0,
  salida numeric(10,2) default 0,
  saldo_despues numeric(10,2),
  created_at timestamptz default now()
);
create index if not exists idx_tesoreria_owner on public.tesoreria_movimientos(owner_id);

-- ─── propuestas ─────────────────────────────────────────────────────────
create table if not exists public.propuestas (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  cliente_id uuid references public.clientes(id) on delete set null,
  titulo text not null,
  importe numeric(10,2),
  duracion_meses int,
  roi_estimado_pct int,
  tipo text, -- 'consultoria', 'retainer', 'proyecto', 'auditoria'
  estado estado_propuesta not null default 'borrador',
  cuerpo jsonb,
  pdf_url text,
  enviada_at timestamptz,
  respondida_at timestamptz,
  created_at timestamptz default now()
);
create index if not exists idx_propuestas_owner on public.propuestas(owner_id);

-- ─── mensajes ───────────────────────────────────────────────────────────
-- Bandeja unificada. Un autónomo envía a cliente y viceversa.
create table if not exists public.mensajes (
  id uuid primary key default uuid_generate_v4(),
  thread_id uuid not null, -- agrupa mensajes en conversación
  from_user_id uuid references public.profiles(id) on delete set null,
  to_user_id uuid references public.profiles(id) on delete set null,
  from_nombre text, -- fallback si from_user_id es null (remitente externo)
  canal canal_mensaje not null default 'email',
  asunto text,
  cuerpo text not null,
  is_read boolean not null default false,
  enviado_at timestamptz default now(),
  ia_draft boolean default false -- true si es draft generado por IA
);
create index if not exists idx_mensajes_to on public.mensajes(to_user_id, is_read);
create index if not exists idx_mensajes_thread on public.mensajes(thread_id, enviado_at);

-- ─── posts_redes ────────────────────────────────────────────────────────
create table if not exists public.posts_redes (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  tipo text, -- 'educativo', 'caso', 'personal', 'promo'
  titulo text,
  texto text,
  fecha_programada timestamptz,
  estado text default 'borrador', -- 'borrador', 'listo', 'aprobado', 'publicado'
  canal text default 'linkedin',
  engagement jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_posts_owner on public.posts_redes(owner_id);

-- ─── campanas_mailing ──────────────────────────────────────────────────
create table if not exists public.campanas_mailing (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  tipo text, -- 'informativo', 'sector', 'promo', 'campana', 'mix'
  nombre text,
  asunto text,
  cuerpo text,
  lista_destinatarios text,
  destinatarios_count int,
  fecha_envio timestamptz,
  enviados int default 0,
  aperturas int default 0,
  clicks int default 0,
  created_at timestamptz default now()
);
create index if not exists idx_campanas_owner on public.campanas_mailing(owner_id);

-- ════════════════════════════════════════════════════════════════════════
-- RLS · Row Level Security · obligatorio en Supabase
-- ════════════════════════════════════════════════════════════════════════
alter table public.profiles enable row level security;
alter table public.clientes enable row level security;
alter table public.proyectos enable row level security;
alter table public.facturas_emitidas enable row level security;
alter table public.facturas_recibidas enable row level security;
alter table public.gastos enable row level security;
alter table public.tesoreria_movimientos enable row level security;
alter table public.propuestas enable row level security;
alter table public.mensajes enable row level security;
alter table public.posts_redes enable row level security;
alter table public.campanas_mailing enable row level security;

-- Profiles: el usuario ve y edita solo el suyo
drop policy if exists "profiles_self_read" on public.profiles;
create policy "profiles_self_read" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profiles_self_update" on public.profiles;
create policy "profiles_self_update" on public.profiles for update using (auth.uid() = id);

-- Cada tabla owner_id: el usuario solo ve/edita sus registros
-- (El cliente solo ve su propio hilo de mensajes y facturas emitidas a él)
do $$
declare t text;
begin
  for t in select unnest(array['clientes','proyectos','facturas_emitidas','facturas_recibidas','gastos','tesoreria_movimientos','propuestas','posts_redes','campanas_mailing'])
  loop
    execute format('drop policy if exists "%1$s_owner_all" on public.%1$s;', t);
    execute format('create policy "%1$s_owner_all" on public.%1$s for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);', t);
  end loop;
end $$;

-- Mensajes: el usuario ve mensajes en los que es from o to
drop policy if exists "mensajes_read" on public.mensajes;
create policy "mensajes_read" on public.mensajes for select using (auth.uid() = from_user_id or auth.uid() = to_user_id);
drop policy if exists "mensajes_insert" on public.mensajes;
create policy "mensajes_insert" on public.mensajes for insert with check (auth.uid() = from_user_id);
drop policy if exists "mensajes_update_read" on public.mensajes;
create policy "mensajes_update_read" on public.mensajes for update using (auth.uid() = to_user_id);

-- ════════════════════════════════════════════════════════════════════════
-- Realtime · habilitar para badge unread mensajes (REGLA 4)
-- ════════════════════════════════════════════════════════════════════════
alter publication supabase_realtime add table public.mensajes;

-- ════════════════════════════════════════════════════════════════════════
-- Seed data · insertar 1 autónomo demo + 8 clientes + facturas tras crear
-- el usuario en Supabase Studio → Auth. Los UUIDs hay que sustituirlos.
-- Ver supabase/seed.sql para el contenido de la demo.
-- ════════════════════════════════════════════════════════════════════════
