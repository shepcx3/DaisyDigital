import type { Metadata } from "next";
import { Cutie } from "@/components/characters/Cutie";
import { ProfileCard } from "@/components/characters/ProfileCard";
import { StatusList } from "@/components/characters/StatusList";
import { HiddenDaisy } from "@/components/features/EasterEggs";
import { Section, SectionHead } from "@/components/system/layout";
import { team } from "@/content/site";
import s from "./team.module.css";

export const metadata: Metadata = { title: "team" };

export default function TeamPage() {
  return (
    <main id="main">
      <Section accent="violet" dark labelledBy="team-h">
        <SectionHead as="h1" id="team-h" label="top 8" secret="erica is #1 in her own top 8" title="meet the team" intro="the brains (and the tabs) behind it all" />
        <div className={s.status}><StatusList /></div>
        <div className={s.grid}>
          {team.map((m) => <ProfileCard key={m.slug} m={m} headingLevel={2} />)}
        </div>
        <div className={s.holder} aria-hidden="true"><Cutie who="bri" pose="hold" /></div>
        <HiddenDaisy id="team" className={s.egg} />
      </Section>
    </main>
  );
}
