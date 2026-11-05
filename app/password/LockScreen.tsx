"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { screens } from "@/content/site";
import s from "../screens.module.css";

// Design screen only: GitHub Pages can't protect a page, so nothing here unlocks anything.
// A real password needs server hosting (e.g. Vercel). Kept so the screen is ready when that happens.
export function LockScreen() {
  const [now, setNow] = useState<Date | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <main id="main" className={`${s.lock} grain`}>
      <div className={s.lockInner}>
        <Icon name="lock" size={28} />
        <div className={s.clock} suppressHydrationWarning>
          {now ? now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, "") : "2:47"}
        </div>
        <div className={s.date} suppressHydrationWarning>
          {now ? now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) : " "}
        </div>

        <div className={s.notif} role="group" aria-labelledby="lock-title">
          <div className={s.notifHead}><Icon name="daisy" size={14} /><span>{screens.password.title}</span><span>now</span></div>
          <p id="lock-title">{screens.password.body}</p>
          <form
            className={s.pw}
            onSubmit={(e) => {
              e.preventDefault();
              setMsg("this daisy hasn't bloomed yet. ask the girls for access ✿");
            }}
          >
            <label htmlFor="pw" className="sr-only">Password</label>
            <input id="pw" type="password" autoComplete="current-password" placeholder="password" />
            <button type="submit">unlock</button>
          </form>
          <p className={s.pwMsg} role="status">{msg}</p>
        </div>
      </div>
    </main>
  );
}
