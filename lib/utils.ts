// Prefix files from /public with the GitHub Pages base path (next/link does this itself; <img> and CSS don't).
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

// Deterministic "random" rotation for stickers: same seed, same tilt, every render.
export function seededRotation(seed: string, max = 4): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  const unit = ((h >>> 0) % 1000) / 999; // 0..1
  return Math.round((unit * 2 - 1) * max * 10) / 10;
}

export const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");
