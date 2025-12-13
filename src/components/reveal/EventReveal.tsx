"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal, Award, BookOpen, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LaunchPass } from "./LaunchPass";

export function EventReveal() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "Builder";

    const [step, setStep] = useState<"mission" | "generating" | "pass">("mission");
    const [persona, setPersona] = useState<{ title: string; description: string; message: string } | null>(null);

    const perks = [
        { icon: Terminal, title: "Hands-on AWS demos", desc: "Build with the latest tools." },
        { icon: Award, title: "Builder badges & swags", desc: "Earn recognition for your skills." },
        { icon: BookOpen, title: "Student-led learning", desc: "Learn from peers and experts." },
        { icon: TrendingUp, title: "Career pathways", desc: "Connect with leadership & internships." },
    ];

    const handleCompleteMission = async () => {
        setStep("generating");
        // Mock AI Generation
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Mock Persona Logic based on name length (just for variety)
        const personas = [
            {
                title: "The Architect of Possibilities",
                description: "A builder who doesn't just use tech — they bend it to create something new. You see the cloud not as infrastructure, but as a canvas.",
                message: "Your code will shape the future."
            },
            {
                title: "The Cloud Vanguard",
                description: "Leading the charge into the unknown. You thrive on the bleeding edge of technology, always one step ahead.",
                message: "Innovate. Iterate. Inspire."
            },
            {
                title: "The System Visionary",
                description: "You see the big picture. Where others see chaos, you see patterns and potential for optimization.",
                message: "Scale your dreams."
            }
        ];

        setPersona(personas[name.length % personas.length]);
        setStep("pass");
    };

    if (step === "generating") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white font-heading">Generating Your Launch Pass...</h2>
                    <p className="text-muted-foreground">We are crafting your unique cloud persona.</p>
                </div>
            </div>
        );
    }

    if (step === "pass" && persona) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
                <h2 className="text-3xl font-bold text-white font-heading mb-8 text-center">Mission Accepted</h2>
                <LaunchPass name={name} persona={persona} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                >
                    Access Granted
                </motion.div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading">
                    Your Mission, <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">{name}</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                    Welcome to the inner circle. Here is what awaits you.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {perks.map((perk, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                        <div className="p-3 rounded-lg bg-primary/20 text-primary">
                            <perk.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white font-heading mb-1">{perk.title}</h3>
                            <p className="text-muted-foreground">{perk.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center">
                <Button
                    onClick={handleCompleteMission}
                    size="lg"
                    className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 h-14 px-8 text-xl font-medium shadow-lg shadow-purple-500/25 transition-all hover:scale-105"
                >
                    Complete Your Mission
                </Button>
            </div>
        </div>
    );
}
