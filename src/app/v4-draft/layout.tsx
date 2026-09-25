import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Miki Stec — Websites that sell, with real support",
  description:
    "I research your business, write it, build it, and launch it. You just say yes. Or I teach you to build it yourself.",
  robots: { index: false, follow: false },
};

export default function V4DraftLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
