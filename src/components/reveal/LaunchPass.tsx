"use client";
import * as htmlToImage from "html-to-image";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LaunchPassProps {
    name: string;
    persona: {
        title: string;
        description: string;
        message: string;
    };
}

export function LaunchPass({ name, persona }: LaunchPassProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const frontRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
      if (!cardRef.current || !frontRef.current) return;

      const node = frontRef.current;

      // Make sure front side is visible for the snapshot
      const wasFlipped = isFlipped;
      if (wasFlipped) setIsFlipped(false);

      // wait for flip animation
      await new Promise((r) => setTimeout(r, 600));

      try {
        // Temporarily remove rotation to avoid mirrored snapshots
        const originalTransform = cardRef.current.style.transform;
        cardRef.current.style.transform = "none";

        const dataUrl = await htmlToImage.toJpeg(node, {
          cacheBust: true,
          pixelRatio: 2,
          quality: 0.95,
          backgroundColor: undefined,
        });

        const link = document.createElement("a");
        link.download = `AWS-Launch-Pass-${name}.jpg`;
        link.href = dataUrl;
        link.click();

        // Restore transform
        cardRef.current.style.transform = originalTransform;
      } catch (err) {
        console.error("Download failed", err);
        alert("Failed to generate image. Try again.");
      } finally {
        if (wasFlipped) setIsFlipped(true);
      }
    };



    return (
      <div className="flex flex-col items-center gap-8 py-10">
        <div className="perspective-1000 relative w-[320px] h-[480px] sm:w-[360px] sm:h-[540px] flex justify-center">
          <motion.div
            className="w-full h-full relative preserve-3d cursor-pointer transition-all duration-500 origin-center"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            onClick={() => setIsFlipped(!isFlipped)}
            ref={cardRef}
          >
            {/* Front Side */}
            <div
              className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-metal-glossy cursor-target"
              ref={frontRef}
            >
              {/* Background Art */}
              <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black" />
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10" />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black to-transparent" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8">
                <div className="flex justify-between items-start">
                  <div className="h-20 w-20 rounded bg-transparent overflow-hidden shadow-lg shadow-yellow-500/">
                    <Image
                      src="/aws_logo.png"
                      alt="AWS Cloud Clubs VIT Chennai"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-yellow-500/60 uppercase tracking-widest">
                      Launch Pass
                    </p>
                    <p className="text-white font-bold">2026</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
                      Issued To
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                      {name}
                    </h3>
                  </div>

                  <div>
                    <p className="text-xs text-yellow-500/80 uppercase tracking-widest mb-1">
                      Cloud Persona
                    </p>
                    <h4 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-200 via-yellow-400 to-yellow-600 font-heading">
                      {persona.title}
                    </h4>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/60 italic">
                      "{persona.message}"
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="text-xs text-yellow-500/90">
                    AWS CLOUD CLUB VIT-C
                  </div>
                  {/* QR Code Placeholder */}
                  <div className="w-14 h-14 bg-black p-1 rounded-lg">
                    <Image
                      src="/awsvitc_qr.svg"
                      alt="AWS Cloud Clubs VIT Chennai"
                      width={60}
                      height={60}
                      className="h-14 w-14 rounded-lg object-contain bg-black"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side */}
            <div
              className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-metal-glossy cursor-target"
              style={{ transform: "rotateY(180deg)" }}
            >
              <div className="absolute inset-0 bg-linear-to-bl from-black via-gray-900 to-black" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md mb-4 border border-white/10">
                  <RotateCw className="h-8 w-8 text-yellow-500" />
                </div>

                <h3 className="text-2xl font-bold text-white font-heading">
                  {persona.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {persona.description}
                </p>

                <div className="mt-8 pt-8 border-t border-white/10 w-full">
                  <p className="text-sm text-white/30">
                    Flip back to see your pass details
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleDownload} className="font-medium">
            <Download className="mr-2 h-4 w-4" />
            Download Pass
          </Button>
        </div>

        <p className="text-xs sm:text-lg mt-2">
          Mandatory –{" "}
          <a
            href="https://eventhubcc.vit.ac.in/EventHub/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              underline
              bg-linear-to-r
              from-yellow-200 via-yellow-400 to-yellow-600
              bg-clip-text text-transparent
              hover:from-red-300 hover:via-red-400 hover:to-red-600
            "
          >
            Click & register for the event in EventHub
          </a>
        </p>
      </div>
    );
}
