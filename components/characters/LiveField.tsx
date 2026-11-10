"use client";

import type { Member } from "@/content/site";
import type { Editable } from "@/lib/firebase";
import { useLiveTeam } from "@/lib/live-team";

/** One profile line that updates to the member's latest saved value (statuses, mood…). */
export function LiveField({ slug, field }: { slug: Member["slug"]; field: Exclude<Editable, "presence"> }) {
  const m = useLiveTeam().find((x) => x.slug === slug);
  return <>{m?.[field]}</>;
}
