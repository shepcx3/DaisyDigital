"use client";

import { useSyncExternalStore } from "react";

// Calm mode = reduced motion. Seeded before paint by the inline script in app/layout.tsx
// (saved toggle → else the OS prefers-reduced-motion setting). Stored on <html data-calm>.
const EVENT = "dd-calm-change";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}
const read = () => document.documentElement.dataset.calm === "on";

export function isCalm() {
  return typeof document !== "undefined" && read();
}

export function setCalm(on: boolean) {
  document.documentElement.dataset.calm = on ? "on" : "off";
  try {
    localStorage.setItem("dd-calm", on ? "on" : "off");
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/** Server renders as "not calm"; the client reads the real value after hydration. */
export function useCalm() {
  return useSyncExternalStore(subscribe, read, () => false);
}
