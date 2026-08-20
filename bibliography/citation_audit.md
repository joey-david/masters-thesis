# Citation audit

Last fully audited: **2026-08-20**.

This file is deliberately stricter than `references.bib`. A paper should not enter the thesis bibliography merely because its title is relevant. For each candidate below, the metadata, publication status, exact claim we intend to cite, and the limits of that claim have been checked individually.

## Audit rules

For every reference we record:

- canonical title and author list from the final proceedings record when one exists;
- year, venue, and current publication status;
- DOI / arXiv / official proceedings identifier;
- primary source(s) used for verification;
- the exact thesis claim the citation may support;
- whether that claim is direct or our interpretation;
- a caveat stating what the paper does **not** establish;
- a thesis decision: `CORE`, `SUPPORTING`, `OPTIONAL`, or `EXCLUDE FROM MAIN TEXT`.

Status vocabulary:

- `VERIFIED — PUBLISHED`: metadata and intended claim checked against a final primary publication.
- `VERIFIED — PREPRINT`: metadata and intended claim checked, but no peer-reviewed publication was found as of the audit date.
- `VERIFIED — WITHDRAWN`: a submission existed but was withdrawn; never describe it as an accepted conference paper.
- `VERIFIED — UNDER REVIEW`: a current review submission exists but is not a publication.
- `METADATA VERIFIED`: existence/metadata are secure but a stronger scientific claim would require another pass through the paper.
- `REJECT`: do not cite for the proposed claim.

For 2025--2026 work, venue status must be re-checked immediately before submission.

## Decision summary

| ID | Reference | Status | Decision | Primary thesis role |
|---|---|---|---|---|
| III-01 | Hu et al., LoRA | VERIFIED — PUBLISHED, ICLR 2022 | CORE | Define low-rank adaptation |
| III-02 | Dettmers et al., QLoRA | VERIFIED — PUBLISHED, NeurIPS 2023 | CORE | Frozen quantized backbone + LoRA |
| III-03 | Zhang et al., AdaLoRA | VERIFIED — PUBLISHED, ICLR 2023 | OPTIONAL | Adaptive parameter/rank allocation precedent |
| III-04 | Guo et al., LQ-LoRA | VERIFIED — PUBLISHED, ICLR 2024 | SUPPORTING | Quantized-base/low-rank decomposition under memory budget |
| III-05 | Xu et al., QA-LoRA | VERIFIED — PUBLISHED, ICLR 2024 | SUPPORTING | Quantization-aware low-rank adaptation |
| III-06 | Li et al., LoftQ | VERIFIED — PUBLISHED, ICLR 2024 oral | SUPPORTING | Joint quantization + LoRA initialization |
| III-07 | Liao et al., ApiQ | VERIFIED — PUBLISHED, EMNLP 2024 | SUPPORTING | Aggressive low-bit fine-tuning |
| III-08 | Liu et al., ParetoQ | VERIFIED — PUBLISHED, NeurIPS 2025 | OPTIONAL | Context for the difficult 1--2 bit regime |
| III-09 | Mirzaei et al., LoRAQuant | VERIFIED — PREPRINT; ICLR 2026 withdrawn; TMLR under review | CORE | Nearest post-training adapter-compression work |
| III-10 | Tan et al., How Many Bits Can an Adapter Write? | VERIFIED — PREPRINT | CORE | Closest concurrent work on written/artifact/behavior bits |
| III-11 | Grünwald & Roos, Minimum Description Length Revisited | VERIFIED — PUBLISHED | CORE | MDL definition and terminology |
| III-12 | Rissanen, Universal coding... | VERIFIED — PUBLISHED | OPTIONAL | Foundational universal/prequential coding |
| III-13 | Voita & Titov, MDL probing | VERIFIED — PUBLISHED, EMNLP 2020 | SUPPORTING | Neural online-coding precedent |
| III-14 | Cover & Thomas, Elements of Information Theory | VERIFIED — PUBLISHED BOOK | CORE | Codelength / information / rate--distortion definitions |
| III-15 | Berger, Rate Distortion Theory | VERIFIED — PUBLISHED BOOK | OPTIONAL | Classical rate--distortion reference; redundant with Cover & Thomas |
| III-16 | Arora et al., compression generalization | VERIFIED — PUBLISHED, ICML 2018 | EXCLUDE FROM MAIN TEXT | Only if a compression-generalization theory aside is needed |
| III-17 | Zhou et al., PAC-Bayesian compression | VERIFIED — PUBLISHED, ICLR 2019 | EXCLUDE FROM MAIN TEXT | Same |
| III-18 | Lotfi et al., PAC-Bayes compression | VERIFIED — PUBLISHED, NeurIPS 2022 | EXCLUDE FROM MAIN TEXT | Same |
| IV-01 | Wei et al., Chain-of-Thought Prompting | VERIFIED — PUBLISHED, NeurIPS 2022 | CORE | Establish explicit CoT as a useful reasoning substrate |
| IV-02 | Dutta et al., How to Think Step-by-Step | VERIFIED — PUBLISHED, TMLR 2024 | CORE | Mechanistic/layerwise CoT organization |
| IV-03 | Sun et al., LLM Reasoning as Trajectories | VERIFIED — PUBLISHED, ACL 2026 | CORE | Representation trajectories + correctness signals |
| IV-04 | Qian et al., MI peaks | VERIFIED — PUBLISHED, NeurIPS 2025 | CORE | Information-peak boundary comparator |
| IV-05 | Yu et al., State-Aware Reasoning Dynamics | VERIFIED — PUBLISHED, Findings EMNLP 2025 | CORE | Spectral/Gram latent-state comparator |
| IV-06 | Mehrafarin et al., Hidden States | VERIFIED — PREPRINT | CORE | Causal activation-patching comparator |
| IV-07 | Hao et al., Coconut | VERIFIED — PUBLISHED, COLM 2025 | CORE | Continuous latent reasoning |
| IV-08 | Zhang et al., Do Latent Tokens Think? | VERIFIED — PREPRINT | OPTIONAL | Adversarial counterpoint to Coconut |
| IV-09 | Huang et al., Equilibrium Reasoners | VERIFIED — PUBLISHED, ICML 2026 | SUPPORTING | Iterative latent-state / attractor comparator |
| IV-10 | Li et al., Chain Of Thought Compression | VERIFIED — PREPRINT | SUPPORTING | Theory-motivated implicit-CoT compression |

