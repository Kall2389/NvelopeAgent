import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ChatAvatar from "./ChatAvatar";

interface ChatMessageProps {
  message: string;
  isAI: boolean;
  animationDelay?: number;
  typing?: boolean;
}

const ChatMessage = ({
  message,
  isAI,
  animationDelay = 0,
  typing = false,
}: ChatMessageProps) => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(typing);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!typing) {
      setDisplayedMessage(message);
      return;
    }

    setIsTyping(true);

    if (currentIndex < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedMessage(message.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100 + Math.random() * 0.5 * message.length); // Increased from 35+50 to 100+100 for slower typing

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [typing, currentIndex, message]);

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 animate-fade-in",
        isAI ? "" : "flex-row-reverse"
      )}
      style={{ animationDelay: `${animationDelay * 1.5}s` }} // Increased delay multiplier by 1.5x
    >
      <ChatAvatar isAI={isAI} animationDelay={animationDelay * 1.5} />
      <div
        className={cn(
          "message-bubble max-w-[80%] text-sm sm:text-base shadow-sm",
          isAI
            ? "bg-transparent border-2 border-white/10"
            : "bg-transparent text-white border-2 border-white/10"
        )}
      >
        {isTyping ? (
          <p className="whitespace-pre-wrap">
            {displayedMessage}
            {isTyping && <span className="typing-animation"></span>}
          </p>
        ) : (
          <p className="whitespace-pre-wrap">{displayedMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
