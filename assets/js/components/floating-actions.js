const TOP_THRESHOLD = 600;
const MOBILE_ACTIONS_QUERY = '(max-width: 480px)';
const READING_CONTENT_SELECTOR = [
  'main h1',
  'main h2',
  'main h3',
  'main p',
  'main li',
  'main a',
  'main button',
  'main input',
  'main select',
  'main textarea',
  'main label'
].join(', ');

function isVisible(element) {
  const styles = window.getComputedStyle(element);
  return styles.display !== 'none' && styles.visibility !== 'hidden';
}

function overlapsReadableContent(control, readableElements) {
  const controlRect = control.getBoundingClientRect();

  return readableElements.some((element) => {
    if (!isVisible(element)) return false;

    const elementRect = element.getBoundingClientRect();
    const isInViewport = elementRect.bottom > 0 && elementRect.top < window.innerHeight;
    const intersects = controlRect.left < elementRect.right
      && controlRect.right > elementRect.left
      && controlRect.top < elementRect.bottom
      && controlRect.bottom > elementRect.top;

    return isInViewport && intersects;
  });
}

export default function initFloatingActions() {
  const topButton = document.querySelector('[data-scroll-top]');
  const whatsappLink = document.querySelector('.floating-actions__button--whatsapp');
  if (!topButton) return;

  const readableElements = [...document.querySelectorAll(READING_CONTENT_SELECTOR)];

  const isMobileActionsLayout = () => {
    if (typeof window.matchMedia === 'function') {
      return window.matchMedia(MOBILE_ACTIONS_QUERY).matches;
    }

    return window.innerWidth <= 480;
  };

  const updateControlVisibility = (control, shouldBeAvailable) => {
    if (!control) return;

    control.hidden = !shouldBeAvailable;

    if (shouldBeAvailable && overlapsReadableContent(control, readableElements)) {
      control.hidden = true;
    }
  };

  const updateVisibility = () => {
    const showTopButton = window.scrollY >= TOP_THRESHOLD;

    if (!isMobileActionsLayout()) {
      topButton.hidden = !showTopButton;
      if (whatsappLink) whatsappLink.hidden = false;
      return;
    }

    updateControlVisibility(whatsappLink, true);
    updateControlVisibility(topButton, showTopButton);
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
  window.addEventListener('resize', requestVisibilityUpdate);
  updateVisibility();
}
