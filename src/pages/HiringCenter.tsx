
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/contexts/UserContext';
import { useHiring } from '@/contexts/HiringContext';
import UserMenu from '@/components/UserMenu';
import ProfileModal from '@/components/ProfileModal';
import SettingsModal from '@/components/SettingsModal';
import EmptyState from '@/components/EmptyState';

// Job Seeker Components
import JobSeekerHireRequestCard from '@/components/jobseeker/HireRequestCard';
import JobSeekerApplicationCard from '@/components/jobseeker/ApplicationCard';

// Company Components
import CompanyHireRequestCard from '@/components/company/HireRequestCard';
import CompanyApplicationCard from '@/components/company/ApplicationCard';

// Icons
import { MessageSquare, Settings, User } from 'lucide-react';

const HiringCenter: React.FC = () => {
  const { user } = useUser();
  const { 
    jobSeekerApps, 
    jobSeekerHires,
    companyApps,
    companyHires
  } = useHiring();
  
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  
  const isJobSeeker = user.role === 'jobSeeker';
  
  const renderJobSeekerView = () => (
    <>
      <Tabs defaultValue="hire-requests" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="hire-requests">Hire Requests</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="hire-requests">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {jobSeekerHires.length > 0 ? (
              jobSeekerHires.map((hire) => (
                <JobSeekerHireRequestCard key={hire.id} hireRequest={hire} />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState
                  title="No Hire Requests"
                  description="You don't have any hire requests yet. Companies will appear here when they're interested in your profile."
                  icon={<User />}
                />
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="applications">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {jobSeekerApps.length > 0 ? (
              jobSeekerApps.map((application) => (
                <JobSeekerApplicationCard key={application.id} application={application} />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState
                  title="No Applications"
                  description="You haven't applied to any jobs yet. Your applications will appear here once you start applying."
                  icon={<User />}
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
  
  const renderCompanyView = () => (
    <>
      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="hire-requests">Hire Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="applications">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {companyApps.length > 0 ? (
              companyApps.map((application) => (
                <CompanyApplicationCard key={application.id} application={application} />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState
                  title="No Applications"
                  description="You don't have any applications yet. When job seekers apply to your positions, they'll appear here."
                  icon={<User />}
                />
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="hire-requests">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {companyHires.length > 0 ? (
              companyHires.map((hire) => (
                <CompanyHireRequestCard key={hire.id} hireRequest={hire} />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState
                  title="No Hire Requests"
                  description="You haven't sent any hire requests yet. When you reach out to candidates, they'll appear here."
                  icon={<User />}
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );

  return (
    <div className="min-h-screen bg-hiring-muted">
      <header className="bg-hiring-background shadow-sm py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-hiring-primary">Hiring Center</h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full bg-hiring-muted hover:bg-hiring-border transition-colors">
              <MessageSquare className="h-5 w-5 text-hiring-primary" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-hiring-accent rounded-full"></span>
            </button>
            <button 
              onClick={() => setSettingsModalOpen(true)}
              className="p-2 rounded-full bg-hiring-muted hover:bg-hiring-border transition-colors"
            >
              <Settings className="h-5 w-5 text-hiring-primary" />
            </button>
            <UserMenu 
              onProfileClick={() => setProfileModalOpen(true)}
              onSettingsClick={() => setSettingsModalOpen(true)}
            />
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-hiring-text">
            {isJobSeeker ? 'Job Seeker Dashboard' : 'Company Dashboard'}
          </h2>
          <div className="bg-hiring-background text-hiring-text/70 text-sm px-3 py-1 rounded-full border border-hiring-border">
            {isJobSeeker ? 'Job Seeker View' : 'Company View'}
          </div>
        </div>
        
        {isJobSeeker ? renderJobSeekerView() : renderCompanyView()}
      </main>
      
      <ProfileModal 
        open={profileModalOpen} 
        onOpenChange={setProfileModalOpen} 
      />
      
      <SettingsModal 
        open={settingsModalOpen} 
        onOpenChange={setSettingsModalOpen} 
      />
    </div>
  );
};

export default HiringCenter;
