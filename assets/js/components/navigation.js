function initNavigation() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-site-menu]');
  if (!toggle || !menu) return;
  const desktopMedia = typeof window.matchMedia === 'function'
    ? window.matchMedia('(min-width: 900px)')
    : null;
  const languageLink = menu.querySelector('.site-menu__language');

  if (languageLink) {
    languageLink.setAttribute(
      'aria-label',
      document.documentElement.lang === 'en' ? 'Cambiar al sitio en español' : 'Switch to the English site'
    );
  }

  const closeMenu = ({ returnFocus = false } = {}) => {
    menu.dataset.open = 'false';
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.dataset.open === 'true';
    menu.dataset.open = String(!isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    if (!isOpen) menu.querySelector('a')?.focus();
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.dataset.open === 'true') closeMenu({ returnFocus: true });
  });

  const syncViewport = () => {
    if (desktopMedia?.matches) closeMenu();
  };

  desktopMedia?.addEventListener?.('change', syncViewport);
  window.addEventListener('resize', syncViewport);
}

export default initNavigation;
