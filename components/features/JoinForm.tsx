"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { Button } from "@/components/system/primitives";
import { brand, careers, contact, microcopy } from "@/content/site";
import { cx } from "@/lib/utils";
import { sendForm } from "@/lib/forms";
import s from "./forms.module.css";

const MAX_MB = 10;

export function JoinForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = contact.errors.name;
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") ?? ""))) next.email = contact.errors.email;
    if (file && file.size > MAX_MB * 1024 * 1024) next.resume = `that file's a little big, max ${MAX_MB}mb please`;
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    // Without a form service, email can't carry the file, so ask them to attach it.
    if (!brand.formEndpoint) {
      await sendForm(data, `job application from ${data.get("name")}`);
      setStatus({ text: careers.sent, ok: true });
      return;
    }
    try {
      setStatus({ text: "planting…", ok: true });
      await sendForm(data, `job application from ${data.get("name")}`);
      router.push("/thanks/");
    } catch {
      setStatus({ text: contact.errors.send, ok: false });
    }
  }

  const err = (k: string) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `jerr-${k}` } : {});

  return (
    <form id="apply" className={s.form} onSubmit={onSubmit} noValidate>
      <div className={s.row}>
        <label className={s.field}>
          Name
          <input name="name" autoComplete="name" {...err("name")} />
          {errors.name && <span id="jerr-name" className={s.error}>{errors.name}</span>}
        </label>
        <label className={s.field}>
          Email
          <input name="email" type="email" autoComplete="email" {...err("email")} />
          {errors.email && <span id="jerr-email" className={s.error}>{errors.email}</span>}
        </label>
      </div>
      <label className={s.field}>
        Socials or portfolio link <span className={s.hint}>(optional)</span>
        <input name="portfolio" placeholder="@yourhandle or a link" />
      </label>
      <label className={s.field}>
        Tell us about you
        <textarea name="about" rows={3} placeholder="what's in your 400 tabs right now?" />
      </label>
      <div className={s.field}>
        <span id="resume-label">Resume <span className={s.hint}>(PDF or Word, max {MAX_MB}MB)</span></span>
        <label
          className={cx(s.file, drag && s.drag)}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={() => setDrag(false)}
        >
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            aria-labelledby="resume-label"
            {...err("resume")}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <Icon name="daisy" size={20} />{" "}
          {file ? <><b>{file.name}</b> has bloomed ✿</> : <>{microcopy.empty}. drop your resume here or <u>browse</u></>}
        </label>
        {errors.resume && <span id="jerr-resume" className={s.error}>{errors.resume}</span>}
      </div>
      <div className={s.actions}>
        <Button type="submit" hot glow icon="daisy">{careers.submit}</Button>
      </div>
      <p className={`${s.status} ${status?.ok ? s.ok : s.bad}`} role="status">{status?.text}</p>
    </form>
  );
}
