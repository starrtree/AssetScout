# Asset direction and layered scene choreography

## Purpose and decision

During new website design, assess whether purpose-made assets can express the chosen brand concept better than generic interface components. If justified, own asset planning, generation, integration and review as part of the authorized website build. Do not require Max to operate a generator or prompt compiler.

Prefer the client's actual photos, products, artwork and transparent cutouts for proof of their work. Generate supporting scene art, texture or conceptual illustration only where appropriate. Never invent client portfolio work, modify tattoos/product details unnoticed, or substitute a generated person's identity for an actual artist/client.

Choose among native SVG/CSS for paths/geometry, layered transparent raster art for illustrative 2.5D scenes, canvas/shaders for deliberate distortion, actual 3D for viewpoint/occlusion changes, and supplied/generated video only when appropriate and available. No Higgsfield/video subscription is a prerequisite. Verify tool availability; use the built-in image-generation skill when exposed. Do not silently purchase credits, use a paid API, or claim image generation exists in every PC Codex setup.

## Plan assets before generating

State one scene concept and its role in the whole visitor journey. Specify focal subject, composition, depth bands, lighting, palette, framing and copy-safe regions. Start with one signature scene, normally a small useful set of layers; each asset must have a narrative or visual role. Do not generate decoration merely to consume every resource.

Create a compact asset manifest inside the actual website project containing: ID/name; role; genuine client source or generated provenance; reference/master image; transparent/opaque format; intended pixel size; common coordinate frame; alignment landmark; resting position; transform origin; depth/z order; animation role; trigger/scroll interval; mobile/reduced-motion state; alt text/decorative semantics; rights/approval and final file path.

Generate one reference/master composition when required to establish visual consistency. Derive or generate supporting assets with that approved reference and matching camera angle, scale, lighting and style. A master image is a visual anchor, not an automatically layered PSD. Independent image generations do not guarantee exact assembly fit. Request individual layers as separate assets; do not present a sheet of pieces as ready-to-use cutouts. Inspect alignment before continuing; revise mismatched parts.

For isolated raster assets, explicitly request transparent output through the supported image tool. Inspect the actual alpha and composite on both dark and light backgrounds; a .png extension or checkerboard-looking image does not prove transparency. Watch for baked backgrounds, white halos, incompatible premultiplied edges and unwanted shadows. Keep vector typography/client logos editable when viable; verify exact lettering before using generated type.

Keep final project assets in the actual repo asset directory. Preserve provenance/reference filenames. Optimize through supported export tools while preserving transparency; PNG is an authoring choice, not a requirement for every delivered image. Alpha-capable WebP may be appropriate after compatibility/quality checks.

## Choreograph a scene, not unrelated animations

Use one normalized progress variable per narrative scene, driven by native scroll or an appropriate existing controller. Establish named beats: introduction → reveal/assembly → readable hold → transition into content. Record exact intervals and transforms. Separate an outer scene/camera-like transform from local layer transforms so scale/rotation and parallax do not fight over the same property.

Make the scene readable at progress 0, 0.25, 0.5, 0.75 and 1, and check reversing scroll. Preserve original relationships when the scene settles. Use bounded translation/rotation/scale/opacity and purposeful masks; provide a clear conversion path before/through the scene. Pointer behavior is a fine-pointer enhancement, not a requirement to understand the work.

Technique families:

- **Layered parallax:** foreground/midground/background move at different rates. A fixed crop with scale/perspective approximates a dolly/push-in; it does not reveal an unseen side of a flat image.
- **Exploded assembly:** aligned component layers separate and return around their real anchors. Plan hidden/overlapping regions; flat pieces with missing backs cannot represent arbitrary 3D rotation.
- **Ambient scene layers:** a few background motifs, particles or foreground accents establish depth and continuity; they stay clear of copy and controls.
- **Mask/path choreography:** SVG stroke progression, clipping and simple canvas masks can animate supplied line art or reveal textures with few raster assets. Choose a shader only for an essential effect.

Do not independently generate many sequential PNG frames as a default substitute for video: subject drift, registration differences, transfer/decode size and memory can undermine the effect. A frame sequence is justified only with a coherent rendered/supplied sequence and an explicit preload/decode budget. Use a 3D asset or video when true camera orbit, changing viewpoint, cloth simulation or complex continuous deformation is essential.

## Performance and review

Budget decoded memory as well as compressed download size. Large alpha layers and browser compositing surfaces can be costly. Match asset dimensions to projected display size, limit simultaneous large layers, reserve layout dimensions, load the first visible scene promptly and defer later scenes. Prefer transform/opacity animation; profile expensive filters and masks.

Use mobile art direction rather than merely shrinking the desktop scene. Reduce layer count, simplify travel/overlap and retain a readable complete composition. Reduced motion shows a coherent still with the same content/actions. Handle failed images, missing WebGL and unavailable generation tools explicitly.

Review actual alpha, crop, silhouette, anatomy/product fidelity, matching light/perspective, alignment, intermediate scroll states, reverse scroll, typography/CTA overlap and transition into the next section. Run the existing rendered website quality review. Revise before claiming the first pass is ready; no guarantee of an astounding first generation.

## Learning

Capture reusable principles and proven parameter ranges in the live Design Language Matrix: source asset roles → primitive IDs → combination → actual implementation → observations. Keep newly proposed layering/assembly combinations untested until a real build validates them. Store changing code-library facts in the existing Resources/GitHub records. Do not create a second asset database or require the manual Studio.
