# VANTOR
**OWN THE ROAD. RULE THE NIGHT.**

VANTOR is a premium cinematic motorcycle website showcasing the Royal Enfield Continental GT 650 through immersive visuals, cinematic storytelling and interactive scrolling experiences.

---

## Project Overview

VANTOR redefines automotive digital experiences by transforming cinematic footage of a custom black-and-gold Royal Enfield Continental GT 650 into a responsive, scroll-driven interactive campaign. Set in a blacked-out futuristic metropolis where projector headlights and wet asphalt reflections illuminate the environment, VANTOR pairs precision engineering with high-impact scrollytelling.

---

## Features

- **Pinned Scrollytelling Sequences:** Hardware-accelerated HTML Canvas scrubs through high-resolution WebP sequences with zero video buffering or scrub stutter.
- **Dynamic Telemetry HUD:** Left-aligned mono display tracking real-time scroll progress, virtual road speed (000 → 118 KM/H), and distance (0.0 → 4.2 KM).
- **Word-by-Word Typography Reveal:** The brand philosophy statement dynamically reveals its text word by word based on viewport penetration.
- **Formation Riding Experience:** Dedicated scrollytelling section tracking an 8-rider formation at high speed through skyscraper canyons.
- **Interactive Collection Accordion:** Horizontal full-height accordion showcasing 5 authentic Royal Enfield models on desktop, seamlessly adapting into vertical expandable rows on mobile screens.
- **Verified Technical Specifications:** Official factory engine, power, torque, chassis, suspension, and braking specifications.
- **Interactive Color Swatches:** Multiple authentic factory finishes per model with dynamic finish indicators.
- **Headlight-Inspired Custom Cursor:** Minimal 6px xenon dot with 28px outer beam ring that morphs into a horizontal light bar with contextual labels (`VIEW`, `EXPLORE`, `RIDE`, `SELECT`).
- **Procedural Film Grain:** Subtle 3.8% opacity procedural grain overlay rendered using an offscreen canvas pattern.
- **Smart Navigation:** Auto-hiding transparent header that retracts on downward scrolling and reveals smoothly on upward scrolling.
- **Accessibility & Reduced Motion:** Full keyboard accessibility (`:focus-visible`), ARIA roles, and an automatic fallback mode for users who prefer reduced motion.

---

## Technologies Used

- **HTML5:** Semantic architecture, accessible markup, ARIA roles.
- **CSS3:** Custom properties (design tokens), flexbox, grid, fluid typography (`clamp`), strict flat styling rules.
- **Vanilla JavaScript (ES6+):** Pure vanilla JavaScript without external libraries.
- **HTML Canvas API:** High-performance 60fps frame scrubbing via `requestAnimationFrame`.
- **Google Fonts:**
  - *Archivo* (Expanded uppercase display headlines)
  - *Inter* (Body typography)
  - *JetBrains Mono* (Technical telemetry and HUD labels)
- **Zero Frameworks:** No React, Vue, Vite, Tailwind, GSAP, or Lenis required.

---

## Project Structure

```text
VANTOR-MOTORCYCLE-WEBSITE/
├── index.html                  # Main semantic HTML5 document
├── styles.css                  # Core CSS design system & responsive styling
├── main.js                     # Vanilla JavaScript scrollytelling engine
├── config.js                   # Central configuration & vehicle data manifest
├── .gitignore                  # Professional Git exclusion rules
├── README.md                   # Complete documentation
│
└── assets/
    ├── bikes/                  # 16:9 side-profile motorcycle product images (WebP)
    │   ├── gt650.webp          # Continental GT 650 Black Phantom Edition (Hero)
    │   ├── interceptor.webp    # Interceptor 650
    │   ├── super-meteor.webp   # Super Meteor 650
    │   ├── shotgun.webp        # Shotgun 650
    │   └── himalayan.webp      # Himalayan 450
    │
    ├── frames/                 # Frame-by-frame scroll scrubbing sequences
    │   ├── hero/               # 120 desktop frames (1600px, Q78 WebP, 4.90 MB)
    │   ├── hero-mobile/        # 120 mobile frames (960px, Q72 WebP, 2.28 MB)
    │   ├── group/              # 40 desktop frames (1600px, Q78 WebP, 2.06 MB)
    │   └── group-mobile/       # 40 mobile frames (960px, Q72 WebP, 1.01 MB)
    │
    ├── textures/               # High-resolution photographic backdrops
    │   ├── experience-bg.webp  # Section 06 mist backdrop
    │   ├── final-bridge.webp   # Section 07 elevated bridge closing scene
    │   └── hero-backdrop.webp  # Skyline backdrop
    │
    └── videos/                 # Original Google Flow source footage
        ├── hero-clip-1.mp4     # Solo GT 650 wet acceleration
        ├── hero-clip-2.mp4     # Solo GT 650 city canyon
        ├── hero-clip-3.mp4     # Solo GT 650 bridge approach
        └── group-riding.mp4    # Group riders in formation
```

---

## Installation & How to Run

### Running with VS Code Live Server (Recommended)
1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/VANTOR-MOTORCYCLE-WEBSITE.git
   cd VANTOR-MOTORCYCLE-WEBSITE
   ```
2. Open the directory in **Visual Studio Code**.
3. Install the **Live Server** extension (by Ritwick Dey) from the VS Code Marketplace.
4. Right-click `index.html` and select **"Open with Live Server"**.
5. The website will launch automatically in your browser at `http://127.0.0.1:5500`.

### Running with Python HTTP Server
```bash
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

---

## Asset Requirements & Optimization

- **Desktop Sequences:** Rendered at 1600px width, quality 78 WebP. Cover-fit scaling preserves panoramic visual fidelity.
- **Mobile Sequences:** Rendered at 960px width, quality 72 WebP. Contain-fit scaling ensures the motorcycle and rider are never cropped on narrower viewports.
- **Progressive Preloading:** The first 40 frames of the hero sequence (~1.6 MB) load prior to revealing the page; remaining frames stream in the background without layout shifts or thread locking.
- **Repository Size:** Entire repository footprint is ~60 MB, well within standard GitHub limits without requiring Git LFS.

---

## Screenshots & Visual Experience

```text
+-----------------------------------------------------------------------+
|  VANTOR           [HOME]  [COLLECTION]  [THE RIDE]  [EXPERIENCE]      |
|                                                                       |
|                                                                       |
|                          V A N T O R                                  |
|              THE NIGHT BELONGS TO THOSE WHO RIDE.                     |
|                                                                       |
|                        -- SCROLL TO EXPLORE --                        |
|                                                                       |
|  HUD 01/04                                                            |
|  SPEED: 118 KM/H                                                      |
|  DIST:  4.2 KM                                                        |
+-----------------------------------------------------------------------+
```

---

## Credits and Disclaimer

- **Concept & Design:** VANTOR Luxury Showcase Concept.
- **Motorcycle Design Reference:** Royal Enfield Continental GT 650, Interceptor 650, Super Meteor 650, Shotgun 650, Himalayan 450.
- **Disclaimer:** VANTOR is an independent fictional luxury showcase concept created for digital storytelling, cinematic design, and portfolio demonstration. VANTOR is not affiliated with, endorsed by, or sponsored by Royal Enfield or Eicher Motors Ltd. All motorcycle model names, trademarks, and emblems remain the property of their respective owners.

© 2026 VANTOR. All rights reserved.
