const root = document.documentElement;
const modeSelect = document.getElementById("theme-mode");
const accentSelect = document.getElementById("accent-choice");

const storedTheme = localStorage.getItem("spectrum-theme");
const storedAccent = localStorage.getItem("spectrum-accent");

if (storedTheme) {
  root.dataset.theme = storedTheme;
  modeSelect.value = storedTheme;
}

if (storedAccent) {
  root.dataset.accent = storedAccent;
  accentSelect.value = storedAccent;
}

modeSelect.addEventListener("change", (event) => {
  const nextTheme = event.target.value;
  root.dataset.theme = nextTheme;
  localStorage.setItem("spectrum-theme", nextTheme);
});

accentSelect.addEventListener("change", (event) => {
  const nextAccent = event.target.value;
  root.dataset.accent = nextAccent;
  localStorage.setItem("spectrum-accent", nextAccent);
});

const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    if (!value) {
      return;
    }

    await navigator.clipboard.writeText(value);
    button.dataset.copied = "true";
    button.textContent = "Copied";

    setTimeout(() => {
      button.dataset.copied = "false";
      button.textContent = "Copy";
    }, 900);
  });
});
