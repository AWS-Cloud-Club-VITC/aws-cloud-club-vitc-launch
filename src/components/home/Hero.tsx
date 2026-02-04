"use client";

import { useState } from "react";
import { InvitationCard } from "./InvitationCard";
import { Button } from "@/components/ui/button";
import Starfield from "@/components/ui/Starfield";

export function Hero() {
  const [invitationName, setInvitationName] = useState<string | null>(null);

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
          ) : (
            <>
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-heading font-bold  leading-relaxed ">
                Applications are Closed 
              </p>
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-heading font-bold tracking-wide text-gradient leading-relaxed">
                Results Soon !!
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}


