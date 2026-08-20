# Master's Thesis

Working branch: `thesis-draft`

## Narrative target

This report is an internship/research narrative optimized to demonstrate research taste and ability to a strong general-ML audience. The intended balance is roughly 40% research chronology, 40% coherent scientific thesis, and 20% paper-like standalone results.

The scientific spine is:

> initial question → experimental design → evidence → failure/limitation → diagnosis → next hypothesis → stronger experiment → synthesis

## Current structure

1. Introduction and internship research trajectory
2. Technical background for a general AI/ML research audience
3. Fine-tuning under an information budget
4. Reasoning trajectories and objective-relative state
5. Toward information-theoretic limits of reasoning fine-tuning
6. Conclusion

`tex/` contains section-level LaTeX files. `media/` is organized by research phase rather than fixed chapter number so assets remain stable while the outline evolves. `notes/` contains the evidence-first research timeline, contribution audit, and figure plan. `bibliography/citation_audit.md` is the gatekeeper for related work: no paper should enter the thesis bibliography until its existence, publication status, exact claim, and relevance have been checked against a primary source.

## Source repositories

- `joey-david/itft_pilot` — May 2026 precursor for information-theoretic fine-tuning / LoRA rate-distortion pilots.
- `joey-david/reasoning-trajectory-private` — reasoning trajectories, thought units, causal/state-handoff branches.
- `joey-david/fineqcomp` — later rigorous exact-rate fine-tuning compression campaign.

## Drafting rule

Do not turn repository history into a software diary. Include an implementation correction only when it changed the scientific interpretation, experimental validity, or next research decision.
