"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const departments = [
  "Technical",
  "Design",
  "Marketing",
  "Content",
  "Operations",
  "Events",
];

const technicalQuestions = [
  "What experience do you have with cloud computing or AWS?",
  "Describe a technical project you've worked on (personal or academic).",
];

const personalQuestions = [
  "What motivates you to work in a team environment?",
  "How do you handle conflicts or disagreements in a team?",
];

export default function RecruitmentApplyPage() {
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    vitEmail: "",
    preference1: {
      dept: "",
      projects: "",
      technicalQuestions: {
        q1: "",
        q2: "",
      },
    },
    preference2: {
      dept: "",
      projects: "",
      technicalQuestions: {
        q1: "",
        q2: "",
      },
    },
    personalQuestions: {
      q1: "",
      q2: "",
    },
    githubRepo: "",
    linkedinProfile: "",
    whyJoin: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/.test(email);
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.regno.trim()) return "Registration number is required";
    if (!formData.vitEmail.trim()) return "VIT email is required";
    if (!validateEmail(formData.vitEmail)) return "Please enter a valid VIT email (@vitstudent.ac.in)";

    // Preference 1 validation
    if (!formData.preference1.dept) return "Preference 1: Department is required";
    if (!formData.preference1.projects.trim()) return "Preference 1: Projects field is required";
    if (!formData.preference1.technicalQuestions.q1.trim()) return "Preference 1: All technical questions are required";
    if (!formData.preference1.technicalQuestions.q2.trim()) return "Preference 1: All technical questions are required";

    // Preference 2 validation
    if (!formData.preference2.dept) return "Preference 2: Department is required";
    if (!formData.preference2.projects.trim()) return "Preference 2: Projects field is required";
    if (!formData.preference2.technicalQuestions.q1.trim()) return "Preference 2: All technical questions are required";
    if (!formData.preference2.technicalQuestions.q2.trim()) return "Preference 2: All technical questions are required";

    // Check if both preferences have the same department
    if (formData.preference1.dept && formData.preference2.dept && formData.preference1.dept === formData.preference2.dept) {
      return "Preference 1 and Preference 2 cannot have the same department";
    }

    // Personal questions validation
    if (!formData.personalQuestions.q1.trim()) return "All personal questions are required";
    if (!formData.personalQuestions.q2.trim()) return "All personal questions are required";

    if (!formData.githubRepo.trim()) return "GitHub repository URL is required";
    if (!formData.linkedinProfile.trim()) return "LinkedIn profile URL is required";
    if (!formData.whyJoin.trim()) return "Please tell us why you want to join this club";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/recruitment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      // Reset form
      setFormData({
        name: "",
        regno: "",
        vitEmail: "",
        preference1: {
          dept: "",
          projects: "",
          technicalQuestions: { q1: "", q2: "" },
        },
        preference2: {
          dept: "",
          projects: "",
          technicalQuestions: { q1: "", q2: "" },
        },
        personalQuestions: { q1: "", q2: "" },
        githubRepo: "",
        linkedinProfile: "",
        whyJoin: "",
      });
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updatePreference = (
    pref: "preference1" | "preference2",
    field: string,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [pref]: {
          ...prev[pref],
          [field]: value,
        },
      };

      // If Preference 1's department changes and Preference 2 has the same department, clear Preference 2
      if (pref === "preference1" && field === "dept" && prev.preference2.dept === value && value !== "") {
        updated.preference2 = {
          ...updated.preference2,
          dept: "",
        };
      }

      return updated;
    });
  };

  const updateTechnicalQuestion = (
    pref: "preference1" | "preference2",
    qNum: "q1" | "q2",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [pref]: {
        ...prev[pref],
        technicalQuestions: {
          ...prev[pref].technicalQuestions,
          [qNum]: value,
        },
      },
    }));
  };

  const updatePersonalQuestion = (qNum: "q1" | "q2", value: string) => {
    setFormData((prev) => ({
      ...prev,
      personalQuestions: {
        ...prev.personalQuestions,
        [qNum]: value,
      },
    }));
  };

  const renderPreferenceForm = (
    pref: "preference1" | "preference2",
    title: string
  ) => (
    <Card className="bg-metal-glossy border-white/10">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gradient">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Department */}
        <div className="space-y-2">
          <Label htmlFor={`${pref}-dept`} className="text-white">
            Department <span className="text-yellow-500">*</span>
          </Label>
          <select
            id={`${pref}-dept`}
            value={formData[pref].dept}
            onChange={(e) => updatePreference(pref, "dept", e.target.value)}
            className="w-full h-9 rounded-md border border-input dark:bg-input/30 bg-transparent px-3 text-white text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="" className="bg-black text-white">Select Department</option>
            {departments.map((dept) => {
              // Disable the department in Preference 2 if it matches Preference 1
              const isDisabled = pref === "preference2" && formData.preference1.dept === dept;
              return (
                <option 
                  key={dept} 
                  value={dept} 
                  className="bg-black text-white"
                  disabled={isDisabled}
                >
                  {dept} {isDisabled ? "(Already selected in Preference 1)" : ""}
                </option>
              );
            })}
          </select>
          {pref === "preference2" && formData.preference1.dept && (
            <p className="text-xs text-yellow-500 mt-1">
              Note: {formData.preference1.dept} is already selected in Preference 1
            </p>
          )}
        </div>

        {/* Projects */}
        <div className="space-y-2">
          <Label htmlFor={`${pref}-projects`} className="text-white">
            Projects <span className="text-yellow-500">*</span>
          </Label>
          <Textarea
            id={`${pref}-projects`}
            value={formData[pref].projects}
            onChange={(e) => updatePreference(pref, "projects", e.target.value)}
            placeholder="Describe projects you've worked on or are interested in..."
            className="min-h-[100px] text-white placeholder:text-muted-foreground"
            required
          />
        </div>

        {/* Technical Questions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gradient">Technical Questions</h3>
          {technicalQuestions.map((question, idx) => (
            <div key={idx} className="space-y-2">
              <Label className="text-white text-sm">
                {question} <span className="text-yellow-500">*</span>
              </Label>
              <Textarea
                value={formData[pref].technicalQuestions[`q${idx + 1}` as "q1" | "q2"]}
                onChange={(e) =>
                  updateTechnicalQuestion(
                    pref,
                    `q${idx + 1}` as "q1" | "q2",
                    e.target.value
                  )
                }
                placeholder="Your answer..."
                className="min-h-[80px] text-white placeholder:text-muted-foreground"
                required
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="bg-metal-glossy border-white/10">
            <CardContent className="pt-6 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-gradient">Application Submitted!</h2>
              <p className="text-muted-foreground">
                Your application has been successfully submitted. We'll review it and get back to you soon.
              </p>
              <div className="pt-4 space-y-2">
                <p className="text-sm text-yellow-500 font-semibold">
                  Note: Only your latest submission will be considered.
                </p>
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

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/recruitment">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-gradient mb-4">
            Join AWS Cloud Club VIT-C
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Fill out the form below to apply for recruitment.
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 text-sm font-semibold">
              ⚠️ Important: Only your latest submission will be accepted. If you submit multiple times, only the most recent one will be considered.
            </p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-metal-glossy border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gradient">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name <span className="text-yellow-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="text-white placeholder:text-muted-foreground"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regno" className="text-white">
                    Registration Number <span className="text-yellow-500">*</span>
                  </Label>
                  <Input
                    id="regno"
                    value={formData.regno}
                    onChange={(e) => setFormData({ ...formData, regno: e.target.value })}
                    placeholder="Enter your registration number"
                    className="text-white placeholder:text-muted-foreground"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vitEmail" className="text-white">
                  VIT Email <span className="text-yellow-500">*</span>
                </Label>
                <Input
                  id="vitEmail"
                  type="email"
                  value={formData.vitEmail}
                  onChange={(e) => setFormData({ ...formData, vitEmail: e.target.value })}
                  placeholder="your.name@vitstudent.ac.in"
                  className="text-white placeholder:text-muted-foreground"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences - Side by Side */}
          <div className="grid lg:grid-cols-2 gap-6">
            {renderPreferenceForm("preference1", "Preference 1")}
            {renderPreferenceForm("preference2", "Preference 2")}
          </div>

          {/* Personal Questions */}
          <Card className="bg-metal-glossy border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gradient">Personal Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {personalQuestions.map((question, idx) => (
                <div key={idx} className="space-y-2">
                  <Label className="text-white">
                    {question} <span className="text-yellow-500">*</span>
                  </Label>
                  <Textarea
                    value={formData.personalQuestions[`q${idx + 1}` as "q1" | "q2"]}
                    onChange={(e) =>
                      updatePersonalQuestion(
                        `q${idx + 1}` as "q1" | "q2",
                        e.target.value
                      )
                    }
                    placeholder="Your answer..."
                    className="min-h-[100px] text-white placeholder:text-muted-foreground"
                    required
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="bg-metal-glossy border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gradient">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="githubRepo" className="text-white">
                  GitHub Repository <span className="text-yellow-500">*</span>
                </Label>
                <Input
                  id="githubRepo"
                  type="url"
                  value={formData.githubRepo}
                  onChange={(e) => setFormData({ ...formData, githubRepo: e.target.value })}
                  placeholder="https://github.com/yourusername"
                  className="text-white placeholder:text-muted-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinProfile" className="text-white">
                  LinkedIn Profile <span className="text-yellow-500">*</span>
                </Label>
                <Input
                  id="linkedinProfile"
                  type="url"
                  value={formData.linkedinProfile}
                  onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="text-white placeholder:text-muted-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whyJoin" className="text-white">
                  Why do you want to join this club? <span className="text-yellow-500">*</span>
                </Label>
                <Textarea
                  id="whyJoin"
                  value={formData.whyJoin}
                  onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                  placeholder="Tell us about your motivation and what you hope to gain..."
                  className="min-h-[120px] text-white placeholder:text-muted-foreground"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={isSubmitting}
              className="min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
