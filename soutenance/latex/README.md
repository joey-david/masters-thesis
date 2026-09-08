# LaTeX soutenance

Beamer conversion/rework of `soutenance_joey_david_v2.pptx`.

## Pull

```bash
git switch soutenance-v2-fr-notes
git pull
cd soutenance/latex
```

If the branch is not local yet:

```bash
git fetch origin
git switch --track origin/soutenance-v2-fr-notes
cd soutenance/latex
```

## Build

```bash
make slides   # 16:9 presentation PDF
make notes    # speaker view: slide on the left, notes on the right
```

Speaker notes live directly in `main.tex` as native Beamer `\note{...}` blocks, so they remain editable next to each slide. `notes.tex` is only a tiny wrapper that enables `show notes on second screen=right` via `pgfpages`.

All literature citations used in the deck are drawn from the thesis bibliography. `references.bib` is a presentation-sized subset of the original report bibliography; no new external references were introduced.