---

# Section III — Fine-tuning under an information budget

## III-01 — LoRA

**Canonical citation.** Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen. **“LoRA: Low-Rank Adaptation of Large Language Models.”** ICLR 2022.

- **Verification:** `VERIFIED — PUBLISHED`.
- **Identifiers:** arXiv:2106.09685; OpenReview `nZeVKeeFYf9`.
- **Primary sources:** https://openreview.net/forum?id=nZeVKeeFYf9 ; https://arxiv.org/abs/2106.09685
- **Recommended citekey:** `hu2022lora`.
- **Thesis placement:** technical background on PEFT; Section III related work.
- **Safe claim:** LoRA freezes the pretrained weight matrix and learns a low-rank update, conventionally written \(\Delta W=BA\), with the low-rank factors trained instead of the full base weight. The original method therefore creates a small task-specific trainable object while leaving the base model fixed.
- **Directness:** direct; this is the defining construction of the paper.
- **Do not overstate:** LoRA is a parameter-efficient parameterization, **not** by itself an entropy code or an exact-bit compression method. Rank, parameter count, and FP storage size must not be called the actual information written by a fine-tune.
- **Decision:** `CORE`.

## III-02 — QLoRA

**Canonical citation.** Tim Dettmers, Artidoro Pagnoni, Ari Holtzman, Luke Zettlemoyer. **“QLoRA: Efficient Finetuning of Quantized LLMs.”** NeurIPS 2023.

- **Verification:** `VERIFIED — PUBLISHED` (NeurIPS 2023 oral).
- **Identifiers:** arXiv:2305.14314.
- **Primary sources:** https://proceedings.neurips.cc/paper_files/paper/2023/file/1feb87871436031bdc0f2beaa62a049b-Paper-Conference.pdf ; https://arxiv.org/abs/2305.14314
- **Recommended citekey:** `dettmers2023qlora`.
- **Thesis placement:** technical background; Section III experimental setup.
- **Safe claim:** QLoRA backpropagates through a **frozen 4-bit quantized pretrained model** into LoRA adapters and introduces NF4, double quantization, and paged optimizers to reduce fine-tuning memory.
- **Directness:** direct from the paper/NeurIPS record.
- **Do not overstate:** “4-bit QLoRA” does **not** mean the learned LoRA update is a 4-bit serialized artifact. Backbone quantization for training memory and post-training adapter compression are different operations and different rate objects.
- **Decision:** `CORE`.

## III-03 — AdaLoRA

**Canonical citation.** Qingru Zhang, Minshuo Chen, Alexander Bukharin, Pengcheng He, Yu Cheng, Weizhu Chen, Tuo Zhao. **“Adaptive Budget Allocation for Parameter-Efficient Fine-Tuning.”** ICLR 2023.

- **Verification:** `VERIFIED — PUBLISHED` (ICLR 2023 poster).
- **Identifiers:** arXiv:2303.10512; OpenReview `lq62uWRJjiY`.
- **Primary sources:** https://openreview.net/forum?id=lq62uWRJjiY ; https://iclr.cc/virtual/2023/poster/11863
- **Recommended citekey:** `zhang2023adalora`.
- **Metadata correction:** use the seven-author final ICLR record above. An older local BibTeX in the precursor repository included Nikos Karampatziakis; that does not match the published ICLR paper and must not be propagated.
- **Thesis placement:** optional comparison in the adaptive-allocation subsection.
- **Safe claim:** AdaLoRA adaptively allocates a parameter budget among pretrained weight matrices according to importance, using an SVD-style parameterization and pruning singular values of less important updates.
- **Directness:** direct.
- **Do not overstate:** AdaLoRA allocates **trainable rank/parameter budget during fine-tuning**. It does not solve the post-training problem of allocating an exact serialized bit budget over a fixed trained adapter, nor does it optimize behavioral rate--distortion.
- **Decision:** `OPTIONAL`; cite only if it sharpens the contrast with our adaptive bit allocation.

## III-04 — LQ-LoRA

**Canonical citation.** Han Guo, Philip Greengard, Eric P. Xing, Yoon Kim. **“LQ-LoRA: Low-rank plus Quantized Matrix Decomposition for Efficient Language Model Finetuning.”** ICLR 2024.

- **Verification:** `VERIFIED — PUBLISHED` (ICLR 2024 poster).
- **Identifiers:** arXiv:2311.12023; OpenReview `xw29VvOMmU`.
- **Primary sources:** https://openreview.net/forum?id=xw29VvOMmU ; https://openreview.net/pdf?id=xw29VvOMmU
- **Recommended citekey:** `guo2024lqlora`.
- **Thesis placement:** Section III related work on low-bit adaptation.
- **Safe claim:** LQ-LoRA decomposes each pretrained matrix into a high-precision low-rank component plus a quantized component; the quantized component remains fixed while the low-rank component is updated. It also formulates per-matrix quantization choices under an overall target memory budget.
- **Directness:** direct.
- **Do not overstate:** this is **not** post-training compression of an already trained LoRA adapter. It changes the decomposition of the pretrained weights and the training procedure, so its “memory budget” is not the same object as our exact decoder-visible adapter file rate.
- **Decision:** `SUPPORTING`.

## III-05 — QA-LoRA

