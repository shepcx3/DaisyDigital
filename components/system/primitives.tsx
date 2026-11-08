import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { marquee as marqueeWords } from "@/content/site";
import { cx, seededRotation } from "@/lib/utils";
import s from "./system.module.css";

/* ---------- Sticker: die-cut border, seeded tilt, gentle lift on hover (wobble is opt-in) ---------- */
export function Sticker({ seed, children, className, dieCut = false, wobble = false, max = 2.5, style }: {
  seed: string; children: ReactNode; className?: string; dieCut?: boolean; wobble?: boolean; max?: number; style?: CSSProperties;
}) {
  return (
    <div
      className={cx(s.sticker, dieCut && s.dieCut, wobble && s.wobble, className)}
      style={{ ["--rot" as string]: `${seededRotation(seed, max)}deg`, ...style }}
    >
      {children}
    </div>
  );
}

/* ---------- Badge ---------- */
export function Badge({ children, chrome, icon, className }: { children: ReactNode; chrome?: boolean; icon?: IconName; className?: string }) {
  return (
    <span className={cx(s.badge, chrome && s.badgeChrome, className)}>
      {icon && <Icon name={icon} />}
      {children}
    </span>
  );
}

/* ---------- Button: link or button, optional glow (primary CTAs only) ---------- */
type BtnProps = {
  children: ReactNode;
  href?: string;
  hot?: boolean;
  glow?: boolean;
  icon?: IconName;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
  transitionTypes?: string[];
};
export function Button({ children, href, hot, glow, icon, type = "button", onClick, className, transitionTypes }: BtnProps) {
  const inner = (
    <>
      {children}
      {icon && <Icon name={icon} />}
    </>
  );
  const cls = cx(s.btn, hot && s.btnHot, className);
  return (
    <span className={cx(s.btnWrap, glow && s.glow)}>
      {href ? (
        <Link href={href} className={cls} transitionTypes={transitionTypes ?? ["tab-open"]}>{inner}</Link>
      ) : (
        <button type={type} className={cls} onClick={onClick}>{inner}</button>
      )}
    </span>
  );
}

/* ---------- Polaroid ---------- */
export function Polaroid({ caption, src, alt = "", icon = "sparkle", motionBlur, tint = "var(--lilac)", ratio }: {
  caption: string; src?: string; alt?: string; icon?: IconName; motionBlur?: boolean; tint?: string; ratio?: string;
}) {
  return (
    <figure className={s.polaroid}>
      <div className={cx(s.photo, motionBlur && s.motionBlur)} style={{ background: tint, aspectRatio: ratio }}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} loading="lazy" decoding="async" />
        ) : (
          <span className={s.placeholder} aria-hidden="true"><Icon name={icon} /></span>
        )}
        {!src && <span className={s.flashFx} aria-hidden="true" />}
      </div>
      <figcaption className={s.caption}>{caption}</figcaption>
    </figure>
  );
}

/* ---------- StickyNote ---------- */
export function StickyNote({ items, children }: { items?: string[]; children?: ReactNode }) {
  return (
    <div className={s.note}>
      {items ? (
        <ul>
          {items.map((t) => (
            <li key={t}><Icon name="daisy" />{t}</li>
          ))}
        </ul>
      ) : (
        children
      )}
    </div>
  );
}

/* ---------- TornPaper ---------- */
export function TornPaper({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx(s.torn, className)}>{children}</div>;
}

/* ---------- Divider ---------- */
export function Divider({ variant = "dashed" }: { variant?: "daisy" | "squiggle" | "dashed" | "pixel" }) {
  const v = { daisy: s.dividerDaisy, squiggle: s.dividerSquiggle, dashed: s.dividerDashed, pixel: s.dividerPixel }[variant];
  return <div role="separator" aria-hidden="true" className={cx(s.divider, v)} />;
}

/* ---------- Marquee: CSS-only loop, pauses on hover, static in calm mode ---------- */
const marqueeIcons: IconName[] = ["daisy", "sparkle", "heart"];
export function Marquee({ words = marqueeWords }: { words?: string[] }) {
  const items = [...words, ...words, ...words, ...words];
  return (
    <div className={s.marquee}>
      <p className="sr-only">{words.join(". ")}.</p>
      <div className={s.track} aria-hidden="true">
        {[0, 1].map((copy) =>
          items.map((w, i) => (
            <span key={`${copy}-${i}`} className={s.item}>
              <span className={s.word}>{w}</span>
              <Icon name={marqueeIcons[i % marqueeIcons.length]} />
            </span>
          )),
        )}
      </div>
    </div>
  );
}

/* ---------- MicroLabel (+ optional hover secret) ---------- */
export function MicroLabel({ children, secret }: { children: ReactNode; secret?: string }) {
  if (!secret) return <span className="micro-label">{children}</span>;
  return (
    <span className={s.secretWrap}>
      <span className="micro-label" tabIndex={0}>{children}</span>
      <span className={s.secret} role="tooltip">{secret}</span>
    </span>
  );
}

/* ---------- Annotation: squiggle arrow + serif italic ---------- */
export function Annotation({ children, flip }: { children: ReactNode; flip?: boolean }) {
  return (
    <span className={cx(s.annotation, flip && s.flip)}>
      <svg viewBox="0 0 54 34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 6c10-2 14 8 8 12s-6-8 4-9 18 6 24 16" />
        <path d="M33 22l6 4 1-7" />
      </svg>
      {children}
    </span>
  );
}
