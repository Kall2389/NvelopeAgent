import React from 'react';
import { User } from 'lucide-react';

interface ChatAvatarProps {
  isAI: boolean;
  animationDelay?: number;
}

const ChatAvatar: React.FC<ChatAvatarProps> = ({ isAI, animationDelay = 0 }) => {
  return (
    <div 
      className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isAI ? 'bg-transparent' : 'bg-secondary'
      }`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {isAI ? (
        <img 
          src="/girl_bot.png" 
          alt="AI Assistant" 
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <User className="w-5 h-5" />
      )}
    </div>
  );
};

export default ChatAvatar;
