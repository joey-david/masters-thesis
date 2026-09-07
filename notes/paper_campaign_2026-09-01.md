# Two-paper experiment campaign — 1 September 2026

This is a status index, not a result claim. Promote only completed artifacts.

## Paper 1 — predicting the rate of a fine-tuning correction

- Locked question and analysis: [`fineQComp/results/1_rate_behaviour_frontier/transposed_receiver_panel/lock.json`](../../fineQComp/results/1_rate_behaviour_frontier/transposed_receiver_panel/lock.json)
- Fixed 63-cell panel: [`fineQComp/configs/transposed_receiver_panel.yaml`](../../fineQComp/configs/transposed_receiver_panel.yaml)
- Existing-output inventory: 60 complete cells from 26–27 August; Qwen3/math screened out at all three seeds. The outputs predate the analysis lock, so this is a blinded re-analysis, not a prospective panel.
- Jean-Zay smoke jobs: train `1647162` passed; frozen measure `1647163` passed.
- New training jobs: none; the complete existing runs will be reused.
- Frozen-measure array: Jean-Zay `1647239`, 21 cells, at most 21 H100s, two-hour limit per cell.
- Claim limit: this panel can test receiver-axis signal. It cannot establish prediction on a new task-model pair; that needs a later untouched corpus.

## Paper 2 — decoding versus repeated reuse of a reasoning state

- Locked conditions, controls, and gates: [`reasoning-trajectory-private/experiments/natural_state_reuse_lock.json`](../../reasoning-trajectory-private/experiments/natural_state_reuse_lock.json)
- Qwen run: [`config.yaml`](../../reasoning-trajectory-private/runs/Qwen2.5-7B-Instruct/interventions/musique_state_reuse/config.yaml)
- Mistral run: [`config.yaml`](../../reasoning-trajectory-private/runs/Mistral-7B-Instruct-v0.3/interventions/musique_state_reuse/config.yaml)
- Data: all 2,417 answerable MuSiQue dev questions; official conversion at commit `922ac98f19a201998dbdae6d7f2887a5258dbdeb`; SHA-256 `eb81ddc44b114309b6a4ad8022a5fb8d376783f84441392521b17043fd243a20`.
- Jean-Zay smoke jobs: Qwen `1647164` exposed the Transformers dtype mismatch; retry `1647186` passed on two real questions with 38 valid result rows.
- Full arrays: Qwen `1647240` and Mistral `1647241`; 12 deterministic shards each, two-hour limit per shard.
- Claim limit: this assay tests explicit textual states, not latent neural states. Failed competence or state-use gates permit no reuse claim.
