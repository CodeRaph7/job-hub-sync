
import React from 'react';
import { Application } from '@/types/hiring';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import { Calendar, Building } from 'lucide-react';
import { formatDate } from '@/lib/formatters';

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const { company, jobTitle, dateApplied, status, notes } = application;
  
  return (
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
      <CardFooter className="pt-2 text-xs text-hiring-text/60 flex items-center">
        <Calendar className="w-3.5 h-3.5 mr-1" />
        Applied on {formatDate(dateApplied)}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
