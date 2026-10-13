# Refresh this Studio from a Work chat

Fetch CURRENT metadata for the canonical spreadsheet:
https://docs.google.com/spreadsheets/d/1ljrT6D9KpRr_KS5Eque_W9T88H4tqOjvUUiXWEubDeQ/edit

Read exact visible tab names and grid bounds. Read all populated tab contents in bounded 200-row chunks, retaining headers and original row positions. Do not stop at the first blank chunk if the grid has later rows. Read Start Here, Resources, Inspiration Board, 🐙 GitHub Deep Dives and 🧭 Visual Workspace Blueprint at minimum. Include all eight current tabs when feasible. Do not edit the workbook.

Write JSON matching this contract:

```json
{
  "schemaVersion": 1,
  "spreadsheetId": "1ljrT6D9KpRr_KS5Eque_W9T88H4tqOjvUUiXWEubDeQ",
  "sourceUrl": "https://docs.google.com/spreadsheets/d/1ljrT6D9KpRr_KS5Eque_W9T88H4tqOjvUUiXWEubDeQ/edit",
  "fetchedAt": "ACTUAL_ISO_TIMESTAMP_OF_READ",
  "mode": "snapshot",
  "tabs": [
    {"title": "EXACT_TAB_TITLE", "sheetId": 123, "values": [["actual headers"], ["actual cells"]]}
  ]
}
```

Use actual sheet IDs and values returned from the connector. The schematic values above are not valid replacement data. Keep null/blank cells aligned; include blank intervening rows so citations remain correct. Do not include credentials. If any required read fails, report it instead of producing an apparently complete bundle.

Save and provide the JSON. In the Studio choose Import export. It will validate the canonical ID and required headers, replace the session index, and invalidate directions that were generated against old data. Existing clusters resolve by tab + title + URL rather than row number; renamed/deleted references must be reviewed.
