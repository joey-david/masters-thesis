# Internship research timeline

This file is an evidence-first reconstruction of the internship. It is not thesis prose. Dates and claims should be refined against commit diffs, experiment reports, and historical notes before being promoted into the report.

## Phase 0 — starting question and information-theoretic fine-tuning pilot

### By 21 May 2026 — `itft_pilot`

Evidence: `joey-david/itft_pilot`, especially `progress.md`, `todo.md`, result artifacts, commit `e0db51bd421dd0ccdbf2fc5bff69599b95139af6`, and the repository-root flattening commit `f6079a61f8cb4f347431e1ce277e8e63bee993ec`.

Research framing already present in the snapshot:

- Treat quantized fine-tuning as a rate–distortion problem with distinct backbone rate, adaptation/update rate, and downstream distortion.
- Do not equate nominal LoRA rank with the amount of useful information written by adaptation.
- Measure dataset compressibility alongside adapter capacity.
- Eventually study a 2-D backbone-bits × update-bits surface; use 4-bit QLoRA as the initial fast pilot.

Experiments and decisions recorded on 21 May:

- Built a LoRA/QLoRA sweep over Alpaca and Dolly variants, LoRA ranks, held-out SFT loss, ARC-Challenge sanity checks, and gzip dataset code length.
- Qwen2.5-0.5B pilot: most held-out-loss improvement occurred from rank 0 to rank 2, with diminishing returns thereafter.
- ARC on the small verifier sample was noisy/flat; decision: held-out adaptation loss was the more sensitive distortion signal, and later work should move toward verifier-grounded tasks rather than over-interpret ARC.
- Dataset variants tested base, duplicate, and template-regularized corpora. Duplicate data reduced gzip codelength but did not produce a clean enough causal manipulation of information content; template variants introduced format shift and were recognized as an imperfect control.
- Qwen2.5-1.5B scale confirmation reproduced the broad rank knee.
- A/B asymmetry pilot: A-only training was near baseline while B-only recovered much of full-LoRA performance, motivating treatment of the two factors as functionally distinct rather than one undifferentiated rank budget.
- Planned next step: verifier-native distortion such as deterministic instruction following, code execution, or SQL rather than further ARC-only probing.

Interpretive value for thesis:

- This is the true beginning of the internship line later rebuilt as `fineqcomp`.
- The important story is not the small-model numbers themselves but the progressive sharpening of the question: nominal rank and weak downstream benchmarks were inadequate operationalizations of information written by fine-tuning.

## Phase 1 — reasoning trajectories and latent state hypotheses

### Early June 2026 onward — `reasoning-trajectory-private`

Evidence source: full branch/commit archaeology still in progress. Do not assign exact dates below until checked commit-by-commit.

Initial methodological phase:

- Built generation + hidden-state capture pipeline for reasoning traces.
- Added token/sentence alignment, correctness scoring, symbolic-update extraction, trajectory metrics, projections and interactive/visual analysis.
- Early exploratory question: do textual boundaries coincide with latent state transitions, and do reasoning trajectories contain localized solution-object updates?

Scientific shift:

- Move from visualization toward explicit falsifiable hypotheses H1–H5.
- Text/latent-boundary tests found weak evidence for sharp canonical boundaries.
- Localized-update tests found distributed, direction-changing activity rather than isolated latent spikes.
- Process-isomer causal patching did not establish a portable context-independent solution object.
- Raw geometry was weak for operation identity, while supervised projections decoded operations strongly: evidence for latent structure, but not naturally exposed canonical geometry.
- Sentence-level summaries predicted correctness better than the proposed latent segmentations in the tested setup.

### 2 July 2026 — objective-relative thought units

Evidence: main-branch commit `f51dc20d30adcd6a06b6d7666115c977210a5fff`, "Add objective-relative thought unit experiments", plus `lit/thought_units.md` and linked artifacts.

Core reformulation:

- Replace the search for one canonical thought-unit partition with a stronger question: is any context-free partition jointly privileged for answer information, symbolic-object updates, correctness prediction, latent-trajectory compression, and causal usefulness?
- Prespecified evidence against canonicality: rank reversals, cross-objective regret, low oracle overlap, and transfer failure.
- SmolLM and Qwen replication showed strong objective dependence.
- Strong supervised in-domain boundary predictors demonstrated that the negative result is not "no latent structure": useful ontologies are learnable, but differ by objective.

Research conclusion at this point:

- Useful decompositions exist.
- Evidence does not support a single context-free sentence-lattice decomposition that is canonical across the tested utilities.

## Phase 2 — from native state to explicit reusable interfaces

