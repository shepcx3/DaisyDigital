"use client";

import { useState } from "react";
import { presenceColors } from "@/components/characters/StatusList";
import { Cutie } from "@/components/characters/Cutie";
import { BrowserWindow } from "@/components/system/BrowserWindow";
import { presenceLabels, screens, type Member, type Presence } from "@/content/site";
import { auth, clean, db, MAX_LEN, type LiveFields } from "@/lib/firebase";
import { applyLocal, useLiveReady, useLiveTeam } from "@/lib/live-team";
import { toast } from "@/lib/toast";
import s from "./login.module.css";

const copy = screens.teamCorner;
const TEXT_FIELDS = ["status", "mood", "listening", "trend"] as const;

/** Where a signed-in girl changes her status (and, for admins, everyone's). */
export function TeamCorner({ email, slugs }: { email: string; slugs: Member["slug"][] }) {
  const team = useLiveTeam().filter((m) => slugs.includes(m.slug));
  const ready = useLiveReady(); // wait for the saved values, so the boxes start with what's live

  async function signOut() {
    const { signOut } = await import("firebase/auth");
    await signOut(await auth());
  }

  return (
    <main id="main" className={s.page}>
      <div className={s.inner}>
        <header className={s.head}>
          <div>
            <h1 className={s.title}>{copy.title}</h1>
            <p className={s.intro}>{copy.intro}</p>
          </div>
          <p className={s.who}>
            <span>signed in as <b>{email}</b></span>
            <button type="button" className={s.signOut} onClick={signOut}>{copy.signOut}</button>
          </p>
        </header>
        {ready ? (
          <div className={s.grid}>
            {team.map((m) => <MemberEditor key={m.slug} m={m} email={email} />)}
          </div>
        ) : (
          <p className={s.loading} role="status">loading your profile…</p>
        )}
      </div>
    </main>
  );
}

function MemberEditor({ m, email }: { m: Member; email: string }) {
  const [presence, setPresence] = useState<Presence>(m.presence);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState<{ text: string; ok: boolean } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const fields: LiveFields = clean({ presence, ...Object.fromEntries(TEXT_FIELDS.map((k) => [k, String(data.get(k) ?? "")])) });
    setSaving(true);
    setNote(null);
    try {
      const { doc, serverTimestamp, setDoc } = await import("firebase/firestore/lite");
      await setDoc(doc(await db(), "members", m.slug), { ...fields, updatedBy: email, updatedAt: serverTimestamp() }, { merge: true });
      applyLocal(m.slug, fields);
      setNote({ text: copy.saved, ok: true });
      toast(`${m.name}: ${copy.saved}`);
    } catch {
      setNote({ text: copy.saveFailed, ok: false });
    } finally {
      setSaving(false);
    }
  }

  const id = (k: string) => `${m.slug}-${k}`;

  return (
    <BrowserWindow as="section" tab={`${m.name}.status`} icon={m.icon} className={s.card} aria-labelledby={id("h")}>
      <form onSubmit={onSubmit} className={s.form}>
        <div className={s.who2}>
          <span className={s.avatar}><Cutie who={m.slug} pose="bust" /></span>
          <h2 id={id("h")} className={s.name}>{m.name}</h2>
        </div>

        <fieldset className={s.presence}>
          <legend>{copy.fields.presence}</legend>
          <div className={s.lights}>
            {(Object.keys(presenceLabels) as Presence[]).map((p) => (
              <label key={p} className={s.light}>
                <input type="radio" name={id("presence")} value={p} checked={presence === p} onChange={() => setPresence(p)} />
                <span className={s.dot} style={{ background: presenceColors[p] }} aria-hidden="true" />
                {presenceLabels[p]}
              </label>
            ))}
          </div>
        </fieldset>

        {TEXT_FIELDS.map((k) => (
          <label key={k} className={s.field} htmlFor={id(k)}>
            {copy.fields[k]}
            <input id={id(k)} name={k} defaultValue={m[k]} maxLength={MAX_LEN} autoComplete="off" />
          </label>
        ))}

        <div className={s.actions}>
          <button type="submit" className={s.save} disabled={saving}>{saving ? "saving…" : copy.save}</button>
          <span role="status" className={note && !note.ok ? s.error : s.ok}>{note?.text}</span>
        </div>
      </form>
    </BrowserWindow>
  );
}
