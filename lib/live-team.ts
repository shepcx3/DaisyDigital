"use client";

import { useEffect, useSyncExternalStore } from "react";
import { team, type Member } from "@/content/site";
import { fetchLive, firebaseReady, merge, type LiveFields } from "./firebase";

// One fetch per page load, shared by every component that shows the team.
let current: Member[] = team;
let started = false;
let ready = !firebaseReady;
const listeners = new Set<() => void>();

function set(live: Record<string, LiveFields>) {
  current = merge(live);
  ready = true;
  listeners.forEach((l) => l());
}

function load() {
  if (started || !firebaseReady) return;
  started = true;
  // If Firebase is unreachable, the built-in team simply stays up.
  fetchLive().then(set, () => set({}));
}

/** Lay one member's saved changes over the current team (the team corner calls this after saving). */
export function applyLocal(slug: Member["slug"], fields: LiveFields) {
  current = current.map((m) => (m.slug === slug ? { ...m, ...fields } : m));
  listeners.forEach((l) => l());
}

/**
 * The team as the site should show it: the built-in content first (that's what the static HTML has),
 * then live statuses once they arrive.
 */
export function useLiveTeam(): Member[] {
  useEffect(load, []);
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => current,
    () => team,
  );
}

/** True once live statuses have arrived (or failed, or Firebase isn't switched on). */
export function useLiveReady(): boolean {
  useEffect(load, []);
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => ready,
    () => false,
  );
}
