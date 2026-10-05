# Trinethra Multi Speciality & Critical Care Center
> Official modern, production-ready website for **Trinethra Multi Speciality & Critical Care Center** in Jangareddygudem, Andhra Pradesh, India.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Quick Start / Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🎨 Brand Design & Color Palette

Extracted strictly from the medical branding identity:
- **Primary:** `#0E7490` (Deep Ocean Cyan / Clinical Authority)
- **Primary Dark (Hover):** `#155E75`
- **Secondary:** `#0284C7` (Sky / Trust Medical Blue)
- **Accent:** `#0D9488` (Teal Vitality Green)
- **Dark Text:** `#0F172A` (Slate Navy 900)
- **Backgrounds:** `#FFFFFF` (Pure White) & `#F8FAFC` (Soft Clinical Tint)
- **Accents/Tints:** `#F0FDF4` (Mint Light) & `#F0F9FF` (Cyan Light)

---

## 📂 Project Architecture

```
├── data/
│   ├── hospital.json         # All hospital data, address, phone numbers, timings, reviews, gallery
│   └── doctors.json          # Medical departments, doctors list, qualifications, timings
├── public/
│   ├── assets/
│   │   ├── logo/             # Hospital logos (logo.svg, drop logo.png here)
│   │   ├── doctors/          # Doctor photos (dr_*.svg, drop doctor JPGs here)
│   │   └── gallery/          # Hospital facility imagery
│   └── favicon.svg           # Favicon icon
├── src/
│   ├── app/
│   │   ├── layout.tsx        # SEO Meta, OpenGraph, JSON-LD Schema (Hospital/Physician)
│   │   ├── page.tsx          # Main Single-Page Application assembling all sections
│   │   ├── globals.css       # Design tokens, typography & smooth animations
│   │   ├── sitemap.ts        # Dynamic sitemap.xml generator
│   │   ├── robots.ts         # robots.txt generator
│   │   ├── icon.svg          # Dynamic SVG App Icon
│   │   └── api/
│   │       └── appointments/ # Backend API route for booking capture
│   ├── components/
│   │   ├── Header.tsx        # Top emergency bar & sticky navigation with mobile drawer
│   │   ├── Hero.tsx          # Healthcare hero with trust stats & emergency CTAs
│   │   ├── About.tsx         # Mission, vision, core clinical pillars
│   │   ├── Departments.tsx   # Specialties card grid linked directly to doctors
│   │   ├── Doctors.tsx       # Live search, department filtering, doctor cards
│   │   ├── DoctorModal.tsx   # Detailed doctor profile popup modal
│   │   ├── Services.tsx      # ICU, 24/7 Casualty, Pharmacy & Diagnostic Lab
│   │   ├── AppointmentSection.tsx # Validated appointment form + instant WhatsApp link
│   │   ├── Reviews.tsx       # Real 5.0 Star score & verified patient feedback
│   │   ├── Gallery.tsx       # Facility visual grid with interactive Lightbox modal
│   │   ├── Contact.tsx       # Address, embedded Google Map & Get Directions
│   │   ├── Footer.tsx        # Quick links, social links, copyright
│   │   └── FloatingCTAs.tsx  # Floating WhatsApp button & mobile emergency sticky bar
│   ├── lib/
│   │   └── data.ts           # Type-safe data accessors
│   └── types/
│       └── index.ts          # TypeScript interfaces
```

---

## ✏️ How to Edit Content (Without Touching Code)

All website content is driven by two simple JSON files in the `/data` folder:

### 1. Editing Phone Numbers, Address, or Timings
Open `data/hospital.json`:
- **Phone Numbers:** Update `contact.primaryPhone` and `contact.emergencyPhone`.
- **WhatsApp Desk:** Update `contact.whatsAppPhone` (format: `918978262779`).
- **Address & Google Map:** Update `contact.address` and `contact.mapEmbedUrl`.
- **Reviews & Testimonials:** Add or edit reviews in `reviews` array.

### 2. Editing Doctors Roster
Open `data/doctors.json`:
- Update `name`, `displayName`, `qualification`, `specialization`, `experience`, `timing`, and `about`.
- To add a new doctor, simply duplicate an object in the `doctors` array.
- Point the `image` field to your photo in `/public/assets/doctors/`.

### 3. Replacing Logos & Images
- **Hospital Logo:**
  - Place your PNG file at `/public/assets/logo/logo.png`.
  - In `data/hospital.json`, set `"logo": "/assets/logo/logo.png"`.
- **Doctor Photos:**
  - Place doctor photos in `/public/assets/doctors/` (e.g., `dr_critical_care.jpg`).
  - In `data/doctors.json`, update the `image` path.
- **Facility Photos:**
  - Place clinic/ward photos in `/public/assets/gallery/`.
  - In `data/hospital.json`, update the `gallery` items.

---

## 📋 Data Needed from Hospital (Marked as "TODO")

Because Instagram blocked direct programmatic crawl (`httpErrorPage`) and Google protects personal clinician roster directories, the following entries are cleanly marked as `TODO` in `data/hospital.json` and `data/doctors.json`:

1. **Exact Doctor Names & Qualifications:**
   - Update `data/doctors.json` with the exact full names and degrees of the practicing doctors (e.g., Dr. Ramesh MD, Dr. Sunitha MS).
2. **Official Hospital Email:**
   - Update `contact.email` in `data/hospital.json`.
3. **Established Year:**
   - Update `hospital.establishedYear` in `data/hospital.json`.
4. **Original High-Res Logo & Photos:**
   - Drop the official hospital logo in `/public/assets/logo/logo.png` and doctor JPG portraits in `/public/assets/doctors/`.

---

## 🌐 Deployment to Vercel

1. **Push your code to GitHub / GitLab:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Trinethra Hospital website"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Log in to [vercel.com](https://vercel.com).
   - Click **"Add New"** -> **"Project"**.
   - Select your Git repository.
   - Vercel automatically detects **Next.js**.
   - Click **"Deploy"**.
   - Your site will be live worldwide in less than 60 seconds with SSL, edge caching, and 100/100 performance!
