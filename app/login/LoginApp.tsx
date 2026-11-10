"use client";

import { useEffect, useState } from "react";
import { screens, team, type Member } from "@/content/site";
import { auth, db, firebaseReady } from "@/lib/firebase";
import { LockScreen } from "./LockScreen";
import { TeamCorner } from "./TeamCorner";

type Access = { email: string; slugs: Member["slug"][] };

/**
 * Who may edit what lives in Firestore at config/access:
 *   admins: ["erica@…", "bri@…"]            → can edit everyone
 *   members: { philie: "philie@…", … }      → can edit only their own profile
 * The same list is enforced by firestore.rules, so this page only decides what to show.
 */
async function lookUp(email: string): Promise<Member["slug"][]> {
  const { doc, getDoc } = await import("firebase/firestore/lite");
  const snap = await getDoc(doc(await db(), "config", "access"));
  const data = snap.data() ?? {};
  const me = email.toLowerCase();
  const admins: string[] = Array.isArray(data.admins) ? data.admins.map((e: string) => String(e).toLowerCase()) : [];
  if (admins.includes(me)) return team.map((m) => m.slug);
  const members: Record<string, string> = data.members ?? {};
  return team.filter((m) => String(members[m.slug] ?? "").toLowerCase() === me).map((m) => m.slug);
}

export function LoginApp() {
  const [access, setAccess] = useState<Access | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!firebaseReady) return;
    let off = () => {};
    (async () => {
      const { onAuthStateChanged, signOut } = await import("firebase/auth");
      const a = await auth();
      off = onAuthStateChanged(a, async (user) => {
        if (!user?.email) return setAccess(null);
        // a reader the rules don't recognise gets "permission denied", which means the same thing
        const slugs = await lookUp(user.email).catch(() => [] as Member["slug"][]);
        if (!slugs.length) {
          setMessage(screens.login.notOnList);
          await signOut(a);
          return;
        }
        setMessage("");
        setAccess({ email: user.email, slugs });
      });
    })();
    return () => off();
  }, []);

  return access ? <TeamCorner email={access.email} slugs={access.slugs} /> : <LockScreen ready={firebaseReady} message={message} />;
}
