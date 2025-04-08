
import React from 'react';
import { ApplicationStatus } from '@/types/hiring';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'pending':
        return 'bg-hiring-warning/20 text-hiring-warning border-hiring-warning';
      case 'accepted':
        return 'bg-hiring-success/20 text-hiring-success border-hiring-success';
      case 'declined':
        return 'bg-hiring-danger/20 text-hiring-danger border-hiring-danger';
      default:
        return 'bg-hiring-muted text-hiring-text';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'declined':
        return 'Declined';
      default:
        return 'Unknown';
    }
  };

  return (
    <Badge variant="outline" className={cn(
      'font-medium border px-2.5 py-0.5 text-xs capitalize', 
      getStatusStyle(),
      className
    )}>
      {getStatusText()}
    </Badge>
  );
};

export default StatusBadge;
