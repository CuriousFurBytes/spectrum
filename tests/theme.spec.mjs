import fs from "node:fs";
import assert from "node:assert/strict";

const requiredFiles = ["index.html", "styles.css", "theme.js"];
for (const file of requiredFiles) {
  assert.ok(fs.existsSync(file), `${file} should exist`);
}

const css = fs.readFileSync("styles.css", "utf8");
const html = fs.readFileSync("index.html", "utf8");
const js = fs.readFileSync("theme.js", "utf8");

const requiredCssVars = [
  "--bg-base",
  "--text-base",
  "--surface-2",
  "--surface-3",
  "--accent-purple-base",
  "--accent-red-base",
  "--accent-blue-base",
  "--accent-orange-base",
  "--accent-teal-base",
  "--status-danger-base",
  "--status-warning-base",
  "--status-success-base",
];
for (const varName of requiredCssVars) {
  assert.match(
    css,
    new RegExp(`${varName}\\s*:`),
    `styles.css should define ${varName}`,
  );
}

assert.match(
  html,
  /Monaspace Argon/i,
  "index.html should mention Monaspace Argon",
);
assert.match(
  html,
  /id="theme-mode"/,
  "index.html should include theme mode control",
);
assert.match(
  html,
  /id="accent-choice"/,
  "index.html should include accent control",
);
assert.match(html, /copy-btn/, "index.html should include copy buttons");
assert.match(
  js,
  /navigator\.clipboard\.writeText/,
  "theme.js should support copying",
);
assert.match(js, /dataset\.theme/, "theme.js should switch themes");
assert.match(js, /dataset\.accent/, "theme.js should switch accents");

console.log("All Spectrum design-system assertions passed.");
