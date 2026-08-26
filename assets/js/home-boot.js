(() => {
  const hero = document.querySelector('[data-system-boot]');
  const gsap = window.gsap;
  const SplitText = window.SplitText;
  const ScrambleTextPlugin = window.ScrambleTextPlugin;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia?.('(max-width: 599px)').matches;
  const tablet = window.matchMedia?.('(min-width: 600px) and (max-width: 899px)').matches;

  if (!hero || !gsap || !SplitText || !ScrambleTextPlugin || reducedMotion) return;

  const visual = hero.querySelector('.boot-visual');
  const instrument = hero.querySelector('.boot-instrument');
  const photo = hero.querySelector('.boot-photo-frame');
  const title = hero.querySelector('.boot-title');
  const icons = [...hero.querySelectorAll('.boot-orbit .orbit__icon')];
  const reference = hero.querySelector('.boot-reference');
  const descriptor = hero.querySelector('.boot-descriptor');
  const lead = hero.querySelector('.boot-lead');
  const actions = hero.querySelector('.boot-actions');
  const links = hero.querySelector('.boot-links');
  let timeline;
  let split;

  try {
    gsap.registerPlugin(SplitText, ScrambleTextPlugin);
    hero.classList.add('boot-enhanced');
    split = SplitText.create(title, { type: 'words,chars', aria: 'auto', autoSplit: true });
    const titleChars = split.chars;
    const referenceText = reference.textContent.trim();
    const scramble = {
      text: referenceText,
      chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+_/-',
      revealDelay: .04,
      speed: .25
    };

    gsap.set(titleChars, { yPercent: 108, autoAlpha: 0 });
    timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

    if (mobile) {
      timeline
        .to(instrument, { opacity: 1, scale: 1, duration: .14 }, 0)
        .to(reference, { opacity: 1, duration: .01 }, .04)
        .to(reference, { duration: .42, scrambleText: scramble, ease: 'none' }, .05)
        .to(titleChars, { yPercent: 0, autoAlpha: 1, duration: .4, stagger: .015, ease: 'power4.out' }, .1)
        .to(descriptor, { opacity: 1, y: 0, duration: .12 }, .28)
        .to(photo, { clipPath: 'inset(0 0% 0 0% round 46%)', duration: .22, ease: 'power2.inOut' }, .24)
        .to(visual.querySelectorAll('.boot-orbit'), { opacity: 1, duration: .12 }, .39)
        .to([lead, actions, links], { opacity: 1, duration: .12, stagger: .025 }, .48);
    } else if (tablet) {
      timeline
        .to(instrument, { opacity: 1, scale: 1, duration: .17 }, 0)
        .to(reference, { opacity: 1, duration: .01 }, .06)
        .to(reference, { duration: .5, scrambleText: scramble, ease: 'none' }, .07)
        .to(titleChars, { yPercent: 0, autoAlpha: 1, duration: .46, stagger: .018, ease: 'power4.out' }, .14)
        .to(descriptor, { opacity: 1, y: 0, duration: .14 }, .34)
        .to(photo, { clipPath: 'inset(0 0% 0 0% round 46%)', duration: .28, ease: 'power2.inOut' }, .29)
        .to(visual.querySelectorAll('.boot-orbit'), { opacity: 1, duration: .12 }, .49)
        .to([lead, actions, links], { opacity: 1, duration: .14, stagger: .035 }, .61);
    } else {
      timeline
        .to(instrument, { opacity: 1, scale: 1, duration: .2 }, 0)
        .to(reference, { opacity: 1, duration: .01 }, .08)
        .to(reference, { duration: .58, scrambleText: scramble, ease: 'none' }, .09)
        .to(titleChars, { yPercent: 0, autoAlpha: 1, duration: .5, stagger: .02, ease: 'power4.out' }, .18)
        .to(descriptor, { opacity: 1, y: 0, duration: .16 }, .4)
        .to(photo, { clipPath: 'inset(0 0% 0 0% round 46%)', duration: .34, ease: 'power2.inOut' }, .34)
        .to(visual.querySelectorAll('.boot-orbit'), { opacity: 1, duration: .12 }, .57)
        .fromTo(icons, { opacity: 0 }, { opacity: 1, duration: .14, stagger: { each: .018, from: 'center' }, clearProps: 'opacity' }, .59)
        .to([lead, actions, links], { opacity: 1, duration: .15, stagger: .045 }, .78);
    }
    timeline.set(titleChars, { clearProps: 'opacity,transform,visibility' });
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
