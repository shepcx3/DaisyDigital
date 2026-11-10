"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { screens } from "@/content/site";
import { auth } from "@/lib/firebase";
import s from "../screens.module.css";

const copy = screens.login;
const EMAIL_KEY = "dd-signin-email";

/** The phone lock screen, now a real sign-in: Google, or a one-time link sent by email (no passwords to remember). */
export function LockScreen({ ready, message }: { ready: boolean; message?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [needEmail, setNeedEmail] = useState(false);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // Coming back from the emailed link: finish signing in.
  useEffect(() => {
    if (!ready) return;
    (async () => {
      const { isSignInWithEmailLink, signInWithEmailLink } = await import("firebase/auth");
      const a = await auth();
      if (!isSignInWithEmailLink(a, location.href)) return;
      let email: string | null = null;
      try {
        email = localStorage.getItem(EMAIL_KEY);
      } catch {}
      if (!email) return setNeedEmail(true);
      await finishLink(email, signInWithEmailLink);
    })().catch(() => setMsg(copy.failed));
  }, [ready]);

  async function finishLink(email: string, signIn: typeof import("firebase/auth").signInWithEmailLink) {
    await signIn(await auth(), email, location.href);
    try {
      localStorage.removeItem(EMAIL_KEY);
    } catch {}
    history.replaceState(null, "", location.pathname);
  }

  async function google() {
    setBusy(true);
    setMsg("");
    try {
      const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
      await signInWithPopup(await auth(), new GoogleAuthProvider());
    } catch (e) {
      if ((e as { code?: string }).code !== "auth/popup-closed-by-user") setMsg(copy.failed);
    } finally {
      setBusy(false);
    }
  }

  async function onEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setMsg("that email doesn't look quite right");
    setBusy(true);
    setMsg("");
    try {
      const fb = await import("firebase/auth");
      if (needEmail) {
        await finishLink(email, fb.signInWithEmailLink);
      } else {
        await fb.sendSignInLinkToEmail(await auth(), email, { url: location.origin + location.pathname, handleCodeInApp: true });
        try {
          localStorage.setItem(EMAIL_KEY, email);
        } catch {}
        setMsg(copy.linkSent);
      }
    } catch {
      setMsg(copy.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main id="main" className={`${s.lock} grain`}>
      <div className={s.lockInner}>
        <Icon name="lock" size={28} />
        <div className={s.clock} suppressHydrationWarning>
          {now ? now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, "") : "2:47"}
        </div>
        <div className={s.date} suppressHydrationWarning>
          {now ? now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) : " "}
        </div>

        <div className={s.notif} role="group" aria-labelledby="lock-title">
          <div className={s.notifHead}><Icon name="daisy" size={14} /><span>{copy.title}</span><span>now</span></div>
          <h1 id="lock-title" className={s.lockTitle}>{needEmail ? copy.confirmEmail : copy.body}</h1>
          {ready ? (
            <>
              {!needEmail && (
                <button type="button" className={s.google} onClick={google} disabled={busy}>
                  <Icon name="sparkle" size={16} /> {copy.google}
                </button>
              )}
              <form className={s.pw} onSubmit={onEmail} noValidate>
                <label htmlFor="email" className={needEmail ? "sr-only" : s.orLabel}>{needEmail ? "Email" : copy.emailLabel}</label>
                <div className={s.pwRow}>
                  <input id="email" name="email" type="email" autoComplete="email" placeholder="you@email.com" required />
                  <button type="submit" disabled={busy}>{needEmail ? "sign in" : copy.emailButton}</button>
                </div>
              </form>
            </>
          ) : (
            <p className={s.pwMsg}>{copy.notSetUp}</p>
          )}
          <p className={s.pwMsg} role="status">{message || msg}</p>
        </div>
      </div>
    </main>
  );
}
