
import React, { useState } from 'react';
import { HireRequest, ApplicationStatus } from '@/types/hiring';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import { ActionButtons } from '@/components/ActionButtons';
import { Calendar, Building, MessageSquare } from 'lucide-react';
import { formatDate } from '@/lib/formatters';
import { useHiring } from '@/contexts/HiringContext';
import { Button } from '@/components/ui/button';
import Chat from '@/components/Chat';

interface HireRequestCardProps {
  hireRequest: HireRequest;
}

const HireRequestCard: React.FC<HireRequestCardProps> = ({ hireRequest }) => {
  const { company, jobTitle, dateRequested, status, notes } = hireRequest;
  const { updateHireRequestStatus } = useHiring();
  const [chatOpen, setChatOpen] = useState(false);
  
  const handleAccept = () => {
    updateHireRequestStatus(hireRequest.id, 'accepted', false);
  };

  const handleDecline = () => {
    updateHireRequestStatus(hireRequest.id, 'declined', false);
  };
  
  const isPending = status === 'pending';
  const isAccepted = status === 'accepted';
  
  return (
    <>
      <Card className="w-full hover:shadow-md transition-shadow animate-slide-in">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {company?.logo && (
                <img 
                  src={company.logo} 
                  alt={company?.name || 'Company logo'} 
                  className="w-10 h-10 rounded-md object-cover"
                />
              )}
              <div>
                <CardTitle className="text-lg">{jobTitle}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <Building className="w-3.5 h-3.5" />
                  <span>{company?.name || 'Unknown Company'}</span>
                </CardDescription>
              </div>
            </div>
            <StatusBadge status={status} />
          </div>
        </CardHeader>
        <CardContent className="pb-2 text-sm">
          {company?.location && (
            <div className="text-hiring-text/80 mb-2">
              {company.location}
            </div>
          )}
          {notes && <p className="text-hiring-text/70 italic">{notes}</p>}
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3 pt-3 border-t border-hiring-border">
          <div className="flex justify-between items-center w-full">
            <div className="text-xs text-hiring-text/60 flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              Requested on {formatDate(dateRequested)}
            </div>
            
            {isAccepted && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-hiring-primary text-xs"
                onClick={() => setChatOpen(true)}
              >
                <MessageSquare className="w-3.5 h-3.5 mr-1" />
                Chat
              </Button>
            )}
          </div>
          
          {isPending && (
            <ActionButtons
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          )}
        </CardFooter>
      </Card>
      
      <Chat
        hireRequestId={hireRequest.id}
        company={company}
        open={chatOpen}
        onOpenChange={setChatOpen}
      />
    </>
  );
};

export default HireRequestCard;
