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

const technicalDepts = [
  "AI & Machine Learning",
  "Web Development",
  "Network & Security",
  "Competitive Programming",
  "UI/UX",
];

const nonTechnicalDepts = [
  "Designing",
  "Content Writing & Documentation",
  "Social Media & Marketing",
  "Event Management",
  "Sponsorship & Outreach",
];

const departments = [...technicalDepts, ...nonTechnicalDepts];

const technicalQuestions = [
  "Why did you choose this department?",
  "What experience do you have in this field?",
];

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
      technicalQuestions: {
        q1: "",
        q2: "",
      },
    },
    preference2: {
      dept: "",
      projects: "",
      projectLink: "",
      githubProfile: "",
      technicalQuestions: {
        q1: "",
        q2: "",
      },
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
        if (!pref.technicalQuestions.q1.trim()) return `${prefName}: "Why did you choose..." is required`;
        if (!pref.technicalQuestions.q2.trim()) return `${prefName}: "What experience..." is required`;

        const dept = pref.dept;
        
        if (["AI & Machine Learning", "Web Development"].includes(dept)) {
           if (!pref.projects.trim()) return `${prefName}: Project description is required`;
           if (!pref.projectLink.trim()) return `${prefName}: Project URL is required`;
           if (!pref.githubProfile.trim()) return `${prefName}: GitHub Profile is required`;
        }
        else if (dept === "Network & Security") {
            if (!pref.projects.trim()) return `${prefName}: Project description is required`;
            if (!pref.projectLink.trim()) return `${prefName}: Project Link is required`;
        }
        else if (dept === "Competitive Programming") {
           if (!pref.projectLink.trim()) return `${prefName}: GitHub Repo link is required`;
           if (!pref.projects.trim()) return `${prefName}: CP Profile links are required`;
        }
        else if (dept === "UI/UX") {
            if (!pref.projects.trim()) return `${prefName}: Portfolio links are required`;
        }
        else if (dept === "Designing") {
            if (!pref.projectLink.trim()) return `${prefName}: Portfolio link is required`;
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
        phoneNumber: "",
        vitEmail: "",
        preference1: {
          dept: "",
          projects: "",
          projectLink: "",
          githubProfile: "",
          technicalQuestions: { q1: "", q2: "" },
        },
        preference2: {
          dept: "",
          projects: "",
          projectLink: "",
          githubProfile: "",
          technicalQuestions: { q1: "", q2: "" },
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
          const dept = formData[pref].dept;
          if (!dept) return null;

          const isAiMlWeb = ["AI & Machine Learning", "Web Development"].includes(dept);
          const isNetwork = dept === "Network & Security";
          const isCP = dept === "Competitive Programming";
          const isUiUx = dept === "UI/UX";
          const isDesign = dept === "Designing";
          
          const showProjectText = isAiMlWeb || isNetwork || isCP || isUiUx;
          const showProjectLink = isAiMlWeb || isNetwork || isCP || isDesign;
          const showGithubProfile = isAiMlWeb; // Only for AI & ML and Web Development

          // Determine Labels and Placeholders
          let projectTextLabel = "Project Description";
          let projectLinkLabel = "Project Link";
          let projectTextPlaceholder = "Enter details...";
          
          if (isAiMlWeb) {
             projectTextLabel = "Project";
             projectLinkLabel = "Project URL (GitHub Repo/Deployed Link)";
             projectTextPlaceholder = "Describe your best project. If you are a fresher and have no projects, enter NONE";
          } else if (isNetwork) {
             projectLinkLabel = "Project URL (GitHub/Deployed)";
             projectTextPlaceholder = "Describe your networking or security related projects...";
          } else if (isCP) {
             projectLinkLabel = "GitHub Repository URL";
             projectTextLabel = "CP Profile Links (LeetCode, HackerRank, etc.)";
             projectTextPlaceholder = "Enter your profile links for LeetCode, HackerRank, CodeChef, etc.";
          } else if (isUiUx) {
             projectTextLabel = "Portfolio Links (Drive / Figma)";
             projectTextPlaceholder = "Paste links to your portfolio (Figma, Behance, Drive, etc.)";
          } else if (isDesign) {
             projectLinkLabel = "Portfolio Link (Drive)";
          }

          return (
            <>
               {showProjectText && (
                <div className="space-y-2">
                  <Label htmlFor={`${pref}-projects`} className="text-white">
                    {projectTextLabel} <span className="text-yellow-500">*</span>
                  </Label>
                  <Textarea
                    id={`${pref}-projects`}
                    value={formData[pref].projects}
                    onChange={(e) => updatePreference(pref, "projects", e.target.value)}
                    placeholder={projectTextPlaceholder}
                    className="min-h-[100px] text-white placeholder:text-muted-foreground"
                    required
                  />
                </div>
               )}

               {showProjectLink && (
                <div className="space-y-2">
                  <Label htmlFor={`${pref}-projectLink`} className="text-white">
                    {projectLinkLabel} <span className="text-yellow-500">*</span>
                  </Label>
                  <Textarea
                    id={`${pref}-projectLink`}
                    value={formData[pref].projectLink || ""}
                    onChange={(e) => updatePreference(pref, "projectLink", e.target.value)}
                    placeholder="https://..."
                    className="min-h-[60px] text-white placeholder:text-muted-foreground"
                    required
                  />
                </div>
               )}

               {showGithubProfile && (
                <div className="space-y-2">
                  <Label htmlFor={`${pref}-githubProfile`} className="text-white">
                    GitHub Profile <span className="text-yellow-500">*</span>
                  </Label>
                  <Input
                    id={`${pref}-githubProfile`}
                    type="url"
                    value={formData[pref].githubProfile || ""}
                    onChange={(e) => updatePreference(pref, "githubProfile", e.target.value)}
                    placeholder="https://github.com/yourusername"
                    className="text-white placeholder:text-muted-foreground"
                    required
                  />
                </div>
               )}
            </>
          );
        })()}

        {/* Technical Questions (Renamed to General/Specific Questions) */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white text-sm">
                Why did you choose this department? <span className="text-yellow-500">*</span>
            </Label>
            <Textarea
              value={formData[pref].technicalQuestions.q1}
              onChange={(e) => updateTechnicalQuestion(pref, "q1", e.target.value)}
              placeholder="Your answer..."
              className="min-h-[80px] text-white placeholder:text-muted-foreground"
              required
            />
          </div>
           <div className="space-y-2">
            <Label className="text-white text-sm">
                What experience do you have in this field? <span className="text-yellow-500">*</span>
            </Label>
            <Textarea
              value={formData[pref].technicalQuestions.q2}
              onChange={(e) => updateTechnicalQuestion(pref, "q2", e.target.value)}
              placeholder="Your answer..."
              className="min-h-[80px] text-white placeholder:text-muted-foreground"
              required
            />
          </div>
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
