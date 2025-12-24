"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <>
            <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, input {
          cursor: none;
        }
      `}</style>
            <motion.div
                className="fixed top-0 left-0 z-9999 pointer-events-none mix-blend-difference"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            >
                <div className="relative w-8 h-8">
                    {/* Center Dot */}
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary -translate-x-1/2 -translate-y-1/2 rounded-full" />

                    {/* Crosshair Lines */}
                    <div className="absolute top-0 left-1/2 w-px h-full bg-white/50 -translate-x-1/2" />
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/50 -translate-y-1/2" />

                    {/* Outer Ring Segments (Target Lock Look) */}
                    <motion.div
                        className="absolute inset-0 border border-primary rounded-full opacity-50"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white" />
                </div>
            </motion.div>
        </>
    );
}
