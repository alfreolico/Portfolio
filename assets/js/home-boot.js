(() => {
  const hero = document.querySelector('[data-system-boot]');
  const gsap = window.gsap;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia?.('(max-width: 599px)').matches;
  const tablet = window.matchMedia?.('(min-width: 600px) and (max-width: 899px)').matches;

  if (!hero || !gsap || reducedMotion) return;

  const visual = hero.querySelector('.boot-visual');
  const instrument = hero.querySelector('.boot-instrument');
  const photo = hero.querySelector('.boot-photo-frame');
  const titleWords = [...hero.querySelectorAll('.boot-title__word')];
  const icons = [...hero.querySelectorAll('.boot-orbit .orbit__icon')];
  const reference = hero.querySelector('.boot-reference');
  const descriptor = hero.querySelector('.boot-descriptor');
  const lead = hero.querySelector('.boot-lead');
  const actions = hero.querySelector('.boot-actions');
  const links = hero.querySelector('.boot-links');
  let timeline;

  try {
    hero.classList.add('boot-enhanced');
    timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

    if (mobile) {
      timeline
        .to(instrument, { opacity: 1, scale: 1, duration: .14 }, 0)
        .to(reference, { opacity: 1, duration: .1 }, .04)
        .to(titleWords, { opacity: 1, y: 0, duration: .2, stagger: .055, ease: 'power3.out' }, .1)
        .to(descriptor, { opacity: 1, y: 0, duration: .12 }, .25)
        .to(photo, { clipPath: 'inset(0 0% 0 0% round 46%)', duration: .22, ease: 'power2.inOut' }, .24)
        .to(visual.querySelectorAll('.boot-orbit'), { opacity: 1, duration: .12 }, .39)
        .to([lead, actions, links], { opacity: 1, duration: .12, stagger: .025 }, .48);
    } else if (tablet) {
      timeline
        .to(instrument, { opacity: 1, scale: 1, duration: .17 }, 0)
        .to(reference, { opacity: 1, duration: .1 }, .06)
        .to(titleWords, { opacity: 1, y: 0, duration: .23, stagger: .07, ease: 'power3.out' }, .14)
        .to(descriptor, { opacity: 1, y: 0, duration: .14 }, .31)
        .to(photo, { clipPath: 'inset(0 0% 0 0% round 46%)', duration: .28, ease: 'power2.inOut' }, .29)
        .to(visual.querySelectorAll('.boot-orbit'), { opacity: 1, duration: .12 }, .49)
        .to([lead, actions, links], { opacity: 1, duration: .14, stagger: .035 }, .61);
    } else {
      timeline
        .to(instrument, { opacity: 1, scale: 1, duration: .2 }, 0)
        .to(reference, { opacity: 1, duration: .12 }, .08)
        .to(titleWords, { opacity: 1, y: 0, duration: .26, stagger: .09, ease: 'power3.out' }, .18)
        .to(descriptor, { opacity: 1, y: 0, duration: .16 }, .38)
        .to(photo, { clipPath: 'inset(0 0% 0 0% round 46%)', duration: .34, ease: 'power2.inOut' }, .34)
        .to(visual.querySelectorAll('.boot-orbit'), { opacity: 1, duration: .12 }, .57)
        .fromTo(icons, { opacity: 0 }, { opacity: 1, duration: .14, stagger: { each: .018, from: 'center' }, clearProps: 'opacity' }, .59)
        .to([lead, actions, links], { opacity: 1, duration: .15, stagger: .045 }, .78);
    }
  } catch {
    hero.classList.remove('boot-enhanced');
  }

  window.addEventListener('pagehide', () => {
    timeline?.kill();
    hero.classList.remove('boot-enhanced');
  }, { once: true });
})();
