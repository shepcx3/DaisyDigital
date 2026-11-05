"use client";

import { useEffect, useRef } from "react";
import { isCalm } from "@/lib/calm-mode";
import { glitter } from "@/lib/motion";
import { onBurst } from "@/lib/toast";

type P = { x: number; y: number; vx: number; vy: number; life: number; size: number; spin: number; sprite: HTMLCanvasElement; alive: boolean; trail: boolean };

const COLORS = ["#c084fc", "#ff4fd8", "#a78bfa", "#ffe066", "#ffffff", "#f9a8d4"];
const POOL = glitter.maxParticles + 40; // room for click bursts on top of a full trail
const SPRITE = 40;

/** Glow is expensive to draw live, so each colour's star and dot are drawn once and stamped. */
function makeSprites(color: string): [HTMLCanvasElement, HTMLCanvasElement] {
  return [true, false].map((star) => {
    const c = document.createElement("canvas");
    c.width = c.height = SPRITE;
    const g = c.getContext("2d")!;
    g.translate(SPRITE / 2, SPRITE / 2);
    g.fillStyle = color;
    g.shadowColor = color;
    g.shadowBlur = 8;
    g.beginPath();
    if (star) {
      for (let i = 0; i < 4; i++) {
        g.lineTo(0, -12);
        g.lineTo(3, -3);
        g.rotate(Math.PI / 2);
      }
      g.closePath();
    } else {
      g.arc(0, 0, 6, 0, Math.PI * 2);
    }
    g.fill();
    return c;
  }) as [HTMLCanvasElement, HTMLCanvasElement];
}

/**
 * The glitter trail + a sparkle burst on click: one canvas, a fixed pool of particles,
 * and the loop sleeps whenever nothing is alive, so scrolling and idle pages cost nothing.
 */
export function Sparkles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const palette = COLORS.map(makeSprites);
    const rainbow = Array.from({ length: 12 }, (_, i) => makeSprites(`hsl(${i * 30} 95% 72%)`));
    const pool: P[] = Array.from({ length: POOL }, () => ({ x: 0, y: 0, vx: 0, vy: 0, life: 0, size: 0, spin: 0, sprite: palette[0][0], alive: false, trail: false }));
    let raf = 0;
    let trailAlive = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    const spawn = (x: number, y: number, trail: boolean) => {
      if (trail && trailAlive >= glitter.maxParticles) return;
      const p = pool.find((q) => !q.alive);
      if (!p) return;
      const sparkleMode = document.documentElement.classList.contains("sparkle-mode");
      const set = sparkleMode ? rainbow[(performance.now() / 120 | 0) % 12] : palette[(Math.random() * palette.length) | 0];
      const speed = trail ? 1.2 : 6;
      p.x = x + (trail ? (Math.random() - 0.5) * 8 : 0);
      p.y = y + (trail ? (Math.random() - 0.5) * 8 : 0);
      p.vx = (Math.random() - 0.5) * speed;
      p.vy = trail ? Math.random() * 1.2 + 0.3 : (Math.random() - 0.5) * speed;
      p.size = (Math.random() * 4 + 2) * (sparkleMode ? 1.3 : 1);
      p.spin = Math.random() * Math.PI;
      p.sprite = set[Math.random() < 0.35 ? 0 : 1];
      p.life = 1;
      p.alive = true;
      p.trail = trail;
      if (trail) trailAlive++;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    function tick() {
      const c = ctx!;
      c.clearRect(0, 0, innerWidth, innerHeight);
      let any = false;
      for (const p of pool) {
        if (!p.alive) continue;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.spin += 0.1;
        p.life -= 0.022;
        if (p.life <= 0) {
          p.alive = false;
          if (p.trail) trailAlive--;
          continue;
        }
        any = true;
        const d = p.size * 3.4;
        c.globalAlpha = p.life;
        c.save();
        c.translate(p.x, p.y);
        c.rotate(p.spin);
        c.drawImage(p.sprite, -d / 2, -d / 2, d, d);
        c.restore();
      }
      raf = any ? requestAnimationFrame(tick) : 0;
    }

    const fine = matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      if (!fine || e.pointerType !== "mouse" || isCalm()) return;
      spawn(e.clientX, e.clientY, true);
      spawn(e.clientX, e.clientY, true);
    };
    const doBurst = (x: number, y: number, n: number = glitter.burstCount) => {
      if (isCalm()) return;
      for (let i = 0; i < n; i++) spawn(x, y, false);
    };
    const onDown = (e: PointerEvent) => doBurst(e.clientX, e.clientY);

    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerdown", onDown, { passive: true });
    const offBurst = onBurst(({ x, y, count }) => doBurst(x, y, count));

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerdown", onDown);
      offBurst();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 70 }} />;
}
