import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { BrowserWindow } from "@/components/system/BrowserWindow";
import { Sticker } from "@/components/system/primitives";
import type { CaseStudy } from "@/content/site";
import { asset } from "@/lib/utils";
import s from "./work.module.css";

/**
 * Case study card: a browser window you click into (camera-flash transition).
 * Until a case study has a summary or photos it's a brand tile with no link, so nobody clicks into an empty page.
 */
export function WorkCard({ c }: { c: CaseStudy }) {
  const cover = c.gallery?.[0]?.photos[0];
  const ready = Boolean(c.summary || cover);
  return (
    <Sticker seed={`work-${c.slug}`} max={2.5} className={s.stickerFill}>
      <BrowserWindow tab={c.brand} icon="tab" className={s.card} bodyClassName={s.tile}>
        {ready ? (
          <Link href={`/work/${c.slug}/`} className={s.link} transitionTypes={["cam-flash"]}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {cover && <img src={asset(`/work/${c.slug}/${cover.file}.webp`)} alt="" className={s.cover} loading="lazy" decoding="async" />}
            <span className={s.brand}>{c.brand}</span>
            {c.services.length > 0 && <span className="micro-label">{c.services.join(" · ")}</span>}
            <span className={s.open}>{c.summary ? "open case study" : "see the photos"} <Icon name="arrow" size={18} /></span>
          </Link>
        ) : (
          <div className={s.link}>
            <span className={s.brand}>{c.brand}</span>
            <span className={s.soon}>full story blooming soon</span>
          </div>
        )}
      </BrowserWindow>
    </Sticker>
  );
}
