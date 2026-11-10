# WILDINTEL — Global Wildlife Intelligence & Illegal Wildlife Trade Monitoring Platform

A visually exceptional, interactive, AI-powered Illegal Wildlife Trade Monitoring Platform developed for global wildlife intelligence.

---

## 🌟 Visual & Interaction Design Language

This project synthesizes two design references into a cohesive, high-performance web experience:

1. **Coralis Reference ([kombai.com/gallery/inspirations/coralis/](https://kombai.com/gallery/inspirations/coralis/))**
   - **Color Palette**: 
     - Turquoise: `#1FB6C9` (primary accent & hotspot markers)
     - Coral: `#FF7E6B` (primary CTA buttons, alert badges, and seizure markers)
     - Palm Green: `#2F7D58` (nature & verified conservation indicators)
     - Sand: `#F7F2E7` (primary base background, warm and organic)
     - Aqua Mist: `#E4F4F5` (secondary background, card surfaces)
     - Marine: `#0B3A4A` (deep ocean navy for contrast headings & footer)
     - Hero Cyan: `#9BF0FB` (luminous atmospheric glow)
     - Body Text: `#3A5A64` (refined slate-marine for readable body copy)
     - White: `#FFFFFF` (crisp container backgrounds)
   - **Typography**:
     - Headings: `Cormorant Garamond` (large editorial headlines, italic serif emphasis)
     - UI/Body: `Manrope` (uppercase tracking badges, clean geometry)
   - **Design Elements**: Organic pebble shapes, arches, soft warm shadows, large whitespace, asymmetric editorial layouts.

2. **Earth Experience Reference ([animalia-live.vercel.app](https://animalia-live.vercel.app/en))**
   - **Cinematic 3D Earth**: Custom Three.js procedural globe with bathymetric ocean blues, turquoise coastal shelves, realistic continent polygons, cloud layer, and atmospheric cyan glow.
   - **Geographical Interaction**: Smooth orbit drag with inertia, zoom controls, coordinate telemetry (WGS84 lat/long), layer toggles, and continent jump shortcuts.
   - **Pulsing Beacons**: Turquoise/Palm-green beacons for Biodiversity Hotspots and Coral diamond pins for Documented Wildlife Seizure Incidents.

---

## 🚀 Core Features

### 1. Cinematic Hero Section
- Prominent 3D Earth visual replacing the original Coralis lagoon.
- Editorial headline: *"Protect the wild. Preserve our living Earth."* with Cormorant Garamond italic serif.
- Coral CTA button *"EXPLORE THE EARTH"* and secondary underlined link *"Discover Our Mission"*.
- Live telemetry metrics and vertical scroll indicator.

### 2. Interactive 3D Earth Exploration Hub
- Full 3D globe with independent layer visibility toggles:
  - **Show Hotspots** (Turquoise `#1FB6C9`)
  - **Show Trade Incidents** (Coral `#FF7E6B`)
- Lat/Lng coordinate telemetry under cursor.
- Auto-rotate toggle, zoom in/out, and reset view controls.
- Smooth camera fly-to on marker click.

### 3. Real Verified Biodiversity Hotspots (10 Global Sanctuaries)
- Documented hotspots: Indo-Burma, Madagascar, Sundaland, Tropical Andes, Western Ghats & Sri Lanka, Congo Basin, Mesoamerica, Coral Triangle, Himalaya, Atlantic Forest.
- **EXPLORE WILDLIFE LIVE**: Embedded YouTube live wildlife streams and 4K camera feeds with LIVE / RECORDED mode toggles and direct links.
- High-resolution photography of endangered species and on-the-ground conservation actions.

### 4. Verified Historical Wildlife Crime Incidents
- Real documented incidents from CITES, TRAFFIC, UNODC, Interpol, and national enforcement authorities:
  - Singapore Pasir Panjang 11.9t pangolin scale & 8.8t elephant ivory seizure
  - Vietnam Cát Lái Port 5.3t African pangolin scale bust
  - Nigeria Apapa Port 8.8t pangolin scale and raw ivory seizure
  - Chennai Airport 1,364 Indian Star Tortoises trafficking intercept
  - Baja California / US border Totoaba swim bladder cartel operation
  - Kruger National Park armed rhino horn poaching syndicate bust
  - Hong Kong Airport transit suitcase radiated tortoise intercept
  - Miami Airport live songbird and reptile smuggling in curler tubes
- Detailed case dossiers with authoritative source agencies and verified media links.

### 5. AI-Powered Wildlife Trade Detection Engine
- **Dual Input Methods**:
  - **Option A: Upload Screenshot**: Drag-and-drop zone, file browser, preview, remove/replace (JPG, PNG, WEBP).
  - **Option B: Submit URL**: Social media link validator with transparent platform accessibility notifications.
  - **Quick Evaluation Presets**: 4 preloaded test cases (Telegram pangolin bulk trade, Instagram radiated tortoise sale, Slow loris ambiguous adoption, Rwanda gorilla ecotourism benign post).
- **Classification System**:
  1. `POTENTIAL ILLEGAL WILDLIFE TRADE`
  2. `NO CLEAR EVIDENCE DETECTED`
  3. `REQUIRES MANUAL REVIEW`
- **Output Report**: Grounded confidence score, detected species taxonomy with CITES Appendices listings, extracted trafficking keywords, suspicious indicators checklist, and non-accusatory ethical assessment.
- **Dynamic Database Logging**: 1-click button to append analysis to the live dashboard.

### 6. Analytics & Intelligence Dashboard
- Key KPIs: Total Posts Analyzed, Potential Illicit Trade Detected, Manual Review Queue, Cleared Submissions.
- Interactive Visualizations: Temporal detection trends (volume vs flagged), most frequently targeted species bar breakdown.
- Searchable & filterable enforcement log table with full record inspector dossier.
- One-click CSV export.

---

## 🛠️ Tech Stack & Setup

- **Frontend**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom Coralis tokens & utilities
- **3D Graphics**: Three.js (custom shader atmosphere, procedural bathymetry, orbital controls)
- **AI Integration**: `@google/genai` (Gemini 1.5 Multimodal Vision API) + built-in production heuristic engine
- **Icons**: Lucide React

### Development Commands

```bash
# Install dependencies
npm install

# Start Vite dev server (runs on http://localhost:5173)
npm run dev

# Build production bundle
npm run build
```
