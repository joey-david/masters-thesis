# Speaker notes — target: 22–24 minutes

These are oral cues, not slide text.

| # | Slide | Time | Oral emphasis |
|---|---|---:|---|
| 1 | Title | 0:40 | Thesis question; two seemingly different research tracks; common information constraint. |
| 2 | One question, two channels | 1:15 | Training-time adapter channel vs inference-time state channel; receiver and utility always specified. |
| 3 | Research trajectory | 1:10 | Chronology matters because negative results produced the next experiment. Do not narrate every month equally. |
| 4 | Fine-tuning rate | 1:20 | Rank is architecture; serialized bits are rate. One fixed checkpoint, multiple representations. |
| 5 | R*(0.90) | 1:00 | Explain retained gain once; 90% is an operating point, not a theoretical constant. |
| 6 | Weight error failure | 1:00 | Lower RMSE can preserve less behavior. Key pivot from weight-space distortion to receiver output. |
| 7 | Distinct content | 1:10 | Controlled exposure; broad scaling signal; still only a proxy. |
| 8 | Receiver dependence | 1:20 | Strongest intuitive result from Part I: corpus ordering changes across base models. |
| 9 | Correction geometry | 1:30 | Gradient factorization intuition; requested corrections depend jointly on data and frozen model; promising, not a law. |
| 10 | Part I summary | 0:50 | Fast recap; transition to reasoning. |
| 11 | Solution-object hypothesis | 1:15 | Initial discrete-state picture; four criteria that should align if it is real. |
| 12 | No universal partition | 1:25 | High AUC means structure exists; poor overlap means structure is utility-specific. |
| 13 | Snapshot information ≠ memory | 1:20 | Exact control removes LLM ambiguity; same initial information, different update dynamics, huge regret gap. |
| 14 | Native handoff | 1:20 | Model can infer state; one-pass routing/composition collapses; explicit handoff restores performance. |
| 15 | Reusable explicit state | 1:20 | Capacity, stable naming, closure; emphasize necessity vs sufficiency. |
| 16 | Local vs global reliability | 1:05 | 89% sounds good locally; catastrophic over repeated self-fed updates. |
| 17 | Bridge experiment | 1:30 | Reasoning vs answer rates reverse across receivers; direct link between the two thesis halves. |
| 18 | Three takeaways | 1:10 | End on receiver-relative useful information; leave limitations/future work for Q&A unless asked. |

**Total:** about 22:45 before questions.

## Q&A reserve

Likely questions:

- Why 90% retention? → comparable operating point; conclusions checked on full curves where thresholding hides detail.
- Why bits per LoRA value? → normalized serialized rate for comparing checkpoints; whole-file size still tracked.
- Is correction log-volume causal? → no; current predictive candidate, prospective replication still needed.
- Do objective-dependent boundaries imply no meaningful reasoning steps? → no; they imply no single utility-independent partition under tested objectives.
- Why synthetic state tasks? → exact state semantics and transition rules isolate representation/update failures from generation and judging noise.
- Does 89% local accuracy mathematically explain 7.92% global? → compounding is the mechanism, but errors are not assumed independent; self-fed evaluation is the empirical quantity.
