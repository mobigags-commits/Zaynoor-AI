import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Globe,
  Smartphone,
  Clapperboard,
  Code,
  Shield,
  Layers,
  CheckCircle2,
  Cpu,
  Flame,
  Search,
  ChevronRight,
  TrendingUp,
  FileCode,
  Play,
  Wallet,
  Coins,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentRoute, language, useCredits } = useApp();
  const [heroPrompt, setHeroPrompt] = useState('');
  const [selectedAction, setSelectedAction] = useState<'chat' | 'website' | 'video' | 'android'>('chat');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroPrompt.trim()) {
      setCurrentRoute('chat');
      return;
    }
    useCredits(10);
    if (selectedAction === 'website') {
      setCurrentRoute('website-builder');
    } else if (selectedAction === 'video') {
      setCurrentRoute('long-video-studio');
    } else if (selectedAction === 'android') {
      setCurrentRoute('app-builder');
    } else {
      setCurrentRoute('chat');
    }
  };

  const quickShortcuts = [
    { id: 'wallet', labelEn: 'Wallet (PKR/$)', labelUr: 'والٹ و ادائیگی', icon: Wallet, color: 'from-emerald-500 to-teal-500' },
    { id: 'earning-hub', labelEn: 'Zero-Invest Earning', labelUr: 'مفت کمائی سینٹر', icon: Coins, color: 'from-amber-500 to-orange-500' },
    { id: 'chat', labelEn: 'AI Chat', labelUr: 'اے آئی چیٹ', icon: Sparkles, color: 'from-amber-500 to-rose-500' },
    { id: 'website-builder', labelEn: 'Website Builder', labelUr: 'ویب سائٹ بلڈر', icon: Globe, color: 'from-blue-500 to-cyan-500' },
    { id: 'app-builder', labelEn: 'Android Builder', labelUr: 'اینڈرائیڈ بلڈر', icon: Smartphone, color: 'from-emerald-500 to-teal-500' },
    { id: 'long-video-studio', labelEn: '20-Min Video Studio', labelUr: 'لانگ ویڈیو اسٹوڈیو', icon: Clapperboard, color: 'from-purple-500 to-rose-500' },
    { id: 'vercel-deploy', labelEn: 'Vercel Deploy', labelUr: 'ورسل ڈیپلائے', icon: Zap, color: 'from-pink-500 to-red-500' },
    { id: 'translator', labelEn: 'Urdu Translator', labelUr: 'اردو مترجم', icon: Layers, color: 'from-orange-500 to-rose-500' },
    { id: 'coding-assistant', labelEn: 'Coding Assistant', labelUr: 'کوڈنگ اسسٹنٹ', icon: Code, color: 'from-indigo-500 to-blue-500' },
    { id: 'seo-audit', labelEn: 'SEO / GEO Suite', labelUr: 'ایس ای او اور GEO', icon: TrendingUp, color: 'from-rose-500 to-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#6e030d] via-[#480208] to-[#1a0103] text-white selection:bg-rose-500 selection:text-white">
      <SEOHead
        title={language === 'ur' ? 'مرکزی صفحہ — زینور اے آئی پریمیم' : 'Home — Zaynoor AI Premium Ecosystem'}
        description="The ultimate autonomous AI creative and engineering suite. Build responsive websites, native Android apps, 20-minute long videos, and deploy to Vercel."
      />

      {/* Decorative Luxury Lighting & Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-rose-600/30 via-red-700/15 to-transparent blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-48 left-10 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute top-64 right-10 w-96 h-96 bg-rose-500/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Header Ad Slot (Compliant layout reserve) */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <AdBanner placement="header" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-900/60 border border-rose-500/40 text-rose-200 text-xs font-semibold tracking-wide shadow-lg shadow-rose-950/50 mb-8 backdrop-blur-md animate-pulse">
          <Sparkles className="w-4 h-4 text-rose-300" />
          <span>
            {language === 'ur'
              ? 'زینور اے آئی 2.0 • تمام 70+ ٹولز فعال ہیں'
              : 'Zaynoor AI 2.0 • 70+ Autonomous AI Systems Live'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12] max-w-5xl mx-auto drop-shadow-md">
          {language === 'ur' ? (
            <>
              مصنوعی ذہانت کی انقلابی طاقت سے اپنے{' '}
              <span className="bg-gradient-to-r from-rose-200 via-white to-rose-300 bg-clip-text text-transparent underline decoration-rose-500/60 decoration-wavy">
                ویژن کو حقیقت
              </span>{' '}
              بنائیں۔
            </>
          ) : (
            <>
              Build, Generate & Deploy with{' '}
              <span className="bg-gradient-to-r from-white via-rose-100 to-rose-300 bg-clip-text text-transparent">
                Elite Autonomous AI
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-rose-100/90 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          {language === 'ur'
            ? 'مکمل ریسپانسو ویب سائٹس، جیٹ پیک کمپوز اینڈرائیڈ ایپس، 20 منٹ کی سنیماٹک ویڈیوز اور ورسل پر فوری ڈیپلائمنٹ صرف چند سیکنڈز میں۔'
            : 'Convert natural language into responsive websites, native Android Jetpack Compose code, 20-minute long multi-scene cinematic videos, and instant Vercel production hosting.'}
        </p>

        {/* Interactive Prompt Command Center */}
        <div className="max-w-3xl mx-auto mb-12">
          {/* Action Mode Selector Tabs */}
          <div className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold">
            <button
              onClick={() => setSelectedAction('chat')}
              className={`px-4 py-1.5 rounded-full transition-all ${
                selectedAction === 'chat'
                  ? 'bg-white text-rose-950 font-bold shadow-md'
                  : 'bg-rose-950/60 text-rose-200 hover:bg-rose-900/60 border border-rose-800/60'
              }`}
            >
              💬 {language === 'ur' ? 'اے آئی چیٹ' : 'AI Chat'}
            </button>
            <button
              onClick={() => setSelectedAction('website')}
              className={`px-4 py-1.5 rounded-full transition-all ${
                selectedAction === 'website'
                  ? 'bg-white text-rose-950 font-bold shadow-md'
                  : 'bg-rose-950/60 text-rose-200 hover:bg-rose-900/60 border border-rose-800/60'
              }`}
            >
              🌐 {language === 'ur' ? 'ویب سائٹ بنائیں' : 'Build Website'}
            </button>
            <button
              onClick={() => setSelectedAction('video')}
              className={`px-4 py-1.5 rounded-full transition-all ${
                selectedAction === 'video'
                  ? 'bg-white text-rose-950 font-bold shadow-md'
                  : 'bg-rose-950/60 text-rose-200 hover:bg-rose-900/60 border border-rose-800/60'
              }`}
            >
              🎬 {language === 'ur' ? 'لانگ ویڈیو' : 'Long Video (20m)'}
            </button>
            <button
              onClick={() => setSelectedAction('android')}
              className={`px-4 py-1.5 rounded-full transition-all ${
                selectedAction === 'android'
                  ? 'bg-white text-rose-950 font-bold shadow-md'
                  : 'bg-rose-950/60 text-rose-200 hover:bg-rose-900/60 border border-rose-800/60'
              }`}
            >
              📱 {language === 'ur' ? 'اینڈرائیڈ ایپ' : 'Android App'}
            </button>
          </div>

          <form
            onSubmit={handleHeroSubmit}
            className="relative bg-slate-950/90 border border-rose-500/50 rounded-2xl p-2.5 shadow-2xl shadow-rose-950/80 backdrop-blur-xl flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1 flex items-center px-3 gap-2">
              <Sparkles className="w-5 h-5 text-rose-400 shrink-0" />
              <input
                type="text"
                value={heroPrompt}
                onChange={(e) => setHeroPrompt(e.target.value)}
                placeholder={
                  selectedAction === 'website'
                    ? language === 'ur'
                      ? 'مثلاً: جدید ریستوراں کے لیے لگژری ڈارک موڈ ویب سائٹ بنائیں...'
                      : 'Describe your website (e.g. Luxury restaurant landing page with booking)...'
                    : selectedAction === 'video'
                    ? language === 'ur'
                      ? 'مثلاً: آرٹیفیشل انٹیلیجنس کے مستقبل پر 15 منٹ کی ڈاکومنٹری ویڈیو...'
                      : 'Topic for 20-min video (e.g. Deep dive into quantum computing with Urdu/English voice)...'
                    : selectedAction === 'android'
                    ? language === 'ur'
                      ? 'مثلاً: جدید فنانس ٹریکر کے لیے جیٹ پیک کمپوز اینڈرائیڈ ایپ بنائیں...'
                      : 'Describe Android app (e.g. Modern crypto portfolio with Jetpack Compose)...'
                    : language === 'ur'
                    ? 'کچھ بھی پوچھیں یا کوڈ، تحریر، تحقیق کا پرامپٹ دیں...'
                    : 'Ask anything, write code, research complex ideas, or create media...'
                }
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-rose-200/50 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/40 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
            >
              <span>{language === 'ur' ? 'ابھی شروع کریں' : 'Launch Generator'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Quick Shortcuts Bar */}
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-rose-200/70 font-semibold mb-4">
            {language === 'ur' ? '⚡ مقبول ترین ٹولز تک فوری رسائی' : '⚡ Popular Direct Launchpads'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {quickShortcuts.map((sc) => {
              const Icon = sc.icon;
              return (
                <button
                  key={sc.id}
                  onClick={() => setCurrentRoute(sc.id)}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950/70 hover:bg-rose-900/60 border border-rose-500/25 hover:border-rose-400 text-slate-100 hover:text-white transition-all shadow-md group transform hover:-translate-y-1"
                >
                  <div className="w-9 h-9 rounded-lg bg-rose-950/80 border border-rose-700/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-rose-300" />
                  </div>
                  <span className="text-[11px] font-semibold text-center line-clamp-1">
                    {language === 'ur' ? sc.labelUr : sc.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 Flagship Pillar Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-rose-900/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {language === 'ur'
              ? 'زینور اے آئی کے چار انقلابی فلگ شپ سسٹمز'
              : 'Four Industry-Grade Flagship Pillars'}
          </h2>
          <p className="text-rose-200/80 max-w-2xl mx-auto text-sm sm:text-base">
            {language === 'ur'
              ? 'صرف چیٹ بوٹ نہیں، بلکہ مکمل پروڈکشن گریڈ سافٹ ویئر، نیٹیو ایپس اور سنیماٹک ویڈیو انجن۔'
              : 'Beyond standard chat: complete end-to-end autonomous engineering, mobile app synthesis, cinematic video pipelines, and cloud distribution.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: AI Website Builder */}
          <div className="rounded-3xl bg-slate-950/80 border border-rose-500/30 p-8 shadow-2xl hover:border-rose-400/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-700 to-red-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-rose-600/30">
                <Globe className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-white">
                  {language === 'ur' ? 'اے آئی ویب سائٹ بلڈر' : 'AI Website Builder'}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                  LIVE PREVIEW
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {language === 'ur'
                  ? 'صرف پرامپٹ لکھیں اور مکمل، ریسپانسو ایچ ٹی ایم ایل، سی ایس ایس اور ٹیل ونڈ ویب سائٹ کوڈ کے ساتھ حاصل کریں۔ ساتھ ہی براؤزر میں براہ راست لائیو پیش نظارہ دیکھیں۔'
                  : 'Turn any product or business brief into complete, responsive HTML/Tailwind projects with sandboxed live preview, code inspection, and download zip.'}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-6 font-mono text-xs text-rose-300/90 overflow-x-auto">
                <code>&lt;section class=&quot;bg-slate-950 text-white min-h-screen&quot;&gt;...&lt;/section&gt;</code>
              </div>
            </div>
            <button
              onClick={() => setCurrentRoute('website-builder')}
              className="w-full py-3 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-500/40 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{language === 'ur' ? 'ویب بلڈر کھولیں' : 'Launch Website Builder'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: AI Android App Builder */}
          <div className="rounded-3xl bg-slate-950/80 border border-rose-500/30 p-8 shadow-2xl hover:border-rose-400/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-600/30">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-white">
                  {language === 'ur' ? 'اینڈرائیڈ ایپ بلڈر (جیٹ پیک کمپوز)' : 'Native Android App Builder'}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  KOTLIN 2.0
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {language === 'ur'
                  ? 'اینڈرائیڈ اسٹوڈیو کے لیے تیار شدہ کوٹلن کوڈ، MainActivity.kt، build.gradle.kts اور مینی فیسٹ فائلز خودکار طریقے سے بنائیں۔'
                  : 'Synthesize clean Kotlin, Material 3, and Jetpack Compose code with Android Studio project scaffolds, Gradle configurations, and architecture guidance.'}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-6 font-mono text-xs text-emerald-400 overflow-x-auto">
                <code>@Composable fun AppDashboard() &#123; Surface(color = Color(0xFF0F172A)) &#125;</code>
              </div>
            </div>
            <button
              onClick={() => setCurrentRoute('app-builder')}
              className="w-full py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-200 hover:text-white border border-emerald-500/40 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{language === 'ur' ? 'اینڈرائیڈ بلڈر کھولیں' : 'Launch Android Builder'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Long Video Studio (1 to 20 Min) */}
          <div className="rounded-3xl bg-slate-950/80 border border-rose-500/30 p-8 shadow-2xl hover:border-rose-400/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-rose-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-600/30">
                <Clapperboard className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-white">
                  {language === 'ur' ? 'لانگ ویڈیو اسٹوڈیو (20 منٹ تک)' : 'Long Video Studio (Up to 20 Min)'}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                  1-20 MIN
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {language === 'ur'
                  ? '1، 3، 5، 10، 15 اور 20 منٹ کی طویل ویڈیوز کے لیے منظر وار اسٹوری بورڈ، کیپشنز، اور اردو و انگریزی میں ہم آہنگ صوتی بیانیہ۔'
                  : 'Multi-scene pipeline generating synchronized 1, 3, 5, 10, 15, and 20-minute videos with scene storyboards, subtitles, Urdu and English voiceovers, and retry resilience.'}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-6 text-xs text-purple-300 flex items-center justify-between">
                <span>⏱ Durations: 1m • 3m • 5m • 10m • 15m • 20m</span>
                <span className="text-slate-400">16:9 / 9:16 / 1:1</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentRoute('long-video-studio')}
              className="w-full py-3 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{language === 'ur' ? 'ویڈیو اسٹوڈیو کھولیں' : 'Launch Video Studio'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 4: Vercel Deploy Center */}
          <div className="rounded-3xl bg-slate-950/80 border border-rose-500/30 p-8 shadow-2xl hover:border-rose-400/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-pink-600/30">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-white">
                  {language === 'ur' ? 'ورسل ڈیپلائے سینٹر' : 'Vercel Deploy Center'}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold">
                  1-CLICK HOSTING
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {language === 'ur'
                  ? 'تیار کردہ ویب سائٹس کو ایک کلک میں ورسل پر لائیو پریویو اور پروڈکشن میں شائع کریں، ریئل ٹائم بلڈ لاگز اور کسٹم ڈومین سپورٹ کے ساتھ۔'
                  : 'Direct deployment pipeline to Vercel: Preview URLs for inspection, Production deployment confirmation, real-time terminal build logs, and custom domain linking.'}
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-6 text-xs text-pink-300 font-mono flex items-center justify-between">
                <span>https://your-project.vercel.app</span>
                <span className="text-emerald-400 font-semibold">● 200 OK</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentRoute('vercel-deploy')}
              className="w-full py-3 rounded-xl bg-pink-600/20 hover:bg-pink-600 text-pink-200 hover:text-white border border-pink-500/40 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{language === 'ur' ? 'ورسل ڈیپلائے کھولیں' : 'Launch Deploy Center'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Owner & User Financial Ecosystem: Wallet, Deposit, Cashout & Zero-Invest Earning */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-rose-900/50">
        <div className="bg-gradient-to-r from-emerald-950/60 via-slate-950 to-rose-950/60 border border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                  <Coins className="w-3.5 h-3.5" />
                  {language === 'ur' ? 'مالک اور صارفین کے لیے مکمل فنانشل سسٹم' : 'Zero-Investment Earning & Direct Cashout Hub'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {language === 'ur'
                    ? 'والٹ، ڈپازٹ، فوری کیش آؤٹ اور بغیر سرمایہ کاری کمائی'
                    : 'Interactive Wallet, Instant Cashout & 5 Earning Streams'}
                </h2>
                <p className="text-sm text-slate-300 max-w-2xl mt-1">
                  {language === 'ur'
                    ? 'EasyPaisa، JazzCash، بینک اور USDT کے ذریعے رقم جمع کروائیں اور فوراً نکلوائیں۔ روزانہ $2.50 (700 روپے) کیش بونس، 30% لائف ٹائم ریفرل اور ایڈسینس سے روزانہ کمائیں۔'
                    : 'EasyPaisa, JazzCash, Raast, Bank Transfer and USDT support. Zero-investment earnings: $2.50 daily claim, 30% lifetime referrals, AdSense revenue sharing, and verified owner approvals.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCurrentRoute('wallet')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
                >
                  <Wallet className="w-4 h-4" />
                  <span>{language === 'ur' ? 'والٹ اور کیش آؤٹ' : 'Open Wallet & Cashout'}</span>
                </button>
                <button
                  onClick={() => setCurrentRoute('earning-hub')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-600/30 transition-all hover:scale-105"
                >
                  <Coins className="w-4 h-4" />
                  <span>{language === 'ur' ? 'مفت کمائی سینٹر' : 'Zero-Invest Earning Hub'}</span>
                </button>
                <button
                  onClick={() => setCurrentRoute('admin-payouts')}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all"
                  title="Owner Approvals"
                >
                  <Shield className="w-4 h-4 text-rose-400" />
                  <span>{language === 'ur' ? 'مالک کیش آؤٹ منظوری' : 'Owner Approvals'}</span>
                </button>
              </div>
            </div>

            {/* 3 Interactive Highlight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1 */}
              <div
                onClick={() => setCurrentRoute('wallet')}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all hover:-translate-y-1 group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Wallet className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1 flex items-center justify-between">
                  <span>{language === 'ur' ? 'ڈپازٹ اور کیش آؤٹ فارمز' : 'Deposit & Withdrawal Forms'}</span>
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'ur'
                    ? 'EasyPaisa، JazzCash، میزان بینک اور ٹیلیگرام / یو ایس ڈی ٹی سے فوری ٹرانزیکشن۔ رسید ڈاؤن لوڈ اور ٹرانزیکشن آئی ڈی تصدیق۔'
                    : 'Submit deposits with TID verification, request cashouts directly to Pakistani accounts or USDT with 0% fees.'}
                </p>
                <div className="mt-3 flex gap-2 text-[10px] font-mono text-emerald-400">
                  <span className="bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">EasyPaisa</span>
                  <span className="bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">JazzCash</span>
                  <span className="bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">USDT</span>
                </div>
              </div>

              {/* Box 2 */}
              <div
                onClick={() => setCurrentRoute('earning-hub')}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all hover:-translate-y-1 group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1 flex items-center justify-between">
                  <span>{language === 'ur' ? 'بغیر سرمایہ کاری روزانہ کمائی' : 'Zero-Investment Daily Cash'}</span>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'ur'
                    ? 'روزانہ $2.50 (700 روپے) مفت کلیم کریں، واٹس ایپ پر 30% لائف ٹائم ریفرل لنک شیئر کریں اور مائیکرو ٹاسکس مکمل کریں۔'
                    : 'Claim daily $2.50 (Rs 700) rewards, earn 30% lifetime referral commissions via WhatsApp, and complete micro AI tasks.'}
                </p>
                <div className="mt-3 flex gap-2 text-[10px] font-mono text-amber-400">
                  <span className="bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">Daily $2.50</span>
                  <span className="bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">30% Ref</span>
                  <span className="bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">Micro-Tasks</span>
                </div>
              </div>

              {/* Box 3 */}
              <div
                onClick={() => setCurrentRoute('admin-payouts')}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/50 cursor-pointer transition-all hover:-translate-y-1 group"
              >
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1 flex items-center justify-between">
                  <span>{language === 'ur' ? 'مالک کیش آؤٹ منظوری پینل' : 'Owner Approvals Terminal'}</span>
                  <ChevronRight className="w-4 h-4 text-rose-400" />
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'ur'
                    ? 'صارفین کی تمام کیش آؤٹ اور ڈپازٹ کی درخواستوں کا جائزہ لیں، ایک کلک میں منظور یا مسترد کریں، خودکار لیجر اپڈیٹ۔'
                    : 'Review pending payouts, approve withdrawals to EasyPaisa/JazzCash, track platform fees, and manage total user ledger.'}
                </p>
                <div className="mt-3 flex gap-2 text-[10px] font-mono text-rose-400">
                  <span className="bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">1-Click Approve</span>
                  <span className="bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">Ledger</span>
                  <span className="bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">Audit Trail</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="py-16 px-4 bg-slate-950/60 border-y border-rose-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-black text-white mb-2">70+</div>
            <p className="text-xs sm:text-sm text-rose-200/80 font-medium">
              {language === 'ur' ? 'مکمل اے آئی ٹولز' : 'Production AI Tools'}
            </p>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-rose-400 mb-2">20 Min</div>
            <p className="text-xs sm:text-sm text-rose-200/80 font-medium">
              {language === 'ur' ? 'لانگ فارم ویڈیو جنریشن' : 'Max Continuous Video'}
            </p>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-white mb-2">100+</div>
            <p className="text-xs sm:text-sm text-rose-200/80 font-medium">
              {language === 'ur' ? 'زبانوں کی اعلٰی سپورٹ (اردو)' : 'Supported Global Languages'}
            </p>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 mb-2">99.98%</div>
            <p className="text-xs sm:text-sm text-rose-200/80 font-medium">
              {language === 'ur' ? 'سسٹم اپ ٹائم اور دستیابی' : 'Deployment Availability'}
            </p>
          </div>
        </div>
      </section>

      {/* In-Content Ad Placement */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdBanner placement="inContent" />
      </div>

      {/* Call to action */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
          {language === 'ur'
            ? 'کیا آپ اپنے اگلے بڑے پروجیکٹ کے لیے تیار ہیں؟'
            : 'Ready to Experience Next-Generation AI?'}
        </h2>
        <p className="text-rose-100/80 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          {language === 'ur'
            ? 'آج ہی مفت کریڈٹس کے ساتھ تمام 70+ ٹولز، ویب بلڈر اور ویڈیو اسٹوڈیو کا تجربہ کریں۔'
            : 'Start building immediately with complimentary enterprise credits. No credit card required.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setCurrentRoute('explore-tools')}
            className="px-8 py-4 rounded-xl bg-white text-rose-950 font-bold text-base hover:bg-rose-50 shadow-2xl transition-all hover:scale-105"
          >
            {language === 'ur' ? 'تمام 70+ ٹولز دیکھیں' : 'Explore All 70+ Tools'}
          </button>
          <button
            onClick={() => setCurrentRoute('pricing')}
            className="px-8 py-4 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/50 text-white font-bold text-base transition-all"
          >
            {language === 'ur' ? 'قیمتوں کے منصوبے' : 'View Pricing Plans'}
          </button>
        </div>
      </section>
    </div>
  );
};
