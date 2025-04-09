
import React, { createContext, useContext, useState } from 'react';
import {
  jobSeekerApplications,
  jobSeekerHireRequests,
  companyApplications,
  companyHireRequests
} from '@/data/mockData';
import { Application, ApplicationStatus, HireRequest, Chat, ChatMessage } from '@/types/hiring';
import { toast } from 'sonner';

interface HiringContextType {
  jobSeekerApps: Application[];
  jobSeekerHires: HireRequest[];
  companyApps: Application[];
  companyHires: HireRequest[];
  chats: Chat[];
  updateApplicationStatus: (id: string, status: ApplicationStatus, isCompanyView: boolean) => void;
  updateHireRequestStatus: (id: string, status: ApplicationStatus, isCompanyView: boolean) => void;
  getChat: (hireRequestId: string) => Chat | undefined;
  sendMessage: (chatId: string, senderId: string, senderName: string, senderAvatar: string | undefined, message: string) => void;
  openChatForHireRequest: (hireRequestId: string) => string | undefined;
}

const HiringContext = createContext<HiringContextType | undefined>(undefined);

// Mock initial chats (empty array, will be populated when hire requests are accepted)
const initialChats: Chat[] = [];

export const HiringProvider = ({ children }: { children: React.ReactNode }) => {
  const [jobSeekerApps, setJobSeekerApps] = useState<Application[]>(jobSeekerApplications);
  const [jobSeekerHires, setJobSeekerHires] = useState<HireRequest[]>(jobSeekerHireRequests);
  const [companyApps, setCompanyApps] = useState<Application[]>(companyApplications);
  const [companyHires, setCompanyHires] = useState<HireRequest[]>(companyHireRequests);
  const [chats, setChats] = useState<Chat[]>(initialChats);

  const updateApplicationStatus = (id: string, status: ApplicationStatus, isCompanyView: boolean) => {
    if (isCompanyView) {
      setCompanyApps(apps => 
        apps.map(app => app.id === id ? { ...app, status } : app)
      );
    } else {
      setJobSeekerApps(apps => 
        apps.map(app => app.id === id ? { ...app, status } : app)
      );
    }
    
    const statusMessages = {
      accepted: "Application accepted",
      declined: "Application declined",
      pending: "Application status updated"
    };
    
    toast.success(statusMessages[status]);
  };

  const createChatForHireRequest = (hireRequest: HireRequest): string => {
    // Create a new chat
    const chatId = `chat-${Date.now()}`;
    const newChat: Chat = {
      id: chatId,
      hireRequestId: hireRequest.id,
      jobSeekerId: hireRequest.jobSeekerId,
      companyId: hireRequest.companyId,
      messages: [],
      lastMessageTimestamp: new Date().toISOString()
    };
    
    setChats(prevChats => [...prevChats, newChat]);
    
    // Return the chat ID
    return chatId;
  };

  const updateHireRequestStatus = (id: string, status: ApplicationStatus, isCompanyView: boolean) => {
    let updatedHireRequest: HireRequest | undefined;
    
    if (isCompanyView) {
      setCompanyHires(hires => 
        hires.map(hire => {
          if (hire.id === id) {
            updatedHireRequest = { ...hire, status };
            return updatedHireRequest;
          }
          return hire;
        })
      );
    } else {
      setJobSeekerHires(hires => 
        hires.map(hire => {
          if (hire.id === id) {
            updatedHireRequest = { ...hire, status };
            
            // If the request is accepted and there's no chat yet, create one
            if (status === 'accepted' && !hire.chatId) {
              const chatId = createChatForHireRequest({ ...hire, status });
              updatedHireRequest = { ...hire, status, chatId };
              return updatedHireRequest;
            }
            
            return { ...hire, status };
          }
          return hire;
        })
      );
    }
    
    const statusMessages = {
      accepted: "Hire request accepted",
      declined: "Hire request declined",
      pending: "Hire request status updated"
    };
    
    toast.success(statusMessages[status]);
    
    if (status === 'accepted' && !isCompanyView) {
      toast.info("Chat has been opened with the company");
    }
  };
  
  const getChat = (hireRequestId: string): Chat | undefined => {
    return chats.find(chat => chat.hireRequestId === hireRequestId);
  };
  
  const sendMessage = (chatId: string, senderId: string, senderName: string, senderAvatar: string | undefined, message: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      chatId,
      senderId,
      senderName,
      senderAvatar,
      message,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessageTimestamp: newMessage.timestamp
        };
      }
      return chat;
    }));
  };
  
  const openChatForHireRequest = (hireRequestId: string): string | undefined => {
    const chat = chats.find(chat => chat.hireRequestId === hireRequestId);
    if (chat) {
      return chat.id;
    }
    
    // Check if the hire request exists and is accepted
    const jobSeekerHire = jobSeekerHires.find(hire => hire.id === hireRequestId);
    const companyHire = companyHires.find(hire => hire.id === hireRequestId);
    const hireRequest = jobSeekerHire || companyHire;
    
    if (hireRequest && hireRequest.status === 'accepted') {
      // Create a chat if one doesn't exist yet
      const chatId = createChatForHireRequest(hireRequest);
      
      // Update the hire request with the chat ID
      if (jobSeekerHire) {
        setJobSeekerHires(hires => hires.map(hire => 
          hire.id === hireRequestId ? { ...hire, chatId } : hire
        ));
      } else if (companyHire) {
        setCompanyHires(hires => hires.map(hire => 
          hire.id === hireRequestId ? { ...hire, chatId } : hire
        ));
      }
      
      return chatId;
    }
    
    return undefined;
  };

  return (
    <HiringContext.Provider 
      value={{ 
        jobSeekerApps, 
        jobSeekerHires,
        companyApps,
        companyHires,
        chats,
        updateApplicationStatus,
        updateHireRequestStatus,
        getChat,
        sendMessage,
        openChatForHireRequest
      }}
    >
      {children}
    </HiringContext.Provider>
  );
};

export const useHiring = (): HiringContextType => {
  const context = useContext(HiringContext);
  if (context === undefined) {
    throw new Error('useHiring must be used within a HiringProvider');
  }
  return context;
};
