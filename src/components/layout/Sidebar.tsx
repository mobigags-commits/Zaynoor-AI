import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_ROUTES, CATEGORIES, RouteInfo } from '../../data/routesData';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentRoute, setCurrentRoute, language } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredRoutes = ALL_ROUTES.filter((route) => {
    if (selectedCategory === 'all') return true;
    return route.category === selectedCategory;
  });

  return (
    <aside
      className={`relative z-30 transition-all duration-300 border-r border-slate-800/80 bg-slate-950/95 flex flex-col shrink-0 ${
        collapsed ? 'w-16' : 'w-72'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-6 w-7 h-7 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-rose-500 flex items-center justify-center shadow-md z-40 transition-colors"
        title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Header / Category filter */}
      {!collapsed ? (
        <div className="p-4 border-b border-slate-800/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>{language === 'ur' ? 'ٹولز ڈائرکٹری' : 'Tool Directory (70+)'}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-600/20 text-rose-300 border border-rose-500/30 font-semibold">
              Live
            </span>
          </div>

          {/* Category Chips Scroll */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {language === 'ur' ? cat.nameUr : cat.nameEn.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-3 text-center border-b border-slate-800/60">
          <Zap className="w-5 h-5 text-rose-500 mx-auto" />
        </div>
      )}

      {/* Tools List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredRoutes.map((route: RouteInfo) => {
          const isActive = currentRoute === route.id;
          return (
            <button
              key={route.id}
              onClick={() => setCurrentRoute(route.id)}
              title={language === 'ur' ? route.nameUr : route.nameEn}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-rose-900/50 to-red-950/30 border border-rose-600/40 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/70 border border-transparent'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/40'
                    : 'bg-slate-900 text-slate-400 group-hover:text-slate-200'
                }`}
              >
                {route.isPopular ? (
                  <Flame className="w-4 h-4 text-amber-400" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </div>

              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-xs font-semibold truncate ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {language === 'ur' ? route.nameUr : route.nameEn}
                    </span>
                    {route.isNew && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {language === 'ur' ? route.descriptionUr : route.descriptionEn}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info in Sidebar */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800/60 bg-slate-950 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
            <span>{language === 'ur' ? '70+ ٹولز فعال ہیں' : 'All 70+ Systems Online'}</span>
          </p>
        </div>
      )}
    </aside>
  );
};
