import type { Metadata } from "next";
import { Geist, Inter, Syne } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-dvh">
        <Navbar />
        <main className="pt-8">{children}</main>
      </body>
    </html>
  );
}
