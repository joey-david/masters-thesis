# Figure and table plan

This is an evidence inventory, not a promise that every item belongs in the final report. Prefer figures that expose a research decision or falsify a hypothesis; move diagnostic visualizations to an appendix.

## Introduction

### Figure I.1 — internship research trajectory

- Type: diagram / timeline.
- Message: the internship is one evolving research program, not two unrelated projects.
- Content: May information-rate pilot → June/July trajectory hypotheses → July objective-relative state → state handoff → late-July/August exact-rate return → unification.
- Status: to create.

## Technical background

### Figure II.1 — LoRA as shared-side-information update

- Type: diagram.
- Show frozen weight W, low-rank A/B factors, effective update BA, parameter dimensions, and which information must actually be transmitted when the base model is shared.
- Status: to create.

### Table II.1 — recurring experimental quantities

- Type: table.
- Rows: nominal rank, nominal bits/value, serialized rate R(A), held-out NLL bits saved, behavioral retention, R*(tau), reconstruction RMSE, trajectory utility metrics.
- Status: to create.

## Fine-tuning compression

### Figure III.1 — experiment pipeline

- Type: diagram.
- Dataset → training → fixed raw adapter → codec ladder → serialized artifact → reload → held-out/task evaluation.
- Essential: yes.

### Figure III.2 — early rank knee / A-B asymmetry

- Type: small multi-panel or compact table.
- Source: `itft_pilot/results`.
- Purpose: research-history evidence only; show why nominal rank and undifferentiated LoRA capacity became suspect.
- Essential: maybe. Cut if page pressure.

### Figure III.3 — main exact rate–behavior frontier

- Source: `fineqcomp/results/rmse_mdl_lora_vs_quantized_lora/mdl_vs_uniform.png` or regenerated from CSV.
- Essential: yes.
- Re-audit labels/rates before copying.

### Table III.1 — headline codec points

Candidate rows: exact-zero binary control, zero-free binary, adaptive no-drop, adaptive may-drop, LoRAQuant control, uniform 2/3/4-bit, FP16 reference.

Columns:

- exact serialized bits/value;
- retained behavior;
- adapter RMSE;
- held-out bits saved/token;
- notes (row dropping, etc.).

Source: committed result CSV; re-audit exact numbers.

### Figure III.4 — RMSE versus behavioral retention

- Type: scatter.
- Essential: yes.
- Headline annotation: reconstruction-aware adaptive point with lower RMSE but catastrophic behavior versus the fixed binary point.
- Scientific message: weight-space distortion is not sufficient to predict behavioral distortion.

### Figure III.5 — row-drop failure

- Type: compact line/bar figure.
- x: dropped-row fraction or target rate.
- y: retained behavior.
- Essential: optional if III.4 already carries the message.

### Figure/Table III.6 — exact rate decomposition

- Type: stacked bar or table.
- Payload, scales, metadata, compression/container overhead.
- Purpose: demonstrate why nominal bitwidth is not the measured rate.

### Figure III.7 — dataset information versus R*(0.90)

- Type: scatter/line with seed uncertainty.
- x candidates: unique-row count, LZMA corpus code length, stronger prequential/data-information estimate if completed.
- y: behavioral R*(0.90).
- Essential: yes if campaign completes cleanly; otherwise label as ongoing and move inference to V.

### Table III.2 — experimental-design corrections

Potential compact table if useful:

- issue;
- why it biased interpretation;
- correction;
- effect on final protocol.

Only include scientifically meaningful issues: cache contamination, validation opportunity bias, compute matching, rate resolution, dataset-information proxy.

## Reasoning trajectories

### Table IV.1 — H1–H5

Columns:

- hypothesis;
- decisive statistic/intervention;
- result;
- interpretation.

Essential: yes. Replaces five long subsections.

### Figure IV.1 — distributed update statistics

