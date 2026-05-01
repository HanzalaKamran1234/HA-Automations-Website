import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2, Trash2, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Greetings! I'm Hanzala's AI architect. How can I assist you in automating your future today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I've encountered a glitch in the matrix. Please try again or reach out to Hanzala directly at growtoglow44@gmail.com." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear this transmission history?")) {
      setMessages([{ role: 'assistant', content: "Transmission cleared. How else can I help you?" }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Cinematic Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`mb-6 flex flex-col overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)] backdrop-blur-2xl transition-all duration-500 ${
              isMaximized 
                ? 'fixed inset-4 sm:inset-10 w-auto h-auto' 
                : 'w-[380px] sm:w-[420px] h-[600px]'
            } bg-black/80`}
          >
            {/* Glossy Header */}
            <div className="relative flex items-center justify-between bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-5 backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
                    <Bot size={26} className="text-white" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-black bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-white">Hanzala AI</h3>
                  <p className="text-xs font-medium text-cyan-400/80">Digital Architect Online</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={clearChat}
                  title="Clear Transmission"
                  className="group flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-all hover:bg-red-500/20 hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
                <button 
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                >
                  {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Cinematic Message Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
              {messages.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`group flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-transform group-hover:scale-110 ${
                      m.role === 'user' 
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                        : 'bg-white/10 backdrop-blur-sm'
                    }`}>
                      {m.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                    </div>
                    <div className={`relative p-4 rounded-2xl text-[15px] leading-relaxed transition-all ${
                      m.role === 'user' 
                        ? 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-tr-none shadow-[0_4px_15px_-3px_rgba(6,182,212,0.3)]' 
                        : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none backdrop-blur-md'
                    }`}>
                      {m.content}
                      {/* Subtle Glow Effect for Bot */}
                      {m.role === 'assistant' && (
                        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex gap-3 items-center bg-white/5 p-4 rounded-2xl border border-white/10 rounded-tl-none">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((dot) => (
                        <motion.div
                          key={dot}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.1 }}
                          className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium tracking-wider text-cyan-400/70 uppercase">Analyzing</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Console */}
            <div className="p-6 bg-white/5 border-t border-white/10">
              <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your query..."
                    className="w-full bg-black/40 pl-5 pr-14 py-4 rounded-xl text-sm border border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all outline-none text-white placeholder:text-gray-500"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
              <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-[2px]">
                <span className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-cyan-500"></span> Gemini Core</span>
                <span className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-blue-500"></span> Neural Response</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Futuristic Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -5 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative group flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 ${
          isOpen ? 'bg-white text-black' : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_0_30px_-5px_rgba(6,182,212,0.6)]'
        }`}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"></div>
        {isOpen ? <X size={32} className="relative z-10" /> : <MessageCircle size={32} className="relative z-10" />}
      </motion.button>
    </div>
  );
};

export default Chatbot;
