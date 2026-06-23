-- Anza lead tables. Run once in the Supabase SQL editor (or via the CLI).
-- Safe to re-run: every statement is guarded with IF NOT EXISTS.

create extension if not exists "pgcrypto";

-- Waitlist signups -----------------------------------------------------------
create table if not exists public.waitlist (
  id           uuid primary key default gen_random_uuid(),
  audience     text not null check (audience in ('creadores', 'marcas')),
  email        text not null,
  full_name    text default '',
  instagram    text default '',
  tiktok       text default '',
  facebook     text default '',
  whatsapp     text default '',
  keep_updated boolean default false,
  created_at   timestamptz not null default now(),
  -- one row per email per audience; lets the API upsert instead of duplicating
  unique (email, audience)
);

-- Demo call reservations -----------------------------------------------------
create table if not exists public.demo_reservations (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  day_iso    text not null,
  time       text not null,
  created_at timestamptz not null default now()
);

-- Contact form messages ------------------------------------------------------
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  company    text default '',
  created_at timestamptz not null default now()
);

-- Row Level Security: lock the tables so only the service_role key (used by the
-- server) can read/write. The anon/public key gets no access at all.
alter table public.waitlist          enable row level security;
alter table public.demo_reservations enable row level security;
alter table public.contact_messages  enable row level security;
