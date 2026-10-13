# StarrTree AssetScout / Visual Studio

Turn informal design ideas into exact visual references, a visible Context Cluster, three different art directions, technical compatibility recommendations and a portable implementation prompt.

## Working phone test

The owner-private phone build is hosted through ChatGPT Sites. The verified link will be recorded in DEPLOYMENT.md after publication. Open it while signed into the owning ChatGPT account. No local Python, Node setup or Google credentials are required for that test.

The current hosted build uses a dated read-only export from the canonical Motherboard. It is visibly labeled as a snapshot. Live Google OAuth is not connected; ask the Work agent to refresh the private hosted export. The Sheet remains the resource authority.

## Product surfaces

- Discover: vocabulary-aware search with matched-term explanations and original source links.
- Canvas: exact reference selection, reorder, brief, local cluster saves and JSON export/import.
- Direct: three distinct composition/material/camera/interaction routes.
- Prompt: explicit implementation asset selection, compatibility analysis and Markdown/JSON export.
- Preview: schematic composition comparison and user-attached screenshots.

The local direction engine uses transparent rules, not a connected language model. The reusable agent skill in `skills/starrtree-visual-asset-scout` performs the live-read creative workflow in supported coding/chat environments. Visual tiles are labeled schematic sketches. Successful implementation evidence is required before promoting a pattern.

## Source data and privacy

This repository is public. Plaintext Motherboard exports, client briefs, keys and private source reports are excluded. It contains the full interface/engine, local read adapter, hosted access adapter, skill instructions and build/test code.

The private ChatGPT Site contains the dated export under owner-only platform access. A separate optional Vercel adapter uses AES-GCM encryption and signed HttpOnly sessions; it requires server-side source/access keys. Its environment provisioning is not completed because Vercel project creation was rejected with HTTP 403. Do not interpret the adapter's presence as a working Vercel deployment.

## Local continuation

1. Fetch a current Motherboard export using WORK-EXPORT-INSTRUCTIONS.md and place it in ignored `data/motherboard.json`.
2. Run `python3 server.py`, or `py server.py` on Windows.
3. Open http://127.0.0.1:8765.

For local live Google reads, set GOOGLE_SHEETS_ACCESS_TOKEN or use `python3 server.py --google-token`. The token is server-side only. The local adapter reads the canonical workbook in metadata-derived chunks.

The web interface has a hosted login bootstrap. For local Python use, the server bypasses login by supplying normal snapshot/health routes; open the loopback URL without an access fragment.

## Build and verification

`npm run build` creates public/ from web/ without copying source exports into public assets. `npm test` runs hosted auth/encryption tests. Engine tests also run when SCOUT_DATA_KEY is configured for an encrypted snapshot. Original engine/server tests passed in the Work development run. No npm dependencies are required.

## Vercel adapter (prepared, not deployed)

`scripts/encrypt-source.mjs` turns a fresh export into `data/motherboard.encrypted.json`. It prompts for an externally provisioned base64 32-byte key, does not print or persist the key, and encrypts with AES-256-GCM.

Required server environment: SCOUT_DATA_KEY and SCOUT_ACCESS_HASH (SHA-256 of a random private access token). The access link supplies the token as a browser fragment, exchanges it for a signed secure cookie, and removes the fragment from browser history. The snapshot/refresh routes reject unauthenticated requests. GOOGLE_SHEETS_ACCESS_TOKEN is optional.

Never commit environment files or keys. Use the connected hosting provider's approved secret configuration workflow. Use the working private ChatGPT Site to test now.

## Next useful slice

Use one actual client brief in the hosted app, then add a schema-validated model adapter and authorized reference previews. Keep direct Motherboard refresh and approved pattern writeback scoped to that same canonical Sheet.
