import initNavigation from './components/navigation.js';
import initTheme from './components/theme.js';
import initOrbit from './components/orbit.js';
import initContactForm from './components/contact-form.js';
import initFloatingActions from './components/floating-actions.js';
import updateCopyRightYear from './helpers/date_updater.js';

function safelyInit(name, initializer) {
  try {
    initializer();
  } catch {
    console.error(`[portfolio] ${name} failed to initialize.`);
  }
}

[
  ['navigation', initNavigation],
  ['theme', initTheme],
  ['orbit', initOrbit],
  ['contact form', initContactForm],
  ['floating actions', initFloatingActions],
  ['footer year', updateCopyRightYear],
].forEach(([name, initializer]) => safelyInit(name, initializer));
