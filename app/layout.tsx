import type { Metadata, Viewport } from "next";
import { DM_Sans, Fredoka, Instrument_Serif, Silkscreen } from "next/font/google";
import { ViewTransition } from "react";
import { DMFooter } from "@/components/features/DMFooter";
import { KonamiSparkle } from "@/components/features/EasterEggs";
import { InlineScript } from "@/components/InlineScript";
import { Sparkles } from "@/components/motion/Sparkles";
import { Toaster } from "@/components/motion/Toaster";
import { TabNav } from "@/components/system/TabNav";
import { brand } from "@/content/site";
import { asset } from "@/lib/utils";
import "./globals.css";

// display + body fonts are preloaded; the two accent fonts load after first paint (they swap in)
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const silkscreen = Silkscreen({ variable: "--font-silkscreen", subsets: ["latin"], weight: "400", preload: false });
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument-serif", subsets: ["latin"], weight: "400", style: "italic", preload: false });

export const metadata: Metadata = {
  title: { default: `${brand.name} ✿ ${brand.tagline}`, template: `%s ✿ ${brand.name}` },
  description: "daisy digital: social media, content, strategy and consulting. chronically online, creatively curious and always a few scrolls ahead.",
  icons: { icon: asset("/favicon.svg") },
};

export const viewport: Viewport = { themeColor: "#7b4fd6" };

// Runs before first paint: apply calm mode from the saved toggle, else the OS reduced-motion setting.
const calmScript = `try{var s=localStorage.getItem("dd-calm");document.documentElement.dataset.calm=s||(matchMedia("(prefers-reduced-motion: reduce)").matches?"on":"off")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${dmSans.variable} ${silkscreen.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={calmScript} />
      </head>
      <body>
        <a href="#main" className="skip-link">skip to content</a>
        <TabNav />
        {/* page transitions: "new tab opening" by default, camera flash for work detail pages */}
        <ViewTransition
          enter={{ "tab-open": "tab-open", "cam-flash": "cam-flash", default: "none" }}
          exit={{ "tab-open": "tab-open", "cam-flash": "cam-flash", default: "none" }}
          default="none"
        >
          <div className="page-shell">{children}</div>
        </ViewTransition>
        <DMFooter />
        <Toaster />
        <Sparkles />
        <KonamiSparkle />
      </body>
    </html>
  );
}
