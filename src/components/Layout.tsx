import React from 'react';
import Introduction from './Introduction';
import ChatInterface from './ChatInterface';

const Layout: React.FC = () => {
  return (
    <div className="app-container">
      <Introduction />
      <ChatInterface />
    </div>
  );
};

export default Layout; 