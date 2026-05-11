import type { Metadata } from "next";
import { Geist, Crimson_Pro } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Johann Cigler",
  description:
    "Schriften, Preprints und Skripten von Johann Cigler, emer. O. Univ.-Prof. der Fakultät für Mathematik, Universität Wien.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${crimsonPro.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg)] text-[var(--fg)]">
        {children}
      </body>
    </html>
  );
}
