# Proven Patterns record schema

Read the live header row in `🏆 Proven Patterns` before each write. The current columns are:

| Column | Capture guidance |
| --- | --- |
| Pattern ID | Stable `SP-###`; reuse an existing ID for the same pattern. |
| Pattern Status | `Positive feedback captured`, `Proven Pattern`, or `Deprecated`. |
| Pattern Name | Short memorable name based on the reusable design behavior. |
| Reusable Pattern (principle) | Explain the repeatable solution and the problem it solves. |
| Visual Grammar / Interaction Contract | Materials, geometry, type, composition, light, motion, triggers, behavior, exit and fallbacks. |
| Audience / Goal | Visitor and business outcome this implementation served. |
| Project / Client (sanitized) | Project and client context, with private/client-specific details removed as needed. |
| User Approval (summary) | Brief factual description of the positive feedback and the approved version. Do not overquote. |
| Approved Date | Date feedback was given, in ISO `YYYY-MM-DD` form. |
| Preview / Screenshot Link | Existing preview or approved repo screenshot link. Do not save sensitive screenshots to Library. |
| Original Motherboard References | Specific Inspiration Board, Resources, GitHub Deep Dives and Matrix references used. |
| StarrTree Reconstructed Prompt / Final Prompt | The actual successful direction/build prompt, labeled as StarrTree reconstruction. Keep client secrets out. |
| Actual Stack | Implemented framework, libraries and rendering approach, with versions only when verified. |
| Repository / Commit | Exact repository and commit that contains the approved implementation, if available. |
| Desktop Result | Observed browser/device, viewport if known, interaction and outcome. |
| Mobile Result | Observed device/browser and touch/scroll/fallback behavior; mark untested honestly. |
| Function / Accessibility / Reduced-Motion | Tested controls, keyboard/semantics, contrast, reduced-motion and fallback results. |
| Performance Notes / Measurements | Actual measurements and test conditions, or `Not measured`. |
| Implementation Problems / Tradeoffs | Bugs, compromises, incompatibilities and how they were resolved. |
| What Worked | Specific design and implementation choices that succeeded. |
| Reusable Parameters / Variables | Values or ranges that can be adapted safely, with tested status. |
| Assets / Ownership / License | Asset origins, generated/client/third-party ownership, license checks and reuse limits. |
| Usage Boundaries / Anti-patterns | Where the pattern fits, where it does not, accessibility/performance limits and things to avoid. |
| Related Matrix IDs | Relevant `V###` and `C###` entries in the live Design Language Matrix. |
| Provenance / Evidence Notes | Separate user approval, source evidence, implementation evidence and unverified claims. |

## Evidence states

`Positive feedback captured` means Max approved the design, so the reusable idea is worth preserving, but one or more implementation checks are missing. Record every missing or unknown item plainly.

`Proven Pattern` requires a link to the actual implementation plus observed working interactions on desktop and mobile, relevant accessibility and reduced-motion review, and honest performance notes. If performance was not measured, say so; do not imply a speed result. Human approval is required and is already represented by Max's explicit positive feedback.

Keep an entry focused on a coherent reusable pattern. When a project introduces a materially different interaction or implementation principle, add a separate entry and connect it through Related Matrix IDs instead of bundling unrelated effects into a large recipe. Update an existing entry when it is the same core behavior, and preserve evidence from each project rather than replacing the history.

## Example

An approved portfolio uses separately generated transparent floral layers, a cutout portrait, and a scroll-timed assembly reveal. Record one pattern describing the shared coordinate frame, layer order, scroll beats, static/mobile fallback and crop/depth parameters. Link the actual site commit and available reference rows. If mobile behavior was not inspected, save it as `Positive feedback captured` and mark mobile untested; do not call it proven yet.
