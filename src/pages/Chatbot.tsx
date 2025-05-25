import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { getGeminiResponse } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant for medicinal plants. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isRateLimited) return;

    // Implement rate limiting
    setIsRateLimited(true);
    setTimeout(() => setIsRateLimited(false), 2000); // 2 second cooldown

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const prompt = `You are an expert in medicinal plants and traditional medicine. Please provide accurate and helpful information about: ${input}. Format your response using markdown with proper headings, lists, and emphasis where appropriate.`;
      const response = await getGeminiResponse(prompt);

      const botResponse: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I apologize, but I'm having trouble processing your request at the moment. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-emerald-800 mb-4">
          AI Plant Assistant
        </h1>
        <p className="text-gray-600">
          Ask questions about medicinal plants and their traditional uses
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 ${
                message.sender === 'user'
                  ? 'flex-row-reverse space-x-reverse'
                  : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {message.sender === 'user' ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
              </div>
              <div
                className={`rounded-lg p-4 ${
                  message.sender === 'user'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white border border-gray-200 shadow-sm'
                }`}
              >
                {message.sender === 'bot' ? (
                  <div className="prose prose-slate max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1 className="text-xl font-bold mb-2" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2 className="text-lg font-bold mb-2" {...props} />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3 className="text-base font-bold mb-2" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p
                            className="mb-2 text-gray-800 leading-relaxed"
                            {...props}
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc pl-4 mb-2 space-y-1"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="list-decimal pl-4 mb-2 space-y-1"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="text-gray-800" {...props} />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong
                            className="font-bold text-gray-900"
                            {...props}
                          />
                        ),
                        em: ({ node, ...props }) => (
                          <em className="italic text-gray-800" {...props} />
                        ),
                        code: ({ node, ...props }) => (
                          <code
                            className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800"
                            {...props}
                          />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="border-l-4 border-gray-200 pl-4 italic text-gray-700 mb-2"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-white leading-relaxed">{message.text}</p>
                )}
                <span className="text-xs opacity-75 mt-2 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Bot className="w-5 h-5 text-gray-600" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about medicinal plants..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              disabled={isRateLimited}
            />
            <button
              type="submit"
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!input.trim() || isRateLimited}
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;