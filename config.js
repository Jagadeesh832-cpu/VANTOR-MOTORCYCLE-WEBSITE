/**
 * VANTOR — Configuration & Content Manifest
 * Royal Enfield Continental GT 650 Luxury Showcase
 *
 * All section heights, scroll ranges, frame counts, image paths,
 * telemetry ranges, color tokens, and vehicle specifications.
 */

const VANTOR_CONFIG = {
  brand: {
    name: "VANTOR",
    wordmark: "V A N T O R",
    tagline: "OWN THE ROAD. RULE THE NIGHT.",
    heroLead: "ROYAL ENFIELD CONTINENTAL GT 650",
    edition: "THE BLACK PHANTOM EDITION",
    disclaimer: "VANTOR is an independent fictional luxury showcase concept created for cinematic and digital storytelling. All motorcycle models, emblems, and technical specifications are based on official Royal Enfield vehicles.",
    copyright: "© 2026 VANTOR — A Cinematic Motorcycle Showcase."
  },

  theme: {
    colors: {
      black: "#07080A",
      graphite: "#121418",
      darkGrey: "#202226",
      gold: "#C49A48",
      goldLight: "#D8B66B",
      white: "#EDEAE4",
      fog: "#8A8F98",
      red: "#E1251B",
      xenon: "#CFE3FF",
      line: "rgba(237, 234, 228, 0.12)"
    },
    fonts: {
      display: "'Archivo', -apple-system, sans-serif",
      body: "'Inter', -apple-system, sans-serif",
      mono: "'JetBrains Mono', monospace"
    },
    easing: "cubic-bezier(0.16, 1, 0.3, 1)"
  },

  frames: {
    hero: {
      totalFrames: 120,
      preloadCount: 40,
      wrapperHeight: "600vh",
      desktop: {
        pathPrefix: "assets/frames/hero/frame_",
        extension: ".webp",
        padLength: 4,
        width: 1600,
        quality: 78,
        totalSizeMB: 4.90
      },
      mobile: {
        pathPrefix: "assets/frames/hero-mobile/frame_",
        extension: ".webp",
        padLength: 4,
        width: 960,
        quality: 72,
        totalSizeMB: 2.28
      },
      chapters: [
        {
          id: "chapter-01",
          start: 0.00,
          end: 0.16,
          label: "01 / PROLOGUE",
          title: "VANTOR",
          subtitle: "THE NIGHT BELONGS TO THOSE WHO RIDE.",
          prompt: "SCROLL TO EXPLORE",
          telemetry: { speed: 0, distance: 0.0 }
        },
        {
          id: "chapter-02",
          start: 0.22,
          end: 0.42,
          label: "02 / THE AWAKENING",
          title: "NOT BUILT TO FOLLOW.",
          subtitle: "Silence has a new sound. Midnight asphalt and twin-cylinder roar.",
          prompt: null,
          telemetry: { speed: 48, distance: 1.1 }
        },
        {
          id: "chapter-03",
          start: 0.50,
          end: 0.70,
          label: "03 / THE ASCENT",
          title: "BUILT TO LEAD.",
          subtitle: "Born to own the darkness. Precision lines cut through the skyscraper canyon.",
          prompt: null,
          telemetry: { speed: 89, distance: 2.7 }
        },
        {
          id: "chapter-04",
          start: 0.80,
          end: 0.98,
          label: "04 / CONTINENTAL GT 650",
          title: "BLACK PHANTOM EDITION",
          subtitle: "Twin-cylinder 648cc cafe racer. Pure mechanical obsession.",
          buttonText: "DISCOVER THE MACHINE",
          buttonLink: "#collection",
          telemetry: { speed: 118, distance: 4.2 }
        }
      ],
      hud: {
        title: "CHAPTER 01/04",
        speedRange: [0, 118],
        distanceRange: [0.0, 4.2],
        unitSpeed: "KM/H",
        unitDistance: "KM"
      }
    },

    group: {
      totalFrames: 40,
      preloadCount: 15,
      wrapperHeight: "500vh",
      desktop: {
        pathPrefix: "assets/frames/group/frame_",
        extension: ".webp",
        padLength: 4,
        width: 1600,
        quality: 78,
        totalSizeMB: 2.06
      },
      mobile: {
        pathPrefix: "assets/frames/group-mobile/frame_",
        extension: ".webp",
        padLength: 4,
        width: 960,
        quality: 72,
        totalSizeMB: 1.01
      },
      chapters: [
        {
          id: "group-01",
          start: 0.00,
          end: 0.30,
          label: "FORMATION LEAD",
          title: "ONE ROAD.",
          subtitle: "The lead GT 650 carves the path through wet skyscraper avenues."
        },
        {
          id: "group-02",
          start: 0.35,
          end: 0.65,
          label: "SYNCHRONICITY",
          title: "ONE SPIRIT.",
          subtitle: "Tuned parallel twins in formation. Headlights cutting clean through the rain."
        },
        {
          id: "group-03",
          start: 0.70,
          end: 0.98,
          label: "ELEVATED HORIZON",
          title: "NO LIMITS.",
          subtitle: "Together, beyond the ordinary. Crossing the illuminated midnight bridge."
        }
      ],
      hud: {
        title: "CHAPTER 02/04",
        status: "FORMATION ACTIVE",
        riders: "08 RIDERS IN SQUAD",
        cadence: "7250 RPM"
      }
    }
  },

  collection: [
    {
      id: "gt650",
      number: "01",
      name: "CONTINENTAL GT 650",
      tagline: "The Café Racer",
      status: "Master Showcase Model",
      description: "A pure retro-modern café racer born from 1960s British culture. Sculpted clip-on posture, sculpted black fuel tank with hand-crafted liquid gold coachlines, and a charismatic 648cc air-cooled twin.",
      image: "assets/bikes/gt650.webp",
      highlight: true,
      specs: [
        { label: "Engine", value: "648cc Parallel-Twin" },
        { label: "Power", value: "47 bhp @ 7250 RPM" },
        { label: "Torque", value: "52.3 Nm @ 5650 RPM" },
        { label: "Transmission", value: "6-Speed Slipper Clutch" },
        { label: "Weight", value: "211 kg (Kerb)" },
        { label: "Top Speed", value: "169 km/h" }
      ],
      swatches: [
        { name: "Black Phantom", color: "#0B0C0E", border: "#C49A48" },
        { name: "Apex Grey", color: "#54585E", border: "rgba(255,255,255,0.2)" },
        { name: "Slipstream Blue", color: "#1D3354", border: "rgba(255,255,255,0.2)" },
        { name: "Dux Deluxe", color: "#C49A48", border: "#EDEAE4" }
      ],
      linkText: "EXPLORE GT 650",
      linkUrl: "#machine"
    },
    {
      id: "interceptor",
      number: "02",
      name: "INTERCEPTOR 650",
      tagline: "The Modern Roadster",
      status: "Pure California Soul",
      description: "Inspired by the sun-drenched 1960s California coast. Wide upright braced handlebars, relaxed riding ergonomics, and effortless torque for spirited urban dashes and coastal weekend getaways.",
      image: "assets/bikes/interceptor.webp",
      highlight: false,
      specs: [
        { label: "Engine", value: "648cc Parallel-Twin" },
        { label: "Power", value: "47 bhp @ 7250 RPM" },
        { label: "Torque", value: "52.3 Nm @ 5150 RPM" },
        { label: "Seat Height", value: "804 mm" },
        { label: "Fuel Tank", value: "13.7 Litres" },
        { label: "Weight", value: "213 kg" }
      ],
      swatches: [
        { name: "Cali Green", color: "#29432B", border: "rgba(255,255,255,0.2)" },
        { name: "Canyon Red", color: "#8A1C14", border: "rgba(255,255,255,0.2)" },
        { name: "Black Ray", color: "#151618", border: "rgba(255,255,255,0.2)" },
        { name: "Sunset Strip", color: "#B8652A", border: "rgba(255,255,255,0.2)" }
      ],
      linkText: "EXPLORE INTERCEPTOR",
      linkUrl: "#machine"
    },
    {
      id: "super-meteor",
      number: "03",
      name: "SUPER METEOR 650",
      tagline: "Made for the Open Road",
      status: "Thoroughbred Highway Cruiser",
      description: "An authentic cruiser engineered for transcontinental journeys. Low-slung sculpted stance, 43mm upside-down Showa forks, forward footpegs, and a relaxed wide saddle built for endless highway miles.",
      image: "assets/bikes/super-meteor.webp",
      highlight: false,
      specs: [
        { label: "Engine", value: "648cc Parallel-Twin" },
        { label: "Power", value: "47 bhp @ 7250 RPM" },
        { label: "Torque", value: "52.3 Nm @ 5650 RPM" },
        { label: "Front Forks", value: "43mm Showa USD" },
        { label: "Seat Height", value: "740 mm" },
        { label: "Wheelbase", value: "1500 mm" }
      ],
      swatches: [
        { name: "Celestial Red", color: "#821A25", border: "rgba(255,255,255,0.2)" },
        { name: "Astral Black", color: "#101012", border: "rgba(255,255,255,0.2)" },
        { name: "Interstellar Green", color: "#1E3A2B", border: "rgba(255,255,255,0.2)" },
        { name: "Celestial Blue", color: "#1D2B44", border: "rgba(255,255,255,0.2)" }
      ],
      linkText: "EXPLORE SUPER METEOR",
      linkUrl: "#machine"
    },
    {
      id: "shotgun",
      number: "04",
      name: "SHOTGUN 650",
      tagline: "An Unmistakable Custom Spirit",
      status: "Neo-Retro Bobber",
      description: "A shapeshifting neo-retro custom inspired by modern street builder culture. Modular single-to-dual seat configuration, aggressive low cockpit, chopped fenders, and exposed mechanical muscle.",
      image: "assets/bikes/shotgun.webp",
      highlight: false,
      specs: [
        { label: "Engine", value: "648cc Parallel-Twin" },
        { label: "Power", value: "46.4 bhp @ 7250 RPM" },
        { label: "Torque", value: "52.3 Nm @ 5650 RPM" },
        { label: "Wheels", value: "18\" Front / 17\" Rear" },
        { label: "Seat Height", value: "795 mm" },
        { label: "Weight", value: "240 kg" }
      ],
      swatches: [
        { name: "Stencil White", color: "#E4E2DC", border: "rgba(255,255,255,0.2)" },
        { name: "Plasma Blue", color: "#1E3F66", border: "rgba(255,255,255,0.2)" },
        { name: "Green Drill", color: "#3B4A38", border: "rgba(255,255,255,0.2)" },
        { name: "Sheet Metal Grey", color: "#484C50", border: "rgba(255,255,255,0.2)" }
      ],
      linkText: "EXPLORE SHOTGUN",
      linkUrl: "#machine"
    },
    {
      id: "himalayan",
      number: "05",
      name: "HIMALAYAN 450",
      tagline: "Adventure Without Limits",
      status: "All-Terrain Explorer",
      description: "Powered by the all-new liquid-cooled 452cc Sherpa engine. Long-travel 200mm suspension, massive 230mm ground clearance, and an integrated TripperDash navigation display engineered for extreme global terrain.",
      image: "assets/bikes/himalayan.webp",
      highlight: false,
      specs: [
        { label: "Engine", value: "452cc Liquid-Cooled Sherpa" },
        { label: "Power", value: "40.02 PS @ 8000 RPM" },
        { label: "Torque", value: "40.0 Nm @ 5500 RPM" },
        { label: "Ground Clearance", value: "230 mm" },
        { label: "Suspension", value: "200mm Front / Rear" },
        { label: "Instrument", value: "4\" Round TFT Map Dash" }
      ],
      swatches: [
        { name: "Hanle Black", color: "#18181A", border: "#C49A48" },
        { name: "Kamet White", color: "#DFE0DF", border: "rgba(255,255,255,0.2)" },
        { name: "Slate Salt", color: "#846C65", border: "rgba(255,255,255,0.2)" },
        { name: "Kaza Brown", color: "#6D5745", border: "rgba(255,255,255,0.2)" }
      ],
      linkText: "EXPLORE HIMALAYAN",
      linkUrl: "#machine"
    }
  ],

  engineering: [
    {
      number: "01",
      title: "648cc Parallel-Twin Powerplant",
      category: "POWERTRAIN",
      description: "Air/oil-cooled twin cylinder engineered with a 270-degree crankshaft. Produces an authentic, deep mechanical rumble and smooth, accessible torque curve across the entire rev range without peaky vibration."
    },
    {
      number: "02",
      title: "Harris Performance Tuned Chassis",
      category: "DYNAMICS",
      description: "Developed in close partnership with legendary UK frame masters Harris Performance. Dual-cradle tubular steel frame provides high torsional rigidity, laser-precise tracking in turns, and responsive low-speed balance."
    },
    {
      number: "03",
      title: "Hand-Crafted Gold Coachlines",
      category: "AESTHETICS",
      description: "A signature multi-stage gloss black lacquer finish complemented by hand-applied liquid gold racing pinstripes. Every fuel tank contour pays tribute to 1960s café racer custom culture."
    },
    {
      number: "04",
      title: "ByBre Dual-Channel Braking System",
      category: "SAFETY",
      description: "Equipped with Brembo's ByBre 320mm front floating disc and 240mm rear disc backed by Bosch dual-channel ABS. Delivers progressive bite, fade-free thermal resistance, and reassuring wet-weather control."
    },
    {
      number: "05",
      title: "Slipper Clutch & 6-Speed Gearbox",
      category: "TRANSMISSION",
      description: "Assist and slipper clutch mechanism lightens lever pull and prevents aggressive rear-wheel hopping during rapid, high-speed downshifts entering sharp city hairpin corners."
    },
    {
      number: "06",
      title: "Upswept Twin Stainless Megaphones",
      category: "EXHAUST",
      description: "Satin-brushed dual stainless steel exhaust headers feeding twin upswept megaphone silencers, tuned acoustically to emit a rich, rhythmic pulse reverberating through skyscraper canyons."
    }
  ],

  experience: [
    {
      number: "01",
      title: "THE FREEDOM",
      headline: "A road without boundaries.",
      body: "When the city falls silent, the asphalt transforms into your personal circuit. Empty boulevards, illuminated elevated expressways, and the hypnotic cadence of an unrestricted parallel twin."
    },
    {
      number: "02",
      title: "THE CONNECTION",
      headline: "Every turn. Every moment.",
      body: "No synthetic driving aids or digital disconnects. Direct throttle cables, mechanical slipper clutch feel, and the raw tactile feedback of rubber meeting rain-soaked tarmac."
    },
    {
      number: "03",
      title: "THE PRESENCE",
      headline: "A machine that speaks without words.",
      body: "Unrivaled café racer silhouette. Low-slung clip-on handlebars, sculpted cowl, and gold accents gleaming under neon streetlamps. Instant recognition in any company."
    }
  ],

  settings: {
    maxDevicePixelRatio: 2,
    targetFPS: 60,
    reducedMotionFallbackFrameHero: 40,
    reducedMotionFallbackFrameGroup: 20
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.VANTOR_CONFIG = VANTOR_CONFIG;
}

