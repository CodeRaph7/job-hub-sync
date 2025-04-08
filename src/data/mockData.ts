
import { Application, Company, HireRequest, JobSeeker, User } from "@/types/hiring";

export const currentUser: User = {
  id: "user-1",
  name: "Thomas Anderson",
  email: "tanderson@example.com",
  avatar: "https://i.pravatar.cc/150?u=user1",
  role: "jobSeeker"
};

export const companies: Company[] = [
  {
    id: "company-1",
    name: "TechCorp",
    logo: "https://logo.clearbit.com/google.com",
    industry: "Technology",
    location: "San Francisco, CA"
  },
  {
    id: "company-2",
    name: "FinanceHub",
    logo: "https://logo.clearbit.com/amazon.com",
    industry: "Finance",
    location: "New York, NY"
  },
  {
    id: "company-3",
    name: "DesignStudio",
    logo: "https://logo.clearbit.com/apple.com",
    industry: "Design",
    location: "Los Angeles, CA"
  },
  {
    id: "company-4",
    name: "HealthTech",
    logo: "https://logo.clearbit.com/microsoft.com",
    industry: "Healthcare",
    location: "Boston, MA"
  },
  {
    id: "company-5",
    name: "EduTech",
    logo: "https://logo.clearbit.com/facebook.com",
    industry: "Education",
    location: "Chicago, IL"
  }
];

export const jobSeekers: JobSeeker[] = [
  {
    id: "jobseeker-1",
    name: "Anna Smith",
    avatar: "https://i.pravatar.cc/150?u=jobseeker1",
    title: "Senior Software Engineer",
    skills: ["JavaScript", "React", "Node.js"],
    experience: "8 years",
    location: "San Francisco, CA"
  },
  {
    id: "jobseeker-2",
    name: "John Davis",
    avatar: "https://i.pravatar.cc/150?u=jobseeker2",
    title: "UX Designer",
    skills: ["Figma", "Sketch", "UI/UX"],
    experience: "5 years",
    location: "New York, NY"
  },
  {
    id: "jobseeker-3",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?u=jobseeker3",
    title: "Product Manager",
    skills: ["Agile", "Product Strategy", "User Research"],
    experience: "6 years",
    location: "Seattle, WA"
  },
  {
    id: "jobseeker-4",
    name: "Michael Wong",
    avatar: "https://i.pravatar.cc/150?u=jobseeker4",
    title: "Data Scientist",
    skills: ["Python", "Machine Learning", "SQL"],
    experience: "4 years",
    location: "Austin, TX"
  },
  {
    id: "jobseeker-5",
    name: "Emily Chen",
    avatar: "https://i.pravatar.cc/150?u=jobseeker5",
    title: "Frontend Developer",
    skills: ["React", "TypeScript", "CSS"],
    experience: "3 years",
    location: "Portland, OR"
  }
];

export const jobSeekerApplications: Application[] = [
  {
    id: "app-1",
    jobSeekerId: "jobseeker-1",
    companyId: "company-1",
    company: companies[0],
    jobTitle: "Senior Frontend Engineer",
    dateApplied: "2025-03-15",
    status: "pending",
    notes: "Waiting for feedback after technical interview"
  },
  {
    id: "app-2",
    jobSeekerId: "jobseeker-1",
    companyId: "company-2",
    company: companies[1],
    jobTitle: "Lead Developer",
    dateApplied: "2025-03-10",
    status: "accepted",
    notes: "Offer received, pending decision"
  },
  {
    id: "app-3",
    jobSeekerId: "jobseeker-1",
    companyId: "company-3",
    company: companies[2],
    jobTitle: "Full Stack Developer",
    dateApplied: "2025-03-05",
    status: "declined",
    notes: "Position filled by another candidate"
  }
];

export const jobSeekerHireRequests: HireRequest[] = [
  {
    id: "hire-1",
    jobSeekerId: "jobseeker-1",
    companyId: "company-4",
    company: companies[3],
    jobTitle: "Senior Frontend Engineer",
    dateRequested: "2025-03-18",
    status: "pending",
    notes: "Company reached out after seeing profile"
  },
  {
    id: "hire-2",
    jobSeekerId: "jobseeker-1",
    companyId: "company-5",
    company: companies[4],
    jobTitle: "Technical Lead",
    dateRequested: "2025-03-16",
    status: "pending",
    notes: "Interested in discussing opportunity"
  }
];

export const companyApplications: Application[] = [
  {
    id: "comp-app-1",
    companyId: "company-1",
    jobSeekerId: "jobseeker-2",
    jobSeeker: jobSeekers[1],
    jobTitle: "UX Designer",
    dateApplied: "2025-03-17",
    status: "pending",
    notes: "Portfolio looks promising"
  },
  {
    id: "comp-app-2",
    companyId: "company-1",
    jobSeekerId: "jobseeker-3",
    jobSeeker: jobSeekers[2],
    jobTitle: "Product Manager",
    dateApplied: "2025-03-15",
    status: "pending",
    notes: "Good experience in similar industry"
  },
  {
    id: "comp-app-3",
    companyId: "company-1",
    jobSeekerId: "jobseeker-4",
    jobSeeker: jobSeekers[3],
    jobTitle: "Data Scientist",
    dateApplied: "2025-03-12",
    status: "pending",
    notes: "Technical skills match our requirements"
  }
];

export const companyHireRequests: HireRequest[] = [
  {
    id: "comp-hire-1",
    companyId: "company-1",
    jobSeekerId: "jobseeker-5",
    jobSeeker: jobSeekers[4],
    jobTitle: "Frontend Developer",
    dateRequested: "2025-03-18",
    status: "accepted",
    notes: "Candidate has accepted our offer"
  },
  {
    id: "comp-hire-2",
    companyId: "company-1",
    jobSeekerId: "jobseeker-1",
    jobSeeker: jobSeekers[0],
    jobTitle: "Senior Software Engineer",
    dateRequested: "2025-03-15",
    status: "pending",
    notes: "Waiting for candidate response"
  }
];
