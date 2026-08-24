"use client";

import React from "react";
import Link from "next/link";
import { FolderKanban, CalendarDays, GraduationCap, ArrowUpRight } from "lucide-react";

const features = [
  {
    number: "01",
    title: "Projects",
    icon: FolderKanban,
    description: "Build production-ready cloud applications using cutting-edge AWS services and AI tools.",
  },
  {
    number: "02",
    title: "Events & Hackathons",
    icon: CalendarDays,
    description: "Compete in challenges like our technoVIT'26 lineup, learn from AWS heroes & network with experts.",
  },
  {
    number: "03",
    title: "Certification Roadmap",
    icon: GraduationCap,
    description: "Fast-track your AWS Cloud Practitioner and Solutions Architect certifications with guided roadmaps.",
  },
];

export function EventFeatures() {
  return (
    <section className="relative py-24 px-margin bg-background border-b-border-thick border-primary-container">
      <div className="max-w-container-max mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-block border-2 border-primary-container px-4 py-1 mb-4 bg-surface-container">
            <span className="font-label-mono text-primary-container uppercase tracking-widest text-xs font-bold">
              WHAT YOU&apos;LL MASTER IN AWS CLOUD CLUB
            </span>
          </div>
          <h2 className="font-display-xl text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
            THE THREE <span className="text-primary-container">PILLARS</span>
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="track-card bg-surface-container p-8 relative group overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Icon className="w-24 h-24 text-primary-container" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="bg-primary-container text-black font-label-mono px-3 py-1 text-sm font-bold border-2 border-black">
                      {feature.number}
                    </span>
                    <Icon className="w-8 h-8 text-primary-container" />
                  </div>

                  <h3 className="font-headline-lg text-2xl uppercase leading-tight mb-4 text-white group-hover:text-primary-container transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-on-surface-variant font-body-lg text-base leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-variant">
                  <Link
                    href="/events"
                    className="font-label-mono text-xs text-primary-container uppercase tracking-wider font-bold flex items-center gap-1 group-hover:underline"
                  >
                    <span>EXPLORE PROGRAM</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 industrial-border bg-surface-container-lowest p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-label-mono text-primary-container text-xs uppercase block mb-1">
              NEXT UPCOMING EVENTS
            </span>
            <h3 className="font-headline-lg text-3xl uppercase text-white">
              TECHNOVIT&apos;26 - THREE EVENTS, THREE DAYS
            </h3>
            <p className="text-on-surface-variant text-sm mt-1">
              Aug 31 – Sep 2 · Kamaraj Auditorium &amp; AB3-501 · VIT Chennai
            </p>
          </div>
          <Link href="#technovit" className="offset-button text-xl px-8 py-3 whitespace-nowrap">
            VIEW TECHNOVIT EVENTS
          </Link>
        </div>

      </div>
    </section>
  );
}
