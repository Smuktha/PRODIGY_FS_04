'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password });

      // If login is successful, store the mock JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to the chat page after successful login
      router.push('/chat');
    } catch (err: any) {
      setError(err.response?.data.message || 'An error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h2>
        
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          <a href="/forgot-password" className="hover:text-blue-500">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
