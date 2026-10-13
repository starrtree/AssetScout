"""Loopback-only, read-only Motherboard adapter. Python standard library only."""
import json
import os
from pathlib import Path
from datetime import datetime, timezone
from urllib.request import Request, urlopen
from urllib.parse import urlencode, urlsplit
from urllib.error import HTTPError
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

ROOT = Path(__file__).resolve().parent
SHEET_ID = '1ljrT6D9KpRr_KS5Eque_W9T88H4tqOjvUUiXWEubDeQ'
REQUIRED = ['Start Here', 'Resources', 'Inspiration Board', '🐙 GitHub Deep Dives', '🧭 Visual Workspace Blueprint']

def column_name(n):
    result = ''
    while n:
        n, r = divmod(n - 1, 26)
        result = chr(65 + r) + result
    return result

def read_google(token, suffix):
    req = Request('https://sheets.googleapis.com/v4/spreadsheets/' + SHEET_ID + suffix,
                  headers={'Authorization': 'Bearer ' + token})
    with urlopen(req, timeout=25) as response:
        return json.load(response)

def fetch_live(token, reader=read_google):
    meta = reader(token, '?' + urlencode({'fields': 'spreadsheetId,spreadsheetUrl,sheets.properties'}))
    props = [s['properties'] for s in meta['sheets'] if s['properties'].get('sheetType', 'GRID') == 'GRID']
    if not all(t in [p['title'] for p in props] for t in REQUIRED):
        raise ValueError('A required Motherboard tab is missing; existing data was retained.')
    tabs = []
    for p in props:
        grid = p['gridProperties']
        rows, cols = grid['rowCount'], grid['columnCount']
        if rows * cols > 250000:
            raise ValueError('Sheet exceeds the P0 read budget. Use a bounded Work export.')
        title = p['title'].replace("'", "''")
        ranges = [f"'{title}'!A{i}:{column_name(cols)}{min(i + 199, rows)}" for i in range(1, rows + 1, 200)]
        result = reader(token, '/values:batchGet?' + urlencode({'ranges': ranges, 'valueRenderOption': 'FORMATTED_VALUE'}, doseq=True))
        values = []
        for i, vr in enumerate(result.get('valueRanges', [])):
            chunk = vr.get('values', [])
            values.extend(chunk)
            if i < len(ranges) - 1:
                values.extend([[] for _ in range(200-len(chunk))])
        while values and not values[-1]:
            values.pop()
        tabs.append({'title': p['title'], 'sheetId': p['sheetId'], 'values': values})
    return {'schemaVersion': 1, 'spreadsheetId': SHEET_ID,
            'sourceUrl': meta.get('spreadsheetUrl', f'https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit'),
            'fetchedAt': datetime.now(timezone.utc).isoformat(), 'mode': 'live', 'tabs': tabs}

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT / 'web'), **kwargs)

    def log_message(self, fmt, *args):
        pass  # Do not log query strings or data.

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'")
        super().end_headers()

    def reply(self, code, data):
        body = json.dumps(data, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        host = self.headers.get('Host', '').split(':')[0]
        if host not in ('127.0.0.1', 'localhost'):
            return self.reply(403, {'error': 'Loopback host required.'})
        path = urlsplit(self.path).path
        if path == '/api/motherboard':
            token = os.environ.get('GOOGLE_SHEETS_ACCESS_TOKEN')
            if not token:
                return self.reply(503, {'error': 'Live access is not configured. Set GOOGLE_SHEETS_ACCESS_TOKEN on the local server, or import a fresh Work export. The dated snapshot remains available.', 'code': 'not_configured'})
            try:
                return self.reply(200, fetch_live(token))
            except HTTPError as exc:
                return self.reply(502, {'error': f'Google rejected the read (HTTP {exc.code}). Check token expiry, Sheets API access and Sheet permission. Existing data was retained.'})
            except (OSError, ValueError, KeyError):
                return self.reply(502, {'error': 'Live refresh failed. Check connection and Sheet schema. Existing data was retained.'})
        if path == '/api/snapshot':
            return self.reply(200, json.loads((ROOT / 'data/motherboard.json').read_text()))
        if path == '/api/health':
            return self.reply(200, {'ok': True, 'liveConfigured': bool(os.environ.get('GOOGLE_SHEETS_ACCESS_TOKEN'))})
        if path.startswith('/api/'):
            return self.reply(404, {'error': 'Unknown route'})
        return super().do_GET()

if __name__ == '__main__':
    import sys
    if '--google-token' in sys.argv:
        import getpass
        os.environ['GOOGLE_SHEETS_ACCESS_TOKEN'] = getpass.getpass('Read-only Google OAuth access token (hidden): ').strip()
    port = int(os.environ.get('PORT', '8765'))
    print(f'StarrTree Visual Studio: http://127.0.0.1:{port}', flush=True)
    ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()
