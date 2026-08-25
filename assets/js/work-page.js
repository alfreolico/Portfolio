(() => {
  const transfer = document.querySelector('[data-work-transfer]');
  if (!transfer) return;

  const carriage = transfer.querySelector('.work-carriage');
  const stage = transfer.querySelector('[data-work-stage]');
  const bus = transfer.querySelector('.work-transfer__bus');
  const inputs = [...carriage.querySelectorAll('input[name="work-mode"]')];
  const status = carriage.querySelector('.work-carriage__status');
  const views = Object.fromEntries([...stage.querySelectorAll('[data-work-view]')].map((view) => [view.dataset.workView, view]));
  const supportsMotion = Boolean(window.gsap && window.Flip);
  const reduceMotion = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCompactLayout = () => typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 600px)').matches;
  const labels = document.documentElement.lang === 'es'
    ? { projects: 'Configuración activa · proyectos', services: 'Configuración activa · servicios' }
    : { projects: 'Active configuration · projects', services: 'Active configuration · services' };
  let active = inputs.find((input) => input.checked)?.value || 'projects';
  let signalTimer;

  transfer.dataset.motion = supportsMotion ? 'flip' : 'native';
  if (supportsMotion) window.gsap.registerPlugin(window.Flip);

  const cardsFor = (mode) => [...views[mode].querySelectorAll('[data-work-pair]')];
  const setStageHeight = (mode) => {
    stage.style.height = `${views[mode].scrollHeight}px`;
  };
  const setSemanticState = (mode, announce = true) => {
    carriage.dataset.mode = mode;
    stage.dataset.mode = mode;
    if (announce) status.textContent = labels[mode];
    Object.entries(views).forEach(([name, view]) => view.setAttribute('aria-hidden', String(name !== mode)));
  };
  const signal = () => {
    carriage.classList.remove('is-transferring');
    transfer.classList.remove('is-transferring');
    void carriage.offsetWidth;
    carriage.classList.add('is-transferring');
    bus?.offsetWidth;
    transfer.classList.add('is-transferring');
    window.clearTimeout(signalTimer);
    signalTimer = window.setTimeout(() => {
      carriage.classList.remove('is-transferring');
      transfer.classList.remove('is-transferring');
    }, 520);
  };
  const dock = (cards) => {
    cards.forEach((card) => card.classList.add('work-card--docked'));
    window.setTimeout(() => cards.forEach((card) => card.classList.remove('work-card--docked')), 220);
  };
  const switchMode = (mode, animate = true) => {
    if (!views[mode] || mode === active) {
      setSemanticState(mode);
      setStageHeight(mode);
      return;
    }
    const previous = cardsFor(active);
    const next = cardsFor(mode);
    const canFlip = animate && supportsMotion && !reduceMotion && !isCompactLayout();
    next.forEach((card) => card.removeAttribute('data-flip-id'));
    const state = canFlip ? window.Flip.getState(previous) : null;
    previous.forEach((card) => card.removeAttribute('data-flip-id'));
    next.forEach((card) => { card.dataset.flipId = card.dataset.workPair; });
    active = mode;
    setSemanticState(mode, !canFlip);
    setStageHeight(mode);
    if (!canFlip) {
      previous.forEach((card) => { card.dataset.flipId = card.dataset.workPair; });
      return;
    }
    signal();
    window.Flip.from(state, {
      absolute: true,
      duration: 0.48,
      ease: 'power3.out',
      nested: true,
      onEnter: (elements) => window.gsap.fromTo(elements, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.16 }),
      onComplete: () => {
        previous.forEach((card) => { card.dataset.flipId = card.dataset.workPair; });
        status.textContent = labels[mode];
        dock(next);
      }
    });
  };

  Object.values(views).forEach((view) => cardsFor(view.dataset.workView).forEach((card) => { card.dataset.flipId = card.dataset.workPair; }));
  const hashMode = ['#servicios', '#services'].includes(window.location.hash)
    ? 'services'
    : ['#proyectos', '#projects'].includes(window.location.hash)
      ? 'projects'
      : active;
  inputs.forEach((input) => { input.checked = input.value === hashMode; });
  active = hashMode;
  setSemanticState(active);
  requestAnimationFrame(() => setStageHeight(active));

  inputs.forEach((input, index) => {
    input.addEventListener('change', () => input.checked && switchMode(input.value));
    input.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const offset = event.key === 'ArrowRight' ? 1 : -1;
      const next = inputs[(index + offset + inputs.length) % inputs.length];
      next.checked = true;
      next.focus();
      switchMode(next.value);
    });
  });
  window.addEventListener('resize', () => setStageHeight(active), { passive: true });
})();