**Canonical citation.** Yuhui Xu, Lingxi Xie, Xiaotao Gu, Xin Chen, Heng Chang, Hengheng Zhang, Zhengsu Chen, Xiaopeng Zhang, Qi Tian. **“QA-LoRA: Quantization-Aware Low-Rank Adaptation of Large Language Models.”** ICLR 2024.

- **Verification:** `VERIFIED — PUBLISHED` (ICLR 2024 poster).
- **Identifiers:** arXiv:2309.14717; official ICLR proceedings record.
- **Primary sources:** https://proceedings.iclr.cc/paper_files/paper/2024/hash/e6c2e85db1f1039177c4495ccd399ac4-Abstract-Conference.html ; https://arxiv.org/abs/2309.14717
- **Recommended citekey:** `xu2024qalora`.
- **Thesis placement:** Section III related work.
- **Safe claim:** QA-LoRA makes LoRA quantization-aware through group-wise operators; the LLM weights are quantized during fine-tuning and the base plus auxiliary adaptation weights can be integrated into a quantized deployed model afterwards.
- **Directness:** direct from the abstract.
- **Do not overstate:** this is training/deployment-aware quantization, not a post-hoc codec applied to a fixed adapter. Its deployed representation is therefore not directly comparable to an exact adapter-only file rate without careful accounting.
- **Decision:** `SUPPORTING`.

## III-06 — LoftQ

**Canonical citation.** Yixiao Li, Yifan Yu, Chen Liang, Nikos Karampatziakis, Pengcheng He, Weizhu Chen, Tuo Zhao. **“LoftQ: LoRA-Fine-Tuning-aware Quantization for Large Language Models.”** ICLR 2024.

- **Verification:** `VERIFIED — PUBLISHED` (ICLR 2024 oral).
- **Identifiers:** arXiv:2310.08659.
- **Primary sources:** https://proceedings.iclr.cc/paper_files/paper/2024/hash/39ec972afab01e0d8ddc6834a9d12ac1-Abstract-Conference.html ; https://arxiv.org/abs/2310.08659
- **Recommended citekey:** `li2024loftq`.
- **Thesis placement:** Section III related work.
- **Safe claim:** LoftQ simultaneously quantizes the pretrained LLM and finds a low-rank initialization for subsequent LoRA fine-tuning so as to reduce the discrepancy between the quantized and full-precision model; the paper reports particular benefits in 2-bit and mixed 2/4-bit regimes.
- **Directness:** direct.
- **Do not overstate:** LoftQ addresses initialization and base-model quantization before/during adaptation, not post-training compression of a fixed adapter.
- **Decision:** `SUPPORTING`.

## III-07 — ApiQ

**Canonical citation.** Baohao Liao, Christian Herold, Shahram Khadivi, Christof Monz. **“ApiQ: Finetuning of 2-Bit Quantized Large Language Model.”** EMNLP 2024, pp. 20996--21020.

- **Verification:** `VERIFIED — PUBLISHED`.
- **Identifiers:** ACL Anthology `2024.emnlp-main.1168`; DOI 10.18653/v1/2024.emnlp-main.1168; arXiv:2402.05147.
- **Primary source:** https://aclanthology.org/2024.emnlp-main.1168/
- **Recommended citekey:** `liao2024apiq`.
- **Thesis placement:** broader low-bit fine-tuning context.
- **Safe claim:** ApiQ concurrently initializes LoRA components and quantizes LLM weights, targeting activation error and error propagation; the paper demonstrates fine-tuning at very low bit widths, including a 2-bit Llama-2-70B experiment on one A100-80GB.
- **Directness:** direct from the ACL abstract.
- **Do not overstate:** ApiQ is not a fixed-adapter compression study and does not establish an exact serialized adapter rate--behavior frontier.
- **Decision:** `SUPPORTING`, but one paragraph at most.

## III-08 — ParetoQ

**Canonical citation.** Zechun Liu, Changsheng Zhao, Hanxian Huang, Sijia Chen, Jing Zhang, Jiawei Zhao, Scott Roy, Lisa Jin, Yunyang Xiong, Yangyang Shi, Lin Xiao, Yuandong Tian, Bilge Soran, Raghuraman Krishnamoorthi, Tijmen Blankevoort, Vikas Chandra. **“ParetoQ: Improving Scaling Laws in Extremely Low-bit LLM Quantization.”** NeurIPS 2025.

- **Verification:** `VERIFIED — PUBLISHED`, NeurIPS 2025 Main Conference Track.
- **Identifiers:** arXiv:2502.02631. The arXiv version used the earlier title **“ParetoQ: Scaling Laws in Extremely Low-bit LLM Quantization.”** Use the published title in the thesis.
- **Primary source:** https://papers.nips.cc/paper_files/paper/2025/hash/83b17fb3369b1effa97ca5409526b02e-Abstract-Conference.html
- **Recommended citekey:** `liu2025paretoq`.
- **Thesis placement:** optional context for ultra-low-bit behavior.
- **Safe claim:** ParetoQ provides a unified comparison across 1, 1.58, 2, 3, and 4 bits and reports a marked transition between 2 and 3 bits: models at 3 bits and above remain closer to their pretrained distributions, whereas 2-bit-and-below learning changes representations much more strongly.
- **Directness:** direct from the NeurIPS abstract.
- **Do not overstate:** this concerns whole-model quantization/training, not LoRA artifact compression. The transition is useful context, not evidence for the location of our adapter \(R^*\).
- **Decision:** `OPTIONAL`.

## III-09 — LoRAQuant

**Canonical citation.** Amir Reza Mirzaei, Yuqiao Wen, Yanshuai Cao, Lili Mou. **“LoRAQuant: Mixed-Precision Quantization of LoRA to Ultra-Low Bits.”** arXiv:2510.26690, 2025.

