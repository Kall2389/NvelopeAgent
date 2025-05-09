import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Smile } from "lucide-react";
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
      setShowEmojiPicker(false);
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(prev => prev + emojiData.emoji);
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-4 border-t border-white/10 bg-background/50 backdrop-blur-sm"
      >
        
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-secondary/50 border-white/10 text-foreground placeholder:text-muted-foreground"
          disabled={disabled}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <Smile className="h-5 w-5" />
          <span className="sr-only">Add emoji</span>
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground"
        >
          <Mic className="h-5 w-5" />
          <span className="sr-only">Voice input</span>
        </Button>
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || disabled}
          className="bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
      {showEmojiPicker && (
        <div className="absolute bottom-full left-0 mb-2">
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            theme={Theme.DARK}
            width={350}
            height={400}
          />
        </div>
      )}
    </div>
  );
};

export default ChatInput;
