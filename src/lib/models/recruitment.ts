// Recruitment form data model
export interface Preference {
  dept: string;
  projects?: string;
  projectLink?: string;
  githubProfile?: string;
  technicalQuestions: {
    q1: string;
    q2: string;
  };
}

export interface RecruitmentFormData {
  name: string;
  regno: string;
  phoneNumber: string;
  vitEmail: string;
  preference1: Preference;
  preference2: Preference;
  personalQuestions: {
    q1: string;
    q2: string;
  };
  linkedinProfile: string;
  whyJoin: string;
  submittedAt: Date;
}

