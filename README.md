# Roshan Kumar Yadav — Personal Creative Portfolio & Visual Gallery

A cinematic, futuristic personal portfolio and gallery web application built for **Roshan Kumar Yadav** (Creative Developer, CSE Student, Photographer & Sketch Artist).

Designed with near-black and deep navy aesthetics, electric violet and cyan glows, bold editorial typography, Framer Motion animations, an interactive Creative Coding shader lab, and a complete **owner-authenticated Photo & Sketch Gallery** backed by Supabase PostgreSQL and Storage (with fallback Sandbox Mode).

---

## 🌟 Key Highlights & Features

1. **Cinematic Hero Section**
   - High-impact editorial layout with custom portrait photography.
   - Animated cycling role headline: *Creative Developer, CSE Student, Photographer, Sketch Artist*.
   - Quick statistics and interactive call-to-actions (*Explore My Work* & *Get In Touch*).
   - Animated ambient starfield canvas and custom desktop glowing cursor.

2. **Personal Storytelling & About**
   - Multi-layered narrative covering Computer Science, pencil sketching, 35mm street photography, and visual storytelling.
   - *Current Direction & Focus* spotlight badge.
   - Visual dual-media collage (Graphite Anime Artwork vs. Neon Rain Street Photography).

3. **Skills & Capabilities**
   - Categorized by **Programming**, **Web & Backend**, **Tools & Tech**, and **Creative Disciplines**.
   - Interactive category filtering with clean level badges.
   - Zero fabricated proficiency percentages or years of experience.

4. **Project Showcase & Case Studies**
   - Real, editable starter entries:
     - **Smart Study Planner** (Academic Productivity Hub)
     - **MEDICO Web Application** (Healthcare & Telemedicine Portal)
     - **CityVoice / CrossSense AI** (Civic Complaint Intelligence & Geolocation)
     - **Student Management System** (Institutional Records Platform)
   - Hover zoom, technology tags, and dedicated **Project Detail Modal** with architecture highlights and direct source code links.

5. **Personal Photo & Sketch Gallery (Most Important Feature)**
   - Responsive masonry grid supporting portraits, landscapes, and squares.
   - Categories: *Photography, Portraits, Sketches, Editing, Personal, Other*.
   - Live search filter by title, caption, or tags.
   - Fullscreen **Lightbox Modal** with previous/next navigation, keyboard shortcuts (`Left`, `Right`, `Esc`), and image captions.

6. **Admin Gallery Studio (`/admin`)**
   - Protected route for owner-only gallery management.
   - Supports live **Supabase Authentication & Storage** and an instant **Local Sandbox Mode** for previewing without cloud setup.
   - Drag-and-drop multi-file uploader with real-time format and size validation (JPEG, PNG, WebP up to 10MB).
   - Edit titles, captions, categories, and date taken.
   - Toggle **Featured Work** to highlight photos on the home page.
   - Reorder photos with instant persistence.
   - Delete items safely with a confirmation dialog.

7. **Creative Lab / My Universe**
   - Experimental interactive vector shader canvas with **Neural**, **Orbit**, and **Matrix** modes.
   - Analog graphite sketches and Lightroom color-grading explorations.

8. **Journey Timeline**
   - Chronological milestones for CSE degree, Civic Tech Hackathons, and creative breakthroughs.

9. **Contact Section**
   - Interactive contact form with input validation and anti-spam honeypot.
   - 1-click email copy button with success feedback.
   - Celebratory confetti animation upon transmission.

10. **Centralized Configuration**
    - Master file at `src/config/portfolio.ts` allows editing bio, skills, projects, and initial images in one place.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Vanilla CSS design tokens, Glassmorphism
- **Animations**: Framer Motion
- **Icons**: Lucide React + Custom SVG Brand Icons
- **Database & Auth**: Supabase PostgreSQL & Supabase Auth
- **File Storage**: Supabase Storage (`gallery-images` bucket)
- **Effects**: HTML5 Canvas Particle Engine, Canvas Confetti

---

## 🚀 Quick Start (Running Locally)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
Generates an optimized, minified production bundle in `dist/`.

---

## 🗄️ Supabase Configuration (Connecting Cloud Storage & DB)

The portfolio works out-of-the-box in **Sandbox Mode** without Supabase. To enable live cloud uploads that persist across all devices without redeploying:

### Step 1: Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and create a free project.
2. Under **Project Settings &rarr; API**, copy your:
   - **Project URL**
   - **anon / public key**

### Step 2: Configure Environment Variables
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 3: Run the Database Migration
1. In the Supabase Dashboard, open the **SQL Editor**.
2. Open the file `supabase/migrations/20261023_init_portfolio.sql` in this repo and paste its contents into the SQL Editor.
3. Click **Run**. This creates:
   - `gallery_items` table with Row Level Security.
   - `contact_messages` table for portfolio inquiries.
   - `gallery-images` public storage bucket.
   - Security policies ensuring public read access and owner-only write/delete permissions.

### Step 4: Create the Owner Admin User
1. In the Supabase Dashboard, navigate to **Authentication &rarr; Users**.
2. Click **Add User &rarr; Create User**.
3. Enter your owner email (e.g. `roshan.dev.contact@gmail.com`) and a strong master password.
4. Confirm user creation.

Now visit [http://localhost:5173/admin](http://localhost:5173/admin) and log in with your owner credentials!

---

## 📸 How to Manage Pictures in `/admin`

1. Navigate to `/admin` via the top navigation bar or the footer link.
2. Sign in with your owner account (or click *Enter Sandbox Mode* for local testing).
3. **Upload Pictures**: Click **Upload New Photos**, drag in JPEG, PNG, or WebP images, set titles/captions/categories, and click **Upload & Publish**.
4. **Edit Metadata**: Click the pencil icon on any photo to update title, category, caption, or tags.
5. **Highlight as Featured**: Click the sparkle icon on any card to pin it as featured.
6. **Reorder**: Use the **Up** and **Down** arrow buttons to adjust the sequence of photos in the masonry grid.
7. **Delete**: Click the trash can icon and confirm in the dialog to safely remove the database record and storage file.

---

## 🌐 Deploying to Production

The portfolio is ready to deploy to any modern hosting platform:

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Set environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel project settings.

### Deploy to Netlify
```bash
npm run build
```
Deploy the `dist/` directory and configure single-page application rewrite (`/* /index.html 200`).

---

## 📄 License

Created by **Roshan Kumar Yadav**. All rights reserved.
