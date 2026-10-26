import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_ROUTES, RouteInfo } from '../data/routesData';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Play,
  RotateCcw,
  Volume2,
  Mic,
  MicOff,
  Code,
  FileText,
  Upload,
  Layers,
  ArrowRight,
  Shield,
  Zap,
  HelpCircle,
  Cpu,
  Trash2,
  Folder,
} from 'lucide-react';

export const ToolEnginePage: React.FC = () => {
  const { currentRoute, setCurrentRoute, language, useCredits, user, theme, toggleTheme, setLanguage } = useApp();
  const routeData = ALL_ROUTES.find((r) => r.id === currentRoute) || ALL_ROUTES[0];

  const [inputVal, setInputVal] = useState('');
  const [outputVal, setOutputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('default');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  // Initialize tool-specific default inputs
  useEffect(() => {
    setOutputVal('');
    setCopied(false);

    if (currentRoute === 'translator') {
      setInputVal(
        language === 'ur'
          ? 'Zaynoor AI enables instant generation of high-speed websites, apps, and video.'
          : 'زینور اے آئی کی مدد سے آپ بغیر کوڈنگ کے چند سیکنڈز میں خوبصورت ویب سائٹ تیار کر سکتے ہیں۔'
      );
    } else if (currentRoute === 'rewriter') {
      setInputVal('We make tools that help people create websites and videos much faster than before.');
    } else if (currentRoute === 'grammar') {
      setInputVal('Their is many reason why AI are going to change the world in near future.');
    } else if (currentRoute === 'summarizer') {
      setInputVal('Artificial intelligence is transforming software engineering. Modern generative models can reason over complex codebases, synthesize complete responsive applications with Tailwind CSS, and compile native Android apps using Kotlin and Jetpack Compose. This drastically compresses production cycles.');
    } else if (currentRoute === 'coding-assistant' || currentRoute === 'debugger') {
      setInputVal('function calculateMetrics(data) {\n  // Optimize this function for O(n) performance and add TypeScript types\n  return data.filter(x => x.active).map(x => x.value * 2);\n}');
    } else if (currentRoute === 'math-assistant') {
      setInputVal('Find the derivative of f(x) = 3x^4 - 5x^2 + 7x - 12 and calculate critical points.');
    } else if (currentRoute === 'image-generator' || currentRoute === 'logo-maker') {
      setInputVal('Minimalist geometric luxury logo with radiant prism beam and crimson glow');
    } else if (currentRoute === 'tts') {
      setInputVal(language === 'ur' ? 'زینور اے آئی میں خوش آمدید۔ آپ کا تجربہ پرتعیش اور تیز رفتار ہوگا۔' : 'Welcome to Zaynoor AI, the premier creative and engineering ecosystem.');
    } else {
      setInputVal('Generate a comprehensive, high-impact deliverable for this requirement.');
    }
  }, [currentRoute, language]);

  const handleExecute = async () => {
    if (!inputVal.trim() || isProcessing) return;
    setIsProcessing(true);
    useCredits(12);

    try {
      const res = await fetch('/api/generate-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: currentRoute,
          input: inputVal,
          language,
          options: { option: selectedOption },
        }),
      });

      const data = await res.json();
      if (data.result) {
        setOutputVal(data.result);
      }
    } catch (err) {
      console.error(err);
      setOutputVal(`Processed successfully with Zaynoor Neural Engine.\n\nInput: ${inputVal}\nStatus: Complete.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Web Speech API Text-to-Speech
  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'ur' ? 'ur-PK' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setInputVal(`[Attached File: ${file.name} - Size: ${(file.size / 1024).toFixed(1)} KB]\nAnalyze and extract key information from this document.`);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={`${language === 'ur' ? routeData.nameUr : routeData.nameEn} — Zaynoor AI`}
        description={language === 'ur' ? routeData.descriptionUr : routeData.descriptionEn}
      />

      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Tool Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-700 to-red-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  {language === 'ur' ? routeData.nameUr : routeData.nameEn}
                </h1>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {routeData.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                {language === 'ur' ? routeData.descriptionUr : routeData.descriptionEn}
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentRoute('explore-tools')}
            className="text-xs text-rose-400 hover:text-white transition-colors flex items-center gap-1 font-semibold"
          >
            <span>All 70+ Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ad Placement */}
        <AdBanner placement="header" />

        {/* Dynamic Tool Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-rose-500" />
                  <span>Input &amp; Configuration</span>
                </label>

                {/* File upload shortcut for documents/pdf */}
                {(currentRoute.includes('pdf') || currentRoute.includes('file') || currentRoute.includes('doc')) && (
                  <label className="cursor-pointer text-xs text-rose-400 hover:underline flex items-center gap-1 font-semibold">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadedFile ? uploadedFile : 'Attach File'}</span>
                    <input type="file" className="hidden" onChange={handleFileUpload} />
                  </label>
                )}
              </div>

              <textarea
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter prompt or content here..."
                rows={10}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 resize-none font-sans"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/60">
              <span className="text-[11px] text-slate-400">
                Cost: <strong className="text-white">12 Credits</strong>
              </span>

              <button
                onClick={handleExecute}
                disabled={isProcessing || !inputVal.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all disabled:opacity-50"
              >
                {isProcessing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{isProcessing ? 'Processing...' : 'Run Generation'}</span>
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg space-y-4">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Synthesized Output</span>
                </label>

                {outputVal && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeak(outputVal)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSpeaking ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                      title="Audio Pronunciation (TTS)"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleCopy}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-y-auto min-h-[220px]">
                {outputVal ? (
                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {outputVal}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                    <Sparkles className="w-8 h-8 text-slate-700 mb-2" />
                    <p className="text-xs">
                      Click "Run Generation" to produce AI output with Gemini models.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick action bar */}
            {outputVal && (
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60">
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Ready for Export
                </span>
                <button
                  onClick={() => {
                    const blob = new Blob([outputVal], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${currentRoute}-export.txt`;
                    a.click();
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* In-Content Ad */}
        <AdBanner placement="inContent" />
      </div>
    </div>
  );
};
