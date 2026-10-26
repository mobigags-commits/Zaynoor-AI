import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_ROUTES, CATEGORIES, RouteInfo } from '../data/routesData';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import {
  Compass,
  Search,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export const ExploreToolsPage: React.FC = () => {
  const { setCurrentRoute, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = ALL_ROUTES.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      tool.nameEn.toLowerCase().includes(q) ||
      tool.nameUr.toLowerCase().includes(q) ||
      tool.descriptionEn.toLowerCase().includes(q) ||
      tool.id.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'تمام 70+ اے آئی ٹولز دریافت کریں — زینور اے آئی' : 'Explore All 70+ AI Tools — Zaynoor AI'}
        description="Comprehensive directory of 70+ production AI tools including website builders, native Android generators, long video studio, and code debuggers."
      />

      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-semibold mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'مکمل ایکو سسٹم ڈائرکٹری' : 'Complete Production Suite'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">
            {language === 'ur' ? 'تمام 70+ اے آئی ٹولز دریافت کریں' : 'Explore All 70+ Autonomous AI Tools'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            {language === 'ur'
              ? 'ہر ٹول کو آپ کے کام کی رفتار کو 10 گنا تیز کرنے کے لیے خاص طور پر تیار کیا گیا ہے۔'
              : 'Enterprise-grade neural modules designed for developers, creators, researchers, and global enterprises.'}
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-4 backdrop-blur-md">
          <div className="relative">
            <Search className="w-5 h-5 text-rose-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'ur'
                  ? 'نام یا مقصد سے تلاش کریں (مثلاً: ویب بلڈر، ویڈیو، مترجم، کوڈنگ)...'
                  : 'Search tools by name, utility, or keywords (e.g. Website, Video, Translator, Kotlin)...'
              }
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-semibold shrink-0 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {language === 'ur' ? cat.nameUr : cat.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Ad Placement */}
        <AdBanner placement="inContent" />

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((tool: RouteInfo) => (
            <div
              key={tool.id}
              onClick={() => setCurrentRoute(tool.id)}
              className="bg-slate-900/60 border border-slate-800/80 hover:border-rose-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between group shadow-sm hover:shadow-xl hover:shadow-rose-950/30"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-rose-600 text-rose-400 group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                    {tool.isPopular ? (
                      <Flame className="w-5 h-5 text-amber-400 group-hover:text-white" />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex gap-1">
                    {tool.isPopular && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                        HOT
                      </span>
                    )}
                    {tool.isNew && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                        NEW
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-rose-400 transition-colors">
                  {language === 'ur' ? tool.nameUr : tool.nameEn}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  {language === 'ur' ? tool.descriptionUr : tool.descriptionEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-rose-400 group-hover:text-white">
                <span>{language === 'ur' ? 'ٹول کھولیں' : 'Launch Tool'}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            <p className="text-base">No tools matched your query. Try searching for a broader term.</p>
          </div>
        )}
      </div>
    </div>
  );
};
