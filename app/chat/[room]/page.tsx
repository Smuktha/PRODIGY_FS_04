import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../context/SocketContext'; // Import context

const ChatPage: React.FC = () => {
  const { socket } = useContext(SocketContext) || {}; // Use optional chaining to prevent null access
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (socket) {
      socket.emit('sendMessage', message); // Emit message to server
      setMessages([...messages, message]); // Add to local message list
      setMessage(''); // Clear input field
    }
  };

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages
      socket.on('receiveMessage', (msg: string) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      return () => {
        socket.off('receiveMessage'); // Cleanup on unmount
      };
    }
  }, [socket]);

  return (
    <div>
      <h3>Chat Page</h3>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;
