/* =============================================
   ボ林 Tool Showcase Portal - JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initToolsAutomation();
});

/* =============================================
   Scroll Animations (Intersection Observer)
   ============================================= */
/* =============================================
   Tools Automation
   (Automatic Numbering, Coloring, and Delay)
   ============================================= */
function initToolsAutomation() {
  const toolsWrappers = document.querySelectorAll('#tools .tool-card-wrapper');
  const proWrappers = document.querySelectorAll('#pro .tool-card-wrapper');
  const palette = [
    { primary: '#df5d4b', rgb: '223, 93, 75' },   // Red
    { primary: '#4a86e8', rgb: '74, 134, 232' },  // Blue
    { primary: '#f6a23c', rgb: '246, 162, 60' },  // Orange
    { primary: '#e91e63', rgb: '233, 30, 99' },   // Pink
    { primary: '#14b8a6', rgb: '20, 184, 166' },  // Teal
    { primary: '#a855f7', rgb: '168, 85, 247' },  // Purple
    { primary: '#22c55e', rgb: '34, 197, 94' },   // Green
    { primary: '#f59e0b', rgb: '245, 158, 11' },  // Amber
    { primary: '#06b6d4', rgb: '6, 182, 212' },   // Cyan
    { primary: '#6366f1', rgb: '99, 102, 241' }   // Indigo
  ];
  const paletteStep = 7; // spread colors instead of simple loop

  function applyAutomation(wrappers) {
    wrappers.forEach((wrapper, index) => {
      const card = wrapper.querySelector('.tool-card');
      if (!card) return;

      // 1. Automatic Numbering (padded: 01, 02...)
      let numEl = card.querySelector('.tool-card-number');
      if (!numEl) {
        numEl = document.createElement('div');
        numEl.className = 'tool-card-number';
        card.appendChild(numEl);
      }
      numEl.textContent = (index + 1).toString().padStart(2, '0');

      // 2. Automatic Coloring (cycle through palette)
      const colorTheme = palette[(index * paletteStep) % palette.length];

      // Set variables on both wrapper and card for flexibility
      wrapper.style.setProperty('--card-theme', colorTheme.primary);
      wrapper.style.setProperty('--card-theme-rgb', colorTheme.rgb);
      card.style.setProperty('--card-theme', colorTheme.primary);
      card.style.setProperty('--card-theme-rgb', colorTheme.rgb);

      // 3. Automatic Animation Delay (on wrapper since it has anim-item)
      wrapper.style.transitionDelay = `${index * 0.15}s`;
    });
  }

  applyAutomation(toolsWrappers);
  applyAutomation(proWrappers);
}

function initScrollAnimations() {
  const animItems = document.querySelectorAll('.anim-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animItems.forEach(item => observer.observe(item));
}