### July 2026 — branch work after the thought-unit result

Evidence: `reasoning-trajectory-private` side branches, especially `causal-state-handoff` and related causal/state-interface branches. Exact commit-by-commit chronology and attribution still to be audited.

Sequence to preserve in the thesis:

1. Test whether native histories collapse into reusable current states.
2. Observe that explicit state can be highly decodable while implicit endpoints retain path information and fail clean composition/interchange tests.
3. Run first-wave causal interventions; identify that some null tests patched a convenient marked boundary rather than the actual state-bearing location.
4. Refine interventions toward actual result/correction spans, matched/mismatched donors, bandwidth controls, and state-bearing tokens.
5. Introduce an explicit, rate-limited state handoff rather than assuming native hidden states already implement a reusable state contract.
6. Sweep finite interface rates and test recursive reuse / closure.
7. Distinguish exact code-token identity from semantic equivalence under downstream behavior.
8. Stress interfaces out of the matched positional template; observe compounding of locally valid but globally wrong transitions.
9. Compare transition-closure training against matched endpoint-only supervision; large long-horizon advantage for closure training in the current one-seed controlled algebra setup.

Scientific value:

- Native decodability is not enough for modular interchangeability.
- A reusable state interface can be deliberately trained/constructed and exhibits a finite-rate capacity limit.
- Local transition reliability and long-horizon reasoning accuracy are different quantities; small transition error compounds recursively.

Limitations to foreground:

- Restricted synthetic/addition algebra in the strongest handoff experiments.
- Some headline closure results currently use one seed.
- Explicit interface results should not be presented as evidence that unconstrained pretrained CoT naturally factorizes into such states.

## Phase 3 — return to fine-tuning compression with stricter measurement

### 31 July 2026 onward — `fineqcomp`

The new repository is a methodological reset/continuation of the May pilot rather than the origin of the research question.

Major refinements:

- Define update rate using actual serialized decoder-visible adapter artifacts rather than nominal bitwidth or rank.
- Hold the trained adapter checkpoint fixed across codec points so compression, not retraining variance, generates the rate–distortion frontier.
- Reload serialized artifacts before evaluation.
- Separate behavioral information (held-out prediction bits saved) from artifact size and weight reconstruction error.
- Use exact task metrics as behavioral anchors and held-out NLL/code savings as a cheaper dense axis after cross-validation.

### Adaptive MDL / reconstruction-aware allocation campaign

Headline negative result to re-audit from committed result artifacts before thesis inclusion:

- A reconstruction-aware adaptive codec did not dominate simple fixed-rate controls behaviorally.
- A decisive counterexample showed better adapter-weight RMSE paired with drastically worse retained task behavior than a slightly higher-RMSE fixed codec.
- Therefore global weight reconstruction error is not a sufficient proxy for behavioral distortion; the distribution/location of error matters.
- Row dropping was particularly destructive.

Methodological corrections visible in commit history:

- Exact rate accounting and codec ladder corrections.
- Detection/removal of silent cache contamination.
- Fixed compute matching across dataset-information arms.
- Fixed checkpoint-selection / validation-opportunity bias caused by different epoch structures.
- Replaced row count alone with independently measured dataset-information proxies.
- Added dense 1–2 bit interpolation because the behavioral threshold R* lies inside that range.

### Current dataset-information campaign — August 2026

Design:

- Hold optimizer updates and total samples seen fixed.
- Vary distinct examples / epochs so unique training information changes substantially while optimization exposure is controlled.
- Measure corpus compressibility with LZMA (plus controls) and behavioral information from held-out NLL.
- Estimate the minimum serialized adapter rate R*(0.90) required to retain a target fraction of learned behavior.

Key intended test:

- Does independently measured information in the fine-tuning dataset predict the minimum useful update description length?

Status:

- Treat all current numbers as provisional until the full seed campaign and result audit are complete.

## Phase 4 — unification

Emerging common question:

- How much task-relevant information must cross a constrained representation to preserve useful behavior?

Two instances studied during the internship:

1. Training-time channel: dataset → parameter update → behavior.
2. Inference-time channel: reasoning history → intermediate state/trajectory representation → downstream reasoning/behavior.

Safe synthesis:

- Nominal representation size is not the same as useful information.
- Low geometric/reconstruction distortion is not necessarily low behavioral distortion.
- A representation sufficient for one utility need not be sufficient for another.

Do not yet claim:

- a theorem connecting update-rate R* to reasoning-state rate;
- that native CoT has a universal minimum state description;
- that the state-handoff synthetic results directly characterize frontier reasoning models on natural tasks.
