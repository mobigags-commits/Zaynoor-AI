import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, User, AdSettings, WalletData, Transaction } from '../types';

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
  // Wallet & Earnings
  wallet: WalletData;
  transactions: Transaction[];
  addDeposit: (amount: number, method: string, reference: string) => void;
  requestWithdrawal: (amount: number, method: string, accountDetails: string) => { success: boolean; message: string };
  claimDailyBonus: () => { success: boolean; amount: number; message: string };
  currency: 'USD' | 'PKR';
  setCurrency: (c: 'USD' | 'PKR') => void;
  approveTransaction: (id: string) => void;
  rejectTransaction: (id: string) => void;
}

const defaultUser: User = {
  name: 'Zaynoor Architect',
  email: 'architect@zaynoor.ai',
  role: 'admin',
  tier: 'Enterprise',
  credits: 9450,
  maxCredits: 10000,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  referralCode: 'ZAYNOOR-9982',
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

const defaultWallet: WalletData = {
  availableBalance: 84.50,
  pendingBalance: 15.00,
  totalEarned: 284.50,
  currency: 'USD',
  adEarnings: 142.50,
  referralEarnings: 82.00,
  taskEarnings: 60.00,
};

const defaultTransactions: Transaction[] = [
  {
    id: 'TXN-9081',
    type: 'ad_revenue',
    amount: 14.80,
    status: 'completed',
    method: 'Google AdSense (pub-7550936944889241)',
    date: '2026-10-25 18:30',
    reference: 'ADS-REV-DAILY',
  },
  {
    id: 'TXN-9082',
    type: 'referral',
    amount: 25.00,
    status: 'completed',
    method: 'Affiliate Tier 1 Commission (@tariq_dev)',
    date: '2026-10-24 14:15',
    reference: 'REF-COMMISSION',
  },
  {
    id: 'TXN-9083',
    type: 'task_reward',
    amount: 5.00,
    status: 'completed',
    method: 'Daily AI Testing & Prompt Review',
    date: '2026-10-23 09:40',
    reference: 'DAILY-TASK-BONUS',
  },
  {
    id: 'TXN-9084',
    type: 'withdrawal',
    amount: 50.00,
    status: 'completed',
    method: 'EasyPaisa',
    accountDetails: '0300-1234567 (Title: Zaynoor Admin)',
    date: '2026-10-22 16:10',
    reference: 'WD-EP-8921',
  },
  {
    id: 'TXN-9085',
    type: 'deposit',
    amount: 20.00,
    status: 'completed',
    method: 'JazzCash',
    accountDetails: 'TID: 9812739182',
    date: '2026-10-21 11:05',
    reference: 'DEP-JC-1102',
  },
];

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

  // Wallet and Financial state
  const [currency, setCurrencyState] = useState<'USD' | 'PKR'>(() => {
    return (localStorage.getItem('zaynoor_currency') as 'USD' | 'PKR') || 'USD';
  });

  const [wallet, setWallet] = useState<WalletData>(() => {
    const saved = localStorage.getItem('zaynoor_wallet');
    return saved ? JSON.parse(saved) : defaultWallet;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('zaynoor_transactions');
    return saved ? JSON.parse(saved) : defaultTransactions;
  });

  const [lastBonusClaimDate, setLastBonusClaimDate] = useState<string>(() => {
    return localStorage.getItem('zaynoor_last_bonus') || '';
  });

  // Sync route with URL hash
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

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    localStorage.setItem('zaynoor_lang', language);
  }, [language]);

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

  // Save wallet and transactions
  useEffect(() => {
    localStorage.setItem('zaynoor_wallet', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('zaynoor_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const setCurrency = (c: 'USD' | 'PKR') => {
    setCurrencyState(c);
    localStorage.setItem('zaynoor_currency', c);
  };

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

  // Deposit funds (Top-up wallet & adds credits)
  const addDeposit = (amount: number, method: string, reference: string) => {
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'deposit',
      amount,
      status: 'completed',
      method,
      accountDetails: reference,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      reference: `DEP-${Date.now().toString().slice(-4)}`,
    };

    setTransactions((prev) => [newTxn, ...prev]);
    setWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance + amount,
    }));

    // Bonus credits reward on deposit
    const bonusCredits = Math.round(amount * 100);
    setUser((prev) => ({
      ...prev,
      credits: prev.credits + bonusCredits,
    }));
  };

  // Request withdrawal
  const requestWithdrawal = (amount: number, method: string, accountDetails: string): { success: boolean; message: string } => {
    const minWithdrawal = currency === 'PKR' ? 1500 : 10;
    const amountInUSD = currency === 'PKR' ? amount / 280 : amount;

    if (wallet.availableBalance < amountInUSD) {
      return {
        success: false,
        message: language === 'ur' ? 'ناکافی بیلنس! مطلوبہ رقم آپ کے والٹ بیلنس سے زیادہ ہے۔' : 'Insufficient balance! Requested amount exceeds available funds.',
      };
    }

    if (amount < minWithdrawal) {
      return {
        success: false,
        message: language === 'ur' ? `کم از کم رقم ${currency === 'PKR' ? '1,500 روپے' : '$10'} ہے۔` : `Minimum withdrawal is ${currency === 'PKR' ? 'PKR 1,500' : '$10'}.`,
      };
    }

    const newTxn: Transaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'withdrawal',
      amount: amountInUSD,
      status: 'pending',
      method,
      accountDetails,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      reference: `WD-${Date.now().toString().slice(-4)}`,
    };

    setTransactions((prev) => [newTxn, ...prev]);
    setWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance - amountInUSD,
      pendingBalance: prev.pendingBalance + amountInUSD,
    }));

    return {
      success: true,
      message: language === 'ur' ? 'آپ کی رقم نکلوانے کی درخواست موصول ہو گئی ہے۔ 2 سے 24 گھنٹوں میں پروسیس ہو جائے گی۔' : 'Withdrawal request submitted successfully! Processing in 2 to 24 hours.',
    };
  };

  // Claim Daily Free Earning Bonus (Without Investment)
  const claimDailyBonus = (): { success: boolean; amount: number; message: string } => {
    const today = new Date().toISOString().split('T')[0];
    if (lastBonusClaimDate === today) {
      return {
        success: false,
        amount: 0,
        message: language === 'ur' ? 'آپ نے آج کا مفت بونس پہلے ہی کلیم کر لیا ہے۔ کل دوبارہ آئیں!' : 'You already claimed today\'s bonus. Come back tomorrow!',
      };
    }

    const bonusAmount = 2.50; // $2.50 daily without investment
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'task_reward',
      amount: bonusAmount,
      status: 'completed',
      method: 'Daily Zero-Investment Attendance Reward',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      reference: 'DAILY-BONUS',
    };

    setTransactions((prev) => [newTxn, ...prev]);
    setWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance + bonusAmount,
      totalEarned: prev.totalEarned + bonusAmount,
      taskEarnings: prev.taskEarnings + bonusAmount,
    }));

    setUser((prev) => ({
      ...prev,
      credits: prev.credits + 200,
    }));

    setLastBonusClaimDate(today);
    localStorage.setItem('zaynoor_last_bonus', today);

    return {
      success: true,
      amount: bonusAmount,
      message: language === 'ur' ? 'مبارک ہو! آپ کے والٹ میں مفت $2.50 اور 200 کریڈٹس جمع ہو گئے ہیں۔' : 'Congratulations! $2.50 and 200 free credits added to your wallet.',
    };
  };

  const approveTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === id && t.status === 'pending') {
          if (t.type === 'withdrawal') {
            setWallet((w) => ({
              ...w,
              pendingBalance: Math.max(0, w.pendingBalance - t.amount),
            }));
          }
          return { ...t, status: 'completed' };
        }
        return t;
      })
    );
  };

  const rejectTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === id && t.status === 'pending') {
          if (t.type === 'withdrawal') {
            setWallet((w) => ({
              ...w,
              availableBalance: w.availableBalance + t.amount,
              pendingBalance: Math.max(0, w.pendingBalance - t.amount),
            }));
          }
          return { ...t, status: 'rejected' };
        }
        return t;
      })
    );
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
        wallet,
        transactions,
        addDeposit,
        requestWithdrawal,
        claimDailyBonus,
        currency,
        setCurrency,
        approveTransaction,
        rejectTransaction,
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
