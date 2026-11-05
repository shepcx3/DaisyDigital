"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { Button } from "@/components/system/primitives";
import { brand, contact } from "@/content/site";
import { sendForm } from "@/lib/forms";
import s from "./forms.module.css";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = contact.errors.name;
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") ?? ""))) next.email = contact.errors.email;
    if (!String(data.get("message") ?? "").trim()) next.message = contact.errors.message;
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    try {
      setStatus({ text: "buzzing…", ok: true });
      const result = await sendForm(data, `new buzz from ${data.get("name")}`);
      if (result === "sent") router.push("/thanks/");
      else setStatus({ text: "opening your email app… 🐝", ok: true });
    } catch {
      setStatus({ text: contact.errors.send, ok: false });
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? { "aria-invalid": true as const, "aria-describedby": `err-${k}` } : {};

  return (
    <form id="contact-form" className={s.form} onSubmit={onSubmit} noValidate>
      <div className={s.to}>
        to: <span className={s.chip}><Icon name="daisy" size={14} />daisy digital</span>
      </div>
      <div className={s.row}>
        <label className={s.field}>
          Name
          <input name="name" autoComplete="name" {...err("name")} />
          {errors.name && <span id="err-name" className={s.error}>{errors.name}</span>}
        </label>
        <label className={s.field}>
          Email
          <input name="email" type="email" autoComplete="email" {...err("email")} />
          {errors.email && <span id="err-email" className={s.error}>{errors.email}</span>}
        </label>
      </div>
      <label className={s.field}>
        Brand or business <span className={s.hint}>(optional)</span>
        <input name="brand" autoComplete="organization" />
      </label>
      <label className={s.field}>
        What can we help with?
        <select name="service" defaultValue={contact.services[0]}>
          {contact.services.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className={s.field}>
        Message
        <textarea name="message" rows={5} placeholder="no idea is too random…" {...err("message")} />
        {errors.message && <span id="err-message" className={s.error}>{errors.message}</span>}
      </label>
      <div className={s.actions}>
        <Button type="submit" hot glow icon="arrow">{contact.submit}</Button>
      </div>
      <p className={s.hint}>
        {!brand.formEndpoint && <>{contact.mailtoNote} </>}
        {contact.direct} <a href={`mailto:${brand.email}`} className={s.mail}>{brand.email}</a>
      </p>
      <p className={`${s.status} ${status?.ok ? s.ok : s.bad}`} role="status">{status?.text}</p>
    </form>
  );
}
