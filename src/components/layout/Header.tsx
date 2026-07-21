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
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-primary-container bg-black/85 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative cursor-pointer flex items-center" onClick={handleLogoTap}>
            <Image
              src="/aws_logo.png"
              alt="AWS Cloud Clubs VIT Chennai"
              width={100}
              height={100}
              className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-lg object-contain shadow-lg"
              quality={100}
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs sm:text-base md:text-lg font-bold tracking-wide text-white font-headline-lg uppercase">
              AWS STUDENT BUILDER GROUP{" "}
              <span className="block sm:inline text-primary-container">VIT-C</span>
            </span>
          </div>
        </Link>
        
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/events"
            className="flex items-center gap-1.5 bg-primary-container text-black font-headline-lg px-3.5 py-1.5 text-xs sm:text-sm font-bold uppercase hover:bg-white transition-colors border border-black shadow-[2px_2px_0px_#fff]"
          >
            <span className="material-symbols-outlined text-sm">rocket_launch</span>
            <span>FRONTIER AI</span>
          </Link>
          <Link
            href="/joinus"
            className="text-on-surface-variant font-label-mono text-xs sm:text-sm hover:text-primary-container transition-colors uppercase hidden sm:inline-block"
          >
            Join Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
