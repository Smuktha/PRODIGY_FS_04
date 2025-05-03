import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext'; // import context

const UserList: React.FC = () => {
  const { socket } = useContext(SocketContext) || {}; // Use a fallback to prevent null errors
  const [users, setUsers] = useState<string[]>([]); // Example state for users

  useEffect(() => {
    if (socket) {
      // Handle socket events only if socket exists
      socket.on('users', (data: string[]) => {
        setUsers(data); // Update user list
      });

      return () => {
        socket.off('users'); // Clean up on unmount
      };
    }
  }, [socket]);

  return (
    <div>
      <h3>User List</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
