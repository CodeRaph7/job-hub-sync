
export type UserRole = 'jobSeeker' | 'company';

export type ApplicationStatus = 'pending' | 'accepted' | 'declined';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  cv?: CV;
}

export interface CV {
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear?: string;
  description?: string;
}

export interface Language {
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'fluent' | 'native';
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
  chatId?: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Chat {
  id: string;
  hireRequestId: string;
  jobSeekerId: string;
  companyId: string;
  messages: ChatMessage[];
  lastMessageTimestamp: string;
}
