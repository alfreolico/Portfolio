const TOP_THRESHOLD = 600;

export default function initFloatingActions() {
  const topButton = document.querySelector('[data-scroll-top]');
  if (!topButton) return;

  const updateVisibility = () => {
    topButton.hidden = window.scrollY < TOP_THRESHOLD;
  };

  let pendingUpdate = false;
  const requestVisibilityUpdate = () => {
    if (pendingUpdate) return;
    pendingUpdate = true;
    window.requestAnimationFrame(() => {
      updateVisibility();
      pendingUpdate = false;
    });
  };

  topButton.addEventListener('click', () => {
    const reducedMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  window.addEventListener('scroll', requestVisibilityUpdate, { passive: true });
  updateVisibility();
}
