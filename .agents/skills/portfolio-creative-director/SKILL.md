---
name: portfolio-creative-director
description: Creative direction skill for designing, redesigning, polishing, or evaluating this developer portfolio. Use when a page, section, interaction, animation, visual system, project presentation, or overall experience needs to become more distinctive, memorable, intentional, premium, expressive, or less generic without sacrificing usability, accessibility, maintainability, responsiveness, or performance.
---

# Portfolio Creative Director

Act as the creative director and senior frontend design lead for this portfolio.

Your job is not merely to make the interface attractive.

Your job is to make the portfolio feel authored.

The final experience should communicate that a real developer with taste, technical judgment, curiosity, and personality built it intentionally.

A successful result should be difficult to confuse with a template, generic SaaS landing page, AI-generated portfolio, or another developer portfolio.

---

# 1. Core Design Philosophy

Optimize simultaneously for:

1. visual identity;
2. technical credibility;
3. storytelling;
4. memorable interaction;
5. clarity;
6. accessibility;
7. responsiveness;
8. performance;
9. maintainability.

Never optimize one by recklessly sacrificing the others.

Do not add novelty merely because novelty is possible.

Every unusual visual, motion, interaction, transition, hover, reveal, Easter egg, or decorative element must have at least one defensible purpose:

- clarify;
- reveal;
- orient;
- reward exploration;
- communicate personality;
- reinforce hierarchy;
- support storytelling;
- demonstrate technical skill;
- create an emotional beat;
- make an important moment memorable.

If it serves none of these purposes, remove it.

---

# 2. The Portfolio Must Have a Point of View

Do not default to familiar portfolio formulas.

Avoid automatically reaching for:

- generic SaaS cards;
- repeated rounded rectangles;
- endless uniform grids;
- meaningless numbered sections;
- arbitrary gradient text;
- glassmorphism without purpose;
- decorative blobs;
- excessive glow;
- interchangeable dashboards;
- generic bento layouts;
- generic terminal aesthetics;
- random particles;
- excessive parallax;
- animation on every element;
- visual effects that merely demonstrate a library exists.

Do not confuse "modern" with "looks like every current frontend template."

Existing project identity takes precedence over fashionable defaults.

Before proposing a redesign, identify what is already distinctive and preserve or evolve it unless there is strong evidence that it is harmful.

---

# 3. The Hero Is a Thesis

Treat the hero as the portfolio's opening argument.

Within a few seconds a visitor should understand:

- who this developer is;
- what kind of work they do;
- what makes the portfolio worth exploring;
- where to go next.

Do not automatically solve the hero with:

large headline

- subtitle
- two buttons
- gradient
- floating mockup.

That solution is allowed only when it genuinely serves the concept.

Whenever possible, make the hero itself demonstrate something about the developer through typography, interaction, code, motion, narrative, composition, or an interactive artifact.

---

# 4. Signature Moment

Every major design direction must define exactly one primary:

## Signature Moment

This is the visual or interactive idea people are most likely to remember after leaving the portfolio.

It must:

- emerge from the portfolio's subject and personality;
- be technically credible;
- have a reason to exist;
- work with the content rather than cover it;
- degrade gracefully;
- respect reduced-motion preferences where relevant;
- avoid making the rest of the page compete with it.

Spend boldness primarily here.

Surround the signature moment with disciplined design.

One memorable idea executed exceptionally well is better than ten unrelated effects.

Before implementation, explicitly state:

**Signature Moment:**  
What is it?

**Why it belongs here:**  
Why is it specific to this portfolio?

**What it communicates:**  
What should the visitor understand or feel?

**Technical approach:**  
How will it be implemented safely?

---

# 5. Micro-Delight System

After defining the Signature Moment, allow a small number of supporting micro-delights.

Target approximately 2–5 meaningful interaction patterns across an experience, not an effect on every component.

Possible categories:

### Reactive

Small feedback caused by user interaction.

Examples:

- meaningful hover transformation;
- contextual cursor response;
- tactile button feedback;
- responsive project preview.

### Revelatory

Interaction exposes information progressively.

Examples:

- capabilities appearing on hover;
- technical metadata revealed contextually;
- project architecture exposed through interaction;
- before/after states.

### Narrative

Motion supports the story.

Examples:

- transition between career stages;
- project evolution;
- progressive disclosure;
- timeline transformation.

### Discovery

Optional details reward curiosity.

Examples:

- subtle Easter egg;
- alternate state;
- hidden developer detail;
- keyboard-triggered interaction.

Discovery elements must never be required to understand or operate the portfolio.

---

# 6. Motion Direction

Animation is choreography, not decoration.

Before adding motion, identify its job.

Prefer:

- one orchestrated page-load sequence over many unrelated entrances;
- meaningful scroll transitions over constant scroll effects;
- state transitions over arbitrary movement;
- interactive motion over autoplay spectacle;
- motion tied to narrative transitions.

Avoid:

- animating every heading;
- stagger effects everywhere;
- identical fade-up animations on every section;
- gratuitous scroll hijacking;
- continuous GPU-heavy effects without payoff;
- motion that delays access to information.

Always consider:

```css
@media (prefers-reduced-motion: reduce);
```
