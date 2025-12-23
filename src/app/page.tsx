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
      <main className="flex-1 lg:translate-y-0 md:-translate-y-[5vh]">
        <Countdown />
        <div className="w-full flex justify-center pb-8 pt-2 px-4 relative z-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <div className="text-center max-w-4xl [margin-bottom:2lh] lg:mb-8">
            <h1 className="text-gradient text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tight leading-tight [margin-bottom:0.5lh] lg:mb-1">
              Join us on 6th of January
            </h1>
            <p className="text-white/80 text-base sm:text-xl md:text-2xl lg:text-3xl font-heading tracking-wide">
              at V.O.C - AUDITORIUM
            </p>
          </div>
        </div>
        <Hero />
        <EventFeatures />
        <SocialMedia />
      </main>
      <Footer />
    </div>
  );
}
