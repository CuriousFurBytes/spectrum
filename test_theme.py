from pathlib import Path
import re

css = Path('spectrum-theme.css')
html = Path('index.html')

assert css.exists(), 'spectrum-theme.css should exist'
assert html.exists(), 'index.html should exist'

text = css.read_text()
for token in [
    '--color-bg', '--color-text', '--surface-2', '--surface-3',
    '--accent-primary', '--accent-100', '--accent-700',
    '--status-error-500', '--status-warning-500', '--status-success-500'
]:
    assert token in text, f'missing token {token}'

html_text = html.read_text()
for pattern in [
    'id="theme-select"',
    'id="accent-select"',
    'copy-btn',
    'Monaspace Argon',
]:
    assert pattern in html_text, f'missing {pattern}'

assert re.search(r'data-theme="dark"', html_text), 'default dark theme expected'
