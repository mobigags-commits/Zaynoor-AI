import React from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import {
  FolderKanban,
  Globe,
  Smartphone,
  Clapperboard,
  Wallet,
  Zap,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Download,
  Share2,
  CheckCircle2,
  Sparkles,
  Play,
  Layers,
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { user, wallet, currency, setCurrentRoute, language, claimDailyBonus } = useApp();

  const userProjects = [
    {
      id: 'proj-1',
      name: 'Cyberpunk FinTech Landing',
      type: 'Website',
      date: 'Oct 28, 2026',
      status: 'Ready on Vercel',
      statusColor: 'text-emerald-400',
      icon: Globe,
      route: 'website-builder',
    },
    {
      id: 'proj-2',
      name: 'CryptoTrack Jetpack Compose',
      type: 'Android Kotlin App',
      date: 'Oct 27, 2026',
      status: 'APK Ready',
      statusColor: 'text-blue-400',
      icon: Smartphone,
      route: 'app-builder',
    },
    {
      id: 'proj-3',
      name: 'Quantum Computing 15-Min Docu',
      type: 'Long Video Studio',
      date: 'Oct 26, 2026',
      status: 'Completed (1080p)',
      statusColor: 'text-purple-400',
      icon: Clapperboard,
      route: 'long-video-studio',
    },
    {
      id: 'proj-4',
      name: 'E-Commerce Urdu Translator Script',
      type: 'Linguistic Engine',
      date: 'Oct 25, 2026',
      status: 'Exported JSON',
      statusColor: 'text-amber-400',
      icon: Layers,
      route: 'translator',
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'یوزر پروجیکٹس ڈیش بورڈ — زینور اے آئی' : 'User Projects Dashboard — Zaynoor AI'}
        description="Monitor your generated websites, Android Kotlin apps, long-form videos, and wallet balance."
      />

      <div className="max-w-6xl mx-auto w-full space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-2xl ring-2 ring-rose-500/40 object-cover shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600/30 text-rose-300 border border-rose-500/40 uppercase">
                  {user.tier} Member
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentRoute('wallet')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400 flex items-center gap-2 transition-all shadow-sm"
            >
              <Wallet className="w-4 h-4" />
              <span>
                {currency === 'PKR'
                  ? `Rs ${(wallet.availableBalance * 280).toLocaleString()}`
                  : `$${wallet.availableBalance.toFixed(2)}`}
              </span>
            </button>
            <button
              onClick={() => setCurrentRoute('website-builder')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-600/30 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'نیا پراجیکٹ' : 'New Project'}</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">
              {language === 'ur' ? 'دستیاب کریڈٹس' : 'Available Credits'}
            </span>
            <div className="text-2xl font-black text-white">{user.credits}</div>
            <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+500 Monthly Quota</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">
              {language === 'ur' ? 'والٹ کیش آؤٹ بیلنس' : 'Cashable Balance'}
            </span>
            <div className="text-2xl font-black text-emerald-400">
              {currency === 'PKR'
                ? `Rs ${(wallet.availableBalance * 280).toLocaleString()}`
                : `$${wallet.availableBalance.toFixed(2)}`}
            </div>
            <button
              onClick={() => setCurrentRoute('wallet')}
              className="mt-2 text-[10px] text-rose-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>{language === 'ur' ? 'کیش آؤٹ کروائیں' : 'Withdraw Funds'}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">
              {language === 'ur' ? 'مکمل پروجیکٹس' : 'Generated Projects'}
            </span>
            <div className="text-2xl font-black text-white">{userProjects.length}</div>
            <div className="mt-2 text-[10px] text-slate-400">Web, Apps &amp; Videos</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
            <span className="text-[11px] font-medium text-slate-400 block mb-1">
              {language === 'ur' ? 'روزانہ مفت کلیم' : 'Daily $2.50 Reward'}
            </span>
            <button
              onClick={() => claimDailyBonus()}
              className="mt-1 w-full py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs transition-all shadow-md"
            >
              {language === 'ur' ? 'کلیم کریں ($2.50)' : 'Claim Daily Bonus'}
            </button>
          </div>
        </div>

        {/* Recent Generated Projects Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-rose-400" />
              <span>{language === 'ur' ? 'آپ کے حالیہ تیار کردہ پراجیکٹس' : 'Recent Project Deliverables'}</span>
            </h2>
            <button
              onClick={() => setCurrentRoute('explore-tools')}
              className="text-xs text-rose-400 font-semibold hover:underline"
            >
              {language === 'ur' ? 'تمام ٹولز دیکھیں' : 'Launch New Tool'} &rarr;
            </button>
          </div>

          <div className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-xl">
            <div className="divide-y divide-slate-800">
              {userProjects.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-rose-400 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white">{p.name}</h3>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span>{p.type}</span>
                          <span>•</span>
                          <span>{p.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span className={`text-xs font-semibold ${p.statusColor}`}>
                        ● {p.status}
                      </span>
                      <button
                        onClick={() => setCurrentRoute(p.route)}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center gap-1"
                      >
                        <span>{language === 'ur' ? 'کھولیں' : 'Open'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Launchers */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">
            {language === 'ur' ? 'فوری جنریٹر ایکشنز' : 'Instant Generation Workspaces'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setCurrentRoute('website-builder')}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500 text-left transition-all group"
            >
              <div className="font-bold text-xs text-white group-hover:text-rose-400">🌐 Website Generator</div>
              <div className="text-[11px] text-slate-400 mt-1">Prompt to responsive HTML &amp; Vercel</div>
            </button>
            <button
              onClick={() => setCurrentRoute('app-builder')}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 text-left transition-all group"
            >
              <div className="font-bold text-xs text-white group-hover:text-emerald-400">📱 Android Compose Builder</div>
              <div className="text-[11px] text-slate-400 mt-1">Export native Kotlin &amp; Material 3</div>
            </button>
            <button
              onClick={() => setCurrentRoute('long-video-studio')}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500 text-left transition-all group"
            >
              <div className="font-bold text-xs text-white group-hover:text-purple-400">🎬 20-Min Video Studio</div>
              <div className="text-[11px] text-slate-400 mt-1">Multi-scene &amp; Urdu voiceover</div>
            </button>
          </div>
        </div>

        <AdBanner placement="inContent" />
      </div>
    </div>
  );
};
