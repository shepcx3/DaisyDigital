import type { Metadata } from "next";
import { Cutie } from "@/components/characters/Cutie";
import { BrowserWindow } from "@/components/system/BrowserWindow";
import { Badge, Button } from "@/components/system/primitives";
import { screens } from "@/content/site";
import s from "../screens.module.css";

export const metadata: Metadata = { title: "thank you", robots: { index: false } };

export default function ThanksPage() {
  return (
    <main id="main" className={s.screen} data-accent="pink">
      <BrowserWindow tab="message_sent" icon="heart" className={s.card}>
        <div className={s.inner}>
          <Badge icon="sparkle">TREND APPROVED</Badge>
          <Cutie who="bri" pose="hold" sparkles />
          <h1 className={s.title}>{screens.thanks.title}</h1>
          <p className={s.body}>{screens.thanks.body}</p>
          <Button href="/" icon="daisy">back to the site</Button>
        </div>
      </BrowserWindow>
    </main>
  );
}
