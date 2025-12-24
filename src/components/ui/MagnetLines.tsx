"use client";

import { useRef, useEffect } from "react";

interface MagnetLinesProps {
  rows?: number;
  cols?: number;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseRotation?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function MagnetLines({
  rows = 9,
  cols = 9,
  lineColor = "rgba(255, 215, 0, 0.9)", // Gold
  lineWidth = "2px",
  lineHeight = "20px",
  baseRotation = 0,
  style,
  className = "",
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLDivElement>(".magnet-line");
    const itemCenters: { x: number; y: number }[] = [];

    const calculateCenters = () => {
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        itemCenters[index] = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      });
    };

    calculateCenters();
    window.addEventListener("resize", calculateCenters);

    const handleMouseMove = (e: MouseEvent) => {
      items.forEach((item, index) => {
        const center = itemCenters[index];
        if (!center) return;

        const dx = e.clientX - center.x;
        const dy = e.clientY - center.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        item.style.transform = `rotate(${angle + baseRotation}deg)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", calculateCenters);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [rows, cols, baseRotation]);

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div
          key={i}
          className="magnet-line pointer-events-none"
          style={{
            width: lineWidth,
            height: lineHeight,
            backgroundColor: lineColor,

            boxShadow:
              "0 0 6px rgba(255,215,0,0.35), 0 0 12px rgba(255,215,0,0.15)",

            transition: "transform 0.1s ease-out",
          }}
        />
      ))}
    </div>
  );
}
