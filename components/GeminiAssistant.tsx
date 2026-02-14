'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getMovieAdvice } from '@/app/actions/gemini';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMsg = message;
    setMessage('');
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const aiResponse = await getMovieAdvice(userMsg);
      setHistory(prev => [...prev, { role: 'ai', text: aiResponse || 'No response' }]);
    } catch (error) {
      setHistory(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/30 transition-all hover:scale-110 active:scale-95"
        >
          <div className="absolute -top-12 right-0 bg-zinc-900 text-white border border-zinc-800 text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Need advice?
          </div>
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-[2rem] sm:w-96 h-[500px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50">
          <div className="bg-black/50 p-4 border-b border-zinc-800 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="font-bold text-xs uppercase tracking-widest text-zinc-300">CineNYC AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-zinc-800 rounded-full text-zinc-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
            {history.length === 0 && (
              <div className="text-zinc-600 text-center mt-20 flex flex-col items-center">
                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-zinc-800">
                  <Sparkles className="w-5 h-5 text-blue-500/50" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-2">AI Concierge</p>
                <p className="text-xs text-zinc-500 max-w-[200px]">Ask about showtimes, movie recommendations, or theater amenities.</p>
              </div>
            )}
            {history.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-bl-none'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl rounded-bl-none">
                  <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-black/50 border-t border-zinc-800 flex gap-2 backdrop-blur-md">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-700"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="p-2.5 bg-blue-600 hover:bg-blue-500 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiAssistant;
