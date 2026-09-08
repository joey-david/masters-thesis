# Soutenance — LaTeX / Beamer

Editable Beamer version of the thesis defense.

## Files

- `main.tex` — slides + French speaker notes (`\note{...}`)
- `notes.tex` — presenter build: slide on the left, notes on the right
- `references.bib` — references used by the deck; restricted to the thesis bibliography
- `assets/` — report-figure crops used in the experimental slides
- `assets/papers/` — vector crops of the original Figure 1 of Vaswani et al. (2017, p. 3), Hu et al. (LoRA, arXiv:2106.09685v2, p. 1) and Dettmers et al. (QLoRA, arXiv:2305.14314v1, p. 3), used on the foundational slides
- `generate_assets.py` — reproducibly regenerates all assets from the final report and deterministic classical Transformer / LoRA / QLoRA / quantization diagrams
- `Makefile` — reproducible builds

## Build

On macOS / BasicTeX, install the two non-core TeX dependencies once:

```bash
sudo tlmgr update --self
sudo tlmgr install fira biber
```

Then:

```bash
make slides   # soutenance.pdf
make notes    # soutenance-notes.pdf
```

Or both:

```bash
make all
```

If a previous failed `latexmk` invocation is cached:

```bash
make clean
make slides
```

## Regenerate illustrations / report crops

The generated assets are committed, so this is **not required** for a normal build. To regenerate them:

```bash
python3 -m pip install matplotlib numpy pymupdf
make assets
```

`generate_assets.py` expects `masters_thesis_joey_david_final.pdf` at the repository root. The classical diagrams are adaptations of the mechanisms cited on their slides (Vaswani et al. for Transformers, Hu et al. for LoRA, Dettmers et al. for QLoRA); they are kept outside Beamer layout logic so the foundational explanations remain visually stable.

## Deck structure

The main narrative contains 65 slides before backup material. Experiments are intentionally expanded into question/design, result(s), and scientific-transition slides. Literature citations are placed directly on relevant slides in a small footer; the full cited-reference list is retained in backup.

The experimental result slides heavily reuse the figures and visual flow of the thesis report rather than re-describing the results as text.
