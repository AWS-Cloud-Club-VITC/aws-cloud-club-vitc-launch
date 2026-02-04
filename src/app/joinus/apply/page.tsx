"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function RecruitmentApplyPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <Card className="bg-metal-glossy border-white/10">
          <CardContent className="pt-6 text-center space-y-4">
            <Ban className="w-16 h-16 text-yellow-500 mx-auto" />
            <h2 className="text-2xl font-bold text-gradient">Recruitments Closed</h2>
            <p className="text-muted-foreground">
              We are no longer accepting responses. Thank you for your interest!
            </p>
            <div className="pt-4">
              <Link href="/">
                <Button variant="secondary" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
