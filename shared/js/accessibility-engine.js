/**
 * UNIT 6 NEURODIVERSITY & ACCESSIBILITY ENGINE
 * Provides Dyslexia typography scaling, colorblind/high-contrast palettes,
 * Web Speech TTS narration, Bionic Reading, and LocalStorage state persistence.
 */

class AccessibilityEngine {
  constructor() {
    this.storageKey = 'unit6_a11y_prefs';
    this.prefs = {
      fontFamily: 'default', // 'default' | 'opendyslexic' | 'system'
      fontSize: 100, // 90 to 130 %
      lineHeight: 1.6, // 1.4 to 2.0
      letterSpacing: 0, // 0 to 2px
      theme: 'default', // 'default' | 'high-contrast-gold' | 'clean-light' | 'colorblind-safe'
      bionicReading: false,
      speechRate: 1.0, // 0.8 to 1.4
      speechPitch: 1.0
    };

    this.isSpeaking = false;
    this.synth = window.speechSynthesis || null;
    this.activeUtterance = null;

    this.drawer = document.getElementById('a11y-drawer');
    this.backdrop = document.getElementById('a11y-backdrop');
    this.triggerBtn = document.getElementById('open-a11y-drawer');
    this.closeBtn = document.getElementById('close-a11y-drawer');

    this.init();
  }

  init() {
    this.loadPreferences();
    this.applyPreferences();
    this.attachEventListeners();
  }

