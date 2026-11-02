// ---------- site config ----------
// Paste a Formspree (https://formspree.io) form URL here to receive submissions + resume uploads.
// Until it's set, the contact form opens the visitor's email app and the join form asks them to email their resume.
const FORM_ENDPOINT = "";
const CONTACT_EMAIL = "hello@daisydigital.com"; // TODO: replace with the real inbox

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- intro: bee lands on the daisy, wordmark appears, the lockup falls back into the header logo ----------
// 2s total. The <head> script adds html.intro (first visit per session, motion allowed); click or any key skips it.
(() => {
  const root = document.documentElement;
  const stage = document.querySelector(".intro-stage");
  if (!root.classList.contains("intro") || !stage || !stage.animate) {
    root.classList.remove("intro");
    return;
  }
  try { sessionStorage.setItem("dd-intro", "1"); } catch {}
  scrollTo(0, 0);

  const lockup = stage.querySelector(".intro-lockup");
  const daisy = stage.querySelector(".intro-daisy");
  const bee = stage.querySelector(".intro-bee");
  const word = stage.querySelector(".intro-word");
  const veil = stage.querySelector(".intro-veil");
  const logo = document.querySelector(".nav .logo");
  const anims = [];
  const play = (el, frames, opts) => anims.push(el.animate(frames, { fill: "both", ...opts }));

  // 0–0.85s: bee loops in from the top left and lands on the opening daisy
  play(daisy, [
    { opacity: 0, scale: 0.35, rotate: "-90deg" },
    { opacity: 1, scale: 1.08, rotate: "6deg", offset: 0.75 },
    { opacity: 1, scale: 1, rotate: "0deg" },
  ], { duration: 650, delay: 150, easing: "cubic-bezier(.22,1,.36,1)" });
  play(bee, [
    { opacity: 0, transform: "translate(-46vw, -34vh) rotate(-25deg)" },
    { opacity: 1, transform: "translate(-30vw, -12vh) rotate(-10deg)", offset: 0.25 },
    { transform: "translate(-6vw, -30vh) rotate(18deg)", offset: 0.55 },
    { transform: "translate(8vw, -8vh) rotate(12deg)", offset: 0.78 },
    { opacity: 1, transform: "translate(0, 0) rotate(0deg)" },
  ], { duration: 850, easing: "cubic-bezier(.3,.1,.3,1)" });

  // 0.8–1.1s: the wordmark pops in
  play(word, [
    { opacity: 0, transform: "translateY(12px) scale(.92)" },
    { opacity: 1, transform: "none" },
  ], { duration: 300, delay: 800, easing: "cubic-bezier(.22,1,.36,1)" });

  // 1.2–1.95s: the lockup tips back and settles exactly onto the header logo; the bee buzzes off.
  // Measured at 1.2s, not now: the display font may still be loading, which changes the lockup's width.
  play(veil, [{ opacity: 1 }, { opacity: 0 }], { duration: 650, delay: 1300, easing: "ease-in-out" });
  const fallAt = performance.now() + 1200;
  const fall = () => {
    if (done) return;
    const from = lockup.getBoundingClientRect();
    const to = logo.getBoundingClientRect();
    const s = parseFloat(getComputedStyle(logo).fontSize) / parseFloat(getComputedStyle(lockup).fontSize);
    const dx = to.left - from.left;
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    const delay = Math.max(0, fallAt - performance.now());
    play(lockup, [
      { transform: "none" },
      { transform: `translate(${dx * 0.35}px, ${dy * 0.35}px) scale(${1 - (1 - s) * 0.35}) rotateX(34deg)`, offset: 0.4 },
      { transform: `translate(${dx}px, ${dy}px) scale(${s}) rotateX(0deg)` },
    ], { duration: 750, delay, easing: "cubic-bezier(.65,0,.35,1)" });
    play(bee, [
      { opacity: 1, transform: "translate(0, 0) rotate(0deg)" },
      { opacity: 0, transform: "translate(30vw, -40vh) rotate(25deg)" },
    ], { duration: 550, delay, easing: "cubic-bezier(.5,0,.75,0)", fill: "forwards" }); // forwards only, or its first frame would cover the landing flight
    anims[anims.length - 2].finished.then(finish, finish);
  };
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1100))]).then(() => setTimeout(fall, Math.max(0, fallAt - 80 - performance.now())));

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    anims.forEach((a) => a.cancel());
    root.classList.remove("intro");
    stage.remove();
    removeEventListener("pointerdown", finish);
    removeEventListener("keydown", finish);
  };
  setTimeout(finish, 2150); // safety net
  addEventListener("pointerdown", finish, { once: true });
  addEventListener("keydown", finish, { once: true });
})();

