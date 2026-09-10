import type { Metadata } from "next";
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

export default function Draft2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${rrDisplay.variable} ${rrSans.variable}`}>{children}</div>
  );
}
