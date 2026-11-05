"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCalm } from "@/lib/calm-mode";
import { asset, cx } from "@/lib/utils";
import s from "./hero.module.css";

// three.js only downloads when we decide to show it
const ChromeDaisy3D = dynamic(() => import("./ChromeDaisy3D"), { ssr: false });

function canDo3D() {
  try {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return false;
    if (!matchMedia("(pointer: fine) and (min-width: 900px)").matches) return false; // phones keep the flat daisy
    if ((nav.hardwareConcurrency ?? 4) < 4) return false;
    if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
    const gl = document.createElement("canvas").getContext("webgl2");
    return !!gl;
  } catch {
    return false;
  }
}

/** Flat daisy first; swaps to the 3D chrome daisy on capable desktops (not phones), outside calm mode. */
export function HeroDaisy() {
  const calm = useCalm();
  const [want3D, setWant3D] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (calm || !canDo3D()) return;
    // wait for the first mouse move / scroll (or 4s), so three.js never competes with the first paint
    const start = () => setWant3D(true);
    const opts = { once: true, passive: true } as const;
    addEventListener("pointermove", start, opts);
    addEventListener("scroll", start, opts);
    const t = setTimeout(start, 4000);
    return () => {
      clearTimeout(t);
      removeEventListener("pointermove", start);
      removeEventListener("scroll", start);
    };
  }, [calm]);

  const show3D = want3D && !calm;

  return (
    <div className={s.daisySlot} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/daisy.svg")} alt="" className={cx(s.flatDaisy, show3D && ready && s.hidden)} />
      {show3D && (
        <div className={cx(s.canvas3d, ready && s.visible)}>
          <ChromeDaisy3D onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
