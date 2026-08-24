"use client";

import React from "react";
import Link from "next/link";
import Starfield from "@/components/ui/Starfield";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-28 lg:pt-24 pb-20 overflow-hidden bg-surface-container-lowest border-b-border-thick border-primary-container">
      {/* Background Effects */}
      <Starfield starCount={180} speed={0.2} />
      <div className="absolute inset-0 pixel-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-container/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-margin flex flex-col gap-10 items-center relative z-10 text-center max-w-container-max">
        
        {/* Top Tag Header */}
        <div className="inline-block border-2 border-primary-container px-4 py-1.5 bg-black/60 backdrop-blur-sm">
          <span className="font-label-mono text-primary-container uppercase tracking-widest text-xs sm:text-sm font-bold">
            AWS STUDENT BUILDER GROUP · VIT CHENNAI
          </span>
        </div>

        {/* Main Headlines with Industrial Typography */}
        <div className="space-y-6 max-w-4xl">
          <h1 className="font-display-xl text-5xl sm:text-7xl md:text-8xl lg:text-[90px] uppercase leading-none tracking-tighter text-white">
            AWS STUDENT BUILDER GROUP <br />
            <span className="text-primary-container">VIT-C</span>
          </h1>
          <p className="font-body-lg text-lg sm:text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            While others learn theory, you&apos;ll build real cloud &amp; AI solutions.
          </p>
        </div>

        {/* Event Banner Card (Industrial Neo-Brutalist Theme) */}
        <div className="w-full max-w-3xl mt-4">
          <div className="industrial-border bg-surface-container p-8 relative overflow-hidden text-left group">
            <div className="scan-line" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div className="space-y-2">
                <h3 className="font-headline-lg text-2xl sm:text-4xl text-white uppercase">
                  TECHNOVIT&apos;26: THREE EVENTS
                </h3>
                <p className="font-label-mono text-primary-container text-sm sm:text-base font-bold uppercase">
                  AUG 31 – SEP 2 · REVERSE ENGINEERING ROULETTE · CAPTURE THE FLAG · AGENT COLOSSEUM
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Link href="#technovit" className="offset-button text-lg px-6 py-3 text-center">
                  VIEW EVENTS
                </Link>
                <Link
                  href="/joinus"
                  className="bg-black text-white font-headline-lg text-lg px-6 py-3 uppercase border-2 border-primary-container hover:bg-primary-container hover:text-black transition-colors text-center"
                >
                  JOIN CLUB
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
