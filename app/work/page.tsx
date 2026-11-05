import type { Metadata } from "next";
import { Cutie } from "@/components/characters/Cutie";
import { HiddenDaisy } from "@/components/features/EasterEggs";
import { WorkCard } from "@/components/features/WorkCard";
import w from "@/components/features/work.module.css";
import { BrowserWindow } from "@/components/system/BrowserWindow";
import { Section, SectionHead } from "@/components/system/layout";
import { Button } from "@/components/system/primitives";
import { microcopy, work } from "@/content/site";

export const metadata: Metadata = { title: "work" };

export default function WorkPage() {
  return (
    <main id="main">
      <Section accent="blue" labelledBy="work-h">
        <SectionHead as="h1" id="work-h" label="trend alert" secret="every one of these started as a 2am idea" title="the work" intro="brands we've had the pleasure of making look good" />
        <ul className={w.grid}>
          {work.map((c) => (
            <li key={c.slug}><div className={w.cardWrap}><WorkCard c={c} /></div></li>
          ))}
          <li>
            <span className={w.peek}><Cutie who="erica" pose="peek" /></span>
            <div className={w.cardWrap}>
              <BrowserWindow tab="new_tab" icon="plus" className={w.card}>
                <div className={w.empty}>
                  <p>{microcopy.empty}… maybe it&apos;s yours?</p>
                  <Button href="/contact/" icon="daisy">let&apos;s bloom</Button>
                </div>
              </BrowserWindow>
            </div>
          </li>
        </ul>
        <HiddenDaisy id="work" className={w.egg} />
      </Section>
    </main>
  );
}
