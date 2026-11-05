"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/utils";
import s from "@/components/system/layout.module.css";

const daisy = (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <g transform="translate(20 20)" fill="#fffbf5" stroke="#2a1a4a" strokeWidth="1.8">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
        <ellipse key={r} cy="-9" rx="3.6" ry="7.5" transform={`rotate(${r})`} />
      ))}
    </g>
    <circle cx="20" cy="20" r="5" fill="#ffd75e" stroke="#2a1a4a" strokeWidth="1.8" />
  </svg>
);

/**
 * Two daisies on the page edges that bloom when their section scrolls into view.
 * IntersectionObserver on the parent section, no scroll listeners.
 */
export function BloomEdges() {
  const ref = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const section = ref.current?.parentElement;
    if (!section) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOpen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <span ref={ref} className={cx(s.bloom, s.bloomL, open && s.open)} aria-hidden="true">{daisy}</span>
      <span className={cx(s.bloom, s.bloomR, open && s.open)} aria-hidden="true">{daisy}</span>
    </>
  );
}
