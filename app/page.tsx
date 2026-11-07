import { Cutie } from "@/components/characters/Cutie";
import { ProfileCard } from "@/components/characters/ProfileCard";
import { StatusList } from "@/components/characters/StatusList";
import { BuzzCta } from "@/components/features/BuzzCta";
import { ChromeTitle } from "@/components/features/ChromeTitle";
import { HeroDaisy } from "@/components/features/HeroDaisy";
import { WorkCard } from "@/components/features/WorkCard";
import h from "@/components/features/hero.module.css";
import w from "@/components/features/work.module.css";
import { Icon, type IconName } from "@/components/icons/Icon";
import { Section, SectionHead } from "@/components/system/layout";
import { Annotation, Button, Divider, Marquee, MicroLabel, Polaroid, Sticker, StickyNote } from "@/components/system/primitives";
import { brand, home, team, work } from "@/content/site";
import s from "./home.module.css";

const tints = ["var(--bubblegum)", "var(--baby-blue)", "var(--lilac)"];

export default function Home() {
  return (
    <main id="main">
      {/* HERO: desktop collage → stacked on mobile */}
      <Section accent="pink" blooms className={h.hero}>
        <div className={h.collage}>
          <div className={h.title}>
            <ChromeTitle label={brand.name} />
            <HeroDaisy />
          </div>

          <div className={h.intro}>
            <p className={`text-serif ${h.tagline}`}>{brand.tagline}</p>
            <MicroLabel secret="psst… we already have ideas">{home.label}</MicroLabel>
            <div className={h.copy}>
              <p className={h.lead}>{home.intro}</p>
              <p>{home.body}</p>
            </div>
            <div className={h.ctaRow}>
              <BuzzCta label={home.cta} />
              <Annotation>love, daisy digital xo</Annotation>
            </div>
          </div>

          <div className={h.polaroids}>
            {home.polaroids.slice(0, 2).map((p, i) => (
              <Sticker key={p.caption} seed={`hero-pol-${i}`} dieCut className={i === 0 ? h.pol1 : h.pol2}>
                <Polaroid caption={p.caption} icon={p.icon as IconName} tint={tints[i]} motionBlur={i === 1} />
              </Sticker>
            ))}
          </div>

          <Sticker seed="hero-note" className={h.note}><StickyNote items={home.stickyNote} /></Sticker>

          <Cutie who="erica" pose="float" className={h.erica} />
        </div>
      </Section>

      <Marquee />

      {/* SERVICES */}
      <Section accent="violet" labelledBy="services-title">
        <SectionHead id="services-title" title={home.servicesTitle} intro={home.servicesIntro} />
        <ul className={s.services}>
          {home.services.map((sv) => (
            <li key={sv.name}>
              <Sticker seed={`svc-${sv.name}`} max={2} className={s.serviceSticker}>
                <div className={s.service}>
                  <span className={s.serviceIcon}><Icon name={sv.icon as IconName} size={26} /></span>
                  <h3>{sv.name}</h3>
                  <p>{sv.blurb}</p>
                </div>
              </Sticker>
            </li>
          ))}
        </ul>
      </Section>

      <Divider variant="daisy" />

      {/* FEATURED WORK */}
      <Section accent="blue" labelledBy="work-title">
        <SectionHead id="work-title" title={home.workTitle} intro={home.workIntro} />
        <ul className={w.grid}>
          {work.filter((c) => c.featured).map((c, i, arr) => (
            <li key={c.slug}>
              {i === arr.length - 1 && <span className={w.peek}><Cutie who="bri" pose="peek" /></span>}
              <div className={w.cardWrap}><WorkCard c={c} /></div>
            </li>
          ))}
        </ul>
        <p className={s.more}><Button href="/work/" icon="arrow">see all the work</Button></p>
      </Section>

      {/* TEAM TEASER */}
      <Section accent="pink" dark labelledBy="team-title">
        <SectionHead id="team-title" title={home.teamTitle} intro="the brains (and the tabs) behind it all" />
        <div className={s.teamWrap}>
          <StatusList />
          <div className={s.team}>
            {team.map((m) => <ProfileCard key={m.slug} m={m} compact />)}
          </div>
        </div>
        <p className={s.more}><Button href="/team/" icon="heart">{home.teamCta}</Button></p>
      </Section>

      {/* CTA */}
      <Section accent="pink" labelledBy="cta-title" className={s.cta}>
        <h2 id="cta-title" className={s.ctaTitle}>{home.ctaTitle}</h2>
        <p className={s.ctaBody}>{home.ctaBody}</p>
        <BuzzCta label={home.cta} />
      </Section>
    </main>
  );
}
