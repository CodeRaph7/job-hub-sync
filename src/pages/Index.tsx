
import React from 'react';
import { UserProvider } from '@/contexts/UserContext';
import { HiringProvider } from '@/contexts/HiringContext';
import HiringCenter from './HiringCenter';

const Index = () => {
  return (
    <UserProvider>
      <HiringProvider>
        <HiringCenter />
      </HiringProvider>
    </UserProvider>
  );
};

export default Index;
