import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Cormorant_Garamond, Karla } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Homepage redesign (see DESIGN-SYSTEM.md) — scoped to the home page for now.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paroki Yohanes Gabriel Perboyre",
  description:
    "Website resmi Paroki Yohanes Gabriel Perboyre — jadwal misa, artikel, pengumuman, dan kalender liturgi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${fraunces.variable} ${cormorant.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-50">{children}</body>
    </html>
  );
}
