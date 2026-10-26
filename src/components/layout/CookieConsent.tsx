import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const { cookieConsent, setCookieConsent, language, setCurrentRoute } = useApp();

  if (cookieConsent !== null) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom duration-300">
      <div className="bg-slate-900/95 dark:bg-slate-900/95 border border-rose-500/30 backdrop-blur-xl p-5 rounded-2xl shadow-2xl shadow-rose-950/40 text-slate-200">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-rose-600/20 text-rose-400 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <span>{language === 'ur' ? 'رازداری اور کوکیز کی ترتیبات' : 'Cookie & Privacy Preferences'}</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400 inline" />
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {language === 'ur'
                ? 'ہم پلیٹ فارم کی کارکردگی اور ایڈسینس کے تقاضوں کے مطابق ضروری کوکیز استعمال کرتے ہیں۔ آپ اپنی مرضی کے مطابق ترتیبات کا انتخاب کر سکتے ہیں۔'
                : 'Zaynoor AI uses strictly necessary cookies and analytics to ensure site reliability, session persistence, and AdSense compliance.'}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setCookieConsent(true)}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-colors shadow-sm shadow-rose-600/30"
              >
                {language === 'ur' ? 'تمام قبول کریں' : 'Accept All'}
              </button>
              <button
                onClick={() => setCookieConsent(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                {language === 'ur' ? 'صرف ضروری' : 'Essential Only'}
              </button>
              <button
                onClick={() => setCurrentRoute('cookie-policy')}
                className="text-xs text-rose-400 hover:underline px-2"
              >
                {language === 'ur' ? 'پالیسی پڑھیں' : 'Policy'}
              </button>
            </div>
          </div>
          <button
            onClick={() => setCookieConsent(false)}
            className="text-slate-400 hover:text-white p-1"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
