import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AaronMTS",
  description: "My experiences and skills amassed over my web development journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
