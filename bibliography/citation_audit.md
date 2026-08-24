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
- Transformers are Inherently Succinct — verified ICLR 2026 publication; use only for the formal succinctness result and as intuition for treating the frozen transformer as a powerful decoder, not as direct evidence about LoRA fine-tuning.

### Adapter / quantized fine-tuning compression

- LQ-LoRA — verify publication status and what object is quantized.
- QA-LoRA — verify ICLR 2024 and distinguish quantization-aware adaptation from post-training adapter compression.
- LoftQ — verify ICLR 2024 and relevance to initialization / quantization-aware LoRA.
- ApiQ — verify status and exact contribution before inclusion.
- ParetoQ — verified NeurIPS 2025 publication; use for the unified 1/1.58/2/3/4-bit comparison and the reported transition between the <=2-bit and >=3-bit regimes.
- Radio: Rate--Distortion Optimization for Large Language Model Compression — verified ICML 2025 publication; use for the explicit rate--distortion framing of post-training LLM quantization and user-specified size/accuracy targets.
- LoRAQuant — verified existence as arXiv:2510.26690; OpenReview status previously observed as withdrawn for ICLR 2026. Re-check before final citation and do not call it an accepted ICLR paper.
- "How Many Bits Can an Adapter Write? Measuring the Capacity and Memorization of Parameter-Efficient Fine-Tuning" — verified existence as arXiv:2607.21351 (July 2026); re-check authors/claims from primary PDF before adding BibTeX.

### Information / coding

- Minimum Description Length references — use a foundational source only where the formal concept is genuinely needed.
- Prequential coding / online coding — verify exact source used for behavioral/data codelength arguments.
- Rate–distortion theory — foundational reference if the mathematical analogy is used explicitly.
- Compression-based generalization/PAC-Bayes papers — include only if directly used, not as decorative theory.
- Arora et al. 2018 — verified ICML 2018 publication; use for the explicit-compression generalization framework and the intuition that a trained network can admit a substantially shorter behavior-preserving description than raw parameter counting suggests.

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

## References used in the literature review

The following entries passed the audit against the Zotero PDF and, where present, its DOI, proceedings record, OpenReview page, or arXiv identifier. Claims in the report stay at the level stated here.

| Key | Status | Source checked | Claim used |
|---|---|---|---|
| `vaswani2017attention` | VERIFIED, NeurIPS 2017 | arXiv:1706.03762 PDF | Introduces the Transformer architecture based on attention rather than recurrence or convolution. |
| `aghajanyan2021intrinsic` | VERIFIED, ACL 2021 | DOI and PDF | Fine-tuning can succeed in a low-dimensional subspace. |
| `zhu2024asymmetry` | PREPRINT | arXiv:2402.16842 PDF | LoRA factors can have unequal functional roles. |
| `frantar2023gptq` | VERIFIED, ICLR 2023 | paper PDF | GPTQ uses approximate second-order information for sequential weight quantization. |
| `xiao2023smoothquant` | VERIFIED, ICML 2023 | paper PDF | SmoothQuant moves activation difficulty into weights before integer quantization. |
| `yao2022zeroquant` | VERIFIED, NeurIPS 2022 | paper PDF | ZeroQuant combines group quantization and layer-wise distillation. |
| `lin2024awq` | VERIFIED, MLSys 2024 | paper PDF | AWQ selects salient weight channels using activation statistics. |
| `young2025radio` | VERIFIED, ICML 2025 | PMLR proceedings page and paper | Frames post-training LLM quantization through rate--distortion optimization and supports targeting a specified compressed size or accuracy. |
| `liu2025paretoq` | VERIFIED, NeurIPS 2025 | NeurIPS proceedings and paper | Unified comparison across 1, 1.58, 2, 3, and 4 bits; reports a learning transition between the <=2-bit and >=3-bit regimes and a nontrivial size--accuracy Pareto frontier. |
| `arora2018compression` | VERIFIED, ICML 2018 | PMLR proceedings abstract and paper | Uses explicit succinct reparameterizations of trained networks to derive substantially stronger compression-based generalization bounds; supports the distinction between raw parameter count and effective description length. |
| `bergstrasser2026succinct` | VERIFIED, ICLR 2026 | ICLR proceedings and OpenReview paper | Fixed-precision transformers can be exponentially more succinct than LTL and recurrent networks and doubly exponentially more succinct than finite automata for formal-language representation. This is used only as intuition for receiver-relative description length. |
| `zhou2019pacbayes` | VERIFIED, ICLR 2019 | paper PDF | A compressed network can define a PAC-Bayes generalization bound. |
| `lotfi2022pacbayes` | VERIFIED, NeurIPS 2022 | paper PDF | Learned compression can tighten PAC-Bayes bounds. |
| `yao2023react` | VERIFIED, ICLR 2023 | arXiv:2210.03629 PDF | ReAct interleaves reasoning, actions, and observations. |
| `shao2024deepseekmath` | PREPRINT | arXiv:2402.03300 | Introduces Group Relative Policy Optimization (GRPO), a PPO variant for mathematical reasoning. |
| `deepseekai2025r1` | PREPRINT | arXiv:2501.12948 | Uses reinforcement learning with verifiable outcome rewards to induce reasoning behavior. |
| `dutta2024step` | PREPRINT | arXiv:2402.18312 PDF | The tested ontology task shows earlier relation transfer and later answer-writing paths. |
| `hao2025coconut` | VERIFIED, COLM 2025 | OpenReview proceedings PDF | Coconut feeds continuous hidden states back as later reasoning inputs. |
| `fagnou2024chain` | VERIFIED, EMNLP 2024 | DOI and PDF | The paper proves a depth constraint for its entity-tracking setting and tests chain attention. |
| `yang2025symbolic` | VERIFIED, ICML 2025 | proceedings PDF | The tested abstract tasks show abstraction, induction, and retrieval components. |
| `qian2025peaks` | VERIFIED, NeurIPS 2025 | NeurIPS proceedings and arXiv:2506.02867 PDF | The paper identifies tokens with high estimated mutual information under its measure. |
| `yu2025stateaware` | VERIFIED, Findings of EMNLP 2025 | ACL Anthology and arXiv:2509.00190 PDF | Hidden-state changes are analyzed as task-specific reasoning stages. |
| `sun2026trajectories` | VERIFIED, ACL 2026 long paper | ACL Anthology and arXiv:2604.05655 PDF | The paper reports step-specific geometry and correctness signals. |
| `zhang2025latenttokens` | PREPRINT | arXiv:2512.21711 PDF | Causal and adversarial tests question the meaning of latent tokens in the tested setup. |