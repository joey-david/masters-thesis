# Contribution map

Working ownership assumption supplied for the thesis build:

- Unless an idea is explicitly present in the original internship offer / directive, or explicitly attributed in historical branch notes, treat the research and implementation decisions as Joey's own contribution.
- Ideas explicitly marked as coming from Paul Caillon or another supervisor/collaborator must be attributed accordingly.
- This file should be tightened as branch archaeology uncovers explicit attribution.

## Fine-tuning compression

### Given / contextual

- Broad internship problem around information-theoretic limits / rate–distortion of quantized fine-tuning: check exact wording against the original directive before writing the contribution statement.

### Candidate own contributions to foreground

- Operationalizing adaptation rate beyond LoRA rank / nominal bitwidth.
- Designing matched compressibility and scale pilots.
- Testing LoRA A/B asymmetry as separate functional information budgets.
- Rejecting noisy ARC as a primary distortion axis and moving toward stronger behavioral/verifier metrics.
- Exact serialized artifact rate as the deployment-visible quantity in the later fineQcomp protocol.
- Fixed-checkpoint codec comparison to isolate compression effects.
- Behavioral information axis via held-out prediction bits.
- Adaptive MDL/reconstruction-aware allocation experiment and interpretation of its negative result.
- Diagnosing RMSE/behavior mismatch and row-dropping failure.
- Compute-matched distinct-information campaign and R*(tau) formulation.
- Experimental corrections with scientific consequences: cache contamination, validation opportunity bias, rate-ladder resolution, dataset-information proxy.

## Reasoning trajectories

### Candidate own contributions to foreground

- Building the trajectory capture / analysis methodology required for the hypotheses.
- Turning exploratory visual analysis into explicit H1–H5 falsification tests.
- Solution-object hypothesis and tests, unless historical notes explicitly attribute the proposal elsewhere.
- Objective-relative thought-unit formulation and the no-free-lunch evaluation across multiple utilities.
- Strong-adversary supervised transfer tests preventing an overclaim of "no structure".
- Replication across model families and boundary budgets.
- Causal/process-isomer experiments and interpretation of nulls.
- Native state-materialization tests and distinction between decodability and interchangeability.
- Explicit finite-rate state-interface construction, rate controls, recursive reuse tests, semantic-code equivalence analysis, stress tests, and closure-vs-endpoint comparison, subject to branch attribution audit.

## Unification

Treat as Joey's synthesis unless historical evidence says otherwise:

- Shared view of fine-tuning update rate and reasoning-state rate as constrained channels carrying task-relevant information.
- Distinction between representational distortion and behavioral distortion as a recurring methodological lesson.
- Utility-relative trajectory description length as a proposed research object.
- Cross-experiment proposal: compare the adapter rate required to preserve behavior with the rate required to preserve internal reasoning structure.

## Attribution audit checklist

Before final prose:

- [ ] Read original internship offer/directive and quote the exact initial questions internally.
- [ ] Search every relevant `reasoning-trajectory-private` branch for `Paul`, `Caillon`, `Alexandre`, `Allauzen`, `supervisor`, `suggested`, `idea`, `proposal`, `discussion`, and similar attribution language.
- [ ] Inspect commit diffs around first introduction of state materialization, handoff, and closure training.
- [ ] Mark each headline experiment as `given`, `Joey`, `joint`, or `unclear`.
- [ ] Use conservative wording where provenance cannot be established.
