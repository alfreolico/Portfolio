function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  } catch {
    // The site remains usable when storage is unavailable.
  }
  const prefersLight = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}

function initTheme() {
  const button = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  const labels = root.lang === 'en'
    ? { light: 'Switch to light theme', dark: 'Switch to dark theme' }
    : { light: 'Cambiar a tema claro', dark: 'Cambiar a tema oscuro' };
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    button?.setAttribute('aria-pressed', String(theme === 'dark'));
    button?.setAttribute('aria-label', theme === 'dark' ? labels.light : labels.dark);
  };
  applyTheme(getInitialTheme());
  if (!button) return;
  button.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try { localStorage.setItem('portfolio-theme', nextTheme); } catch { /* no persistence available */ }
  });
}

export default initTheme;
