import type { Metadata } from "next";
import { Exo_2, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { ReactiveBackground } from "@/components/layout/ReactiveBackground";
import TargetCursor from "@/components/ui/TargetCursor";

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-chakra-petch",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo2",
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
        className={`${chakraPetch.variable} ${exo2.variable} antialiased bg-background text-foreground font-sans`}
      >
        <TargetCursor />
        <ReactiveBackground />
        {children}
      </body>
    </html>
  );
}
