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

  // Idioma: el menu guarda la eleccion para que la deteccion automatica (script del <head>) no la pise
  var langMenu = document.querySelector(".lang-menu");
  if (langMenu) {
    langMenu.querySelectorAll("a[data-lang]").forEach(function (link) {
      link.addEventListener("click", function () {
        try { localStorage.setItem("lang", link.getAttribute("data-lang")); } catch (e) {}
      });
    });
    document.addEventListener("click", function (e) { if (!langMenu.contains(e.target)) langMenu.open = false; });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && langMenu.open) { langMenu.open = false; langMenu.querySelector("summary").focus(); }
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
  // Contacto: formulario que habla con el Worker (worker/contacto). Sin endpoint o sitekey no se muestra
  // y queda el mailto como unica via.
  var CONTACT_ENDPOINT = "https://contacto-relay.cjbarroso.workers.dev";
  var TURNSTILE_SITEKEY = "0x4AAAAAAF841QZGNsJ9BJTQ";
  var contactHost = document.querySelector("[data-contact]");
  if (contactHost && CONTACT_ENDPOINT && TURNSTILE_SITEKEY) {
    var L = {
      en: { h: "Or send me a message here", msg: "Your message", contact: "How can I reach you? (email or @user)", send: "Send", sending: "Sending…", ok: "Sent. I'll reply within a few days.", err: "It didn't go through. Please try again or email me.", rate: "Too many messages from your network. Try again later.", busy: "Too many messages today. Please email me instead.", captcha: "Couldn't verify you're human. Reload and try again." },
      es: { h: "O mandame un mensaje desde acá", msg: "Tu mensaje", contact: "¿Cómo te respondo? (email o @usuario)", send: "Enviar", sending: "Enviando…", ok: "Enviado. Te respondo en pocos días.", err: "No se pudo enviar. Probá de nuevo o escribime por email.", rate: "Demasiados mensajes desde tu red. Probá más tarde.", busy: "Hoy llegaron demasiados mensajes. Escribime por email.", captcha: "No pudimos verificar que sos humano. Recargá y probá de nuevo." },
      zh: { h: "或者在这里给我留言", msg: "你的留言", contact: "如何联系你？（邮箱或 @用户名）", send: "发送", sending: "发送中…", ok: "已发送，我会在几天内回复。", err: "发送失败，请重试或发邮件给我。", rate: "你所在的网络发送过于频繁，请稍后再试。", busy: "今天消息过多，请改发邮件。", captcha: "无法验证你是真人，请刷新后重试。" }
    };
    var lang = (root.lang || "en").slice(0, 2);
    var t = L[lang] || L.en;
    var form = document.createElement("form");
    form.className = "contact-form";
    form.noValidate = false;
    form.innerHTML =
      '<h4></h4>' +
      '<label>' + '<span class="sr"></span><textarea name="message" rows="5" minlength="10" maxlength="2000" required></textarea></label>' +
      '<label>' + '<span class="sr"></span><input name="contact" type="text" minlength="3" maxlength="200" required autocomplete="email" /></label>' +
      '<input class="hp" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" />' +
      '<div class="ts"></div>' +
      '<button class="btn primary" type="submit"></button>' +
      '<p class="status" role="status" aria-live="polite"></p>';
    var labels = form.querySelectorAll(".sr");
    form.querySelector("h4").textContent = t.h;
    labels[0].textContent = t.msg; labels[1].textContent = t.contact;
    form.elements.message.placeholder = t.msg;
    form.elements.contact.placeholder = t.contact;
    var btn = form.querySelector("button"), status = form.querySelector(".status");
    btn.textContent = t.send;
    contactHost.appendChild(form);

    var token = "", widget = null;
    function renderTs() {
      widget = window.turnstile.render(form.querySelector(".ts"), {
        sitekey: TURNSTILE_SITEKEY, action: "contact", appearance: "interaction-only", language: lang === "zh" ? "zh-cn" : lang,
        callback: function (tk) { token = tk; }, "expired-callback": function () { token = ""; }, "error-callback": function () { token = ""; }
      });
    }
    var tsScript = document.createElement("script");
    tsScript.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    tsScript.async = true;
    tsScript.onload = renderTs;
    document.head.appendChild(tsScript);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!token) { status.textContent = t.captcha; return; }
      btn.disabled = true; btn.textContent = t.sending; status.textContent = "";
      fetch(CONTACT_ENDPOINT, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: form.elements.message.value, contact: form.elements.contact.value, website: form.elements.website.value, token: token, lang: lang })
      }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (b) { return { ok: r.ok && b.ok, err: b.error }; }); })
        .catch(function () { return { ok: false }; })
        .then(function (res) {
          if (res.ok) { form.reset(); status.textContent = t.ok; btn.textContent = t.send; btn.disabled = false; }
          else {
            status.textContent = res.err === "rate" ? t.rate : res.err === "busy" ? t.busy : res.err === "captcha" ? t.captcha : t.err;
            btn.textContent = t.send; btn.disabled = false;
          }
          token = ""; if (window.turnstile && widget !== null) window.turnstile.reset(widget);
        });
    });
  }
})();
