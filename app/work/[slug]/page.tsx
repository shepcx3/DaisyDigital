import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons/Icon";
import { BrowserWindow } from "@/components/system/BrowserWindow";
import { Section } from "@/components/system/layout";
import { Badge, Button, MicroLabel, Polaroid, Sticker } from "@/components/system/primitives";
import { microcopy, work } from "@/content/site";
import s from "./case.module.css";

export const dynamicParams = false;
export function generateStaticParams() {
  return work.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = work.find((x) => x.slug === slug);
  return { title: c ? `${c.brand} case study` : "work" };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const i = work.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const c = work[i];
  const next = work[(i + 1) % work.length];

  return (
    <main id="main">
      <Section accent="blue" labelledBy="case-h">
        <Link href="/work/" className={s.back} transitionTypes={["tab-open"]}><Icon name="arrow" size={18} style={{ transform: "scaleX(-1)" }} /> all the work</Link>

        <BrowserWindow as="article" tab={`${c.slug}_case_study`} icon="tab" url={`daisydigital.com/work/${c.slug}`} className={s.window}>
          <div className={s.top}>
            <div>
              <MicroLabel>case study</MicroLabel>
              <h1 id="case-h" className={s.title}>{c.brand}</h1>
              <p className={`text-serif ${s.sub}`}>{c.summary || "the full story is on its way"}</p>
              {c.services.length > 0 && <p className={s.tags}>{c.services.map((t) => <Badge key={t}>{t}</Badge>)}</p>}
            </div>
            <Sticker seed={`case-${c.slug}`} dieCut className={s.pol}>
              <Polaroid caption={c.brand} icon="film" tint="var(--baby-blue)" />
            </Sticker>
          </div>

          <div className={s.blocks}>
            {["the brief", "what we did", "the results"].map((h) => (
              <section key={h} className={s.block} aria-label={h}>
                <h2>{h}</h2>
                <p className={s.empty}><Icon name="daisy" size={18} /> {microcopy.empty}</p>
              </section>
            ))}
          </div>
        </BrowserWindow>

        <p className={s.next}>
          <Button href={`/work/${next.slug}/`} icon="arrow" transitionTypes={["cam-flash"]}>next: {next.brand}</Button>
        </p>
      </Section>
    </main>
  );
}
