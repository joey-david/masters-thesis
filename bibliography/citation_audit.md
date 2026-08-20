# Citation audit

No paper should be cited in the thesis until it passes this audit. This file is deliberately stricter than `references.bib`.

For every candidate reference, record:

- canonical title;
- full author list or verified citation export;
- year;
- publication venue and status (`published`, `accepted`, `preprint`, `withdrawn`, etc.);
- DOI / arXiv ID / ACL Anthology / proceedings URL;
- primary source used for verification;
- exact claim for which the thesis cites the work;
- exact section where it is relevant;
- whether the thesis claim is directly stated by the paper or is our interpretation;
- any caveat needed to prevent overstatement.

## Status labels

- `VERIFIED` — existence, metadata, and cited claim checked against a primary source.
- `METADATA VERIFIED` — paper exists and metadata checked, but the exact scientific claim still needs inspection.
- `PREPRINT` — verified preprint; do not imply peer-reviewed publication.
- `WITHDRAWN` — paper/submission exists but was withdrawn; cite status accurately if still scientifically relevant.
- `REJECT` — title exists but does not support the intended claim or is not relevant enough to include.

## Section III candidate families

### Foundations

- LoRA — verify ICLR 2022 publication and the exact low-rank update formulation.
- QLoRA — verify NeurIPS 2023 and details relevant to NF4 / frozen quantized backbone.
- AdaLoRA — only if adaptive rank allocation is directly compared conceptually.

### Adapter / quantized fine-tuning compression

- LQ-LoRA — verify publication status and what object is quantized.
- QA-LoRA — verify ICLR 2024 and distinguish quantization-aware adaptation from post-training adapter compression.
- LoftQ — verify ICLR 2024 and relevance to initialization / quantization-aware LoRA.
- ApiQ — verify status and exact contribution before inclusion.
- ParetoQ — only if needed for broader low-bit quantization context.
- LoRAQuant — verified existence as arXiv:2510.26690; OpenReview status previously observed as withdrawn for ICLR 2026. Re-check before final citation and do not call it an accepted ICLR paper.
- "How Many Bits Can an Adapter Write? Measuring the Capacity and Memorization of Parameter-Efficient Fine-Tuning" — verified existence as arXiv:2607.21351 (July 2026); re-check authors/claims from primary PDF before adding BibTeX.

### Information / coding

- Minimum Description Length references — use a foundational source only where the formal concept is genuinely needed.
- Prequential coding / online coding — verify exact source used for behavioral/data codelength arguments.
- Rate–distortion theory — foundational reference if the mathematical analogy is used explicitly.
- Compression-based generalization/PAC-Bayes papers — include only if directly used, not as decorative theory.

## Section IV candidate families

### Chain-of-thought and mechanistic representation analysis

- Chain-of-Thought Prompting Elicits Reasoning in Large Language Models — verify NeurIPS 2022.
- Dutta et al., "How to think step-by-step: A mechanistic understanding of chain-of-thought reasoning" — verify primary publication/status and exact layer/path claims.
- Sun et al., "LLM Reasoning as Trajectories: Step-Specific Representation Geometry and Correctness Signals" — previously verified as ACL 2026 long paper; re-check exact metadata and the ROC-AUC claim before BibTeX.

### State / boundary / information-peak work

- Qian et al., "Demystifying Reasoning Dynamics with Mutual Information: Thinking Tokens are Information Peaks in LLM Reasoning" — previously verified as NeurIPS 2025; inspect exact MI construction and what is claimed about thinking tokens.
- Yu et al., "Explainable Chain-of-Thought Reasoning: An Empirical Analysis on State-Aware Reasoning Dynamics" — primary ACL record indicates Findings of EMNLP 2025; do not reproduce any local filename/year mismatch.

### Causal hidden-state evidence

- Mehrafarin et al., "When Chain-of-Thought Fails, the Solution Hides in the Hidden States" — verify primary venue/status and exact activation-patching result.

### Continuous / latent reasoning

- Coconut, "Training Large Language Models to Reason in a Continuous Latent Space" — verify publication status and exact latent-feedback mechanism.
- "Do Latent Tokens Think? A Causal and Adversarial Analysis of Chain-of-Continuous-Thought" — verify status and exact critique before using as counterpoint.
- "Equilibrium Reasoners: Learning Attractors Enables Scalable Reasoning" — verify 2026 status and task-conditioned attractor claim.

### CoT compression

- "Chain Of Thought Compression: A Theoritical Analysis" — verify title spelling, arXiv/venue status, and exact theoretical claim before use.
- Other CoT-compression papers only if they directly motivate an objective used in our thought-unit experiments.

## Verification procedure

1. Prefer official proceedings / ACL Anthology / OpenReview / publisher / arXiv abstract + PDF.
2. Check the paper itself for the exact claim; do not rely on search-result summaries.
3. If a result number is cited, find the table/figure/section containing it.
4. If venue status differs across sources, report the most precise current status.
5. If only a preprint exists, say so.
6. Re-run the metadata check immediately before thesis submission for 2025–2026 papers whose status may have changed.