  loadPreferences() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        this.prefs = { ...this.prefs, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not read a11y preferences from localStorage', e);
    }
  }

  savePreferences() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.prefs));
    } catch (e) {
      console.warn('Could not save a11y preferences to localStorage', e);
    }
  }

  applyPreferences() {
    const root = document.documentElement;
    const body = document.body;

    // 1. Font Family
    body.classList.remove('font-opendyslexic', 'font-system');
    if (this.prefs.fontFamily === 'opendyslexic') {
      body.classList.add('font-opendyslexic');
    } else if (this.prefs.fontFamily === 'system') {
      body.classList.add('font-system');
    }

    // 2. Font Size, Line Height, Letter Spacing
    root.style.setProperty('--a11y-font-scale', `${this.prefs.fontSize}%`);
    root.style.setProperty('--a11y-line-height', `${this.prefs.lineHeight}`);
    root.style.setProperty('--a11y-letter-spacing', `${this.prefs.letterSpacing}px`);

    // 3. Theme Classes
    body.classList.remove('theme-high-contrast-gold', 'theme-clean-light', 'theme-colorblind-safe');
    if (this.prefs.theme === 'high-contrast-gold') {
      body.classList.add('theme-high-contrast-gold');
    } else if (this.prefs.theme === 'clean-light') {
      body.classList.add('theme-clean-light');
    } else if (this.prefs.theme === 'colorblind-safe') {
      body.classList.add('theme-colorblind-safe');
    }

    // 4. Bionic Reading on Active Slide
    this.updateBionicReading();

    // 5. Update UI Controls in Drawer if open
    this.syncControlsUI();
  }

  syncControlsUI() {
    // Font Family Select
    const fontSelect = document.getElementById('a11y-font-select');
    if (fontSelect) fontSelect.value = this.prefs.fontFamily;

    // Font Size Slider / Value
    const fontSlider = document.getElementById('a11y-font-size');
    const fontSizeVal = document.getElementById('a11y-font-size-val');
    if (fontSlider) fontSlider.value = this.prefs.fontSize;
    if (fontSizeVal) fontSizeVal.textContent = `${this.prefs.fontSize}%`;

    // Line Height Slider
    const lhSlider = document.getElementById('a11y-line-height');
    const lhVal = document.getElementById('a11y-line-height-val');
    if (lhSlider) lhSlider.value = this.prefs.lineHeight;
    if (lhVal) lhVal.textContent = `${this.prefs.lineHeight}`;

    // Letter Spacing Slider
    const lsSlider = document.getElementById('a11y-letter-spacing');
    const lsVal = document.getElementById('a11y-letter-spacing-val');
    if (lsSlider) lsSlider.value = this.prefs.letterSpacing;
    if (lsVal) lsVal.textContent = `${this.prefs.letterSpacing}px`;

    // Theme Select
    const themeSelect = document.getElementById('a11y-theme-select');
    if (themeSelect) themeSelect.value = this.prefs.theme;

    // Bionic Reading Toggle
    const bionicToggle = document.getElementById('a11y-bionic-toggle');
    if (bionicToggle) bionicToggle.checked = this.prefs.bionicReading;

    // Speech Rate Slider
    const speechRate = document.getElementById('a11y-speech-rate');
    const speechRateVal = document.getElementById('a11y-speech-rate-val');
    if (speechRate) speechRate.value = this.prefs.speechRate;
    if (speechRateVal) speechRateVal.textContent = `${this.prefs.speechRate}x`;
  }

  attachEventListeners() {
    // Drawer open / close
    if (this.triggerBtn) {
      this.triggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.closeDrawer());
    }

    // Controls change listeners
    const fontSelect = document.getElementById('a11y-font-select');
    if (fontSelect) {
      fontSelect.addEventListener('change', (e) => {
        this.prefs.fontFamily = e.target.value;
        this.applyPreferences();
        this.savePreferences();
      });
    }

    const fontSlider = document.getElementById('a11y-font-size');
    if (fontSlider) {
      fontSlider.addEventListener('input', (e) => {
        this.prefs.fontSize = parseInt(e.target.value, 10);
        this.applyPreferences();
        this.savePreferences();
      });
    }

    const lhSlider = document.getElementById('a11y-line-height');
    if (lhSlider) {
      lhSlider.addEventListener('input', (e) => {
        this.prefs.lineHeight = parseFloat(e.target.value);
        this.applyPreferences();
        this.savePreferences();
      });
    }

    const lsSlider = document.getElementById('a11y-letter-spacing');
    if (lsSlider) {
      lsSlider.addEventListener('input', (e) => {
        this.prefs.letterSpacing = parseFloat(e.target.value);
        this.applyPreferences();
        this.savePreferences();
      });
    }

    const themeSelect = document.getElementById('a11y-theme-select');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        this.prefs.theme = e.target.value;
        this.applyPreferences();
        this.savePreferences();
      });
    }

    const bionicToggle = document.getElementById('a11y-bionic-toggle');
    if (bionicToggle) {
      bionicToggle.addEventListener('change', (e) => {
        this.prefs.bionicReading = e.target.checked;
        this.applyPreferences();
        this.savePreferences();
      });
    }

    const speechRate = document.getElementById('a11y-speech-rate');
    if (speechRate) {
      speechRate.addEventListener('input', (e) => {
        this.prefs.speechRate = parseFloat(e.target.value);
        this.syncControlsUI();
        this.savePreferences();
      });
    }

    // TTS Trigger Buttons
    const speakBtn = document.getElementById('a11y-speak-active-slide');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => this.toggleSpeech());
    }

    const stopBtn = document.getElementById('a11y-stop-speech');
    if (stopBtn) {
      stopBtn.addEventListener('click', () => this.stopSpeech());
    }

    // Reset All Preferences
    const resetBtn = document.getElementById('a11y-reset-prefs');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetPreferences());
    }

    // Keyboard shortcut 'a' to toggle accessibility drawer
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
      if (e.key.toLowerCase() === 'a') {
        if (this.isOpen()) this.closeDrawer();
        else this.openDrawer();
      }
    });
  }

  openDrawer() {
    if (!this.drawer) return;
    this.syncControlsUI();
    this.drawer.classList.add('open');
    if (this.backdrop) this.backdrop.classList.add('active');
  }

  closeDrawer() {
    if (!this.drawer) return;
    this.drawer.classList.remove('open');
    if (this.backdrop) this.backdrop.classList.remove('active');
  }

  isOpen() {
    return this.drawer && this.drawer.classList.contains('open');
  }

  resetPreferences() {
    this.prefs = {
      fontFamily: 'default',
      fontSize: 100,
      lineHeight: 1.6,
      letterSpacing: 0,
      theme: 'default',
      bionicReading: false,
      speechRate: 1.0,
      speechPitch: 1.0
    };
    this.stopSpeech();
    this.applyPreferences();
    this.savePreferences();
  }

  /**
   * Performance-optimized Bionic Reading:
   * Scoped ONLY to the active slide to avoid layout lag
   */
  updateBionicReading() {
    const activeSlide = document.querySelector('.slide.active');
    if (!activeSlide) return;

    if (!this.prefs.bionicReading) {
      // Revert if previously formatted
      activeSlide.querySelectorAll('.bionic-word').forEach((el) => {
        el.outerHTML = el.textContent;
      });
      return;
    }

    // Apply bionic transformation to text nodes inside paragraphs, list items, headings
    const textContainers = activeSlide.querySelectorAll('p, li, .card-title, .callout, .schematic-caption');
    textContainers.forEach((container) => {
      if (container.querySelector('.bionic-word')) return; // already formatted

      // Walk child text nodes
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          if (node.parentElement.tagName === 'CODE' || node.parentElement.tagName === 'PRE' || node.parentElement.classList.contains('bionic-word')) {
            return NodeFilter.FILTER_REJECT;
          }
          return node.nodeValue.trim().length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });

      const nodesToReplace = [];
      while (walker.nextNode()) {
        nodesToReplace.push(walker.currentNode);
      }

      nodesToReplace.forEach((node) => {
        const span = document.createElement('span');
        const words = node.nodeValue.split(/(\s+)/);
        span.innerHTML = words.map((w) => {
          if (/^\s+$/.test(w) || w.length === 0) return w;
          const mid = Math.ceil(w.length * 0.45);
          return `<span class="bionic-word"><b>${w.slice(0, mid)}</b>${w.slice(mid)}</span>`;
        }).join('');
        node.replaceWith(span);
      });
    });
  }

  /**
   * Web Speech (TTS) Reader
   */
  toggleSpeech() {
    if (this.isSpeaking) {
      this.stopSpeech();
    } else {
      this.speakActiveSlide();
    }
  }

  speakActiveSlide() {
    if (!this.synth) {
      alert('Speech Synthesis is not supported in this browser.');
      return;
    }

    this.stopSpeech();

    const activeSlide = document.querySelector('.slide.active');
    if (!activeSlide) return;

    // Collect clean readable text (excluding scripts, timers, buttons)
    const elementsToRead = activeSlide.querySelectorAll('h1, h2, h3, h4, p, li, .callout');
    const textBlocks = [];
    elementsToRead.forEach((el) => {
      const text = el.innerText.trim();
      if (text) textBlocks.push(text);
    });

    const fullText = textBlocks.join('. ');
    if (!fullText) return;

    this.activeUtterance = new SpeechSynthesisUtterance(fullText);
    this.activeUtterance.rate = this.prefs.speechRate;
    this.activeUtterance.pitch = this.prefs.speechPitch;

    this.activeUtterance.onstart = () => {
      this.isSpeaking = true;
      this.updateSpeechUI(true);
    };

    this.activeUtterance.onend = () => {
      this.isSpeaking = false;
      this.updateSpeechUI(false);
    };

    this.activeUtterance.onerror = () => {
      this.isSpeaking = false;
      this.updateSpeechUI(false);
    };

    this.synth.speak(this.activeUtterance);
  }

  stopSpeech() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.updateSpeechUI(false);
  }

  updateSpeechUI(speaking) {
    const speakBtn = document.getElementById('a11y-speak-active-slide');
    if (!speakBtn) return;
    if (speaking) {
      speakBtn.innerHTML = '⏸️ Pause Narration';
      speakBtn.classList.add('btn-primary');
    } else {
      speakBtn.innerHTML = '🔊 Read Slide Aloud';
      speakBtn.classList.remove('btn-primary');
    }
  }
}

// Global Auto-Init
document.addEventListener('DOMContentLoaded', () => {
  window.a11yEngine = new AccessibilityEngine();
});
