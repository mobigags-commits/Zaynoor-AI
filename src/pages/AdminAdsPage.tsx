import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import {
  BadgeDollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sliders,
  Save,
  Eye,
  ExternalLink,
} from 'lucide-react';

export const AdminAdsPage: React.FC = () => {
  const { language, adSettings, updateAdSettings } = useApp();
  const [publisherId, setPublisherId] = useState(adSettings.publisherId);
  const [headerAd, setHeaderAd] = useState(adSettings.headerAd);
  const [sidebarAd, setSidebarAd] = useState(adSettings.sidebarAd);
  const [inContentAd, setInContentAd] = useState(adSettings.inContentAd);
  const [footerAd, setFooterAd] = useState(adSettings.footerAd);
  const [testMode, setTestMode] = useState(adSettings.testMode);
  const [enabled, setEnabled] = useState(adSettings.enabled);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    updateAdSettings({
      publisherId,
      headerAd,
      sidebarAd,
      inContentAd,
      footerAd,
      testMode,
      enabled,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'اشتہارات کی انتظامیہ — زینور اے آئی' : 'Google AdSense & Ad Management — Zaynoor AI'}
        description="Configure Google AdSense publisher ID, unit placements, ads.txt validation, test preview modes, and layout shift protection."
      />

      <div className="max-w-5xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-semibold mb-2">
            <BadgeDollarSign className="w-3.5 h-3.5" />
            <span>Google AdSense &amp; Monetization Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Advertisement &amp; Publisher Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Control placement visibility, reserved CLS containers, test modes, and ads.txt compliance. Real ad serving remains strictly disabled until authorized publisher credentials are saved.
          </p>
        </div>

        {/* Publisher ID & Master Switch */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-sm">Global Ad Serving Switch</h3>
              <p className="text-xs text-slate-400">Toggle all ad units across the entire platform.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Google AdSense Publisher ID
              </label>
              <input
                type="text"
                value={publisherId}
                onChange={(e) => setPublisherId(e.target.value)}
                placeholder="ca-pub-0000000000000000"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Found in your Google AdSense account &gt; Account &gt; Settings &gt; Account Information.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Operation Mode
              </label>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setTestMode(true)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    testMode
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Test Mode (Preview Placeholders)
                </button>
                <button
                  type="button"
                  onClick={() => setTestMode(false)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    !testMode
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  Live Production Ads
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Test mode renders clean placeholders with exact reserved dimensions.
              </p>
            </div>
          </div>
        </div>

        {/* Ad Placement Slots Control */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Sliders className="w-4 h-4 text-rose-500" />
            <span>Ad Slot Position Controls</span>
          </h3>

          <div className="space-y-3">
            {/* Header Placement */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <p className="font-semibold text-xs text-white">Header Leaderboard (728x90 / Responsive)</p>
                <p className="text-[11px] text-slate-400">Renders directly below top navigation with layout reservation.</p>
              </div>
              <input
                type="checkbox"
                checked={headerAd}
                onChange={(e) => setHeaderAd(e.target.checked)}
                className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
              />
            </div>

            {/* Sidebar Placement */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <p className="font-semibold text-xs text-white">Sidebar Medium Rectangle (300x250)</p>
                <p className="text-[11px] text-slate-400">Positioned in tool and blog sidebars away from action buttons.</p>
              </div>
              <input
                type="checkbox"
                checked={sidebarAd}
                onChange={(e) => setSidebarAd(e.target.checked)}
                className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
              />
            </div>

            {/* In-Content Placement */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <p className="font-semibold text-xs text-white">In-Content Fluid Banner (728x120)</p>
                <p className="text-[11px] text-slate-400">Embedded between articles and tools directory. Never inside AI chat answers.</p>
              </div>
              <input
                type="checkbox"
                checked={inContentAd}
                onChange={(e) => setInContentAd(e.target.checked)}
                className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
              />
            </div>

            {/* Footer Placement */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <p className="font-semibold text-xs text-white">Footer Super Banner (970x90)</p>
                <p className="text-[11px] text-slate-400">Positioned right above footer links with clear label.</p>
              </div>
              <input
                type="checkbox"
                checked={footerAd}
                onChange={(e) => setFooterAd(e.target.checked)}
                className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Ads.txt Configuration Guide */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>ads.txt File Verification</span>
            </h3>
            <a
              href="/ads.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-rose-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View Live /ads.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Google AdSense requires an authorized digital seller record in your domain root:
          </p>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-emerald-300">
            google.com, {publisherId.replace('ca-', '') || 'pub-0000000000000000'}, DIRECT, f08c47fec0942fa0
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-4">
          {savedSuccess && (
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ad configuration updated successfully!</span>
            </p>
          )}
          <button
            onClick={handleSave}
            className="ml-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Ad Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};
