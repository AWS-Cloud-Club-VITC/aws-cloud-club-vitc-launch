// Recruitment form data model
export interface Preference {
  dept: string;
  projects: string;
  technicalQuestions: {
    q1: string;
    q2: string;
  };
}

export interface RecruitmentFormData {
  name: string;
  regno: string;
  vitEmail: string;
  preference1: Preference;
  preference2: Preference;
  personalQuestions: {
    q1: string;
    q2: string;
  };
  githubRepo: string;
  linkedinProfile: string;
  whyJoin: string;
  submittedAt: Date;
}

