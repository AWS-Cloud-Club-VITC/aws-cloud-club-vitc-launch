import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ReactiveBackground } from "@/components/layout/ReactiveBackground";
import TargetCursor from "@/components/ui/TargetCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

// Juana font family
const juana = localFont({
  src: "./fonts/Juana-Regular.otf",
  variable: "--font-juana",
  display: "swap",
  fallback: ["serif"],
});

export const metadata: Metadata = {
  title: "AWS Cloud Club VIT-C",
  description: "Witness the new era in cloud technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${juana.variable} antialiased bg-background text-foreground font-sans`}
      >
        <TargetCursor />
        <ReactiveBackground />
        {children}
      </body>
    </html>
  );
}
