"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { onToast } from "@/lib/toast";
import s from "./motion.module.css";

export function Toaster() {
  const [msg, setMsg] = useState<{ text: string; id: number } | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const off = onToast((text) => {
      setMsg({ text, id: Date.now() });
      clearTimeout(timer);
      timer = setTimeout(() => setMsg(null), 2600);
    });
    return () => {
      off();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={s.toastRegion} role="status" aria-live="polite">
      {msg && (
        <div key={msg.id} className={s.toast}>
          <Icon name="message" size={16} />
          {msg.text}
        </div>
      )}
    </div>
  );
}
