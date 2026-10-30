// ---------- site config ----------
// Paste a Formspree (https://formspree.io) form URL here to receive submissions + resume uploads.
// Until it's set, the contact form opens the visitor's email app and the join form asks them to email their resume.
const FORM_ENDPOINT = "";
const CONTACT_EMAIL = "hello@daisydigital.com"; // TODO: replace with the real inbox

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- glitter trail cursor ----------
(() => {
  const canvas = document.getElementById("glitter");
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!canvas || reduceMotion || !finePointer) return;

  const ctx = canvas.getContext("2d");
  const colors = ["#c084fc", "#f472b6", "#a78bfa", "#fbbf24", "#ffffff", "#f9a8d4"];
  const particles = [];
  let dpr = 1;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  addEventListener("resize", resize);

  addEventListener("mousemove", (e) => {
    for (let i = 0; i < 3; i++) {
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
    if (particles.length > 300) particles.splice(0, particles.length - 300);
  });

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

  (function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.spin += 0.1;
      p.life -= 0.02;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      if (p.star) drawStar(p);
      else { ctx.beginPath(); ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
    }
    requestAnimationFrame(tick);
  })();
})();

// ---------- mobile nav ----------
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { links.classList.remove("open"); toggle.setAttribute("aria-expanded", false); }
});

// ---------- scroll reveals + section animations ----------
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add(entry.target.matches(".reveal") ? "in" : "go");
    io.unobserve(entry.target);
  }
}, { threshold: 0.25 });
document.querySelectorAll(".reveal, .bee-stage, .garden").forEach((el) => io.observe(el));

// ---------- resume file picker ----------
const fileDrop = document.querySelector(".file-drop");
const fileInput = fileDrop.querySelector("input");
const fileLabel = fileDrop.querySelector(".file-label");
fileInput.addEventListener("change", () => {
  const f = fileInput.files[0];
  if (f) fileLabel.innerHTML = `🌸 <b>${f.name.replace(/[<>&]/g, "")}</b><br><small>looking good! click to change</small>`;
});
["dragenter", "dragover"].forEach((t) => fileDrop.addEventListener(t, (e) => { e.preventDefault(); fileDrop.classList.add("drag"); }));
["dragleave", "drop"].forEach((t) => fileDrop.addEventListener(t, () => fileDrop.classList.remove("drag")));
fileDrop.addEventListener("drop", (e) => {
  e.preventDefault();
  if (e.dataTransfer.files.length) { fileInput.files = e.dataTransfer.files; fileInput.dispatchEvent(new Event("change")); }
});

// ---------- forms ----------
function setStatus(form, msg, kind) {
  const el = form.querySelector(".form-status");
  el.textContent = msg;
  el.className = "form-status " + (kind || "");
}

async function submitTo(form, subject) {
  const data = new FormData(form);
  data.append("_subject", subject);
  const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("bad response");
}

document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) { form.reportValidity(); return; }

  if (!FORM_ENDPOINT) {
    const d = Object.fromEntries(new FormData(form));
    const body = `Name: ${d.name}\nEmail: ${d.email}\nBrand: ${d.brand}\nInterested in: ${d.service}\n\n${d.message}`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("New buzz from " + d.name)}&body=${encodeURIComponent(body)}`;
    setStatus(form, "Opening your email app… 🐝", "ok");
    return;
  }
  try {
    setStatus(form, "Buzzing…");
    await submitTo(form, "New buzz from the website 🐝");
    form.reset();
    setStatus(form, "Buzz received! We'll be in touch xo", "ok");
  } catch {
    setStatus(form, `Hmm, that didn't send. Email us at ${CONTACT_EMAIL}`, "err");
  }
});

document.getElementById("join-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) { form.reportValidity(); return; }
  if (fileInput.files[0] && fileInput.files[0].size > 10 * 1024 * 1024) {
    setStatus(form, "That file's a little big — max 10MB please!", "err");
    return;
  }

  if (!FORM_ENDPOINT) {
    setStatus(form, `Almost there! Email your resume to ${CONTACT_EMAIL} 🌱`, "ok");
    return;
  }
  try {
    setStatus(form, "Planting…");
    await submitTo(form, "New team application 🌱");
    form.reset();
    fileLabel.innerHTML = "📎 Drop your resume here or <u>browse</u><br><small>PDF or Word, max 10MB</small>";
    setStatus(form, "Application planted! Watch this space ✿", "ok");
  } catch {
    setStatus(form, `Hmm, that didn't send. Email us at ${CONTACT_EMAIL}`, "err");
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
