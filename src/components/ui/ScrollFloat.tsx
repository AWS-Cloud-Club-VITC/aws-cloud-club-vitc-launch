"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
    children: React.ReactNode;
    scrollContainerRef?: React.RefObject<HTMLElement>;
    containerClassName?: string;
    textClassName?: string;
    animationDuration?: number;
    ease?: string;
    scrollStart?: string;
    scrollEnd?: string;
    stagger?: number;
}

export default function ScrollFloat({
    children,
    scrollContainerRef,
    containerClassName = "",
    textClassName = "",
    animationDuration = 1,
    ease = "back.inOut(2)",
    scrollStart = "center bottom+=50%",
    scrollEnd = "bottom bottom-=40%",
    stagger = 0.03,
}: ScrollFloatProps) {
    const containerRef = useRef<HTMLHeadingElement>(null);

    const splitText = useMemo(() => {
        const text = typeof children === "string" ? children : "";
        return text.split(" ").map((word, i, arr) => (
            <React.Fragment key={i}>
                <span className="inline-block whitespace-nowrap">
                    {word.split("").map((char, j) => (
                        <span className="inline-block scroll-float-char" key={j}>
                            {char}
                        </span>
                    ))}
                </span>
                {i < arr.length - 1 && (
                     <span className="inline-block scroll-float-char">
                        &nbsp;
                    </span>
                )}
            </React.Fragment>
        ));
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scroller =
            scrollContainerRef && scrollContainerRef.current
                ? scrollContainerRef.current
                : window;

        const charElements = el.querySelectorAll(".scroll-float-char");

        gsap.fromTo(
            charElements,
            {
                willChange: "transform, opacity",
                transformOrigin: "50% 50%",
                yPercent: 100,
                scaleY: 2.3,
                scaleX: 0.7,
                opacity: 0,
            },
            {
                duration: animationDuration,
                ease: ease,
                yPercent: 0,
                scaleY: 1,
                scaleX: 1,
                opacity: 1,
                stagger: stagger,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: scrollStart,
                    end: scrollEnd,
                    scrub: true,
                },
            }
        );
    }, [
        scrollContainerRef,
        animationDuration,
        ease,
        scrollStart,
        scrollEnd,
        stagger,
    ]);

    return (
        <h2
            ref={containerRef}
            className={`overflow-hidden ${containerClassName}`}
        >
            <span className={`inline-block text-content ${textClassName}`}>
                {splitText}
            </span>
        </h2>
    );
}
