import { microcopy } from "@/content/site";
import s from "@/app/screens.module.css";

const PIXEL_DAISY = ["..PPP..", "P.PPP.P", "PPDDDPP", "PPDDDPP", "PPDDDPP", "P.PPP.P", "..PPP.."];

/**
 * Spinning daisy that pixel-blooms. CSS delays it 300ms, so quick loads never show it.
 * Used as a Suspense fallback for slow pieces (not as app/loading.tsx: that would hide every
 * static page behind a streaming boundary and slow the first paint on phones).
 */
export function Loader() {
  return (
    <div className={s.loader} role="status" aria-label={microcopy.loading}>
      <div className={s.loaderDaisy} aria-hidden="true">
        {PIXEL_DAISY.flatMap((row, y) =>
          [...row].map((c, x) => (
            <i
              key={`${x}-${y}`}
              className={c === "P" ? s.p : c === "D" ? s.d : undefined}
              style={{ ["--d" as string]: Math.round(Math.hypot(x - 3, y - 3)) }}
            />
          )),
        )}
      </div>
      <span className="micro-label">{microcopy.loading}</span>
    </div>
  );
}
