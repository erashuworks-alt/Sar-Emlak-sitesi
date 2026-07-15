-- Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- PROPERTIES
CREATE TABLE public.properties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  neighborhood TEXT,
  property_type TEXT NOT NULL, -- 'Villa', 'Apartment', 'Plot', 'Office'
  listing_type TEXT NOT NULL, -- 'Sale', 'Rent'
  room_count TEXT,
  bathrooms INTEGER,
  square_meters INTEGER,
  floor TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  address TEXT,
  features JSONB,
  images TEXT[] DEFAULT '{}',
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- FAVORITES
CREATE TABLE public.favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(user_id, property_id)
);

-- MESSAGES
CREATE TABLE public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Properties are viewable by everyone." ON public.properties FOR SELECT USING (true);
CREATE POLICY "Users can insert their own properties." ON public.properties FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update their own properties." ON public.properties FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Users can delete their own properties." ON public.properties FOR DELETE USING (auth.uid() = created_by);

CREATE POLICY "Users can view their own favorites." ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own favorites." ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites." ON public.favorites FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view messages they sent or received." ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can insert messages." ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- SITE SETTINGS
CREATE TABLE public.site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_name TEXT DEFAULT 'Emlak Platform',
  logo_url TEXT,
  primary_color TEXT DEFAULT '#3B82F6',
  secondary_color TEXT DEFAULT '#1E3A8A',
  contact_email TEXT,
  phone TEXT,
  hero_title TEXT DEFAULT 'Hayalinizdeki Evi Keşfedin',
  hero_description TEXT,
  maintenance_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- REPORTS
CREATE TABLE public.reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  reported_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewed', 'resolved'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- NOTIFICATIONS
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ANALYTICS
CREATE TABLE public.analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_type TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Admin Policies for new tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Site Settings: Viewable by everyone, editable by admins
CREATE POLICY "Settings viewable by everyone" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Settings editable by admins" ON public.site_settings USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Reports: Insertable by authenticated users, viewable/editable by admins
CREATE POLICY "Users can insert reports" ON public.reports FOR INSERT WITH CHECK (auth.uid() = reported_by);
CREATE POLICY "Admins can manage reports" ON public.reports USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- Notifications: Viewable by recipient, created by admins/system
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage notifications" ON public.notifications USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Analytics: Insertable by anyone/system, viewable by admins
CREATE POLICY "Anyone can insert analytics" ON public.analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view analytics" ON public.analytics FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ── CMS & Categories ───────────────────────────────────────────────────

-- Categories Table
create table if not exists public.categories (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    slug text unique not null,
    description text,
    image_url text,
    icon text,
    color text,
    is_active boolean default true,
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Site Content Table (Generic for homepage sections)
create table if not exists public.site_content (
    id uuid default gen_random_uuid() primary key,
    section_key text unique not null,
    title text,
    subtitle text,
    content text,
    image_url text,
    button_text text,
    button_link text,
    metadata jsonb default '{}'::jsonb,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Header Settings Table
create table if not exists public.header_settings (
    id uuid default gen_random_uuid() primary key,
    logo_text text default 'PLOTS',
    logo_url text,
    navigation jsonb default '[]'::jsonb,
    cta_text text default 'İlan Ver',
    cta_link text default '/add-property',
    show_announcement boolean default true,
    announcement_text text,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Footer Settings Table
create table if not exists public.footer_settings (
    id uuid default gen_random_uuid() primary key,
    description text,
    email text,
    phone text,
    address text,
    social_links jsonb default '[]'::jsonb,
    copyright_text text,
    company_name text,
    legal_links jsonb default '[]'::jsonb,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security)
alter table public.categories enable row level security;
alter table public.site_content enable row level security;
alter table public.header_settings enable row level security;
alter table public.footer_settings enable row level security;

-- Public Read Access
create policy "Allow public read on categories" on public.categories for select using (true);
create policy "Allow public read on site_content" on public.site_content for select using (true);
create policy "Allow public read on header_settings" on public.header_settings for select using (true);
create policy "Allow public read on footer_settings" on public.footer_settings for select using (true);

-- Admin Write Access (assuming authenticated user with role 'admin')
create policy "Allow admin write on categories" on public.categories for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Allow admin write on site_content" on public.site_content for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Allow admin write on header_settings" on public.header_settings for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Allow admin write on footer_settings" on public.footer_settings for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ── DESIGN SYSTEM ───────────────────────────────────────────────────────

create table if not exists public.design_settings (
    id uuid default gen_random_uuid() primary key,
    name text not null, -- "Default", "Preset A", etc.
    is_active boolean default false,
    settings jsonb not null default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.design_settings enable row level security;
create policy "Allow public read on design_settings" on public.design_settings for select using (true);
create policy "Allow admin write on design_settings" on public.design_settings for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
