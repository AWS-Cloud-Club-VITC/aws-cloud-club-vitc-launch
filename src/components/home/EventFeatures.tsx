"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MagnetLines from "@/components/ui/MagnetLines";
import ScrollFloat from "@/components/ui/ScrollFloat";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FolderKanban, CalendarDays, GraduationCap } from "lucide-react";

const features = [
    {
        title: "Projects",
        icon: FolderKanban,
        description: "Browse and build real-world cloud and AI projects.",
        image: "bg-gradient-to-br from-purple-900 to-blue-900",
    },
    {
        title: "Events",
        icon: CalendarDays,
        description: "Connect through workshops, meetups, and cloud community events.",
        image: "bg-gradient-to-br from-blue-900 to-cyan-900",
    },
    {
        title: "Get Certified Roadmap",
        icon: GraduationCap,
        description: "Roadmap will be uploaded soon.",
        image: "bg-gradient-to-br from-indigo-900 to-purple-900",
    },
];


export function EventFeatures() {
    return (
        <section className="relative overflow-hidden">
            {/* Magnet Lines Background */}
            <div className="absolute inset-0 z-0 opacity-30">
                <MagnetLines
                    rows={10}
                    cols={20}
                    lineColor="rgba(147, 51, 234, 0.5)"
                    lineHeight="40px"
                    lineWidth="2px"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-12 text-center">
                    <ScrollFloat
                        animationDuration={1}
                        ease="back.inOut(2)"
                        scrollStart="center bottom+=50%"
                        scrollEnd="bottom bottom-=40%"
                        stagger={0.03}
                        containerClassName="text-3xl font-bold text-white font-heading mb-4"
                    >
                        Why You Can't Miss This
                    </ScrollFloat>

                    <div className="max-w-2xl mx-auto">
                        <ScrollReveal
                            baseOpacity={0.3}
                            enableBlur={true}
                            baseRotation={2}
                            blurStrength={4}
                            textClassName="text-muted-foreground text-lg"
                        >
                            Experience a tech event like no other, designed to inspire and empower the next generation of cloud builders.
                        </ScrollReveal>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Card className="overflow-hidden bg-metal-glossy border-white/5 hover:border-yellow-500/30 transition-all duration-500 group cursor-target h-full hover:shadow-[0_0_30px_-10px_rgba(255,215,0,0.15)]">
                                <div className={`h-48 w-full ${feature.image} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
                                    {/* Metallic Overlay on Image */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

                                    <div className="absolute inset-0 flex items-center justify-center text-white/20 text-4xl font-bold transform group-hover:scale-110 transition-transform duration-700">
                                        <feature.icon className="h-20 w-20 opacity-20 group-hover:opacity-100 group-hover:text-yellow-500/20 transition-all duration-500" />
                                    </div>
                                </div>
                                <CardHeader className="relative z-10 -mt-10 px-6">
                                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-gray-900 to-black border border-white/10 text-yellow-500 shadow-lg group-hover:scale-110 group-hover:border-yellow-500/50 transition-all duration-300">
                                        <feature.icon className="h-7 w-7" />
                                    </div>
                                    <CardTitle className="text-xl text-white font-heading tracking-wide group-hover:text-yellow-400 transition-colors">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="px-6 pb-8">
                                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
