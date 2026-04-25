import re
import unittest
from pathlib import Path

CSS_PATH = Path('styles.css')
HTML_PATH = Path('index.html')


def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) / 255 for i in (0, 2, 4))


def rel_lum(c):
    def f(v):
        return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = [f(x) for x in c]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la = rel_lum(hex_to_rgb(a))
    lb = rel_lum(hex_to_rgb(b))
    lighter, darker = max(la, lb), min(la, lb)
    return (lighter + 0.05) / (darker + 0.05)


class ThemeTests(unittest.TestCase):
    def test_files_exist(self):
        self.assertTrue(CSS_PATH.exists(), 'styles.css is missing')
        self.assertTrue(HTML_PATH.exists(), 'index.html is missing')

    def test_required_css_variables(self):
        text = CSS_PATH.read_text(encoding='utf-8')
        required = [
            '--bg-color', '--text-color', '--surface-1', '--surface-2',
            '--accent-primary', '--standard-error-1', '--standard-warning-1', '--standard-success-1'
        ]
        for token in required:
            self.assertIn(token, text)

    def test_background_text_contrast_minimum(self):
        text = CSS_PATH.read_text(encoding='utf-8')
        raw = dict(re.findall(r'--raw-([\w-]+):\s*(#[0-9a-fA-F]{6});', text))
        # verify planned pair at AAA-ish for body text
        bg = raw['ink-950']
        fg = raw['light-050']
        self.assertGreaterEqual(contrast(bg, fg), 7.0)

    def test_theme_toggle_markup_exists(self):
        html = HTML_PATH.read_text(encoding='utf-8')
        self.assertIn('id="theme-select"', html)
        self.assertIn('id="accent-select"', html)


if __name__ == '__main__':
    unittest.main()
