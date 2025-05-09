import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatAvatar from './ChatAvatar';

interface Message {
  id: string;
  content: string;
  isAI: boolean;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const chatContentRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isInputDisabled) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isAI: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setIsInputDisabled(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "This is a simulated response. Replace this with actual AI response.",
        isAI: true
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Add random delay between 1-3 seconds before enabling input
      const delay = 1000 + Math.random() * 2000;
      setTimeout(() => {
        setIsInputDisabled(false);
      }, delay);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-section">
      <div className="chat-content" ref={chatContentRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 mb-4 ${
              message.isAI ? 'justify-start' : 'justify-end'
            }`}
          >
            {message.isAI && <ChatAvatar isAI={true} />}
            <div
              className={`message-bubble max-w-[80%] ${
                message.isAI ? 'bg-secondary' : 'bg-primary text-primary-foreground'
              }`}
            >
              {message.content}
            </div>
            {!message.isAI && <ChatAvatar isAI={false} />}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 mb-4">
            <ChatAvatar isAI={true} />
            <div className="message-bubble bg-secondary">
              <span className="typing-animation">Thinking</span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <textarea
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={isInputDisabled ? "Please wait..." : "Type your message..."}
          rows={1}
          disabled={isInputDisabled}
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          disabled={!input.trim() || isInputDisabled}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface; 