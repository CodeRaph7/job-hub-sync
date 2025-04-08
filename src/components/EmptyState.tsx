
import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-hiring-border bg-hiring-muted/30 min-h-[300px] animate-fade-in">
      {icon && <div className="text-hiring-muted mb-4 text-4xl">{icon}</div>}
      <h3 className="text-xl font-medium text-hiring-text mb-2">{title}</h3>
      <p className="text-hiring-text/70 mb-6 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="bg-hiring-primary hover:bg-hiring-primary/80">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
