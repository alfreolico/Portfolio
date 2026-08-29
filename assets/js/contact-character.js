(() => {
  const character = document.querySelector('[data-contact-character]');
  const svg = character?.querySelector('[data-contact-character-svg]');
  if (!character || !svg) return;

  const email = document.querySelector('[data-character-action="email"]');
  const whatsapp = document.querySelector('[data-character-action="whatsapp"]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let cleanup = [];

  const init = () => {
    const body = svg.querySelector('#character-body');
    const clothing = svg.querySelector('#character-clothing');
    const head = svg.querySelector('#character-head');
    const eyes = svg.querySelector('#character-eyes');
    const arm = svg.querySelector('#character-arm');
    const hand = svg.querySelector('#character-hand');
    const bodyTargets = [body, clothing].filter(Boolean);
    const accents = [...svg.querySelectorAll('.character-accent')];
    const allLines = [...svg.querySelectorAll('.character-line,.character-soft')];
    const gsap = window.gsap;
    const DrawSVGPlugin = window.DrawSVGPlugin;

    const STATES = Object.freeze({
      IDLE: 'idle',
      GREETING: 'greeting',
      EMAIL: 'email',
      WHATSAPP: 'whatsapp',
      EASTER_EGG: 'easter-egg'
    });

    let state = STATES.IDLE;
    let bodyIdle = null;
    let headCall = null;
    let headIdleMotion = null;
    let blinkCall = null;
    let response = null;
    let intro = null;
    let greetingCall = null;
    let easterEggLockedUntil = 0;
    const mobileScale = innerWidth < 768 ? .74 : 1;
    const m = (value) => value * mobileScale;

    if (!gsap || !DrawSVGPlugin || reduced.matches) {
      character.dataset.characterReady = 'true';
      const contrastOnly = (nextState) => {
        character.dataset.characterState = nextState || '';
        accents.forEach((line) => { line.style.strokeWidth = nextState ? '2.45' : '2'; });
      };
      const bindContrast = (link, mode) => {
        if (!link) return;
        const enter = () => contrastOnly(mode);
        const leave = () => contrastOnly('');
        link.addEventListener('focus', enter);
        link.addEventListener('blur', leave);
        link.addEventListener('pointerenter', enter);
        link.addEventListener('pointerleave', leave);
        cleanup.push(() => {
          link.removeEventListener('focus', enter);
          link.removeEventListener('blur', leave);
          link.removeEventListener('pointerenter', enter);
          link.removeEventListener('pointerleave', leave);
        });
      };
      bindContrast(email, STATES.EMAIL);
      bindContrast(whatsapp, STATES.WHATSAPP);
      cleanup.push(() => delete character.dataset.characterState);
      return;
    }

    gsap.registerPlugin(DrawSVGPlugin);
    gsap.set(bodyTargets, { svgOrigin: '137 168', transformOrigin: '50% 50%' });
    gsap.set(head, { svgOrigin: '137 118', transformOrigin: '50% 50%' });
    gsap.set(eyes, { svgOrigin: '150 100', transformOrigin: '50% 50%' });
    gsap.set(arm, { svgOrigin: '286 190', transformOrigin: '50% 50%' });
    gsap.set(hand, { svgOrigin: '304 164', transformOrigin: '50% 50%' });

    const stageLines = (selector) => [...svg.querySelectorAll(selector)]
      .filter((line) => !line.classList.contains('character-accent'));
    const bodyLines = stageLines('#character-body > .character-line, #character-body > .character-soft');
    const headLines = stageLines('#character-hair .character-line');
    const faceLines = stageLines('#character-face .character-line');
    const clothingLines = stageLines('#character-clothing > .character-line');
    const armLines = stageLines('#character-arm > .character-line');
    const handLines = stageLines('#character-hand .character-line');
    const detailLines = stageLines('#character-eyes .character-line');

    const setState = (nextState) => {
      state = nextState;
      character.dataset.characterState = nextState;
    };

    const killSchedule = (scheduleName) => {
      if (scheduleName === 'head') {
        headCall?.kill();
        headCall = null;
      } else {
        blinkCall?.kill();
        blinkCall = null;
      }
    };

    const pauseIdle = ({ pauseBlink = false } = {}) => {
      bodyIdle?.pause();
      killSchedule('head');
      headIdleMotion?.kill();
      headIdleMotion = null;
      if (pauseBlink) killSchedule('blink');
    };

    const blink = (double = false) => {
      const timeline = gsap.timeline();
      const close = { scaleY: .18, duration: .045, ease: 'power2.in', overwrite: 'auto' };
      const open = { scaleY: 1, duration: .07, ease: 'power2.out', overwrite: 'auto' };
      timeline.to(eyes, close).to(eyes, open);
      if (double) timeline.to({}, { duration: .12 }).to(eyes, close).to(eyes, open);
      return timeline;
    };

    const scheduleBlink = (delay = gsap.utils.random(3.5, 6.5, .1)) => {
      killSchedule('blink');
      if (document.hidden) return;
      blinkCall = gsap.delayedCall(delay, () => {
        blink(Math.random() < .18);
        scheduleBlink();
      });
    };

    const runHeadGesture = () => {
      if (document.hidden || state !== STATES.IDLE) return;
      const includeArm = Math.random() < .66;
      headIdleMotion = gsap.timeline({
        defaults: { ease: 'sine.inOut', overwrite: 'auto' },
        onComplete: () => {
          headIdleMotion = null;
          scheduleHeadIdle();
        }
      });

      headIdleMotion
        .to(head, { rotation: m(-2.2), x: m(-2), y: m(1), duration: .9 }, 0)
        .to(bodyTargets, { rotation: m(.38), duration: .9 }, 0)
        .to(head, { rotation: m(1.4), x: m(1), y: m(-1), duration: .85 }, .9)
        .to(bodyTargets, { rotation: m(-.25), duration: .85 }, .9)
        .to(head, { rotation: m(-.8), x: 0, y: m(.5), duration: .8 }, 1.75)
        .to(bodyTargets, { rotation: m(.14), duration: .8 }, 1.75)
        .to(head, { rotation: 0, x: 0, y: 0, duration: 1.1 }, 2.55)
        .to(bodyTargets, { rotation: 0, duration: 1.1 }, 2.55);

      if (includeArm) {
        headIdleMotion
          .to(arm, { rotation: m(-2.5), duration: .4, ease: 'power1.inOut' }, .48)
          .to(arm, { rotation: m(1), duration: .36, ease: 'power1.inOut' }, .88)
          .to(arm, { rotation: 0, duration: .44, ease: 'power1.inOut' }, 1.24);
      }
    };

    const scheduleHeadIdle = (delay = gsap.utils.random(.6, 1.8, .1)) => {
      killSchedule('head');
      if (document.hidden || state !== STATES.IDLE) return;
      headCall = gsap.delayedCall(delay, runHeadGesture);
    };

    const startBodyIdle = () => {
      if (!bodyIdle) {
        bodyIdle = gsap.timeline({ paused: true, repeat: -1, yoyo: true })
          .to(bodyTargets, {
            y: m(1.5),
            scaleY: 1 + (.006 * mobileScale),
            duration: 1.6,
            ease: 'sine.inOut',
            overwrite: 'auto'
          });
      }
      bodyIdle.invalidate().restart();
    };

    const resumeIdle = () => {
      setState(STATES.IDLE);
      startBodyIdle();
      scheduleHeadIdle(.7);
      if (!blinkCall) scheduleBlink();
    };

    const addFaceSquash = (timeline, at = 0) => timeline.to(head, {
      scaleX: 1.012,
      scaleY: .985,
      duration: .055,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut'
    }, at);

    const restoreNeutral = () => {
      response?.kill();
      response = gsap.timeline({
        defaults: { overwrite: 'auto', ease: 'power2.out' },
        onComplete: () => {
          delete character.dataset.characterState;
          resumeIdle();
        }
      })
        .to(head, { rotation: 0, x: 0, y: 0, scaleX: 1, scaleY: 1, duration: .34 }, 0)
        .to(bodyTargets, { rotation: 0, x: 0, y: 0, scaleY: 1, duration: .36 }, 0)
        .to(arm, { rotation: 0, x: 0, y: 0, duration: .36 }, 0)
        .to(hand, { rotation: 0, duration: .28 }, 0)
        .to(accents, { strokeWidth: 2, duration: .26 }, 0);
    };

    const respond = (mode, click = false) => {
      setState(mode);
      pauseIdle();
      response?.kill();
      response = gsap.timeline({ defaults: { overwrite: 'auto' } })
        .to(bodyTargets, { y: 0, scaleY: 1, duration: .18, ease: 'power1.out' }, 0)
        .to(accents, { strokeWidth: 2.8, duration: .16 }, 0);
      addFaceSquash(response, 0);

      if (mode === STATES.EMAIL) {
        response
          .to(head, { rotation: m(-4.7), x: m(-3), y: m(1), duration: .3, ease: 'power2.out' }, 0)
          .to(bodyTargets, { rotation: m(.45), x: m(1), duration: .32, ease: 'power2.out' }, 0)
          .to(arm, { rotation: m(-16), x: m(-2), duration: .34, ease: 'back.out(1.2)' }, .02)
          .to(hand, { rotation: m(-3.5), duration: .28, ease: 'power2.out' }, .06);
        if (click) response.to(head, { rotation: m(-6), y: m(3), duration: .09, yoyo: true, repeat: 1 }, .22);
      } else {
        response
          .to(head, { rotation: m(-3), y: m(2), duration: .2, ease: 'power2.out' }, 0)
          .to(bodyTargets, { rotation: m(.4), duration: .24, ease: 'power2.out' }, 0)
          .to(arm, {
            keyframes: [
              { rotation: m(-14), duration: .14 },
              { rotation: m(9), duration: .12 },
              { rotation: m(-12), duration: .13 },
              { rotation: m(7), duration: .12 },
              { rotation: 0, duration: .16 }
            ],
            ease: 'power1.inOut'
          }, .02)
          .to(hand, {
            keyframes: [
              { rotation: m(4), duration: .14 },
              { rotation: m(-3), duration: .12 },
              { rotation: m(4), duration: .13 },
              { rotation: 0, duration: .18 }
            ],
            ease: 'power1.inOut'
          }, .06)
          .to(head, { y: 0, duration: .12, yoyo: true, repeat: 1, ease: 'power1.inOut' }, .22)
          .to(accents, { strokeWidth: 3.15, duration: .12, yoyo: true, repeat: 1 }, .1);
        if (click) response.to(head, { rotation: m(-4.2), duration: .09, yoyo: true, repeat: 1 }, .38);
      }
    };

    const bindAction = (link, mode) => {
      if (!link) return;
      const enter = () => respond(mode);
      const leave = () => {
        queueMicrotask(() => {
          if (link.matches(':hover') || document.activeElement === link) return;
          restoreNeutral();
        });
      };
      const click = () => respond(mode, true);
      link.addEventListener('pointerenter', enter);
      link.addEventListener('pointerleave', leave);
      link.addEventListener('focus', enter);
      link.addEventListener('blur', leave);
      link.addEventListener('click', click);
      cleanup.push(() => {
        link.removeEventListener('pointerenter', enter);
        link.removeEventListener('pointerleave', leave);
        link.removeEventListener('focus', enter);
        link.removeEventListener('blur', leave);
        link.removeEventListener('click', click);
      });
    };

    const greeting = () => {
      setState(STATES.GREETING);
      pauseIdle({ pauseBlink: true });
      response?.kill();
      response = gsap.timeline({
        defaults: { ease: 'power1.inOut', overwrite: 'auto' },
        onComplete: resumeIdle
      })
        .to(head, { rotation: m(-3), x: m(-1.5), duration: .17 }, 0)
        .to(head, { rotation: m(2.5), x: m(1), duration: .18 }, .17)
        .to(head, { rotation: m(-1), x: 0, duration: .16 }, .35)
        .to(head, { rotation: 0, x: 0, duration: .22 }, .51)
        .to(bodyTargets, { rotation: m(.5), duration: .17 }, 0)
        .to(bodyTargets, { rotation: m(-.42), duration: .18 }, .17)
        .to(bodyTargets, { rotation: 0, duration: .24 }, .39)
        .to(arm, { rotation: m(-16), duration: .16 }, 0)
        .to(arm, { rotation: m(8), duration: .14 }, .16)
        .to(arm, { rotation: m(-12), duration: .14 }, .3)
        .to(arm, { rotation: m(5), duration: .13 }, .44)
        .to(arm, { rotation: 0, duration: .2 }, .57)
        .to(hand, { rotation: m(4), duration: .13 }, .04)
        .to(hand, { rotation: m(-4), duration: .13 }, .17)
        .to(hand, { rotation: m(3), duration: .13 }, .3)
        .to(hand, { rotation: 0, duration: .18 }, .46)
        .to(accents, { strokeWidth: 3, duration: .14, yoyo: true, repeat: 1 }, .08);
      addFaceSquash(response, .08);
    };

    const easterEgg = () => {
      if (Date.now() < easterEggLockedUntil) return;
      easterEggLockedUntil = Date.now() + 1500;
      setState(STATES.EASTER_EGG);
      pauseIdle({ pauseBlink: true });
      response?.kill();
      response = gsap.timeline({ defaults: { overwrite: 'auto' }, onComplete: resumeIdle })
        .add(blink(true), .02)
        .to(head, { rotation: m(-5), x: m(-2), duration: .09, ease: 'power2.out' }, .08)
        .to(head, { rotation: m(5), x: m(2), duration: .09, ease: 'power1.inOut' }, .17)
        .to(head, { rotation: 0, x: 0, duration: .2, ease: 'back.out(1.5)' }, .3)
        .to(bodyTargets, { rotation: m(.65), x: m(1.5), duration: .12, ease: 'power2.out' }, .16)
        .to(bodyTargets, { rotation: 0, x: 0, duration: .24, ease: 'power2.out' }, .28)
        .to(arm, { rotation: m(-18), duration: .14, ease: 'back.out(1.3)' }, .22)
        .to(arm, { rotation: 0, duration: .22, ease: 'power2.out' }, .38)
        .to(hand, { rotation: m(4), duration: .1, yoyo: true, repeat: 1 }, .24)
        .to(accents, { strokeWidth: 3.25, duration: .11, yoyo: true, repeat: 1 }, .1);
      addFaceSquash(response, .1);
    };

    const onVisibility = () => {
      if (document.hidden) {
        pauseIdle({ pauseBlink: true });
        intro?.pause();
        response?.pause();
        return;
      }
      intro?.resume();
      response?.resume();
      if (state === STATES.IDLE) resumeIdle();
    };

    bindAction(email, STATES.EMAIL);
    bindAction(whatsapp, STATES.WHATSAPP);
    character.addEventListener('click', easterEgg);
    document.addEventListener('visibilitychange', onVisibility);
    cleanup.push(() => {
      character.removeEventListener('click', easterEgg);
      document.removeEventListener('visibilitychange', onVisibility);
      killSchedule('head');
      killSchedule('blink');
      greetingCall?.kill();
      bodyIdle?.kill();
      headIdleMotion?.kill();
      intro?.kill();
      response?.kill();
    });

    gsap.set(allLines, { drawSVG: '0%' });
    character.dataset.characterReady = 'true';
    intro = gsap.timeline({
      defaults: { ease: 'power1.out' },
      onComplete: () => { greetingCall = gsap.delayedCall(.15, greeting); }
    })
      .to(bodyLines, { drawSVG: '100%', duration: .42, stagger: .025 }, .06)
      .to(headLines, { drawSVG: '100%', duration: .42, stagger: .02 }, .14)
      .to(faceLines, { drawSVG: '100%', duration: .34, stagger: .018 }, .28)
      .to(clothingLines, { drawSVG: '100%', duration: .32, stagger: .02 }, .38)
      .to(armLines, { drawSVG: '100%', duration: .26, stagger: .025 }, .5)
      .to(handLines, { drawSVG: '100%', duration: .22, stagger: .02 }, .58)
      .to(detailLines, { drawSVG: '100%', duration: .16, stagger: .02 }, .68)
      .to(accents, { drawSVG: '100%', duration: .28, stagger: .018 }, .76);
    if (innerWidth < 768) intro.timeScale(1.35);
  };

  init();

  addEventListener('pagehide', () => {
    cleanup.forEach((dispose) => dispose());
    cleanup = [];
  }, { once: true });
})();
