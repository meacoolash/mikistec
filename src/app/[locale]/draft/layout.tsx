import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Jost } from "next/font/google";

const rrDisplay = Cormorant_Garamond({
  variable: "--rr-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const rrSans = Jost({
  variable: "--rr-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Client drafts are English only; /sk/draft/... and /cz/draft/... don't exist.
export default async function Draft2Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  if ((await params).locale !== "en") notFound();
  return (
    <div className={`${rrDisplay.variable} ${rrSans.variable}`}>{children}</div>
  );
}
