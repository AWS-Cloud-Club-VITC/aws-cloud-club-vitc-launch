"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const showCountdown = pathname !== "/";

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Triple-tap detection for Easter egg
  const [tapCount, setTapCount] = useState(0);
  const [tapTimer, setTapTimer] = useState<NodeJS.Timeout | null>(null);

  const handleLogoTap = () => {
    setTapCount((prev) => prev + 1);

    // Clear existing timer
    if (tapTimer) clearTimeout(tapTimer);

    // Set new timer
    const timer = setTimeout(() => {
      setTapCount(0);
    }, 500); // Reset after 500ms
    setTapTimer(timer);

    // Check if we have 3 taps
    if (tapCount + 1 >= 3) {
      setTapCount(0);
      if (tapTimer) clearTimeout(tapTimer);
      // Trigger Easter egg
      window.dispatchEvent(new CustomEvent("aws-easter-egg"));
    }
  };

  useEffect(() => {
    if (!showCountdown) return;

    const targetDate = new Date("2026-01-06T09:00:00+05:30");

    const calculateTimeLeft = () => {
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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [showCountdown]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative" onClick={handleLogoTap}>
            <Image
              src="/aws_logo.png"
              alt="AWS Cloud Clubs VIT Chennai"
              width={80}
              height={80}
              className="rounded-lg object-contain shadow-lg"
              quality={100}
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs sm:text-lg font-bold tracking-tight text-white">
              AWS CLOUD CLUB{" "}
              <span className="block sm:inline text-primary">VIT-C</span>
            </span>
          </div>
        </Link>
        {/* <div className="flex flex-col leading-tight">
          <span className="text-xs sm:text-lg font-bold tracking-tight text-white text-align-r">
            <Link href="/events" className="text-white hover:text-primary transition-colors duration-200">
              Events
            </Link>
          </span>
        </div> */}
        {showCountdown && (
          <div className="rounded-full bg-white/5 px-4 py-2 text-xs sm:text-sm font-medium text-white border border-white/10 backdrop-blur-sm flex items-center gap-3">
            <span className="text-primary font-bold">Jan 06ᵗʰ</span>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
            <div className="flex gap-2 font-mono tabular-nums text-white/80">
              <span>{timeLeft.days}d</span>
              <span>{timeLeft.hours}h</span>
              <span>{timeLeft.minutes}m</span>
              <span className="hidden sm:inline">{timeLeft.seconds}s</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
