"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { contact } from "@/content/site";
import { isCalm } from "@/lib/calm-mode";
import { burst } from "@/lib/toast";
import { cx } from "@/lib/utils";
import s from "./bee.module.css";

const SEEN = "dd-bee-landed";

export function Bee({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 50" aria-hidden="true">
      <ellipse className={s.wing} cx="24" cy="12" rx="10" ry="12" fill="#e8f5ff" stroke="#2a1a4a" strokeWidth="2" />
      <ellipse className={s.wing} cx="36" cy="12" rx="10" ry="12" fill="#e8f5ff" stroke="#2a1a4a" strokeWidth="2" />
      <ellipse cx="30" cy="30" rx="20" ry="14" fill="#ffd75e" stroke="#2a1a4a" strokeWidth="2.5" />
      <path d="M22 17q-3 13 0 26M32 16q-3 14 0 28" stroke="#2a1a4a" strokeWidth="5" fill="none" />
      <circle cx="46" cy="28" r="9" fill="#2a1a4a" />
      <circle cx="49" cy="26" r="2" fill="#fff" />
      <path d="M10 30H4" stroke="#2a1a4a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The bee buzzes in along a path, lands, and morphs into the "give us a buzz" button.
 * Once per session (sessionStorage); calm mode or a repeat visit shows the button straight away.
 */
export function BeeButton({ target = "contact-form" }: { target?: string }) {
  // "idle" until mounted so the server HTML is just the button (no flash of a flying bee)
  const [phase, setPhase] = useState<"idle" | "flying" | "landed">("idle");

  /* eslint-disable react-hooks/set-state-in-effect -- reads sessionStorage/calm after hydration */
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN) === "1";
    } catch {}
    if (seen || isCalm()) {
      setPhase("landed");
      return;
    }
    setPhase("flying");
    try {
      sessionStorage.setItem(SEEN, "1");
    } catch {}
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const onClick = (e: React.MouseEvent) => {
    const form = document.getElementById(target);
    form?.querySelector<HTMLElement>("input, textarea")?.focus({ preventScroll: true });
    form?.scrollIntoView({ behavior: isCalm() ? "auto" : "smooth", block: "center" });
    burst(e.clientX, e.clientY, 16);
  };

  return (
    <div className={cx(s.stage, phase === "flying" && s.flying, phase === "landed" && s.landed)}>
      {phase === "flying" && (
        <>
          <svg className={s.trail} viewBox="0 0 300 220" aria-hidden="true">
            <path d="M8 30 C 90 -10, 290 20, 260 100 S 110 210, 90 140 S 190 90, 150 170" />
          </svg>
          <span className={s.flyer} onAnimationEnd={() => setPhase("landed")}><Bee /></span>
        </>
      )}
      <button type="button" className={s.btn} onClick={onClick}>
        <span className={s.rider}><Bee /></span>
        {contact.title}
        <Icon name="arrow" size={18} />
      </button>
    </div>
  );
}
