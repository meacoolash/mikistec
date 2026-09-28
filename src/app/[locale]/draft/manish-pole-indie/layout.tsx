import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";

const display = Instrument_Serif({
  variable: "--mpi-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const sans = Space_Grotesk({
  variable: "--mpi-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function IndieLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${sans.variable}`}>{children}</div>;
}
