/* ===========================================================
   Disha & Shreshth — Wedding Website JS
   =========================================================== */

(function () {
  "use strict";

  /* ---------- Navbar: shrink on scroll ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Countdown to the wedding ---------- */
  // Shubh Vivah — Friday, 3 July 2026, Panigrahan Sanskar 7:30 PM IST
  const weddingDate = new Date("2026-07-03T19:30:00+05:30").getTime();
  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs"),
  };
  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const diff = weddingDate - Date.now();
    if (diff <= 0) {
      els.days.textContent = "00";
      els.hours.textContent = "00";
      els.mins.textContent = "00";
      els.secs.textContent = "00";
      const title = document.querySelector(".count__title");
      if (title) title.textContent = "Today, we say I do \u2764";
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    els.days.textContent = pad(d);
    els.hours.textContent = pad(h);
    els.mins.textContent = pad(m);
    els.secs.textContent = pad(s);
  }
  tick();
  const timer = setInterval(tick, 1000);

  /* ---------- Background music toggle ---------- */
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicToggle");
  const musicLabel = musicBtn.querySelector(".music-toggle__label");

  function setMusicUI(playing) {
    musicBtn.classList.toggle("is-playing", playing);
    musicBtn.setAttribute("aria-pressed", String(playing));
    musicBtn.setAttribute("aria-label", playing ? "Pause wedding music" : "Play wedding music");
    if (musicLabel) musicLabel.textContent = playing ? "Pause" : "Play music";
  }

  musicBtn.addEventListener("click", async () => {
    if (music.paused) {
      try {
        music.volume = 0.55;
        await music.play();
        setMusicUI(true);
      } catch (err) {
        setMusicUI(false);
      }
    } else {
      music.pause();
      setMusicUI(false);
    }
  });

  music.addEventListener("ended", () => setMusicUI(false));
  music.addEventListener("pause", () => setMusicUI(false));
  music.addEventListener("play", () => setMusicUI(true));

  // Try to play by default. Most browsers block autoplay with sound until the
  // user interacts, so fall back to starting on the first interaction.
  let autoStarted = false;
  function startMusic() {
    if (autoStarted) return;
    music.volume = 0.55;
    const p = music.play();
    if (p && typeof p.then === "function") {
      p.then(() => {
        autoStarted = true;
        removeInteractionListeners();
      }).catch(() => {
        /* blocked — wait for a user gesture */
      });
    }
  }
  function onFirstInteraction(e) {
    // Let the toggle button manage its own play/pause.
    if (e && e.target && e.target.closest && e.target.closest("#musicToggle")) {
      autoStarted = true;
      removeInteractionListeners();
      return;
    }
    startMusic();
  }
  function removeInteractionListeners() {
    ["pointerdown", "keydown", "scroll", "touchstart"].forEach((evt) =>
      window.removeEventListener(evt, onFirstInteraction)
    );
  }
  ["pointerdown", "keydown", "scroll", "touchstart"].forEach((evt) =>
    window.addEventListener(evt, onFirstInteraction, { passive: true })
  );
  startMusic();

  /* ---------- RSVP form (optional) ---------- */
  const form = document.getElementById("rsvpForm");
  const success = document.getElementById("rsvpSuccess");
  if (form) form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Demo only: persist locally so the sample feels real.
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const all = JSON.parse(localStorage.getItem("ds_rsvps") || "[]");
      all.push({ ...data, at: new Date().toISOString() });
      localStorage.setItem("ds_rsvps", JSON.stringify(all));
    } catch (_) {}

    form.querySelectorAll("input, select, textarea, button").forEach(
      (el) => (el.style.display = "none")
    );
    success.hidden = false;
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
