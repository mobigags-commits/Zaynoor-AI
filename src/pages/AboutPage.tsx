import React from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2,
  Users2,
  Cpu,
  Layers,
  Award,
  ArrowRight,
  Terminal,
  Lock,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, setCurrentRoute } = useApp();

  const milestones = [
    { year: '2025', titleEn: 'Platform Genesis', titleUr: 'پلیٹ فارم کا آغاز', descEn: 'Conceived as an all-in-one autonomous engineering and media synthesis engine.', descUr: 'خودکار انجینئرنگ اور میڈیا تخلیق کے واحد پلیٹ فارم کے طور پر بنیاد رکھی گئی۔' },
    { year: '2026', titleEn: '70+ Production AI Tools', titleUr: '70 سے زائد مکمل ٹولز', descEn: 'Shipped instant website building, Jetpack Compose Android app synthesis, and 20-min long video studios.', descUr: 'ویب سائٹ بلڈر، اینڈرائیڈ کوٹلن جنریٹر اور 20 منٹ کی سنیماٹک ویڈیو انجن کا اجراء۔' },
    { year: '2026', titleEn: 'Zero-Investment & Global Wallet', titleUr: 'عالمی والٹ و مفت کمائی', descEn: 'Integrated EasyPaisa, JazzCash, Raast, USDT, and zero-investment AdSense / referral yield programs.', descUr: 'ایزی پیسہ، جیز کیش، یو ایس ڈی ٹی اور بغیر سرمایہ کاری کے کمائی کا نظام مربوط کیا گیا۔' },
  ];

  const coreValues = [
    {
      icon: ShieldCheck,
      titleEn: 'Strict Zero-Data-Sale Policy',
      titleUr: 'ڈیٹا کی مکمل حفاظت',
      descEn: 'We enforce enterprise privacy. User prompts, generated code, and media assets remain 100% user-owned with zero unauthorized harvesting.',
      descUr: 'صارفین کا ڈیٹا، تیار کردہ کوڈ اور میڈیا مکمل طور پر صارف کی ملکیت رہتا ہے۔ ہم ڈیٹا فروخت نہیں کرتے۔',
    },
    {
      icon: Zap,
      titleEn: 'Sub-Second Edge Infrastructure',
      titleUr: 'انتہائی تیز رفتار کارکردگی',
      descEn: 'Distributed global edge architecture ensuring sub-50ms token routing and high-availability streaming across 300+ edge locations.',
      descUr: 'عالمی سطح پر تیز ترین نوڈز اور ڈسٹری بیوٹڈ انفراسٹرکچر جو بغیر کسی تعطل کے فوری نتائج فراہم کرتا ہے۔',
    },
    {
      icon: Globe2,
      titleEn: 'First-Class Bilingual Architecture',
      titleUr: 'مکمل دو لسانی معاونت (اردو و انگریزی)',
      descEn: 'Native Urdu RTL with Noto Nastaliq typography alongside global English LTR for equitable access to cutting-edge AI technologies.',
      descUr: 'نستعلیق رسم الخط اور دائیں سے بائیں (RTL) لے آؤٹ کے ساتھ اردو زبان کی مکمل ترجیحی سپورٹ۔',
    },
    {
      icon: Award,
      titleEn: 'Autonomous Software Engineering',
      titleUr: 'خودکار سافٹ ویئر انجینئرنگ',
      descEn: 'From high-CTR landing pages to Android Studio ready Gradle projects, we bridge the gap between imagination and production code.',
      descUr: 'ریسپانسو ویب سائٹس سے لے کر مکمل اینڈرائیڈ ایپس تک پروڈکشن گریڈ کوڈ کی فوری فراہمی۔',
    },
  ];

  const leadership = [
    { name: 'Dr. Tariq Zaynoor', role: 'Founder & Chief Architect', bio: 'Former AI research lead specializing in multimodal neural architectures and distributed systems.' },
    { name: 'Ayesha Khan', role: 'Head of Product & Design', bio: 'Pioneering accessible, anti-slop design constitutions and human-centric software engineering.' },
    { name: 'Marcus Vance', role: 'VP of Security & Infrastructure', bio: 'Specialist in zero-trust cloud infrastructure, edge computing, and PCI-DSS compliance.' },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'زینور اے آئی کے بارے میں — ہمارا مشن اور ٹیکنالوجی' : 'About Zaynoor AI — Our Mission, Architecture & Team'}
        description="Learn about Zaynoor AI, the ultimate autonomous platform for website building, Android apps, 20-minute video studios, and zero-investment earning."
        schemaType="Organization"
      />

      <div className="max-w-5xl mx-auto w-full space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'ہمارا مشن اور وژن' : 'About Zaynoor AI Ecosystem'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'ur' ? 'مصنوعی ذہانت کو حقیقی پیداواری طاقت میں تبدیل کرنا' : 'Bridging Imagination & Production Software'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {language === 'ur'
              ? 'زینور اے آئی ایک جدید ترین ایکو سسٹم ہے جو عام چیٹ سے کہیں آگے بڑھ کر مکمل ویب سائٹس، کوٹلن اینڈرائیڈ ایپس، 20 منٹ کی سنیماٹک ویڈیوز اور ورسل پر لائیو ڈیپلائمنٹ کی خودکار سہولت فراہم کرتا ہے۔'
              : 'Zaynoor AI is an enterprise-grade autonomous intelligence platform engineered to replace superficial wrappers with robust, production-ready digital deliverables. From instant web development to 20-minute video synthesis and fintech wallet processing.'}
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreValues.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition-all shadow-lg group">
                <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-700/50 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{language === 'ur' ? v.titleUr : v.titleEn}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{language === 'ur' ? v.descUr : v.descEn}</p>
              </div>
            );
          })}
        </div>

        {/* Platform Architecture & Tech Stack */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {language === 'ur' ? 'ٹیکنالوجی آرکیٹیکچر اور تحفظ' : 'Enterprise Technology Stack'}
              </h2>
              <p className="text-xs text-slate-400">Scalable, hardened, and verified for production workloads</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-rose-400 font-bold block mb-1">AI Models</span>
              <span className="text-slate-300">Gemini 3.8 Flash, Gemini 4 Argon, Neural Video Pipeline</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">Mobile Stack</span>
              <span className="text-slate-300">Android 15, Kotlin 2.0, Jetpack Compose, Material 3</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">Cloud & Hosting</span>
              <span className="text-slate-300">Vercel Edge, Google Cloud Run, Express micro-routes</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-blue-400 font-bold block mb-1">Financial Rails</span>
              <span className="text-slate-300">EasyPaisa, JazzCash, Meezan Raast, USDT TRC-20</span>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white text-center">
            {language === 'ur' ? 'ہمارا ارتقاء اور سنگ میل' : 'Our Engineering Milestones'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 relative">
                <div className="text-2xl font-extrabold text-rose-500 mb-1">{m.year}</div>
                <h4 className="text-sm font-bold text-white mb-2">{language === 'ur' ? m.titleUr : m.titleEn}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{language === 'ur' ? m.descUr : m.descEn}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white text-center">
            {language === 'ur' ? 'قیادت اور ٹیم' : 'Executive Leadership'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {leadership.map((leader, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 mx-auto flex items-center justify-center font-bold text-xl text-white mb-3 shadow-md">
                  {leader.name.charAt(0)}
                </div>
                <h3 className="font-bold text-sm text-white">{leader.name}</h3>
                <p className="text-[11px] text-rose-400 font-medium mb-2">{leader.role}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-rose-950/60 border border-rose-500/30 space-y-4">
          <h3 className="text-2xl font-bold text-white">
            {language === 'ur' ? 'کیا آپ اگلی نسل کا سافٹ ویئر بنانے کے لیے تیار ہیں؟' : 'Ready to Experience Autonomous AI Creation?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            {language === 'ur' ? 'ابھی 70 سے زائد ٹولز آزمائیں یا ویب سائٹ اور اینڈرائیڈ ایپ بلڈر کا مفت استعمال شروع کریں۔' : 'Explore all 70+ AI tools, design full responsive web pages, or generate long-form video content now.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setCurrentRoute('explore-tools')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2"
            >
              <span>{language === 'ur' ? 'تمام ٹولز دریافت کریں' : 'Explore All 70+ Tools'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentRoute('contact')}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-all"
            >
              {language === 'ur' ? 'ہم سے رابطہ کریں' : 'Contact Support'}
            </button>
          </div>
        </div>

        <AdBanner placement="inContent" />
      </div>
    </div>
  );
};
