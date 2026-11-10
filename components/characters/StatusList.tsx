"use client";

import Link from "next/link";
import { BrowserWindow } from "@/components/system/BrowserWindow";
import { presenceLabels, type Presence } from "@/content/site";
import { useLiveTeam } from "@/lib/live-team";
import s from "./status.module.css";

export const presenceColors: Record<Presence, string> = {
  online: "#22a35a",
  busy: "#e0356f",
  loggedOff: "#9a9eab",
  doomScrolling: "#7b4fd6",
  brb: "#e8a800",
  onACall: "#2f8fe0",
  vacay: "#ff8fc7",
};

const isAround = (p: Presence) => p !== "loggedOff" && p !== "vacay";

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
 * Old-school messenger contact list. Shows the built-in statuses from content/site.ts first,
 * then whatever the girls last set in the team corner (when Firebase is switched on).
 */
export function StatusList() {
  const team = useLiveTeam();
  const here = team.filter((m) => isAround(m.presence));
  const away = team.filter((m) => !isAround(m.presence));
  const groups = [
    { title: "around", people: here },
    { title: "logged off", people: away },
  ].filter((g) => g.people.length);

  return (
    <BrowserWindow tab="daisy_messenger" icon="message" className={s.window} bodyClassName={s.body}>
      {groups.map((g) => (
        <section key={g.title} aria-label={`${g.title} (${g.people.length})`}>
          <p className={s.group}>{g.title} ({g.people.length})</p>
          <ul className={s.list}>
            {g.people.map((m) => (
              <li key={m.slug}>
                <Link href={`/team/#${m.slug}`} className={s.row}>
                  <StatusDaisy color={presenceColors[m.presence]} />
                  <span className={s.text}>
                    <span className={s.line}><b>{m.name}</b> <span className={s.state}>({presenceLabels[m.presence]})</span></span>
                    <span className={s.note}>{m.status}</span>
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
