'use client';

import React, { createContext, useEffect, useState, ReactNode } from 'react';
// Import 'io' as the default export from socket.io-client
import io from 'socket.io-client';

interface SocketContextType {
  socket: ReturnType<typeof io> | null; // Use ReturnType<typeof io> to get the socket type
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
});

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io('http://localhost:4000'); // Replace with your actual backend URL
    setSocket(newSocket);

    // Handle connection logging
    newSocket.on('connect', () => {
      console.log('Connected to socket:', newSocket.id);
    });

    return () => {
      newSocket.disconnect();
      console.log('Disconnected from socket');
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to access the socket context
export const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket; // Return just the socket object
};
