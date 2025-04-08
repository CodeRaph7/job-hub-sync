
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/contexts/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onOpenChange }) => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-fade-in">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex justify-center">
              <Avatar className="h-20 w-20 border-2 border-hiring-border">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="avatar">Profile Picture URL</Label>
              <Input
                id="avatar"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-hiring-primary hover:bg-hiring-primary/80">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
