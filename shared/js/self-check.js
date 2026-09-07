/**
 * FORMATIVE SELF-CHECK & DIAGNOSTIC QUIZ ENGINE
 * Instant in-browser verification with constructive feedback
 * before students copy & submit into Microsoft Forms.
 */

class SelfCheckEngine {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.self-check-card').forEach((card) => {
      const checkBtn = card.querySelector('.self-check-btn');
      const resetBtn = card.querySelector('.self-check-reset-btn');
      const input = card.querySelector('.self-check-input');
      const feedback = card.querySelector('.self-check-feedback');

      if (checkBtn && input) {
        checkBtn.addEventListener('click', () => this.evaluate(card));
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            this.evaluate(card);
          }
        });
      }

      if (resetBtn && input) {
        resetBtn.addEventListener('click', () => {
          input.value = '';
          if (feedback) {
            feedback.style.display = 'none';
            feedback.className = 'self-check-feedback';
          }
        });
      }
    });
  }

  evaluate(card) {
    const input = card.querySelector('.self-check-input');
    const feedback = card.querySelector('.self-check-feedback');
    const expected = card.getAttribute('data-expected') || '';
    const hints = card.getAttribute('data-hint') || '';
    const type = card.getAttribute('data-type') || 'exact'; // 'exact' | 'numeric' | 'includes'

    if (!input || !feedback) return;

    const val = input.value.trim();
    if (!val) {
      feedback.style.display = 'block';
      feedback.className = 'self-check-feedback warning';
      feedback.innerHTML = '⚠️ Please enter an answer before checking.';
      return;
    }

    let isCorrect = false;

    if (type === 'numeric') {
      const numVal = parseFloat(val.replace(/[^\d.-]/g, ''));
      const numExp = parseFloat(expected);
      const tolerance = parseFloat(card.getAttribute('data-tolerance') || '0.01');
      isCorrect = !isNaN(numVal) && Math.abs(numVal - numExp) <= tolerance;
    } else if (type === 'includes') {
      isCorrect = val.toLowerCase().includes(expected.toLowerCase());
    } else {
      // exact match (case-insensitive)
      const cleanVal = val.toLowerCase().replace(/\s+/g, '');
      const cleanExp = expected.toLowerCase().replace(/\s+/g, '');
      isCorrect = cleanVal === cleanExp;
    }

    feedback.style.display = 'block';
    if (isCorrect) {
      feedback.className = 'self-check-feedback success';
      feedback.innerHTML = `✅ <strong>Correct!</strong> Ready to record in your Microsoft Form.`;
    } else {
      feedback.className = 'self-check-feedback error';
      feedback.innerHTML = `❌ <strong>Not quite.</strong> Hint: ${hints || 'Check calculations and metric units.'}`;
    }
  }
}

// Global auto-init
document.addEventListener('DOMContentLoaded', () => {
  window.selfCheckEngine = new SelfCheckEngine();
});
