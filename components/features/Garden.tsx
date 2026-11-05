"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/utils";
import s from "./garden.module.css";

const FLOWERS = [
  { h: 96, petal: "#fffbf5", delay: 0 },
  { h: 132, petal: "#ff8fc7", delay: 180 },
  { h: 82, petal: "#fffbf5", delay: 360 },
  { h: 120, petal: "#c9b6f0", delay: 540 },
  { h: 100, petal: "#a9d8ff", delay: 720 },
  { h: 140, petal: "#fffbf5", delay: 900 },
];

function Flower({ h, petal, delay }: (typeof FLOWERS)[number]) {
  return (
    <div className={s.flower} style={{ ["--h" as string]: `${h}px`, ["--delay" as string]: `${delay}ms` }}>
      <div className={s.stem}>
        <i className={s.leafL} />
        <i className={s.leafR} />
      </div>
      <svg className={s.head} viewBox="0 0 100 100">
        <g transform="translate(50 50)" fill={petal} stroke="#2a1a4a" strokeWidth="3.5">
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((r) => <ellipse key={r} cy="-25" rx="9" ry="21" transform={`rotate(${r})`} />)}
        </g>
        <circle cx="50" cy="50" r="13" fill="#ffd75e" stroke="#2a1a4a" strokeWidth="3.5" />
      </svg>
    </div>
  );
}

/**
 * The watering can pours and a row of flowers blooms upward when the section scrolls into view.
 * Purely decorative and hands-off: the application form sits right below it, always open.
 */
export function Garden() {
  const ref = useRef<HTMLDivElement>(null);
  const [bloomed, setBloomed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setBloomed(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cx(s.garden, bloomed && s.bloomed)} aria-hidden="true">
      <div className={s.can}>
        <svg viewBox="0 0 160 110">
          <defs>
            <linearGradient id="can-chrome" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f4f4f7" />
              <stop offset=".42" stopColor="#b9bcc6" />
              <stop offset=".56" stopColor="#ffffff" />
              <stop offset="1" stopColor="#9a9eab" />
            </linearGradient>
          </defs>
          <path d="M100 55l50-30 4 6-50 39z" fill="url(#can-chrome)" stroke="#2a1a4a" strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="152" cy="27" rx="6" ry="9" transform="rotate(-30 152 27)" fill="#e6ddf7" stroke="#2a1a4a" strokeWidth="2.5" />
          <path d="M45 40q20-35 40 0" fill="none" stroke="#2a1a4a" strokeWidth="5" strokeLinecap="round" />
          <path d="M30 40h70l-5 60H35z" fill="url(#can-chrome)" stroke="#2a1a4a" strokeWidth="3" strokeLinejoin="round" />
          <g transform="translate(65 70)" fill="#fffbf5" stroke="#2a1a4a" strokeWidth="1.5">
            {[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cy="-9" rx="4" ry="7" transform={`rotate(${r})`} />)}
            <circle r="4.5" fill="#ffd75e" />
          </g>
        </svg>
      </div>
      <div className={s.drops}><i /><i /><i /><i /><i /></div>
      <div className={s.flowers}>
        {FLOWERS.map((f) => <Flower key={f.delay} {...f} />)}
      </div>
      <div className={s.soil} />
    </div>
  );
}
