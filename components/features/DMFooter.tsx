"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { brand, footer, microcopy } from "@/content/site";
import { sendForm } from "@/lib/forms";
import { HiddenDaisy } from "./EasterEggs";
import { toast } from "@/lib/toast";
import s from "./footer.module.css";

/** Footer as a DMs screen: message bubbles, read receipts, typing dots, newsletter "new message". */
export function DMFooter() {
  const [done, setDone] = useState(false);

  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") ?? ""))) {
      toast("that email looks a little lost in the scroll");
      return;
    }
    try {
      await sendForm(data, "newsletter signup");
      setDone(true);
    } catch {
      toast("lost in the scroll 😵‍💫 try again");
    }
  }

  return (
    <footer className={`${s.footer} surface-violet grain`}>
      <div className={s.phone}>
        <div className={s.head}>
          <span className={s.avatar} aria-hidden="true"><Icon name="daisy" size={22} /></span>
          <div>
            <b>{brand.name}</b>
            <small>● active now</small>
          </div>
        </div>

        <div className={s.chat}>
          {footer.chat.map((m, i) => (
            <p key={i} className={m.from === "me" ? s.me : s.them}>{m.text}</p>
          ))}
          <p className={s.them}>
            {footer.links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && " · "}
                <Link href={l.href} transitionTypes={["tab-open"]}>{l.label}</Link>
              </span>
            ))}
          </p>
          <span className={s.read}>{microcopy.read}</span>

          <div className={s.newMsg}>
            <span className="micro-label">new message</span>
            {done ? (
              <p className={s.newText}>{microcopy.onTrend} ✿ you&apos;re on the list</p>
            ) : (
              <form onSubmit={subscribe} className={s.sub} noValidate>
                <label className={s.newText} htmlFor="news-email">{footer.newsletter}</label>
                <div className={s.subRow}>
                  <input id="news-email" name="email" type="email" placeholder="you@email.com" autoComplete="email" />
                  <button type="submit">{footer.newsletterCta}</button>
                </div>
              </form>
            )}
          </div>

          <p className={`${s.them} ${s.typing}`}><span className="sr-only">typing…</span><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /></p>
        </div>
      </div>

      <HiddenDaisy id="footer" className={s.egg} />
      <p className={s.legal}>
        © {new Date().getFullYear()} {brand.name} · {brand.tagline} · <a href={`https://www.instagram.com/${brand.instagram}/`} rel="noopener">@{brand.instagram}</a> · <Link href="/styleguide/">style guide</Link>
      </p>
    </footer>
  );
}
