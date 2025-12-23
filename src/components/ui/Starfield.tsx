"use client";

import React, { useEffect, useRef } from "react";

interface StarfieldProps {
    speed?: number;
    starCount?: number;
    starColor?: string;
    backgroundColor?: string;
}

export default function Starfield({
    speed = 0.05,
    starCount = 150,
    starColor = "rgba(255, 255, 255, 0.8)",
    backgroundColor = "transparent",
}: StarfieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number; size: number }[] = [];

        // Detect mobile and reduce stars for performance
        const isMobile = window.innerWidth < 768;
        const effectiveStarCount = isMobile ? Math.min(starCount, 50) : starCount;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            for (let i = 0; i < effectiveStarCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                
                // Mobile only: reduce center column density by 60%
                if (isMobile) {
                    const centerStart = canvas.width * 0.25; // Center 50% of screen
                    const centerEnd = canvas.width * 0.75;
                    const isInCenter = x >= centerStart && x <= centerEnd;
                    
                    // Skip 60% of center stars
                    if (isInCenter && Math.random() < 0.6) {
                        continue;
                    }
                }
                
                stars.push({
                    x,
                    y,
                    z: Math.random() * 2, // Depth factor
                    size: Math.random() * 1.5,
                });
            }
        };

        const updateStars = () => {
            ctx.fillStyle = backgroundColor;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach((star) => {
                // Move star
                star.y -= speed * (star.z + 0.5); // Parallax speed

                // Reset if off screen
                if (star.y < 0) {
                    star.y = canvas.height;
                    star.x = Math.random() * canvas.width;
                }

                // Draw star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size * (star.z + 0.5), 0, Math.PI * 2);

                // Gold tint for some stars
                const isGold = Math.random() > 0.8;
                ctx.fillStyle = isGold ? "rgba(255, 215, 0, 0.6)" : starColor;

                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(updateStars);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        updateStars();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [speed, starCount, starColor, backgroundColor]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