- **Verification:** `VERIFIED — PREPRINT`.
- **Current venue status (2026-08-20):** the ICLR 2026 submission (`Ni4gERdVfT`) is explicitly **withdrawn**. A later TMLR submission (`71svCWi178`) is currently marked **under review**. Neither should be represented as a peer-reviewed publication at present.
- **Primary sources:** https://arxiv.org/abs/2510.26690 ; https://openreview.net/forum?id=Ni4gERdVfT ; https://openreview.net/forum?id=71svCWi178
- **Recommended citekey:** `mirzaei2025loraquant`.
- **Thesis placement:** Section III nearest-neighbor related work; comparison to fixed-adapter codec baselines.
- **Safe claim:** LoRAQuant is a **post-training** quantization method tailored to trained LoRA adapters. It uses SVD-based reparameterization to concentrate important information and applies mixed precision, retaining higher precision for important components and ultra-low precision elsewhere.
- **Directness:** direct from the arXiv/OpenReview abstracts.
- **Do not overstate:** do not say “published at ICLR 2026.” Also do not compare its nominal reported bit rate numerically to our exact serialized `.fq*` rate without normalizing what metadata, scales, codebooks, and entropy-coding overhead each rate includes.
- **Decision:** `CORE`; this is the closest methodologically related adapter-compression paper.

## III-10 — How Many Bits Can an Adapter Write?

**Canonical citation.** Kaizhen Tan, Heqing Du, Yang Feng. **“How Many Bits Can an Adapter Write? Measuring the Capacity and Memorization of Parameter-Efficient Fine-Tuning.”** arXiv:2607.21351, 2026.

- **Verification:** `VERIFIED — PREPRINT`; no accepted peer-reviewed venue located as of 2026-08-20.
- **Primary sources:** https://arxiv.org/abs/2607.21351 ; https://arxiv.org/html/2607.21351
- **Recommended citekey:** `tan2026adapterbits`.
- **Thesis placement:** Section III closest conceptual concurrent work; should be discussed explicitly rather than buried.
- **Safe claims:** the paper adapts compression-based memorization measurement to frozen-base LoRA and distinguishes three useful quantities: random-string memorization/writability, an entropy-coded parameter artifact cost \(\mathrm{CL}(\Delta\theta)\), and behavior-write bits from changes in answer NLL. Under its calibration protocol, reported adapter capacities are roughly 1.7--2.8 bits per trainable parameter; placement matters strongly (about 1.30 to 2.43 bits/parameter under a parameter-matched placement test), and the same adapter memorizes 29%, 79%, and 98% of its data on random, synthetic-pretrained, and WikiText-pretrained frozen bases respectively.
- **Directness:** direct; the numbers are in the arXiv HTML Tables/Figures 2--4 and accompanying text.
- **Crucial distinction from this thesis:** Tan et al. primarily ask **how much information an adapter can memorize/write** and define an entropy-coded weight cost under their own quantization/coding procedure. Our central Section III operational object is the **minimum exact decoder-visible serialized adapter rate \(R^*(\tau)\) needed to preserve a specified fraction of downstream behavior after post-training compression**, with actual file reload and codec overhead included. The two projects overlap substantially in motivation and behavioral-bit language, so novelty must be phrased narrowly and chronologically; they are concurrent work released 23 July 2026.
- **Do not overstate:** their “bits written” are not interchangeable with our \(R^*\), and their random-string capacity experiment is a calibration/memorization protocol, not a natural-task rate--distortion frontier. Conversely, we must not claim that prior work never measured adapter artifact codelength or behavior-write bits: this paper explicitly does.
- **Decision:** `CORE`.

## III-11 — Minimum Description Length Revisited

**Canonical citation.** Peter Grünwald, Teemu Roos. **“Minimum Description Length Revisited.”** *International Journal of Mathematics for Industry* 11(1), article 1930001, 2019.

- **Verification:** `VERIFIED — PUBLISHED`, peer-reviewed review article.
- **Identifiers:** DOI 10.1142/S2661335219300018; arXiv:1908.08484.
- **Primary/authoritative source:** https://doi.org/10.1142/S2661335219300018 ; metadata mirrored by the University of Helsinki research portal.
- **Recommended citekey:** `grunwald2019mdl`.
- **Thesis placement:** technical background / Section III terminology.
- **Safe claim:** MDL frames statistical learning/model selection in terms of description length and universal coding; it provides a principled language for asking how concisely data/model behavior can be encoded.
- **Directness:** direct at the conceptual level.
- **Do not overstate:** our serialized adapter rate is an operational codelength and may be **MDL-inspired**; it is not automatically the formal normalized maximum-likelihood MDL of a statistical model class. Avoid labeling every file-size optimization “MDL” without stating the code and side information.
- **Decision:** `CORE` if MDL terminology remains in the final thesis.

## III-12 — Rissanen 1984

**Canonical citation.** Jorma Rissanen. **“Universal coding, information, prediction, and estimation.”** *IEEE Transactions on Information Theory* 30(4):629--636, 1984.

- **Verification:** `VERIFIED — PUBLISHED`.
- **Identifier:** DOI 10.1109/TIT.1984.1056936.
- **Primary source:** IEEE Information Theory Society record: https://www.itsoc.org/publications/papers/universal-coding-information-prediction-and-estimation
- **Recommended citekey:** `rissanen1984universal`.
- **Thesis placement:** only if a formal paragraph on prequential/universal coding is retained.
- **Safe claim:** Rissanen establishes a connection among universal coding, sequential prediction, and statistical estimation and gives an information-theoretic justification for MDL-style estimation.
- **Directness:** direct.
- **Do not overstate:** this paper does not validate any particular neural online-coding estimator, nor does it make gzip/LZMA codelength an intrinsic dataset-information measure.
- **Decision:** `OPTIONAL`; useful foundational citation, but not necessary if Grünwald & Roos plus a modern operational reference suffice.

## III-13 — Information-Theoretic Probing with MDL

**Canonical citation.** Elena Voita, Ivan Titov. **“Information-Theoretic Probing with Minimum Description Length.”** EMNLP 2020, pp. 183--196.

