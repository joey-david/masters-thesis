# Thesis defense presentation

25-slide deck for a **20–25 minute** defense.

## Design

- Multiple slide archetypes: dark section dividers, equation slides, diagrams, hypothesis maps, result plots, synthesis slides.
- Part I adds explicit LoRA, rate–distortion, operational-rate, and correction-geometry theory.
- Result slides are separated by bridge slides that state the live hypothesis / confound before the next experiment.
- Minimal prose on-slide; equations only when they advance the argument.

## Build

```bash
python make_assets.py
node deck.js
```

Output: `thesis_defense.pptx`

Dependencies: Python + matplotlib/numpy; Node + `pptxgenjs`.

See `speaker_notes.md` for the ~21–23 minute speaking plan.
