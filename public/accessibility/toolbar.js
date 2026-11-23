/* =============================================================================
   Revival Accessibility Toolbar — vanilla JS, no dependencies.
   Renders its own DOM so it can be dropped into any page.
   Preferences persist in localStorage under a single JSON key.
   ============================================================================= */
(function () {
  "use strict";
  if (window.__revivalA11yLoaded) return;
  window.__revivalA11yLoaded = true;

  var STORAGE_KEY = "revival:a11y-prefs:v1";
  var doc = document;
  var html = doc.documentElement;

  /* --------------------------------------------------------------------------
     SVG icon library (kept small; each returns the inner markup for a <svg>).
     ------------------------------------------------------------------------ */
  var ICONS = {
    accessibility:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M4 8h16"/><path d="M12 8v6"/><path d="M8 22l4-8 4 8"/><path d="M12 14v-2"/></svg>',
    close:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    plus:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    minus:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>',
    reset:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>',
    lineHeight:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    letterSpacing:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V8h4v12M12 20V4h4v16M20 20V12"/></svg>',
    dyslexia:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20L10 4l6 16"/><path d="M6 14h8"/><path d="M16 12h4"/></svg>',
    contrast:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20V2z"/></svg>',
    moon:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    sun:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>',
    invert:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 0 1 0 18V3z" fill="currentColor"/><circle cx="12" cy="12" r="9"/></svg>',
    grayscale:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3v18" stroke-linecap="round"/></svg>',
    saturation:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z"/></svg>',
    link:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
    heading:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 4v16M18 4v16M6 12h12"/></svg>',
    guide:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 12h18"/><path d="M8 8l-5 4 5 4"/><path d="M16 8l5 4-5 4"/></svg>',
    mask:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="10" width="18" height="4" rx="1"/></svg>',
    pause:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    motion:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 12h16"/><path d="M4 6h10"/><path d="M4 18h10"/></svg>',
    image:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/></svg>',
    cursor:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3l6 16 2-7 7-2z"/></svg>',
    focus:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="12" cy="12" r="3"/></svg>',
    arrowUp:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    info:
      '<svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></svg>',
  };

  /* --------------------------------------------------------------------------
     Default state — mirrors every togglable feature.
     ------------------------------------------------------------------------ */
  var defaults = {
    fontScale: 1,        // 1 = normal, adjustable in 0.1 steps
    lineHeight: 1.65,    // steps of 0.15
    letterSpacing: 0,    // px, steps of 0.5
    dyslexia: false,
    highContrast: false,
    darkMode: false,
    lightMode: false,
    invert: false,
    grayscale: false,
    desaturate: false,
    saturate: false,
    highlightLinks: false,
    highlightHeadings: false,
    readingGuide: false,
    readingMask: false,
    pauseAnimations: false,
    reduceMotion: false,
    hideImages: false,
    largeCursor: false,
    focusHighlight: false,
  };

  /* Load persisted prefs, falling back to defaults + OS preferences. */
  var state = loadState();

  function loadState() {
    var next = Object.assign({}, defaults);
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) Object.assign(next, JSON.parse(raw));
    } catch (e) {
      // localStorage unavailable / corrupt — silently keep defaults.
    }
    // Auto-detect OS preferences on first visit only.
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          next.reduceMotion = true;
        }
      }
    } catch (e) {}
    return next;
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  /* --------------------------------------------------------------------------
     Root DOM
     ------------------------------------------------------------------------ */
  var root = doc.createElement("div");
  root.className = "a11y-root";
  root.setAttribute("data-a11y-root", "");

  root.innerHTML = [
    // Skip link
    '<a class="a11y-skip-link" href="#main">Skip to main content</a>',

    // Reading guide + mask overlays
    '<div class="a11y-reading-guide" aria-hidden="true"></div>',
    '<div class="a11y-reading-mask-top" aria-hidden="true"></div>',
    '<div class="a11y-reading-mask-bottom" aria-hidden="true"></div>',

    // Back to top
    '<button type="button" class="a11y-back-top" aria-label="Back to top">' +
      ICONS.arrowUp +
      "</button>",

    // Floating trigger
    '<button type="button" class="a11y-trigger" aria-label="Open accessibility menu" aria-expanded="false" aria-controls="a11y-panel">' +
      ICONS.accessibility +
      "</button>",

    // Panel
    '<aside class="a11y-panel" id="a11y-panel" role="dialog" aria-modal="false" aria-labelledby="a11y-panel-title" tabindex="-1">',
    '  <header class="a11y-panel__header">',
    '    <div>',
    '      <p class="a11y-panel__subtitle">Revival</p>',
    '      <h2 class="a11y-panel__title" id="a11y-panel-title">Accessibility</h2>',
    "    </div>",
    '    <button type="button" class="a11y-panel__close" aria-label="Close accessibility menu">' +
      ICONS.close +
      "</button>",
    "  </header>",
    '  <div class="a11y-panel__body">',

    // Typography
    '    <section class="a11y-section" aria-labelledby="a11y-sec-typo">',
    '      <h3 class="a11y-section__label" id="a11y-sec-typo">Typography</h3>',
    '      <div class="a11y-grid">',
    tile("fontInc", ICONS.plus, "Bigger Text"),
    tile("fontDec", ICONS.minus, "Smaller Text"),
    tile("fontReset", ICONS.reset, "Reset Text"),
    tile("lineHeight", ICONS.lineHeight, "Line Height", true),
    tile("letterSpacing", ICONS.letterSpacing, "Letter Spacing", true),
    tile("dyslexia", ICONS.dyslexia, "Dyslexia Font", true),
    "      </div>",
    "    </section>",

    // Colour & display
    '    <section class="a11y-section" aria-labelledby="a11y-sec-col">',
    '      <h3 class="a11y-section__label" id="a11y-sec-col">Colour &amp; Display</h3>',
    '      <div class="a11y-grid">',
    tile("highContrast", ICONS.contrast, "High Contrast", true),
    tile("darkMode", ICONS.moon, "Dark Mode", true),
    tile("lightMode", ICONS.sun, "Light Mode", true),
    tile("invert", ICONS.invert, "Invert Colours", true),
    tile("grayscale", ICONS.grayscale, "Grayscale", true),
    tile("desaturate", ICONS.saturation, "Low Saturation", true),
    tile("saturate", ICONS.saturation, "High Saturation", true),
    tile("highlightLinks", ICONS.link, "Highlight Links", true),
    tile("highlightHeadings", ICONS.heading, "Highlight Titles", true),
    "      </div>",
    "    </section>",

    // Reading aids
    '    <section class="a11y-section" aria-labelledby="a11y-sec-read">',
    '      <h3 class="a11y-section__label" id="a11y-sec-read">Reading Aids</h3>',
    '      <div class="a11y-grid">',
    tile("readingGuide", ICONS.guide, "Reading Guide", true),
    tile("readingMask", ICONS.mask, "Reading Mask", true),
    tile("pauseAnimations", ICONS.pause, "Pause Animations", true),
    tile("reduceMotion", ICONS.motion, "Reduce Motion", true),
    tile("hideImages", ICONS.image, "Hide Images", true),
    tile("largeCursor", ICONS.cursor, "Large Cursor", true),
    tile("focusHighlight", ICONS.focus, "Focus Highlight", true),
    "      </div>",
    "    </section>",

    "  </div>",
    '  <footer class="a11y-panel__footer">',
    '    <button type="button" class="a11y-action" data-a11y-action="statement">Statement</button>',
    '    <button type="button" class="a11y-action a11y-action--primary" data-a11y-action="reset">Reset all</button>',
    "  </footer>",
    "</aside>",

    // Statement modal
    '<div class="a11y-modal" role="dialog" aria-modal="true" aria-labelledby="a11y-modal-title" aria-hidden="true">',
    '  <div class="a11y-modal__dialog">',
    '    <h3 class="a11y-modal__title" id="a11y-modal-title">Our Accessibility Commitment</h3>',
    '    <div class="a11y-modal__body">',
    "      <p>Revival Health &amp; Wellness is committed to providing a website that is accessible to the widest possible audience, regardless of ability or technology. We actively work to meet the Web Content Accessibility Guidelines (WCAG 2.1 Level AA).</p>",
    "      <p>This toolbar provides visual and reading adjustments that are saved to your device. No personal data is transmitted or shared.</p>",
    "      <p>If you experience any difficulty accessing content on our site, please contact us so we can help you promptly.</p>",
    "    </div>",
    '    <button type="button" class="a11y-modal__close" data-a11y-action="close-modal">Got it</button>',
    "  </div>",
    "</div>",
  ].join("\n");

  function tile(key, icon, label, toggle) {
    return (
      '<button type="button" class="a11y-btn" data-a11y-key="' +
      key +
      '"' +
      (toggle ? ' aria-pressed="false"' : "") +
      ">" +
      icon +
      "<span>" +
      label +
      "</span></button>"
    );
  }

  doc.body.appendChild(root);
  html.classList.add("a11y-active");

  /* --------------------------------------------------------------------------
     Element refs
     ------------------------------------------------------------------------ */
  var trigger = root.querySelector(".a11y-trigger");
  var panel = root.querySelector(".a11y-panel");
  var closeBtn = root.querySelector(".a11y-panel__close");
  var backTop = root.querySelector(".a11y-back-top");
  var guide = root.querySelector(".a11y-reading-guide");
  var maskTop = root.querySelector(".a11y-reading-mask-top");
  var maskBot = root.querySelector(".a11y-reading-mask-bottom");
  var modal = root.querySelector(".a11y-modal");
  var buttons = root.querySelectorAll(".a11y-btn");

  /* --------------------------------------------------------------------------
     Apply state → DOM
     ------------------------------------------------------------------------ */
  function applyState() {
    html.style.setProperty("--a11y-font-scale", String(state.fontScale));
    html.style.setProperty("--a11y-line-height", String(state.lineHeight));
    html.style.setProperty(
      "--a11y-letter-spacing",
      state.letterSpacing ? state.letterSpacing + "px" : "normal"
    );

    // Compose filter stack.
    var filters = [];
    if (state.invert) filters.push("invert(1) hue-rotate(180deg)");
    if (state.grayscale) filters.push("grayscale(1)");
    if (state.desaturate) filters.push("saturate(0.5)");
    if (state.saturate) filters.push("saturate(1.8)");
    html.style.setProperty(
      "--a11y-filter",
      filters.length ? filters.join(" ") : "none"
    );

    toggleClass("a11y-dyslexia", state.dyslexia);
    toggleClass("a11y-high-contrast", state.highContrast);
    toggleClass("a11y-dark-mode", state.darkMode);
    toggleClass("a11y-light-mode", state.lightMode);
    toggleClass("a11y-highlight-links", state.highlightLinks);
    toggleClass("a11y-highlight-headings", state.highlightHeadings);
    toggleClass("a11y-hide-images", state.hideImages);
    toggleClass("a11y-large-cursor", state.largeCursor);
    toggleClass("a11y-focus-highlight", state.focusHighlight);
    toggleClass("a11y-pause-animations", state.pauseAnimations);
    toggleClass("a11y-reduce-motion", state.reduceMotion);

    guide.classList.toggle("is-active", state.readingGuide);
    maskTop.classList.toggle("is-active", state.readingMask);
    maskBot.classList.toggle("is-active", state.readingMask);

    // Reflect aria-pressed on toggle buttons.
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      var key = b.getAttribute("data-a11y-key");
      if (b.hasAttribute("aria-pressed")) {
        b.setAttribute("aria-pressed", state[key] ? "true" : "false");
      }
    }
  }

  function toggleClass(cls, on) {
    if (on) html.classList.add(cls);
    else html.classList.remove(cls);
  }

  /* --------------------------------------------------------------------------
     Panel open / close + focus trap
     ------------------------------------------------------------------------ */
  var lastFocus = null;

  function openPanel() {
    lastFocus = doc.activeElement;
    panel.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    // Focus first interactive element after transition starts.
    window.setTimeout(function () {
      var first = panel.querySelector(".a11y-panel__close");
      if (first) first.focus();
    }, 60);
    doc.addEventListener("keydown", onPanelKey);
  }

  function closePanel() {
    panel.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    doc.removeEventListener("keydown", onPanelKey);
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    } else {
      trigger.focus();
    }
  }

  function isPanelOpen() {
    return panel.classList.contains("is-open");
  }

  function onPanelKey(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      if (modal.classList.contains("is-open")) closeModal();
      else closePanel();
      return;
    }
    if (e.key === "Tab") trapFocus(e, panel);
  }

  function trapFocus(e, container) {
    var focusables = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && doc.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && doc.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  trigger.addEventListener("click", function () {
    if (isPanelOpen()) closePanel();
    else openPanel();
  });
  closeBtn.addEventListener("click", closePanel);

  /* --------------------------------------------------------------------------
     Statement modal
     ------------------------------------------------------------------------ */
  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    var closer = modal.querySelector(".a11y-modal__close");
    window.setTimeout(function () {
      if (closer) closer.focus();
    }, 60);
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  /* --------------------------------------------------------------------------
     Button clicks (delegation across all tiles + action buttons)
     ------------------------------------------------------------------------ */
  var FONT_MIN = 0.8, FONT_MAX = 1.6, FONT_STEP = 0.1;
  var LINE_MIN = 1.4, LINE_MAX = 2.4, LINE_STEP = 0.2;
  var LETTER_MIN = 0, LETTER_MAX = 4, LETTER_STEP = 0.5;

  root.addEventListener("click", function (e) {
    var target = e.target.closest("[data-a11y-key], [data-a11y-action]");
    if (!target) return;

    var key = target.getAttribute("data-a11y-key");
    var action = target.getAttribute("data-a11y-action");

    if (action === "reset") return resetAll();
    if (action === "statement") return openModal();
    if (action === "close-modal") return closeModal();
    if (!key) return;

    switch (key) {
      case "fontInc":
        state.fontScale = clamp(state.fontScale + FONT_STEP, FONT_MIN, FONT_MAX);
        break;
      case "fontDec":
        state.fontScale = clamp(state.fontScale - FONT_STEP, FONT_MIN, FONT_MAX);
        break;
      case "fontReset":
        state.fontScale = defaults.fontScale;
        state.lineHeight = defaults.lineHeight;
        state.letterSpacing = defaults.letterSpacing;
        break;
      case "lineHeight":
        // Cycle through: default → +step → +step → back to default.
        state.lineHeight = state.lineHeight >= LINE_MAX
          ? defaults.lineHeight
          : clamp(state.lineHeight + LINE_STEP, LINE_MIN, LINE_MAX);
        break;
      case "letterSpacing":
        state.letterSpacing = state.letterSpacing >= LETTER_MAX
          ? defaults.letterSpacing
          : clamp(state.letterSpacing + LETTER_STEP, LETTER_MIN, LETTER_MAX);
        break;
      // Mutually-exclusive display modes get cleared before toggling.
      case "darkMode":
        state.darkMode = !state.darkMode;
        if (state.darkMode) { state.lightMode = false; state.highContrast = false; }
        break;
      case "lightMode":
        state.lightMode = !state.lightMode;
        if (state.lightMode) { state.darkMode = false; state.highContrast = false; }
        break;
      case "highContrast":
        state.highContrast = !state.highContrast;
        if (state.highContrast) { state.darkMode = false; state.lightMode = false; }
        break;
      case "grayscale":
        state.grayscale = !state.grayscale;
        if (state.grayscale) state.invert = false;
        break;
      case "invert":
        state.invert = !state.invert;
        if (state.invert) state.grayscale = false;
        break;
      case "desaturate":
        state.desaturate = !state.desaturate;
        if (state.desaturate) state.saturate = false;
        break;
      case "saturate":
        state.saturate = !state.saturate;
        if (state.saturate) state.desaturate = false;
        break;
      default:
        if (typeof state[key] === "boolean") state[key] = !state[key];
    }

    // Toggle-only tiles reflect via aria-pressed on non step-based keys.
    var pressedKeys = [
      "dyslexia","highContrast","darkMode","lightMode","invert","grayscale",
      "desaturate","saturate","highlightLinks","highlightHeadings","readingGuide",
      "readingMask","pauseAnimations","reduceMotion","hideImages","largeCursor",
      "focusHighlight"
    ];
    if (pressedKeys.indexOf(key) === -1 && target.hasAttribute("aria-pressed")) {
      // For stepper-style tiles (lineHeight, letterSpacing, dyslexia)
      // aria-pressed reflects "non-default" state.
      var active = false;
      if (key === "lineHeight") active = state.lineHeight !== defaults.lineHeight;
      if (key === "letterSpacing") active = state.letterSpacing !== defaults.letterSpacing;
      if (key === "dyslexia") active = state.dyslexia;
      target.setAttribute("aria-pressed", active ? "true" : "false");
    }

    applyState();
    saveState();
  });

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, Math.round(n * 100) / 100));
  }

  function resetAll() {
    state = Object.assign({}, defaults);
    applyState();
    saveState();
  }

  /* --------------------------------------------------------------------------
     Reading guide (rAF-throttled to avoid layout thrash)
     ------------------------------------------------------------------------ */
  var rafId = null;
  var pendingY = 0;
  function onMove(e) {
    pendingY = e.clientY;
    if (rafId) return;
    rafId = window.requestAnimationFrame(function () {
      rafId = null;
      if (state.readingGuide) {
        guide.style.transform = "translateY(" + (pendingY - 21) + "px)";
      }
      if (state.readingMask) {
        var maskH = 120;
        maskTop.style.height = Math.max(0, pendingY - maskH / 2) + "px";
        maskBot.style.height =
          Math.max(0, window.innerHeight - pendingY - maskH / 2) + "px";
      }
    });
  }
  doc.addEventListener("mousemove", onMove, { passive: true });

  /* --------------------------------------------------------------------------
     Back-to-top button
     ------------------------------------------------------------------------ */
  var scrollRaf = null;
  function onScroll() {
    if (scrollRaf) return;
    scrollRaf = window.requestAnimationFrame(function () {
      scrollRaf = null;
      var show = window.scrollY > 600;
      backTop.classList.toggle("is-visible", show);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  backTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: state.reduceMotion ? "auto" : "smooth",
    });
  });

  /* --------------------------------------------------------------------------
     Ensure main element has an id for the skip link.
     ------------------------------------------------------------------------ */
  var main = doc.querySelector("main");
  if (main && !main.id) main.id = "main";
  if (main && main.getAttribute("tabindex") === null) main.setAttribute("tabindex", "-1");

  /* --------------------------------------------------------------------------
     Initial apply + a soft focus outline on any keyboard user
     ------------------------------------------------------------------------ */
  applyState();

  // Reflect stepper "activeness" on first render.
  var lhBtn = root.querySelector('[data-a11y-key="lineHeight"]');
  var lsBtn = root.querySelector('[data-a11y-key="letterSpacing"]');
  if (lhBtn) lhBtn.setAttribute("aria-pressed",
    state.lineHeight !== defaults.lineHeight ? "true" : "false");
  if (lsBtn) lsBtn.setAttribute("aria-pressed",
    state.letterSpacing !== defaults.letterSpacing ? "true" : "false");
})();
