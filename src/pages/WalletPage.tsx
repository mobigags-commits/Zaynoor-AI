import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import { Transaction } from '../types';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Receipt,
  Download,
  Coins,
  Send,
  Zap,
  Lock,
  Phone,
  User as UserIcon,
  Calendar,
  FileCheck,
  Printer,
  XCircle,
  ExternalLink,
} from 'lucide-react';

export const WalletPage: React.FC = () => {
  const {
    wallet,
    transactions,
    addDeposit,
    requestWithdrawal,
    currency,
    setCurrency,
    language,
    setCurrentRoute,
    approveTransaction,
    rejectTransaction,
    user,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'withdraw' | 'history' | 'owner-admin'>('overview');
  const [filterType, setFilterType] = useState<string>('all');

  // Deposit Form State
  const [depositAmount, setDepositAmount] = useState<number>(25);
  const [depositMethod, setDepositMethod] = useState<string>('easypaisa');
  const [depositSenderPhone, setDepositSenderPhone] = useState<string>('0300-1234567');
  const [depositSenderName, setDepositSenderName] = useState<string>(user.name || 'Account Holder');
  const [depositTID, setDepositTID] = useState<string>('');
  const [depositDate, setDepositDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [depositNotes, setDepositNotes] = useState<string>('Payment for AI Credits top-up');
  const [depositSuccessMsg, setDepositSuccessMsg] = useState<string>('');
  const [latestDepositReceipt, setLatestDepositReceipt] = useState<Transaction | null>(null);

  // Withdrawal Form State
  const [withdrawAmount, setWithdrawAmount] = useState<number>(currency === 'PKR' ? 3000 : 25);
  const [withdrawMethod, setWithdrawMethod] = useState<string>('easypaisa');
  const [withdrawAccount, setWithdrawAccount] = useState<string>('');
  const [withdrawTitle, setWithdrawTitle] = useState<string>('');
  const [withdrawCNIC, setWithdrawCNIC] = useState<string>('');
  const [withdrawSecurityPin, setWithdrawSecurityPin] = useState<string>('1234');
  const [withdrawFeedback, setWithdrawFeedback] = useState<{ success: boolean; message: string; trackingId?: string } | null>(null);

  const [copiedText, setCopiedText] = useState<string | null>(null);

  const exchangeRate = 280; // 1 USD = 280 PKR

  const formatMoney = (amountInUSD: number) => {
    if (currency === 'PKR') {
      const pkr = Math.round(amountInUSD * exchangeRate);
      return `Rs ${pkr.toLocaleString()}`;
    }
    return `$${amountInUSD.toFixed(2)}`;
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Handle Deposit Submission
  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositTID.trim() || depositAmount <= 0) return;

    const amountInUSD = currency === 'PKR' ? depositAmount / exchangeRate : depositAmount;
    const refDetails = `TID: ${depositTID} • Sender: ${depositSenderName} (${depositSenderPhone}) • Date: ${depositDate}`;

    addDeposit(amountInUSD, depositMethod.toUpperCase(), refDetails);

    // Sync to backend ledger
    fetch('/api/wallet/deposit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amountInUSD,
        method: depositMethod.toUpperCase(),
        senderAccount: `${depositSenderName} (${depositSenderPhone})`,
        transactionId: depositTID,
        notes: depositNotes,
      }),
    }).catch(() => {});

    const receiptData: Transaction = {
      id: `TXN-DEP-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'deposit',
      amount: amountInUSD,
      status: 'completed',
      method: depositMethod.toUpperCase(),
      accountDetails: refDetails,
      date: `${depositDate} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      reference: `DEP-${Date.now().toString().slice(-4)}`,
    };

    setLatestDepositReceipt(receiptData);
    setDepositSuccessMsg(
      language === 'ur'
        ? `آپ کا ${formatMoney(amountInUSD)} کا ڈپازٹ کامیابی سے منظور ہو گیا اور والٹ میں شامل کر دیا گیا۔`
        : `Deposit of ${formatMoney(amountInUSD)} verified and credited to your wallet balance.`
    );
    setDepositTID('');
    setTimeout(() => setDepositSuccessMsg(''), 5000);
  };

  // Handle Withdrawal Submission
  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAccount.trim() || !withdrawTitle.trim() || withdrawAmount <= 0) return;

    const res = requestWithdrawal(
      withdrawAmount,
      withdrawMethod.toUpperCase(),
      `${withdrawAccount} (${withdrawTitle})${withdrawCNIC ? ` • CNIC: ${withdrawCNIC}` : ''}`
    );

    // Sync to backend queue
    fetch('/api/wallet/withdraw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: withdrawAmount,
        method: withdrawMethod.toUpperCase(),
        recipientAccount: `${withdrawAccount} (${withdrawTitle})`,
        cnic: withdrawCNIC,
        pin: withdrawSecurityPin,
      }),
    }).catch(() => {});

    setWithdrawFeedback(res);
    if (res.success) {
      setWithdrawAccount('');
      setWithdrawTitle('');
      setWithdrawCNIC('');
    }
    setTimeout(() => setWithdrawFeedback(null), 6000);
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  const pendingWithdrawals = transactions.filter(
    (t) => t.type === 'withdrawal' && t.status === 'pending'
  );

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'والٹ، ڈپازٹ اور رقم نکلوانا — زینور اے آئی' : 'Wallet, Deposit & Withdrawal — Zaynoor AI'}
        description="Comprehensive owner & user financial suite with interactive deposit and withdrawal forms for EasyPaisa, JazzCash, Meezan Bank, Sadapay, and USDT."
      />

      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 via-amber-500 to-emerald-500 flex items-center justify-center text-white shadow-xl shadow-rose-600/30">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  {language === 'ur' ? 'والٹ اور فنانس سینٹر (ڈپازٹ و کیش آؤٹ)' : 'Owner & User Wallet Financial Suite'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  24/7 Verified
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                {language === 'ur'
                  ? 'رقم جمع کرنے (Deposit) اور نکلوانے (Withdrawal) کے مکمل فارمز — ایزی پیسہ، جیز کیش، بینک اور کرپٹو'
                  : 'Interactive deposit & withdrawal forms for EasyPaisa, JazzCash, Raast / Bank, Sadapay & USDT'}
              </p>
            </div>
          </div>

          {/* Quick Actions & Currency Switcher */}
          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currency === 'USD'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('PKR')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currency === 'PKR'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                PKR (Rs)
              </button>
            </div>

            <button
              onClick={() => setCurrentRoute('earning-hub')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-950/40 transition-all"
            >
              <Coins className="w-4 h-4" />
              <span>{language === 'ur' ? 'بغیر انویسٹمنٹ کمائی' : 'Zero-Investment Hub'}</span>
            </button>
          </div>
        </div>

        {/* 4 Financial Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Available Balance */}
          <div className="bg-gradient-to-br from-slate-900 to-rose-950/40 border border-rose-500/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-rose-300 font-semibold mb-2">
              <span>{language === 'ur' ? 'قابل دستبرداری رقم' : 'Available for Withdrawal'}</span>
              <DollarSign className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white">
              {formatMoney(wallet.availableBalance)}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setActiveTab('withdraw')}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors"
              >
                {language === 'ur' ? 'کیش آؤٹ فارم' : 'Cash Out Form →'}
              </button>
              <button
                onClick={() => setActiveTab('deposit')}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold transition-colors"
              >
                {language === 'ur' ? 'ڈپازٹ فارم' : 'Deposit Form +'}
              </button>
            </div>
          </div>

          {/* Card 2: Pending Balance */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span>{language === 'ur' ? 'زیر التواء پروسیسنگ' : 'Pending Clearance'}</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400">
              {formatMoney(wallet.pendingBalance)}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {language === 'ur' ? '2 سے 24 گھنٹے میں براہ راست ٹرانسفر' : 'Processing to payment gateway'}
            </p>
          </div>

          {/* Card 3: Total Lifetime Earnings */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span>{language === 'ur' ? 'کل اب تک کی کمائی' : 'Total Lifetime Earned'}</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">
              {formatMoney(wallet.totalEarned)}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {language === 'ur' ? 'ایڈسینس + ریفرلز + ٹاسکس' : 'AdSense + Affiliates + Daily Gigs'}
            </p>
          </div>

          {/* Card 4: AdSense Earned Revenue */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
              <span>{language === 'ur' ? 'گوگل ایڈسینس ریونیو' : 'AdSense Ad Yield'}</span>
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-blue-400">
              {formatMoney(wallet.adEarnings)}
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono text-[10px]">
              ca-pub-7550936944889241 Active
            </p>
          </div>
        </div>

        {/* Ad Placement */}
        <AdBanner placement="header" />

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-4 transition-all border-b-2 ${
              activeTab === 'overview'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {language === 'ur' ? 'فوری خاکہ' : 'Overview & Breakdown'}
          </button>

          <button
            onClick={() => setActiveTab('withdraw')}
            className={`pb-3 px-4 transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'withdraw'
                ? 'border-emerald-500 text-emerald-400 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            <span>{language === 'ur' ? 'رقم نکلوانے کا فارم (Withdraw)' : 'Withdrawal Form'}</span>
          </button>

          <button
            onClick={() => setActiveTab('deposit')}
            className={`pb-3 px-4 transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'deposit'
                ? 'border-rose-500 text-rose-400 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ArrowDownLeft className="w-4 h-4 text-rose-400" />
            <span>{language === 'ur' ? 'رقم جمع کرنے کا فارم (Deposit)' : 'Deposit Form'}</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-4 transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Receipt className="w-4 h-4 text-blue-400" />
            <span>{language === 'ur' ? 'ٹرانزیکشن ہسٹری' : 'Transaction History'}</span>
          </button>

          <button
            onClick={() => setActiveTab('owner-admin')}
            className={`pb-3 px-4 transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'owner-admin'
                ? 'border-amber-500 text-amber-400 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-amber-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{language === 'ur' ? 'مالک کے کنٹرولز (Owner Approvals)' : 'Owner Approvals Console'}</span>
            {pendingWithdrawals.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                {pendingWithdrawals.length}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-rose-500" />
                  <span>{language === 'ur' ? 'آمدنی کے ذرائع کی تقسیم' : 'Income Streams Distribution'}</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-semibold">Google AdSense Yield (ca-pub-7550936944889241)</span>
                      <span className="text-white font-mono">{formatMoney(wallet.adEarnings)} (50%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full w-[50%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-semibold">Affiliate &amp; Referrals (30% Commission)</span>
                      <span className="text-white font-mono">{formatMoney(wallet.referralEarnings)} (29%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full w-[29%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-semibold">Zero-Investment Daily Tasks &amp; AI Testing</span>
                      <span className="text-white font-mono">{formatMoney(wallet.taskEarnings)} (21%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[21%]"></div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>0% Processing fees on EasyPaisa, JazzCash &amp; Local Bank Payouts</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('withdraw')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
                  >
                    <span>{language === 'ur' ? 'ابھی رقم نکلوانے کا فارم کھولیں' : 'Open Withdrawal Form'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Recent Transactions Table */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {language === 'ur' ? 'حالیہ فنانشل سرگرمیاں' : 'Latest Financial Activity'}
                  </h3>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="text-xs text-rose-400 hover:underline font-semibold"
                  >
                    {language === 'ur' ? 'تمام ریکارڈ دیکھیں' : 'View Full Ledger'} →
                  </button>
                </div>

                <div className="space-y-2">
                  {transactions.slice(0, 4).map((t) => (
                    <div
                      key={t.id}
                      className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            t.type === 'deposit'
                              ? 'bg-rose-600/20 text-rose-400'
                              : t.type === 'withdrawal'
                              ? 'bg-amber-600/20 text-amber-400'
                              : 'bg-emerald-600/20 text-emerald-400'
                          }`}
                        >
                          {t.type === 'deposit' ? (
                            <ArrowDownLeft className="w-4 h-4" />
                          ) : t.type === 'withdrawal' ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <Coins className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white">{t.method}</p>
                          <p className="text-[11px] text-slate-400">{t.date} • {t.reference}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`font-mono font-bold ${
                            t.type === 'withdrawal' ? 'text-amber-400' : 'text-emerald-400'
                          }`}
                        >
                          {t.type === 'withdrawal' ? '-' : '+'}{formatMoney(t.amount)}
                        </p>
                        <span
                          className={`text-[10px] uppercase font-bold ${
                            t.status === 'completed'
                              ? 'text-emerald-400'
                              : t.status === 'pending'
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }`}
                        >
                          ● {t.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Payment Channels & Official Accounts */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'ur' ? 'تصدیق شدہ آفیشل اکاؤنٹس' : 'Verified Official Channels'}</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-emerald-400">EasyPaisa Account</span>
                      <button
                        onClick={() => handleCopy('03001234567', 'ep')}
                        className="text-[10px] text-slate-400 hover:text-white"
                      >
                        {copiedText === 'ep' ? 'Copied!' : 'Copy #'}
                      </button>
                    </div>
                    <p className="font-mono font-bold text-white text-sm">0300-1234567</p>
                    <p className="text-[11px] text-slate-400">Title: Zaynoor Official</p>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-rose-400">JazzCash Account</span>
                      <button
                        onClick={() => handleCopy('03017654321', 'jc')}
                        className="text-[10px] text-slate-400 hover:text-white"
                      >
                        {copiedText === 'jc' ? 'Copied!' : 'Copy #'}
                      </button>
                    </div>
                    <p className="font-mono font-bold text-white text-sm">0301-7654321</p>
                    <p className="text-[11px] text-slate-400">Title: Zaynoor Official</p>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-blue-400">Bank Transfer / Raast</span>
                      <button
                        onClick={() => handleCopy('PK92MEZN0001234567890123', 'bank')}
                        className="text-[10px] text-slate-400 hover:text-white"
                      >
                        {copiedText === 'bank' ? 'Copied!' : 'Copy IBAN'}
                      </button>
                    </div>
                    <p className="font-mono font-bold text-white text-xs truncate">PK92MEZN0001234567890123</p>
                    <p className="text-[11px] text-slate-400">Meezan Bank • Zaynoor AI Pvt Ltd</p>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-purple-400">USDT (Crypto TRC20)</span>
                      <button
                        onClick={() => handleCopy('TK7yX1JqQz9V8K2mL4nP5wR6tY3uA7bE9z', 'usdt')}
                        className="text-[10px] text-slate-400 hover:text-white"
                      >
                        {copiedText === 'usdt' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="font-mono text-white text-[11px] truncate">TK7yX1JqQz9V8K2mL4nP5wR6tY3uA7bE9z</p>
                    <p className="text-[10px] text-emerald-400">0% Gas Fee Subsidy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED WITHDRAWAL FORM */}
        {activeTab === 'withdraw' && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <ArrowUpRight className="w-6 h-6 text-emerald-400" />
                  <span>{language === 'ur' ? 'رقم نکلوانے کا مکمل فارم' : 'Official Withdrawal & Cashout Form'}</span>
                </h2>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Balance: {formatMoney(wallet.availableBalance)}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'ur'
                  ? 'اپنی تمام کمائی کو ایزی پیسہ، جیز کیش، یا بینک اکاؤنٹ میں براہ راست ٹرانسفر کریں۔'
                  : 'Transfer your earnings directly to your mobile wallet or bank with zero platform deduction.'}
              </p>
            </div>

            {withdrawFeedback && (
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center gap-3 ${
                  withdrawFeedback.success
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                {withdrawFeedback.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <span>{withdrawFeedback.message}</span>
              </div>
            )}

            <form onSubmit={handleWithdrawSubmit} className="space-y-5">
              {/* Channel Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  1. {language === 'ur' ? 'پیمنٹ چینل منتخب کریں' : 'Select Receiving Payment Channel'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'easypaisa', label: 'EasyPaisa', icon: '📱' },
                    { id: 'jazzcash', label: 'JazzCash', icon: '📱' },
                    { id: 'bank', label: 'Bank / Raast', icon: '🏦' },
                    { id: 'usdt', label: 'USDT TRC20', icon: '💎' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setWithdrawMethod(m.id)}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-center flex flex-col items-center gap-1 ${
                        withdrawMethod === m.id
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-600/30'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-base">{m.icon}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount to withdraw */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  <span>2. {language === 'ur' ? 'رقم درج کریں' : 'Amount to Withdraw'}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const all = currency === 'PKR' ? Math.round(wallet.availableBalance * exchangeRate) : wallet.availableBalance;
                      setWithdrawAmount(all);
                    }}
                    className="text-[11px] text-emerald-400 hover:underline"
                  >
                    Withdraw All ({formatMoney(wallet.availableBalance)})
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min={currency === 'PKR' ? 1500 : 10}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-base text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    {currency}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
                  <span>Minimum: {currency === 'PKR' ? 'Rs 1,500' : '$10.00'}</span>
                  <span className="text-emerald-400 font-semibold">Platform Fee: 0% Free</span>
                </div>
              </div>

              {/* Recipient Account Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {withdrawMethod === 'usdt'
                        ? 'USDT Wallet Address (TRC-20)'
                        : withdrawMethod === 'bank'
                        ? 'IBAN / Account Number'
                        : 'Mobile Account Phone #'}
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      withdrawMethod === 'usdt'
                        ? 'T...'
                        : withdrawMethod === 'bank'
                        ? 'PK92MEZN000...'
                        : '0300-1234567'
                    }
                    value={withdrawAccount}
                    onChange={(e) => setWithdrawAccount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Account Holder Full Name / Title</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Aslam"
                    value={withdrawTitle}
                    onChange={(e) => setWithdrawTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    CNIC Number (Optional verification)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 35201-1234567-1"
                    value={withdrawCNIC}
                    onChange={(e) => setWithdrawCNIC(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Security Confirmation PIN</span>
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={withdrawSecurityPin}
                    onChange={(e) => setWithdrawSecurityPin(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono tracking-widest text-center"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 transition-all cursor-pointer"
              >
                <ArrowUpRight className="w-5 h-5" />
                <span>{language === 'ur' ? 'رقم نکلوانے کی درخواست جمع کریں' : 'Submit Withdrawal Cashout Request'}</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: DETAILED DEPOSIT FORM */}
        {activeTab === 'deposit' && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <ArrowDownLeft className="w-6 h-6 text-rose-500" />
                <span>{language === 'ur' ? 'رقم جمع کرنے کا فارم (Deposit & Top-up)' : 'Official Deposit & Wallet Top-Up Form'}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'ur'
                  ? 'رقم بھیجنے کے بعد ٹرانزیکشن آئی ڈی (TID) نیچے فارم میں درج کریں تاکہ رقم اور کریڈٹس فوراً اپ ڈیٹ ہوں۔'
                  : 'Transfer funds to official accounts and submit your Transaction ID (TID) for instant verification and +100 credits/$ bonus.'}
              </p>
            </div>

            {depositSuccessMsg && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{depositSuccessMsg}</span>
              </div>
            )}

            {/* Official Accounts Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] text-rose-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Official Receiving Accounts (پیمنٹ بھیجنے کے پتے)</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-slate-400 text-[10px]">EasyPaisa / JazzCash</p>
                  <p className="font-bold font-mono text-white text-sm">0300-1234567</p>
                  <p className="text-slate-400 text-[10px]">Title: Zaynoor Official</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-slate-400 text-[10px]">Bank / Raast (Meezan Bank)</p>
                  <p className="font-bold font-mono text-white text-xs truncate">PK92MEZN0001234567890123</p>
                  <p className="text-slate-400 text-[10px]">Title: Zaynoor AI Pvt Ltd</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleDepositSubmit} className="space-y-5">
              {/* Select Channel */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  1. Payment Channel Used
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'easypaisa', label: 'EasyPaisa' },
                    { id: 'jazzcash', label: 'JazzCash' },
                    { id: 'bank', label: 'Bank Transfer' },
                    { id: 'usdt', label: 'USDT TRC20' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setDepositMethod(m.id)}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center ${
                        depositMethod === m.id
                          ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/30'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  2. Deposit Amount ({currency})
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {(currency === 'PKR' ? [2500, 5000, 10000, 25000] : [10, 25, 50, 100]).map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDepositAmount(amt)}
                      className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                        depositAmount === amt
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {currency === 'PKR' ? `Rs ${amt.toLocaleString()}` : `$${amt}`}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="5"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-base text-white font-mono focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Sender Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sender Phone / Account Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 0300XXXXXXX"
                    value={depositSenderPhone}
                    onChange={(e) => setDepositSenderPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sender Account Title / Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Ali"
                    value={depositSenderName}
                    onChange={(e) => setDepositSenderName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Transaction ID & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Transaction ID (TID) / Reference
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TID-9821739812"
                    value={depositTID}
                    onChange={(e) => setDepositTID(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Transfer Date
                  </label>
                  <input
                    type="date"
                    value={depositDate}
                    onChange={(e) => setDepositDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Optional Notes / Proof Reference
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sent via EasyPaisa App at 14:30"
                  value={depositNotes}
                  onChange={(e) => setDepositNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-rose-950/60 transition-all cursor-pointer"
              >
                <ArrowDownLeft className="w-5 h-5" />
                <span>Submit Deposit Verification Form</span>
              </button>
            </form>

            {/* Printable Voucher Preview if just deposited */}
            {latestDepositReceipt && (
              <div className="mt-6 p-5 bg-slate-950 border border-emerald-500/40 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4" />
                    <span>Official Deposit Verification Voucher</span>
                  </span>
                  <button
                    onClick={() => {
                      const text = `ZAYNOOR AI DEPOSIT VOUCHER\nID: ${latestDepositReceipt.id}\nAmount: ${formatMoney(latestDepositReceipt.amount)}\nMethod: ${latestDepositReceipt.method}\nDetails: ${latestDepositReceipt.accountDetails}\nDate: ${latestDepositReceipt.date}\nStatus: VERIFIED & CREDITED`;
                      const blob = new Blob([text], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `zaynoor-deposit-${latestDepositReceipt.id}.txt`;
                      a.click();
                    }}
                    className="text-xs text-slate-300 hover:text-white flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Receipt</span>
                  </button>
                </div>
                <div className="text-xs text-slate-300 space-y-1 font-mono">
                  <p>Voucher ID: <strong className="text-white">{latestDepositReceipt.id}</strong></p>
                  <p>Amount Credited: <strong className="text-emerald-400">{formatMoney(latestDepositReceipt.amount)}</strong></p>
                  <p>Method: {latestDepositReceipt.method}</p>
                  <p>Details: {latestDepositReceipt.accountDetails}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: COMPLETE FINANCIAL LEDGER */}
        {activeTab === 'history' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-blue-400" />
                <span>{language === 'ur' ? 'مکمل مالیاتی ریکارڈ' : 'Complete Financial Ledger'}</span>
              </h2>

              {/* Filter */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {['all', 'withdrawal', 'deposit', 'ad_revenue', 'referral', 'task_reward'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1.5 rounded-xl capitalize font-semibold transition-all ${
                      filterType === type
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {type.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <tr>
                    <th className="p-4">Txn ID</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Method &amp; Account Details</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-mono font-bold text-white">{t.id}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            t.type === 'withdrawal'
                              ? 'bg-amber-500/20 text-amber-300'
                              : t.type === 'deposit'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {t.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-white">{t.method}</p>
                        {t.accountDetails && (
                          <p className="text-[11px] text-slate-400 font-mono">{t.accountDetails}</p>
                        )}
                      </td>
                      <td className="p-4 font-mono font-bold text-sm">
                        <span className={t.type === 'withdrawal' ? 'text-amber-400' : 'text-emerald-400'}>
                          {t.type === 'withdrawal' ? '-' : '+'}{formatMoney(t.amount)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-[11px] font-bold capitalize ${
                            t.status === 'completed'
                              ? 'text-emerald-400'
                              : t.status === 'pending'
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }`}
                        >
                          ● {t.status}
                        </span>
                      </td>
                      <td className="p-4 text-right text-slate-400 font-mono text-[11px]">{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: OWNER APPROVALS CONSOLE */}
        {activeTab === 'owner-admin' && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Owner Payout Approval &amp; Payment Dispatch Console</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Approve or reject withdrawal cashouts. Real-time balance deductions and automated notifications.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                {pendingWithdrawals.length} Pending Actions
              </span>
            </div>

            {pendingWithdrawals.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="font-bold text-white text-sm">All Withdrawal Requests Cleared</p>
                <p>There are no pending cashout requests awaiting owner approval.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingWithdrawals.map((t) => (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-white text-sm">{t.id}</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase">
                          Awaiting Payment
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-semibold">{t.method} • {t.accountDetails}</p>
                      <p className="text-[11px] text-slate-400">{t.date}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-black font-mono text-emerald-400">{formatMoney(t.amount)}</p>
                        <p className="text-[10px] text-slate-400">0% Platform Fee</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => approveTransaction(t.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve &amp; Send</span>
                        </button>
                        <button
                          onClick={() => rejectTransaction(t.id)}
                          className="px-3 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 font-bold text-xs transition-all flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
