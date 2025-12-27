import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creator Toolkit | Tools for Creators",
  description: "A marketplace where creators buy small, focused tools. Simple tools for non-tech creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