- **Verification:** `VERIFIED — PUBLISHED`.
- **Identifiers:** ACL Anthology `2020.emnlp-main.14`; DOI 10.18653/v1/2020.emnlp-main.14.
- **Primary source:** https://aclanthology.org/2020.emnlp-main.14/
- **Recommended citekey:** `voita2020mdlprobe`.
- **Thesis placement:** technical background on probing; Section III/IV bridge.
- **Safe claim:** Voita & Titov recast probing as transmitting labels given representations and evaluate representation information through description length, implementing variational and online coding and finding them more informative/stable than probe accuracy in their experiments.
- **Directness:** direct from ACL abstract.
- **Do not overstate:** their codelength is **labels conditioned on representations through a probe**. It is not intrinsic dataset information, adapter artifact rate, or our held-out behavioral bits.
- **Decision:** `SUPPORTING`.

## III-14 — Elements of Information Theory

**Canonical citation.** Thomas M. Cover, Joy A. Thomas. **_Elements of Information Theory_, 2nd ed.** Wiley, 2006.

- **Verification:** `VERIFIED — PUBLISHED BOOK`.
- **Identifiers:** print ISBN 978-0-471-24195-9; online DOI 10.1002/047174882X.
- **Publisher source:** https://doi.org/10.1002/047174882X
- **Recommended citekey:** `cover2006elements`.
- **Thesis placement:** technical background definitions for entropy, log-loss/codelength, and rate--distortion.
- **Safe claim:** standard source for entropy, coding, mutual information, and rate--distortion theory.
- **Directness:** foundational textbook definition.
- **Do not overstate:** plotting an empirical model-size/performance frontier does not automatically estimate Shannon's asymptotic rate--distortion function. Use “rate--distortion curve/frontier” operationally and define the rate and distortion used.
- **Decision:** `CORE`.

## III-15 — Berger 1971

**Canonical citation.** Toby Berger. **_Rate Distortion Theory: A Mathematical Basis for Data Compression_.** Prentice-Hall, 1971.

- **Verification:** `VERIFIED — PUBLISHED BOOK`.
- **Identifiers:** ISBN 0-13-753103-6 / 978-0-13-753103-5; LCCN 75-148254.
- **Bibliographic sources checked:** WorldCat/Library of Congress-linked catalog record and Google Books; title, publisher, year, and 311-page edition agree.
- **Recommended citekey:** `berger1971ratedistortion`.
- **Thesis placement:** optional historical source for rate--distortion.
- **Safe claim:** classical monograph on rate--distortion theory as a mathematical theory of lossy compression.
- **Do not overstate:** same caveat as Cover & Thomas; our finite empirical adapter codec is not automatically a Shannon RDF.
- **Decision:** `OPTIONAL`; probably omit to avoid redundant foundational citations if Cover & Thomas is already used.

## III-16 — Arora et al. 2018

**Canonical citation.** Sanjeev Arora, Rong Ge, Behnam Neyshabur, Yi Zhang. **“Stronger Generalization Bounds for Deep Nets via a Compression Approach.”** ICML 2018, PMLR 80:254--263.

- **Verification:** `VERIFIED — PUBLISHED`.
- **Primary source:** https://proceedings.mlr.press/v80/arora18b.html
- **Recommended citekey:** `arora2018compression`.
- **Safe claim:** the paper derives generalization bounds from explicit succinct reparameterizations/compressions of trained deep networks and obtains bounds substantially tighter than naive parameter counting in its setting.
- **Directness:** direct.
- **Do not overstate:** it does **not** imply that a LoRA adapter with lower serialized \(R^*\) will generalize better, nor does it analyze LLM fine-tuning. Compression and generalization are linked under the paper's bound/assumptions, not by a universal monotonic law.
- **Decision:** `EXCLUDE FROM MAIN TEXT` unless Section V develops an explicit generalization-bound discussion.

## III-17 — Zhou et al. 2019

**Canonical citation.** Wenda Zhou, Victor Veitch, Morgane Austern, Ryan P. Adams, Peter Orbanz. **“Non-vacuous Generalization Bounds at the ImageNet Scale: a PAC-Bayesian Compression Approach.”** ICLR 2019.

- **Verification:** `VERIFIED — PUBLISHED` (ICLR 2019 poster).
- **Identifiers:** arXiv:1804.05862.
- **Primary sources:** https://iclr.cc/virtual/2019/poster/806 ; https://arxiv.org/abs/1804.05862
- **Recommended citekey:** `zhou2019pacbayescompression`.
- **Safe claim:** the paper gives a compressed-size PAC-Bayesian generalization bound and reports the first non-vacuous guarantees for realistic ImageNet architectures under its framework; empirically, greater overfitting required more bits to describe the trained network.
- **Directness:** direct from the ICLR abstract.
- **Do not overstate:** no direct result about adapters, LLMs, or our rate quantity.
- **Decision:** `EXCLUDE FROM MAIN TEXT` by default.

## III-18 — Lotfi et al. 2022

**Canonical citation.** Sanae Lotfi, Marc Finzi, Sanyam Kapoor, Andres Potapczynski, Micah Goldblum, Andrew Gordon Wilson. **“PAC-Bayes Compression Bounds So Tight That They Can Explain Generalization.”** NeurIPS 2022.

- **Verification:** `VERIFIED — PUBLISHED`.
- **Identifiers:** arXiv:2211.13609.
- **Primary sources:** https://neurips.cc/virtual/2022/poster/53687 ; https://arxiv.org/abs/2211.13609
- **Recommended citekey:** `lotfi2022pacbayes`.
- **Safe claim:** the paper uses parameter quantization in a learned linear subspace to obtain tight PAC-Bayes generalization bounds and analyzes model size, equivariance, optimization bias, and transfer learning through this compression perspective.
- **Directness:** direct.
- **Do not overstate:** again, it supplies no direct theorem for adapter \(R^*\) or downstream LLM fine-tuning.
- **Decision:** `EXCLUDE FROM MAIN TEXT` unless a dedicated theoretical-generalization paragraph survives editing.

