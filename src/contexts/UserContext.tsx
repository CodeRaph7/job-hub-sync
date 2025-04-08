
import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '@/types/hiring';
import { currentUser } from '@/data/mockData';
import { toast } from '@/components/ui/sonner';

interface UserContextType {
  user: User;
  toggleUserRole: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(currentUser);

  const toggleUserRole = () => {
    const newRole: UserRole = user.role === 'jobSeeker' ? 'company' : 'jobSeeker';
    setUser({ ...user, role: newRole });
    toast.success(`Switched to ${newRole === 'jobSeeker' ? 'Job Seeker' : 'Company'} view`);
  };

  const updateUser = (updatedUser: Partial<User>) => {
    setUser({ ...user, ...updatedUser });
    toast.success("Profile updated successfully");
  };

  return (
    <UserContext.Provider value={{ user, toggleUserRole, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
