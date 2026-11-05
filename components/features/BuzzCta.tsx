import { Bee } from "@/components/features/BeeButton";
import { Button } from "@/components/system/primitives";
import s from "./buzz.module.css";

/**
 * "give us a buzz" with the CEO's bee moment: hover or focus the button and the bee loops in
 * from behind it and lands on the daisy, which blooms. CSS only; calm mode shows it already landed.
 */
export function BuzzCta({ label }: { label: string }) {
  return (
    <span className={s.buzz}>
      <Button href="/contact/" hot glow icon="bee">{label}</Button>
      <span className={s.landing} aria-hidden="true">
        <svg className={s.flower} viewBox="0 0 40 40">
          <g transform="translate(20 20)" fill="#fffbf5" stroke="#2a1a4a" strokeWidth="1.8">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
              <ellipse key={r} cy="-9" rx="3.6" ry="7.5" transform={`rotate(${r})`} />
            ))}
          </g>
          <circle cx="20" cy="20" r="5" fill="#ffd75e" stroke="#2a1a4a" strokeWidth="1.8" />
        </svg>
        <span className={s.bee}><Bee /></span>
      </span>
    </span>
  );
}
