
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/contexts/UserContext';
import { User, UserRole } from '@/types/hiring';
import { UserIcon, Settings, LogOut } from 'lucide-react';

interface UserMenuProps {
  onProfileClick: () => void;
  onSettingsClick: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onProfileClick, onSettingsClick }) => {
  const { user, toggleUserRole } = useUser();

  const getUserInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getRoleText = (role: UserRole): string => {
    return role === 'jobSeeker' ? 'Job Seeker' : 'Company';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-2 p-1 rounded-full transition-colors hover:bg-hiring-muted">
          <Avatar className="h-8 w-8 border border-hiring-border">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden md:inline">{user.name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 animate-fade-in">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onProfileClick} className="cursor-pointer">
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSettingsClick} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleUserRole} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Switch to {user.role === 'jobSeeker' ? 'Company' : 'Job Seeker'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
