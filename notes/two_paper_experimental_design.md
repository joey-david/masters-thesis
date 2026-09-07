# Experimental design for two papers

This note fixes what each experiment can answer. It does not promote a running job or a passed smoke test to a result.

## Live campaign — 2026-09-02

- **Paper 1, matched reasoning traces:** complete. The [locked design](../../fineQComp/results/3_chain_of_thought_under_compression/gsm_symbolic_transfer_lock.json) and [complete summary](../../fineQComp/results/3_chain_of_thought_under_compression/gsm_symbolic_transfer_summary.json) cover 105,000 predictions: three base models, three adapter seeds, aligned versus problem-permuted rationales with the same answer targets, and 5,000 official GSM-Symbolic items. The aligned-minus-permuted gap is 0.5862, with a template-bootstrap 95% interval of [0.5304, 0.6410]; all nine model-seed cells are positive.
- **Paper 2, matched replay allocation:** complete, with a failed confirmation recorded in the [prospective lock](../../reasoning-trajectory-private/experiments/state_interface_replay_confirmation_lock.json) and [result ledger](../../reasoning-trajectory-private/experiments/state_interface_replay_confirmation_result.json). The exploratory seed gave a 0.1521 horizon-16 mixed-minus-endpoint gap, but its original conjunction failed because full transition replay did not beat 50/50 replay. Of three fresh initial seeds, one failed the fixed horizon-2 competence gate, one was already perfect and showed no treatment effect, and one showed a 0.2750 gap (paired context interval [0.1813, 0.3729]). The locked three-fresh-seed claim therefore fails. Cross-arm consumer swaps preserve accuracy, so a private decoder convention does not explain the effect. The supported result is conditional: replay allocation can change long-run reasoning when closure has headroom, but the current runs do not establish a uniform effect or a predictor of that effect.
- **Natural support for Paper 2:** complete MuSiQue summaries live under [Qwen](../../reasoning-trajectory-private/runs/Qwen2.5-7B-Instruct/interventions/musique_state_reuse/evaluation/natural_state_reuse/summary.json) and [Mistral](../../reasoning-trajectory-private/runs/Mistral-7B-Instruct-v0.3/interventions/musique_state_reuse/evaluation/natural_state_reuse/summary.json). They separate state-content use, decode accuracy, one-step use, and self-update loss; the controlled replay run tests the update-allocation mechanism.

No further replay jobs were launched after reading these outcomes. Claude's post-result review called for a new study with run-level replication and a scrambled-transition control. That would test a new, post-hoc conditional claim, so it needs its own literature pass, competence-qualified start states, and prospective lock rather than an extension of this campaign.

## Literature boundary

### Fine-tuning information

