"use client";

import { useEffect, useState } from "react";
import { burst, toast } from "@/lib/toast";
import { cx } from "@/lib/utils";
import s from "./eggs.module.css";

// ---------- sparkle mode (Konami code, or the reward for finding every hidden daisy) ----------
export function setSparkleMode(on: boolean) {
  document.documentElement.classList.toggle("sparkle-mode", on);
  if (on) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => burst(Math.random() * innerWidth, Math.random() * innerHeight * 0.7, 14), i * 110);
    }
  }
}

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function KonamiSparkle() {
  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = k === KONAMI[i] ? i + 1 : k === KONAMI[0] ? 1 : 0;
      if (i === KONAMI.length) {
        i = 0;
        const on = !document.documentElement.classList.contains("sparkle-mode");
        setSparkleMode(on);
        toast(on ? "✦ sparkle mode unlocked ✦" : "sparkle mode off");
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);
  return null;
}

// ---------- hidden daisies ----------
export const HIDDEN_DAISIES = ["work", "team", "careers", "footer"] as const;
const KEY = "dd-found-daisies";

function readFound(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

/** A tiny daisy tucked somewhere. Find them all for sparkle mode. */
export function HiddenDaisy({ id, className }: { id: (typeof HIDDEN_DAISIES)[number]; className?: string }) {
  const [found, setFound] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage after hydration
    setFound(readFound().includes(id));
  }, [id]);

  const onClick = (e: React.MouseEvent) => {
    const list = Array.from(new Set([...readFound(), id]));
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch {}
    setFound(true);
    burst(e.clientX, e.clientY, 20);
    if (list.length >= HIDDEN_DAISIES.length) {
      toast(`all ${HIDDEN_DAISIES.length} hidden daisies found ✿ sparkle mode unlocked`);
      setSparkleMode(true);
    } else {
      toast(`you found a hidden daisy (${list.length}/${HIDDEN_DAISIES.length})`);
    }
  };

  return (
    <button type="button" className={cx(s.hidden, found && s.found, className)} onClick={onClick} aria-label="a hidden daisy" disabled={found}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g transform="translate(12 12)" fill="#fffbf5" stroke="#2a1a4a" strokeWidth="1.4">
          {[0, 60, 120, 180, 240, 300].map((r) => <ellipse key={r} cy="-5.5" rx="2.4" ry="3.6" transform={`rotate(${r})`} />)}
        </g>
        <circle cx="12" cy="12" r="2.6" fill="#ffd75e" stroke="#2a1a4a" strokeWidth="1.4" />
      </svg>
    </button>
  );
}
