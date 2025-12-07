"use client";

import { useState } from "react";
import { Send, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface InvitationGeneratorProps {
    onGenerate: (name: string) => void;
    isLoading: boolean;
}

export function InvitationGenerator({ onGenerate, isLoading }: InvitationGeneratorProps) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }
        if (name.length < 2) {
            setError("Name must be at least 2 characters.");
            return;
        }
        setError("");
        onGenerate(name);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
        >
            <Card className="bg-metal-glossy p-6 sm:p-8 relative overflow-hidden group">
                {/* Metallic Sheen Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="space-y-6 relative z-10">
                    <div className="space-y-2 text-center">
                        <h3 className="text-2xl font-bold text-white font-heading tracking-wide">
                            <span className="text-metal-gradient">Get Your Invite</span>
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            Enter your name to generate your exclusive AI-powered invitation.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (error) setError("");
                                }}
                                className="bg-black/60 border-white/10 text-white placeholder:text-white/20 h-14 text-lg focus-visible:ring-yellow-500/50 focus-visible:border-yellow-500/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] hover:bg-black/80 hover:border-white/20 rounded-xl backdrop-blur-sm"
                                disabled={isLoading}
                            />
                            {error && (
                                <div className="flex items-center gap-2 text-sm text-red-400">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>{error}</span>
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 text-lg font-medium shadow-lg shadow-yellow-500/10 transition-all hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    Generate My Invitation
                                    <Send className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </Card>
        </motion.div>
    );
}
