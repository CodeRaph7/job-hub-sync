
export type UserRole = 'jobSeeker' | 'company';

export type ApplicationStatus = 'pending' | 'accepted' | 'declined';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
}

export interface JobSeeker {
  id: string;
  name: string;
  avatar: string;
  title: string;
  skills: string[];
  experience: string;
  location: string;
}

export interface Application {
  id: string;
  jobSeekerId: string;
  jobSeeker?: JobSeeker;
  companyId: string;
  company?: Company;
  jobTitle: string;
  dateApplied: string;
  status: ApplicationStatus;
  notes?: string;
}

export interface HireRequest {
  id: string;
  jobSeekerId: string;
  jobSeeker?: JobSeeker;
  companyId: string;
  company?: Company;
  jobTitle: string;
  dateRequested: string;
  status: ApplicationStatus;
  notes?: string;
}
