"use client";

import React from "react";
import Image from "next/image";
import { CalendarDays, Clock, MapPin, ArrowUpRight } from "lucide-react";

const TECHNOVIT_URL = "https://technovit.vit.ac.in";

const events = [
  {
    number: "01",
    title: "Reverse Engineering Roulette",
    poster: "/technovit/rer.jpeg",
    date: "31 AUG 2026",
    time: "10:00 AM – 4:00 PM",
    venue: "Kamaraj Auditorium",
    description:
      "Spin the wheel, crack the binary. Tear apart unknown builds and reason your way back to the source before the clock runs out.",
    coordinators: [
      { name: "Shaileshh", phone: "8220325118" },
      { name: "Hayagreev", phone: "9361235273" },
    ],
  },
  {
    number: "02",
    title: "Capture The Flag",
    poster: "/technovit/capture-flag.jpeg",
    date: "1 SEP 2026",
    time: "11:00 AM – 4:00 PM",
    venue: "Kamaraj Auditorium",
    description:
      "A jeopardy-style hunt through web, crypto and forensics challenges. Find the flags, climb the board, own the leaderboard.",
    coordinators: [
      { name: "Ahan", phone: "8220325118" },
      { name: "Vishwa", phone: "8939132364" },
    ],
  },
  {
    number: "03",
    title: "Agent Colosseum",
    poster: "/technovit/agent-colosseum.jpeg",
    date: "2 SEP 2026",
    time: "10:00 AM – 5:00 PM",
    venue: "AB3 - 501",
    description:
      "Build an AI agent and send it into the arena. Your prompts, your tools, your strategy — last agent standing takes the crown.",
    coordinators: [
      { name: "Bala", phone: "8840 06590" },
      { name: "Derrick", phone: "8610882886" },
    ],
  },
];

export function TechnoVITEvents() {
  return (
    <section
      id="technovit"
      className="relative py-24 px-margin bg-surface-container-lowest border-b-border-thick border-primary-container scroll-mt-24"
    >
      <div className="max-w-container-max mx-auto relative z-10">

        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-block border-2 border-primary-container px-4 py-1 mb-4 bg-surface-container">
            <span className="font-label-mono text-primary-container uppercase tracking-widest text-xs font-bold">
              AWS STUDENT BUILDER GROUP PRESENTS
            </span>
          </div>
          <h2 className="font-display-xl text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
            TECHNO<span className="text-primary-container">VIT&apos;26</span>
          </h2>
          <p className="font-label-mono text-on-surface-variant uppercase tracking-widest text-xs sm:text-sm mt-4">
            31 AUG – 2 SEP 2026 · VIT CHENNAI
          </p>
        </div>

        {/* Event Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.number}
              className="track-card bg-surface-container relative group overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden border-b-2 border-primary-container">
                <Image
                  src={event.poster}
                  alt={`${event.title} poster`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-primary-container text-black font-label-mono px-3 py-1 text-sm font-bold border-2 border-black">
                  {event.number}
                </span>
              </div>

              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-headline-lg text-2xl uppercase leading-tight mb-4 text-white group-hover:text-primary-container transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-on-surface-variant font-body-lg text-base leading-relaxed mb-6">
                    {event.description}
                  </p>

                  <ul className="space-y-2 mb-6 font-label-mono text-sm text-on-surface-variant uppercase">
                    <li className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-primary-container shrink-0" />
                      <span>{event.date}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-container shrink-0" />
                      <span>{event.time}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-container shrink-0" />
                      <span>{event.venue}</span>
                    </li>
                  </ul>

                  <div className="mb-6">
                    <span className="font-label-mono text-primary-container text-xs uppercase block mb-1">
                      Student Coordinators
                    </span>
                    {event.coordinators.map((c) => (
                      <p key={c.name} className="text-on-surface-variant text-sm">
                        {c.name} —{" "}
                        <a
                          href={`tel:${c.phone.replace(/\s/g, "")}`}
                          className="hover:text-primary-container transition-colors"
                        >
                          {c.phone}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-variant">
                  <a
                    href={TECHNOVIT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-label-mono text-xs text-primary-container uppercase tracking-wider font-bold flex items-center gap-1 group-hover:underline"
                  >
                    <span>REGISTER ON TECHNOVIT</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 industrial-border bg-surface-container p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-label-mono text-primary-container text-xs uppercase block mb-1">
              REGISTRATIONS ARE OPEN
            </span>
            <h3 className="font-headline-lg text-3xl uppercase text-white">
              THREE EVENTS · THREE DAYS
            </h3>
            <p className="text-on-surface-variant text-sm mt-1">
              Register for any or all of them at technovit.vit.ac.in
            </p>
          </div>
          <a
            href={TECHNOVIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="offset-button text-xl px-8 py-3 whitespace-nowrap"
          >
            REGISTER NOW
          </a>
        </div>

      </div>
    </section>
  );
}
