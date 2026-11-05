import Link from "next/link";
import { BrowserWindow } from "@/components/system/BrowserWindow";
import { presenceLabels, team, type Presence } from "@/content/site";
import s from "./status.module.css";

export const presenceColors: Record<Presence, string> = {
  online: "#22a35a",
  available: "#2f8fe0",
  busy: "#e0356f",
  away: "#e8a800",
};

function StatusDaisy({ color }: { color: string }) {
  return (
    <svg className={s.daisy} viewBox="0 0 24 24" aria-hidden="true">
      <g transform="translate(12 12)" fill={color} stroke="#2a1a4a" strokeWidth="1.3">
        {[0, 60, 120, 180, 240, 300].map((r) => <ellipse key={r} cy="-6" rx="3" ry="4.6" transform={`rotate(${r})`} />)}
      </g>
      <circle cx="12" cy="12" r="3" fill="#fffbf5" stroke="#2a1a4a" strokeWidth="1.3" />
    </svg>
  );
}

/**
 * Old-school messenger contact list. Statuses come from content/site.ts for now,
 * so this is the look of the feature; making it truly live needs a small outside service.
 */
export function StatusList() {
  const here = team.filter((m) => m.presence !== "away");
  const away = team.filter((m) => m.presence === "away");
  const groups = [
    { title: "around", people: here },
    { title: "away", people: away },
  ].filter((g) => g.people.length);

  return (
    <BrowserWindow tab="daisy_messenger" icon="message" className={s.window} bodyClassName={s.body}>
      {groups.map((g) => (
        <section key={g.title} aria-label={`${g.title} (${g.people.length})`}>
          <h3 className={s.group}>{g.title} ({g.people.length})</h3>
          <ul className={s.list}>
            {g.people.map((m) => (
              <li key={m.slug}>
                <Link href={`/team/#${m.slug}`} className={s.row}>
                  <StatusDaisy color={presenceColors[m.presence]} />
                  <span className={s.text}>
                    <span className={s.line}><b>{m.name}</b> <span className={s.state}>({presenceLabels[m.presence]})</span></span>
                    <span className={s.note}>{m.presenceNote}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </BrowserWindow>
  );
}
