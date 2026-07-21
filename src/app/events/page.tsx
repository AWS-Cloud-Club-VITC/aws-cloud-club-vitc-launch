"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function EventsPage() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-background text-on-background font-body-lg selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col overflow-x-hidden">
      <Header />

      <main className="relative pt-20 flex-1">
        {/* Frontier Header Banner */}
        <div className="bg-background border-b-border-thick border-primary-container sticky top-20 z-40">
          <div className="flex justify-between items-center w-full px-margin py-unit max-w-container-max mx-auto h-16">
            <div className="font-headline-lg text-2xl uppercase tracking-tighter text-on-surface">
              FRONTIER
            </div>
            <nav className="hidden md:flex gap-8">
              <a
                className="text-on-surface-variant font-label-mono hover:text-primary-container transition-colors uppercase text-sm"
                href="#tracks"
                onClick={(e) => handleSmoothScroll(e, "tracks")}
              >
                Tracks
              </a>
              <a
                className="text-on-surface-variant font-label-mono hover:text-primary-container transition-colors uppercase text-sm"
                href="#logistics"
                onClick={(e) => handleSmoothScroll(e, "logistics")}
              >
                Logistics
              </a>
              <a
                className="text-on-surface-variant font-label-mono hover:text-primary-container transition-colors uppercase text-sm"
                href="#register"
                onClick={(e) => handleSmoothScroll(e, "register")}
              >
                Register
              </a>
            </nav>
            <a
              className="bg-primary-container text-on-primary-container font-label-mono px-5 py-1.5 font-bold hover:bg-white hover:text-black transition-colors uppercase border-2 border-black text-sm"
              href="#register"
              onClick={(e) => handleSmoothScroll(e, "register")}
            >
              REGISTER
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-margin py-20 overflow-hidden border-b-border-thick border-primary-container bg-surface-container-lowest">
          <div className="relative z-10 w-full max-w-container-max text-center">
            <div className="inline-block border-2 border-primary-container px-4 py-1 mb-8">
              <span className="font-label-mono text-primary-container uppercase tracking-widest text-xs sm:text-sm">
                AWS STUDENT BUILDER GROUPS · VIT CHENNAI PRESENTS
              </span>
            </div>
            <h1 className="font-display-xl text-[64px] sm:text-[90px] md:text-display-xl uppercase leading-none tracking-tighter mb-8 drop-shadow-[4px_4px_0px_#ffb800] text-white">
              FRONTIER
            </h1>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-4">
                <div className="bg-primary-container text-black font-headline-lg text-xl sm:text-2xl md:text-3xl px-6 py-2 uppercase font-bold border-r-4 border-b-4 border-white">
                  BUILD THE NEXT AI
                </div>
                <p className="text-on-surface-variant font-title-md max-w-sm text-left md:border-l-2 border-primary-container pl-4 mt-4 md:mt-0 text-base sm:text-lg">
                  A two-day AI research &amp; agentic product-development challenge.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="border-3 border-primary-container bg-surface-container p-8 text-left relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
                  <span className="font-label-mono text-primary-container block mb-2 uppercase text-sm">When</span>
                  <div className="font-headline-lg text-3xl sm:text-4xl text-white uppercase">JULY 30 &amp; 31</div>
                </div>
                <div className="border-3 border-primary-container bg-surface-container p-8 text-left relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
                  <span className="font-label-mono text-primary-container block mb-2 uppercase text-sm">Prize Pool</span>
                  <div className="font-headline-lg text-3xl sm:text-4xl text-white uppercase">₹15,000</div>
                </div>
              </div>
              <div className="pt-12">
                <a
                  className="offset-button text-xl sm:text-2xl px-8 sm:px-12 py-4"
                  href="#register"
                  onClick={(e) => handleSmoothScroll(e, "register")}
                >
                  REGISTER NOW
                </a>
              </div>
            </div>
          </div>
          {/* Atmospheric Pixel Pattern Overlay */}
          <div className="absolute inset-0 pointer-events-none pixel-pattern"></div>
        </section>

        {/* Tracks Section */}
        <section className="py-24 px-margin bg-background" id="tracks">
          <div className="max-w-container-max mx-auto">
            <div className="flex justify-between items-end mb-16">
              <h2 className="font-display-xl text-4xl sm:text-5xl md:text-7xl uppercase tracking-tighter text-white">
                5 FRONTIER<br />
                <span className="text-primary-container">TRACKS</span>
              </h2>
              <div className="hidden md:block h-1 flex-grow mx-12 bg-surface-container-high relative">
                <div className="absolute left-0 top-0 h-full w-1/3 bg-primary-container"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* Track 1 */}
              <div className="track-card bg-surface-container p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                  <span className="material-symbols-outlined text-6xl text-primary-container">psychology</span>
                </div>
                <div className="bg-primary-container text-black w-8 h-8 flex items-center justify-center font-bold mb-6 border-b-2 border-r-2 border-white">
                  1
                </div>
                <h3 className="font-headline-lg text-xl uppercase leading-tight mb-4 text-white">LLM Fine-Tuning</h3>
                <p className="text-on-surface-variant text-body-sm">
                  Push the boundaries of pre-trained models with domain-specific data and optimizations.
                </p>
              </div>
              {/* Track 2 */}
              <div className="track-card bg-surface-container p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                  <span className="material-symbols-outlined text-6xl text-primary-container">robot_2</span>
                </div>
                <div className="bg-primary-container text-black w-8 h-8 flex items-center justify-center font-bold mb-6 border-b-2 border-r-2 border-white">
                  2
                </div>
                <h3 className="font-headline-lg text-xl uppercase leading-tight mb-4 text-white">Agentic Systems</h3>
                <p className="text-on-surface-variant text-body-sm">
                  Design autonomous entities capable of reasoning, tool-use, and multi-step task execution.
                </p>
              </div>
              {/* Track 3 */}
              <div className="track-card bg-surface-container p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                  <span className="material-symbols-outlined text-6xl text-primary-container">settings_account_box</span>
                </div>
                <div className="bg-primary-container text-black w-8 h-8 flex items-center justify-center font-bold mb-6 border-b-2 border-r-2 border-white">
                  3
                </div>
                <h3 className="font-headline-lg text-xl uppercase leading-tight mb-4 text-white">Automation</h3>
                <p className="text-on-surface-variant text-body-sm">
                  Integrate AI into existing workflows to achieve unprecedented operational efficiency.
                </p>
              </div>
              {/* Track 4 */}
              <div className="track-card bg-surface-container p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                  <span className="material-symbols-outlined text-6xl text-primary-container">terminal</span>
                </div>
                <div className="bg-primary-container text-black w-8 h-8 flex items-center justify-center font-bold mb-6 border-b-2 border-r-2 border-white">
                  4
                </div>
                <h3 className="font-headline-lg text-xl uppercase leading-tight mb-4 text-white">Dev Productivity</h3>
                <p className="text-on-surface-variant text-body-sm">
                  Build tools that help developers ship faster, safer, and with higher quality code.
                </p>
              </div>
              {/* Track 5 */}
              <div className="track-card bg-surface-container p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                  <span className="material-symbols-outlined text-6xl text-primary-container">policy</span>
                </div>
                <div className="bg-primary-container text-black w-8 h-8 flex items-center justify-center font-bold mb-6 border-b-2 border-r-2 border-white">
                  5
                </div>
                <h3 className="font-headline-lg text-xl uppercase leading-tight mb-4 text-white">AI Safety &amp; Obs.</h3>
                <p className="text-on-surface-variant text-body-sm">
                  Ensure AI reliability through monitoring, guardrails, and ethical alignment frameworks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Logistics Section */}
        <section className="py-24 px-margin bg-surface-container-lowest border-y-border-thick border-primary-container" id="logistics">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* When */}
            <div className="industrial-border bg-background p-8">
              <span className="font-label-mono text-primary-container uppercase tracking-widest block mb-4">
                TIMELINE / WHEN
              </span>
              <h3 className="font-display-xl text-4xl sm:text-5xl text-white mb-8 border-b-border-thin border-surface-variant pb-4">
                JULY 30 &amp; 31
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-container text-black font-label-mono px-3 py-1 text-xs shrink-0 mt-1 font-bold">
                    DAY 1
                  </div>
                  <div>
                    <div className="font-bold text-lg text-white">JUL 30 · 8AM—5PM</div>
                    <div className="text-on-surface-variant">Research, ideation &amp; technical build phase.</div>
                  </div>
                </div>
                <div className="w-full border-t border-dashed border-surface-variant"></div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary-container text-black font-label-mono px-3 py-1 text-xs shrink-0 mt-1 font-bold">
                    DAY 2
                  </div>
                  <div>
                    <div className="font-bold text-lg text-white">JUL 31 · MORNING</div>
                    <div className="text-on-surface-variant">Final demos, expert evaluation &amp; awards ceremony.</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Where */}
            <div className="industrial-border bg-background p-8 relative overflow-hidden">
              <span className="font-label-mono text-primary-container uppercase tracking-widest block mb-4">
                VENUE / WHERE
              </span>
              <h3 className="font-display-xl text-4xl sm:text-5xl text-white mb-8 border-b-border-thin border-surface-variant pb-4">
                NETAJI AUDITORIUM
              </h3>
              <div className="space-y-4">
                <div className="text-2xl font-headline-lg uppercase text-white">AB-1 · VIT CHENNAI</div>
                <div className="aspect-video w-full relative border border-surface-variant grayscale contrast-125 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="Map preview of VIT Chennai campus Netaji Auditorium"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMpQ7ySzLdFKQbqtx58I9l_AFqMaOMDTnTu9GQ2Aromxvv2WxfMkqSYXIF4_QX7lXO3Y0AYIw9fMeAQ1bWjMD_GYe0LFfGDTI7j2wBUhkW9dLKfX4L5hs9l97XsBVpLfYKKn36UOFVCLnnvewH9Jn2g6woPU3t5yu-gEMs5UJ2_7CpjEOGeQvoOMFOgaBX9BoV-YF-5utThTqLU0TliWn6qMur2o-A0Qe1ekn99HeDnzi_5D6XKHO0LjuCF6anJjYGtV2kQ6LK-CAp"
                  />
                  <div className="absolute inset-0 bg-primary-container/10"></div>
                  <div className="absolute bottom-4 left-4 bg-black p-2 border border-primary-container">
                    <span className="font-label-mono text-xs text-primary-container">LOC: 12.8406° N, 80.1534° E</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section className="py-24 px-margin bg-background relative" id="register">
          <div className="max-w-container-max mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-2/3 space-y-8">
                <h2 className="font-display-xl text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter leading-tight text-white">
                  JOIN THE<br />
                  <span className="text-primary-container">FRONTIER.</span>
                </h2>
                <div className="inline-flex items-center gap-4 bg-white text-black p-4 border-l-8 border-primary-container">
                  <span className="material-symbols-outlined text-4xl">sell</span>
                  <span className="font-display-xl text-2xl sm:text-3xl md:text-4xl">FREE TO PARTICIPATE</span>
                </div>
                <p className="text-on-surface-variant text-lg sm:text-xl max-w-xl">
                  Ready to challenge the status quo of AI? Secure your spot in the most intensive research sprint of the year. Limited capacity for the final build phase.
                </p>
                <div className="pt-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <a
                    className="offset-button text-2xl"
                    href="https://eventhubcc.vit.ac.in/EventHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    REGISTER NOW
                  </a>
                  <div className="text-on-surface-variant font-label-mono">
                    ➔ On VIT Event Hub<br />
                    <span className="text-primary-container opacity-80">eventhubcc.vit.ac.in/EventHub</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 w-full">
                <div className="industrial-border bg-white p-8 aspect-square flex flex-col items-center justify-center relative group">
                  <div className="scan-line"></div>
                  <div className="w-full h-full relative">
                    <img
                      className="w-full h-full object-contain"
                      alt="FRONTIER Registration QR Code"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiQKN02iehXv8thtj6ryF8XeIFbI178e_bQvvjMAIjtuxtP3APUUsNBahh43UhLz24H8ONuMpjUUxvC7G55BCGs-dOxxpVQf_iq3xYTkTD1dN5KylX_CW8BKX-IJ1xhrkEN21ZBVubbXqA9MGJ3fL55jkhySMJaQCahk8CZCJqqpbbNwsY9sfDpDRMO40BFfyIkeaPP29IffLLBSFFMEfzq1dzRrKHnmRsvag6Pn0WrtKTRNkk2bvBCbGoam0GuuRj5tNTTSHZr9qa"
                    />
                  </div>
                  <div className="absolute -bottom-4 bg-black text-white px-6 py-2 border-2 border-primary-container font-label-mono text-sm tracking-widest uppercase">
                    SCAN TO REGISTER
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FRONTIER Section Footer Info */}
        <section className="bg-primary-container border-t-border-thick border-on-primary-container py-12 px-margin text-on-primary-container">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="space-y-4">
                <div className="font-headline-lg text-3xl uppercase text-black">FRONTIER</div>
                <p className="text-body-sm opacity-90 text-black">
                  Empowering the next generation of AI builders and researchers through rigorous competitive development.
                </p>
                <div className="flex gap-4">
                  <a className="hover:text-white transition-colors text-black" href="https://www.instagram.com/awsvitc/" target="_blank" rel="noreferrer">
                    <span className="material-symbols-outlined">public</span>
                  </a>
                  <a className="hover:text-white transition-colors text-black" href="mailto:awsvitc@gmail.com">
                    <span className="material-symbols-outlined">alternate_email</span>
                  </a>
                  <a className="hover:text-white transition-colors text-black" href="https://www.instagram.com/awsvitc/" target="_blank" rel="noreferrer">
                    <span className="material-symbols-outlined">group</span>
                  </a>
                </div>
              </div>
              <div className="space-y-2 text-black">
                <span className="font-label-mono text-xs uppercase opacity-75 block mb-4">Faculty Coordinators</span>
                <div className="font-bold text-lg">DR. K. KUMARAN</div>
                <div className="font-bold text-lg">DR. G. SARANYA</div>
              </div>
              <div className="space-y-2 text-black">
                <span className="font-label-mono text-xs uppercase opacity-75 block mb-4">Student Coordinator</span>
                <div className="font-bold text-lg">TARUN VAIBHAV V</div>
                <div className="font-label-mono text-sm">+91 63690 46779</div>
              </div>
            </div>
            <div className="border-t border-black/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-black">
              <div className="font-label-mono text-xs opacity-90">© 2024 AWS STUDENT BUILDER GROUPS - VIT CHENNAI</div>
              <div className="flex gap-6">
                <a className="font-label-mono text-xs hover:underline uppercase" href="#">Office of Student Welfare</a>
                <a className="font-label-mono text-xs hover:underline uppercase" href="#">VIT Chennai</a>
              </div>
              <div className="font-label-mono text-xs font-bold uppercase">@awsvitc</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
