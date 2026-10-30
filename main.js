/**
 * VANTOR — Luxury Cinematic Motorcycle Showcase
 * Main Application Logic
 *
 * Scrollytelling Canvas Scrubbing, Frame Preloading, HUD Telemetry,
 * Word-by-Word Typography Reveal, Horizontal Collection Accordion,
 * Custom Headlight Cursor, Procedural Film Grain, and Responsive Handlers.
 */

(function () {
  'use strict';

  // Verify Config Availability
  const config = window.VANTOR_CONFIG;
  if (!config) {
    console.error('VANTOR_CONFIG not found. Ensure config.js is loaded before main.js.');
    return;
  }

  /* ==========================================================================
     ENVIRONMENT & GLOBAL STATE
     ========================================================================== */
  const state = {
    isMobile: window.innerWidth <= 768,
    isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    dpr: Math.min(window.devicePixelRatio || 1, config.settings.maxDevicePixelRatio),

    // Frames storage
    heroImages: [],
    groupImages: [],
    heroLoadedCount: 0,
    groupLoadedCount: 0,

    // Scroll progress & frame indices
    heroProgress: 0,
    currentHeroFrame: 0,
    targetHeroFrame: 0,

    groupProgress: 0,
    currentGroupFrame: 0,
    targetGroupFrame: 0,

    // Navigation state
    lastScrollY: 0,
    navHidden: false,

    // Cursor state
    mouseX: -100,
    mouseY: -100,
    ringX: -100,
    ringY: -100,

    // Active bike collection index
    activeBikeIndex: 0
  };

  // DOM Elements
  const dom = {
    preloader: document.getElementById('preloader'),
    preloaderBar: document.getElementById('preloader-bar'),
    preloaderNum: document.getElementById('preloader-num'),
    preloaderStatus: document.getElementById('preloader-status'),

    siteNav: document.getElementById('site-nav'),
    mobileToggle: document.getElementById('mobile-toggle'),
    mobileDrawer: document.getElementById('mobile-drawer'),

    filmGrainCanvas: document.getElementById('film-grain-canvas'),
    cursorDot: document.getElementById('cursor-dot'),
    cursorRing: document.getElementById('cursor-ring'),
    cursorLabel: document.getElementById('cursor-label'),

    heroSection: document.getElementById('hero'),
    heroStage: document.getElementById('hero-stage'),
    heroCanvas: document.getElementById('hero-canvas'),
    heroProgressBar: document.getElementById('hero-progress-bar'),
    heroHudChapter: document.getElementById('hero-hud-chapter'),
    heroHudSpeed: document.getElementById('hero-hud-speed'),
    heroHudDist: document.getElementById('hero-hud-dist'),

    statementSection: document.getElementById('statement'),
    statementText: document.getElementById('statement-text'),

    groupSection: document.getElementById('the-ride'),
    groupStage: document.getElementById('group-stage'),
    groupCanvas: document.getElementById('group-canvas'),
    groupProgressBar: document.getElementById('group-progress-bar'),
    groupHudCadence: document.getElementById('group-hud-cadence'),

    bikeAccordion: document.getElementById('bike-accordion'),
    engineeringGrid: document.getElementById('engineering-grid'),
    experienceGrid: document.getElementById('experience-grid')
  };

  const heroCtx = dom.heroCanvas ? dom.heroCanvas.getContext('2d') : null;
  const groupCtx = dom.groupCanvas ? dom.groupCanvas.getContext('2d') : null;

  /* ==========================================================================
     1. INITIALIZATION & DATA RENDERING
     ========================================================================== */
  function init() {
    renderStatementWords();
    renderCollectionAccordion();
    renderEngineeringGrid();
    renderExperienceGrid();

    setupCanvasDimensions();
    setupFilmGrain();

    if (!state.isMobile && !state.isReducedMotion) {
      setupCustomCursor();
    }

    setupNavigation();
    setupMobileDrawer();

    // Start loading frames
    startFramePreloading();

    // Event listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Initial scroll sync
    onScroll();

    // Start RAF Animation Loop
    requestAnimationFrame(renderLoop);
  }

  /* ==========================================================================
     2. FRAME PRELOADING & PROGRESSIVE LOADING
     ========================================================================== */
  function getFrameUrl(type, index) {
    const frameCfg = config.frames[type];
    const tier = state.isMobile ? frameCfg.mobile : frameCfg.desktop;
    const paddedIndex = String(index).padStart(tier.padLength, '0');
    return `${tier.pathPrefix}${paddedIndex}${tier.extension}`;
  }

  function startFramePreloading() {
    const heroCfg = config.frames.hero;
    const initialHeroTarget = heroCfg.preloadCount; // 40 frames
    let initialLoaded = 0;

    // Preload first 40 hero frames first to reveal page swiftly
    for (let i = 1; i <= heroCfg.totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl('hero', i);

      img.onload = () => {
        state.heroLoadedCount++;
        if (i <= initialHeroTarget) {
          initialLoaded++;
          const percent = Math.min(100, Math.round((initialLoaded / initialHeroTarget) * 100));
          if (dom.preloaderBar) dom.preloaderBar.style.width = `${percent}%`;
          if (dom.preloaderNum) dom.preloaderNum.textContent = `${String(percent).padStart(3, '0')}%`;

          if (initialLoaded === initialHeroTarget) {
            revealPage();
            // Load remaining hero frames and group frames in background
            loadRemainingFrames();
          }
        }
      };

      img.onerror = () => {
        console.warn(`Failed loading hero frame: ${img.src}`);
        if (i <= initialHeroTarget) {
          initialLoaded++;
          if (initialLoaded === initialHeroTarget) {
            revealPage();
            loadRemainingFrames();
          }
        }
      };

      state.heroImages.push(img);
    }
  }

  function loadRemainingFrames() {
    // Load group frames in background
    const groupCfg = config.frames.group;
    for (let i = 1; i <= groupCfg.totalFrames; i++) {
      const img = new Image();
      img.src = getFrameUrl('group', i);
      img.onload = () => { state.groupLoadedCount++; };
      img.onerror = () => { console.warn(`Failed loading group frame: ${img.src}`); };
      state.groupImages.push(img);
    }
  }

  function revealPage() {
    if (dom.preloader) {
      dom.preloader.classList.add('preloader-hidden');
    }
    // Draw initial frames
    drawHeroFrame(0);
    drawGroupFrame(0);
  }

  /* ==========================================================================
     3. CANVAS DIMENSIONS & FIT LOGIC (Cover for Desktop / Contain for Mobile)
     ========================================================================== */
  function setupCanvasDimensions() {
    state.dpr = Math.min(window.devicePixelRatio || 1, config.settings.maxDevicePixelRatio);
    const w = window.innerWidth;
    const h = window.innerHeight;

    [dom.heroCanvas, dom.groupCanvas].forEach(canvas => {
      if (!canvas) return;
      canvas.width = w * state.dpr;
      canvas.height = h * state.dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    });
  }

  function drawImageFit(ctx, canvas, img, isMobile, fadeToBlack = 0) {
    if (!ctx || !canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = config.theme.colors.black;
    ctx.fillRect(0, 0, cw, ch);

    let renderW, renderH, offsetX, offsetY;

    if (isMobile) {
      // Contain fit: never crop motorcycle on mobile screens
      const scale = Math.min(cw / iw, ch / ih);
      renderW = iw * scale;
      renderH = ih * scale;
      offsetX = (cw - renderW) / 2;
      offsetY = (ch - renderH) / 2;
    } else {
      // Cover fit: fill screen on desktop
      const scale = Math.max(cw / iw, ch / ih);
      renderW = iw * scale;
      renderH = ih * scale;
      offsetX = (cw - renderW) / 2;
      offsetY = (ch - renderH) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    // Fade to black effect
    if (fadeToBlack > 0) {
      ctx.fillStyle = `rgba(7, 8, 10, ${Math.min(1, Math.max(0, fadeToBlack))})`;
      ctx.fillRect(0, 0, cw, ch);
    }
  }

  function drawHeroFrame(frameIdx) {
    if (!heroCtx || !dom.heroCanvas || state.heroImages.length === 0) return;
    const validIdx = Math.max(0, Math.min(state.heroImages.length - 1, Math.round(frameIdx)));
    const img = state.heroImages[validIdx];

    // Fade canvas to black during final 5% of scrolling
    let fade = 0;
    if (state.heroProgress >= 0.95) {
      fade = (state.heroProgress - 0.95) / 0.05;
    }

    drawImageFit(heroCtx, dom.heroCanvas, img, state.isMobile, fade);
  }

  function drawGroupFrame(frameIdx) {
    if (!groupCtx || !dom.groupCanvas || state.groupImages.length === 0) return;
    const validIdx = Math.max(0, Math.min(state.groupImages.length - 1, Math.round(frameIdx)));
    const img = state.groupImages[validIdx];

    drawImageFit(groupCtx, dom.groupCanvas, img, state.isMobile, 0);
  }

  /* ==========================================================================
     4. SCROLL HANDLING & CHAPTER SYNCHRONIZATION
     ========================================================================== */
  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Navigation Hide on Scroll Down / Reveal on Up
    if (scrollY > state.lastScrollY && scrollY > 80) {
      if (!state.navHidden) {
        dom.siteNav.classList.add('nav-hidden');
        state.navHidden = true;
      }
    } else if (scrollY < state.lastScrollY) {
      if (state.navHidden) {
        dom.siteNav.classList.remove('nav-hidden');
        state.navHidden = false;
      }
    }

    if (scrollY > 50) {
      dom.siteNav.classList.add('nav-scrolled');
    } else {
      dom.siteNav.classList.remove('nav-scrolled');
    }
    state.lastScrollY = scrollY;

    // 1. Hero Pinned Section Progress
    if (dom.heroSection) {
      const rect = dom.heroSection.getBoundingClientRect();
      const totalScrollable = dom.heroSection.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
        state.heroProgress = progress;

        const maxFrame = config.frames.hero.totalFrames - 1;
        state.targetHeroFrame = progress * maxFrame;

        // Update progress bar
        if (dom.heroProgressBar) {
          dom.heroProgressBar.style.width = `${progress * 100}%`;
        }

        // Update HUD Telemetry
        updateHeroHUD(progress);

        // Update Hero Chapter Text Active states
        updateHeroChapters(progress);
      }
    }

    // 2. Statement Word-by-Word Reveal
    if (dom.statementSection) {
      const rect = dom.statementSection.getBoundingClientRect();
      const winH = window.innerHeight;
      // Section is active as it enters screen
      if (rect.top < winH && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (winH - rect.top) / (winH * 0.75)));
        updateStatementWords(progress);
      }
    }

    // 3. Group Riding Pinned Section Progress
    if (dom.groupSection) {
      const rect = dom.groupSection.getBoundingClientRect();
      const totalScrollable = dom.groupSection.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
        state.groupProgress = progress;

        const maxFrame = config.frames.group.totalFrames - 1;
        state.targetGroupFrame = progress * maxFrame;

        if (dom.groupProgressBar) {
          dom.groupProgressBar.style.width = `${progress * 100}%`;
        }

        updateGroupHUD(progress);
        updateGroupChapters(progress);
      }
    }
  }

  function updateHeroHUD(progress) {
    const hud = config.frames.hero.hud;
    const speed = Math.round(hud.speedRange[0] + progress * (hud.speedRange[1] - hud.speedRange[0]));
    const dist = (hud.distanceRange[0] + progress * (hud.distanceRange[1] - hud.distanceRange[0])).toFixed(1);

    if (dom.heroHudSpeed) dom.heroHudSpeed.textContent = `${String(speed).padStart(3, '0')} ${hud.unitSpeed}`;
    if (dom.heroHudDist) dom.heroHudDist.textContent = `${dist} ${hud.unitDistance}`;

    // Chapter index
    let currentChapNum = 1;
    if (progress >= 0.80) currentChapNum = 4;
    else if (progress >= 0.50) currentChapNum = 3;
    else if (progress >= 0.22) currentChapNum = 2;

    if (dom.heroHudChapter) dom.heroHudChapter.textContent = `CHAPTER 0${currentChapNum}/04`;
  }

  function updateHeroChapters(progress) {
    const chapters = config.frames.hero.chapters;
    chapters.forEach((chap, idx) => {
      const card = document.getElementById(`hero-chap-${idx}`);
      if (!card) return;
      if (progress >= chap.start && progress <= chap.end) {
        card.classList.add('chapter-active');
      } else {
        card.classList.remove('chapter-active');
      }
    });
  }

  function updateGroupHUD(progress) {
    if (!dom.groupHudCadence) return;
    const rpm = Math.round(4800 + progress * 2450);
    dom.groupHudCadence.textContent = `${rpm.toLocaleString()} RPM`;
  }

  function updateGroupChapters(progress) {
    const chapters = config.frames.group.chapters;
    chapters.forEach((chap, idx) => {
      const card = document.getElementById(`group-chap-${idx}`);
      if (!card) return;
      if (progress >= chap.start && progress <= chap.end) {
        card.classList.add('chapter-active');
      } else {
        card.classList.remove('chapter-active');
      }
    });
  }

  /* ==========================================================================
     5. STATEMENT WORD-BY-WORD REVEAL
     ========================================================================== */
  function renderStatementWords() {
    if (!dom.statementText) return;
    const text = dom.statementText.textContent.trim();
    const words = text.split(/\s+/);
    dom.statementText.innerHTML = '';

    words.forEach(word => {
      const span = document.createElement('span');
      span.className = 'reveal-word';
      span.textContent = word;
      dom.statementText.appendChild(span);
      dom.statementText.appendChild(document.createTextNode(' '));
    });
  }

  function updateStatementWords(progress) {
    const words = dom.statementText ? dom.statementText.querySelectorAll('.reveal-word') : [];
    if (words.length === 0) return;

    const litTarget = Math.floor(progress * words.length);
    words.forEach((span, idx) => {
      if (idx <= litTarget) {
        span.classList.add('word-lit');
      } else {
        span.classList.remove('word-lit');
      }
    });
  }

  /* ==========================================================================
     6. MOTORCYCLE COLLECTION ACCORDION
     ========================================================================== */
  function renderCollectionAccordion() {
    if (!dom.bikeAccordion) return;
    dom.bikeAccordion.innerHTML = '';

    config.collection.forEach((bike, index) => {
      const slide = document.createElement('div');
      slide.className = `accordion-slide ${index === 0 ? 'slide-active' : ''}`;
      slide.setAttribute('role', 'tab');
      slide.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      slide.setAttribute('tabindex', '0');
      slide.setAttribute('data-cursor', 'EXPLORE');
      slide.dataset.index = index;

      // Collapsed Header View
      const collapsedHeader = document.createElement('div');
      collapsedHeader.className = 'slide-collapsed-header';
      collapsedHeader.innerHTML = `
        <span class="slide-collapsed-num">${bike.number}</span>
        <span class="slide-collapsed-name">${bike.name}</span>
        <span class="slide-collapsed-indicator"></span>
      `;

      // Expanded Content View
      const expandedContent = document.createElement('div');
      expandedContent.className = 'slide-expanded-content';

      // Top Meta
      const topMeta = document.createElement('div');
      topMeta.className = 'slide-top-meta';
      topMeta.innerHTML = `
        <span class="slide-number">${bike.number} / 05</span>
        <span class="slide-status-badge">${bike.status}</span>
      `;

      // Bike Image Wrap
      const imgWrap = document.createElement('div');
      imgWrap.className = 'slide-image-wrap';
      const img = document.createElement('img');
      img.className = 'slide-bike-img';
      img.src = bike.image;
      img.alt = `${bike.name} side profile facing right`;
      img.loading = 'lazy';
      imgWrap.appendChild(img);

      // Bottom Info (Description + Swatches + Specs Grid)
      const bottomInfo = document.createElement('div');
      bottomInfo.className = 'slide-bottom-info';

      // Text Column
      const textCol = document.createElement('div');
      textCol.className = 'slide-text-block';
      textCol.innerHTML = `
        <h3>${bike.name}</h3>
        <div class="slide-tagline">${bike.tagline}</div>
        <p class="slide-desc">${bike.description}</p>
      `;

      // Swatches Wrap
      const swatchesWrap = document.createElement('div');
      swatchesWrap.className = 'slide-swatches-wrap';
      swatchesWrap.innerHTML = `<span class="swatch-label">FINISH:</span>`;

      const swatchGroup = document.createElement('div');
      swatchGroup.className = 'swatch-group';

      bike.swatches.forEach((swatch, swIdx) => {
        const circle = document.createElement('button');
        circle.className = `swatch-circle ${swIdx === 0 ? 'active' : ''}`;
        circle.style.backgroundColor = swatch.color;
        circle.style.border = `1px solid ${swatch.border || 'rgba(255,255,255,0.2)'}`;
        circle.title = swatch.name;
        circle.setAttribute('aria-label', swatch.name);
        circle.setAttribute('data-cursor', 'SELECT');

        circle.addEventListener('click', (e) => {
          e.stopPropagation();
          swatchGroup.querySelectorAll('.swatch-circle').forEach(c => c.classList.remove('active'));
          circle.classList.add('active');
        });

        swatchGroup.appendChild(circle);
      });
      swatchesWrap.appendChild(swatchGroup);
      textCol.appendChild(swatchesWrap);

      // Specs Column
      const specsCol = document.createElement('div');
      specsCol.className = 'slide-specs-grid';

      bike.specs.forEach(spec => {
        const cell = document.createElement('div');
        cell.className = 'spec-cell';
        cell.innerHTML = `
          <span class="spec-cell-label">${spec.label}</span>
          <span class="spec-cell-val">${spec.value}</span>
        `;
        specsCol.appendChild(cell);
      });

      // Explore Button
      const exploreBtn = document.createElement('a');
      exploreBtn.className = 'slide-explore-btn';
      exploreBtn.href = bike.linkUrl || '#machine';
      exploreBtn.textContent = bike.linkText || 'EXPLORE SPECIFICATIONS';
      exploreBtn.setAttribute('data-cursor', 'DISCOVER');
      specsCol.appendChild(exploreBtn);

      bottomInfo.appendChild(textCol);
      bottomInfo.appendChild(specsCol);

      expandedContent.appendChild(topMeta);
      expandedContent.appendChild(imgWrap);
      expandedContent.appendChild(bottomInfo);

      slide.appendChild(collapsedHeader);
      slide.appendChild(expandedContent);

      // Interactions: Hover (Desktop) / Click (Mobile & Desktop)
      slide.addEventListener('click', () => setActiveSlide(index));
      slide.addEventListener('mouseenter', () => {
        if (!state.isMobile) {
          setActiveSlide(index);
        }
      });
      slide.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveSlide(index);
        }
      });

      dom.bikeAccordion.appendChild(slide);
    });
  }

  function setActiveSlide(index) {
    state.activeBikeIndex = index;
    const slides = dom.bikeAccordion ? dom.bikeAccordion.querySelectorAll('.accordion-slide') : [];
    slides.forEach((s, idx) => {
      if (idx === index) {
        s.classList.add('slide-active');
        s.setAttribute('aria-selected', 'true');
      } else {
        s.classList.remove('slide-active');
        s.setAttribute('aria-selected', 'false');
      }
    });
  }

  /* ==========================================================================
     7. ENGINEERING & EXPERIENCE GRIDS RENDERING
     ========================================================================== */
  function renderEngineeringGrid() {
    if (!dom.engineeringGrid) return;
    dom.engineeringGrid.innerHTML = '';

    config.engineering.forEach(item => {
      const card = document.createElement('article');
      card.className = 'engineering-card';
      card.setAttribute('data-cursor', 'SPEC');
      card.innerHTML = `
        <div>
          <div class="card-top">
            <span class="card-num">${item.number}</span>
            <span class="card-cat">${item.category}</span>
          </div>
          <h3 class="card-title">${item.title}</h3>
        </div>
        <p class="card-desc">${item.description}</p>
      `;
      dom.engineeringGrid.appendChild(card);
    });
  }

  function renderExperienceGrid() {
    if (!dom.experienceGrid) return;
    dom.experienceGrid.innerHTML = '';

    config.experience.forEach(item => {
      const card = document.createElement('div');
      card.className = 'pillar-card';
      card.innerHTML = `
        <span class="pillar-num">${item.number}</span>
        <h3 class="pillar-title">${item.title}</h3>
        <div class="pillar-headline">${item.headline}</div>
        <p class="pillar-body">${item.body}</p>
      `;
      dom.experienceGrid.appendChild(card);
    });
  }

  /* ==========================================================================
     8. CUSTOM HEADLIGHT CURSOR
     ========================================================================== */
  function setupCustomCursor() {
    if (!dom.cursorDot || !dom.cursorRing) return;

    window.addEventListener('mousemove', (e) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;

      dom.cursorDot.style.transform = `translate(${state.mouseX}px, ${state.mouseY}px) translate(-50%, -50%)`;
    });

    // Delegate hover states
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-cursor], a, button, .accordion-slide, .engineering-card');
      if (target) {
        const label = target.getAttribute('data-cursor') || 'VIEW';
        if (dom.cursorLabel) dom.cursorLabel.textContent = label;

        if (target.classList.contains('chapter-cta-btn') || target.classList.contains('final-cta-btn') || target.classList.contains('nav-cta-btn')) {
          document.body.classList.add('cursor-hovered-gold');
        } else {
          document.body.classList.add('cursor-hovered');
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-cursor], a, button, .accordion-slide, .engineering-card');
      if (target) {
        document.body.classList.remove('cursor-hovered');
        document.body.classList.remove('cursor-hovered-gold');
      }
    });
  }

  function updateCursorRing() {
    if (state.isMobile || state.isReducedMotion || !dom.cursorRing) return;

    // Smooth lerp follow
    const lerp = 0.18;
    state.ringX += (state.mouseX - state.ringX) * lerp;
    state.ringY += (state.mouseY - state.ringY) * lerp;

    dom.cursorRing.style.transform = `translate(${state.ringX}px, ${state.ringY}px) translate(-50%, -50%)`;
  }

  /* ==========================================================================
     9. PROCEDURAL FILM GRAIN GENERATOR
     ========================================================================== */
  function setupFilmGrain() {
    if (!dom.filmGrainCanvas) return;
    const canvas = dom.filmGrainCanvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = 128;
    patternCanvas.height = 128;
    const pCtx = patternCanvas.getContext('2d');
    const pData = pCtx.createImageData(128, 128);
    const buf = new Uint32Array(pData.data.buffer);

    for (let i = 0; i < buf.length; i++) {
      const val = (Math.random() * 255) | 0;
      // RGBA monochrome noise
      buf[i] = (255 << 24) | (val << 16) | (val << 8) | val;
    }
    pCtx.putImageData(pData, 0, 0);

    const pattern = ctx.createPattern(patternCanvas, 'repeat');

    function drawGrain() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawGrain();
    window.addEventListener('resize', drawGrain);
  }

  /* ==========================================================================
     10. NAVIGATION & MOBILE DRAWER
     ========================================================================== */
  function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta-btn, .mobile-drawer-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            closeMobileDrawer();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  function setupMobileDrawer() {
    if (!dom.mobileToggle || !dom.mobileDrawer) return;

    dom.mobileToggle.addEventListener('click', () => {
      const isOpen = dom.mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  function openMobileDrawer() {
    if (!dom.mobileDrawer) return;
    dom.mobileDrawer.classList.add('open');
    dom.mobileDrawer.setAttribute('aria-hidden', 'false');
    dom.mobileToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileDrawer() {
    if (!dom.mobileDrawer) return;
    dom.mobileDrawer.classList.remove('open');
    dom.mobileDrawer.setAttribute('aria-hidden', 'true');
    dom.mobileToggle.setAttribute('aria-expanded', 'false');
  }

  /* ==========================================================================
     11. ANIMATION & RENDERING LOOP (60fps requestAnimationFrame)
     ========================================================================== */
  function renderLoop() {
    // 1. Interpolate Hero Frame
    const heroLerp = 0.22;
    state.currentHeroFrame += (state.targetHeroFrame - state.currentHeroFrame) * heroLerp;
    drawHeroFrame(state.currentHeroFrame);

    // 2. Interpolate Group Frame
    const groupLerp = 0.22;
    state.currentGroupFrame += (state.targetGroupFrame - state.currentGroupFrame) * groupLerp;
    drawGroupFrame(state.currentGroupFrame);

    // 3. Update Cursor Ring
    updateCursorRing();

    requestAnimationFrame(renderLoop);
  }

  /* ==========================================================================
     12. RESIZE HANDLER
     ========================================================================== */
  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const wasMobile = state.isMobile;
      state.isMobile = window.innerWidth <= 768;

      setupCanvasDimensions();

      // If transition between mobile and desktop occurred, reload frames appropriately
      if (wasMobile !== state.isMobile) {
        state.heroImages = [];
        state.groupImages = [];
        startFramePreloading();
      }

      onScroll();
    }, 150);
  }

  // Self Bootstrapping
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

