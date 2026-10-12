# AWS Student Builder Community Day — Multi-Page Editorial Experience

A complete, production-grade, multi-page **React 19 + Vite + TypeScript + GSAP + React Router** application for **AWS Community Day**, redesigned from the ground up using the **NOISE DEPT. / CONTROLLED DISORDER** visual identity.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
Compiles a minified production bundle in `dist/`.

---

## 🗺️ Multi-Page Architecture (React Router)

| Route | Page | Purpose & Content |
| :--- | :--- | :--- |
| `/` | **Home** | Experimental hero, GSAP entrance, live terminal card, stats, curriculum tracks, previews of schedule, speakers, gallery, registration CTA, and FAQ preview. |
| `/about` | **About** | Deep-dive into event philosophy, student builder manifesto ("No slides without code"), experiential learning tenets, and documentary workshop imagery. |
| `/schedule` | **Schedule** | Interactive momentum timetable from 10:00 to 17:00, category filters (`ARRIVAL`, `KEYNOTE`, `HANDS-ON`, `LAB`, `DEMO`), room labels, and facilitator details. |
| `/speakers` | **Speakers & Community** | Profiles for Student Builder Mentors, Campus Community Team, and Guest Developers with topics, quotes, and open mentorship hours notice. |
| `/gallery` | **Gallery & Highlights** | Immersive visual archive with authentic workshop photography, serverless topology schematics, terminal deployment logs, and poster artwork. |
| `/faq` | **FAQ** | Category-filtered numbered accordion answering questions on registration, hardware requirements, AWS lab sandboxes, and static deployment. |
| `/contact` | **Contact & Campus** | Campus address at Rungta University, GPS coordinates (`21.1904° N, 81.2849° E`), transit protocol, and direct volunteer dispatch form. |
| `/register` | **Registration Portal** | Dedicated registration experience with live seat counter, attendee checklist, and preserved Google Apps Script integration. |
| `*` | **404 Not Found** | Brutalist void page with technical error label and home return action. |

---

## ⚡ Advanced GSAP Animation System

- **Page Transitions (`PageTransition.tsx`)**: GSAP polygon clip-path overlays revealing route codes `[00]` through `[07]` before unmasking the new page without breaking history.
- **Hero Text Entrance**: Staggered vertical line reveals with overflow-hidden wrappers on headlines, lead text, and action buttons.
- **Image Reveal Masks**: Cinematic `clip-path` polygon curtain wipes on photographic assets.
- **ScrollTrigger Stagger**: Responsive staggered fades on cards, metrics, and schedule rows.
- **Custom Desktop Pointer (`CustomCursor.tsx`)**: High-contrast square cursor displaying contextual interaction states (`VIEW`, `RESERVE`, `TOGGLE`, `HOME`).
- **Scroll Progress**: Top viewport progress bar tracking scroll percentage.
- **Prefers Reduced Motion**: Fully respected via `window.matchMedia('(prefers-reduced-motion: reduce)')`.

---

## 🔒 Preserved Google Apps Script Integration

- **Endpoint**: `https://script.google.com/macros/s/AKfycbx8AYDy1DwCGeDI4GtoH0UpWewf79NwUilHsYhRadRG9_1kRaPhDlpIaM_ObFOJNb4B8A/exec`
- **Method**: `POST`
- **Mode**: `no-cors` (compatible with Google Apps Script cross-origin policy)
- **Payload**: `FormData` (`name`, `email`, `college`, `interest`, `registeredAt`)
- **Validation**: Full client-side validation for name (min 2), email regex, college (min 2), interest selection, and consent agreement.
- **Feedback**: In-flight disablement, loading indicator, duplicate submission protection, local storage seat decrement (`studentBuilderDemoRegistrations`), and toast alert system.
