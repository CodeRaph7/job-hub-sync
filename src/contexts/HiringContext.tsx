
import React, { createContext, useContext, useState } from 'react';
import {
  jobSeekerApplications,
  jobSeekerHireRequests,
  companyApplications,
  companyHireRequests
} from '@/data/mockData';
import { Application, ApplicationStatus, HireRequest } from '@/types/hiring';
import { toast } from 'sonner';

interface HiringContextType {
  jobSeekerApps: Application[];
  jobSeekerHires: HireRequest[];
  companyApps: Application[];
  companyHires: HireRequest[];
  updateApplicationStatus: (id: string, status: ApplicationStatus, isCompanyView: boolean) => void;
  updateHireRequestStatus: (id: string, status: ApplicationStatus, isCompanyView: boolean) => void;
}

const HiringContext = createContext<HiringContextType | undefined>(undefined);

export const HiringProvider = ({ children }: { children: React.ReactNode }) => {
  const [jobSeekerApps, setJobSeekerApps] = useState<Application[]>(jobSeekerApplications);
  const [jobSeekerHires, setJobSeekerHires] = useState<HireRequest[]>(jobSeekerHireRequests);
  const [companyApps, setCompanyApps] = useState<Application[]>(companyApplications);
  const [companyHires, setCompanyHires] = useState<HireRequest[]>(companyHireRequests);

  const updateApplicationStatus = (id: string, status: ApplicationStatus, isCompanyView: boolean) => {
    if (isCompanyView) {
      setCompanyApps(apps => 
        apps.map(app => app.id === id ? { ...app, status } : app)
      );
    } else {
      setJobSeekerApps(apps => 
        apps.map(app => app.id === id ? { ...app, status } : app)
      );
    }
    
    const statusMessages = {
      accepted: "Application accepted",
      declined: "Application declined",
      pending: "Application status updated"
    };
    
    toast.success(statusMessages[status]);
  };

  const updateHireRequestStatus = (id: string, status: ApplicationStatus, isCompanyView: boolean) => {
    if (isCompanyView) {
      setCompanyHires(hires => 
        hires.map(hire => hire.id === id ? { ...hire, status } : hire)
      );
    } else {
      setJobSeekerHires(hires => 
        hires.map(hire => hire.id === id ? { ...hire, status } : hire)
      );
    }
    
    const statusMessages = {
      accepted: "Hire request accepted",
      declined: "Hire request declined",
      pending: "Hire request status updated"
    };
    
    toast.success(statusMessages[status]);
  };

  return (
    <HiringContext.Provider 
      value={{ 
        jobSeekerApps, 
        jobSeekerHires,
        companyApps,
        companyHires,
        updateApplicationStatus,
        updateHireRequestStatus
      }}
    >
      {children}
    </HiringContext.Provider>
  );
};

export const useHiring = (): HiringContextType => {
  const context = useContext(HiringContext);
  if (context === undefined) {
    throw new Error('useHiring must be used within a HiringProvider');
  }
  return context;
};
