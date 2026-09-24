import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";

const mono = IBM_Plex_Mono({
  variable: "--v2-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Miki Stec — From AI FOMO to shipping",
  description:
    "I teach you to build your own website and your own AI agents. Or I build the website for you.",
  robots: { index: false, follow: false },
};

export default function V2DraftLayout({ children }: { children: React.ReactNode }) {
  return <div className={mono.variable}>{children}</div>;
}
