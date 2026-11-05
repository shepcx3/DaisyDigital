import type { SVGProps } from "react";

// One icon set: 24px grid, 2px stroke, round caps + joins, inherits currentColor.
const paths = {
  cursor: <path d="M5 3.5l13.5 8-6 1.6-3.3 6.4z" />,
  daisy: (
    <>
      <g transform="translate(12 12)">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <ellipse key={r} cy="-6" rx="2.2" ry="3.3" transform={`rotate(${r})`} />
        ))}
      </g>
      <circle cx="12" cy="12" r="2.3" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.1 4.1 0 0 1 12 7.4a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z" />,
  sparkle: <path d="M12 3q1 8 9 9-8 1-9 9-1-8-9-9 8-1 9-9z" />,
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />,
  bee: (
    <>
      <ellipse cx="11" cy="14.5" rx="6.5" ry="4.5" />
      <path d="M9 10.3v8.4M12.5 10.1v8.8M17.5 14.5h3" />
      <ellipse cx="8.6" cy="7.6" rx="2.5" ry="3" transform="rotate(-20 8.6 7.6)" />
      <ellipse cx="13.4" cy="7.6" rx="2.5" ry="3" transform="rotate(20 13.4 7.6)" />
    </>
  ),
  butterfly: (
    <>
      <path d="M12 8.5C9.5 3.5 3.5 3.5 3.8 8c.3 3.6 4.6 4.3 8.2 3.2" />
      <path d="M12 8.5c2.5-5 8.5-5 8.2-.5-.3 3.6-4.6 4.3-8.2 3.2" />
      <path d="M12 12c-3.2.5-5.8 2.8-4.6 5.2 1.1 2.1 3.8.9 4.6-1.6.8 2.5 3.5 3.7 4.6 1.6 1.2-2.4-1.4-4.7-4.6-5.2z" />
      <path d="M12 7v11" />
    </>
  ),
  "watering-can": (
    <>
      <rect x="3" y="10" width="11" height="9" rx="2" />
      <path d="M14 13.5l6-5.5M18.8 6.4l2.6 2.6M5.5 10c0-4 6-4 6 0" />
    </>
  ),
  tab: (
    <>
      <path d="M3 19.5V9a2 2 0 0 1 2-2h4.5l1.6-2.5h5.8L18.5 7H19a2 2 0 0 1 2 2v10.5z" />
      <path d="M3 11h18" />
    </>
  ),
  message: (
    <>
      <path d="M4 5.5h16A1.5 1.5 0 0 1 21.5 7v8.5A1.5 1.5 0 0 1 20 17H10l-5 3.5V17H4a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 4 5.5z" />
      <path d="M8 11.2h.01M12 11.2h.01M16 11.2h.01" />
    </>
  ),
  bolt: <path d="M13.5 2.5L5 13.5h6.2L10 21.5l8.8-11.5h-6.3z" />,
  film: (
    <>
      <circle cx="11" cy="11" r="7.5" />
      <circle cx="11" cy="7" r="1.5" />
      <circle cx="11" cy="15" r="1.5" />
      <circle cx="7" cy="11" r="1.5" />
      <circle cx="15" cy="11" r="1.5" />
      <path d="M18.5 11v8.5H22" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3.5L9 5.5h6L16.5 8H20a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 19H4a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 4 8z" />
      <circle cx="12" cy="13.2" r="3.4" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6L6 18" />,
  arrow: (
    <>
      <path d="M3 15c3.5 0 3.5-7 7-7s3 7 6.5 7c1.6 0 2.8-1.2 3.6-3" />
      <path d="M17.4 11.6l2.8.4.5-2.8" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;
export const iconNames = Object.keys(paths) as IconName[];

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number; label?: string };

export function Icon({ name, size = 24, label, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
