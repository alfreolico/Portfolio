(() => {
  const hero = document.querySelector('[data-system-boot]');
  const gsap = window.gsap;
  const SplitText = window.SplitText;
  const ScrambleTextPlugin = window.ScrambleTextPlugin;
  const DrawSVGPlugin = window.DrawSVGPlugin;
  const MotionPathPlugin = window.MotionPathPlugin;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia?.('(max-width: 599px)').matches;
  const tablet = window.matchMedia?.('(min-width: 600px) and (max-width: 899px)').matches;
  const storageKey = 'portfolioBootV22Played';

  if (!hero || !gsap || !SplitText || !ScrambleTextPlugin || !DrawSVGPlugin || !MotionPathPlugin || reducedMotion) return;

  const visual = hero.querySelector('.boot-visual');
  const instrument = hero.querySelector('.boot-instrument');
  const traces = [...instrument.querySelectorAll('[data-boot-trace]')];
  const signal = instrument.querySelector('[data-boot-signal]');
  const signalPath = instrument.querySelector('[data-boot-trace="primary"]');
  const photo = hero.querySelector('.boot-photo-frame');
  const title = hero.querySelector('.boot-title');
  const icons = [...hero.querySelectorAll('.boot-orbit .orbit__icon')];
  const orbits = visual.querySelectorAll('.boot-orbit');
  const reference = hero.querySelector('.boot-reference');
  const descriptor = hero.querySelector('.boot-descriptor');
  const lead = hero.querySelector('.boot-lead');
  const actions = hero.querySelector('.boot-actions');
  const links = hero.querySelector('.boot-links');
  let timeline;
  let split;
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
    const referenceText = reference.textContent.trim();
    const scramble = {
      text: referenceText,
      chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+_/-',
      revealDelay: .04,
      speed: .22
    };
    const drawTraces = mobile ? traces.slice(0, 3) : traces;

    reference.setAttribute('aria-label', referenceText);
    gsap.set(titleChars, { yPercent: 108, autoAlpha: 0 });
    timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

    if (fullBoot) {
      timeline
        .to(instrument, { opacity: 1, scale: 1, duration: mobile ? .16 : .24 }, 0)
        .from(drawTraces, { drawSVG: '0%', duration: mobile ? .28 : .46, stagger: mobile ? .035 : .055, ease: 'power2.out' }, .03)
        .to(reference, { opacity: 1, duration: .01 }, mobile ? .1 : .15)
        .to(reference, { duration: mobile ? .42 : .58, scrambleText: scramble, ease: 'none' }, mobile ? .11 : .16)
        .to(titleChars, { yPercent: 0, autoAlpha: 1, duration: mobile ? .42 : .55, stagger: mobile ? .015 : .022, ease: 'power4.out' }, mobile ? .18 : .32)
        .to(photo, { clipPath: 'inset(0 0% 0 0% round 46%)', duration: mobile ? .28 : .46, ease: 'power2.inOut' }, mobile ? .38 : .62)
        .to(orbits, { opacity: 1, duration: mobile ? .14 : .16 }, mobile ? .56 : .76)
        .fromTo(icons, { opacity: 0 }, { opacity: 1, duration: .16, stagger: { each: mobile ? .01 : .014, from: 'center' }, clearProps: 'opacity' }, mobile ? .59 : .8)
        .to(descriptor, { opacity: 1, y: 0, duration: .16 }, mobile ? .65 : 1.03)
        .to(lead, { opacity: 1, y: 0, duration: .18 }, mobile ? .79 : 1.22)
        .to(actions, { opacity: 1, y: 0, duration: .16 }, mobile ? .91 : 1.38)
        .to(links, { opacity: 1, y: 0, duration: .14 }, mobile ? 1.02 : 1.52);

      if (!mobile && signal && signalPath) {
        const motionStart = { path: signalPath, align: signalPath, alignOrigin: [.5, .5], start: 0, end: 0 };
        const motionEnd = { path: signalPath, align: signalPath, alignOrigin: [.5, .5], start: 0, end: 1 };
        timeline
          .set(signal, { opacity: 0, motionPath: motionStart }, .1)
          .to(signal, { opacity: 1, duration: .06 }, .12)
          .to(signal, { motionPath: motionEnd, duration: .38, ease: 'none' }, .12)
          .to(signal, { opacity: 0, duration: .08 }, .5)
          .set(signal, { clearProps: 'transform' }, .59);
      }
    } else {
      timeline
        .to(instrument, { opacity: 1, scale: 1, duration: .14 }, 0)
        .to(titleChars, { yPercent: 0, autoAlpha: 1, duration: .36, stagger: .012, ease: 'power4.out' }, .08)
        .to(photo, { clipPath: 'inset(0 0% 0 0% round 46%)', duration: .28, ease: 'power2.inOut' }, .16)
        .to(orbits, { opacity: 1, duration: .12 }, .28)
        .fromTo(icons, { opacity: 0 }, { opacity: 1, duration: .12, stagger: { each: .009, from: 'center' }, clearProps: 'opacity' }, .31)
        .to(reference, { opacity: 1, duration: .12 }, .34)
        .to(descriptor, { opacity: 1, y: 0, duration: .14 }, .4)
        .to(lead, { opacity: 1, y: 0, duration: .14 }, .5)
        .to(actions, { opacity: 1, y: 0, duration: .13 }, .6)
        .to(links, { opacity: 1, y: 0, duration: .12 }, .69);
    }

    timeline.set(titleChars, { clearProps: 'opacity,transform,visibility' });
    try {
      window.sessionStorage.setItem(storageKey, 'true');
    } catch {
      // A blocked storage API simply means this session receives the full safe boot again.
    }
  } catch {
    split?.revert();
    hero.classList.remove('boot-enhanced');
  }

  window.addEventListener('pagehide', () => {
    timeline?.kill();
    split?.revert();
    hero.classList.remove('boot-enhanced');
  }, { once: true });
})();
