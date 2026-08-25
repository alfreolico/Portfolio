(() => {
  const story = document.querySelector('[data-approach-story]');
  if (!story || story.dataset.initialized) return;
  story.dataset.initialized = 'true';

  const pin = story.querySelector('[data-approach-pin]');
  const machine = story.querySelector('[data-approach-machine]');
  const stages = [...story.querySelectorAll('[data-approach-step]')];
  const parts = [...machine.querySelectorAll('[data-machine-part]')];
  const stateLabel = machine.querySelector('[data-machine-state]');
  const stageMarks = [...machine.querySelectorAll('.machine-stage-marks circle')];
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const labels = document.documentElement.lang === 'es'
    ? ['01 / ENTRADA', '02 / CONTROL', '03 / FLUJO', '04 / TRANSMISIÓN', '05 / INSPECCIÓN', '06 / RETORNO']
    : ['01 / INPUT', '02 / CONTROL', '03 / FLOW', '04 / TRANSMISSION', '05 / INSPECTION', '06 / RETURN'];
  let activeStage = -1;
  let media;

  const setTextStage = (index, animate = false) => {
    if (index === activeStage) return;
    const next = stages[index];
    stages.forEach((stage) => stage.classList.remove('is-active'));
    next?.classList.add('is-active');
    stateLabel.textContent = labels[index];
    stageMarks.forEach((mark, markIndex) => mark.classList.toggle('is-active', markIndex <= index));
    if (animate && next) {
      gsap.set(stages, { opacity: 0, y: 12, overwrite: true });
      gsap.to(next, { opacity: 1, y: 0, duration: .22, overwrite: true });
    }
    activeStage = index;
  };

  const showMachineState = (index, animate = false) => {
    parts.forEach((part, partIndex) => {
      const opacity = partIndex <= index ? 1 : .12;
      (animate ? gsap.to : gsap.set)(part, animate ? { opacity, duration: .28, overwrite: true } : { opacity });
    });
    const duration = animate ? .38 : 0;
    gsap.to('[data-valve-rotor]', { rotation: index >= 1 ? 45 : 0, transformOrigin: 'center', duration, overwrite: true });
    gsap.to('[data-gear-a]', { rotation: index >= 3 ? 72 : 0, transformOrigin: 'center', duration, overwrite: true });
    gsap.to('[data-gear-b]', { rotation: index >= 3 ? -96 : 0, transformOrigin: 'center', duration, overwrite: true });
    gsap.to('[data-piston]', { x: index >= 3 ? 24 : 0, duration, overwrite: true });
    gsap.to('[data-flow-path]', { strokeDashoffset: index >= 2 ? 0 : 88, duration, overwrite: true });
    gsap.to('[data-feedback-path]', { strokeDashoffset: index >= 5 ? 0 : 180, duration, overwrite: true });
  };

  if (!gsap || !ScrollTrigger) {
    document.documentElement.classList.add('approach-static');
    parts.forEach((part) => { part.style.opacity = '1'; });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.dataset.approachMotion = 'scrolltrigger';
  media = gsap.matchMedia();
  media.add({ desktop: '(min-width: 900px)', reduced: '(prefers-reduced-motion: reduce)' }, (context) => {
    const { desktop, reduced } = context.conditions;
    activeStage = -1;
    if (reduced) {
      document.documentElement.classList.add('approach-static');
      stages.forEach((stage) => stage.classList.add('is-active'));
      parts.forEach((part) => gsap.set(part, { opacity: 1 }));
      stageMarks.forEach((mark) => mark.classList.add('is-active'));
      stateLabel.textContent = labels.at(-1);
      return () => document.documentElement.classList.remove('approach-static');
    }
    if (desktop) {
      document.documentElement.classList.add('has-approach-scroll');
      setTextStage(0);
      showMachineState(0);
      const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
        .to(parts[1], { opacity: 1, duration: .5 }, 1).to('[data-valve-rotor]', { rotation: 45, transformOrigin: 'center', duration: .5 }, 1)
        .to(parts[2], { opacity: 1, duration: .5 }, 2).fromTo('[data-flow-path]', { strokeDashoffset: 88 }, { strokeDashoffset: 0, duration: .65 }, 2)
        .to(parts[3], { opacity: 1, duration: .5 }, 3).to('[data-gear-a]', { rotation: 72, transformOrigin: 'center', duration: .65 }, 3).to('[data-gear-b]', { rotation: -96, transformOrigin: 'center', duration: .65 }, 3).to('[data-piston]', { x: 24, duration: .6 }, 3)
        .to(parts[4], { opacity: 1, duration: .5 }, 4).to(parts[5], { opacity: 1, duration: .5 }, 5).fromTo('[data-feedback-path]', { strokeDashoffset: 180 }, { strokeDashoffset: 0, duration: .7 }, 5);
      const trigger = ScrollTrigger.create({ trigger: pin, start: 'top 12%', end: () => `+=${Math.max(window.innerHeight * 3.2, 2200)}`, pin, animation: timeline, scrub: .65, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: (self) => setTextStage(Math.min(stages.length - 1, Math.round(self.progress * (stages.length - 1))), true) });
      return () => { trigger.kill(); timeline.kill(); document.documentElement.classList.remove('has-approach-scroll'); stages.forEach((stage) => gsap.set(stage, { clearProps: 'all' })); };
    }
    setTextStage(0); showMachineState(0);
    const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (!visible) return; const index = Number(visible.target.dataset.approachStep); setTextStage(index); showMachineState(index, true); }, { rootMargin: '-32% 0px -45%', threshold: [0, .25, .5, .75] });
    stages.forEach((stage) => observer.observe(stage));
    return () => observer.disconnect();
  });
  window.addEventListener('pagehide', () => media?.revert(), { once: true });
})();
