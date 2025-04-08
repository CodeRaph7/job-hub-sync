
import React from 'react';
import { Application, ApplicationStatus } from '@/types/hiring';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { ActionButtons } from '@/components/ActionButtons';
import { Calendar, MessageSquare, User } from 'lucide-react';
import { formatDate } from '@/lib/formatters';
import { useHiring } from '@/contexts/HiringContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const { jobSeeker, jobTitle, dateApplied, status, notes } = application;
  const { updateApplicationStatus } = useHiring();
  
  const handleAccept = () => {
    updateApplicationStatus(application.id, 'accepted', true);
  };

  const handleDecline = () => {
    updateApplicationStatus(application.id, 'declined', true);
  };
  
  const isPending = status === 'pending';
  
  return (
    <Card className="w-full hover:shadow-md transition-shadow animate-slide-in">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 border border-hiring-border">
              <AvatarImage 
                src={jobSeeker?.avatar} 
                alt={jobSeeker?.name || 'Candidate'} 
              />
              <AvatarFallback>{jobSeeker?.name?.charAt(0) || 'C'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{jobSeeker?.name || 'Anonymous Candidate'}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <User className="w-3.5 h-3.5" />
                <span>{jobSeeker?.title || 'No title'}</span>
              </CardDescription>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2 text-sm">
        <div className="text-hiring-text font-medium mb-1">
          Applied for: {jobTitle}
        </div>
        {jobSeeker?.skills && (
          <div className="flex flex-wrap gap-1 my-2">
            {jobSeeker.skills.map((skill, index) => (
              <span 
                key={index} 
                className="text-xs bg-hiring-primary/10 text-hiring-primary px-2 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        {notes && <p className="text-hiring-text/70 italic mt-2">{notes}</p>}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 pt-3 border-t border-hiring-border">
        <div className="flex justify-between items-center w-full">
          <div className="text-xs text-hiring-text/60 flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            Applied on {formatDate(dateApplied)}
          </div>
          <Button variant="ghost" size="sm" className="text-hiring-primary text-xs">
            <MessageSquare className="w-3.5 h-3.5 mr-1" />
            Chat
          </Button>
        </div>
        {isPending && (
          <ActionButtons
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
