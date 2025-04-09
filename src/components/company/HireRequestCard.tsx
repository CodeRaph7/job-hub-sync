
import React, { useState } from 'react';
import { HireRequest } from '@/types/hiring';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { Calendar, MessageSquare, User } from 'lucide-react';
import { formatDate } from '@/lib/formatters';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Chat from '@/components/Chat';

interface HireRequestCardProps {
  hireRequest: HireRequest;
}

const HireRequestCard: React.FC<HireRequestCardProps> = ({ hireRequest }) => {
  const { jobSeeker, jobTitle, dateRequested, status, notes } = hireRequest;
  const [chatOpen, setChatOpen] = useState(false);
  
  const isAccepted = status === 'accepted';
  
  return (
    <>
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
            Requested for: {jobTitle}
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
        <CardFooter className="pt-3 border-t border-hiring-border">
          <div className="flex justify-between items-center w-full">
            <div className="text-xs text-hiring-text/60 flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              Requested on {formatDate(dateRequested)}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-xs ${isAccepted ? 'text-hiring-primary' : 'text-hiring-text/30'}`}
              onClick={() => isAccepted && setChatOpen(true)}
              disabled={!isAccepted}
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1" />
              {isAccepted ? 'Chat' : 'Chat Unavailable'}
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {isAccepted && (
        <Chat
          hireRequestId={hireRequest.id}
          jobSeeker={jobSeeker}
          open={chatOpen}
          onOpenChange={setChatOpen}
        />
      )}
    </>
  );
};

export default HireRequestCard;
