"use client";
import React from 'react';

import { useChat } from "ai/react";

const Page = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat(); // Ruta corregida

  return (
    <div className='p-5 min-h-[760px] bg-[#F9FAFC]'>
      <div className='flex flex-col animate-fade-aparecer bg-[#F9FAFC]' style={{ minHeight: '100vh', paddingBottom: '80px' }}>
        <p className='text-azulMarino text-[18px] font-medium mb-'>Chatbot</p>
        <div className='h-[1px] mt-[5px] mb-[5px] bg-gray-100'></div>

        <form onSubmit={handleSubmit} className="max-w-xl w-full">
          <div className="text-white max-h-96 h-full overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col mb-2 p-2 rounded-md ${m.role === "assistant"
                  ? "self-end bg-gray-800"
                  : "self-start bg-blue-700"
                  }`}
              >
                <span
                  className={`text-xs ${m.role === "assistant" ? "text-right" : "text-left"
                    }`}
                >
                  {m.role}
                </span>{" "}
                {m.content}
              </div>
            ))}
          </div>

          <div className="flex justify-between my-4">
            <label className="text-white block font-bold my-2">
              Say something...
            </label>
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              disabled={isLoading || !input}
            >
              Send
            </button>
          </div>
          <textarea
            rows={4}
            value={input}
            onChange={handleInputChange}
            className="text-black bg-slate-300 px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Type something..."
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
