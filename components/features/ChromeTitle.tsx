"use client";

import { useEffect, useRef } from "react";
import { useCalm } from "@/lib/calm-mode";
import s from "./hero.module.css";

const WORDS = ["daisy", "digital"];

/**
 * The hero name as extruded 3D chrome. On a mouse, the letters tilt toward the cursor and the
 * highlight follows it; on touch they sway on their own. Calm mode keeps the 3D look, still.
 */
export function ChromeTitle({ label }: { label: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const calm = useCalm();

  useEffect(() => {
    const el = ref.current;
    if (!el || calm || !matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    let target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target = { x: (e.clientX / innerWidth) * 2 - 1, y: (e.clientY / innerHeight) * 2 - 1 };
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const apply = () => {
      frame = 0;
      el.style.setProperty("--tilt-x", target.x.toFixed(3));
      el.style.setProperty("--tilt-y", target.y.toFixed(3));
    };
    el.dataset.track = "on";
    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      delete el.dataset.track;
    };
  }, [calm]);

  return (
    <h1 ref={ref} className={s.wordmark} aria-label={label}>
      {WORDS.map((w, i) => (
        <span key={w}>
          {i > 0 && " "}
          <span className={s.chrome} data-text={w} aria-hidden="true">{w}</span>
        </span>
      ))}
    </h1>
  );
}
