"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Award, BookOpen, TrendingUp, Loader2, Globe, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LaunchPass } from "./LaunchPass";


export function EventReveal() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "Builder";

    const [step, setStep] = useState<"mission" | "generating" | "pass">("mission");
    const [persona, setPersona] = useState<{ title: string; description: string; message: string } | null>(null);

    const perks = [
        { icon: Globe, title: "Expert Network", desc: "Learn directly from AWS Solutions Architects, DevOps engineers, and cloud consultants who mentor our club." },
        { icon: TrendingUp, title: "Career pathways", desc: "Connect with leadership & internships" },
        { icon: BookOpen, title: "Student-led learning", desc: "Learn from peers and experts" },
        { icon: Award, title: "Real AWS Infrastructure", desc: "Work with production-grade AWS services, not classroom simulations. Deploy real applications that handle real traffic" },
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
            },
            {
                title: "The Digital Alchemist",
                description: "A creator who turns raw logic into living systems. Where others see code, you see transformation and intent.",
                message: "Your ideas don’t just run — they evolve."
            },
            {
                title: "The Silent Engineer",
                description: "You work behind the scenes, designing systems so seamless they feel invisible. Precision is your signature.",
                message: "The strongest foundations are rarely seen."
            },
            {
                title: "The Cloud Cartographer",
                description: "You map complexity into clarity, navigating distributed systems like uncharted terrain waiting to be explored.",
                message: "Every great journey needs a guide."
            },
            {
                title: "The System Weaver",
                description: "You interlace services, data, and logic into architectures that feel almost alive. Balance is your superpower.",
                message: "Everything connects — you make it work."
            },
            {
                title: "The Future Forger",
                description: "You don’t wait for what’s next — you build it. Innovation is your default, not your goal.",
                message: "Tomorrow starts with what you write today."
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
                <h2 className="text-3xl font-bold text-white font-heading mb-8 text-center"></h2>
                <LaunchPass name={name} persona={persona} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            {/* Speakers Section */}
            <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading">
                    Distinguished <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-amber-500 to-orange-600">
                        Speakers</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Note: V.O.C Auditorium is located near the main entrance (arch).
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 px-4">
                {/* Speaker 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-1 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.3)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative h-full bg-black/40 backdrop-blur-sm rounded-[20px] p-6 flex flex-col items-center text-center">
                        <div className="w-48 h-48 mb-6 relative">
                            <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-2xl group-hover:bg-yellow-500/30 transition-all duration-500" />
                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 group-hover:border-yellow-500/50 transition-colors duration-500">
                                <img
                                    src="https://media.licdn.com/dms/image/v2/C5603AQHZg2qK7bO4-w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1658902580537?e=1740614400&v=beta&t=H3-wLKyhPzN_CgkD4K2Ki0TvXkPGeDqgw5uJp6qN0uk"
                                    alt="Sakthivel C"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        </div>

                        <h3 className="text-3xl font-bold text-white font-heading mb-2 group-hover:text-yellow-400 transition-colors">Sakthivel C</h3>
                        <p className="text-yellow-500/90 font-medium text-lg mb-4">Cloud Solution Architect </p>
                        <p className="text-yellow-500/90 font-medium text-lg mb-4">17+ years of experience working on strategic initiatives and leading enterprise-scale digital transformation across AWS</p>

                        <div className="mt-auto pt-4 border-t border-white/10 w-full flex justify-center">
                            <a href="https://www.linkedin.com/in/srcsakthivel/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-[#0A66C2] text-white/60 transition-all duration-300">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Speaker 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-1 hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative h-full bg-black/40 backdrop-blur-sm rounded-[20px] p-6 flex flex-col items-center text-center">
                        <div className="w-48 h-48 mb-6 relative">
                            <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl group-hover:bg-orange-500/30 transition-all duration-500" />
                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 group-hover:border-orange-500/50 transition-colors duration-500">
                                <img
                                    src="Speaker1.jpg"
                                    alt="Sridevi Murugayen"
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        </div>

                        <h3 className="text-3xl font-bold text-white font-heading mb-2 group-hover:text-orange-400 transition-colors">Sridevi Murugayen</h3>
                        <p className="text-orange-500/90 font-medium text-lg mb-4">Specialized in AWS & Big Data and Analytics</p>
                        <span className="text-orange-500/90 font-medium text-lg mb-4">
                            AWS Certified Solution Architect Professional,
                            5+ years of experience designing and implementing solutions for Big Data </span>

                        <div className="mt-auto pt-4 border-t border-white/10 w-full flex justify-center">
                            <a href="https://www.linkedin.com/in/sridevi-murugayen/?profileId=ACoAAAcCVgoBIPEo5uhajHSZU1UCeMN2xmHQqUc" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-[#0A66C2] text-white/60 transition-all duration-300">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>


            <div className="text-center pt-8">
                <div className="relative inline-block group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-lg blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                    <Button
                        onClick={handleCompleteMission}
                        size="lg"
                        className="relative bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 hover:from-yellow-500 hover:via-amber-500 hover:to-yellow-600 text-white border-0 h-16 px-12 text-xl font-bold tracking-wide shadow-xl transition-all hover:scale-[1.02] hover:-translate-y-1">
                        Get Your Pass
                        <span className="ml-2">→</span>
                    </Button>
                </div>
            </div>

            {/* 
            <div className="text-center mb-12 space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                >
                    Interest Confirmed
                </motion.div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading">
                    Your Journey, <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-amber-500 to-orange-600">
                        {name}</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                    You've taken the first step. Here's what AWS Cloud Club VIT-C offers our members
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
                    className="bg-linear-to-r from-yellow-600 via-amber-600 to-yellow-700 hover:from-yellow-700 hover:via-amber-700 hover:to-yellow-800 text-white border-0 h-14 px-8 text-xl font-medium shadow-lg shadow-yellow-700/20 transition-all hover:scale-105">
                    Join The Waitlist
                </Button>
            </div>
            <p className="text-muted-foreground text-center mt-4">Secure One of the Few Spots </p> 
            */}
        </div>
    );
}