from pathlib import Path
import re

errors = []
html = Path('index.html').read_text(encoding='utf-8')
css = Path('styles.css').read_text(encoding='utf-8')

if 'Monaspace+Argon' not in html:
    errors.append('Monaspace Argon font link missing.')

for required in ['--bg-color', '--text-color', '--surface-1', '--surface-2', '--surface-3']:
    if required not in css:
        errors.append(f'Missing required base token: {required}')

for accent in ['purple', 'blue', 'red', 'orange', 'teal']:
    if f':root[data-accent="{accent}"]' not in css:
        errors.append(f'Missing accent selector for {accent}.')

if len(re.findall(r'--raw-[a-z]+-\d{3}:', css)) < 30:
    errors.append('Expected richer tonal scale token count.')

if errors:
    for e in errors:
        print(f'ERROR: {e}')
    raise SystemExit(1)

print('lint_theme.py: OK')
