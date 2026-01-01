"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export function EasterEgg() {
  const router = useRouter();
  const [keys, setKeys] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [stage, setStage] = useState<
    | "hidden"
    | "centering"
    | "rotating"
    | "expanding"
    | "provisioning"
    | "overload"
    | "shattered"
  >("hidden");
  const [typedText, setTypedText] = useState<string[]>([]);
  const [region, setRegion] = useState("SEARCHING...");
  const [metrics, setMetrics] = useState({ cpu: 12, ram: 24, net: 400 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Theme configuration
  const theme =
    stage === "overload" || stage === "shattered"
      ? {
          primary: "#FF0000",
          background: "#1a0000",
          text: "#FF0000",
          border: "#FF0000",
        }
      : {
          primary: "#FFD700",
          background: "#050505",
          text: "#FFD700",
          border: "rgba(255, 215, 0, 0.4)",
        };

  const triggerEasterEgg = () => {
    // Easter Egg unlocks only after Dec 30th 2025, 6 PM IST
    const unlockDate = new Date("2025-01-06T11:00:00+05:30");
    if (new Date() < unlockDate) return;

    setIsActive(true);
    setStage("centering");
    
    // Haptic feedback (vibration) on mobile
    if (navigator.vibrate) {
      navigator.vibrate(50); // Quick pulse
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setKeys((prev) => {
        const newKeys = [...prev, key].slice(-3);
        if (newKeys.join("") === "aws") {
          triggerEasterEgg();
        }
        return newKeys;
      });
    };

    const handleCustomTrigger = () => triggerEasterEgg();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("aws-easter-egg", handleCustomTrigger);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("aws-easter-egg", handleCustomTrigger);
    };
  }, []);

  // Region Cycling
  useEffect(() => {
    if (stage === "provisioning") {
      const regions = [
        "us-east-1",
        "eu-west-1",
        "ap-northeast-1",
        "sa-east-1",
        "ap-south-1",
      ];
      let i = 0;
      const interval = setInterval(() => {
        setRegion(regions[i % regions.length]);
        i++;
        if (i > 8) {
          setRegion("ap-south-1 [LOCKED]");
          clearInterval(interval);
        }
      }, 80);
      return () => clearInterval(interval);
    }
  }, [stage]);

  // Metrics Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (stage === "overload") {
        setMetrics({ cpu: 999, ram: 999, net: 0 });
      } else if (stage === "provisioning") {
        setMetrics({
          cpu: Math.floor(Math.random() * 40) + 40,
          ram: Math.floor(Math.random() * 30) + 50,
          net: Math.floor(Math.random() * 500) + 200,
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, [stage]);

  // Stage Transitions
  useEffect(() => {
    if (stage === "centering") {
      setTimeout(() => setStage("rotating"), 200);
    } else if (stage === "rotating") {
      setTimeout(() => setStage("expanding"), 500);
    } else if (stage === "expanding") {
      setTimeout(() => setStage("provisioning"), 400);
    } else if (stage === "provisioning") {
      const lines = [
        "ESTABLISHING SECURE HANDSHAKE...",
        "IAM AUTH: ROLE_ADMIN_ROOT... [OK]",
        "TARGET: RECRUITMENT_PORTAL_V1",
        "ALLOCATING T4G.XLARGE INSTANCE...",
        "DEPLOYING STACK: SUCCESS.",
      ];
      let lineIndex = 0;
      let charIndex = 0;
      let timeoutId: NodeJS.Timeout;

      const typeNextChar = () => {
        // Defensive boundary check
        if (lineIndex >= lines.length) {
          timeoutId = setTimeout(() => setStage("overload"), 500);
          return;
        }

        const currentLine = lines[lineIndex];
        if (!currentLine) return; // Extra safety against undefined

        setTypedText((prev) => {
          const newLines = [...prev];
          // Ensure array is large enough
          while (newLines.length <= lineIndex) {
            newLines.push("");
          }
          newLines[lineIndex] = currentLine.substring(0, charIndex + 1);
          return newLines;
        });

        charIndex++;
        if (charIndex >= currentLine.length) {
          lineIndex++;
          charIndex = 0;
          timeoutId = setTimeout(typeNextChar, 100);
        } else {
          timeoutId = setTimeout(typeNextChar, 15);
        }
      };

      typeNextChar();

      // Cleanup prevents ghost loops
      return () => clearTimeout(timeoutId);
    } else if (stage === "overload") {
      setTypedText([
        "WARNING: SYSTEM INSTABILITY DETECTED",
        "CPU TEMPERATURE DRIVING CRITICAL",
        "CONTAINMENT FIELD FAILING...",
        "ERROR: 0xDEADBEEF",
        "SYSTEM OVERLOAD IMMINENT!!!",
      ]);
      
      // Vibration pattern matching the shake
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]); // Shake pattern
      }
      
      setTimeout(() => setStage("shattered"), 1500);
    } else if (stage === "shattered") {
      setTimeout(() => {
        window.location.href = "/recruitment";
      }, 3500); // Wait for slow shatter
    }
  }, [stage]);

  if (!isActive) return null;

  const cornerSize = 20;
  const borderWidth = 4;

  const handleSkip = () => {
    window.location.href = "/recruitment";
  };

  return (
    <AnimatePresence>
      <div className={`fixed inset-0 z-99999 bg-black/90 ${isMobile ? 'backdrop-blur-sm' : 'backdrop-blur-md'} flex items-center justify-center cursor-none`}>
        {/* WINDOWED STAGES */}
        {stage !== "hidden" && stage !== "shattered" && (
          <motion.div
            initial={{
              width: 60,
              height: 60,
              backgroundColor: "transparent",
              borderColor: "transparent",
              rotate: 0,
            }}
            animate={
              stage === "centering"
                ? { scale: 1, borderColor: "transparent", rotate: 0 }
                : stage === "rotating"
                ? {
                    scale: 1,
                    borderColor: "transparent",
                    rotate: 360,
                    transition: { duration: 0.5, ease: "backInOut" },
                  }
                : stage === "overload"
                ? {
                    width: "min(800px, 90vw)",
                    height: "min(500px, 60vh)",
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                    rotate: 360,
                    x: [0, -10, 10, -10, 10, -5, 5, 0],
                    y: [0, -5, 5, -10, 10, -5, 5, 0],
                    transition: { duration: 0.2, repeat: 3 },
                  }
                : {
                    width: "min(800px, 90vw)",
                    height: "min(500px, 60vh)",
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                    rotate: 360,
                    transition: { duration: 0.4, ease: "circOut" },
                  }
            }
            className="relative flex flex-col overflow-hidden border shadow-[0_0_50px_rgba(255,215,0,0.15)] rounded-lg font-mono transition-colors duration-300"
            style={{
              boxShadow:
                stage === "overload"
                  ? "0 0 100px rgba(255, 0, 0, 0.4)"
                  : undefined,
              borderColor: theme.border,
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "antialiased",
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
              backgroundImage: `repeating-linear-gradient(
                                0deg,
                                transparent,
                                transparent 2px,
                                rgba(${
                                  stage === "overload"
                                    ? "255, 0, 0"
                                    : "255, 215, 0"
                                }, 0.03) 2px,
                                rgba(${
                                  stage === "overload"
                                    ? "255, 0, 0"
                                    : "255, 215, 0"
                                }, 0.03) 4px
                            )`,
            }}
          >
            {/* Header */}
            {stage !== "centering" && stage !== "rotating" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`h-8 flex items-center justify-between px-4 border-b z-30 shrink-0 transition-colors duration-300 ${
                  stage === "overload"
                    ? "bg-red-900/20 border-red-500/50"
                    : "bg-[#FFD700]/5 border-[#FFD700]/20"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm" />
                  </div>
                  <div
                    className={`text-[10px] ${
                      stage === "overload"
                        ? "text-red-500"
                        : "text-[#FFD700]/70"
                    }`}
                  >
                    AWS_CLI_V2.0 //{" "}
                    <span className="animate-pulse">
                      {stage === "overload" ? "CRITICAL ERROR" : region}
                    </span>
                  </div>
                </div>
                <div
                  className={`text-[10px] tracking-widest ${
                    stage === "overload"
                      ? "text-red-500 animate-pulse font-bold"
                      : "text-[#FFD700]/50"
                  }`}
                >
                  {stage === "overload"
                    ? "BREACH DETECTED"
                    : "SECURE_CONNECTION"}
                </div>
              </motion.div>
            )}

            <div className="flex flex-1 overflow-hidden relative">
              {/* Main Content */}
              <div className="flex-1 flex flex-col items-start justify-center p-8 z-20 relative">
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  animate={
                    stage !== "centering" && stage !== "rotating"
                      ? { opacity: 0, scale: 0 }
                      : {}
                  }
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-10"
                  style={{ backgroundColor: theme.primary }}
                />

                {(stage === "provisioning" || stage === "overload") && (
                  <div
                    className="text-sm sm:text-base md:text-lg w-full text-left tracking-wide leading-relaxed"
                    style={{
                      color: theme.text,
                      textShadow: `0 0 10px ${
                        stage === "overload"
                          ? "rgba(255,0,0,0.8)"
                          : "rgba(255, 215, 0, 0.5)"
                      }`,
                    }}
                  >
                    {typedText.map((line, i) => (
                      <div key={i} className="mb-2 flex items-center">
                        <span
                          className={`mr-3 text-sm ${
                            stage === "overload"
                              ? "text-red-500/50"
                              : "text-[#FFD700]/40"
                          }`}
                        >
                          [
                          {new Date().toLocaleTimeString("en-US", {
                            hour12: false,
                          })}
                          ]
                        </span>
                        <span
                          className={`mr-2 ${
                            stage === "overload"
                              ? "text-red-500"
                              : "text-[#FFD700]/60"
                          }`}
                        >
                          {">"}
                        </span>
                        {line}
                      </div>
                    ))}
                    {stage === "provisioning" && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.1 }}
                        className="inline-block w-3 h-5 ml-1 align-middle bg-[#FFD700]"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar Metrics HUD - RESPONSIVE */}
              {stage !== "centering" && stage !== "rotating" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`
                    ${isMobile ? "hidden" : "w-48 border-l"}
                    p-4 flex flex-col gap-6 transition-colors duration-300 
                    ${
                      stage === "overload"
                        ? "border-red-500/50 bg-red-900/10"
                        : "border-[#FFD700]/20 bg-[#FFD700]/5"
                    }
                  `}
                >
                  {/* CPU */}
                  <div className="space-y-2">
                    <div
                      className={`text-[10px] mb-1 ${
                        stage === "overload"
                          ? "text-red-500"
                          : "text-[#FFD700]/50"
                      }`}
                    >
                      CPU_LOAD
                    </div>
                    <div className="h-24 flex items-end justify-between gap-1">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`w-full ${
                            stage === "overload"
                              ? "bg-red-500"
                              : "bg-[#FFD700]/30"
                          }`}
                          animate={{
                            height: `${
                              stage === "overload" ? 100 : Math.random() * 100
                            }%`,
                          }}
                          transition={{ duration: 0.1 }}
                        />
                      ))}
                    </div>
                    <div
                      className={`text-right text-xs ${
                        stage === "overload"
                          ? "text-red-500 font-bold"
                          : "text-[#FFD700]"
                      }`}
                    >
                      {metrics.cpu}%
                    </div>
                  </div>

                  {/* RAM */}
                  <div className="space-y-2">
                    <div
                      className={`text-[10px] mb-1 ${
                        stage === "overload"
                          ? "text-red-500"
                          : "text-[#FFD700]/50"
                      }`}
                    >
                      MEM_ALLOC
                    </div>
                    <div
                      className={`w-full h-1 rounded-full overflow-hidden ${
                        stage === "overload"
                          ? "bg-red-500/20"
                          : "bg-[#FFD700]/10"
                      }`}
                    >
                      <motion.div
                        className={`h-full ${
                          stage === "overload" ? "bg-red-500" : "bg-[#FFD700]"
                        }`}
                        animate={{
                          width: `${stage === "overload" ? 100 : metrics.ram}%`,
                        }}
                      />
                    </div>
                    <div
                      className={`text-right text-xs ${
                        stage === "overload"
                          ? "text-red-500 font-bold"
                          : "text-[#FFD700]"
                      }`}
                    >
                      {metrics.ram}GB
                    </div>
                  </div>

                  {/* NETWORK */}
                  <div className="space-y-2">
                    <div
                      className={`text-[10px] mb-1 ${
                        stage === "overload"
                          ? "text-red-500"
                          : "text-[#FFD700]/50"
                      }`}
                    >
                      NET_IO
                    </div>
                    <div
                      className={`text-right text-xs animate-pulse ${
                        stage === "overload" ? "text-red-500" : "text-green-400"
                      }`}
                    >
                      {metrics.net} Mb/s
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Corners */}
            {["top-left", "top-right", "bottom-left", "bottom-right"].map(
              (pos) => (
                <motion.div
                  key={pos}
                  className="absolute"
                  animate={{
                    opacity:
                      stage === "centering" ||
                      stage === "rotating" ||
                      stage === "expanding"
                        ? 1
                        : 0.5,
                  }}
                  style={{
                    borderColor: theme.primary,
                    width: cornerSize,
                    height: cornerSize,
                    position: "absolute",
                    top: pos.startsWith("top") ? 0 : undefined,
                    bottom: pos.startsWith("bottom") ? 0 : undefined,
                    left: pos.endsWith("left") ? 0 : undefined,
                    right: pos.endsWith("right") ? 0 : undefined,
                    borderTopWidth: pos.startsWith("top") ? borderWidth : 0,
                    borderBottomWidth: pos.startsWith("bottom")
                      ? borderWidth
                      : 0,
                    borderLeftWidth: pos.endsWith("left") ? borderWidth : 0,
                    borderRightWidth: pos.endsWith("right") ? borderWidth : 0,
                  }}
                />
              )
            )}
          </motion.div>
        )}

        {/* SHATTERED STAGE - SHARDS + SMILE REVEAL */}
        {stage === "shattered" && (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* The Splitting Window Effect */}
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
              {/* Left Half */}
              <motion.div
                initial={{ x: 0, opacity: 1, rotate: 0 }}
                animate={{ x: isMobile ? -400 : -600, opacity: 0, rotate: -15 }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className="overflow-hidden relative"
                style={{
                  width: isMobile ? "min(300px, 45vw)" : "min(400px, 45vw)",
                  height: isMobile ? "min(400px, 60vh)" : "min(500px, 60vh)",
                }}
              >
                {/* Inner Window (Left Aligned) */}
                <div
                  className="absolute left-0 top-0 w-[200%] h-full border border-red-500 bg-[#1a0000] flex flex-col font-mono"
                  style={{
                    boxShadow: "0 0 100px rgba(255, 0, 0, 0.4)",
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 0, 0, 0.03) 2px, rgba(255, 0, 0, 0.03) 4px)`,
                  }}
                >
                  {/* Header */}
                  <div className="h-8 flex items-center justify-between px-4 border-b border-red-500/50 bg-red-900/20 shrink-0">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="text-[10px] text-red-500">
                        AWS_CLI_V2.0 //{" "}
                        <span className="animate-pulse">CRITICAL ERROR</span>
                      </div>
                    </div>
                    <div className="text-[10px] tracking-widest text-red-500 font-bold animate-pulse">
                      BREACH DETECTED
                    </div>
                  </div>
                  <div className="w-[50%]">
                    {" "}
                    {/* Constrain width to visible area roughly */}
                    <div>WARNING: SYSTEM INSTABILITY DETECTED</div>
                    <div>CPU TEMPERATURE DRIVING CRITICAL</div>
                    <div>CONTAINMENT FIELD FAILING...</div>
                    <div>ERROR: 0xDEADBEEF</div>
                    <div>SYSTEM OVERLOAD IMMINENT!!!</div>
                  </div>
                  {/* Borders */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-red-500"></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-red-500"></div>
                </div>
              </motion.div>

              {/* Right Half */}
              <motion.div
                initial={{ x: 0, opacity: 1, rotate: 0 }}
                animate={{ x: isMobile ? 400 : 600, opacity: 0, rotate: 15 }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className="overflow-hidden relative"
                style={{
                  width: isMobile ? "min(300px, 45vw)" : "min(400px, 45vw)",
                  height: isMobile ? "min(400px, 60vh)" : "min(500px, 60vh)",
                }}
              >
                {/* Inner Window (Right Aligned via transform or margin) */}
                <div
                  className="absolute right-0 top-0 w-[200%] h-full border border-red-500 bg-[#1a0000] flex flex-col font-mono"
                  style={{
                    boxShadow: "0 0 100px rgba(255, 0, 0, 0.4)",
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 0, 0, 0.03) 2px, rgba(255, 0, 0, 0.03) 4px)`,
                  }}
                >
                  {/* Header */}
                  <div className="h-8 flex items-center justify-between px-4 border-b border-red-500/50 bg-red-900/20 shrink-0">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2 opacity-0">
                        {" "}
                        {/* Invisible left content */}
                        <div className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="text-[10px] tracking-widest text-red-500 font-bold animate-pulse">
                      BREACH DETECTED
                    </div>
                  </div>
                  {/* Body (+ Sidebar) */}
                  <div className="flex flex-1 relative">
                    <div className="flex-1"></div> {/* Spacer */}
                    {/* Sidebar Metrics (Visible in right half) */}
                    <div className="w-48 border-l border-red-500/50 bg-red-900/10 p-4 flex flex-col gap-6">
                      <div className="space-y-2">
                        <div className="text-[10px] mb-1 text-red-500">
                          CPU_LOAD
                        </div>
                        <div className="h-24 bg-red-500 w-full animate-pulse"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-[10px] mb-1 text-red-500">
                          MEM_ALLOC
                        </div>
                        <div className="w-full h-1 bg-red-500"></div>
                      </div>
                    </div>
                  </div>
                  {/* Borders */}
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-red-500"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-red-500"></div>
                </div>
              </motion.div>
            </div>

            {/* Flash Effect */}
            <motion.div
              className="absolute inset-0 bg-white z-100"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />

            {/* The Smile Reveal - Official Amazon SVG */}
            <motion.div
              className={`relative ${
                isMobile ? "w-[280px] h-[140px]" : "w-[400px] h-[200px]"
              } flex items-center justify-center filter drop-shadow-[0_0_50px_rgba(255,215,0,0.8)] z-40`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.25, type: "spring" }}
            >
              <svg
                viewBox={isMobile ? "80 260 400 190" : "70 250 420 210"}
                className="w-full h-full"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="amazon-arrow-aligned"
                  transform={isMobile ? "matrix(1.15, 0, 0, 1, -54, 0)" : "matrix(1.15, 0, 0, 1, -64, 0)"}
                  fill="#FF9900"
                  fillRule="nonzero"
                >
                  {/* THE OFFICIAL AMAZON SMILE */}
                  <motion.path
                    d="M138.5,338.6c33.8,25.6,70.8,49.4,120.4,49.5c0.9,0,1.9,0,2.8,0c31.5-0.7,67.4-10.1,95.2-25.4l0.2-0.1 c3.7-2,7.3-4.1,10.7-6.5c2.1-1.4,3.7-3.6,3.7-6c-0.1-4.1-3.9-6.9-8.1-6.9c-1.4,0-2.7,0.3-3.9,0.8c-1.5,0.6-2.9,1.1-4.3,1.6l-2,0.7 l-2.6,0.9h0c-28.6,10.2-58.5,16.3-86.3,16.7c-1,0-2.1,0-3,0c-43.6,0-79.1-17.8-115.1-35.4c-1.3-0.6-2.5-0.9-3.7-0.9 c-1.7,0-3.2,0.6-4.5,1.6c-1.2,1-2,2.5-1.9,4C135.7,335.6,136.8,337.4,138.5,338.6z"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />

                  {/* THE OFFICIAL AMAZON ARROWHEAD */}
                  <g transform={isMobile ? "translate(8, 5)" : "translate(15, 2)"}>
                    <motion.path
                      d="M337.2,332.6c1.3,0.9,2.7,1.2,4,1.2c0.3,0,0.6,0,0.8-0.1h0.2h0.2c2.5-0.4,6.1-0.7,10.4-1.3c3.6-0.4,7.6-0.6,10.9-0.6 c2.4,0,4.6,0.1,6,0.5c0.7,0.1,1.3,0.3,1.6,0.5c0.1,0,0.2,0.1,0.2,0.1c0.1,0.2,0.1,0.6,0.1,1.3c0,2.5-1.1,7.1-2.8,11.7 c-1.6,4.5-3.5,9.1-4.8,12.2c-0.3,0.7-0.5,1.5-0.5,2.3c0,1.2,0.5,2.7,1.7,3.7c1.1,1,2.7,1.4,4,1.4h0.1c1.9,0,3.5-0.7,4.9-1.7 c13-10.4,17.5-27.2,17.7-36.6v-1.5h0c-0.1-2.5-0.7-4.4-1.9-5.9l-0.1-0.2l-0.1-0.2c-1.1-1.1-2.3-1.6-3.5-2c-3.6-1.2-8.9-1.9-15.3-1.9 c-4.6,0-9.7,0.4-14.8,1.4v-0.3l-5.1,1.5h-0.1l-2.9,0.8v0.1c-3.4,1.3-6.4,2.8-9.4,4.6c-1.8,1.2-3.2,2.8-3.3,5.2 C335.2,330.1,335.9,331.7,337.2,332.6z"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.2, ease: "backOut" }}
                      style={{ transformOrigin: "center" }}
                    />
                  </g>
                </g>
              </svg>
            </motion.div>
          </div>
        )}

        {/* Skip Button - appears after 2 seconds */}
        {stage !== "hidden" && stage !== "shattered" && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSkip}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 text-sm font-medium hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            Tap to skip →
          </motion.button>
        )}
      </div>
    </AnimatePresence>
  );
}
