export type SubmissionType =
  | "CONTACT"
  | "RFP"
  | "AUDIT"
  | "CONSULTATION"
  | "TRAINING"
  | "RESOURCE";

export type SubmissionStatus =
  | "NEW"
  | "UNDER_REVIEW"
  | "RESPONDED"
  | "CONVERTED"
  | "ARCHIVED";

export interface Submission {
  id: string;
  type: SubmissionType | string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject?: string | null;
  message: string;
  sector?: string | null;
  budget?: string | null;
  startDate?: string | null;
  scope?: string | null;
  files?: string | null;
  status: SubmissionStatus | string;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateSubmissionInput {
  type?: SubmissionType | string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  sector?: string;
  budget?: string;
  startDate?: string;
  scope?: string;
  files?: string;
  notes?: string;
}

export interface UpdateSubmissionInput {
  type?: SubmissionType | string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  sector?: string;
  budget?: string;
  startDate?: string;
  scope?: string;
  files?: string;
  status?: SubmissionStatus | string;
  notes?: string;
}

export interface SubmissionStats {
  total: number;
  new: number;
  underReview: number;
  responded: number;
  converted: number;
  archived: number;
  rfpCount: number;
  contactCount: number;
  consultationCount: number;
  trainingCount: number;
}
