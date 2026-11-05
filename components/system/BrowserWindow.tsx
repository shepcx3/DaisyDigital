import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons/Icon";
import { cx } from "@/lib/utils";
import s from "./system.module.css";

type Props = {
  tab: string;
  icon?: IconName;
  url?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  as?: "div" | "article" | "section" | "form" | "li";
} & Record<string, unknown>;

/** The signature frame: case studies, team cards, modals, forms. */
export function BrowserWindow({ tab, icon = "daisy", url, children, className, bodyClassName, as: Tag = "div", ...rest }: Props) {
  return (
    <Tag className={cx(s.window, className)} {...rest}>
      <div className={s.bar}>
        <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
        <span className={s.tabLabel}><Icon name={icon} size={12} />{tab}</span>
        {url ? <span className={s.url} aria-hidden="true">{url}</span> : <span className={s.spacer} />}
        <span className={s.ctrl} aria-hidden="true">_□×</span>
      </div>
      <div className={cx(s.body, bodyClassName)}>{children}</div>
    </Tag>
  );
}
