import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import {
  Globe,
  Play,
  Code,
  Download,
  Zap,
  Eye,
  RefreshCw,
  Copy,
  Check,
  Sparkles,
  Maximize2,
  Sliders,
} from 'lucide-react';

export const WebsiteBuilderPage: React.FC = () => {
  const { language, setCurrentRoute, setActiveProjectCode, useCredits } = useApp();
  const [prompt, setPrompt] = useState('A luxury real estate landing page with crimson accent lighting, property listings grid, and booking form');
  const [framework, setFramework] = useState('html-tailwind');
  const [theme, setTheme] = useState('luxury-dark');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const [generatedHtml, setGeneratedHtml] = useState<string>(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aura Estates | Luxury Living</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  <nav class="border-b border-rose-900/40 bg-slate-950/90 sticky top-0 px-8 py-4 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center font-bold text-white shadow-md shadow-rose-600/40">A</div>
      <span class="text-xl font-bold tracking-tight text-white">Aura<span class="text-rose-500">Estates</span></span>
    </div>
    <div class="hidden md:flex gap-6 text-sm text-slate-300">
      <a href="#" class="hover:text-rose-400">Properties</a>
      <a href="#" class="hover:text-rose-400">Penthouses</a>
      <a href="#" class="hover:text-rose-400">About</a>
    </div>
    <button class="px-5 py-2 rounded-xl bg-rose-600 text-white font-medium text-xs hover:bg-rose-500 shadow-lg shadow-rose-600/30">
      Schedule Viewing
    </button>
  </nav>

  <header class="py-24 px-8 text-center relative overflow-hidden">
    <div class="absolute inset-0 bg-radial-gradient from-rose-900/30 via-transparent to-transparent pointer-events-none"></div>
    <h1 class="text-5xl md:text-6xl font-extrabold text-white mb-6">
      Architecture of <span class="bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">Prestige</span>
    </h1>
    <p class="text-slate-300 max-w-xl mx-auto mb-8 text-base">
      Exclusive architectural marvels curated for the distinguished few in prime metropolitan centers.
    </p>
    <div class="flex justify-center gap-4">
      <button class="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm shadow-xl shadow-rose-600/30">
        Browse Properties
      </button>
      <button class="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-sm hover:bg-slate-800">
        Virtual Tour
      </button>
    </div>
  </header>

  <section class="max-w-6xl mx-auto px-8 pb-24 grid md:grid-cols-3 gap-8">
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-rose-500/40 transition-all">
      <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80" class="w-full h-48 object-cover" />
      <div class="p-6">
        <h3 class="text-lg font-bold text-white mb-1">The Sky Sovereign</h3>
        <p class="text-rose-400 font-semibold text-sm mb-3">$14,500,000</p>
        <p class="text-xs text-slate-400">Tribeca, New York • 5 Beds • 6 Baths • Private Terrace</p>
      </div>
    </div>
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-rose-500/40 transition-all">
      <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80" class="w-full h-48 object-cover" />
      <div class="p-6">
        <h3 class="text-lg font-bold text-white mb-1">Villa Horizon</h3>
        <p class="text-rose-400 font-semibold text-sm mb-3">$22,000,000</p>
        <p class="text-xs text-slate-400">Bel Air, California • 7 Beds • 9 Baths • Infinity Pool</p>
      </div>
    </div>
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-rose-500/40 transition-all">
      <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=80" class="w-full h-48 object-cover" />
      <div class="p-6">
        <h3 class="text-lg font-bold text-white mb-1">Crimson Crest</h3>
        <p class="text-rose-400 font-semibold text-sm mb-3">$18,200,000</p>
        <p class="text-xs text-slate-400">Mayfair, London • 4 Beds • 5 Baths • Wine Cellar</p>
      </div>
    </div>
  </section>
</body>
</html>`);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    useCredits(35);

    try {
      const res = await fetch('/api/website-builder/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, framework, theme }),
      });
      const data = await res.json();
      if (data.code) {
        setGeneratedHtml(data.code);
        setActiveProjectCode(data.code);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zaynoor-website.html';
    a.click();
  };

  const handleDeployToVercel = () => {
    setActiveProjectCode(generatedHtml);
    setCurrentRoute('vercel-deploy');
  };

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100">
      <SEOHead
        title={language === 'ur' ? 'اے آئی ویب سائٹ بلڈر — زینور اے آئی' : 'AI Website Builder — Zaynoor AI'}
        description="Generate complete responsive websites, landing pages, and web apps with live preview and 1-click Vercel deployment."
      />

      {/* Top Banner & Controls */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <span>{language === 'ur' ? 'اے آئی ویب سائٹ بلڈر' : 'AI Website Builder'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/30 font-semibold">
                Tailwind CSS
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              {language === 'ur'
                ? 'پرامپٹ سے مکمل ویب سائٹ بنائیں، کوڈ ایڈیٹ کریں اور ورسل پر لائیو شائع کریں'
                : 'Prompt to production HTML/Tailwind with interactive responsive sandbox & Vercel deployment'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download HTML</span>
          </button>
          <button
            onClick={handleDeployToVercel}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-600/30 transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'ورسل پر ڈیپلائے کریں' : 'Deploy to Vercel'}</span>
          </button>
        </div>
      </div>

      {/* Prompt Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your dream website (e.g. Modern SaaS landing page, luxury portfolio, e-commerce storefront)..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
            >
              <option value="luxury-dark">Theme: Luxury Crimson Dark</option>
              <option value="modern-light">Theme: Clean Studio Light</option>
              <option value="cyberpunk">Theme: Cyberpunk Neon</option>
            </select>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 disabled:opacity-50 transition-all"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isGenerating ? 'Synthesizing...' : 'Generate Website'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace: Code / Preview tabs */}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-center justify-between mb-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'preview' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'code' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </button>
          </div>

          {/* Device Size Selector for Preview */}
          {activeTab === 'preview' && (
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  previewDevice === 'desktop' ? 'bg-slate-800 text-rose-400 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Desktop (100%)
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  previewDevice === 'tablet' ? 'bg-slate-800 text-rose-400 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Tablet (768px)
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  previewDevice === 'mobile' ? 'bg-slate-800 text-rose-400 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Mobile (375px)
              </button>
            </div>
          )}
        </div>

        {/* Content Box */}
        <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden flex flex-col shadow-inner">
          {activeTab === 'preview' ? (
            <div className="flex-1 bg-slate-950 flex justify-center items-center overflow-auto p-4">
              <div
                className={`h-full transition-all duration-300 rounded-xl overflow-hidden border border-slate-800 bg-white ${
                  previewDevice === 'desktop'
                    ? 'w-full'
                    : previewDevice === 'tablet'
                    ? 'w-[768px]'
                    : 'w-[375px]'
                }`}
              >
                <iframe
                  title="Website Preview Sandbox"
                  srcDoc={generatedHtml}
                  className="w-full h-full border-none"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 p-4 font-mono text-xs overflow-auto bg-slate-950 text-slate-200">
              <textarea
                value={generatedHtml}
                onChange={(e) => setGeneratedHtml(e.target.value)}
                className="w-full h-full bg-transparent text-slate-200 font-mono text-xs focus:outline-none resize-none"
                spellCheck={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
