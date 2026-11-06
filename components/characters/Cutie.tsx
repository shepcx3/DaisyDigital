import { useId, type ReactNode } from "react";
import type { Member } from "@/content/site";
import { cx } from "@/lib/utils";
import s from "./characters.module.css";

type Who = Member["slug"];
type Pose = "stand" | "float" | "hold" | "peek" | "bust";

const INK = "#2a1a4a";

type Look = {
  skin: string;
  skinShade: string;
  hair: [string, string]; // light, dark
  iris: string;
  lips: string;
  top: string;
  bottom: string;
  boots: string;
  /** behind the head */
  hairBack: ReactNode;
  /** over the forehead */
  hairFront: ReactNode;
  /** on top of the hair */
  extra?: ReactNode;
  /** in the hands, in front of the body */
  prop?: (ids: { chrome: string }) => ReactNode;
};

const Shine = ({ d }: { d: string }) => <path d={d} fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="3.5" strokeLinecap="round" />;

const Butterfly = ({ chrome, x, y, r = 0 }: { chrome: string; x: number; y: number; r?: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`} stroke={INK} strokeWidth="2" strokeLinejoin="round" fill={`url(#${chrome})`}>
    <path d="M0 0C-5-13-20-13-19-3c1 7 11 8 19 3z" />
    <path d="M0 0C5-13 20-13 19-3c-1 7-11 8-19 3z" />
    <path d="M0 0c-6 3-12 8-8 12 3 3 7-2 8-6 1 4 5 9 8 6 4-4-2-9-8-12z" />
  </g>
);

const LOOKS: Record<Who, Look> = {
  // long brunette, chunky bangs, chrome butterfly clip, chrome laptop with way too many tabs
  erica: {
    skin: "#f8d6bd", skinShade: "#eab99a", hair: ["#7a4630", "#3f2118"], iris: "#3f8fd8", lips: "#e0457b", top: "#a9d8ff", bottom: "#7b4fd6", boots: "#fffbf5",
    hairBack: <path d="M38 92C32 14 168 14 162 92c4 50 12 92-2 128-12 8-26 6-34-2H74c-8 8-22 10-34 2-14-36-6-78-2-128z" />,
    hairFront: (
      <>
        <path d="M44 100C36 34 164 34 156 100c-6-14-14-24-26-30-4 10-16 16-30 16 6-4 8-10 8-16-14 12-40 14-64 30z" />
        <Shine d="M72 48c14-8 34-9 50-2" />
      </>
    ),
    prop: ({ chrome }) => (
      <g>
        <path d="M58 184h84l6 46H52z" fill={`url(#${chrome})`} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path d="M45 230h110l5 10H40z" fill="#9a9eab" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <g className={s.typing} fill="#7b4fd6">
          {[66, 78, 90, 102, 114, 126].map((x) => <rect key={x} x={x} y="192" width="9" height="5" />)}
        </g>
        <g fill="#ff8fc7">{[66, 78, 90, 102, 114].map((x) => <rect key={x} x={x} y="200" width="9" height="5" />)}</g>
      </g>
    ),
  },
  // brunette space buns, swoopy fringe, lightning bolt clip, spinning film reel
  bri: {
    skin: "#fbdcc4", skinShade: "#efbf9f", hair: ["#9a6240", "#4f2c1b"], iris: "#c2479b", lips: "#ff5c9e", top: "#ff8fc7", bottom: "#c9b6f0", boots: "#7b4fd6",
    hairBack: (
      <>
        <circle cx="48" cy="34" r="27" />
        <circle cx="152" cy="34" r="27" />
        <path d="M40 94C34 22 166 22 160 94c2 26-2 48-16 58H56C42 142 38 120 40 94z" />
      </>
    ),
    hairFront: (
      <>
        <path d="M44 102C36 36 164 36 156 102c-4-12-10-22-20-28-24 16-62 18-92 28z" />
        <Shine d="M70 50c18-9 40-8 56 2" />
      </>
    ),
    extra: <path d="M140 42l-12 18h9l-5 16 16-22h-10l6-12z" fill="#ffe14d" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />,
    prop: () => (
      <g className={s.reel}>
        <circle cx="152" cy="208" r="23" fill="#3b2a4f" stroke={INK} strokeWidth="3" />
        {[[152, 196], [152, 220], [140, 208], [164, 208]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="5.5" fill="#fffbf5" />)}
        <circle cx="152" cy="208" r="2.5" fill="#ff8fc7" />
      </g>
    ),
  },
  // sleek dark bob, blunt bangs, tinted glasses, camera on a strap
  philie: {
    skin: "#c98d63", skinShade: "#ae7349", hair: ["#54407f", "#1f1438"], iris: "#5b3a1e", lips: "#a8325e", top: "#2a1a4a", bottom: "#a9d8ff", boots: "#ff8fc7",
    hairBack: <path d="M36 92C30 12 170 12 164 92c2 28 4 50 0 74-14 6-30 2-38-6H74c-8 8-24 12-38 6-4-24-2-46 0-74z" />,
    hairFront: (
      <>
        <path d="M44 88C42 32 158 32 156 88c-34-8-78-8-112 0z" />
        <Shine d="M66 50c20-9 46-9 68 0" />
      </>
    ),
    extra: (
      <g fill="#a9d8ff" fillOpacity=".55" stroke={INK} strokeWidth="3">
        <rect x="52" y="84" width="40" height="30" rx="3" />
        <rect x="108" y="84" width="40" height="30" rx="3" />
        <path d="M92 94h16" fill="none" />
      </g>
    ),
    prop: ({ chrome }) => (
      <g>
        <path d="M78 164l18 26M122 164l-18 26" fill="none" stroke="#ff8fc7" strokeWidth="4" />
        <rect x="74" y="188" width="52" height="36" rx="3" fill={`url(#${chrome})`} stroke={INK} strokeWidth="3" />
        <rect x="84" y="182" width="16" height="7" fill="#9a9eab" stroke={INK} strokeWidth="2.5" />
        <circle cx="100" cy="206" r="12" fill="#2a1a4a" stroke={INK} strokeWidth="3" />
        <circle cx="96" cy="202" r="3" fill="#fff" />
        <path className={s.flash} d="M136 176q1 8 9 9-8 1-9 9-1-8-9-9 8-1 9-9z" fill="#ffe14d" stroke={INK} strokeWidth="1.5" />
      </g>
    ),
  },
  // long wavy pink ombre, star sunglasses pushed up, phone in hand
  jany: {
    skin: "#8d5a3b", skinShade: "#744629", hair: ["#ff9fd0", "#7b3fb8"], iris: "#3c2412", lips: "#ff7ac8", top: "#fffbf5", bottom: "#ff8fc7", boots: "#c9b6f0",
    hairBack: <path d="M38 92C30 14 170 14 162 92c8 22-4 34 4 58 6 24-4 56-20 68-10-6-14-6-22-4H76c-8-2-12-2-22 4-16-12-26-44-20-68 8-24-4-36 4-58z" />,
    hairFront: (
      <>
        <path d="M44 100C36 32 164 32 156 100c-8-18-22-34-56-38-34 4-48 20-56 38z" />
        <Shine d="M68 50c20-9 44-9 64 0" />
      </>
    ),
    extra: (
      <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round" fill="#ffe14d">
        <path d="M74 34l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" />
        <path d="M126 34l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" />
        <path d="M90 50h20" fill="none" />
      </g>
    ),
    prop: () => (
      <g>
        <rect x="136" y="184" width="26" height="46" rx="3" fill="#2a1a4a" stroke={INK} strokeWidth="3" />
        <rect x="140" y="190" width="18" height="32" fill="#c9b6f0" />
        <path className={s.flash} d="M149 201c-2-4-7-3-7 1 0 4 7 8 7 8s7-4 7-8c0-4-5-5-7-1z" fill="#ff5c9e" />
      </g>
    ),
  },
};

function Limb({ d, fill }: { d: string; fill: string }) {
  return (
    <>
      <path d={d} fill="none" stroke={INK} strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={fill} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Eye({ cx: x, id, flip }: { cx: number; id: string; flip?: boolean }) {
  const dir = flip ? -1 : 1;
  return (
    <g>
      <ellipse cx={x} cy="100" rx="17" ry="20" fill="#fff" stroke={INK} strokeWidth="2" />
      <ellipse cx={x} cy="102" rx="13" ry="17" fill={`url(#${id})`} stroke={INK} strokeWidth="2" />
      <ellipse cx={x} cy="103" rx="6.5" ry="9" fill={INK} />
      <circle cx={x - 5} cy="94" r="5" fill="#fff" />
      <circle cx={x + 5} cy="109" r="2.5" fill="#fff" fillOpacity=".9" />
      <path d={`M${x - 20 * dir} 94Q${x} 70 ${x + 20 * dir} 90l${6 * dir}-5`} fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** An original Y2K-cartoon cutie: big glossy eyes, lip gloss, chunky outlines, chrome accessories. Placeholder art. */
export function Cutie({ who, pose = "stand", sparkles, label, className }: { who: Who; pose?: Pose; sparkles?: boolean; label?: string; className?: string }) {
  const l = LOOKS[who];
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ids = { hair: `${uid}h`, iris: `${uid}i`, chrome: `${uid}c` };
  const viewBox = pose === "peek" ? "0 0 200 158" : pose === "bust" ? "0 0 200 246" : "0 0 200 330";
  const showBody = pose !== "peek";
  const showLegs = pose === "stand" || pose === "float" || pose === "hold";

  return (
    <span
      className={cx(s.cutie, s[pose], sparkles && s.sparkles, className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg className={s.art} viewBox={viewBox} fill="none">
        <defs>
          <linearGradient id={ids.hair} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={l.hair[0]} />
            <stop offset="1" stopColor={l.hair[1]} />
          </linearGradient>
          <linearGradient id={ids.iris} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={INK} />
            <stop offset="1" stopColor={l.iris} />
          </linearGradient>
          <linearGradient id={ids.chrome} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4f4f7" />
            <stop offset=".42" stopColor="#b9bcc6" />
            <stop offset=".56" stopColor="#fff" />
            <stop offset="1" stopColor="#9a9eab" />
          </linearGradient>
        </defs>

        <g fill={`url(#${ids.hair})`} stroke={INK} strokeWidth="3" strokeLinejoin="round">{l.hairBack}</g>

        {showLegs && (
          <g>
            <Limb d="M84 256v42" fill={l.skin} />
            <Limb d="M116 256v42" fill={l.skin} />
            {[66, 102].map((x) => (
              <path key={x} d={`M${x} 298c0-6 4-8 8-8h16c5 0 8 3 8 8v14l3 10H${x - 3}l3-10z`} fill={l.boots} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            ))}
            <path d="M68 214h64l14 52H54z" fill={l.bottom} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          </g>
        )}

        {showBody && (
          <g>
            <Limb d="M70 182q-16 16-12 44" fill={l.skin} />
            <Limb d="M130 182q16 16 12 44" fill={l.skin} />
            <path d="M88 140h24v30H88z" fill={l.skinShade} stroke={INK} strokeWidth="3" />
            <path d="M66 176q10-14 22-14 12 12 24 0 12 0 22 14l-4 42H70z" fill={l.top} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            <path d="M92 188l8 6 8-6-3 10-5 8-5-8z" fill={`url(#${ids.chrome})`} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
          </g>
        )}

        {/* face */}
        <path d="M48 92C46 44 154 44 152 92c1 32-26 58-52 58S47 124 48 92z" fill={l.skin} stroke={INK} strokeWidth="3" />
        <ellipse cx="60" cy="122" rx="11" ry="7" fill="#ff8fc7" opacity=".5" />
        <ellipse cx="140" cy="122" rx="11" ry="7" fill="#ff8fc7" opacity=".5" />
        <Eye cx={72} id={ids.iris} />
        <Eye cx={128} id={ids.iris} flip />
        <g className={s.blink}>
          {[72, 128].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy="100" rx="19" ry="22" fill={l.skin} />
              <path d={`M${x - 18} 104q18 12 36 0`} stroke={INK} strokeWidth="5" strokeLinecap="round" />
            </g>
          ))}
        </g>
        <path d="M97 120q3 3 6 0" stroke={l.skinShade} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M86 131q7-5 14-1 7-4 14 1-14 14-28 0z" fill={l.lips} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <ellipse cx="96" cy="134" rx="4" ry="1.6" fill="#fff" opacity=".85" />

        <g fill={`url(#${ids.hair})`} stroke={INK} strokeWidth="3" strokeLinejoin="round">{l.hairFront}</g>
        {who === "erica" && <Butterfly chrome={ids.chrome} x={146} y={56} r={18} />}
        {l.extra}

        {showBody && l.prop?.({ chrome: ids.chrome })}
      </svg>
      {pose === "hold" && (
        <svg className={s.heldDaisy} viewBox="0 0 24 24" aria-hidden="true">
          <g transform="translate(12 12)" fill="#fffbf5" stroke={INK} strokeWidth="1.5">
            {[0, 60, 120, 180, 240, 300].map((r) => <ellipse key={r} cy="-6" rx="2.6" ry="4" transform={`rotate(${r})`} />)}
          </g>
          <circle cx="12" cy="12" r="2.8" fill="#ffd75e" stroke={INK} strokeWidth="1.5" />
        </svg>
      )}
    </span>
  );
}