- Matched-window path percentile.
- Peak share.
- Effective width.
- Net/path ratio.
- Compare SmolLM and Qwen when possible.
- Essential: yes or merge into Table IV.1.

### Figure IV.2 — raw geometry versus supervised decoding

- Type: paired bars.
- Raw cosine AUC versus supervised projection AUC.
- Both model families.
- Essential: yes.
- Message: negative canonical-geometry result is not a claim of no encoded structure.

### Figure IV.3 — objective × segmenter matrix

- Type: heatmap.
- Source: thought-unit objective matrix.
- Essential: yes; likely headline figure of the first half of IV.

### Figure IV.4 — cross-objective regret matrix

- Source: `regret_matrix.png` or regenerate.
- Essential: yes unless redundant with IV.3.

### Figure IV.5 — one trace, several valid partitions

- Type: qualitative boundary overlay.
- Same reasoning trace with answer/object/correctness/compression boundaries.
- Essential: highly desirable for non-specialist readers.

### Figure IV.6 — supervised boundary transfer

- Type: heatmap.
- Rows: training ontology; columns: evaluation ontology/prompts.
- Purpose: show in-domain learnability and weaker cross-objective transfer.
- Essential: optional depending on space.

### Table IV.2 — SmolLM/Qwen replication

- Oracle overlap / Jaccard.
- Best maximin score.
- Selected segmenter objective scores.
- Supervised diagonal AUCs.
- Keep Qwen correctness ceiling caveat visible.

### Figure IV.7 — native state materialization / factorization

- Source: state-handoff paper figure `01_native_factorization.png` if the evidence audit confirms interpretation.
- Essential: yes if later state-interface work is a major result.

### Figure IV.8 — explicit state handoff

- Source: `02_explicit_handoff.png`.
- Purpose: make interface construction understandable before rate results.

### Figure IV.9 — finite rate capacity

- Source: `03_rate_capacity.png` / underlying results.
- 2/3/4-bit interface results across recursion horizons.
- Essential: yes.

### Figure IV.10 — closure training

- Source: `04_closure_training.png` / underlying paired evaluation.
- Compare matched transition-closure and endpoint-only supervision.
- Essential: yes if result survives audit.

### Figure IV.11 — local versus global reliability

- Source: `06_local_global_reliability.png`.
- Message: high local transition accuracy can still compound into poor long-horizon answers.
- Essential: useful; possibly combine with IV.10.

### Figure IV.12 — distribution shift / stress

- Source: `05_distribution_shift.png`.
- Optional; likely appendix unless it materially qualifies the headline interface claim.

### Figure IV.13 — causal specificity / confirmation

- Type: forest plot or compact table.
- Only if evidence is clean enough to support a specific claim.

## Unification

### Figure V.1 — unified information flow

- Type: conceptual diagram.
- Training: I(D) → R(A)/W(A;D) → behavior.
- Inference: history/trajectory → C_U(T) or interface rate → behavior.
- Mark empirical quantities versus proposed quantities visually.
- Essential: yes.

### Table V.1 — common methodological lesson

Rows:

- nominal size versus task-relevant information;
- representation distortion versus behavioral distortion;
- decodability versus causal sufficiency;
- utility-specific versus canonical representation.

Columns: fine-tuning evidence, trajectory evidence, remaining uncertainty.

### Figure V.2 — adapter rate versus reasoning structure

- Proposed/TODO experiment.
- Sweep compressed adapter rate and show separate thresholds for task behavior, operation decoding, and trajectory geometry.

### Figure V.3 — utility-relative trajectory rate–distortion

- Proposed/TODO experiment.
- Separate frontiers for answer preservation, symbolic state, correctness prediction, causal equivalence.

## Figures to avoid in main text by default

- Generic PCA/t-SNE projections without a precise hypothesis.
- Screenshots of web tooling/UI.
- Large grids of every codec point when one frontier plus a compact table suffices.
- Separate full-page plots for every H1–H5 result.
- Engineering/debugging plots that did not change a scientific decision.
