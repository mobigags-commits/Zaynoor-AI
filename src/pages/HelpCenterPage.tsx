import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import {
  LifeBuoy,
  BookOpen,
  Search,
  Code,
  Globe,
  Smartphone,
  Clapperboard,
  Wallet,
  Zap,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Terminal,
  HelpCircle,
} from 'lucide-react';

export const HelpCenterPage: React.FC = () => {
  const { language, setCurrentRoute } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const guides = [
    {
      id: 'website-builder-guide',
      category: 'Websites',
      icon: Globe,
      titleEn: 'How to build and preview responsive websites',
      titleUr: 'ریسپانسو ویب سائٹس کیسے بنائیں اور پریویو کریں',
      readTime: '3 min read',
      route: 'website-builder',
      stepsEn: [
        'Open the AI Website Builder from the navigation or home shortcuts.',
        'Enter a natural language brief describing your business, theme, and features.',
        'Choose Tailwind CSS or React framework and click "Generate Website".',
        'Inspect the generated code in real-time or switch to the interactive Live Preview tab.',
        'Download the ready-to-host HTML project or deploy directly to Vercel.',
      ],
      stepsUr: [
        'نیویگیشن یا ہوم پیج سے اے آئی ویب سائٹ بلڈر کھولیں۔',
        'اپنے مطلوبہ کاروبار، تھیم اور فیچرز کے بارے میں قدرتی زبان میں پرامپٹ لکھیں۔',
        'فریم ورک منتخب کریں اور "Generate Website" پر کلک کریں۔',
        'کوڈ کا جائزہ لیں یا براہ راست لائیو پیش نظارہ ٹیب میں چیک کریں۔',
        'مکمل ایچ ٹی ایم ایل پراجیکٹ ڈاؤن لوڈ کریں یا ورسل پر شائع کریں۔',
      ],
    },
    {
      id: 'video-studio-guide',
      category: 'Video Generation',
      icon: Clapperboard,
      titleEn: 'Creating 1 to 20 minute cinematic videos with voiceover',
      titleUr: '1 سے 20 منٹ کی سنیماٹک ویڈیوز اور وائس اوور بنانے کا طریقہ',
      readTime: '4 min read',
      route: 'long-video-studio',
      stepsEn: [
        'Navigate to the Long Video Studio page.',
        'Select target duration (1, 3, 5, 10, 15, or 20 minutes) and aspect ratio (16:9, 9:16, 1:1).',
        'Configure bilingual voiceover settings (Urdu, English, or synchronized dual-language).',
        'Review the multi-scene storyboard where each segment is generated sequentially.',
        'If one scene requires changes, use isolated scene re-render without losing the entire clip.',
      ],
      stepsUr: [
        'لانگ ویڈیو اسٹوڈیو پیج پر جائیں۔',
        'ویڈیو کا دورانیہ (1، 3، 5، 10، 15 یا 20 منٹ) اور اسکرین ریشو منتخب کریں۔',
        'اردو یا انگریزی وائس اوور کا انتخاب کریں۔',
        'منظر وار اسٹوری بورڈ کا جائزہ لیں جہاں ہر سین خودکار طریقے سے تیار ہوتا ہے۔',
        'کسی بھی مخصوص منظر کو پوری ویڈیو ضائع کیے بغیر دوبارہ جنریٹ کریں۔',
      ],
    },
    {
      id: 'android-builder-guide',
      category: 'Mobile Dev',
      icon: Smartphone,
      titleEn: 'Exporting native Android Jetpack Compose Kotlin projects',
      titleUr: 'اینڈرائیڈ جیٹ پیک کمپوز اور کوٹلن پروجیکٹس ایکسپورٹ کرنا',
      readTime: '3 min read',
      route: 'app-builder',
      stepsEn: [
        'Launch the Android Builder and specify your app package name and description.',
        'The engine writes MainActivity.kt with modern Compose declarative UI, build.gradle.kts, and Manifest.',
        'Copy the code or download the scaffolded project files.',
        'Open in Android Studio (Hedgehog/Iguana/Ladybug) and run on real devices or emulator.',
      ],
      stepsUr: [
        'اینڈرائیڈ بلڈر کھولیں اور اپنی ایپ کا نام اور پیکیج درج کریں۔',
        'سسٹم مکمل کوٹلن کوڈ، مینی فیسٹ اور گریڈل فائلز تیار کرے گا۔',
        'کوڈ کاپی کریں یا پروجیکٹ فائلز ڈاؤن لوڈ کریں۔',
        'اینڈرائیڈ اسٹوڈیو میں کھولیں اور ڈیوائس یا ایمولیٹر پر رن کریں۔',
      ],
    },
    {
      id: 'wallet-guide',
      category: 'Fintech & Wallet',
      icon: Wallet,
      titleEn: 'Depositing and withdrawing funds with EasyPaisa, JazzCash & USDT',
      titleUr: 'ایزی پیسہ، جیز کیش اور یو ایس ڈی ٹی سے ڈپازٹ اور کیش آؤٹ',
      readTime: '2 min read',
      route: 'wallet',
      stepsEn: [
        'Open the Wallet & Payments console from the header quick button.',
        'To deposit: choose payment method, enter amount, and provide Transaction ID (TID).',
        'To withdraw: select your payment provider, input phone/IBAN, CNIC, and 4-digit PIN.',
        'Withdrawal requests are processed with 0% platform fee and verified in real time.',
      ],
      stepsUr: [
        'ہیڈر میں موجود والٹ بٹن سے والٹ پیج کھولیں۔',
        'ڈپازٹ کے لیے طریقہ منتخب کر کے ٹرانزیکشن آئی ڈی درج کریں۔',
        'کیش آؤٹ کے لیے اپنا اکاؤنٹ نمبر، شناختی کارڈ اور 4 ہندسوں کا پن درج کریں۔',
        'تمام کیش آؤٹ بغیر کسی کٹوتی (0% فیس) کے شفاف طریقے سے پروسیس ہوتے ہیں۔',
      ],
    },
    {
      id: 'earning-guide',
      category: 'Zero-Investment',
      icon: Zap,
      titleEn: 'How to earn daily revenue without investment',
      titleUr: 'بغیر سرمایہ کاری روزانہ آمدنی حاصل کرنے کا طریقہ',
      readTime: '2 min read',
      route: 'earning-hub',
      stepsEn: [
        'Go to the Zero-Investment Earning Hub from the navigation menu.',
        'Claim your free $2.50 (Rs 700) daily attendance credit once every 24 hours.',
        'Copy your 30% lifetime referral link and share directly via the 1-click WhatsApp button.',
        'Complete short AI evaluation micro-tasks for $1.00 each.',
        'Transfer earned balances to your main wallet and request cashout anytime.',
      ],
      stepsUr: [
        'مفت کمائی سینٹر (Earning Hub) پر جائیں۔',
        'روزانہ کا $2.50 (700 روپے) کیش بونس کلیم کریں۔',
        'اپنا 30% لائف ٹائم ریفرل لنک ایک کلک پر واٹس ایپ پر شیئر کریں۔',
        'مائیکرو اے آئی ٹاسکس مکمل کر کے ہر ٹاسک پر $1.00 کمائیں۔',
        'کمائی گئی رقم اپنے والٹ میں منتقل کر کے کسی بھی وقت کیش آؤٹ کروائیں۔',
      ],
    },
  ];

  const filteredGuides = guides.filter(
    (g) =>
      g.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.titleUr.includes(searchQuery) ||
      g.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'ہیلپ سینٹر اور گائیڈز — زینور اے آئی' : 'Help Center & Documentation — Zaynoor AI'}
        description="Comprehensive guides, tutorials, and troubleshooting for Zaynoor AI website builder, Android generator, long video studio, and payments."
        schemaType="FAQPage"
      />

      <div className="max-w-5xl mx-auto w-full space-y-10">
        {/* Header and Search */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-semibold">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'رہنمائی اور معاونت' : 'Documentation & Help Center'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {language === 'ur' ? 'آپ کس چیز میں رہنمائی چاہتے ہیں؟' : 'How can we assist you today?'}
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            {language === 'ur' ? 'تمام فیچرز، ویڈیوز، ویب بلڈر اور ادائیگیوں کے مرحلہ وار اسباق' : 'Search step-by-step guides, video workflows, API documentation, and fintech support.'}
          </p>

          <div className="max-w-xl mx-auto relative pt-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 mt-1" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ur' ? 'ٹول یا موضوع تلاش کریں (مثلاً: ویڈیو، ویب سائٹ، کیش آؤٹ)...' : 'Search guides (e.g. video studio, website builder, withdrawal)...'}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 shadow-xl"
            />
          </div>
        </div>

        {/* Quick Category Jump */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setCurrentRoute('website-builder')}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/40 text-left transition-all group"
          >
            <Globe className="w-5 h-5 text-rose-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-white">Website Builder</div>
            <div className="text-[11px] text-slate-400">Live preview &amp; HTML export</div>
          </button>
          <button
            onClick={() => setCurrentRoute('long-video-studio')}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 text-left transition-all group"
          >
            <Clapperboard className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-white">20-Min Video Studio</div>
            <div className="text-[11px] text-slate-400">Multi-scene &amp; voiceover</div>
          </button>
          <button
            onClick={() => setCurrentRoute('wallet')}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-left transition-all group"
          >
            <Wallet className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-white">Wallet &amp; Cashout</div>
            <div className="text-[11px] text-slate-400">EasyPaisa &amp; JazzCash rails</div>
          </button>
          <button
            onClick={() => setCurrentRoute('vercel-deploy')}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/40 text-left transition-all group"
          >
            <Zap className="w-5 h-5 text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-white">Vercel Deploy</div>
            <div className="text-[11px] text-slate-400">1-click production host</div>
          </button>
        </div>

        {/* Step-by-Step Guides List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center justify-between">
            <span>{language === 'ur' ? 'تفصیلی رہنمائی گائیڈز' : 'Featured Step-by-Step Tutorials'}</span>
            <span className="text-xs text-slate-400 font-normal">({filteredGuides.length} articles)</span>
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {filteredGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <div key={guide.id} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-rose-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider block">
                          {guide.category}
                        </span>
                        <h3 className="text-base font-bold text-white">
                          {language === 'ur' ? guide.titleUr : guide.titleEn}
                        </h3>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 hidden sm:inline">{guide.readTime}</span>
                  </div>

                  <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/80 space-y-2">
                    {(language === 'ur' ? guide.stepsUr : guide.stepsEn).map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="w-5 h-5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/60 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => setCurrentRoute(guide.route)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                      <span>{language === 'ur' ? 'ٹول پر جائیں' : 'Launch Tool'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Keyboard Shortcuts & Pro Tips */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-rose-400" />
            <h3 className="font-bold text-sm text-white">
              {language === 'ur' ? 'کی بورڈ شارٹ کٹس اور تجاویز' : 'Keyboard Shortcuts & Quick Navigation'}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Open Command Palette</span>
              <kbd className="px-2 py-0.5 bg-slate-800 text-rose-300 rounded font-mono text-[11px] border border-slate-700">Ctrl + K / ⌘K</kbd>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Toggle Language (Urdu/EN)</span>
              <kbd className="px-2 py-0.5 bg-slate-800 text-rose-300 rounded font-mono text-[11px] border border-slate-700">Header Icon</kbd>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Instant Wallet Access</span>
              <kbd className="px-2 py-0.5 bg-slate-800 text-rose-300 rounded font-mono text-[11px] border border-slate-700">Wallet Pill</kbd>
            </div>
          </div>
        </div>

        {/* Support CTA */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-rose-950/40 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-white">
              {language === 'ur' ? 'کیا آپ کو مزید تکنیکی مدد درکار ہے؟' : 'Still need dedicated technical assistance?'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ur' ? 'ہماری سپورٹ ٹیم چند گھنٹوں میں آپ سے رابطہ کرے گی۔' : 'Enterprise tickets and dedicated developer support are available 24/7.'}
            </p>
          </div>
          <button
            onClick={() => setCurrentRoute('contact')}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shrink-0"
          >
            {language === 'ur' ? 'ٹکٹ کھولیں' : 'Open Support Ticket'}
          </button>
        </div>

        <AdBanner placement="inContent" />
      </div>
    </div>
  );
};
