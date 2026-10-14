---
name: starrtree-proven-pattern-capture
description: Capture a StarrTree website design as a reusable entry in the canonical Motherboard's 🏆 Proven Patterns tab whenever Max gives clear positive feedback on a completed or substantially implemented website, or asks to save a successful design. Use only for actual site work and preserve evidence, source references, implementation details, reusable parameters, ownership and limits.
---

# StarrTree Proven Pattern Capture

## Trigger

Run after Max clearly praises or approves a website that has been implemented in the current project context, including feedback such as “this is great,” “I love this,” or “this is exactly it.” Also run when Max directly asks to save a website design as a pattern. Treat this as standing authorization to record the approved work; do not ask Max for permission again.

Do not infer approval from the agent's own satisfaction, an unrendered mockup, a proposal, a prompt, or a partly finished build. If Max gives positive feedback but immediately requests substantial changes, wait until the revised result receives positive feedback. A minor follow-up request does not erase clear approval of the current version; record the approved state and note what remains in progress.

## Capture workflow

1. Resolve the current site, project/client, repository and the user-approved version from the active conversation and workspace. Do not search unrelated projects or include another client's material.
2. Read the live StarrTree AI Resource Motherboard and inspect the `🏆 Proven Patterns` tab headers before writing. Use the connected Google Sheets tools. The Motherboard remains the canonical library; do not create an alternative pattern database.
3. Extract the reusable design principle from the finished work: what it does, why it works, which visual primitives and interaction mechanics compose it, and which parameters make it reusable. Generalize the structure without flattening the project's distinctive art direction into a generic template.
4. Gather evidence that already exists: a preview or screenshot link, source Motherboard precedents, final prompt used, actual stack, repository and commit, observed desktop/mobile behavior, accessibility and reduced-motion behavior, performance measurements, implementation problems, and what worked. Use exact links and real measurements only. Mark missing evidence `Not captured`; never invent it or delay the entry to fill optional fields.
5. Check for an existing entry describing the same reusable behavior. Update that entry with the new approved implementation and evidence when it is the same pattern; otherwise assign the next available `SP-###` ID. Do not overwrite earlier project evidence—append the new project's evidence in its field while keeping the core pattern reusable.
6. Add or update one row in `🏆 Proven Patterns`. Set status to `Positive feedback captured` when Max has approved the design but full desktop/mobile/function evidence is missing. Set `Proven Pattern` only when an actual implementation is linked and observed, core interactions work, desktop and mobile behavior are checked, and limitations are recorded. Preserve the strength and scope of the evidence.
7. Keep the archive accurate and safe to reuse. Record project/client names only when appropriate; sanitize client-specific copy, contact details, private assets, unpublished data and account information. Respect asset ownership and license terms. A pattern entry does not transfer intellectual-property rights or permission to reuse client-owned work.
8. If live Sheet access or writing fails, create a clearly labeled pattern-capture candidate in the active website repository when appropriate, with a note that the canonical Motherboard update is pending. Do not claim it was saved to the Motherboard. Tell Max the specific boundary briefly.

Use [record-schema.md](references/record-schema.md) for the exact column mapping, evidence rules, deduplication and example. Link the resulting Motherboard row or tab in the delivery note, and say whether its status is feedback-captured or proven.

## Quality bar

- Keep source precedents, StarrTree's synthesis, generated assets, client assets and verified implementation evidence distinct.
- Label prompt text `StarrTree reconstructed prompt` unless exact original creator wording is independently verified with a source link.
- Record actual mobile behavior, not merely responsive CSS or an emulator viewport. Note device/tool limitations when relevant.
- Distinguish measured performance from a target or impression. Preserve both wins and failures so later builds can avoid repeated mistakes.
- Save reusable variables such as spacing, timing, scroll progress beats, crop positions, breakpoints, layer depth and interaction thresholds when they are actually present and tested.
- Never label a visual pattern `Proven` solely because Max likes a screenshot. The feedback itself warrants a library entry; proof status describes the implementation evidence.
