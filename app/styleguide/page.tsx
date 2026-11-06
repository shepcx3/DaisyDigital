import type { Metadata } from "next";
import { Icon, iconNames } from "@/components/icons/Icon";
import { BrowserWindow } from "@/components/system/BrowserWindow";
import { Loader } from "@/components/system/Loader";
import { Annotation, Badge, Button, Divider, Marquee, MicroLabel, Polaroid, Sticker, StickyNote, TornPaper } from "@/components/system/primitives";
import { durations, easings, springs } from "@/lib/motion";
import s from "./styleguide.module.css";

export const metadata: Metadata = { title: "style guide", robots: { index: false } };

const colors = [
  ["lavender", "--lavender", "#E6DDF7", "home base background"],
  ["lilac", "--lilac", "#C9B6F0", "backgrounds, never text"],
  ["violet", "--violet", "#7B4FD6", "brand colour, AA as text"],
  ["violet deep", "--violet-deep", "#3B1F73", "dark sections (with grain)"],
  ["bubblegum", "--bubblegum", "#FF8FC7", "hot accent: pink"],
  ["baby blue", "--baby-blue", "#A9D8FF", "hot accent: blue"],
  ["off-white", "--offwhite", "#FFFBF5", "cards + windows"],
  ["chrome", "--chrome", "gradient", "highlights only"],
  ["ink", "--ink", "#2A1A4A", "all text + borders"],
];

