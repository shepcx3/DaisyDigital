import { BrowserWindow } from "@/components/system/BrowserWindow";
import { Badge, Button } from "@/components/system/primitives";
import { screens } from "@/content/site";
import s from "./screens.module.css";

export const metadata = { title: "lost in the scroll" };

export default function NotFound() {
  return (
    <main id="main" className={s.screen} data-accent="pink">
      <BrowserWindow tab="error.exe" icon="x" className={s.card}>
        <div className={s.inner}>
          <Badge chrome>404 DOLL</Badge>
          <button type="button" className={s.wiltWrap} aria-label="a wilted daisy (hover to make it bloom)">
            <svg className={s.wilt} viewBox="0 0 120 140" aria-hidden="true">
              <path className={s.stem} d="M60 140 C60 110 58 95 60 72" fill="none" stroke="#22a35a" strokeWidth="5" strokeLinecap="round" />
              <path d="M60 112 c-14 -6 -22 -2 -26 6 c10 4 18 2 26 -6z" fill="#4ade80" stroke="#2a1a4a" strokeWidth="2" />
              <g className={s.head}>
                <g transform="translate(60 48)" fill="#fffbf5" stroke="#2a1a4a" strokeWidth="2.5">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => <ellipse key={r} cy="-17" rx="7" ry="14" transform={`rotate(${r})`} />)}
                </g>
                <circle cx="60" cy="48" r="10" fill="#ffd75e" stroke="#2a1a4a" strokeWidth="2.5" />
              </g>
            </svg>
          </button>
          <span className={s.big} aria-hidden="true">404</span>
          <h1 className={s.title}>{screens.notFound.title}</h1>
          <p className={s.body}>{screens.notFound.body}</p>
          <Button href="/" hot glow icon="daisy">take me home</Button>
        </div>
      </BrowserWindow>
    </main>
  );
}
