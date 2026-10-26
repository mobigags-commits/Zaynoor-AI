import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, User, AdSettings } from '../types';

interface AppContextType {
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  user: User;
  useCredits: (amount: number) => boolean;
  adSettings: AdSettings;
  updateAdSettings: (newSettings: Partial<AdSettings>) => void;
  cookieConsent: boolean | null;
  setCookieConsent: (consent: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  activeProjectCode: string;
  setActiveProjectCode: (code: string) => void;
}

const defaultUser: User = {
  name: 'Zaynoor Architect',
  email: 'architect@zaynoor.ai',
  role: 'admin',
  tier: 'Enterprise',
  credits: 9450,
  maxCredits: 10000,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
};

const defaultAdSettings: AdSettings = {
  enabled: true,
  publisherId: 'ca-pub-7550936944889241',
  headerAd: true,
  sidebarAd: false,
  inContentAd: true,
  footerAd: true,
  testMode: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRouteState] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '').replace('/', '');
    return hash || 'home';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('zaynoor_lang') as Language) || 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('zaynoor_theme') as Theme) || 'dark';
  });

  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('zaynoor_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [adSettings, setAdSettings] = useState<AdSettings>(() => {
    const saved = localStorage.getItem('zaynoor_ads');
    return saved ? JSON.parse(saved) : defaultAdSettings;
  });

  const [cookieConsent, setCookieConsentState] = useState<boolean | null>(() => {
    const saved = localStorage.getItem('zaynoor_cookie_consent');
    return saved ? JSON.parse(saved) : null;
  });

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeProjectCode, setActiveProjectCode] = useState<string>('');

  // Sync route with URL hash for easy bookmarking and browser back/forward
  const setCurrentRoute = (route: string) => {
    setCurrentRouteState(route);
    window.location.hash = route === 'home' ? '' : `#${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').replace('/', '');
      setCurrentRouteState(hash || 'home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update HTML dir and lang tags when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    localStorage.setItem('zaynoor_lang', language);
  }, [language]);

  // Update dark/light class on body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('zaynoor_theme', theme);
  }, [theme]);

  // Keyboard shortcut for command palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const useCredits = (amount: number): boolean => {
    if (user.credits < amount) return false;
    const updated = { ...user, credits: Math.max(0, user.credits - amount) };
    setUser(updated);
    localStorage.setItem('zaynoor_user', JSON.stringify(updated));
    return true;
  };

  const updateAdSettings = (newSettings: Partial<AdSettings>) => {
    const updated = { ...adSettings, ...newSettings };
    setAdSettings(updated);
    localStorage.setItem('zaynoor_ads', JSON.stringify(updated));
  };

  const setCookieConsent = (consent: boolean) => {
    setCookieConsentState(consent);
    localStorage.setItem('zaynoor_cookie_consent', JSON.stringify(consent));
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        language,
        setLanguage,
        theme,
        toggleTheme,
        user,
        useCredits,
        adSettings,
        updateAdSettings,
        cookieConsent,
        setCookieConsent,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        activeProjectCode,
        setActiveProjectCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
