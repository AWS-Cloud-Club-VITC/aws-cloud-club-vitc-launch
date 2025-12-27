"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { InvitationGenerator } from "./InvitationGenerator";
import { InvitationCard } from "./InvitationCard";
import { SocialShare } from "./SocialShare";
import { Button } from "@/components/ui/button";

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
          
          <div className="text-center lg:text-left space-y-6 lg:space-y-6">
            {/* Mobile: line-height rhythm, Desktop: unchanged */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight leading-tight [margin-bottom:0.6lh] lg:mb-0">
               AWS CLOUD CLUB<br />
              <span className="text-gradient">VIT-C's LAUNCH</span>
            </h1>
          
<p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed [margin-bottom:1.5lh] lg:mb-0">
  While others learn theory, you'll build real cloud solutions
</p>
<p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed [margin-bottom:2.5lh] lg:mb-0">
  <span className="text-gradient font-semibold">Join VIT-C's first AWS Cloud Club</span> – where students become cloud architects
</p>
            <br></br>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center sm:text-left font-heading font-bold tracking-wide text-gradient [margin-top:2.5lh] lg:mt-0">
              RECRUITMENTS WILL BE OPENED SOON !!
            </p>
            {invitationName && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center lg:justify-start [margin-top:2lh] lg:mt-6"
              >
              </motion.div>
            )}
          </div>

          {/* Right Side: Interactive Module */}
          <div className="w-full">
            {invitationName ? (
              <div className="space-y-6">
                <InvitationCard name={invitationName} />
                <SocialShare />
              </div>
            ) : (
              <InvitationGenerator
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </section>
    );
}
