
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Check, X } from 'lucide-react';

interface ActionButtonsProps {
  onAccept: () => void;
  onDecline: () => void;
  disabled?: boolean;
}

export function ActionButtons({ onAccept, onDecline, disabled = false }: ActionButtonsProps) {
  const [isAcceptOpen, setIsAcceptOpen] = React.useState(false);
  const [isDeclineOpen, setIsDeclineOpen] = React.useState(false);

  return (
    <div className="flex items-center gap-2">
      <Button 
        onClick={() => setIsAcceptOpen(true)} 
        size="sm" 
        className="bg-hiring-success hover:bg-hiring-success/80 text-white"
        disabled={disabled}
      >
        <Check className="w-4 h-4 mr-1" />
        Accept
      </Button>
      
      <Button 
        onClick={() => setIsDeclineOpen(true)} 
        size="sm" 
        variant="outline" 
        className="border-hiring-danger text-hiring-danger hover:bg-hiring-danger/10"
        disabled={disabled}
      >
        <X className="w-4 h-4 mr-1" />
        Decline
      </Button>

      <AlertDialog open={isAcceptOpen} onOpenChange={setIsAcceptOpen}>
        <AlertDialogContent className="animate-fade-in">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to accept this request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-hiring-success hover:bg-hiring-success/80"
              onClick={() => {
                onAccept();
                setIsAcceptOpen(false);
              }}
            >
              Yes, Accept
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isDeclineOpen} onOpenChange={setIsDeclineOpen}>
        <AlertDialogContent className="animate-fade-in">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Rejection</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to decline this request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-hiring-danger hover:bg-hiring-danger/80"
              onClick={() => {
                onDecline();
                setIsDeclineOpen(false);
              }}
            >
              Yes, Decline
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
