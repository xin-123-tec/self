(() => {
  const key = "wx-theme";
  const body = document.body;
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const apply = (theme) => {
    const dark = theme === "dark";
    body.classList.toggle("dark", dark);
    btn.textContent = dark ? "☀️ 浅色" : "🌙 深色";
  };

  const saved = localStorage.getItem(key);
  if (saved === "dark" || saved === "light") {
    apply(saved);
  } else {
    apply("light");
  }

  btn.addEventListener("click", () => {
    const next = body.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem(key, next);
    apply(next);
  });
})();