// ---------- glitter trail cursor (desktop mouse only, capped, sleeps when idle) ----------
(() => {
  const canvas = document.getElementById("glitter");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canvas || reduceMotion || !finePointer) return;

  const ctx = canvas.getContext("2d");
  const colors = ["#c084fc", "#ff4fd8", "#a78bfa", "#ffe066", "#ffffff", "#f9a8d4"];
  const MAX = 120;
  const particles = [];
  let raf = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  addEventListener("resize", resize);

  addEventListener("mousemove", (e) => {
    for (let i = 0; i < 2; i++) {
      particles.push({
        x: e.clientX + (Math.random() - 0.5) * 8,
        y: e.clientY + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 1.2,
        vy: Math.random() * 1.2 + 0.3,
        size: Math.random() * 4 + 2,
        life: 1,
        spin: Math.random() * Math.PI,
        star: Math.random() < 0.35,
        color: colors[(Math.random() * colors.length) | 0],
      });
    }
    if (particles.length > MAX) particles.splice(0, particles.length - MAX);
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });

  function drawStar(p) {
    const s = p.size * 1.6;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.spin);
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      ctx.lineTo(0, -s);
      ctx.lineTo(s * 0.25, -s * 0.25);
      ctx.rotate(Math.PI / 2);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.spin += 0.1;
      p.life -= 0.022;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      if (p.star) drawStar(p);
      else { ctx.beginPath(); ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
    }
    raf = particles.length ? requestAnimationFrame(tick) : 0; // nothing alive: stop until the mouse moves
  }
})();

// ---------- nav: solid on scroll + mobile menu ----------
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
onScroll();
addEventListener("scroll", onScroll, { passive: true });

function setMenu(open) {
  links.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.addEventListener("click", (e) => { if (e.target.tagName === "A") setMenu(false); });
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && links.classList.contains("open")) { setMenu(false); toggle.focus(); }
});

// ---------- scroll reveals + section animations ----------
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add(entry.target.matches(".reveal") ? "in" : "go");
    io.unobserve(entry.target);
  }
}, { threshold: 0.2 });
document.querySelectorAll(".reveal, .bee-stage, .garden").forEach((el) => io.observe(el));

// ---------- careers: water the daisies (button or click the garden) ----------
const garden = document.querySelector(".garden");
const waterBtn = document.querySelector(".water-btn");
function water() {
  io.unobserve(garden);
  if (garden.classList.contains("go")) {
    // replay: drop the bloom, then water again
    garden.classList.remove("go");
    void garden.offsetWidth;
  }
  garden.classList.add("go");
  waterBtn.setAttribute("aria-pressed", "true");
  waterBtn.textContent = "Water them again";
}
waterBtn.addEventListener("click", water);
garden.addEventListener("click", water);

// ---------- resume file picker ----------
const fileDrop = document.querySelector(".file-drop");
const fileInput = fileDrop.querySelector("input");
const fileLabel = fileDrop.querySelector(".file-label");
const fileLabelDefault = fileLabel.innerHTML;
fileInput.addEventListener("change", () => {
  const f = fileInput.files[0];
  if (f) fileLabel.innerHTML = `<b>${f.name.replace(/[<>&"]/g, "")}</b><br><small>looking good! click to change</small>`;
});
["dragenter", "dragover"].forEach((t) => fileDrop.addEventListener(t, (e) => { e.preventDefault(); fileDrop.classList.add("drag"); }));
["dragleave", "drop"].forEach((t) => fileDrop.addEventListener(t, () => fileDrop.classList.remove("drag")));
fileDrop.addEventListener("drop", (e) => {
  e.preventDefault();
  if (e.dataTransfer.files.length) { fileInput.files = e.dataTransfer.files; fileInput.dispatchEvent(new Event("change")); }
});

