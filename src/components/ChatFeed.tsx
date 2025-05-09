
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import ChatMessage from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "../data/chatScript";

interface ChatFeedProps {
  messages: ChatMessageType[];
  className?: string;
  typingMessage?: number | null;
}

const ChatFeed = ({ messages, className, typingMessage }: ChatFeedProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-4 overflow-y-auto flex-1",
        className
      )}
    >
      {messages.map((message, index) => (
        <ChatMessage
          key={message.id}
          message={message.text}
          isAI={message.isAI}
          animationDelay={index * 0.15} // Increased from 0.1 to 0.15
          typing={typingMessage === message.id}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatFeed;