---

# Section IV — Reasoning trajectories and objective-relative state

## IV-01 — Chain-of-Thought Prompting

**Canonical citation.** Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Brian Ichter, Fei Xia, Ed H. Chi, Quoc V. Le, Denny Zhou. **“Chain-of-Thought Prompting Elicits Reasoning in Large Language Models.”** NeurIPS 2022, vol. 35, pp. 24824--24837.

- **Verification:** `VERIFIED — PUBLISHED`, NeurIPS 2022 Main Conference Track.
- **Identifiers:** arXiv:2201.11903; DOI 10.52202/068431-1800.
- **Primary source:** https://papers.neurips.cc/paper_files/paper/2022/hash/9d5609613524ecf4f15af0f7b31abca4-Abstract-Conference.html
- **Recommended citekey:** `wei2022cot`.
- **Thesis placement:** Section IV opening/background.
- **Safe claim:** few-shot exemplars containing intermediate natural-language reasoning steps can substantially improve performance of sufficiently large LMs on arithmetic, commonsense, and symbolic reasoning tasks.
- **Directness:** direct.
- **Do not overstate:** the paper demonstrates behavioral utility of elicited CoT; it does **not** establish that the verbalized chain is faithful to the model's internal computation or that natural-language steps are canonical internal states.
- **Decision:** `CORE`.

## IV-02 — How to Think Step-by-Step

**Canonical citation.** Subhabrata Dutta, Joykirat Singh, Soumen Chakrabarti, Tanmoy Chakraborty. **“How to think step-by-step: A mechanistic understanding of chain-of-thought reasoning.”** *Transactions on Machine Learning Research*, July 2024.

- **Verification:** `VERIFIED — PUBLISHED`. This is **not merely an arXiv preprint**.
- **Identifiers:** arXiv:2402.18312; OpenReview `uHLDkQVtyC`.
- **Primary source:** https://openreview.net/forum?id=uHLDkQVtyC
- **Recommended citekey:** `dutta2024think`.
- **Thesis placement:** Section IV mechanistic/representation literature.
- **Safe claim:** on Llama-2 7B solving multi-step fictional-ontology problems, the authors identify parallel answer-generation pathways and a mid-network functional shift: early representations are more influenced by pretraining priors, later ones by in-context information, with different attention-head functions localized across depth.
- **Directness:** direct from the published abstract/paper.
- **Do not overstate:** this is a controlled synthetic-ontology study of one model family. It does not establish a universal depth-wise stage decomposition for modern reasoning models.
- **Decision:** `CORE`.

## IV-03 — LLM Reasoning as Trajectories

**Canonical citation.** Lihao Sun, Hang Dong, Bo Qiao, Qingwei Lin, Dongmei Zhang, Saravan Rajmohan. **“LLM Reasoning as Trajectories: Step-Specific Representation Geometry and Correctness Signals.”** ACL 2026 Long Paper, pp. 26872--26887.

- **Verification:** `VERIFIED — PUBLISHED`.
- **Identifiers:** ACL Anthology `2026.acl-long.1237`; DOI 10.18653/v1/2026.acl-long.1237; arXiv:2604.05655.
- **Primary source:** https://aclanthology.org/2026.acl-long.1237/
- **Recommended citekey:** `sun2026trajectories`.
- **Thesis placement:** Section IV trajectory geometry and correctness prediction.
- **Safe claims:** the paper reports functionally ordered step-specific representation subspaces that become more separable with layer depth; correct and incorrect trajectories diverge later; this permits mid-reasoning final-correctness prediction with ROC--AUC **up to 0.87**; it also demonstrates trajectory-based steering.
- **Directness:** direct; the 0.87 number is in the ACL abstract.
- **Do not overstate:** their result depends on their definition/segmentation of reasoning steps and shows useful geometric structure, not a proof that one context-free canonical partition exists across objectives.
- **Decision:** `CORE`.

## IV-04 — Qian et al., information peaks

**Canonical citation.** Chen Qian, Dongrui Liu, Haochen Wen, Zhen Bai, Yong Liu, Jing Shao. **“Demystifying Reasoning Dynamics with Mutual Information: Thinking Tokens are Information Peaks in LLM Reasoning.”** NeurIPS 2025.

- **Verification:** `VERIFIED — PUBLISHED`.
- **Identifiers:** arXiv:2506.02867; OpenReview `E1FrjgaG1J`.
- **Primary sources:** https://proceedings.neurips.cc/paper_files/paper/2025/file/12867c8f1888d97d4e9f95f03c0f3ec9-Paper-Conference.pdf ; https://openreview.net/forum?id=E1FrjgaG1J
- **Recommended citekey:** `qian2025mipeaks`.
- **Thesis placement:** Section IV boundary/state literature and direct comparator to our information-peak experiments.
- **Safe claims:** the authors track dependence between intermediate representations and the correct answer and identify sharp peaks often associated with reflection/transition tokens such as “Wait” and “Therefore”; suppressing the identified tokens degrades reasoning in their experiments.
- **Critical estimator note:** the implementation does **not compute exact high-dimensional Shannon MI directly**. The paper explicitly says that, because MI is difficult to compute in high dimensions, it uses **HSIC as an estimator/proxy**, with Gaussian kernels and bandwidth selected by grid search over 50--400.
- **Directness:** direct from Appendix B of the NeurIPS paper.
- **Do not overstate:** our BOS-only/gold-solution target variant is not a faithful replication/refutation of Qian et al. unless prompt conditioning, target construction, HSIC estimator, and sampling protocol match theirs. Phrase any disagreement as a protocol-sensitive comparison, not “we refute MI peaks.”
- **Decision:** `CORE`.

## IV-05 — Yu et al., state-aware reasoning dynamics

