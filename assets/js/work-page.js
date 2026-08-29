(() => {
  const field = document.querySelector('[data-evidence-field]');
  if (!field) return;

  const inputs = [...field.querySelectorAll('input[name="work-capability"]')];
  const ports = [...field.querySelectorAll('[data-capability]')];
  const terminals = [...field.querySelectorAll('[data-evidence-id]')];
  const zones = [...field.querySelectorAll('[data-evidence-zone]')];
  const fieldRoutes = [...field.querySelectorAll('[data-field-route]')];
  const signalNodes = [...field.querySelectorAll('[data-signal-node]')];
  const routeTitle = field.querySelector('[data-route-title]');
  const routeSummary = field.querySelector('.route-commit [data-route-summary]');
  const editorialParagraph = field.querySelector('.evidence-field__intro > p:last-child');
  const legend = field.querySelector('.evidence-field__legend');
  const routeHub = field.querySelector('[data-route-hub]');
  const routeReactor = field.querySelector('[data-route-reactor]');
  const sourcePath = field.querySelector('[data-route-source]');
  const branches = Object.fromEntries(
    [...field.querySelectorAll('[data-route-branch]')].map((path) => [path.dataset.routeBranch, path])
  );
  const pulses = Object.fromEntries(
    [...field.querySelectorAll('[data-route-pulse]')].map((pulse) => [pulse.dataset.routePulse, pulse])
  );

  const gsap = window.gsap;
  const DrawSVGPlugin = window.DrawSVGPlugin;
  const MotionPathPlugin = window.MotionPathPlugin;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sourcePositions = [165, 433, 701, 969, 1237, 1507];
  let routeTimeline;

  if (gsap && DrawSVGPlugin) gsap.registerPlugin(DrawSVGPlugin);
  if (gsap && MotionPathPlugin) gsap.registerPlugin(MotionPathPlugin);

  const capabilitiesFor = (terminal) => (terminal.dataset.capabilities || '').split(/\s+/).filter(Boolean);

  const setSourceGeometry = (input, port) => {
    if (!sourcePath) return;
    const inputIndex = Math.max(0, inputs.indexOf(input));
    let sourceX = sourcePositions[inputIndex];
    if (routeHub && port) {
      const hubRect = routeHub.getBoundingClientRect();
      const portRect = port.getBoundingClientRect();
      if (hubRect.width > 0) {
        sourceX = ((portRect.left + portRect.width / 2 - hubRect.left) / hubRect.width) * 1672;
        sourceX = Math.max(50, Math.min(1622, sourceX));
      }
    }
    const target = { x: 306, y: 565 };
    let corridorX = 118;

    if (routeHub) {
      const hubRect = routeHub.getBoundingClientRect();
      if (hubRect.width > 0 && hubRect.height > 0) {
        const toSvgX = (screenX) => ((screenX - hubRect.left) / hubRect.width) * 1672;
        const toSvgY = (screenY) => ((screenY - hubRect.top) / hubRect.height) * 941;
        const protectedRects = [editorialParagraph, legend]
          .filter(Boolean)
          .map((element) => element.getBoundingClientRect());
        const protectedRight = Math.max(...protectedRects.map((rect) => rect.right), hubRect.left);

        corridorX = Math.max(118, Math.min(target.x - 34, toSvgX(protectedRight + 24)));
      }
    }

    // The upper run stays above the hub; the vertical corridor clears editorial and legend bounds.
    sourcePath.setAttribute(
      'd',
      `M${sourceX.toFixed(1)} 42V112H${corridorX.toFixed(1)}V${target.y}H${target.x}`
    );
  };

  const setStaticPaths = () => {
    if (!gsap) return;
    gsap.set([sourcePath, branches.applied, branches.lab].filter(Boolean), {
      clearProps: 'strokeDasharray,strokeDashoffset,visibility',
      drawSVG: '100%'
    });
    gsap.set(Object.values(pulses).filter(Boolean), { opacity: 0, clearProps: 'transform' });
    gsap.set(fieldRoutes, { clearProps: 'opacity,transform' });
    gsap.set(signalNodes, { clearProps: 'opacity,transform' });
    routeHub?.classList.remove('is-committing');
  };

  const animateRoute = (activeZones, activeTerminals) => {
    if (!gsap || reducedMotion.matches || !DrawSVGPlugin) {
      setStaticPaths();
      return;
    }

    routeTimeline?.kill();
    const activeSet = new Set(activeTerminals);
    const activeNodes = signalNodes.filter((node) => activeSet.has(node.closest('[data-evidence-id]')));
    const activeFeeds = fieldRoutes.filter((route) =>
      activeZones.includes(route.dataset.fieldRoute) && route.classList.contains('signal-field__feed')
    );
    const activeRails = fieldRoutes.filter((route) =>
      activeZones.includes(route.dataset.fieldRoute) && route.classList.contains('signal-branch__rail')
    );
    gsap.killTweensOf([
      ...Object.values(pulses),
      routeReactor,
      ...fieldRoutes,
      ...signalNodes
    ].filter(Boolean));
    gsap.set(fieldRoutes, { clearProps: 'opacity,transform' });
    gsap.set(signalNodes, { clearProps: 'opacity,transform' });

    const visibleBranches = activeZones.map((zone) => branches[zone]).filter(Boolean);
    const dormantBranches = Object.entries(branches)
      .filter(([name]) => !activeZones.includes(name))
      .map(([, path]) => path);

    gsap.set(sourcePath, { drawSVG: '0%' });
    gsap.set(visibleBranches, { drawSVG: '0%', opacity: 1 });
    if (dormantBranches.length) gsap.set(dormantBranches, { drawSVG: '100%', opacity: .18 });
    gsap.set(Object.values(pulses), { opacity: 0 });

    routeHub?.classList.add('is-committing');
    routeTimeline = gsap.timeline({
      defaults: { overwrite: 'auto' },
      onComplete: () => routeHub?.classList.remove('is-committing')
    });
    routeTimeline
      .to(sourcePath, { drawSVG: '100%', duration: .32, ease: 'power2.out' }, 0)
      .fromTo(routeReactor, { scale: .94, opacity: .45 }, {
        scale: 1.05,
        opacity: 1,
        duration: .16,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      }, .24)
      .to(visibleBranches, { drawSVG: '100%', duration: .3, stagger: .055, ease: 'power2.out' }, .3)
      .fromTo(activeFeeds, { scaleX: .12, opacity: .2 }, {
        scaleX: 1,
        opacity: .7,
        duration: .24,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      }, .42)
      .fromTo(activeRails, { scaleY: .12, opacity: .18 }, {
        scaleY: 1,
        opacity: .5,
        duration: .32,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      }, .46)
      .fromTo(activeNodes, { scale: .72, opacity: .35 }, {
        scale: 1,
        opacity: 1,
        duration: .2,
        stagger: .04,
        ease: 'back.out(1.8)',
        clearProps: 'transform,opacity'
      }, .52);

    if (MotionPathPlugin && pulses.source) {
      routeTimeline
        .set(pulses.source, { opacity: 1, motionPath: { path: sourcePath, align: sourcePath, alignOrigin: [.5, .5], start: 0, end: 0 } }, 0)
        .to(pulses.source, { motionPath: { path: sourcePath, align: sourcePath, alignOrigin: [.5, .5], end: 1 }, duration: .36, ease: 'none' }, 0)
        .to(pulses.source, { opacity: 0, duration: .06 }, .35);

      activeZones.forEach((zone, index) => {
        const pulse = pulses[zone];
        const path = branches[zone];
        if (!pulse || !path) return;
        routeTimeline
          .set(pulse, { opacity: 1, motionPath: { path, align: path, alignOrigin: [.5, .5], start: 0, end: 0 } }, .34 + index * .04)
          .to(pulse, { motionPath: { path, align: path, alignOrigin: [.5, .5], end: 1 }, duration: .34, ease: 'none' }, .34 + index * .04)
          .to(pulse, { opacity: 0, duration: .08 }, .65 + index * .04);
      });
    }
  };

  const commitCapability = (input, animate = true) => {
    const capability = input.value;
    const port = ports.find((item) => item.dataset.capability === capability);
    const title = port?.querySelector(':scope > span:last-child')?.innerText.replace(/\s+/g, ' ').trim() || capability;
    const activeTerminals = terminals.filter((terminal) => capabilitiesFor(terminal).includes(capability));
    const activeSet = new Set(activeTerminals);
    const activeZones = zones
      .filter((zone) => activeTerminals.some((terminal) => zone.contains(terminal)))
      .map((zone) => zone.dataset.evidenceZone);

    field.dataset.enhanced = 'true';
    field.dataset.activeCapability = capability;
    routeTitle.textContent = title;
    routeSummary.textContent = input.dataset.routeSummary || '';
    setSourceGeometry(input, port);

    ports.forEach((item) => item.toggleAttribute('data-machine-active', item === port));
    terminals.forEach((terminal) => {
      const active = activeSet.has(terminal);
      terminal.classList.toggle('is-connected', active);
      terminal.classList.toggle('is-available', !active);
      terminal.dataset.routeMatch = String(active);
    });
    zones.forEach((zone) => {
      const active = activeZones.includes(zone.dataset.evidenceZone);
      zone.classList.toggle('has-active-evidence', active);
      zone.classList.toggle('is-dormant', !active);
    });
    Object.entries(branches).forEach(([name, path]) => path.classList.toggle('is-dormant', !activeZones.includes(name)));

    if (animate) animateRoute(activeZones, activeTerminals);
    else setStaticPaths();
  };

  inputs.forEach((input, index) => {
    input.addEventListener('change', () => {
      if (input.checked) commitCapability(input, true);
    });
    input.addEventListener('keydown', (event) => {
      const direction = ['ArrowRight', 'ArrowDown'].includes(event.key)
        ? 1
        : ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      const next = inputs[(index + direction + inputs.length) % inputs.length];
      next.checked = true;
      next.focus();
      next.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });

  reducedMotion.addEventListener?.('change', () => {
    routeTimeline?.kill();
    const active = inputs.find((input) => input.checked);
    if (active) commitCapability(active, !reducedMotion.matches);
  });

  const initial = inputs.find((input) => input.checked) || inputs[0];
  if (initial) requestAnimationFrame(() => commitCapability(initial, !reducedMotion.matches));

  if ('ResizeObserver' in window && routeHub) {
    const routeObserver = new ResizeObserver(() => {
      const active = inputs.find((input) => input.checked);
      const port = ports.find((item) => item.dataset.capability === active?.value);
      if (active && port) requestAnimationFrame(() => setSourceGeometry(active, port));
    });
    routeObserver.observe(routeHub);
  }
})();
