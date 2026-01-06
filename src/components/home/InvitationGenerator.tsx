"use client";

import { useEffect, useState } from "react";
import { Send, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface InvitationGeneratorProps {
  onGenerate: (name: string) => void;
  isLoading: boolean;
}

export function InvitationGenerator({
  onGenerate,
  isLoading,
}: InvitationGeneratorProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState<string | null>(null);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const checkLimit = async () => {
      try {
        const res = await fetch("/api/invite", { method: "GET" });
        const data = await res.json();
        if (res.ok && data?.status === "closed") {
          setIsClosed(true);
          setError("Launch pass limit reached. Registrations are closed.");
        }
      } catch (err) {
        console.error("Failed to check launch pass limit", err);
      }
    };

    void checkLimit();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfo(null);

    if (isClosed) {
      setError("Launch pass limit reached. Registrations are closed.");
      return;
    }

    // name validations
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    // email validations
    // must end with .vitstudent.ac.in
    const validateEmail = (e: string) =>
      /^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/.test(e);

    if (!validateEmail(email.trim())) {
      setError("Enter VIT email id");
      return;
    }

    setError("");
    setLocalLoading(true);

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        // server returned an error
        setError(data?.error || "Something went wrong. Please try again.");
        setLocalLoading(false);
        return;
      }

      // data.status: "exists" | "created"
      if (data.status === "exists") {
        // DO NOT proceed to next page — show message and stay on same page.
        setInfo("This email is already registered.");
        setLocalLoading(true);
        // Use the name returned from backend if available, otherwise fallback to input name
        const registeredName = data.name || name.trim();
        onGenerate(registeredName);
        return; // IMPORTANT: stop here, do not call onGenerate
      } else if (data.status === "created") {
        setInfo("You are registered! Continuing...");
        // proceed with parent flow only when a new record was created
        onGenerate(name.trim());
      } else {
        // unexpected but safe fallback: don't proceed automatically
        setInfo("Received response. Please proceed manually.");
      }
    } catch (err) {
      console.error("Invite submit error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const target = new Date("2026-01-06T10:30:00+05:30");
      if (new Date() >= target) {
        setIsLive(true);
      }
    };
    checkTime();
  }, []);

  const disabled = isLoading || localLoading || isClosed || isLive;

  if (isClosed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
        <Card className="bg-metal-glossy p-6 sm:p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="space-y-6 relative z-10 text-center">
            <h3 className="text-2xl font-bold text-white font-heading tracking-wide">
              <span className="text-metal-gradient">Get Your Invite</span>
            </h3>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-yellow-300 to-red-400 drop-shadow-lg">
                Launch passes are now closed
              </div>
              <p className="text-base sm:text-lg text-white/80">
                We hit the max limit of invites. Thank you for the amazing
                response!
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-metal-glossy p-6 sm:p-8 relative overflow-hidden group">
        {/* Metallic Sheen Effect */}
        <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-bold text-white font-heading tracking-wide">
              <span className="text-metal-gradient">Get early access to recruitment</span>
            </h3>
            <p className="text-muted-foreground text-sm">
              Enter your name and VIT email to generate your exclusive invitation.
            </p>

            {/* IMPORTANT RULE: only one invitation per person */}
            <p className="text-xs sm:text-sm text-yellow-300 mt-5">
              <strong>Note:</strong> Only one invitation per person is allowed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => {
                  const newName = e.target.value;
                  setName(newName);
                  if (error) setError("");
                  if (info) setInfo(null);

                  // Mobile keyboards may not emit global keydown events reliably.
                  // Trigger the AWS easter egg whenever the name is exactly "aws".
                  if (newName.toLowerCase() === "aws") {
                    window.dispatchEvent(new Event("aws-easter-egg"));
                  }
                }}
                className="bg-black/60 border-white/10 text-white placeholder:text-white/20 h-14 text-sm sm:text-lg focus-visible:ring-yellow-500/50 focus-visible:border-yellow-500/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] hover:bg-black/80 hover:border-white/20 rounded-xl backdrop-blur-sm"
              />

              <Input
                type="email"
                placeholder="Enter your VIT email Id"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                  if (info) setInfo(null);
                }}
                className="bg-black/60 border-white/10 text-white placeholder:text-white/20 h-14 text-sm sm:text-lg focus-visible:ring-yellow-500/50 focus-visible:border-yellow-500/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] hover:bg-black/80 hover:border-white/20 rounded-xl backdrop-blur-sm"
                disabled={disabled}
              />

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              {info && <div className="text-sm text-yellow-300">{info}</div>}
            </div>

            <Button
              type="submit"
              disabled={disabled}
              className="w-full h-12 text-md sm:text-lg font-medium shadow-lg shadow-yellow-500/10 transition-all hover:scale-[1.02]"
            >
              {localLoading || isLoading ? (
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
