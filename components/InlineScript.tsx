"use client";

// Runs during HTML parsing on full page loads; inert ("text/plain") when React renders it on the client.
// Pattern from Next's "preventing flash before hydration" guide.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
