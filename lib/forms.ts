import { brand } from "@/content/site";

export type SendResult = "sent" | "mailto";

/**
 * Sends a form to brand.formEndpoint (e.g. Formspree). GitHub Pages has no server,
 * so until an endpoint is set we open the visitor's email app with the message filled in.
 */
export async function sendForm(data: FormData, subject: string): Promise<SendResult> {
  if (brand.formEndpoint) {
    data.append("_subject", subject);
    const res = await fetch(brand.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`form endpoint returned ${res.status}`);
    return "sent";
  }
  const lines = [...data.entries()]
    .filter(([, v]) => typeof v === "string" && v)
    .map(([k, v]) => `${k}: ${v}`);
  window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  return "mailto";
}
