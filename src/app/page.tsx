import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Countdown } from "@/components/home/Countdown";
import { EventFeatures } from "@/components/home/EventFeatures";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Countdown />
        <Hero />
        <EventFeatures />
      </main>
      <Footer />
    </div>
  );
}