export default function StyleguidePage() {
  return (
    <main id="main" className={`container-dd ${s.page}`}>
      <header className={s.head}>
        <span className="micro-label">internal · style guide</span>
        <h1>the daisy system</h1>
        <p>
          three motifs everywhere: <b>the daisy</b>, <b>the browser window</b> and <b>the sparkle</b>. everything else is a
          sticker, and stickers are seasoning (2–3 per screen, max).
        </p>
      </header>

      <section className={s.section}>
        <h2><Icon name="heart" /> colour</h2>
        <p>lavender is home. each section picks ONE hot accent with <code>data-accent</code>; never two in one section.</p>
        <div className={s.grid}>
          {colors.map(([name, v, hex, use]) => (
            <div key={v} className={s.swatch}>
              <div className={s.chip} style={{ background: `var(${v})` }} />
              <p><b>{name}</b><br /><code>{v} · {hex}</code><br />{use}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <h2><Icon name="sparkle" /> hot accents</h2>
        <p>components read <code>var(--hot)</code>, so the same button or badge changes with its section.</p>
        <div className={s.grid} style={{ ["--min" as string]: "220px" }}>
          {(["pink", "blue", "violet"] as const).map((a) => (
            <div key={a} data-accent={a} className={s.accent}>
              <code>data-accent=&quot;{a}&quot;</code>
              <div className={s.accentBar} />
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <h2><Icon name="tab" /> shape</h2>
        <p>radius 10 / 18 / 28, 2.5px ink borders, soft offset shadows.</p>
        <div className={s.grid}>
          {(["sm", "md", "lg"] as const).map((r) => (
            <div key={r} className={s.tile} style={{ borderRadius: `var(--radius-${r})` }}>
              <small>--radius-{r}</small>
            </div>
          ))}
          <div className={s.tile} style={{ boxShadow: "var(--shadow-lift)" }}><small>--shadow-lift</small></div>
        </div>
      </section>

      <section className={s.section}>
        <h2><Icon name="message" /> type</h2>
        <p>rounded display, clean body, pixel micro-labels, serif italic for annotations. no script fonts.</p>
        <div className={s.typeRow}><small>display · fredoka</small><span className="font-display" style={{ fontSize: "2.6rem", fontWeight: 700, lineHeight: 1 }}>stay cute, stay current</span></div>
        <div className={s.typeRow}><small>body · dm sans</small><span>we make brands look good, sound cool and yes, we&apos;re probably already working on your next idea.</span></div>
        <div className={s.typeRow}><small>accent a · silkscreen</small><span className="micro-label">read at 2:47am</span></div>
        <div className={s.typeRow}><small>accent b · instrument serif</small><span className="text-serif" style={{ fontSize: "1.9rem" }}>creative by nature</span></div>
        <div className={s.typeRow}><small>.text-outline</small><span className="text-outline font-display" style={{ fontSize: "2.6rem", fontWeight: 700 }}>outlined</span></div>
        <div className={s.typeRow} data-accent="pink"><small>.text-sticker</small><span><span className="text-sticker font-display" style={{ fontSize: "2rem", fontWeight: 700 }}>trend alert</span></span></div>
      </section>

      <section className={s.section}>
        <h2><Icon name="star" /> icons</h2>
        <p>one set: 24px grid, 2px stroke, round caps. <code>{"<Icon name=\"daisy\" />"}</code></p>
        <div className={s.grid} style={{ ["--min" as string]: "110px" }}>
          {iconNames.map((n) => (
            <div key={n} className={s.tile}>
              <Icon name={n} size={32} style={{ color: "var(--violet)" }} />
              <small>{n}</small>
            </div>
          ))}
        </div>
      </section>

      <section className={s.section} data-accent="pink">
        <h2><Icon name="tab" /> components</h2>
        <p>the building blocks. every page is made from these and nothing else.</p>

        <div className={s.demoGrid}>
          <BrowserWindow tab="browser_window.exe" icon="tab" url="daisydigital.ca/work/bloom">
            <p style={{ margin: 0 }}>title bar with three dots, a tab label, an optional url bar, and a slot for anything.</p>
          </BrowserWindow>

          <div className={s.tile} style={{ alignContent: "center" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
              <Button hot glow icon="bee">give us a buzz</Button>
              <Button icon="daisy">let&apos;s bloom</Button>
              <Button icon="arrow">slide into our inbox</Button>
            </div>
            <small>button · hot + glow is for primary ctas only</small>
          </div>

          <div className={s.tile}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
              <Badge icon="sparkle">VIRAL</Badge>
              <Badge>TREND APPROVED</Badge>
              <Badge chrome>404 DOLL</Badge>
              <Badge>SOLD OUT</Badge>
              <Badge icon="star">NEW</Badge>
            </div>
            <small>badge</small>
          </div>

          <div className={s.tile}>
            <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
              <MicroLabel>trend alert</MicroLabel>
              <MicroLabel secret="psst… erica saw it first">currently obsessed</MicroLabel>
            </div>
            <Annotation>hover the second one</Annotation>
            <small>micro-label · hover secret · annotation</small>
          </div>

          <div className={s.tile}>
            <div style={{ display: "flex", gap: 18, justifyContent: "center" }}>
              <Sticker seed="sg-pol-1" dieCut>
                <div style={{ width: 140 }}><Polaroid caption="brainstorm @ 2:47am" icon="message" tint="var(--bubblegum)" /></div>
              </Sticker>
              <Sticker seed="sg-pol-2" dieCut>
                <div style={{ width: 140 }}><Polaroid caption="content day" icon="film" tint="var(--baby-blue)" motionBlur /></div>
              </Sticker>
            </div>
            <small>sticker + polaroid (hover to peel)</small>
          </div>

          <div className={s.tile}>
            <Sticker seed="sg-note"><StickyNote items={["check all 400 tabs", "spot the trend first"]} /></Sticker>
            <TornPaper><b>torn paper</b> edge, made with an svg mask</TornPaper>
            <small>sticky note · torn paper</small>
          </div>
        </div>

        <div style={{ display: "grid", gap: 26, marginTop: 30 }}>
          <Divider variant="daisy" />
          <Divider variant="squiggle" />
          <Divider variant="dashed" />
          <Divider variant="pixel" />
        </div>
        <p style={{ marginTop: 10 }}><small>dividers: daisy chain · squiggle · dashed · pixel</small></p>
      </section>

      <div style={{ marginTop: 40 }}><Marquee /></div>

      <section className={s.section}>
        <h2><Icon name="bee" /> motion</h2>
        <p>bouncy but quick. one config in <code>lib/motion.ts</code>. nothing over 600ms except the loader. calm mode turns it all off.</p>
        <pre className={s.code}>{JSON.stringify({ durations, easings, springs }, null, 2)}</pre>
        <div className={s.tile} style={{ marginTop: 20 }}>
          <Loader />
          <small>loader · only appears after 300ms</small>
        </div>
      </section>
    </main>
  );
}
