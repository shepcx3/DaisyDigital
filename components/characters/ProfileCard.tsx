import { Icon } from "@/components/icons/Icon";
import { BrowserWindow } from "@/components/system/BrowserWindow";
import { Badge } from "@/components/system/primitives";
import type { Member } from "@/content/site";
import { Cutie } from "./Cutie";
import { presenceColors } from "./StatusList";
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
              <tr><th scope="row">mood</th><td>{m.mood}</td></tr>
              <tr><th scope="row">status</th><td><span className={s.dot} style={{ background: presenceColors[m.presence] }} aria-hidden="true" />{m.status}</td></tr>
              <tr><th scope="row">currently listening to</th><td>{m.listening}</td></tr>
              <tr>
                <th scope="row">top 3 trends</th>
                <td><ol className={s.trends}>{m.trends.map((t) => <li key={t}>{t}</li>)}</ol></td>
              </tr>
            </tbody>
          </table>
        )}
        <p className={s.bio}>{compact ? m.title : m.bio}</p>
      </BrowserWindow>
    </div>
  );
}
