'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    // Store username in localStorage and navigate to chat
    localStorage.setItem('chat-username', username);
    router.push('/chat');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-600 to-teal-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800">Create an Account</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ease-in-out duration-200"
        >
          Register
        </button>

        <div className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
}
