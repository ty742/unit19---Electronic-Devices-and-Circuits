/**
 * INTERACTIVE COUNTDOWN TIMER MODULE
 * Handles countdowns for timed activities (20min, 15min, 35min)
 */

class ActivityTimer {
  constructor(element) {
    this.container = element;
    this.duration = parseInt(element.getAttribute('data-duration'), 10) * 60; // in seconds
    this.remaining = this.duration;
    this.intervalId = null;
    this.isRunning = false;

    this.displayEl = element.querySelector('.timer-display');
    this.toggleBtn = element.querySelector('.timer-toggle');
    this.resetBtn = element.querySelector('.timer-reset');

    this.init();
  }

  init() {
    this.render();
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.reset());
    }
  }

  toggle() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }

  start() {
    if (this.isRunning || this.remaining <= 0) return;
    this.isRunning = true;
    this.updateButtonText();
    
    this.intervalId = setInterval(() => {
      this.remaining--;
      this.render();

      if (this.remaining <= 0) {
        this.pause();
        this.onComplete();
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.intervalId);
    this.updateButtonText();
  }

  reset() {
    this.pause();
    this.remaining = this.duration;
    this.render();
    this.container.classList.remove('timer-ended');
  }

  onComplete() {
    this.container.classList.add('timer-ended');
    // Subtle notification pulse
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  }

  updateButtonText() {
    if (!this.toggleBtn) return;
    this.toggleBtn.innerHTML = this.isRunning 
      ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause'
      : '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Start';
  }

  render() {
    const mins = Math.floor(this.remaining / 60);
    const secs = this.remaining % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (this.displayEl) {
      this.displayEl.textContent = formatted;
    }
  }
}

// Auto-initialize all timers on the page
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.timer-widget').forEach((el) => {
    new ActivityTimer(el);
  });
});
