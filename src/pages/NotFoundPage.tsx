import React from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import {
  Compass,
  Home,
  Search,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { setCurrentRoute, language, setIsCommandPaletteOpen } = useApp();

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-slate-950 text-slate-100 p-6 text-center">
      <SEOHead
        title={language === 'ur' ? '404 — صفحہ نہیں ملا | زینور اے آئی' : '404 — Page Not Found | Zaynoor AI'}
        description="The requested page could not be located in the Zaynoor AI ecosystem."
      />

      <div className="max-w-md w-full space-y-6">
        <div className="relative inline-block">
          <div className="text-8xl font-black bg-gradient-to-r from-rose-500 via-red-500 to-amber-400 bg-clip-text text-transparent">
            404
          </div>
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-rose-600/30 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-rose-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-white">
            {language === 'ur' ? 'مطلوبہ صفحہ دستیاب نہیں ہے' : 'Page Not Found'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {language === 'ur'
              ? 'معذرت، جو صفحہ آپ تلاش کر رہے ہیں وہ موجود نہیں ہے یا اس کا لنک تبدیل ہو گیا ہے۔ آپ نیچے دیے گئے بٹنز کے ذریعے مرکزی صفحہ یا تمام ٹولز دیکھ سکتے ہیں۔'
              : 'The page or tool you requested does not exist or has been relocated. Explore our 70+ AI tools or return home.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setCurrentRoute('home')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>{language === 'ur' ? 'مرکزی صفحہ' : 'Return Home'}</span>
          </button>
          <button
            onClick={() => setCurrentRoute('explore-tools')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Compass className="w-4 h-4 text-rose-400" />
            <span>{language === 'ur' ? 'تمام 70+ ٹولز' : 'Explore All Tools'}</span>
          </button>
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            title="Search Tools (Cmd+K)"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>{language === 'ur' ? 'تلاش کریں' : 'Search (⌘K)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
