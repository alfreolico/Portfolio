function initOrbit() {
  const orbits = [...document.querySelectorAll('[data-orbit]')];
  if (!orbits.length) return;

  const reducedMotion = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };
  const duration = 26000;
  const orbitItems = orbits.map((orbit) => ({
    orbit,
    icons: [...orbit.querySelectorAll('.orbit__icon')],
    isFrontLayer: orbit.classList.contains('orbit--front'),
  }));
  const visual = orbits[0].closest('.hero-visual');
  // The rebooted Home uses these nodes as fixed hardware on its signal rail.
  // Other visual owners retain the orbital lifecycle below.
  if (visual?.classList.contains('boot-visual')) return;
  let dimensions = { x: 138, y: 70, lift: 14 };
  let frameId = 0;

  const measure = () => {
    const styles = getComputedStyle(visual);
    dimensions = {
      x: Number(styles.getPropertyValue('--orbit-radius-x')) || 138,
      y: Number(styles.getPropertyValue('--orbit-radius-y')) || 70,
      lift: Number(styles.getPropertyValue('--orbit-lift')) || 14,
    };
  };

  const render = (time = 0) => {
    const rotation = reducedMotion.matches ? -18 : ((time % duration) / duration) * Math.PI * 2 - Math.PI / 2;
    orbitItems.forEach(({ icons, isFrontLayer }) => {
      const total = icons.length;
      icons.forEach((icon, index) => {
        const angle = rotation + (Math.PI * 2 * index) / total;
        const depth = (Math.sin(angle) + 1) / 2;
        const isFront = Math.sin(angle) >= 0;
        const shouldShow = isFrontLayer ? isFront : !isFront;
        const x = Math.cos(angle) * dimensions.x;
        const y = Math.sin(angle) * dimensions.y + dimensions.lift;
        const z = (depth - .5) * 90;
        const scale = .68 + depth * .38;
        const opacity = isFront ? .78 + depth * .22 : .35 + depth * .42;
        const rotateX = 12 + (1 - depth) * 18;
        const rotateY = (depth - .5) * -34;
        const rotateZ = Math.cos(angle) * 13;
        icon.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
        icon.style.setProperty('--orbit-opacity', opacity.toFixed(2));
        icon.style.zIndex = String(Math.round(depth * 100));
        icon.classList.toggle('is-visible', shouldShow);
      });
    });
  };

  const animate = (time) => {
    render(time);
    frameId = requestAnimationFrame(animate);
  };

  const start = () => {
    if (!document.hidden && !reducedMotion.matches && !frameId) frameId = requestAnimationFrame(animate);
  };
  const stop = () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
  };

  measure();
  render();
  start();
  window.addEventListener('resize', () => { measure(); render(performance.now()); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else { render(performance.now()); start(); }
  });
  reducedMotion.addEventListener?.('change', () => {
    stop();
    render(performance.now());
    start();
  });
}

export default initOrbit;
