export const deptConfig: Record<string, {
  label: string;
  isTechnical: boolean;
  project?: { label: string; placeholder: string; required: boolean };
  projectLink?: { label: string; placeholder: string; required: boolean };
  github?: { required: boolean };
  questions: string[];
}> = {
  // TECHNICAL DEPARTMENTS
  "AIML": {
    label: "AIML",
    isTechnical: true,
    project: { label: "Project", placeholder: "Describe your best project. If you are a fresher and have no projects, enter NONE", required: true },
    projectLink: { label: "Project URL", placeholder: "Project URL (GitHub Repo/Deployed Link)", required: false },
    github: { required: true },
    questions: [
      "Why did you choose this department?",
      "What experience do you have in this field?",
      "How do YOU understand what \"Machine Learning\" means?",
      "Have you heard of supervised vs unsupervised learning?"
    ]
  },
  "Web Development": {
    label: "Web Development",
    isTechnical: true,
    project: { label: "Project", placeholder: "Describe your best project...", required: true },
    projectLink: { label: "Project URL", placeholder: "Project URL (GitHub Repo/Deployed Link)", required: false },
    github: { required: true },
    questions: [
      "Why did you choose this department?",
      "What experience do you have in this field?",
      "Have you heard of supervised vs unsupervised learning?",
      "Have you ever tried creating a webpage or learning any web technology?"
    ]
  },
  "Network Security": {
    label: "Network Security",
    isTechnical: true,
    project: { label: "Project", placeholder: "Describe your networking or security related projects...", required: true },
    projectLink: { label: "Project URL", placeholder: "Project URL (GitHub/Deployed)", required: false },
    github: { required: true },
    questions: [
      "Why did you choose this department?",
      "What experience do you have in this field?",
      "You are hosting a web app on AWS and suddenly your bill spikes. What security-related causes would you investigate?",
      "Describe a security incident you've read about or experienced and what you learned from it"
    ]
  },
  "Competitive Programming": {
    label: "Competitive Programming",
    isTechnical: true,
    project: { label: "CP Profile Links (LeetCode, HackerRank, etc.)", placeholder: "Enter your profile links for LeetCode, HackerRank, CodeChef, etc.", required: true },
    github: { required: true },
    questions: [
      "Why did you choose this department?",
      "What experience do you have in this field?",
      "Your solution works correctly for small inputs but becomes very slow for large inputs. What would you try to improve or change?",
      "You are stuck on a programming problem for a long time. How do you decide what to try next to move closer to a solution?"
    ]
  },
  "UI/UX Designing": {
    label: "UI/UX Designing",
    isTechnical: true,
    project: { label: "Portfolio Links (Figma/Drive)", placeholder: "Paste links to your portfolio (Figma, Behance, Drive, etc.)", required: true },
    questions: [
      "Why did you choose this department?",
      "What experience do you have in this field?",
      "Users say an app feels confusing to use. What would you try to improve first?",
      "How do YOU understand what \"good user experience\" means?"
    ]
  },

  // NON-TECHNICAL DEPARTMENTS
  "Social Media & Video Editing": {
    label: "Social Media & Video Editing",
    isTechnical: false,
    questions: [
      "Why did you choose this department?",
      "How would you promote a college event using reels?",
      "A video has low reach. What changes would you make?"
    ]
  },
  "Design & Content": {
    label: "Design & Content",
    isTechnical: false,
    questions: [
      "Why did you choose this department?",
      "If asked to design a poster + caption for an event, what information would you need?",
      "What makes content readable and appealing?"
    ]
  },
  "Marketing & Outreach": {
    label: "Marketing & Outreach",
    isTechnical: false,
    questions: [
      "Why did you choose this department?",
      "Why do you think you are suitable for the Sponsorship Department?",
      "You need to get sponsorship for a college event, but the company says \"we already sponsored many events.\" What new idea will you propose to still convince them?"
    ]
  },
  "Event Management": {
    label: "Event Management",
    isTechnical: false,
    questions: [
      "Why did you choose this department?",
      "Describe an event you have organized or volunteered for. What was your role?",
      "How do you handle last-minute changes or crises during an ongoing event?"
    ]
  },
  "Sponsorship & Outreach": {
    label: "Sponsorship & Outreach",
    isTechnical: false,
    questions: [
      "How would you pitch AWS Cloud Club to a potential sponsor?",
      "Do you have any prior experience in outreach or cold emailing?",
      "Why do you want to join this dept?"
    ]
  }
};

export const technicalDepts = Object.values(deptConfig).filter(d => d.isTechnical).map(d => d.label);
export const nonTechnicalDepts = Object.values(deptConfig).filter(d => !d.isTechnical).map(d => d.label);

export const departments = [...technicalDepts, ...nonTechnicalDepts];
