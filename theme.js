const root = typeof document !== 'undefined' ? document.documentElement : null;

export function splitHeading(text) {
  const normalized = text.trim().replace(/\s+/g, ' ');
  if (!normalized) return { lead: '', accent: '' };

  const words = normalized.split(' ');
  if (words.length === 1) {
    const midpoint = Math.ceil(words[0].length / 2);
    return { lead: words[0].slice(0, midpoint), accent: words[0].slice(midpoint) };
  }

  const leadCount = Math.ceil(words.length / 2);
  return {
    lead: words.slice(0, leadCount).join(' '),
    accent: words.slice(leadCount).join(' ')
  };
}

function renderSplitHeadings() {
  if (!root) return;
  document.querySelectorAll('[data-split-heading]').forEach((heading) => {
    const source = heading.dataset.splitHeading || heading.textContent || '';
    const { lead, accent } = splitHeading(source);
    heading.innerHTML = `<span class="heading-lead">${lead}</span>${accent ? ` <span class="heading-accent">${accent}</span>` : ''}`;
  });
}

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem('spectrum-theme', theme);
}

function setAccent(accent) {
  root.dataset.accent = accent;
  localStorage.setItem('spectrum-accent', accent);
}

function setupThemeControls() {
  if (!root) return;

  const themeSelect = document.querySelector('#theme-mode');
  const accentSelect = document.querySelector('#theme-accent');

  const initialTheme = localStorage.getItem('spectrum-theme') || 'dark';
  const initialAccent = localStorage.getItem('spectrum-accent') || 'purple';

  setTheme(initialTheme);
  setAccent(initialAccent);

  if (themeSelect) {
    themeSelect.value = initialTheme;
    themeSelect.addEventListener('change', (event) => setTheme(event.target.value));
  }

  if (accentSelect) {
    accentSelect.value = initialAccent;
    accentSelect.addEventListener('change', (event) => setAccent(event.target.value));
  }
}

function setupCopyButtons() {
  if (!root) return;
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const format = button.dataset.copy;
      const value = button.closest('[data-color]')?.dataset[format];
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = 'Copied';
        setTimeout(() => {
          button.textContent = `Copy ${format.toUpperCase()}`;
        }, 900);
      } catch {
        button.textContent = 'Copy failed';
      }
    });
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    renderSplitHeadings();
    setupThemeControls();
    setupCopyButtons();
  });
}