// ---------- forms ----------
// "no endpoint" notes only show while FORM_ENDPOINT is empty
document.querySelectorAll('[data-when="no-endpoint"]').forEach((el) => { el.hidden = Boolean(FORM_ENDPOINT); });
document.querySelectorAll(".footer-email").forEach((a) => { a.href = `mailto:${CONTACT_EMAIL}`; a.textContent = CONTACT_EMAIL; });

const messages = {
  name: "We need something to call you.",
  email: "That email looks a little off. Check for an @ and a dot.",
  message: "Don't be shy, tell us a little something.",
  role: "Tell us what you're into (content, social, strategy…).",
};

function setStatus(form, msg, kind) {
  const el = form.querySelector(".form-status");
  el.textContent = msg;
  el.className = "form-status " + (kind || "");
}

function setFieldError(input, msg) {
  const err = document.getElementById(input.getAttribute("aria-describedby"));
  input.toggleAttribute("aria-invalid", Boolean(msg));
  if (msg) input.setAttribute("aria-invalid", "true");
  if (err) err.textContent = msg || "";
}

// returns true when valid; shows a message under each bad field and focuses the first one
function validate(form) {
  let first = null;
  for (const input of form.querySelectorAll("input[required], textarea[required]")) {
    const msg = input.validity.valid ? "" : messages[input.name] || "Please fill this in.";
    setFieldError(input, msg);
    if (msg && !first) first = input;
  }
  if (first) first.focus();
  return !first;
}
document.querySelectorAll(".card-form").forEach((form) => {
  form.addEventListener("input", (e) => {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.validity.valid) setFieldError(e.target, "");
  });
});

async function submitTo(form, subject) {
  const data = new FormData(form);
  data.append("_subject", subject);
  const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("bad response");
}

async function send(form, { subject, sending, sent, mailto }) {
  const btn = form.querySelector('button[type="submit"]');
  if (!validate(form)) { setStatus(form, ""); return; }
  if (!FORM_ENDPOINT) { mailto(); return; }
  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = sending;
  setStatus(form, "");
  try {
    await submitTo(form, subject);
    form.reset();
    fileLabel.innerHTML = fileLabelDefault;
    setStatus(form, sent, "ok");
  } catch {
    setStatus(form, `Hmm, that didn't send. Try again, or email us at ${CONTACT_EMAIL}.`, "err");
  } finally {
    btn.disabled = false;
    btn.textContent = label;
  }
}

document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  send(form, {
    subject: "New buzz from the website",
    sending: "Buzzing…",
    sent: "Buzz received! We'll be in touch xo",
    mailto: () => {
      const d = Object.fromEntries(new FormData(form));
      const body = `Name: ${d.name}\nEmail: ${d.email}\nBrand / social: ${d.brand}\n\n${d.message}`;
      location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("New buzz from " + d.name)}&body=${encodeURIComponent(body)}`;
      setStatus(form, "Opening your email app with your message…", "ok");
    },
  });
});

document.getElementById("join-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const file = fileInput.files[0];
  const errId = fileInput.getAttribute("aria-describedby");
  document.getElementById(errId).textContent = "";
  if (file && file.size > 10 * 1024 * 1024) {
    document.getElementById(errId).textContent = "That file's a little big. Max 10MB please!";
    return;
  }
  if (FORM_ENDPOINT && !file && validate(form)) {
    document.getElementById(errId).textContent = "Add your resume so we can take a look.";
    return;
  }
  send(form, {
    subject: "New team application",
    sending: "Sending…",
    sent: "Application received! Watch this space.",
    // no upload service yet: be honest, nothing was sent
    mailto: () => setStatus(form, `Uploads aren't connected yet, so nothing was sent. Please email your resume to ${CONTACT_EMAIL} and we'll take it from there.`), // neutral, not green: nothing was sent
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
