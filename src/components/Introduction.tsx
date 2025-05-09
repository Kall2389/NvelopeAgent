import React from 'react';
import { MessageSquare, Brain, Zap, Sparkles } from 'lucide-react';

const Introduction: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Natural Conversations",
      description: "Engage in human-like conversations with advanced language understanding"
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Smart Learning",
      description: "Adapts and learns from interactions to provide better responses"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Quick Responses",
      description: "Lightning-fast responses with high accuracy"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Creative Solutions",
      description: "Generates creative and innovative solutions to complex problems"
    }
  ];

  return (
    <div className="introduction-section shadow-xl backdrop-blur-lg border-2 border-white/10 rounded-lg ">
      <div className="introduction-content">
        <div className="bot-avatar relative">
          <div className="absolute inset-0 bg-blue-500/40 blur-2xl rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-blue-400/30 blur-xl rounded-full animate-ping"></div>
          <img 
            src="/girl_bot.png" 
            alt="AI Assistant" 
            className="w-full h-full object-cover relative z-10"
          />
        </div>
        
        <div className="bot-info">
          <h1 className="bot-name">Hi, I'm Nvelope</h1>
          <p className="bot-description">
            Your intelligent companion for meaningful conversations and creative problem-solving.
            Powered by advanced AI technology to provide helpful, accurate, and engaging responses.
          </p>
        </div>

        <div className="function-list">
          {features.map((feature, index) => (
            <div key={index} className="function-item">
              <div className="text-primary">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Introduction; 