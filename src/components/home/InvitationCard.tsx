"use client";

import { motion } from "framer-motion";
import { Ticket, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface InvitationCardProps {
    name: string;
}

export function InvitationCard({ name }: InvitationCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md mx-auto"
        >
            {/* Glow Effects */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-700 opacity-50 blur-xl animate-pulse" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-8 text-center shadow-2xl">
                {/* Animated Orbs Background */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-yellow-500/10 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-yellow-600/10 blur-3xl"
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 p-4 shadow-lg shadow-yellow-500/20">
                        <Ticket className="h-8 w-8 text-black" />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white font-heading">You're Invited!</h3>
                        <p className="text-muted-foreground">
                            This exclusive invitation is for <span className="text-yellow-500 font-bold">{name}</span>
                        </p>
                    </div>

                    <div className="w-full pt-4">
                        <Button asChild className="w-full h-12 text-lg font-medium shadow-lg shadow-yellow-500/20">
                            <Link href={`/reveal?name=${encodeURIComponent(name)}`}>
                                See What Awaits <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
