import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdBanner } from './AdBanner';
import { Sparkles, Shield, Heart, Globe, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentRoute, language, setLanguage } = useApp();

  const handleLink = (routeId: string) => {
    setCurrentRoute(routeId);
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-sm mt-auto relative z-20">
      {/* Footer Ad Placement */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <AdBanner placement="footer" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div
              onClick={() => handleLink('home')}
              className="flex items-center gap-2.5 cursor-pointer mb-4"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-700 to-red-500 flex items-center justify-center font-black text-white shadow-md shadow-rose-600/30">
                Z
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Zaynoor<span className="text-rose-500">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
              {language === 'ur'
                ? 'زینور اے آئی ایک جدید اور مکمل مصنوعی ذہانت کا پلیٹ فارم ہے جو ویب سائٹ بلڈنگ، اینڈرائیڈ ایپ جنریشن، 20 منٹ کی لانگ ویڈیوز اور 70 سے زائد ٹولز فراہم کرتا ہے۔'
                : 'Zaynoor AI is an autonomous creative and engineering intelligence ecosystem. Empowering creators, engineers, and enterprises to build, generate, and deploy at the speed of thought.'}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-rose-500/40 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-rose-500" />
                <span>{language === 'en' ? 'اردو ورژن' : 'English Version'}</span>
              </button>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {language === 'ur' ? 'سسٹم فعال ہے' : 'API Cluster Active'}
              </span>
            </div>
          </div>

          {/* Creation & Dev Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-rose-500" />
              <span>{language === 'ur' ? 'تخلیقی ٹولز' : 'Builders & Media'}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('website-builder')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'ویب سائٹ بلڈر' : 'AI Website Builder'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('app-builder')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'اینڈرائیڈ ایپ بلڈر' : 'Android App Builder'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('long-video-studio')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'لانگ ویڈیو اسٹوڈیو' : 'Long Video (20 Min)'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('vercel-deploy')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'ورسل ڈیپلائے سینٹر' : 'Vercel Deploy Center'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('image-generator')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'امیج جنریٹر' : 'AI Image Generator'}
                </button>
              </li>
            </ul>
          </div>

          {/* Core AI Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {language === 'ur' ? 'بنیادی ماڈلز' : 'Core & Intel'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('chat')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'اے آئی چیٹ' : 'AI Chat Assistant'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('translator')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'اردو مترجم' : 'Urdu Translator'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('coding-assistant')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'کوڈنگ اسسٹنٹ' : 'Coding Assistant'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('seo-audit')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'ایس ای او اور GEO' : 'GEO / AEO / EAO'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('models')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'ماڈل ڈائرکٹری' : 'Model Directory'}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-rose-500" />
              <span>{language === 'ur' ? 'قانونی و رازداری' : 'Legal & Trust'}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('privacy')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'پرائیویسی پالیسی' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('terms')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'استعمال کی شرائط' : 'Terms of Service'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('cookie-policy')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'کوکی پالیسی' : 'Cookie Policy'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('safety-policy')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'مواد کی سیفٹی' : 'Safety & AI Policy'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('admin-ads')} className="hover:text-rose-400 transition-colors">
                  {language === 'ur' ? 'ایڈسینس ترتیبات' : 'AdSense Publisher'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400">
            &copy; 2026 Zaynoor AI Inc. All rights reserved. Built with precision for creators and developers worldwide.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => handleLink('faq')} className="hover:text-white transition-colors">
              FAQ
            </button>
            <button onClick={() => handleLink('blog')} className="hover:text-white transition-colors">
              Blog
            </button>
            <button onClick={() => handleLink('help')} className="hover:text-white transition-colors">
              Support
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-0.5"
            >
              <span>Sitemap</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
