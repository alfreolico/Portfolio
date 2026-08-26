(() => {
  const story = document.querySelector('[data-approach-story]');
  if (!story || story.dataset.initialized) return;
  story.dataset.initialized = 'true';

  const pin = story.querySelector('[data-approach-pin]');
  const machine = story.querySelector('[data-approach-machine]');
  const svg = machine?.querySelector('svg');
  const stages = [...story.querySelectorAll('[data-approach-step]')];
  const parts = [...machine.querySelectorAll('[data-machine-part]')];
  const stateLabel = machine.querySelector('[data-machine-state]');
  const stageMarks = [...machine.querySelectorAll('.machine-stage-marks circle')];
  const traces = [
    machine.querySelector('[data-machine-part="input"] .machine-flow'),
    machine.querySelector('[data-machine-part="valve"] .machine-link'),
    machine.querySelector('[data-flow-path]'),
    machine.querySelector('[data-machine-part="transmission"] .machine-link'),
    machine.querySelector('[data-machine-part="inspection"] .machine-check'),
    machine.querySelector('[data-feedback-path]')
  ];
  const stageNodes = [
    [machine.querySelector('[data-machine-part="input"] .machine-port')],
    [machine.querySelector('[data-machine-part="valve"] .machine-port')],
    [...machine.querySelectorAll('[data-machine-part="flow"] .machine-node')],
    [machine.querySelector('[data-gear-b] .machine-port')],
    [machine.querySelector('[data-machine-part="inspection"] .machine-port')],
    [machine.querySelector('[data-machine-part="feedback"] .machine-symbol')]
  ];
  const flowPath = machine.querySelector('[data-flow-path]');
  const valvePart = machine.querySelector('[data-machine-part="valve"]');
  const valveRotor = machine.querySelector('[data-valve-rotor]');
  const scopeRoute = machine.querySelector('[data-scope-route]');
  const validationRing = machine.querySelector('[data-validation-ring]');
  const validationNode = machine.querySelector('[data-validation-node]');
  const validationMark = machine.querySelector('[data-validation-mark]');
  const accessGateBar = machine.querySelector('[data-access-gate-bar]');
  const constraintTraces = Object.fromEntries([...machine.querySelectorAll('[data-constraint-trace]')].map((trace) => [trace.dataset.constraintTrace, trace]));
  const downstreamParts = ['transmission', 'inspection', 'feedback'].map((name) => machine.querySelector(`[data-machine-part="${name}"]`)).filter(Boolean);
  const constraintForm = story.querySelector('[data-constraint-valve]');
  const constraintInputs = [...story.querySelectorAll('[data-constraint]')];
  const constraintMessage = story.querySelector('[data-constraint-message]');
  const constraintReset = story.querySelector('[data-constraint-reset]');
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const DrawSVGPlugin = window.DrawSVGPlugin;
  const MotionPathPlugin = window.MotionPathPlugin;
  const labels = document.documentElement.lang === 'es'
    ? ['01 / ENTRADA', '02 / CONTROL', '03 / FLUJO', '04 / TRANSMISIÓN', '05 / INSPECCIÓN', '06 / RETORNO']
    : ['01 / INPUT', '02 / CONTROL', '03 / FLOW', '04 / TRANSMISSION', '05 / INSPECTION', '06 / RETURN'];
  const constraintCopy = document.documentElement.lang === 'es'
    ? {
        clear: 'Con un punto de partida claro, la dirección puede pasar a estructura.',
        scope: 'Sin un alcance definido, la estructura debe mantenerse revisable antes de comprometer una implementación.',
        data: 'Con información por validar, primero hay que confirmar fuentes y límites antes de conectar un flujo.',
        access: 'Con acceso pendiente, una integración no puede confirmarse hasta validar permisos y entorno.',
        multiple: 'El avance queda condicionado por varias decisiones de partida. Antes de avanzar, hay que delimitar el alcance, confirmar fuentes y validar accesos según corresponda.'
      }
    : {
        clear: 'With a clear starting point, the direction can move into structure.',
        scope: 'Without a defined scope, the structure needs to remain reviewable before committing to implementation.',
        data: 'With information still to validate, sources and limits need confirming before a flow can be connected.',
        access: 'With access pending, an integration cannot be confirmed until permissions and environment are validated.',
        multiple: 'Progress is conditioned by several starting decisions. Before moving on, scope, sources and access need clarifying where they apply.'
      };
  let activeStage = -1;
  let media;
  let signal;
  let previousConstraintLevel = 0;

  const getActiveConstraints = () => constraintInputs
    .filter((input) => input.checked)
    .map((input) => input.dataset.constraint);

  const runConstraintPulse = (end) => {
    if (!signal || !MotionPathPlugin || !flowPath || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const start = { path: flowPath, align: flowPath, alignOrigin: [.5, .5], start: 0, end: 0 };
    const finish = { path: flowPath, align: flowPath, alignOrigin: [.5, .5], start: 0, end };
    window.gsap.killTweensOf(signal);
    window.gsap.timeline()
      .set(signal, { opacity: 0, motionPath: start })
      .to(signal, { opacity: 1, duration: .05 })
      .to(signal, { motionPath: finish, duration: .34, ease: 'power1.inOut' })
      .to(signal, { opacity: 0, duration: .08 });
  };

  const applyConstraintState = ({ animate = false, visual = false } = {}) => {
    const activeConstraints = getActiveConstraints();
    const level = activeConstraints.length;
    const scope = activeConstraints.includes('scope');
    const data = activeConstraints.includes('data');
    const access = activeConstraints.includes('access');
    const restoring = previousConstraintLevel > 0 && level === 0;
    story.dataset.constraintLevel = String(level);
    story.dataset.constraintScope = String(scope);
    story.dataset.constraintData = String(data);
    story.dataset.constraintAccess = String(access);
    if (constraintMessage) {
      constraintMessage.textContent = level === 0
        ? constraintCopy.clear
        : level === 1
          ? constraintCopy[activeConstraints[0]]
          : constraintCopy.multiple;
    }
    if (constraintReset) constraintReset.disabled = level === 0;
    if (!visual || !gsap) {
      previousConstraintLevel = level;
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const method = animate && !reduced ? gsap.to : gsap.set;
    const duration = animate && !reduced ? .34 : 0;
    const flowEnd = data ? .67 : access ? .94 : 1;
    const flowDraw = data ? '0 67%' : access ? '0 94%' : '100%';
    const downstreamOpacity = data || access ? .24 : scope ? .7 : 1;
    method(valveRotor, { rotation: scope ? 14 : 45, transformOrigin: 'center', duration, overwrite: true });
    method(valvePart, { opacity: 1, duration, overwrite: true });
    method(accessGateBar, { y: access ? 30 : 0, duration, ease: 'power3.inOut', overwrite: true });
    method(validationRing, { opacity: data ? 1 : .28, scale: data ? 1.2 : 1, transformOrigin: '50% 50%', duration, overwrite: true });
    method(validationNode, { scale: data ? 1.45 : 1, transformOrigin: '50% 50%', duration, overwrite: true });
    method(validationMark, { opacity: data ? 1 : 0, duration, overwrite: true });
    downstreamParts.forEach((part) => method(part, { opacity: downstreamOpacity, duration, overwrite: true }));
    if (DrawSVGPlugin) {
      method(flowPath, { drawSVG: flowDraw, duration, overwrite: true });
      method(scopeRoute, { drawSVG: scope ? '100%' : '0%', opacity: scope ? 1 : 0, duration, overwrite: true });
      Object.entries(constraintTraces).forEach(([name, trace]) => method(trace, { drawSVG: activeConstraints.includes(name) ? '100%' : '0%', duration: animate && !reduced ? .24 : 0, overwrite: true }));
    }
    if (restoring && animate && !reduced) {
      gsap.timeline()
        .to(accessGateBar, { y: 0, duration: .2, ease: 'power3.out', overwrite: true }, 0)
        .to(valveRotor, { rotation: 45, transformOrigin: 'center', duration: .25, ease: 'power3.out', overwrite: true }, 0)
        .fromTo(flowPath, { drawSVG: '0%' }, { drawSVG: '100%', duration: .42, ease: 'power2.out', overwrite: true }, .08)
        .to([...stageNodes[2], ...stageNodes[3], ...stageNodes[4]].filter(Boolean), { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: .18, stagger: .07, overwrite: true }, .28);
      runConstraintPulse(1);
    } else if (animate && !reduced && data) {
      gsap.fromTo(validationNode, { scale: 1 }, { scale: 1.62, duration: .13, yoyo: true, repeat: 1, transformOrigin: '50% 50%', overwrite: true });
      runConstraintPulse(flowEnd);
    } else if (animate && !reduced && access) {
      runConstraintPulse(flowEnd);
    }
    if (animate && !reduced && level === 3 && previousConstraintLevel < 3) {
      gsap.fromTo(machine, { y: -1.5 }, { y: 0, duration: .16, ease: 'power2.out', overwrite: true });
    }
    previousConstraintLevel = level;
  };

  if (constraintForm) {
    constraintForm.addEventListener('change', () => applyConstraintState({ animate: true, visual: true }));
    constraintReset?.addEventListener('click', () => {
      constraintInputs.forEach((input) => { input.checked = false; });
      applyConstraintState({ animate: true, visual: true });
    });
    applyConstraintState();
    constraintForm.classList.add('is-ready');
  }

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
    if (index === 1) applyConstraintState({ animate, visual: true });
  };

  const setMachineState = (index, animate = false) => {
    parts.forEach((part, partIndex) => {
      const opacity = partIndex <= index ? 1 : .12;
      (animate ? gsap.to : gsap.set)(part, animate ? { opacity, duration: .28, overwrite: true } : { opacity });
    });
    traces.forEach((trace, traceIndex) => {
      const drawSVG = traceIndex <= index ? '100%' : '0%';
      (animate ? gsap.to : gsap.set)(trace, animate ? { drawSVG, duration: .3, overwrite: true } : { drawSVG });
    });
    stageNodes.forEach((nodes, nodeIndex) => nodes.filter(Boolean).forEach((node) => {
      const active = nodeIndex <= index;
      (animate ? gsap.to : gsap.set)(node, animate
        ? { opacity: active ? 1 : .35, scale: active ? 1 : .68, transformOrigin: '50% 50%', duration: .24, overwrite: true }
        : { opacity: active ? 1 : .35, scale: active ? 1 : .68, transformOrigin: '50% 50%' });
    }));
    const duration = animate ? .38 : 0;
    gsap.to('[data-valve-rotor]', { rotation: index >= 1 ? 45 : 0, transformOrigin: 'center', duration, overwrite: true });
    gsap.to('[data-gear-a]', { rotation: index >= 3 ? 72 : 0, transformOrigin: 'center', duration, overwrite: true });
    gsap.to('[data-gear-b]', { rotation: index >= 3 ? -96 : 0, transformOrigin: 'center', duration, overwrite: true });
    gsap.to('[data-piston]', { x: index >= 3 ? 24 : 0, duration, overwrite: true });
  };

  if (!gsap || !ScrollTrigger || !DrawSVGPlugin) {
    document.documentElement.classList.add('approach-static');
    parts.forEach((part) => { part.style.opacity = '1'; });
    return;
  }

  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
  if (MotionPathPlugin && flowPath && svg) {
    gsap.registerPlugin(MotionPathPlugin);
    signal = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    signal.classList.add('machine-signal');
    signal.setAttribute('r', '5');
    signal.setAttribute('opacity', '0');
    svg.append(signal);
  }

  document.documentElement.dataset.approachMotion = 'scrolltrigger';
  media = gsap.matchMedia();
  media.add({ desktop: '(min-width: 900px)', reduced: '(prefers-reduced-motion: reduce)' }, (context) => {
    const { desktop, reduced } = context.conditions;
    activeStage = -1;
    if (reduced) {
      document.documentElement.classList.add('approach-static');
      stages.forEach((stage) => stage.classList.add('is-active'));
      parts.forEach((part) => gsap.set(part, { opacity: 1 }));
      traces.forEach((trace) => gsap.set(trace, { drawSVG: '100%' }));
      stageNodes.flat().filter(Boolean).forEach((node) => gsap.set(node, { opacity: 1, scale: 1 }));
      stageMarks.forEach((mark) => mark.classList.add('is-active'));
      stateLabel.textContent = labels.at(-1);
      return () => document.documentElement.classList.remove('approach-static');
    }
    if (desktop) {
      document.documentElement.classList.add('has-approach-scroll');
      setTextStage(0);
      setMachineState(0);
      const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
        .to(parts[1], { opacity: 1, duration: .5 }, 1).fromTo(traces[1], { drawSVG: '0%' }, { drawSVG: '100%', duration: .5 }, 1).to(stageNodes[1], { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: .3 }, 1.16)
        .to(parts[2], { opacity: 1, duration: .5 }, 2).fromTo(traces[2], { drawSVG: '0%' }, { drawSVG: '100%', duration: .65 }, 2).to(stageNodes[2], { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: .3 }, 2.26)
        .to(parts[3], { opacity: 1, duration: .5 }, 3).fromTo(traces[3], { drawSVG: '0%' }, { drawSVG: '100%', duration: .5 }, 3).to(stageNodes[3], { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: .3 }, 3.2).to('[data-gear-a]', { rotation: 72, transformOrigin: 'center', duration: .65 }, 3).to('[data-gear-b]', { rotation: -96, transformOrigin: 'center', duration: .65 }, 3).to('[data-piston]', { x: 24, duration: .6 }, 3)
        .to(parts[4], { opacity: 1, duration: .5 }, 4).fromTo(traces[4], { drawSVG: '0%' }, { drawSVG: '100%', duration: .45 }, 4).to(stageNodes[4], { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: .3 }, 4.18)
        .to(parts[5], { opacity: 1, duration: .5 }, 5).fromTo(traces[5], { drawSVG: '0%' }, { drawSVG: '100%', duration: .7 }, 5).to(stageNodes[5], { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: .3 }, 5.25);

      if (signal) {
        const motionStart = { path: flowPath, align: flowPath, alignOrigin: [.5, .5], start: 0, end: 0 };
        const motionEnd = { path: flowPath, align: flowPath, alignOrigin: [.5, .5], start: 0, end: 1 };
        timeline
          .set(signal, { opacity: 0, motionPath: motionStart }, 2)
          .to(signal, { opacity: 1, duration: .08 }, 2)
          .to(signal, { motionPath: motionEnd, duration: .58, ease: 'none' }, 2)
          .to(signal, { opacity: 0, duration: .08 }, 2.58);
      }

      const trigger = ScrollTrigger.create({ trigger: pin, start: 'top 12%', end: () => `+=${Math.max(window.innerHeight * 3.2, 2200)}`, pin, animation: timeline, scrub: .65, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: (self) => setTextStage(Math.min(stages.length - 1, Math.round(self.progress * (stages.length - 1))), true) });
      return () => {
        trigger.kill();
        timeline.kill();
        if (signal) gsap.set(signal, { opacity: 0, clearProps: 'transform' });
        document.documentElement.classList.remove('has-approach-scroll');
        stages.forEach((stage) => gsap.set(stage, { clearProps: 'all' }));
      };
    }
    setTextStage(0);
    setMachineState(0);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number(visible.target.dataset.approachStep);
      setTextStage(index);
      setMachineState(index, true);
    }, { rootMargin: '-32% 0px -45%', threshold: [0, .25, .5, .75] });
    stages.forEach((stage) => observer.observe(stage));
    return () => {
      observer.disconnect();
      if (signal) gsap.set(signal, { opacity: 0, clearProps: 'transform' });
    };
  });
  window.addEventListener('pagehide', () => media?.revert(), { once: true });
})();
