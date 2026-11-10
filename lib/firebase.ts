// Live team data (statuses, profile lines) lives in Firebase on the free plan.
// The six NEXT_PUBLIC_FIREBASE_* values come from the Firebase console (they are public by design;
// the security rules in firestore.rules decide who may write). Until they're set, the site just
// shows the built-in team from content/site.ts, so nothing breaks without them.
import { presenceLabels, team, type Member, type Presence } from "@/content/site";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseReady = Boolean(config.apiKey && config.projectId && config.appId);

/** The fields a team member can change from the team corner. Everything else stays in content/site.ts. */
export const EDITABLE = ["presence", "status", "mood", "listening", "trend"] as const;
export type Editable = (typeof EDITABLE)[number];
export type LiveFields = Partial<Pick<Member, Editable>>;
export const MAX_LEN = 60;

async function app() {
  const { getApps, initializeApp } = await import("firebase/app");
  return getApps()[0] ?? initializeApp(config);
}

/** Lightweight Firestore (no realtime socket) for reading and saving profiles. */
export async function db() {
  const { getFirestore } = await import("firebase/firestore/lite");
  return getFirestore(await app());
}

export async function auth() {
  const { getAuth } = await import("firebase/auth");
  return getAuth(await app());
}

/** Keep only known fields with sane values, so a bad document can't break the page. */
export function clean(data: Record<string, unknown>): LiveFields {
  const out: LiveFields = {};
  for (const k of EDITABLE) {
    const v = data[k];
    if (typeof v !== "string") continue;
    if (k === "presence") {
      if (v in presenceLabels) out.presence = v as Presence;
    } else {
      const t = v.trim().slice(0, MAX_LEN);
      if (t) out[k] = t;
    }
  }
  return out;
}

/** Built-in team with any live changes laid over it. */
export function merge(live: Record<string, LiveFields>): Member[] {
  return team.map((m) => ({ ...m, ...live[m.slug] }));
}

export async function fetchLive(): Promise<Record<string, LiveFields>> {
  const { collection, getDocs } = await import("firebase/firestore/lite");
  const snap = await getDocs(collection(await db(), "members"));
  const out: Record<string, LiveFields> = {};
  snap.forEach((d) => (out[d.id] = clean(d.data())));
  return out;
}
