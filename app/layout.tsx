import type { Metadata } from "next";
import { Geist, Inter, Syne } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "AaronMTS",
  description:
    "My experiences and skills amassed over my web development journey.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${geist.variable} h-full antialiased overflow-y-auto scrollbar-none`}
    >
      <body className="min-h-dvh">
        <Navbar />
        <main className="max-w-7xl mx-auto pt-13 px-8 pb-13">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
