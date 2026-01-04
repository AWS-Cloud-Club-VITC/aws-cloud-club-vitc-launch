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

import { deptConfig, technicalDepts, nonTechnicalDepts } from "@/lib/config/departments";

const personalQuestions = [
  "What motivates you to work in a team environment?",
  "How do you handle conflicts or disagreements in a team?",
];

export default function RecruitmentApplyPage() {
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    phoneNumber: "",
    vitEmail: "",
    preference1: {
      dept: "",
      projects: "",
      projectLink: "",
      githubProfile: "",
      answers: {} as Record<string, string>,
    },
    preference2: {
      dept: "",
      projects: "",
      projectLink: "",
      githubProfile: "",
      answers: {} as Record<string, string>,
    },
    personalQuestions: {
      q1: "",
      q2: "",
    },
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
    if (!formData.phoneNumber.trim()) return "Phone number is required";
    if (!formData.vitEmail.trim()) return "VIT email is required";
    if (!validateEmail(formData.vitEmail)) return "Please enter a valid VIT email (@vitstudent.ac.in)";

    // Helper for validation
    const validatePreferenceHelper = (pref: any, prefName: string) => {
        if (!pref.dept) return `${prefName}: Department is required`;
        
        const config = deptConfig[pref.dept];
        if (!config) return `${prefName}: Invalid department selected`;

        // Check Questions
        for (let i = 0; i < config.questions.length; i++) {
            const answer = pref.answers[`q${i}`];
            if (!answer || !answer.trim()) {
                // Returns first missing question error
                // Use a truncated version of the question for the error message
                const qShort = config.questions[i].length > 30 ? config.questions[i].substring(0, 30) + "..." : config.questions[i];
                return `${prefName}: Answer required for "${qShort}"`;
            }
        }

        // Check Projects
        if (config.project?.required && !pref.projects.trim()) {
            return `${prefName}: ${config.project.label} is required`;
        }
        if (config.projectLink?.required && !pref.projectLink.trim()) {
            return `${prefName}: ${config.projectLink.label} is required`;
        }
        if (config.github?.required && !pref.githubProfile.trim()) {
            return `${prefName}: GitHub Profile is required`;
        }
        
        return null;
    };

    const p1Error = validatePreferenceHelper(formData.preference1, "Preference 1");
    if (p1Error) return p1Error;

    const p2Error = validatePreferenceHelper(formData.preference2, "Preference 2");
    if (p2Error) return p2Error;

    // Check if both preferences have the same department
    if (formData.preference1.dept && formData.preference2.dept && formData.preference1.dept === formData.preference2.dept) {
      return "Preference 1 and Preference 2 cannot have the same department";
    }

    // Personal questions validation
    if (!formData.personalQuestions.q1.trim()) return "All personal questions are required";
    if (!formData.personalQuestions.q2.trim()) return "All personal questions are required";

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
      const res = await fetch("/api/joinus", {
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
        phoneNumber: "",
        vitEmail: "",
        preference1: {
          dept: "",
          projects: "",
          projectLink: "",
          githubProfile: "",
          answers: {},
        },
        preference2: {
          dept: "",
          projects: "",
          projectLink: "",
          githubProfile: "",
          answers: {},
        },
        personalQuestions: { q1: "", q2: "" },
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

  const updateAnswer = (
    pref: "preference1" | "preference2",
    qIndex: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [pref]: {
        ...prev[pref],
        answers: {
          ...prev[pref].answers,
          [`q${qIndex}`]: value,
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
            {technicalDepts.map((dept) => {
                 const isDisabled = pref === "preference2" && formData.preference1.dept === dept;
                 return <option key={dept} value={dept} className="bg-black text-white" disabled={isDisabled}>{dept} {isDisabled ? "(Selected)" : ""}</option>
            })}
            <option disabled className="bg-gray-800 text-gray-400">───── Non-Technical ─────</option>
            {nonTechnicalDepts.map((dept) => {
                 const isDisabled = pref === "preference2" && formData.preference1.dept === dept;
                 return <option key={dept} value={dept} className="bg-black text-white" disabled={isDisabled}>{dept} {isDisabled ? "(Selected)" : ""}</option>
            })}
          </select>
          {pref === "preference2" && formData.preference1.dept && (
            <p className="text-xs text-yellow-500 mt-1">
              Note: {formData.preference1.dept} is already selected in Preference 1
            </p>
          )}
        </div>

        {/* Dynamic Fields */}
        {(() => {
          const deptKey = formData[pref].dept;
          const config = deptConfig[deptKey];
          if (!config) return null;

          return (
            <>
               {config.project && (
                <div className="space-y-2">
                  <Label htmlFor={`${pref}-projects`} className="text-white">
                    {config.project.label} <span className="text-yellow-500">*</span>
                  </Label>
                  <Textarea
                    id={`${pref}-projects`}
                    value={formData[pref].projects}
                    onChange={(e) => updatePreference(pref, "projects", e.target.value)}
                    placeholder={config.project.placeholder}
                    className="min-h-[100px] text-white placeholder:text-muted-foreground"
                    required
                  />
                </div>
               )}

               {config.projectLink && (
                <div className="space-y-2">
                  <Label htmlFor={`${pref}-projectLink`} className="text-white">
                    {config.projectLink.label} {config.projectLink.required && <span className="text-yellow-500">*</span>}
                  </Label>
                  <Textarea
                    id={`${pref}-projectLink`}
                    value={formData[pref].projectLink || ""}
                    onChange={(e) => updatePreference(pref, "projectLink", e.target.value)}
                    placeholder={config.projectLink.placeholder}
                    className="min-h-[60px] text-white placeholder:text-muted-foreground"
                    required={config.projectLink.required}
                  />
                </div>
               )}

               {config.github && (
                <div className="space-y-2">
                  <Label htmlFor={`${pref}-githubProfile`} className="text-white">
                    GitHub Profile {config.github.required && <span className="text-yellow-500">*</span>}
                  </Label>
                  <Input
                    id={`${pref}-githubProfile`}
                    type="url"
                    value={formData[pref].githubProfile || ""}
                    onChange={(e) => updatePreference(pref, "githubProfile", e.target.value)}
                    placeholder="https://github.com/yourusername"
                    className="text-white placeholder:text-muted-foreground"
                    required={config.github.required}
                  />
                </div>
               )}

               {/* Dynamic Questions */}
               <div className="space-y-4 mt-6">
                 {config.questions.map((q, idx) => (
                    <div key={idx} className="space-y-2">
                        <Label className="text-white text-sm">
                            {q} <span className="text-yellow-500">*</span>
                        </Label>
                        <Textarea
                            value={formData[pref].answers[`q${idx}`] || ""}
                            onChange={(e) => updateAnswer(pref, idx, e.target.value)}
                            placeholder="Your answer..."
                            className="min-h-[80px] text-white placeholder:text-muted-foreground"
                            required
                        />
                    </div>
                 ))}
               </div>
            </>
          );
        })()}
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
          <Link href="/joinus">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-gradient mb-4">
            Join AWS Cloud Club VIT-C
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Fill out the form below to join us.
          </p>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 text-sm font-semibold">
              ⚠️ Important: If you submit multiple times, only the most recent one will be considered.
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
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-white">
                    Phone Number <span className="text-yellow-500">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="Enter your phone number"
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

          {/* Preferences - Stacked */}
          <div className="grid grid-cols-1 gap-6">
            {renderPreferenceForm("preference1", "Preference 1")}
            {renderPreferenceForm("preference2", "Preference 2")}
          </div>

          {/* Personal Questions */}
          <Card className="bg-metal-glossy border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gradient">General Questions</CardTitle>
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
            
            <CardContent className="space-y-4">
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
