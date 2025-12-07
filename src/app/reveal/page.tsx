import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EventReveal } from "@/components/reveal/EventReveal";

export default function RevealPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-20 pt-32">
                <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
                    <EventReveal />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
