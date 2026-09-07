/**
 * MICROSOFT FORMS DRAWER CONTROLLER (PERFORMANCE OPTIMIZED)
 * Manages opening, closing, section switching, popout behavior,
 * and LAZY IFRAME LOADING to eliminate initial page load latency.
 */

class FormsDrawerController {
  constructor() {
    this.drawer = document.getElementById('forms-drawer');
    this.backdrop = document.getElementById('drawer-backdrop');
    this.iframe = document.getElementById('forms-iframe');
    this.openTriggers = document.querySelectorAll('.open-forms-trigger');
    this.closeBtn = document.getElementById('drawer-close-btn');
    this.popoutBtn = document.getElementById('drawer-popout-btn');
    this.sectionNotice = document.getElementById('drawer-active-section');
    
    // Default MS Form URL placeholder - easily configurable
    this.defaultFormUrl = "https://forms.office.com/Pages/ResponsePage.aspx?id=your-org-form-id";
    this.isIframeLoaded = false;
    
    this.init();
  }

  init() {
    if (!this.drawer) return;

    // Attach open triggers
    this.openTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionName = trigger.getAttribute('data-form-section') || "Section 1";
        this.open(sectionName);
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    if (this.popoutBtn) {
      this.popoutBtn.addEventListener('click', () => {
        const url = (this.iframe && this.iframe.getAttribute('data-src')) 
          ? this.iframe.getAttribute('data-src') 
          : this.defaultFormUrl;
        window.open(url, '_blank');
      });
    }

    // Keyboard ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  open(sectionName = "Relevant Section") {
    if (this.sectionNotice) {
      this.sectionNotice.textContent = sectionName;
    }

    // Lazy load the iframe only when first opened
    if (this.iframe && !this.isIframeLoaded) {
      const targetSrc = this.iframe.getAttribute('data-src') || this.defaultFormUrl;
      this.iframe.src = targetSrc;
      this.isIframeLoaded = true;
    }

    this.drawer.classList.add('open');
    if (this.backdrop) {
      this.backdrop.classList.add('active');
    }
  }

  close() {
    this.drawer.classList.remove('open');
    if (this.backdrop) {
      this.backdrop.classList.remove('active');
    }
  }

  isOpen() {
    return this.drawer.classList.contains('open');
  }

  setFormUrl(url) {
    if (this.iframe) {
      this.iframe.setAttribute('data-src', url);
      if (this.isOpen()) {
        this.iframe.src = url;
      }
    }
    this.defaultFormUrl = url;
  }
}

// Global accessor
document.addEventListener('DOMContentLoaded', () => {
  window.formsDrawer = new FormsDrawerController();
});
