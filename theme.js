(() => {
  const modeKey = "wx-theme-mode";
  const paletteKey = "wx-theme-palette";
  const body = document.body;
  const modeSelect = document.getElementById("modeSelect");
  const paletteSelect = document.getElementById("paletteSelect");
  if (!modeSelect || !paletteSelect) return;

  const applyMode = (mode) => {
    const isSystem = mode === "system";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = isSystem ? prefersDark : mode === "dark";
    body.classList.toggle("dark", useDark);
  };

  const applyPalette = (palette) => {
    body.classList.remove("palette-sakura", "palette-ocean", "palette-minimal");
    body.classList.add(`palette-${palette}`);
  };

  const savedMode = localStorage.getItem(modeKey) || "system";
  const savedPalette = localStorage.getItem(paletteKey) || "sakura";
  modeSelect.value = savedMode;
  paletteSelect.value = savedPalette;
  applyMode(savedMode);
  applyPalette(savedPalette);

  modeSelect.addEventListener("change", () => {
    localStorage.setItem(modeKey, modeSelect.value);
    applyMode(modeSelect.value);
  });

  paletteSelect.addEventListener("change", () => {
    localStorage.setItem(paletteKey, paletteSelect.value);
    applyPalette(paletteSelect.value);
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (modeSelect.value === "system") {
      applyMode("system");
    }
  });
})();
