"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("chat-username") || `user-${Math.floor(Math.random() * 1000)}`;
    setUsername(stored);
    localStorage.setItem("chat-username", stored);

    const connectSocket = async () => {
      await fetch("/api/socket");

      socket = io({ path: "/api/socket" });

      socket.on("connect", () => {
        console.log("Socket connected");
      });

      socket.on("receiveMessage", (msg: { text: string; sender: string }) => {
        setMessages((prev) => [...prev, msg]);
      });
    };

    connectSocket();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = { text: input, sender: username };
    socket.emit("sendMessage", newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="h-screen bg-[#f3f4f6] text-gray-800 flex flex-col">
      <header className="text-center p-4 text-xl font-bold border-b border-gray-300 shadow-sm bg-white">
        💬 Real-time Chat - <span className="text-purple-600">{username}</span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f9fafb]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === username ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-xl text-sm shadow-sm ${
                msg.sender === username
                  ? "bg-purple-200 text-purple-900"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <strong className="block text-xs text-gray-500 mb-1">{msg.sender}</strong>
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-300 bg-white flex">
        <input
          type="text"
          className="flex-1 p-3 rounded-md bg-gray-100 text-gray-900 outline-none placeholder-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
