"use client";

// Tiny global toast: toast("hi") from anywhere, rendered by <Toaster /> in the layout.
const EVENT = "dd-toast";

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: message }));
}

export function onToast(cb: (message: string) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<string>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

// Sparkle bursts are requested the same way, so any component can trigger one.
const BURST = "dd-burst";
export function burst(x: number, y: number, count?: number) {
  window.dispatchEvent(new CustomEvent(BURST, { detail: { x, y, count } }));
}
export function onBurst(cb: (d: { x: number; y: number; count?: number }) => void) {
  const handler = (e: Event) => cb((e as CustomEvent).detail);
  window.addEventListener(BURST, handler);
  return () => window.removeEventListener(BURST, handler);
}
