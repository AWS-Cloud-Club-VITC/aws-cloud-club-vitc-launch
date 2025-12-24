"use client";

import { useEffect, useState } from "react";

export function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date("2026-01-06T09:00:00+05:30");

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center justify-center rounded-xl bg-metal-glossy p-4 backdrop-blur-md w-32 h-24 sm:w-32 sm:h-32 border border-white/10 shadow-[0_0_30px_-10px_rgba(255,215,0,0.1)] relative group overflow-hidden hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-50" />
            <div className="absolute inset-0 bg-linear-to-tr from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <span className="text-3xl sm:text-5xl font-bold text-white font-heading relative z-10 drop-shadow-[0_2px_10px_rgba(255,215,0,0.3)]">
                {value.toString().padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm text-yellow-500/60 uppercase tracking-widest mt-2 relative z-10 font-medium group-hover:text-yellow-400 transition-colors">
                {label}
            </span>
        </div>
    );

    return (
        <section className="py-8 md:py-10 relative z-20">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    
                </div>
                {/* Mobile: 2×2 grid, Desktop: 4 in a row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 justify-items-center gap-4 sm:gap-8 max-w-3xl mx-auto">
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <TimeUnit value={timeLeft.minutes} label="Minutes" />
                    <TimeUnit value={timeLeft.seconds} label="Seconds" />
                </div>
            </div>
        </section>
    );
}
