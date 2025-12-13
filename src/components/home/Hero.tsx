"use client";

import { useState } from "react";
import { InvitationGenerator } from "./InvitationGenerator";
import { InvitationCard } from "./InvitationCard";
import { SocialShare } from "./SocialShare";

import Starfield from "@/components/ui/Starfield";

export function Hero() {
    const [invitationName, setInvitationName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async (name: string) => {
        setIsLoading(true);
        // Mock AI generation delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setInvitationName(name);
        setIsLoading(false);
    };

    return (
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center pb-48 overflow-hidden">
            {/* Background Effects */}
            <Starfield starCount={200} speed={0.2} />
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Side: Text */}
                <div className="text-center lg:text-left space-y-6">
                    <h1 className="text-5xl sm:text-7xl font-bold font-heading tracking-tight leading-tight">
                        AWS CLOUD CLUB <br />
                        <span className="text-gradient">VIT-C</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        Witness a new era in cloud technology. Join the elite community of builders, innovators, and dreamers. Generate your exclusive invitation now.
                    </p>
                    <p className="text-4xl sm:text-5xl font-heading font-bold tracking-wide text-left ml-1 lg:ml-4 text-gradient">
                        RECRUITMENTS WILL BE OPENED SOON
                    </p>
                </div>

                {/* Right Side: Interactive Module */}
                <div className="w-full">
                    {invitationName ? (
                        <div className="space-y-6">
                            <InvitationCard name={invitationName} />
                            <SocialShare />
                        </div>
                    ) : (
                        <InvitationGenerator onGenerate={handleGenerate} isLoading={isLoading} />
                    )}
                </div>
            </div>
        </section>
    );
}
