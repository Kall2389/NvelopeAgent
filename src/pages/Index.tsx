
import React, { useState, useEffect, useRef } from "react";
import ChatFeed from "@/components/ChatFeed";
import ChatInput from "@/components/ChatInput";
import { chatScript } from "@/data/chatScript";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Introduction from "@/components/Introduction";

const Index = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [typingMessageId, setTypingMessageId] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to add the next message from the script
  const addNextScriptMessage = () => {
    if (currentMessageIndex < chatScript.length) {
      const nextMessage = chatScript[currentMessageIndex];
      
      // Set typing animation for AI messages
      if (nextMessage.isAI) {
        setTypingMessageId(nextMessage.id);
        // Add a delay before considering the message as "typed"
        setTimeout(() => {
          setTypingMessageId(null);
        }, Math.min(nextMessage.text.length * 30, 3000));
      }

      setDisplayedMessages(prev => [...prev, nextMessage]);
      setCurrentMessageIndex(prev => prev + 1);
      return nextMessage;
    }
    return null;
  };

  // Function to handle a user sending a message
  const handleSendMessage = (text: string) => {
    // Stop autoplay if it's running
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    // Create a custom message
    const userMessage = {
      id: Date.now(),
      text,
      isAI: false
    };
    
    setDisplayedMessages(prev => [...prev, userMessage]);
    
    // Find appropriate AI response based on the message content
    setTimeout(() => {
      // Create an AI response message
      const aiMessage = {
        id: Date.now() + 1,
        text: findResponse(text),
        isAI: true
      };
      
      setTypingMessageId(aiMessage.id);
      
      setDisplayedMessages(prev => [...prev, aiMessage]);
      
      // Clear typing indicator after delay
      setTimeout(() => {
        setTypingMessageId(null);
      }, Math.min(aiMessage.text.length * 30, 3000));
    }, 1000);
  };

  // Enhanced topic matching for more natural language questions
  const findResponse = (text: string) => {
    const lowercaseText = text.toLowerCase();
    
    // Define topic keywords with related variations
    const topicMatchers = {
      investment: [
        "invest", "money", "portfolio", "saving", "finance", "financial", "wealth", "savings",
        "capital", "fund", "mutual fund", "market", "stock", "trading", "returns", "profit"
      ],
      etf: [
        "etf", "exchange traded fund", "diversification", "diversify", "basket", "vanguard", 
        "funds", "index fund", "track", "stock market", "managed fund"
      ],
      compound: [
        "compound", "growth", "interest", "accumulate", "build", "grow", "long term", 
        "return", "profit", "increase", "appreciate"
      ],
      portfolio: [
        "portfolio", "allocation", "asset", "distribution", "holdings", "investment mix", 
        "diversify", "balance", "proportion"
      ],
      brother: [
        "brother", "sibling", "family advice", "relative", "family member", "term deposit", 
        "deposit", "bank", "banking"
      ],
      personal: [
        "miami", "dinner", "friends", "high school", "reunion", "meet", "gathering", 
        "weather", "forecast", "rain", "temperature", "tonight", "sara", "sarah"
      ],
      budget: [
        "budget", "spending", "expense", "income", "saving", "money management", "finance", 
        "hundred dollars", "100 dollars", "weekly", "afford"
      ]
    };

    // Function to check if user's text matches any topic keyword variations
    const matchesTopic = (topic) => {
      return topicMatchers[topic].some(keyword => lowercaseText.includes(keyword));
    };
    
    // Count how many matching topics we have
    let matchedTopics = Object.keys(topicMatchers).filter(topic => matchesTopic(topic));
    
    // If we have matches, respond based on the most relevant topic
    if (matchedTopics.length > 0) {
      // 70% accuracy - mix of accurate information and some slight variations
      const randomAccuracy = Math.random();
      
      if (matchesTopic("investment")) {
        if (randomAccuracy > 0.3) {
          // 70% accurate response
          return "I recommend investing in broadly diversified ETFs. With $100 a week, you could build significant wealth over time through compound growth. Would you like me to explain more about ETFs?";
        } else {
          // 30% slightly off response
          return "Investing $100 per month in a diversified portfolio can help you build wealth. ETFs are a good way to get started with minimal risk.";
        }
      } else if (matchesTopic("etf")) {
        if (randomAccuracy > 0.3) {
          // 70% accurate response
          return "ETFs (Exchange Traded Funds) are baskets of securities that track an index. They offer diversification, lower fees than managed funds, and are traded on exchanges like stocks. A good strategy is to invest in a mix of US market, global market, and bond ETFs.";
        } else {
          // 30% slightly off response  
          return "ETFs are investment funds that let you buy shares in multiple companies at once. I think the allocation we discussed was about 60% US stocks, 30% global stocks, and 10% bonds.";
        }
      } else if (matchesTopic("portfolio")) {
        if (randomAccuracy > 0.3) {
          // 70% accurate response
          return "I recommended a portfolio with Vanguard Total US Stock Market ETF (VTI) at 55%, Vanguard Total World Stock Market ex US (VEU) at 35%, and Vanguard Global Bloomberg Aggregate Bond (V BOND) at 10% for a well-diversified approach.";
        } else {
          // 30% slightly off response
          return "For your portfolio, I'd suggest mostly ETFs that track major indexes. Something like 50-60% in US markets, 30-35% in international, and the rest in bonds for stability.";
        }
      } else if (matchesTopic("compound")) {
        if (randomAccuracy > 0.3) {
          // 70% accurate response
          return "With compound growth at 8-10% annually, $100 per week could grow to around $247,115-$298,570 after 20 years, and to $627,365-$849,600 after 30 years.";
        } else {
          // 30% slightly off response
          return "The power of compounding is amazing. If I remember correctly, $100 weekly investments could grow to something like $250,000 in 20 years with average market returns.";
        }
      } else if (matchesTopic("brother")) {
        if (randomAccuracy > 0.3) {
          // 70% accurate response
          return "Your brother suggested term deposits, which are safe but might not outpace inflation. Even though he's smart in his field, we all have different areas of expertise.";
        } else {
          // 30% slightly off response
          return "Family advice comes from a good place, but sometimes specialized knowledge makes a difference for financial decisions.";
        }
      } else if (matchesTopic("personal")) {
        if (randomAccuracy > 0.3) {
          // 70% accurate response
          return "Miami has great dining options! Enjoying dinner with high school friends sounds like a perfect mini-reunion. The weather forecast for tonight is a minimum of 21 degrees Celsius and no rain.";
        } else {
          // 30% slightly off response
          return "Hope you enjoy your dinner out! Getting together with old friends is always refreshing. Should be nice weather this evening.";
        }
      } else if (matchesTopic("budget")) {
        if (randomAccuracy > 0.3) {
          // 70% accurate response
          return "It's excellent that you've managed to free up $100 per week in your budget for investing. That regular commitment to investing will really add up over time with the power of compound growth.";
        } else {
          // 30% slightly off response
          return "Having a budget that allows for regular saving and investing is key to building wealth. Even modest amounts can grow substantially over time.";
        }
      }
    }

    // Default responses if no specific topic is matched
    if (lowercaseText.includes("thank") || lowercaseText.includes("bye")) {
      return "You're welcome! Have a great day! By the way, the weather forecast for tonight is a minimum of 21 degrees Celsius and no rain.";
    } else {
      return "I'm here to help you with financial advice and investment strategies. What specific questions do you have about investing?";
    }
  };

  // Toggle auto-play of the script
  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  };

  // Auto-play effect
  useEffect(() => {
    if (isAutoPlaying) {
      timeoutRef.current = setTimeout(() => {
        const message = addNextScriptMessage();
        if (!message) {
          // End of script
          setIsAutoPlaying(false);
        }
      }, 2000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isAutoPlaying, currentMessageIndex]);

  return (
    <div className="flex flex-col min-h-screen  bg-cover bg-center">
      <header className="py-4 px-6 flex justify-between items-center backdrop-blur-sm border-b">
        <h1 className="text-2xl font-bold bg-clip-text">
        Nvelope AI
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAutoPlay}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              isAutoPlaying
                ? "bg-grey-500 hover:bg-grey-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            )}
          >
            {isAutoPlaying ? "Stop Auto Chat" : "Auto Play Chat"}
          </button>
        </div>
      </header>
      <main className="flex container mx-auto w-full p-4 gap-12">
        <Introduction />
        <Card className="flex-1 flex overflow-hidden shadow-xl backdrop-blur-lg border-2 border-white/10">
          <CardContent className="flex-1 p-0 flex flex-col auto-scroll h-[800px]">
            <ChatFeed 
              messages={displayedMessages} 
              typingMessage={typingMessageId}
              className="bg-transparent" 
            />
            <ChatInput 
              onSendMessage={handleSendMessage}
              disabled={typingMessageId !== null} 
            />
          </CardContent>
        </Card>
      </main>
      
      <footer className="py-3 px-6 text-center text-sm text-white/75 backdrop-blur-sm bg-black/10">
        <p>Animi Chat Wave - Animated AI Chat Experience</p>
      </footer>
    </div>
  );
};

export default Index;
