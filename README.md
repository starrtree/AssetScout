# StarrTree Visual Asset Scout / Creative Director

The primary deliverable is a reusable agent workflow that makes website-building agents research, design, implement and verify distinctive websites. Max should not need to operate a separate tool for this process.

Start with skills/starrtree-visual-asset-scout/SKILL.md and references/website-quality.md. AGENTS.md routes work in this repository to that workflow.

## Required behavior

1. Read the live Motherboard and understand the actual business, audience, assets and conversion goal.
2. Inspect real visual precedents where supported; curate 2–4 references autonomously and translate their principles into the brand.
3. Generate three substantially different directions, recommend the best fit, and proceed within existing authorization.
4. Verify compatible reusable code, framework versions, licenses, performance, mobile and accessibility.
5. Build the chosen experience in the actual website repository, from hero through conversion and closing sections.
6. Review rendered composition, typography, motion states, narrative continuity, touch/keyboard/reduced motion and working conversion paths. Fix observed weaknesses before handoff.

For small fixes, preserve the approved art direction and scout only what is necessary. Do not restart full exploration or force a manual selection/approval ritual.

The saved ChatGPT website-launch skill also invokes this Creative Director workflow for new sites and substantial visual work. Invocation depends on the receiving environment exposing the skills; this repository does not automatically install them into a separate PC.

## Canonical sources

- Motherboard: https://docs.google.com/spreadsheets/d/1ljrT6D9KpRr_KS5Eque_W9T88H4tqOjvUUiXWEubDeQ/edit
- Development specification: https://docs.google.com/document/d/1v-qXfUhvjuufDcxGih3efSMmFWaOgEgAng0nGlUxy7Q/edit

Keep changing resource data in the Sheet. Preserve prompt/source provenance and distinguish retrieved terms, reconstructions, inferences and tested implementation results. Never represent reconstructed wording as a verified original creator prompt.

## Existing prototype

web/, server.py and hosting adapters contain the earlier manual Visual Studio prototype. It browses references and assembles prompts, but it is not the requested default website-building workflow. Retain it as an experiment; do not require its use or extend it without an explicit request. DEPLOYMENT.md records its previous private test publication.

The rule-based UI is not the creative agent. The saved skill guides the actual coding/design agent and does not promise design awards. Award-caliber is an aspiration evaluated through concrete visual and functional evidence.

## Verification and privacy

npm test covers hosted access/encryption behavior; engine tests need a configured encrypted source. npm run build builds the earlier interface. Those checks alone do not prove a client's website is well designed or functioning. Follow the skill's rendered-experience quality review.

This repository is public. Do not commit private Motherboard exports, client briefs or credentials. Existing source adapters support authorized data access; they do not authorize publishing the Sheet. No separate resource database is required.
