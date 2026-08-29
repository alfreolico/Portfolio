(() => {
  const hero = document.querySelector('[data-system-boot]');
  if (!hero) return;

  const header = document.querySelector('.site-header');
  const updateHeaderSurface = () => header?.toggleAttribute('data-home-scrolled', window.scrollY > 48);
  if (header) {
    updateHeaderSurface();
    window.addEventListener('scroll', updateHeaderSurface, { passive: true });
    window.addEventListener('pagehide', () => window.removeEventListener('scroll', updateHeaderSurface), { once: true });
  }

  const gsap = window.gsap;
  const SplitText = window.SplitText;
  const ScrambleTextPlugin = window.ScrambleTextPlugin;
  const DrawSVGPlugin = window.DrawSVGPlugin;
  const MotionPathPlugin = window.MotionPathPlugin;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia?.('(max-width: 767px)').matches;
  const storageKey = 'portfolioBootV22Played';
  const core = hero.querySelector('.home-core');
  const visual = hero.querySelector('.boot-visual');
  const instrument = hero.querySelector('.boot-instrument');
  const rail = visual?.querySelector('.boot-rail');
  const coreNode = visual?.querySelector('.boot-core-node');
  const actions = hero.querySelector('.boot-actions');
  const terminals = [...hero.querySelectorAll('.boot-terminal')];
  const signal = instrument?.querySelector('[data-boot-signal]');
  const signalPath = instrument?.querySelector('[data-boot-trace="primary"]');
  const routePaths = {
    process: instrument?.querySelector('[data-boot-trace="terminal-process"]'),
    evidence: instrument?.querySelector('[data-boot-trace="terminal-evidence"]')
  };
  const routeSignals = {
    process: instrument?.querySelector('[data-boot-route-signal="process"]'),
    evidence: instrument?.querySelector('[data-boot-route-signal="evidence"]')
  };
  let timeline;
  let split;
  let routeAttract;
  let routeAttractStart;
  let routeAttractResume;
  const cleanup = [];

  const addListener = (target, type, listener, options) => {
    target?.addEventListener(type, listener, options);
    cleanup.push(() => target?.removeEventListener(type, listener, options));
  };

  const installRouteFeedback = () => {
    if (!gsap || !MotionPathPlugin || reducedMotion || !core || !instrument) return;
    gsap.registerPlugin(MotionPathPlugin);

    const clearAttractState = () => {
      core.removeAttribute('data-attract-route');
    };

    const pauseAttract = () => {
      routeAttractStart?.kill();
      routeAttractStart = null;
      routeAttractResume?.kill();
      routeAttractResume = null;
      clearAttractState();
      routeAttract?.pause(0);
      hero.dataset.routeAttractPaused = 'true';
    };

    const reset = () => {
      core.removeAttribute('data-active-route');
      Object.values(routeSignals).forEach((routeSignal) => gsap.killTweensOf(routeSignal));
      gsap.to(Object.values(routePaths).filter(Boolean), { opacity: 1, strokeWidth: 2.7, duration: .16, overwrite: true });
    };

    const activate = (route) => {
      const activePath = routePaths[route];
      const inactivePath = routePaths[route === 'process' ? 'evidence' : 'process'];
      const routeSignal = routeSignals[route];
      if (!activePath) return;

      pauseAttract();
      core.dataset.activeRoute = route;
      gsap.killTweensOf([activePath, inactivePath, routeSignal]);
      gsap.killTweensOf(coreNode);
      gsap.to(activePath, { opacity: 1, strokeWidth: 3.5, duration: .14, overwrite: true });
      if (inactivePath) gsap.to(inactivePath, { opacity: .26, strokeWidth: 1.4, duration: .14, overwrite: true });
      if (coreNode) gsap.fromTo(coreNode, { scale: 1 }, { scale: 1.1, duration: .09, repeat: 1, yoyo: true, ease: 'power1.inOut', overwrite: true });

      if (routeSignal) {
        const motionStart = { path: activePath, align: activePath, alignOrigin: [.5, .5], start: 0, end: 0 };
        const motionEnd = { path: activePath, align: activePath, alignOrigin: [.5, .5], start: 0, end: 1 };
        gsap.set(routeSignal, { opacity: 0, motionPath: motionStart });
        gsap.timeline()
          .to(routeSignal, { opacity: 1, duration: .04 })
          .to(routeSignal, { motionPath: motionEnd, duration: .42, ease: 'none' })
          .to(routeSignal, { opacity: 0, duration: .08 })
          .set(routeSignal, { clearProps: 'transform' });
      }
    };

    const attractPulse = (route) => {
      const path = routePaths[route];
      const routeSignal = routeSignals[route];
      if (!path || !routeSignal || document.hidden || core.dataset.activeRoute) return;
      gsap.killTweensOf([routeSignal, path, coreNode].filter(Boolean));
      const attract = gsap.timeline();
      attract
        .call(() => { core.dataset.attractRoute = route; }, null, 0)
        .fromTo(path, { opacity: .48, strokeWidth: 2.2 }, { opacity: 1, strokeWidth: 3.35, duration: .15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0)
        .set(routeSignal, { opacity: 0, motionPath: { path, align: path, alignOrigin: [.5, .5], start: 0, end: 0 } }, 0)
        .to(routeSignal, { opacity: .9, duration: .05 })
        .to(routeSignal, { motionPath: { path, align: path, alignOrigin: [.5, .5], end: 1 }, duration: .42, ease: 'none' })
        .to(routeSignal, { opacity: 0, duration: .1 })
        .set(routeSignal, { clearProps: 'transform' })
        .to(path, { opacity: .72, strokeWidth: 2.7, duration: .14 }, 0.54)
        .call(clearAttractState, null, .68);
      if (coreNode) attract.fromTo(coreNode, { scale: 1 }, { scale: 1.055, duration: .11, yoyo: true, repeat: 1, ease: 'sine.inOut', overwrite: true }, 0);
    };

    const buildAttract = () => {
      if (routeAttract || mobile) return;
      routeAttract = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 4.45 })
        .call(() => attractPulse('process'), null, 0)
        .call(() => attractPulse('evidence'), null, .96);
    };

    const startAttract = () => {
      if (routeAttractStart || routeAttract || document.hidden) return;
      buildAttract();
      routeAttractStart = gsap.delayedCall(1.35, () => {
        routeAttractStart = null;
        if (!document.hidden && !core.dataset.activeRoute) {
          hero.dataset.routeAttract = 'true';
          delete hero.dataset.routeAttractPaused;
          if (mobile) return;
          routeAttract?.play(0);
        }
      });
    };

    const resumeAttract = () => {
      if (reducedMotion || document.hidden) return;
      routeAttractResume?.kill();
      routeAttractResume = gsap.delayedCall(1.25, () => {
        routeAttractResume = null;
        if (core.dataset.activeRoute || document.hidden) return;
        delete hero.dataset.routeAttractPaused;
        hero.dataset.routeAttract = 'true';
        if (mobile) return;
        buildAttract();
        routeAttract?.restart(true);
      });
    };

    terminals.forEach((terminal) => {
      const route = terminal.classList.contains('boot-terminal--process') ? 'process' : 'evidence';
      addListener(terminal, 'pointerenter', () => activate(route));
      addListener(terminal, 'focusin', () => activate(route));
      addListener(terminal, 'pointerleave', () => {
        if (!terminal.matches(':focus')) {
          reset();
          resumeAttract();
        }
      });
      addListener(terminal, 'focusout', () => window.requestAnimationFrame(() => {
        if (!actions?.contains(document.activeElement)) {
          reset();
          resumeAttract();
        }
      }));
      addListener(terminal, 'click', (event) => {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        pauseAttract();
        activate(route);
        terminal.dataset.routeLocked = 'true';
        gsap.delayedCall(.13, () => {
          delete terminal.dataset.routeLocked;
          window.location.assign(terminal.href);
        });
      });
    });

    addListener(document, 'visibilitychange', () => {
      if (document.hidden) {
        routeAttractStart?.pause();
        routeAttractResume?.pause();
        routeAttract?.pause();
        hero.dataset.routeAttractPaused = 'true';
      } else if (!core.dataset.activeRoute) {
        routeAttractStart?.resume();
        routeAttractResume?.resume();
        if (routeAttract && !routeAttractStart && !routeAttractResume) {
          delete hero.dataset.routeAttractPaused;
          routeAttract.resume();
        }
      }
    });
    return { startAttract };
  };

  const routeFeedback = installRouteFeedback();

  if (!gsap || !SplitText || !ScrambleTextPlugin || !DrawSVGPlugin || !MotionPathPlugin || reducedMotion || !instrument || !rail || !actions) return;

  const traces = [...instrument.querySelectorAll('[data-boot-trace]')];
  const railTraces = traces.filter((trace) => ['rail-upper', 'rail-lower'].includes(trace.dataset.bootTrace));
  const arcTraces = traces.filter((trace) => ['core-left', 'core-right', 'core-return', 'ticks'].includes(trace.dataset.bootTrace));
  const terminalTraces = traces.filter((trace) => trace.dataset.bootTrace.startsWith('terminal-'));
  const photo = hero.querySelector('.boot-photo-frame');
  const title = hero.querySelector('.boot-title');
  const reference = hero.querySelector('.boot-reference');
  const descriptor = hero.querySelector('.boot-descriptor');
  const lead = hero.querySelector('.boot-lead');
  const links = hero.querySelector('.boot-links');
  const iconsLeft = [...hero.querySelectorAll('.boot-tech-group--left .boot-tech-node')];
  const iconsRight = [...hero.querySelectorAll('.boot-tech-group--right .boot-tech-node')];
  let fullBoot = true;

  try {
    fullBoot = window.sessionStorage.getItem(storageKey) !== 'true';
  } catch {
    fullBoot = true;
  }

  try {
    gsap.registerPlugin(SplitText, ScrambleTextPlugin, DrawSVGPlugin, MotionPathPlugin);
    hero.classList.add('boot-enhanced');
    split = SplitText.create(title, { type: 'words,chars', mask: 'words', aria: 'auto', autoSplit: true });
    const titleChars = split.chars;
    const [alfredoWord, brambilaWord] = title.querySelectorAll('.boot-title__word');
    const alfredoChars = titleChars.filter((char) => alfredoWord?.contains(char));
    const brambilaChars = titleChars.filter((char) => brambilaWord?.contains(char));
    const referenceText = reference.textContent.trim();
    const drawRail = mobile ? railTraces : railTraces;

    reference.setAttribute('aria-label', referenceText);
    gsap.set(titleChars, { yPercent: 108, autoAlpha: 0 });
    timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

    if (fullBoot) {
      timeline
        .to(instrument, { opacity: 1, duration: .12 }, 0)
        .to(rail, { opacity: 1, duration: .18 }, .06)
        .from(drawRail, { drawSVG: '50% 50%', duration: mobile ? .28 : .42, stagger: .045, ease: 'power2.out' }, .06)
        .to(reference, { opacity: 1, duration: .01 }, .16)
        .to(reference, { duration: mobile ? .34 : .42, scrambleText: { text: referenceText, chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+_/-', revealDelay: .03, speed: .22 }, ease: 'none' }, .16)
        .to(alfredoChars, { yPercent: 0, autoAlpha: 1, duration: mobile ? .34 : .42, stagger: mobile ? .014 : .018, ease: 'power4.out' }, .28)
        .to(brambilaChars, { yPercent: 0, autoAlpha: 1, duration: mobile ? .3 : .36, stagger: mobile ? .012 : .016, ease: 'power4.out' }, .42)
        .from(arcTraces, { drawSVG: '0%', duration: mobile ? .24 : .34, stagger: .035, ease: 'power2.out' }, .52)
        .to(photo, { clipPath: 'inset(0 0% 0 0%)', duration: mobile ? .32 : .42, ease: 'power2.inOut' }, .62)
        .fromTo(iconsLeft, { xPercent: -38, scale: .72, opacity: 0 }, { xPercent: 0, scale: 1, opacity: 1, duration: mobile ? .18 : .27, stagger: .055, ease: 'back.out(1.3)' }, .78)
        .fromTo(iconsRight, { xPercent: 38, scale: .72, opacity: 0 }, { xPercent: 0, scale: 1, opacity: 1, duration: mobile ? .18 : .27, stagger: .055, ease: 'back.out(1.3)' }, .78)
        .fromTo(coreNode, { scale: .64, opacity: .35 }, { scale: 1, opacity: 1, duration: .22, ease: 'back.out(1.45)' }, 1.12)
        .from(terminalTraces, { drawSVG: '0%', duration: .2, stagger: .025, ease: 'power2.out' }, 1.4)
        .to(actions, { opacity: 1, y: 0, duration: .18 }, 1.48)
        .to(descriptor, { opacity: 1, y: 0, duration: .16 }, 1.58)
        .to(lead, { opacity: 1, y: 0, duration: .18 }, 1.64)
        .to(links, { opacity: 1, y: 0, duration: .14 }, 1.66);

      if (!mobile && signal && signalPath) {
        const motionStart = { path: signalPath, align: signalPath, alignOrigin: [.5, .5], start: 0, end: 0 };
        const motionEnd = { path: signalPath, align: signalPath, alignOrigin: [.5, .5], start: 0, end: 1 };
        timeline
          .set(signal, { opacity: 0, motionPath: motionStart }, 1.16)
          .to(signal, { opacity: 1, duration: .05 }, 1.18)
          .to(signal, { motionPath: motionEnd, duration: .3, ease: 'none' }, 1.18)
          .to(coreNode, { scale: 1.035, filter: 'brightness(1.35)', duration: .08, ease: 'power1.out' }, 1.31)
          .to(coreNode, { scale: 1, filter: 'brightness(1)', duration: .12, ease: 'power1.inOut' }, 1.39)
          .to(signal, { opacity: 0, duration: .07 }, 1.48)
          .set(signal, { clearProps: 'transform' }, 1.57);
      }
    } else {
      timeline
        .to(instrument, { opacity: 1, duration: .1 }, 0)
        .to(rail, { opacity: 1, duration: .1 }, 0)
        .to(reference, { opacity: 1, duration: .1 }, .04)
        .to(alfredoChars, { yPercent: 0, autoAlpha: 1, duration: .22, stagger: .01, ease: 'power4.out' }, .05)
        .to(brambilaChars, { yPercent: 0, autoAlpha: 1, duration: .2, stagger: .009, ease: 'power4.out' }, .13)
        .to(photo, { clipPath: 'inset(0 0% 0 0%)', duration: .22, ease: 'power2.inOut' }, .12)
        .fromTo(iconsLeft, { xPercent: -22, scale: .84, opacity: 0 }, { xPercent: 0, scale: 1, opacity: 1, duration: .16, stagger: .018, ease: 'back.out(1.2)' }, .22)
        .fromTo(iconsRight, { xPercent: 22, scale: .84, opacity: 0 }, { xPercent: 0, scale: 1, opacity: 1, duration: .16, stagger: .018, ease: 'back.out(1.2)' }, .22)
        .to(actions, { opacity: 1, y: 0, duration: .13 }, .43)
        .to([descriptor, lead, links], { opacity: 1, y: 0, duration: .12, stagger: .05 }, .5);
    }

    timeline.eventCallback('onComplete', () => {
      hero.classList.remove('boot-enhanced');
      split?.revert();
      routeFeedback?.startAttract();
    });

    try {
      window.sessionStorage.setItem(storageKey, 'true');
    } catch {
      // A blocked storage API simply gives the visitor the safe full boot again.
    }
  } catch {
    split?.revert();
    hero.classList.remove('boot-enhanced');
  }

  addListener(window, 'pagehide', () => {
    timeline?.kill();
    routeAttract?.kill();
    routeAttractStart?.kill();
    routeAttractResume?.kill();
    split?.revert();
    hero.classList.remove('boot-enhanced');
    cleanup.splice(0).forEach((dispose) => dispose());
  }, { once: true });
})();
