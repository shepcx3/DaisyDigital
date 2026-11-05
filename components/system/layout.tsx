import type { ReactNode } from "react";
import { BloomEdges } from "@/components/motion/BloomEdges";
import { cx } from "@/lib/utils";
import { MicroLabel } from "./primitives";
import s from "./layout.module.css";

type Accent = "pink" | "blue" | "violet";

/** Every section declares exactly one hot accent. `dark` = violet surface with grain. */
export function Section({ accent, dark, children, className, id, labelledBy, blooms = false }: {
  accent: Accent; dark?: boolean; children: ReactNode; className?: string; id?: string; labelledBy?: string; blooms?: boolean;
}) {
  return (
    <section
      id={id}
      data-accent={accent}
      aria-labelledby={labelledBy}
      className={cx(s.section, dark && "surface-violet grain", className)}
    >
      {blooms && <BloomEdges />}
      <div className="container-dd">{children}</div>
    </section>
  );
}

export function SectionHead({ label, secret, title, intro, id, as: H = "h2", align = "center" }: {
  label?: string; secret?: string; title: ReactNode; intro?: ReactNode; id?: string; as?: "h1" | "h2"; align?: "center" | "left";
}) {
  return (
    <header className={cx(s.head, align === "left" && s.left)}>
      {label && <MicroLabel secret={secret}>{label}</MicroLabel>}
      <H id={id} className={cx(H === "h1" ? s.h1 : s.h2, "dd-heading")}>{title}</H>
      {intro && <p className={s.intro}>{intro}</p>}
    </header>
  );
}
