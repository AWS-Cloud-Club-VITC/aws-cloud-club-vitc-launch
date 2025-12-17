import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialMedia } from "@/components/layout/SocialMedia";
import { Hero } from "@/components/home/Hero";
import { Countdown } from "@/components/home/Countdown";
import { EventFeatures } from "@/components/home/EventFeatures";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Countdown />
        <div className="w-full flex justify-center pb-8 pt-2 relative z-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <h1 className="text-gradient text-2xl sm:text-4xl font-bold font-heading tracking-tight leading-tight">
            JOIN US ON 6TH OF JANUARY AT V.O.C - AUDITORIUM
          </h1>
        </div>
        <Hero />
        <EventFeatures />
        <SocialMedia />
      </main>
      <Footer />
    </div>
  );
}
