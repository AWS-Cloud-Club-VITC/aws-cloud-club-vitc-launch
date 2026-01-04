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
    project: { label: "Project", placeholder: "Describe your best project. If you are a fresher or have no projects, enter NONE", required: true },
    projectLink: { label: "Project URL", placeholder: "Project URL (GitHub Repo/Deployed Link)", required: false },
    github: { required: true },
    questions: [
      "Why do you want to join this department?",
      "Brief description of your experience in this field?",
      `In simple terms, explain what a machine learning model is and how it improves over time.
      (You may use an example from daily life or any project you have seen/worked on.)`,
      `Have you used or explored any AWS AI/ML services (for example: SageMaker, Rekognition, Textract, Bedrock, etc.)? If yes, briefly explain how one service works or where it can be used.`
    ]
  },
  "Web Development": {
    label: "Web Development",
    isTechnical: true,
    project: { label: "Project", placeholder: "Describe your best project. If you are a fresher or have no projects, enter NONE", required: true },
    projectLink: { label: "Project URL", placeholder: "Project URL (GitHub Repo/Deployed Link)", required: false },
    github: { required: true },
    questions: [
      "Why do you want to join this department?",
      "Brief description of your experience in this field?",
      "Have you ever tried creating a webpage or learning any web technology?",
      "What is the difference between typescript and javascript?"
    ]
  },
  "Network Security": {
    label: "Network Security",
    isTechnical: true,
    project: { label: "Project", placeholder: "Describe your networking or security related projects.", required: true },
    projectLink: { label: "Project URL", placeholder: "Project URL (GitHub/Deployed)", required: false },
    github: { required: true },
    questions: [
      "Why do you want to join this department?",
      "Brief description of your experience in this field?",
      "Have you heard of terms like firewall, authentication, or permissions? If yes, what do you think they do?",
      "Describe a security incident you've read about or experienced and what you learned from it"
    ]
  },
  "Cloud & Infrastructure Engineering": {
    label: "Cloud & Infrastructure Engineering",
    isTechnical: true,
    project: { label: "Project", placeholder: "Describe your cloud/infrastructure related projects. If you are a fresher or have no projects, enter NONE", required: true },
    projectLink: { label: "Project URL", placeholder: "Project URL (GitHub/Deployed Link)", required: false },
    github: { required: true },
    questions: [
      "What do you understand by cloud computing?",
      "Have you heard of AWS or any cloud provider? Name one service and its general use.",
      "What do you think a server does in an application?",
      "Why do you think companies prefer cloud platforms over local servers?",
    ]
  },
  "Competitive Programming": {
    label: "Competitive Programming",
    isTechnical: true,
    project: { label: "CP Profile Links (LeetCode, HackerRank, etc.)", placeholder: "Enter your profile links for LeetCode, HackerRank, CodeChef, etc.", required: true },
    github: { required: true },
    questions: [
      "Why do you want to join this department?",
      "Brief description of your experience in this field?",
      "Your solution works correctly for small inputs but becomes very slow for large inputs. What would you try to improve or change?",
      "You are stuck on a programming problem for a long time. How do you decide what to try next to move closer to a solution?"
    ]
  },
  "UI/UX Designing": {
    label: "UI/UX Designing",
    isTechnical: true,
    project: { label: "Portfolio Links (Figma/Drive)", placeholder: "Paste links to your portfolio (Figma, Behance, Drive, etc.)", required: true },
    questions: [
      "Why do you want to join this department?",
      "Brief description of your experience in this field?",
      "Users say an app feels confusing to use. What would you try to improve first?",
      "How do YOU understand what \"good user experience\" means?"
    ]
  },

  // NON-TECHNICAL DEPARTMENTS
  "Social Media & Marketing": {
    label: "Social Media & Marketing",
    isTechnical: false,
    questions: [
      "Why do you want to join this department?",
      "How would you promote a college event using social media?",
      "A video has low reach. What changes would you make?",
      "What do you understand by marketing in the context of a student club or community?"
    ]
  },
  "Graphic Design & Video Editing": {
    label: "Graphic Design & Video Editing",
    isTechnical: false,
    project: { label: "Links to your portfolio/Work", placeholder: "Share your portfolio links or Drive links", required: true },
    questions: [
      "Why do you want to join this department?",
      `Which design or editing tools have you heard of or used?
      (Examples: Canva, Photoshop, Illustrator, Figma, Premiere Pro, After Effects, CapCut, DaVinci Resolve — any level is fine)`,
      "Approximately how many reels or videos can you realistically work on in a month?",
      "Do you have experience with motion design or motion graphics?",
      "What type of content are you most comfortable creating?"
    ]
  },
  "Sponsorship & Outreach": {
    label: "Sponsorship & Outreach",
    isTechnical: false,
    questions: [
      "Why do you want to join this department?",
      "How important do you think personalization is in outreach messages, and why?",
      "What do you believe makes an outreach message sound professional and trustworthy?"
    ]
  },
  "Event Management": {
    label: "Event Management",
    isTechnical: false,
    questions: [
      "Why do you want to join this department?",
      "Describe an event you have organized or volunteered for. What was your role?",
      "How do you handle last-minute changes or crises during an ongoing event?"
    ]
  }
};

export const technicalDepts = Object.values(deptConfig).filter(d => d.isTechnical).map(d => d.label);
export const nonTechnicalDepts = Object.values(deptConfig).filter(d => !d.isTechnical).map(d => d.label);

export const departments = [...technicalDepts, ...nonTechnicalDepts];