**Canonical citation.** Sheldon Yu, Yuxin Xiong, Junda Wu, Xintong Li, Tong Yu, Xiang Chen, Ritwik Sinha, Jingbo Shang, Julian McAuley. **“Explainable Chain-of-Thought Reasoning: An Empirical Analysis on State-Aware Reasoning Dynamics.”** Findings of EMNLP 2025, pp. 16660--16667.

- **Verification:** `VERIFIED — PUBLISHED`.
- **Identifiers:** ACL Anthology `2025.findings-emnlp.904`; DOI 10.18653/v1/2025.findings-emnlp.904; arXiv:2509.00190.
- **Primary source:** https://aclanthology.org/2025.findings-emnlp.904/
- **Recommended citekey:** `yu2025stateaware`.
- **Metadata correction:** publication year is **2025**, not 2026. Any local filename/reference saying “Yu et al. 2026” is wrong.
- **Thesis placement:** Section IV state/boundary literature; direct comparator to Gram/spectral-state experiments.
- **Safe claim:** the method segments CoT into discrete reasoning steps, constructs spectral embeddings from eigenvalues of token-level Gram matrices, clusters them into latent states, and models transitions as a first-order Markov chain; the authors report globally coherent abstract paths across their tasks/models.
- **Directness:** direct from ACL abstract.
- **Do not overstate:** the latent-state ontology is produced by a chosen segmentation + spectral embedding + clustering pipeline. Coherent clusters do not establish uniqueness or objective-independence of the state decomposition.
- **Decision:** `CORE`.

## IV-06 — When Chain-of-Thought Fails, the Solution Hides in the Hidden States

**Canonical citation.** Houman Mehrafarin, Amit Parekh, Ioannis Konstas. **“When Chain-of-Thought Fails, the Solution Hides in the Hidden States.”** arXiv:2604.23351, 2026.

- **Verification:** `VERIFIED — PREPRINT`. Author page and bibliographic indexes still label it a preprint; no accepted peer-reviewed venue was located as of 2026-08-20.
- **Primary source:** https://arxiv.org/abs/2604.23351
- **Recommended citekey:** `mehrafarin2026hidden`.
- **Thesis placement:** Section IV causal hidden-state evidence / process-isomer comparison.
- **Safe claim:** on GSM8K, the authors activation-patch token-level hidden states from a CoT run into a direct-answer run **for the same question** and report large accuracy improvements, including cases where the original CoT is incorrect; recoverable task information is uneven across positions/layers and concentrates in mid-to-late layers.
- **Directness:** direct from the arXiv abstract.
- **Do not overstate:** this is not evidence for a portable, context-independent “solution object.” The donor and recipient are same-question computations and the intervention protocol is highly specific. That limitation is precisely why it is a useful comparator to our cross-context/process-isomer/state-handoff tests.
- **Decision:** `CORE`, with preprint status visible in prose/bibliography.

## IV-07 — Coconut

**Canonical citation.** Shibo Hao, Sainbayar Sukhbaatar, DiJia Su, Xian Li, Zhiting Hu, Jason Weston, Yuandong Tian. **“Training Large Language Models to Reason in a Continuous Latent Space.”** COLM 2025.

- **Verification:** `VERIFIED — PUBLISHED`. It also appeared at the ICLR 2025 Reasoning and Planning for LLMs workshop, but the stronger final citation is the COLM 2025 conference paper.
- **Identifiers:** arXiv:2412.06769; OpenReview `Itxz7S4Ip3`.
- **Primary source:** https://openreview.net/forum?id=Itxz7S4Ip3
- **Recommended citekey:** `hao2025coconut`.
- **Thesis placement:** Section IV continuous/latent reasoning.
- **Safe claim:** Coconut uses the LLM's last hidden state as a continuous reasoning state and feeds it directly back as the next input embedding instead of decoding it to a word token. The authors report gains on some planning-heavy logical tasks and a better accuracy/efficiency trade-off than explicit CoT in those settings.
- **Directness:** direct from the COLM paper.
- **Do not overstate:** the authors interpret some behavior as allowing multiple alternative next steps / breadth-first-search-like reasoning; this is an empirical interpretation, not a general proof of BFS. Coconut is also a learned latent-feedback architecture, not the same intervention as our activation patching or explicit finite-rate state interface.
- **Decision:** `CORE`.

## IV-08 — Do Latent Tokens Think?

**Canonical citation.** Yuyi Zhang, Boyu Tang, Tianjie Ju, Sufeng Duan, Gongshen Liu. **“Do Latent Tokens Think? A Causal and Adversarial Analysis of Chain-of-Continuous-Thought.”** arXiv:2512.21711, 2025.

- **Verification:** `VERIFIED — PREPRINT`; no accepted conference/journal venue located as of 2026-08-20.
- **Primary identifier/source:** https://arxiv.org/abs/2512.21711
- **Recommended citekey:** `zhang2025latenttokens`.
- **Thesis placement:** optional counterpoint immediately after Coconut.
- **Safe claim:** the authors adversarially probe COCONUT with steering and shortcut tests and report that latent tokens are weakly causally sensitive under their interventions and that shortcut exploitation can explain performance in some evaluated settings.
- **Directness:** direct as **the authors' reported conclusion**.
- **Do not overstate:** this is a recent adversarial preprint, not consensus that “Coconut does not reason.” Phrase as “Zhang et al. report/find under their protocol...” and preserve the scope of the tested models/tasks.
- **Decision:** `OPTIONAL`; useful because it prevents one-sided treatment of latent reasoning.

## IV-09 — Equilibrium Reasoners

**Canonical citation.** Benhao Huang, Zhengyang Geng, Zico Kolter. **“Equilibrium Reasoners: Learning Attractors Enables Scalable Reasoning.”** ICML 2026, PMLR 306.

