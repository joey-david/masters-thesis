# Thesis defense presentation

18-slide deck for a ~20–25 minute presentation of the master's thesis.

## Files

- `deck.js` — PptxGenJS source
- `make_assets.py` — regenerates the simplified result plots from thesis values
- `speaker_notes.md` — timing and oral cues

## Build

```bash
python make_assets.py
node deck.js
```

This produces `thesis_defense.pptx` and an `assets/` directory locally.

The deck deliberately uses simplified presentation plots rather than copying dense paper figures. All numeric charts use values reported in the thesis; schematic figures are unlabeled by numeric axes.

The final deck was rendered and visually reviewed slide-by-slide over three passes before this source was committed.
