
import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useHiring } from '@/contexts/HiringContext';
import { Chat as ChatType, ChatMessage, Company, JobSeeker } from '@/types/hiring';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Send } from 'lucide-react';

interface ChatProps {
  hireRequestId: string;
  company?: Company;
  jobSeeker?: JobSeeker;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Chat: React.FC<ChatProps> = ({ 
  hireRequestId, 
  company, 
  jobSeeker,
  open, 
  onOpenChange 
}) => {
  const { user } = useUser();
  const { getChat, sendMessage, openChatForHireRequest } = useHiring();
  const [newMessage, setNewMessage] = useState('');
  const [chatId, setChatId] = useState<string | undefined>();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isCompany = user.role === 'company';
  const chat = chatId ? getChat(hireRequestId) : undefined;
  const messages = chat?.messages || [];
  
  // Initialize chat when opening
  useEffect(() => {
    if (open && !chatId) {
      const id = openChatForHireRequest(hireRequestId);
      if (id) {
        setChatId(id);
      }
    }
  }, [open, hireRequestId, openChatForHireRequest, chatId]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);
  
  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !chatId) return;
    
    sendMessage(
      chatId,
      user.id,
      user.name,
      user.avatar,
      newMessage.trim()
    );
    
    setNewMessage('');
  };
  
  const getChatPartnerName = () => {
    if (isCompany) {
      return jobSeeker?.name || 'Candidate';
    } else {
      return company?.name || 'Company';
    }
  };
  
  const formatMessageTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return 'recently';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[80vh] max-h-[700px] flex flex-col p-0 gap-0 animate-slide-in-right">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-hiring-primary" />
            <span>Chat with {getChatPartnerName()}</span>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-hiring-text/50 py-8">
                <MessageSquare className="w-10 h-10 mx-auto opacity-20" />
                <p className="mt-2">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg: ChatMessage) => {
                const isCurrentUser = msg.senderId === user.id;
                
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src={msg.senderAvatar} />
                      <AvatarFallback>
                        {msg.senderName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`max-w-[75%] ${isCurrentUser ? 'text-right' : ''}`}>
                      <div
                        className={`px-3 py-2 rounded-lg ${
                          isCurrentUser
                            ? 'bg-hiring-primary text-white'
                            : 'bg-hiring-muted/80 text-hiring-text'
                        }`}
                      >
                        {msg.message}
                      </div>
                      
                      <div className="text-xs text-hiring-text/50 mt-1 px-1">
                        {isCurrentUser ? 'You' : msg.senderName} · {formatMessageTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
        
        <form 
          onSubmit={handleSendMessage}
          className="border-t p-4 flex gap-2 items-center"
        >
          <Input
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!newMessage.trim()}
            className="bg-hiring-primary hover:bg-hiring-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Chat;
