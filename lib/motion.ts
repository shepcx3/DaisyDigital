// One motion personality for the whole site: a little springy, mostly calm.
// Nothing runs longer than 600ms except the loader.
// CSS mirrors these in app/tokens.css (--ease-bounce, --dur-*).

export const durations = {
  fast: 0.16,
  base: 0.28,
  slow: 0.52,
  loaderDelayMs: 300, // only show the loader if loading takes longer than this
} as const;

export const easings = {
  bounce: [0.34, 1.22, 0.64, 1],
  out: [0.22, 1, 0.36, 1],
} as const;

export const springs = {
  // default: stiff and snappy
  pop: { type: "spring", stiffness: 520, damping: 26, mass: 0.7 },
  // stickers peeling/lifting on hover
  sticker: { type: "spring", stiffness: 340, damping: 26 },
  // big things (windows opening, the bee landing)
  settle: { type: "spring", stiffness: 260, damping: 24 },
} as const;

export const presets = {
  revealUp: {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: springs.settle,
  },
  stickerHover: {
    whileHover: { y: -3, rotateX: 4, rotateZ: 0, scale: 1.01 },
    transition: springs.sticker,
  },
  press: { whileTap: { scale: 0.96 }, transition: springs.pop },
} as const;

export const glitter = {
  maxParticles: 120,
  burstCount: 14,
} as const;