Prior work already studies adapter capacity, rank allocation, and gradient-based rank choice. The closest papers are [How Many Bits Can an Adapter Write?](https://arxiv.org/abs/2607.21351), [AdaLoRA](https://openreview.net/pdf?id=lq62uWRJjiY), [GoRA](https://proceedings.neurips.cc/paper_files/paper/2025/hash/a5e4907a40c0dcb8433a35c714ba9d79-Abstract-Conference.html), [Flora](https://proceedings.mlr.press/v235/hao24a.html), and [Gradient Intrinsic Dimensionality](https://proceedings.iclr.cc/paper_files/paper/2026/hash/5b4b967d4222d87fa5b28b6ec7144058-Abstract-Conference.html). A paper cannot claim that adapter architecture affects capacity. The open claim is narrower: a measurement of the correction requested from a fixed base model predicts the exact serialized rate needed to retain the learned change on an unseen receiver–corpus pair.

### Reusable reasoning states

Linear decoding is already known not to prove causal use; see [Amnesic Probing](https://arxiv.org/abs/2006.00995) and [Baked-in State Probing](https://aclanthology.org/2022.findings-emnlp.397/). Explicit Markov-like reasoning and reusable state structures also exist; see [Markovian Transformers](https://arxiv.org/abs/2404.18988), [State Commitment Learning](https://arxiv.org/abs/2606.05201), [Atom of Thoughts](https://openreview.net/pdf?id=qXSFkP0ELS), and [Holistic Prompting](https://openreview.net/pdf?id=pAIB6Odtsu). Holistic Prompting already defines self-contained, Markov-like states for cross-problem reuse, so neither that representation nor reuse itself is new. [Why Knowing Both Hops Is Not Enough](https://arxiv.org/abs/2608.07261) also shows in a controlled symbolic setting that a correct bridge representation can fail to support the next hop and that recurrent use of shared blocks improves reuse. The open claim is narrower: on natural multi-hop questions, decode accuracy, one-step use, semantic robustness, and closure under self-updates are distinct, measurable properties, and their measured errors predict failure over repeated updates.

## Paper 1 — the rate of a requested correction

### Claim ladder

1. **Receiver dependence.** With the corpus, row count, optimizer, adapter, seed set, and codec fixed, the required rate changes with the base model.
2. **Correction dependence.** A frozen, pre-fine-tuning correction measure orders receivers better than tokenization cost and base loss do on the same corpus.
3. **Prediction.** Coefficients frozen on development data predict (R^*(0.90)) for new base-model and corpus pairs.
4. **Adapter allocation.** At a fixed file budget, trained rank and value precision trade off; bits/value alone does not choose the best adapter design.

Claims 1–2 are development results. Claim 3 is the paper gate. Claim 4 can strengthen the design section but must not replace claim 3.

### Experiment A — transposed receiver panel

- Existing owner: [`transposed_receiver_panel.yaml`](../../fineQComp/configs/transposed_receiver_panel.yaml).
- Grid: three fixed corpora, seven receivers, three training seeds, rank-16 all-linear LoRA, one exact codec ladder.
- Structural exclusion: Qwen3/math saturated the base-task gate at all seeds. Report it as “no correction requested,” not as random missing data and not as (R^*=0).
- Outcome: smallest exact reloadable serialized rate in bits per adapter value that retains 90% of the best held-out NLL gain. Also report (R^*(0.50/0.75/0.95)) and total file bits at (R^*(0.90)).
- Frozen primary predictor: `dataset_fisher_log_volume`.
- Controls: relative tokenizer fertility, base NLL, correction-channel bits, text redundancy, trainable parameter count, and achieved gain. The last two diagnose size and gain confounds; they are not prospective predictors.
- Analysis unit: receiver–corpus arm, after averaging three training seeds. Never count 60 seed cells as 60 independent model–corpus pairs.
- Prediction check: leave one receiver out, fit corpus intercepts plus one common predictor slope, then pool out-of-fold receiver ranks within corpus.
- Fixed paired checks: Qwen2.5 versus Qwen2.5-Math and Gemma-2 base versus instruction-tuned, on each shared corpus.
- Locked success: the correction predictor must beat tokenizer fertility by at least 0.10 in pooled within-corpus Spearman and 0.10 in receiver-pair sign accuracy.
- Limit: these outputs existed before the analysis lock. Passing supports receiver-axis signal but not a prospective claim.

### Experiment B — rank versus precision

- Existing owners: [`budget_matched_rank.yaml`](../../fineQComp/configs/budget_matched_rank.yaml) and [`rank_frontier.py`](../../fineQComp/src/fineqcomp/rank_frontier.py).
- Phase 1 uses 12 existing rank-16 adapters: two receivers × two corpora × three seeds. SVD truncate to ranks 1/2/4/8, run the existing exact codec, and compare with the existing random rank mask at matched file size. No training.
- Phase 2 runs only if phase 1 beats random masking in at least three of four receiver–corpus blocks and the block–seed interval for mean gain excludes zero.
- Phase 2 trains ranks 4 and 8 only (24 jobs) and reuses the existing rank-16 runs. Its primary comparison is directly trained rank 8 versus byte-matched rank-16 pruning, always normalized by the rank-16 raw gain.
- Locked success: at least five retained-gain points, an interval above zero, and wins in at least three of four blocks.

### Experiment C — untouched prospective test

Run this only if Experiment A’s frozen correction predictor clears its receiver-axis gate.

- Audit Jean-Zay’s shared store, then lock two base models absent from all development fits and two corpora absent from all candidate selection.
- Prefer established datasets with direct prompt/response fields and existing evaluators. Add only thin converters through the current data library.
- Measure every predictor before fine-tuning and write predictions for all 2 × 2 pairs before any adapter run.
- Use three training seeds and the same rank-16 adapter, row count, optimizer, exact codec ladder, and (R^*) definition: 12 jobs total.
- Primary score: prospective RMSE and receiver/corpus-pair ordering of the frozen predictions. Compare with coefficients frozen for base NLL and token count. Do not refit on the 12 test outcomes.
- Required claim: useful error reduction on both new models and both new corpora. One good pair or one seed is not enough.

## Paper 2 — decode accuracy is not repeated reuse

### Experiment A — natural multi-hop state reuse

- Benchmark: all 2,417 answerable development questions from [MuSiQue](https://aclanthology.org/2022.tacl-1.31/), using the official conversion at commit `922ac98f19a201998dbdae6d7f2887a5258dbdeb`.
- Models: Qwen2.5-7B-Instruct and Mistral-7B-Instruct-v0.3.
- At hop (t), expose only the current supporting paragraph, the official subquestion, and the supplied state. Empty and plausible wrong-state arms test whether the paragraph shortcuts the state.
- Gold state arms: canonical JSON, a fixed aliased JSON schema, full question-answer history, lossy state with exactly referenced slots masked, empty state, and another same-depth item’s answers.
- Self-update arms: canonical, alias, and history states updated only from the model’s prior parsed outputs.
- Direct control: final question with all supporting paragraphs.
- Decode and continuation use separate generations. The decoder cannot write an answer trace that helps the continuation call.
- Scores: standard SQuAD exact match/F1, strict JSON validity, exact state decoding, next-step accuracy conditional on correct decoding, final accuracy, full-trajectory exactness, prompt tokens, and cumulative exactness at hops 1–4 on the same four-hop questions.
- Analysis unit: MuSiQue question. Pair all contrasts by question and cluster every interval by question.
- Validity gate: direct F1 ≥ 0.30, gold-canonical final F1 ≥ 0.40, and canonical beats both empty and wrong state by ≥ 0.05 F1. If this fails, the task does not identify state use.
- Claim tests: canonical versus lossy/empty/wrong for relevant information; canonical versus alias/history with token length reported for representation robustness; gold versus self for closure; hop-prefix curves for accumulated failure.
- Limit: this tests explicit textual state, not latent neural state.

### Reliability statement to test, not overclaim

Let (d_t) be the chance that the decoded carried state differs from the task-sufficient state after update (t). If a valid state update fails with chance at most (e_c), one-step use fails with chance at most (e_u), and the initial decode error is (d_0), a coupling/union argument gives a terminal behavior gap no larger than

\[
d_0 + H(e_c + e_u).
\]

If the ideal update contracts state errors by a factor (a<1), the state term tightens to

\[
d_H \leq a^H d_0 + e_c\frac{1-a^H}{1-a}.
\]

This is a standard finite-horizon error bound, close in form to simulation lemmas and approximate information-state results; see [Approximate Information States](https://www.jmlr.org/papers/volume23/20-1165/20-1165.pdf) and the [Tight Simulation Lemma](https://arxiv.org/abs/2406.16249). The possible contribution is an empirical decomposition that predicts the observed self-update curve. The bound alone is not a new theorem.

### Decision after MuSiQue

- If the state-use gate passes and self-update loss tracks the measured decode/use/closure terms, replicate on one longer natural process before a strong long-horizon claim.
- If decode stays high while conditional use or self-update reliability falls, center the paper on reusable-state conditions.
- If empty/wrong controls match canonical state, MuSiQue cannot support the causal claim. Keep the negative result and move to the broader “From Chains to Trajectories” framing rather than inventing a more complex assay to force the thesis.
