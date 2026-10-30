(function () {
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-btn");
  var menuBtn = document.getElementById("menu-btn");
  var menu = document.getElementById("menu");

  function isDark() {
    var t = root.getAttribute("data-theme");
    return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // Idioma: el selector guarda la eleccion para que la deteccion automatica (script del <head>) no la pise
  var langBtn = document.querySelector(".lang-btn");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      try { localStorage.setItem("lang", langBtn.getAttribute("data-lang")); } catch (e) {}
    });
  }

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Writing: filtro por fuente
  var chips = document.querySelectorAll(".chip");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var src = chip.getAttribute("data-source");
      chips.forEach(function (c) { c.classList.toggle("active", c === chip); });
      document.querySelectorAll(".post").forEach(function (p) {
        p.hidden = src !== "all" && p.getAttribute("data-source") !== src;
      });
      document.querySelectorAll(".posts h3.year").forEach(function (h) {
        var el = h.nextElementSibling, any = false;
        while (el && el.classList.contains("post")) { if (!el.hidden) any = true; el = el.nextElementSibling; }
        h.hidden = !any;
      });
    });
  });
})();
