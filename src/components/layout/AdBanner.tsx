import React from 'react';
import { useApp } from '../../context/AppContext';
import { Info } from 'lucide-react';

interface AdBannerProps {
  placement: 'header' | 'sidebar' | 'inContent' | 'footer';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '' }) => {
  const { adSettings, language, setCurrentRoute } = useApp();

  if (!adSettings.enabled) return null;

  // Check placement toggle
  const isPlacementActive =
    (placement === 'header' && adSettings.headerAd) ||
    (placement === 'sidebar' && adSettings.sidebarAd) ||
    (placement === 'inContent' && adSettings.inContentAd) ||
    (placement === 'footer' && adSettings.footerAd);

  if (!isPlacementActive) return null;

  // Reserved min-heights to eliminate Layout Shift (CLS)
  const heightClasses = {
    header: 'h-[90px] max-w-[728px]',
    sidebar: 'h-[250px] w-[300px]',
    inContent: 'h-[120px] max-w-[728px]',
    footer: 'h-[90px] max-w-[970px]',
  }[placement];

  return (
    <div
      className={`my-6 mx-auto flex flex-col items-center justify-center transition-all ${className}`}
      data-ad-placement={placement}
    >
      <div className="w-full flex items-center justify-between px-3 py-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
        <span>{language === 'ur' ? 'اشتہار' : 'Advertisement'}</span>
        <button
          onClick={() => setCurrentRoute('admin-ads')}
          title="Configure Ad Placements"
          className="hover:text-rose-400 transition-colors flex items-center gap-1 text-[10px]"
        >
          <Info className="w-3 h-3" />
          <span>{adSettings.testMode ? (language === 'ur' ? 'ٹیسٹ موڈ' : 'Test Mode') : 'AdSense Active'}</span>
        </button>
      </div>

      <div
        className={`w-full ${heightClasses} rounded-xl border border-dashed border-slate-700/60 dark:border-slate-800 bg-slate-900/40 dark:bg-slate-950/40 flex flex-col items-center justify-center p-4 text-center overflow-hidden transition-all shadow-inner`}
      >
        {adSettings.testMode ? (
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
              <span>Google AdSense Slot</span>
              <span className="text-[10px] opacity-75">({placement})</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              {language === 'ur'
                ? `ایڈسینس پبلشر آئی ڈی: ${adSettings.publisherId || 'ترتیب درکار ہے'}`
                : `Publisher: ${adSettings.publisherId || 'Not configured'} • Reserved space prevents CLS`}
            </p>
          </div>
        ) : (
          /* Production Google AdSense container */
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100%' }}
            data-ad-client={adSettings.publisherId}
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  );
};
