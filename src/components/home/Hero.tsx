"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { InvitationGenerator } from "./InvitationGenerator";
import { InvitationCard } from "./InvitationCard";
import { SocialShare } from "./SocialShare";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import Starfield from "@/components/ui/Starfield";

export function Hero() {
  const [invitationName, setInvitationName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const target = new Date("2026-01-06T10:30:00+05:30");
      if (new Date() >= target) {
        setIsLive(true);
      }
    };
    checkTime();
  }, []);

  const handleGenerate = async (name: string) => {
    setIsLoading(true);
    // Mock AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setInvitationName(name);
    setIsLoading(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 lg:pt-20 pb-48 overflow-hidden">
      {/* Background Effects */}
      <Starfield starCount={200} speed={0.2} />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 flex flex-col gap-12 items-center relative z-10">

        <div className="text-center space-y-6">
          {/* Mobile: line-height rhythm, Desktop: unchanged */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight leading-tight [margin-bottom:0.6lh] lg:mb-0">
            AWS CLOUD CLUB<br />
            <span className="text-gradient">VIT-C</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed [margin-bottom:1.5lh] lg:mb-0">
            While others learn theory, you'll build real cloud solutions
          </p>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed [margin-bottom:2.5lh] lg:mb-0">
            <span className="text-gradient font-semibold">Join VIT-C's first AWS Cloud Club</span> – where students become cloud architects
          </p>


        </div>

        {/* Below: Interactive Module */}
        <div className="w-full flex flex-col justify-center items-center space-y-8">
          {invitationName ? (
            <InvitationCard name={invitationName} />
          ) : isLive ? (
            <>
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-heading font-bold tracking-wide text-gradient leading-relaxed">
                Join us - Applications are live!!
              </p>
              <div className="flex justify-center">
                <Link href="/joinus/apply">
                  <Button className="bg-gradient-to-r from-[#FF9900] to-[#FFD700] text-black font-bold text-lg px-12 py-6 rounded-full shadow-[0_0_20px_rgba(255,153,0,0.4)] hover:shadow-[0_0_30px_rgba(255,153,0,0.6)] hover:scale-105 transition-all duration-300">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </>
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
