-- =========================================================================
-- ROSHAN KUMAR YADAV — PERSONAL CREATIVE PORTFOLIO SUPABASE SCHEMA & POLICIES
-- =========================================================================
-- Execute this script in your Supabase SQL Editor (https://app.supabase.com)
-- 
-- This sets up:
-- 1. `gallery_items` table with full metadata
-- 2. `contact_messages` table for portfolio inquiries
-- 3. Storage bucket `gallery-images` with public read access
-- 4. Row Level Security (RLS) policies protecting owner-only mutations
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------------------------
-- 1. GALLERY ITEMS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    caption TEXT DEFAULT '',
    category TEXT NOT NULL CHECK (category IN ('Photography', 'Portraits', 'Sketches', 'Editing', 'Personal', 'Other')),
    image_url TEXT NOT NULL,
    storage_path TEXT,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 1,
    date_taken DATE DEFAULT CURRENT_DATE,
    tags TEXT[] DEFAULT '{}'::TEXT[],
    aspect_ratio TEXT DEFAULT 'portrait'
);

-- Index for speedy ordering & category filtering
CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON public.gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_gallery_items_order ON public.gallery_items(display_order ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_items_featured ON public.gallery_items(is_featured);

-- Enable Row Level Security (RLS)
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public visitors can view all gallery items
CREATE POLICY "Public visitors can view gallery items"
    ON public.gallery_items
    FOR SELECT
    USING (true);

-- Policy 2: Only authenticated owner can insert new gallery items
CREATE POLICY "Authenticated owner can insert gallery items"
    ON public.gallery_items
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy 3: Only authenticated owner can update gallery items
CREATE POLICY "Authenticated owner can update gallery items"
    ON public.gallery_items
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy 4: Only authenticated owner can delete gallery items
CREATE POLICY "Authenticated owner can delete gallery items"
    ON public.gallery_items
    FOR DELETE
    TO authenticated
    USING (true);


-- -------------------------------------------------------------------------
-- 2. CONTACT MESSAGES TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone (public) can submit a contact message
CREATE POLICY "Anyone can submit contact message"
    ON public.contact_messages
    FOR INSERT
    WITH CHECK (true);

-- Policy 2: Only authenticated owner can view submitted messages
CREATE POLICY "Authenticated owner can view contact messages"
    ON public.contact_messages
    FOR SELECT
    TO authenticated
    USING (true);


-- -------------------------------------------------------------------------
-- 3. STORAGE BUCKET CONFIGURATION (`gallery-images`)
-- -------------------------------------------------------------------------
-- Insert the public storage bucket if it doesn't already exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies:
-- 1. Public can read files from the bucket
CREATE POLICY "Public read access for gallery images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'gallery-images');

-- 2. Authenticated owner can upload files
CREATE POLICY "Authenticated owner can upload gallery images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'gallery-images');

-- 3. Authenticated owner can update files
CREATE POLICY "Authenticated owner can update gallery images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'gallery-images')
    WITH CHECK (bucket_id = 'gallery-images');

-- 4. Authenticated owner can delete files
CREATE POLICY "Authenticated owner can delete gallery images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'gallery-images');

-- =========================================================================
-- INITIAL SEED DATA (OPTIONAL)
-- =========================================================================
-- You can run the following to populate initial starter pictures in Supabase:
/*
INSERT INTO public.gallery_items (title, caption, category, image_url, is_featured, display_order, date_taken, tags)
VALUES
  ('Neo-Tokyo Streetwalker', 'Graphite pencils (2B-6B) on heavyweight Bristol paper.', 'Sketches', '/images/gallery_sketch.jpg', true, 1, '2024-03-15', ARRAY['Graphite', 'Anime Art', 'Cyberpunk']),
  ('Neon Rain Mirage', '35mm prime lens, f/1.8, reflections on rain-slicked asphalt.', 'Photography', '/images/gallery_street.jpg', true, 2, '2024-04-02', ARRAY['Night Street', 'Rain', 'Neon']),
  ('Quiet Light & Shadows', 'Natural window lighting paired with subtle Lightroom color split-toning.', 'Portraits', '/images/gallery_portrait.jpg', true, 3, '2024-04-18', ARRAY['Portrait', 'Natural Light', 'Mood']),
  ('The Creator in His Element', 'Intersection of computer science, camera gear, and sketches.', 'Personal', '/images/hero_portrait.jpg', true, 4, '2024-05-20', ARRAY['Creator', 'Personal', 'Studio']);
*/
