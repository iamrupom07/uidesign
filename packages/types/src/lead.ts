export type LeadStatus = "New" | "Contacted" | "Proposal Sent" | "Closed Won" | "Closed Lost";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company: string;
  value: number;
  status: LeadStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateLeadInput {
  name: string;
  email: string;
  phone?: string;
  company: string;
  value?: number;
  status?: LeadStatus;
  notes?: string;
}

export interface UpdateLeadInput {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  value?: number;
  status?: LeadStatus;
  notes?: string;
}
