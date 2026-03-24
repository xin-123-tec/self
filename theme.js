(() => {
  const modeKey = "wx-theme-mode";
  const paletteKey = "wx-theme-palette";
  const body = document.body;
  const modeSelect = document.getElementById("modeSelect");
  const paletteSelect = document.getElementById("paletteSelect");
  if (!modeSelect || !paletteSelect) return;

  const palettes = {
    sakura: {
      light: {
        bg: "linear-gradient(160deg, #fff8fc 0%, #fff4fa 55%, #f6f7ff 100%)",
        panel: "rgba(255, 255, 255, 0.86)",
        line: "rgba(210, 130, 185, 0.25)",
        text: "#3e2f4a",
        title: "#2f1f3f",
        muted: "#7f6a8f",
        accent: "#d26ff5",
        accent2: "#ff87b0",
        glow1: "rgba(210, 111, 245, 0.26)",
        glow2: "rgba(255, 135, 176, 0.24)",
        shadow: "0 14px 36px rgba(150, 95, 145, 0.2)"
      },
      dark: {
        bg: "radial-gradient(circle at 15% 10%, #4f2b61 0%, #2a1837 48%, #160f1f 100%)",
        panel: "rgba(42, 26, 55, 0.74)",
        line: "rgba(255, 154, 222, 0.28)",
        text: "#ffe8f7",
        title: "#fff2fb",
        muted: "#d9b7d0",
        accent: "#ff92dd",
        accent2: "#c29dff",
        glow1: "rgba(255, 146, 221, 0.28)",
        glow2: "rgba(194, 157, 255, 0.24)",
        shadow: "0 18px 42px rgba(16, 8, 24, 0.52)"
      }
    },
    ocean: {
      light: {
        bg: "linear-gradient(160deg, #f2f9ff 0%, #edf6ff 55%, #eefcff 100%)",
        panel: "rgba(255, 255, 255, 0.85)",
        line: "rgba(96, 146, 223, 0.24)",
        text: "#20344a",
        title: "#182c44",
        muted: "#627c9b",
        accent: "#3283ff",
        accent2: "#34c8f3",
        glow1: "rgba(50, 131, 255, 0.26)",
        glow2: "rgba(52, 200, 243, 0.22)",
        shadow: "0 14px 36px rgba(66, 113, 170, 0.19)"
      },
      dark: {
        bg: "radial-gradient(circle at 15% 10%, #1d4f87 0%, #122c52 45%, #0a172d 100%)",
        panel: "rgba(16, 33, 60, 0.76)",
        line: "rgba(116, 179, 255, 0.3)",
        text: "#e6f3ff",
        title: "#f0f8ff",
        muted: "#b3cbe2",
        accent: "#6fb0ff",
        accent2: "#6ee7ff",
        glow1: "rgba(111, 176, 255, 0.27)",
        glow2: "rgba(110, 231, 255, 0.22)",
        shadow: "0 18px 42px rgba(6, 12, 25, 0.55)"
      }
    },
    minimal: {
      light: {
        bg: "linear-gradient(160deg, #f4f4f4 0%, #ededed 55%, #e6e6e6 100%)",
        panel: "rgba(255, 255, 255, 0.9)",
        line: "rgba(110, 110, 110, 0.22)",
        text: "#202020",
        title: "#101010",
        muted: "#6d6d6d",
        accent: "#151515",
        accent2: "#555555",
        glow1: "rgba(90, 90, 90, 0.16)",
        glow2: "rgba(140, 140, 140, 0.14)",
        shadow: "0 12px 32px rgba(80, 80, 80, 0.16)"
      },
      dark: {
        bg: "radial-gradient(circle at 15% 10%, #333333 0%, #1f1f1f 45%, #0d0d0d 100%)",
        panel: "rgba(25, 25, 25, 0.78)",
        line: "rgba(180, 180, 180, 0.24)",
        text: "#efefef",
        title: "#ffffff",
        muted: "#c6c6c6",
        accent: "#ffffff",
        accent2: "#9f9f9f",
        glow1: "rgba(170, 170, 170, 0.18)",
        glow2: "rgba(120, 120, 120, 0.14)",
        shadow: "0 16px 38px rgba(0, 0, 0, 0.55)"
      }
    }
  };

  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const applyAll = (mode, palette) => {
    const safePalette = palettes[palette] ? palette : "sakura";
    const useDark = mode === "system" ? media.matches : mode === "dark";
    const tone = useDark ? "dark" : "light";
    const theme = palettes[safePalette][tone];

    body.dataset.mode = mode;
    body.dataset.palette = safePalette;

    body.style.setProperty("--bg", theme.bg);
    body.style.setProperty("--panel", theme.panel);
    body.style.setProperty("--line", theme.line);
    body.style.setProperty("--text", theme.text);
    body.style.setProperty("--title", theme.title);
    body.style.setProperty("--muted", theme.muted);
    body.style.setProperty("--accent", theme.accent);
    body.style.setProperty("--accent-2", theme.accent2);
    body.style.setProperty("--glow-1", theme.glow1);
    body.style.setProperty("--glow-2", theme.glow2);
    body.style.setProperty("--shadow", theme.shadow);
  };

  const savedMode = localStorage.getItem(modeKey) || "system";
  const savedPalette = localStorage.getItem(paletteKey) || "sakura";
  modeSelect.value = savedMode;
  paletteSelect.value = savedPalette;
  applyAll(savedMode, savedPalette);

  modeSelect.addEventListener("change", () => {
    localStorage.setItem(modeKey, modeSelect.value);
    applyAll(modeSelect.value, paletteSelect.value);
  });

  paletteSelect.addEventListener("change", () => {
    localStorage.setItem(paletteKey, paletteSelect.value);
    applyAll(modeSelect.value, paletteSelect.value);
  });

  const onSystemChange = () => {
    if (modeSelect.value === "system") {
      applyAll("system", paletteSelect.value);
    }
  };

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", onSystemChange);
  } else if (typeof media.addListener === "function") {
    media.addListener(onSystemChange);
  }
})();
