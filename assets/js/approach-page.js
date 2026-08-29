(() => {
  const story = document.querySelector('[data-approach-story]');
  if (!story) return;

  const process = story.querySelector('[data-approach-process]');
  const stages = [...story.querySelectorAll('[data-approach-step]')];
  const indexLinks = [...story.querySelectorAll('[data-process-index] a')];
  const stageNames = ['input', 'control', 'flow', 'transmission', 'inspection', 'return'];
  let activeStage = 0;

  const stageFromHash = () => {
    const targetId = decodeURIComponent(location.hash.slice(1));
    return stages.findIndex((stage) => stage.id === targetId);
  };

  const setStage = (next) => {
    activeStage = Math.max(0, Math.min(stages.length - 1, next));
    if (process) process.dataset.stage = stageNames[activeStage];
    stages.forEach((stage, index) => {
      const active = index === activeStage;
      stage.classList.toggle('is-active', active);
      stage.setAttribute('aria-hidden', String(!active));
      stage.inert = !active;
    });
    indexLinks.forEach((link, index) => {
      if (index === activeStage) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
  };

  indexLinks.forEach((link, index) => link.addEventListener('click', (event) => {
    event.preventDefault();
    setStage(index);
    history.pushState({ approachStage: index }, '', link.hash);
    link.focus({ preventScroll: true });
  }));
  addEventListener('popstate', () => {
    const hashStage = stageFromHash();
    if (hashStage >= 0) setStage(hashStage);
  });
  addEventListener('pageshow', () => {
    const hashStage = stageFromHash();
    setStage(hashStage >= 0 ? hashStage : activeStage);
  });

  const initialStage = stageFromHash();
  setStage(initialStage >= 0 ? initialStage : 0);
})();
