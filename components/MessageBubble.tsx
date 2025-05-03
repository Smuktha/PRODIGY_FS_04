// components/MessageBubble.tsx

import React from 'react';

const MessageBubble = ({ message }: { message: string }) => {
  return (
    <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md max-w-xs">
      {message}
    </div>
  );
};

export default MessageBubble;
