"use client";

import { Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function SocialMedia() {
    const socialLinks = [
        // {
        //     name: "Instagram",
        //     icon: Instagram,
        //     url: "https://www.instagram.com/awsvitc/",
        //     color: "hover:text-pink-500",
        //     isSvg: false,
        // },
        // {
        //     name: "LinkedIn",
        //     icon: Linkedin,
        //     url: "https://www.linkedin.com/in/aws-vitc/",
        //     color: "hover:text-blue-400",
        //     isSvg: false,
        // },
        {
            name: "Meetup",
            icon: null,
            url: "https://www.meetup.com/aws-cloud-club-at-vit-chennai/",
            color: "hover:text-red-400",
            isSvg: true,
            svgPath: "/meetup-svg.svg",
        },
    ];

    return (
        <section className="py-12 border-t border-white/10 bg-background/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-3">
                        Connect With Us
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        Follow us on social media to stay updated
                    </p>
                </div>
                <div className="flex justify-center items-center gap-6">
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-metal-glossy border border-white/10 text-white/70 ${social.color} transition-all duration-300 hover:scale-110 hover:border-yellow-500/50 hover:shadow-[0_0_20px_-5px_rgba(255,215,0,0.3)] cursor-target`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {social.isSvg && social.svgPath ? (
                                <Image
                                    src={social.svgPath}
                                    alt={social.name}
                                    width={28}
                                    height={28}
                                    className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
                                />
                            ) : social.icon ? (
                                <social.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                            ) : null}
                            <span className="sr-only">{social.name}</span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
