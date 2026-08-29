(() => {
  const hero = document.querySelector('[data-system-boot]');
  const stage = hero?.querySelector('.home-core');
  const canvas = hero?.querySelector('.home-signal-field');
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const narrow = window.matchMedia?.('(max-width: 767px)');
  const context = canvas?.getContext('2d');

  if (!hero || !stage || !canvas || !context || !window.IntersectionObserver || !window.ResizeObserver || reduceMotion?.matches || narrow?.matches) return;

  let particles = [];
  let pointer = { x: -9999, y: -9999 };
  let frameId = 0;
  let visible = true;
  let width = 0;
  let height = 0;
  let active = true;
  const desktop = window.matchMedia?.('(min-width: 1200px)').matches;
  const count = desktop ? 32 : 20;
  const maxDistance = desktop ? 152 : 124;
  const pointerRadius = desktop ? 160 : 132;

  const random = (min, max) => min + Math.random() * (max - min);
  const rebuild = () => {
    const rect = canvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    particles = Array.from({ length: count }, () => ({
      x: width * .5 + random(-width * .28, width * .28),
      y: height * .45 + random(-height * .25, height * .28),
      vx: random(-.105, .105),
      vy: random(-.085, .085),
      radius: random(1.05, 1.8)
    }));
  };

  const drawConnections = () => {
    for (let index = 0; index < particles.length; index += 1) {
      const source = particles[index];
      let links = 0;
      for (let candidate = index + 1; candidate < particles.length && links < 3; candidate += 1) {
        const target = particles[candidate];
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.hypot(dx, dy);
        if (distance > maxDistance) continue;
        const alpha = (1 - distance / maxDistance) * .16;
        context.beginPath();
        context.moveTo(source.x, source.y);
        context.lineTo(target.x, target.y);
        context.strokeStyle = `rgba(46, 207, 255, ${alpha})`;
        context.lineWidth = .65;
        context.stroke();
        links += 1;
      }
    }
  };

  const step = () => {
    if (!active) return;
    context.clearRect(0, 0, width, height);
    particles.forEach((particle) => {
      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const distance = Math.hypot(dx, dy);
      if (distance > 0 && distance < pointerRadius) {
        const force = (1 - distance / pointerRadius) * .11;
        particle.vx -= (dx / distance) * force;
        particle.vy -= (dy / distance) * force;
      }

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= .986;
      particle.vy *= .986;

      if (particle.x < width * .16 || particle.x > width * .84) particle.vx *= -1;
      if (particle.y < height * .15 || particle.y > height * .78) particle.vy *= -1;
      particle.x = Math.min(width * .85, Math.max(width * .15, particle.x));
      particle.y = Math.min(height * .8, Math.max(height * .14, particle.y));
    });

    drawConnections();
    particles.forEach((particle) => {
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(46, 207, 255, .56)';
      context.fill();
    });
    frameId = window.requestAnimationFrame(step);
  };

  const updateActivity = () => {
    active = visible && !document.hidden && !reduceMotion?.matches && !narrow?.matches;
    if (active && !frameId) frameId = window.requestAnimationFrame(step);
    if (!active && frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }
  };

  const onPointer = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updateActivity();
  }, { threshold: .04 });
  const resizeObserver = new ResizeObserver(rebuild);
  const onVisibility = () => updateActivity();
  const onMotionChange = () => updateActivity();

  rebuild();
  observer.observe(stage);
  resizeObserver.observe(stage);
  window.addEventListener('pointermove', onPointer, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  reduceMotion?.addEventListener('change', onMotionChange);
  narrow?.addEventListener('change', onMotionChange);
  updateActivity();

  window.addEventListener('pagehide', () => {
    active = false;
    if (frameId) window.cancelAnimationFrame(frameId);
    observer.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener('pointermove', onPointer);
    document.removeEventListener('visibilitychange', onVisibility);
    reduceMotion?.removeEventListener('change', onMotionChange);
    narrow?.removeEventListener('change', onMotionChange);
  }, { once: true });
})();
