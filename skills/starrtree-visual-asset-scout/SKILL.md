---
name: starrtree-visual-asset-scout
description: Default creative-direction workflow for building, designing, or redesigning StarrTree and client websites. Automatically research the live Motherboard, inspect real visual references, synthesize distinctive art direction, select compatible code assets, implement the chosen experience, and verify visual and functional quality. Use for website/page builds, portfolios, immersive UI, hero/gallery/motion work, and Web Asset Scout or Visual Prompt Scout requests; do not require the user to invoke the skill or operate a separate tool.
---

# StarrTree Visual Asset Scout / Creative Director

## Agent-owned default

Perform this workflow as part of the website agent's job. The user supplies intent and assets; the agent owns scouting, synthesis, implementation and testing. Never require the user to open AssetScout/Visual Studio, select cards, run scripts, or copy a prompt between agents to get this behavior.

For a new site or substantial redesign, perform the full creative pass before implementing the visual system. For a small fix on an established site, preserve its approved art direction and scout only the affected mechanic. Do not restart a full design exploration for every bug fix.

When website implementation is authorized, continue through working code and verification; a brief or prompt alone is not completion. When only design planning is requested, deliver the creative direction and implementation brief without unrequested code. Propose three distinct routes, recommend the best fit, and proceed within existing authorization unless a missing decision materially changes scope or contradicts an approved direction. Keep the alternatives concise; do not force a manual three-way approval ritual.

Treat award-caliber design as a quality aspiration assessed through composition, originality, motion craft, usability and execution. Never claim an award, nomination or guaranteed award-winning result. Read [website-quality.md](references/website-quality.md) for implementation and review criteria.

## Ground the work

Read the CURRENT live sources through connected Google Drive/Sheets tools. Load applicable skills and discover schemas before calls. Do not reuse a prior chat summary or bundled snapshot as a current read.

- Motherboard (canonical): https://docs.google.com/spreadsheets/d/1ljrT6D9KpRr_KS5Eque_W9T88H4tqOjvUUiXWEubDeQ/edit
- Development specification: https://docs.google.com/document/d/1v-qXfUhvjuufDcxGih3efSMmFWaOgEgAng0nGlUxy7Q/edit

Inspect metadata, exact tab names and headers. Read Start Here for current rules, Inspiration Board for precedents/vocabulary, Resources for reusable assets, and 🐙 GitHub Deep Dives for code intelligence. Read 🧭 Visual Workspace Blueprint when working on context selection or the Studio. Read the full specification when changing Studio architecture. Page bounded ranges through relevant populated content; record fetch time, source URL, tab and row.

Keep the Sheet canonical and read-only unless a write is explicitly requested. Treat specialized resource tabs as views, not independent databases. Never store credentials, private conversation contents, or changing resource copies inside this skill.

If live access fails, say which read failed. Offer a dated supplied/export snapshot with explicit freshness limits and continue useful work. Never say a snapshot is live. Do not silently make the Sheet public or scrape around access restrictions.

## Execute the loop

1. **Understand intent.** Preserve original wording. Extract business goal, audience, brand intent, conversion, framework and nonnegotiable constraints. Label routine assumptions; ask only for decisions that materially change the result. Never invent client identity, testimonials, cultural motifs, pricing or approvals.
2. **Discover visuals.** Search descriptions, use cases, tags, visual/motion keywords and reconstructed prompts—not just names. Expand vague words into material, geometry, typography, composition, color, lighting, camera, animation, scroll, cursor, shaders, masking, transitions and spatial relationships. Retrieve 2–4 relevant precedents. Explain why each fits; give vocabulary with source rows. Label new terms as StarrTree synthesis; do not imply they appeared in the source.
3. **Define the Context Cluster.** Honor exact user selections when provided. Otherwise curate 2–4 references autonomously and state briefly why they fit; do not ask the user to assemble context. Include stable identity (tab + title + source URL), current row link, summary, prompt provenance and per-reference role. Exclude unrelated precedents. Preserve missing public URLs as missing. Re-resolve identities after refresh instead of trusting row numbers after sorting.
4. **Generate three distinct directions.** Vary composition, material behavior, interaction and technical approach—not just names/colors. Adapt each to the actual brand: visual thesis, hierarchy, palette/type intent, precise mechanics, source roles, mobile/static version, candidate stack and complexity. Preserve alternatives before recommending one. Label local rule-based composition honestly; a diagram is not a rendered site or source screenshot.
5. **Scout implementation.** Search Resources and GitHub Deep Dives using selected vocabulary. Keep code candidates separate from visual precedents. Read official docs, license files, package manifests and relevant source before claiming current compatibility or installing. Use dated Motherboard notes as leads, not fresh validation. Prefer one component/technique over its entire showcase app. Record exact URLs; separate candidate, tested and unresolved versions.
6. **Check combinations.** Evaluate framework/React major pairing, peer dependencies, WebGL contexts/rendering owners, GPU/asset cost, mobile/Safari, semantics/accessibility, reduced motion, licenses, difficulty and readiness. Flag unknowns. A Sheet license assertion is not a fresh legal determination. Do not mark a combination compatible solely because each library works independently. Prefer native HTML/CSS, then one small effect; use a 3D engine only when real 3D interaction is essential.
7. **Compile and implement.** Follow [packet-contract.md](references/packet-contract.md). Embed useful excerpts, URLs and dated verification in the implementation brief. Distinguish inspiration, candidate code, chosen code and rejected combinations. Include acceptance criteria and proposed budgets, separate from measurements. Use this brief yourself while building; export a prompt only when useful or requested. Implement the chosen composition and signature interaction in the actual client repository. Preserve working integrations and unrelated edits. Do not create a separate showcase app instead of improving the requested website.
8. **Validate.** Trace retrieved terms to sources. Check that removing a selected reference removes its influence and that three meaningfully different directions exist. Compare original request with output: specify what changes, when, by how much, on which device, and failure/reduced-motion behavior. Do not claim implementation success without observed results.
9. **Learn after delivery.** Export an unverified pattern candidate. Promote to Proven Pattern only after successful implementation, evidence and human approval. Append/link into the canonical Motherboard only with write authorization; never create another resource authority.

## Provenance

Label **Verified original creator prompt** only when exact wording is retrieved from a creator/official source with URL and retrieval date. Public summaries, visible controls, an inaccessible Copy Prompt button and inference do not qualify.

Label **StarrTree reconstructed prompt** for synthesis/adaptation. Keep official prompt summaries marked as summaries. Preserve attribution and distinguish recorded behaviors from proposed ones. Follow quotation limits; never reconstruct wording as a quote.

Distinguish source screenshots, authorized user uploads, generated mockups and schematic studies. Do not claim to have seen a demo when only its metadata was read.

## Focus and delivery

Complete intent → live scouting → precise language → three directions → compatible assets → implementation → visual/functional review. Do not build tools for the user to operate unless explicitly requested. Keep the manual Visual Studio prototype out of the website-building path. Use starrtree-website-launch for delivery and launch checks when client implementation is authorized.

Report what was retrieved, chosen and verified; what is runnable; and concrete boundaries. Never promise automatic invocation in every future chat. The skill is discoverable and explicitly invokable, subject to its receiving environment.