- **Verification:** `VERIFIED — PUBLISHED`.
- **Identifiers:** arXiv:2605.21488.
- **Primary sources:** https://icml.cc/Downloads/2026 ; https://arxiv.org/abs/2605.21488 ; the final paper is explicitly headed “Proceedings of the 43rd International Conference on Machine Learning, PMLR 306, 2026.”
- **Recommended citekey:** `huang2026eqr`.
- **Thesis placement:** Section IV/V discussion of learned latent dynamics and reusable/iterative state.
- **Safe claim:** EqR formalizes iterative latent reasoning through task-conditioned dynamical systems whose stable fixed points are intended to correspond to valid solutions, scaling test-time compute by more iterations and multiple stochastic initializations; on controlled Sudoku/Maze benchmarks, stronger convergence is associated with higher accuracy and very deep unrolling yields large gains.
- **Directness:** the attractor statement is explicitly framed by the authors as a hypothesis/modeling perspective, and the empirical scaling results are direct.
- **Do not overstate:** the work uses bespoke iterative architectures and structured benchmarks. It is not evidence that ordinary autoregressive LLM hidden states naturally form such attractors.
- **Decision:** `SUPPORTING`.

## IV-10 — Chain Of Thought Compression: A Theoritical Analysis

**Canonical citation.** Juncai Li, Ru Li, Yuxiang Zhou, Boxiang Ma, Jeff Z. Pan. **“Chain Of Thought Compression: A Theoritical Analysis.”** arXiv:2601.21576, 2026.

- **Verification:** `VERIFIED — PREPRINT`; no accepted venue located as of 2026-08-20.
- **Title note:** **“Theoritical” is genuinely misspelled in the canonical arXiv title. Do not silently correct it inside the bibliography title.**
- **Primary source:** https://arxiv.org/abs/2601.21576
- **Recommended citekey:** `li2026cotcompression`.
- **Thesis placement:** Section IV CoT-compression related work.
- **Safe claim:** the paper introduces an Order-r Interaction formalism and, under its problem/model assumptions, argues that omitting intermediate steps in irreducible reasoning problems causes high-order learning signals to decay exponentially. It introduces NatBool-DAG and ALiCoT, which aligns latent-token distributions with intermediate reasoning states and reports a 54.4x speedup while maintaining performance comparable to explicit CoT in the paper's setup.
- **Directness:** direct from the arXiv abstract for both the theoretical and empirical claims.
- **Do not overstate:** the result is not a universal lower bound saying all CoT compression must fail without explicit steps; it depends on the paper's definition of irreducibility, interaction order, training assumptions, and benchmark construction. It also does not establish a canonical thought-unit partition.
- **Decision:** `SUPPORTING`, with preprint status explicit.

---

# Cross-paper conclusions for writing the related-work sections

## Section III: what can safely be claimed as the gap

The literature supports the following progression:

1. LoRA/QLoRA make the **adaptation object** small and separable from a shared frozen base, but rank/nominal precision are not exact information rates.
2. LQ-LoRA, QA-LoRA, LoftQ, ApiQ, and ParetoQ study different forms of quantized/low-bit adaptation, usually by changing the base decomposition, initialization, or training procedure rather than post-hoc compressing one fixed adapter.
3. LoRAQuant is the closest **post-training adapter quantization** method and therefore needs a direct methodological comparison.
4. Tan et al. (July 2026) are the closest **information-theoretic concurrent work**: they explicitly measure adapter memorization/writability, entropy-coded artifact cost, and behavior-write bits. We therefore must **not** claim that no previous work measured “bits written by an adapter.”
5. The narrower defensible gap for this thesis is the combination of: **a fixed trained adapter; an exact decoder-visible serialized codec rate measured from the actual artifact and reloaded before evaluation; a rate--behavior retention frontier \(R^*(\tau)\); and the experiment asking whether that required exact rate tracks independently varied information in the fine-tuning data under compute-matched training.** This wording must be updated if the current campaign changes.

## Section IV: what can safely be claimed as the gap

The related work provides several useful but non-equivalent notions of reasoning state:

- explicit natural-language CoT steps (Wei et al.);
- layer/function-specific mechanistic pathways (Dutta et al.);
- step-specific representation geometry and correctness signals (Sun et al.);
- information/HSIC peaks (Qian et al.);
- spectral Gram-matrix latent states (Yu et al.);
- causally recoverable token-level hidden information (Mehrafarin et al.);
- learned continuous latent feedback (Coconut), with recent adversarial criticism (Zhang et al.);
- learned iterative attractor dynamics (EqR);
- implicit-CoT compression with a theory of skipped intermediate structure (Li et al.).

A defensible gap is therefore **not** “prior work has not found reasoning states.” It is: prior work generally evaluates or constructs a state decomposition relative to one analysis objective or intervention. Our sentence-lattice experiments ask whether the *same* decomposition is privileged simultaneously for answer information, symbolic-object updates, correctness prediction, compression, and causal influence; the later state-handoff work separately asks whether explicit training can manufacture a reusable finite-rate state contract even when a canonical native decomposition is unsupported.

# Submission-time recheck list

Before freezing `references.bib`:

1. Re-check venue status of **LoRAQuant**, **Tan et al.**, **Mehrafarin et al.**, **Do Latent Tokens Think?**, and **Chain Of Thought Compression**.
2. Prefer final proceedings BibTeX over arXiv BibTeX whenever a paper is published.
3. Re-check paper titles for title changes between arXiv and proceedings (ParetoQ is already one such case).
4. Preserve the Qian/HSIC caveat in prose; never call the computed statistic exact mutual information without qualification.
5. Preserve the Tan-et-al. distinction between capacity/writability, their coded artifact cost, behavior-write bits, and our exact serialized behavioral \(R^*\).
6. Do not cite the PAC-Bayes/compression papers merely to make the theory section look broader; include them only if an actual generalization claim survives in the thesis.
7. For every numerical literature claim retained in final prose, point this audit to the exact table/figure/abstract sentence before submission.