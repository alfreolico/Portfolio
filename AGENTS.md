# Portfolio — Repository Instructions

## Project identity

This repository contains Alfredo Brambila's personal developer portfolio.

The portfolio is both:

1. a professional presentation of Alfredo's work, experience, and technical capabilities;
2. a demonstration of frontend craft, design judgment, interaction design, and attention to detail.

The portfolio must feel authored and distinctive without sacrificing clarity, accessibility, responsiveness, performance, or maintainability.

---

## Sources of truth

Before making significant changes:

1. inspect the current repository;
2. inspect the implementation relevant to the task;
3. preserve existing decisions that are still valid;
4. do not assume the project uses patterns, frameworks, or architecture that are not present in the repository.

Existing working behavior is the starting point, not disposable scaffolding.

---

## Working rules

- Do not rewrite working areas without a concrete reason.
- Prefer focused changes over broad rewrites.
- Preserve established architecture unless the task explicitly requires architectural change.
- Inspect before modifying.
- Explain significant proposed changes before implementing them when the task is exploratory or architectural.
- Do not silently expand the scope of a task.
- Do not advance to unrelated work automatically after completing the requested task.
- Do not introduce dependencies unless they provide material value over the existing stack.
- Do not use placeholder or simulated content when real project content already exists.
- Verify relevant behavior after changes.

---

## Git and GitHub

Do not execute Git or GitHub mutations.

Do not run:

- `git add`
- `git commit`
- `git push`
- `git pull`
- branch creation or deletion
- merges
- rebases
- resets
- GitHub publication or deployment actions

Git status, diff, log, and other read-only inspection are allowed when useful.

The repository owner performs Git/GitHub write operations manually.

---

## Design expectations

The portfolio should avoid generic AI-generated or template-like visual solutions.

Value:

- intentional visual identity;
- meaningful micro-interactions;
- distinctive hover behavior;
- visual storytelling;
- thoughtful motion;
- small unexpected details;
- project-specific presentation;
- strong typography;
- accessible and responsive implementation.

Do not add effects merely to create spectacle.

Visual personality must coexist with:

- usability;
- accessibility;
- reduced-motion support;
- responsive behavior;
- performance;
- maintainable code.

For significant creative-direction, visual-design, motion, interaction, portfolio-polish, or anti-generic work, use the `portfolio-creative-director` skill when applicable.

---

## Implementation discipline

Before editing:

1. locate the relevant files;
2. understand their relationships;
3. identify existing conventions;
4. determine the smallest coherent implementation surface.

After editing:

1. inspect the resulting diff;
2. run relevant available checks;
3. check for regressions;
4. verify responsive implications when UI changes;
5. verify accessibility implications when interaction changes.

When browser or visual tooling is available, visual changes should be visually inspected rather than considered complete solely because the code is valid.

---

## Communication

Be specific and evidence-based.

Distinguish clearly between:

- facts observed in the repository;
- interpretations;
- recommendations;
- implemented changes;
- unresolved questions.

Do not manufacture issues merely to make an audit appear comprehensive.

When something already works well, say so and preserve it.
