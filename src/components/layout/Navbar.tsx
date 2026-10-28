import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Moon,
  Sun,
  Globe,
  Zap,
  Menu,
  X,
  Shield,
  Layers,
  Sparkles,
  Smartphone,
  Clapperboard,
  LayoutDashboard,
  Wallet,
  Coins,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    setCurrentRoute,
    language,
    setLanguage,
    theme,
    toggleTheme,
    user,
    setIsCommandPaletteOpen,
    wallet,
    currency,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'wallet', labelEn: 'Wallet (PKR/$)', labelUr: 'والٹ و ادائیگی', icon: Layers },
    { id: 'earning-hub', labelEn: 'Earning Hub', labelUr: 'مفت کمائی', icon: Sparkles },
    { id: 'chat', labelEn: 'AI Chat', labelUr: 'اے آئی چیٹ', icon: Sparkles },
    { id: 'explore-tools', labelEn: 'All 70+ Tools', labelUr: 'تمام 70+ ٹولز', icon: Layers },
    { id: 'website-builder', labelEn: 'Website Builder', labelUr: 'ویب بلڈر', icon: Layers },
    { id: 'app-builder', labelEn: 'Android Builder', labelUr: 'اینڈرائیڈ بلڈر', icon: Smartphone },
    { id: 'long-video-studio', labelEn: 'Long Video (20m)', labelUr: 'ویڈیو اسٹوڈیو', icon: Clapperboard },
    { id: 'vercel-deploy', labelEn: 'Vercel Deploy', labelUr: 'ورسل ڈیپلائے', icon: Zap },
    { id: 'pricing', labelEn: 'Pricing', labelUr: 'قیمتیں', icon: Zap },
  ];

  const handleNavClick = (routeId: string) => {
    setCurrentRoute(routeId);
    setMobileMenuOpen(false);
  };

  const isHome = currentRoute === 'home';

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors border-b ${
        isHome
          ? 'bg-rose-950/80 border-rose-900/50 backdrop-blur-xl text-white'
          : 'bg-slate-950/85 dark:bg-slate-950/85 border-slate-800/80 backdrop-blur-xl text-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 via-red-600 to-rose-950 p-[1.5px] shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
              <span className="text-xl font-black bg-gradient-to-tr from-rose-500 via-rose-300 to-white bg-clip-text text-transparent">
                Z
              </span>
              <div className="absolute inset-0 bg-rose-500/10 blur-sm pointer-events-none"></div>
            </div>
            {/* Sparkle badge */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight flex items-center gap-1.5 leading-none">
              <span className="text-white">Zaynoor</span>
              <span className="text-rose-500">AI</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.2 rounded bg-gradient-to-r from-rose-600 to-red-600 text-white ml-1 shadow-sm shadow-rose-600/40">
                PRO
              </span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
              {language === 'ur' ? 'پریمیم اے آئی ایکو سسٹم' : 'Enterprise AI Ecosystem'}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {language === 'ur' ? item.labelUr : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 text-xs font-medium transition-all shadow-inner group"
            title="Search Tools (Cmd+K / Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">
              {language === 'ur' ? 'تلاش کریں...' : 'Search tools...'}
            </span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Language Switcher (Urdu / English) */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-700/60 text-xs font-semibold text-slate-200 transition-colors"
            title="Switch Language (Urdu / English)"
          >
            <Globe className="w-3.5 h-3.5 text-rose-400" />
            <span>{language === 'en' ? 'اردو' : 'EN'}</span>
          </button>

          {/* Dark / Light Mode Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          {/* Wallet Quick Balance Button */}
          <button
            onClick={() => setCurrentRoute('wallet')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950/70 to-slate-900 border border-emerald-500/40 text-xs font-bold text-emerald-300 hover:border-emerald-400 hover:scale-105 transition-all shadow-sm"
            title="Wallet (Deposit & Withdraw)"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {currency === 'PKR'
                ? `Rs ${(wallet.availableBalance * 280).toLocaleString()}`
                : `$${wallet.availableBalance.toFixed(2)}`}
            </span>
          </button>

          {/* Credits Badge */}
          <div
            onClick={() => setCurrentRoute('usage-credits')}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-rose-950/60 border border-rose-600/30 text-xs font-medium cursor-pointer hover:border-rose-500 transition-colors group"
            title="View Usage & Credits"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30 group-hover:scale-110 transition-transform" />
            <span className="text-white font-bold">{user.credits.toLocaleString()}</span>
            <span className="text-[10px] text-rose-300/80">cr</span>
          </div>

          {/* Admin link */}
          <button
            onClick={() => setCurrentRoute('admin')}
            className="p-2 rounded-xl bg-slate-900/70 hover:bg-rose-950/60 border border-slate-700/60 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 transition-colors"
            title="Admin Dashboard"
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => setCurrentRoute('profile')}
            className="relative rounded-full ring-2 ring-rose-500/30 hover:ring-rose-500 transition-all overflow-hidden shrink-0"
            title={user.name}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 xl:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-4 py-5 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-200 hover:bg-rose-950/40 hover:border-rose-500/30 transition-colors"
                >
                  <Icon className="w-4 h-4 text-rose-400" />
                  <span>{language === 'ur' ? item.labelUr : item.labelEn}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>{language === 'ur' ? 'کریڈٹس:' : 'Credits:'} <strong className="text-white">{user.credits}</strong></span>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-rose-400 font-semibold hover:underline flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'ایڈمن پینل' : 'Admin Panel'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
