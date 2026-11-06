"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { microcopy, nav } from "@/content/site";
import { setCalm, useCalm } from "@/lib/calm-mode";
import { burst, toast } from "@/lib/toast";
import { cx } from "@/lib/utils";
import s from "./TabNav.module.css";

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, "")));

export function TabNav() {
  const raw = usePathname() || "/";
  const path = raw.endsWith("/") ? raw : `${raw}/`;
  const calm = useCalm();
  const plusCount = useRef(0);

  const onPlus = (e: React.MouseEvent) => {
    const msgs = microcopy.plusTab;
    toast(msgs[plusCount.current++ % msgs.length]);
    burst(e.clientX, e.clientY, 14);
  };

  return (
    <>
      <header className={s.top}>
        <div className={s.row}>
          <Link href="/" className={s.logo} aria-label="DD, daisy digital home" transitionTypes={["tab-open"]}>DD</Link>
          <nav className={s.tabs} aria-label="main">
            {nav.map((t) => {
              const active = isActive(path, t.href);
              return (
                <Link key={t.href} href={t.href} className={cx(s.tab, active && s.active)} aria-current={active ? "page" : undefined} transitionTypes={["tab-open"]}>
                  <Icon name={t.icon as IconName} size={16} />
                  {t.label}
                  <span className={s.x} aria-hidden="true">×</span>
                </Link>
              );
            })}
          </nav>
          <button type="button" className={s.plus} onClick={onPlus} aria-label="open a new tab (just for fun)">
            <Icon name="plus" size={16} />
          </button>
          <button type="button" className={s.calm} aria-pressed={calm} onClick={() => setCalm(!calm)}>
            <Icon name="sparkle" size={14} />
            calm mode {calm ? "on" : "off"}
          </button>
        </div>
        <div className={s.urlBar} aria-hidden="true">
          <div className={s.urlInner}>
            <span className={s.arrows}>‹ › ↻</span>
            <span className={s.url}>https://daisydigital.ca<b>{path}</b></span>
          </div>
        </div>
      </header>

      <nav className={s.bottom} aria-label="main (mobile)">
        {nav.map((t) => {
          const active = isActive(path, t.href);
          return (
            <Link key={t.href} href={t.href} className={cx(s.bTab, active && s.bActive)} aria-current={active ? "page" : undefined}>
              <Icon name={t.icon as IconName} size={20} />
              {t.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
