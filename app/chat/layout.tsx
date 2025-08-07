// app/chat/layout.tsx  
 
import React from 'react';
import { SocketProvider } from '../../context/SocketContext';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        <header className="bg-blue-500 text-white p-4">
          <h1>Chat App</h1>
        </header>
        {children}
      </div>
    </SocketProvider>
  );
};

export default ChatLayout;
