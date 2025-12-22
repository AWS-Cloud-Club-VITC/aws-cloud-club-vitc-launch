"use client";

import { useEffect, useState } from "react";

export function NavbarCountdown() {
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

    return (
        <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-white">
            {timeLeft.days > 0 && (
                <>
                    <span>{timeLeft.days}</span>
                    <span className="text-yellow-500/60">:</span>
                </>
            )}
            <span>{timeLeft.hours.toString().padStart(2, "0")}</span>
            <span className="text-yellow-500/60">:</span>
            <span>{timeLeft.minutes.toString().padStart(2, "0")}</span>
            <span className="text-yellow-500/60">:</span>
            <span>{timeLeft.seconds.toString().padStart(2, "0")}</span>
        </div>
    );
}
