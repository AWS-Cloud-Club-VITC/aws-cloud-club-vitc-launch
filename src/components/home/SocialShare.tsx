"use client";

import { useState } from "react";
import { Twitter, Linkedin, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SocialShare() {
    const [copied, setCopied] = useState(false);
    const shareUrl = "https://aws-cloud-club-vitc.vercel.app"; // Placeholder URL
    const shareText = "I just generated my exclusive invitation for the AWS Cloud Club VIT-C event! Join me in witnessing the new era of cloud technology. 🚀 #AWSCloudClub #VITC";

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTwitterShare = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    const handleLinkedinShare = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    return (
        <div className="mt-8 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <p className="text-sm text-muted-foreground">Share your invitation:</p>
            <div className="flex gap-3">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-blue-400 transition-colors"
                    onClick={handleTwitterShare}
                >
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-blue-600 transition-colors"
                    onClick={handleLinkedinShare}
                >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">Share on LinkedIn</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-green-400 transition-colors"
                    onClick={handleCopy}
                >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span className="sr-only">Copy Link</span>
                </Button>
            </div>
        </div>
    );
}
