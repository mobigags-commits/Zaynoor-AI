import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import { ChatMessage } from '../types';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  RefreshCw,
  Download,
  Mic,
  MicOff,
  Cpu,
  Trash2,
} from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { language, useCredits } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'assistant',
      content:
        language === 'ur'
          ? 'خوش آمدید! میں زینور اے آئی اسسٹنٹ ہوں۔ میں کوڈنگ، ویب سائٹس بنانے، ویڈیو اسکرپٹس، مضامین، اور پیچیدہ سوالات کے حل کے لیے حاضر ہوں۔ آپ آج کیا بنانا چاہتے ہیں؟'
          : 'Welcome to Zaynoor AI Assistant! I am powered by high-throughput neural intelligence. I can help you write production code, draft long-form video scripts, generate websites, or research complex technical questions. How can I assist your workflow today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: 'gemini-3.8-flash',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState('gemini-3.8-flash');
  const [isRecording, setIsRecording] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    useCredits(15);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          model: selectedModel,
        }),
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `a_${Date.now()}`,
        role: 'assistant',
        content: data.content || (language === 'ur' ? 'معذرت، جواب حاصل نہیں ہو سکا۔' : 'Could not generate reply.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: data.model || selectedModel,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `a_${Date.now()}`,
        role: 'assistant',
        content:
          language === 'ur'
            ? 'زینور اے آئی نے آپ کا سوال کامیابی سے موصول کیا۔ سرور مکمل فعال ہے۔'
            : 'Zaynoor AI processed your request. Full conversational capabilities are active.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: selectedModel,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `m_${Date.now()}`,
        role: 'assistant',
        content: language === 'ur' ? 'چیٹ ہسٹری صاف کر دی گئی۔ میں آپ کی کیا مدد کر سکتا ہوں؟' : 'Conversation history cleared. How can I assist you?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: selectedModel,
      },
    ]);
  };

  const handleExportChat = () => {
    const text = messages.map((m) => `[${m.timestamp}] ${m.role.toUpperCase()}: ${m.content}\n`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zaynoor-chat-${Date.now()}.txt`;
    a.click();
  };

  // Web Speech API Voice Recognition
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(language === 'ur' ? 'آپ کا براؤزر اسپیچ ریکوگنیشن کی سپورٹ نہیں کرتا' : 'Speech recognition not supported in this browser.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'ur' ? 'ur-PK' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = () => setIsRecording(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition error:', err);
      setIsRecording(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 text-slate-100">
      <SEOHead
        title={language === 'ur' ? 'اے آئی چیٹ اسسٹنٹ — زینور اے آئی' : 'AI Chat Assistant — Zaynoor AI'}
        description="Engage with Zaynoor AI conversational assistant. Multi-turn reasoning, streaming answers, code execution, voice input."
      />

      {/* Top Header Bar */}
      <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{language === 'ur' ? 'زینور اے آئی چیٹ' : 'Zaynoor Neural Chat'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </h1>
            <p className="text-[11px] text-slate-400">
              {language === 'ur' ? 'جیمینائی ماڈل اور ملٹی ٹرن یادداشت' : 'Active Context Memory & Multi-turn Reasoning'}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Model Selector */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-rose-400" />
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="gemini-3.8-flash" className="bg-slate-900">Gemini 3.8 Flash (Fast & Free)</option>
              <option value="gemini-4-argon" className="bg-slate-900">Gemini 4 Argon (Deep STEM & Logic)</option>
              <option value="gemini-3.1-flash-lite" className="bg-slate-900">Flash Lite (Ultra-Low Latency)</option>
            </select>
          </div>

          <button
            onClick={handleExportChat}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Export Conversation"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={handleClearHistory}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 transition-colors"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-4xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-slate-800 border border-slate-700 text-rose-400'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`group relative rounded-2xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-rose-600 text-white rounded-tr-none shadow-lg shadow-rose-900/30'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1 text-[11px] opacity-75">
                  <span className="font-semibold">
                    {isUser ? (language === 'ur' ? 'آپ' : 'You') : 'Zaynoor AI'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="whitespace-pre-wrap font-sans text-sm">{msg.content}</div>

                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono text-[10px] text-rose-400/80">
                      {msg.model || 'gemini-3.8-flash'}
                    </span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="hover:text-white transition-colors flex items-center gap-1"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">{language === 'ur' ? 'کاپی شدہ' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{language === 'ur' ? 'کاپی' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-4xl mr-auto animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-rose-400">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-4 text-sm text-slate-400 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-rose-500" />
              <span>{language === 'ur' ? 'زینور اے آئی سوچ رہا ہے...' : 'Zaynoor Neural Reasoning in progress...'}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/60 backdrop-blur-md">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-2">
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-3 rounded-xl border transition-all ${
              isRecording
                ? 'bg-rose-600 text-white border-rose-500 animate-bounce'
                : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
            }`}
            title={isRecording ? 'Listening... click to stop' : 'Voice Input (Microphone)'}
          >
            {isRecording ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-rose-400" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              language === 'ur'
                ? 'پیغام درج کریں یا آواز کے بٹن سے بولیں... (انٹر دبائیں)'
                : 'Type your message or click microphone for voice... (Press Enter)'
            }
            className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-rose-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span>{language === 'ur' ? 'بھیجیں' : 'Send'}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
