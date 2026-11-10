import { Icon } from "@/components/icons/Icon";
import { BrowserWindow } from "@/components/system/BrowserWindow";
import { Badge } from "@/components/system/primitives";
import type { Member } from "@/content/site";
import { Cutie } from "./Cutie";
import { LiveField } from "./LiveField";
import s from "./profile.module.css";

/** MySpace-esque profile page inside a BrowserWindow. The member's signature colour is the card's hot accent. */
export function ProfileCard({ m, compact, headingLevel = 3 }: { m: Member; compact?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div id={m.slug} data-accent={m.accent} className={s.wrap}>
      <BrowserWindow as="article" tab={`${m.name}'s profile`} icon={m.icon} url={`myspace.com/${m.slug}`} className={s.card} aria-labelledby={`p-${m.slug}`}>
        <span className={s.badge}><Badge chrome={m.slug === "erica"} icon="sparkle">{m.badge}</Badge></span>
        <div className={s.top}>
          <div className={s.avatar}>
            <Cutie who={m.slug} pose="bust" sparkles label={`cartoon of ${m.name}`} />
          </div>
          <div>
            <H id={`p-${m.slug}`} className={s.name}>{m.name}</H>
            <p className={`text-serif ${s.role}`}>{m.role}</p>
            <span className={s.icons} aria-hidden="true">
              <span><Icon name={m.icon} size={16} /></span>
              <span><Icon name={m.icon2} size={16} /></span>
            </span>
          </div>
        </div>

        {!compact && (
          <table className={s.table}>
            <tbody>
              <tr><th scope="row">mood</th><td><LiveField slug={m.slug} field="mood" /></td></tr>
              <tr><th scope="row">status</th><td><LiveField slug={m.slug} field="status" /></td></tr>
              <tr><th scope="row">currently listening to</th><td><LiveField slug={m.slug} field="listening" /></td></tr>
              <tr><th scope="row">fav trend</th><td><LiveField slug={m.slug} field="trend" /></td></tr>
            </tbody>
          </table>
        )}
        <p className={s.bio}>{compact ? m.title : m.bio}</p>
      </BrowserWindow>
    </div>
  );
}
