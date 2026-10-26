import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_ROUTES } from '../../data/routesData';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, setCurrentRoute, language } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  const filteredRoutes = ALL_ROUTES.filter((r) => {
    const q = query.toLowerCase();
    return (
      r.nameEn.toLowerCase().includes(q) ||
      r.nameUr.toLowerCase().includes(q) ||
      r.descriptionEn.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q)
    );
  }).slice(0, 10);

  const handleSelect = (id: string) => {
    setCurrentRoute(id);
    setIsCommandPaletteOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredRoutes.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredRoutes.length) % (filteredRoutes.length || 1));
    } else if (e.key === 'Enter' && filteredRoutes[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredRoutes[selectedIndex].id);
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-rose-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-rose-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              language === 'ur'
                ? '70 سے زائد ٹولز اور فیچرز تلاش کریں... (مثلاً چیٹ، ویڈیو، ویب بلڈر)'
                : 'Search 70+ tools & pages... (e.g. Chat, Video Studio, Website Builder)'
            }
            className="w-full bg-transparent text-sm md:text-base text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filteredRoutes.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm">
                {language === 'ur' ? 'کوئی ٹول نہیں ملا' : 'No tools or pages found matching your query.'}
              </p>
            </div>
          ) : (
            filteredRoutes.map((route, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={route.id}
                  onClick={() => handleSelect(route.id)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-rose-600/20 text-white border border-rose-500/40 shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          {language === 'ur' ? route.nameUr : route.nameEn}
                        </span>
                        {route.isPopular && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 font-medium">
                            Popular
                          </span>
                        )}
                        {route.isNew && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {language === 'ur' ? route.descriptionUr : route.descriptionEn}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'translate-x-1 text-rose-400' : 'text-slate-600'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>
            {language === 'ur' ? 'منتخب کرنے کے لیے ↑ ↓ استعمال کریں، کھلنے کے لیے انٹر' : 'Use ↑ ↓ to navigate, Enter to open'}
          </span>
          <span className="kbd bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-[10px]">
            ESC to close
          </span>
        </div>
      </div>
    </div>
  );
};
