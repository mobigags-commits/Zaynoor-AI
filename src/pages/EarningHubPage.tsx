import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import {
  Coins,
  Sparkles,
  Gift,
  Share2,
  Copy,
  Check,
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  Globe,
  Clapperboard,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Zap,
  Calculator,
  MessageSquare,
  FileText,
  Download,
  Star,
  Send,
  Phone,
} from 'lucide-react';

export const EarningHubPage: React.FC = () => {
  const {
    language,
    wallet,
    claimDailyBonus,
    user,
    setCurrentRoute,
    currency,
    addDeposit,
  } = useApp();

  const [activeFormTab, setActiveFormTab] = useState<'all' | 'daily' | 'referral' | 'adsense' | 'task' | 'invoice'>('all');

  // Referral State
  const [copiedRef, setCopiedRef] = useState(false);
  const [customRefCode, setCustomRefCode] = useState(user.referralCode || 'ZAYNOOR-VIP');
  const referralLink = `https://zaynoor.ai/?ref=${customRefCode}`;

  // Daily Bonus State
  const [bonusFeedback, setBonusFeedback] = useState<{ success: boolean; amount: number; message: string } | null>(null);

  // AdSense Calculator State
  const [estimatedViews, setEstimatedViews] = useState<number>(5000);
  const estimatedAdRevenue = (estimatedViews / 1000) * 3.25; // $3.25 CPM average
  const [adCollectFeedback, setAdCollectFeedback] = useState<string | null>(null);

  // Micro Task State
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [taskFeedback, setTaskFeedback] = useState<string>('The generated website code is clean, responsive, and uses optimal Tailwind CSS classes.');
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);

  // Client Invoice Generator State
  const [clientName, setClientName] = useState<string>('Al-Rehman Royal Restaurant');
  const [projectTitle, setProjectTitle] = useState<string>('Luxury Responsive Website & Online Menu');
  const [invoiceAmount, setInvoiceAmount] = useState<number>(250);
  const [invoiceGenerated, setInvoiceGenerated] = useState<boolean>(false);

  const exchangeRate = 280;
  const formatMoney = (amountInUSD: number) => {
    if (currency === 'PKR') {
      const pkr = Math.round(amountInUSD * exchangeRate);
      return `Rs ${pkr.toLocaleString()}`;
    }
    return `$${amountInUSD.toFixed(2)}`;
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `Join Zaynoor AI - The premier AI platform for websites, Android apps & 20-min videos. Earn real daily cash with 0 investment! Register free: ${referralLink}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleClaimBonus = () => {
    const res = claimDailyBonus();
    setBonusFeedback(res);
    setTimeout(() => setBonusFeedback(null), 5000);
  };

  const handleCollectAdYield = () => {
    addDeposit(estimatedAdRevenue, 'GOOGLE ADSENSE YIELD', `ca-pub-7550936944889241 (${estimatedViews} views)`);
    setAdCollectFeedback(`Successfully collected ${formatMoney(estimatedAdRevenue)} AdSense revenue into your wallet!`);
    setTimeout(() => setAdCollectFeedback(null), 4000);
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDeposit(1.00, 'MICRO-TASK REWARD', 'AI Model Evaluation & Quality Feedback');
    setTaskCompleted(true);
    setTimeout(() => setTaskCompleted(false), 5000);
  };

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const invoiceText = `=====================================================
ZAYNOOR AI CLIENT INVOICE & PROOF OF SERVICES
=====================================================
Invoice Date: ${new Date().toLocaleDateString()}
Invoice Ref: INV-${Date.now().toString().slice(-6)}

Client Name: ${clientName}
Service: ${projectTitle}
Delivery Status: Complete & Verified
Hosting Platform: Vercel Production Network

Total Amount Due: $${invoiceAmount}.00 (Rs ${(invoiceAmount * exchangeRate).toLocaleString()})

Payment Receiving Instructions:
- EasyPaisa: 0300-1234567 (Title: Zaynoor Official)
- JazzCash: 0301-7654321 (Title: Zaynoor Official)
- Bank IBAN: PK92MEZN0001234567890123 (Meezan Bank)
=====================================================`;
    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${clientName.replace(/\s+/g, '-')}.txt`;
    a.click();
    setInvoiceGenerated(true);
    setTimeout(() => setInvoiceGenerated(false), 4000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'بغیر انویسٹمنٹ کمائی کے مکمل فارمز — زینور اے آئی' : 'Zero-Investment Earning Hub & Forms — Zaynoor AI'}
        description="Interactive forms to earn without investment: Collect AdSense revenue, share referral links on WhatsApp, claim daily $2.50 cash, review AI tasks, and generate client invoices."
      />

      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-3">
            <Coins className="w-4 h-4 text-amber-400" />
            <span>100% Zero-Investment Earning Platform</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">
            {language === 'ur' ? 'بغیر انویسٹمنٹ کمائی کے تمام فارمز' : 'Zero-Investment Earning Hub & Forms'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {language === 'ur'
              ? 'مالک اور صارفین کے لیے بغیر کسی سرمایہ کاری کے روزانہ آمدنی حاصل کرنے کے 5 باقاعدہ انٹرایکٹو فارمز۔ ہر کمائی براہ راست والٹ میں جمع ہوتی ہے اور ایزی پیسہ یا جیز کیش سے نکلتی ہے۔'
              : 'Complete suite of interactive earning forms: Daily cash claims, WhatsApp 30% affiliate inviter, AdSense revenue collector, AI review tasks, and freelance invoicing.'}
          </p>
        </div>

        {/* Global Feedback Banner */}
        {bonusFeedback && (
          <div
            className={`max-w-2xl mx-auto p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-xl ${
              bonusFeedback.success
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-500/20 border-amber-500/40 text-amber-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{bonusFeedback.message}</span>
            </div>
            <button
              onClick={() => setCurrentRoute('wallet')}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-950 font-bold text-xs shrink-0"
            >
              Open Wallet →
            </button>
          </div>
        )}

        {/* Filter Bar for Earning Forms */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Earning Forms' },
            { id: 'daily', label: '1. Daily $2.50 Cash Claim' },
            { id: 'referral', label: '2. WhatsApp 30% Inviter' },
            { id: 'adsense', label: '3. AdSense Yield Collector' },
            { id: 'task', label: '4. AI Review Tasks ($1.00)' },
            { id: 'invoice', label: '5. Client Invoice Generator' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFormTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFormTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Ad Banner */}
        <AdBanner placement="inContent" />

        {/* INTERACTIVE FORM 1: DAILY CASH BONUS */}
        {(activeFormTab === 'all' || activeFormTab === 'daily') && (
          <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold inline-flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5" />
                  <span>Form 1: Daily Attendance Cash Reward (Zero Investment)</span>
                </span>
                <h3 className="text-2xl font-black text-white">
                  {language === 'ur' ? 'روزانہ مفت $2.50 (Rs 700) کیش کلیم کریں' : 'Claim Daily $2.50 Real Cash + 200 Free Credits'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  {language === 'ur'
                    ? 'بغیر کوئی روپیہ لگائے روزانہ صرف ایک کلک کریں۔ رقم فوری آپ کے والٹ میں آئے گی اور ایزی پیسہ سے نکل سکے گی۔'
                    : 'Log in once every 24 hours to receive guaranteed $2.50 cash added straight to your withdrawal wallet.'}
                </p>
              </div>

              <button
                onClick={handleClaimBonus}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-2xl shadow-emerald-500/40 transition-all hover:scale-105 cursor-pointer shrink-0"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>{language === 'ur' ? 'آج کا کیش کلیم کریں ($2.50)' : 'Claim Today\'s $2.50 Cash'}</span>
              </button>
            </div>
          </div>
        )}

        {/* INTERACTIVE FORM 2: WHATSAPP 30% REFERRAL INVITER */}
        {(activeFormTab === 'all' || activeFormTab === 'referral') && (
          <div className="bg-gradient-to-br from-slate-900 to-rose-950/50 border border-rose-500/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold inline-flex items-center gap-1.5 mb-1">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Form 2: WhatsApp &amp; Social 30% Lifetime Affiliate Inviter</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {language === 'ur' ? 'واٹس ایپ اور سوشل میڈیا پر ریفر کریں اور 30% کمائیں' : 'Invite Via WhatsApp &amp; Earn 30% Lifetime Passive Income'}
                </h3>
              </div>
              <span className="text-xs font-bold text-rose-400 font-mono">
                Code: {customRefCode}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Customize Your Referral Code</label>
                <input
                  type="text"
                  value={customRefCode}
                  onChange={(e) => setCustomRefCode(e.target.value.toUpperCase())}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Direct Invitation Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-rose-300 font-mono focus:outline-none"
                  />
                  <button
                    onClick={handleCopyReferral}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1 shrink-0"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedRef ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleWhatsAppShare}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950/50 shrink-0 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE FORM 3: ADSENSE REVENUE COLLECTOR */}
        {(activeFormTab === 'all' || activeFormTab === 'adsense') && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold inline-flex items-center gap-1.5 mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Form 3: Google AdSense Daily Revenue Estimator &amp; Collector</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {language === 'ur' ? 'گوگل ایڈسینس اشتہاراتی آمدنی والٹ میں جمع کریں' : 'AdSense Traffic Yield &amp; Collection Form'}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                ca-pub-7550936944889241
              </span>
            </div>

            {adCollectFeedback && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{adCollectFeedback}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-3">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Daily Pageviews / Tool Impressions:</span>
                  <span className="font-mono text-white text-sm">{estimatedViews.toLocaleString()} views</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={estimatedViews}
                  onChange={(e) => setEstimatedViews(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400">
                  Calculated using verified average CPM ($3.25) across Pakistan &amp; International traffic for your publisher unit.
                </p>
              </div>

              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-2">
                <p className="text-xs text-slate-400 font-semibold">Today's Estimated Ad Yield</p>
                <p className="text-3xl font-black text-blue-400 font-mono">{formatMoney(estimatedAdRevenue)}</p>
                <button
                  onClick={handleCollectAdYield}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-950/50 transition-all cursor-pointer"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Collect to Wallet</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE FORM 4: AI REVIEW TASK */}
        {(activeFormTab === 'all' || activeFormTab === 'task') && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold inline-flex items-center gap-1.5 mb-1">
                <Star className="w-3.5 h-3.5" />
                <span>Form 4: Micro-Task Quality Reviewer ($1.00 / Rs 280 per task)</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {language === 'ur' ? 'اے آئی ماڈل کے کام کا جائزہ لیں اور $1.00 کمائیں' : 'Submit 30-Sec AI Model Review &amp; Get Paid $1.00'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Review synthetic website/code samples to improve platform accuracy and receive instant wallet credit.
              </p>
            </div>

            {taskCompleted && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Review accepted! $1.00 credited to your available balance.</span>
              </div>
            )}

            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300">
                <p className="text-rose-400 font-bold mb-1">[AI Sample Output for Inspection]:</p>
                <p>&lt;div class="p-6 bg-slate-950 rounded-2xl border border-rose-500"&gt;Luxury Restaurant Landing Page with Interactive Menu&lt;/div&gt;</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Quality Rating (1 to 5 Stars)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setSelectedRating(star)}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex-1 transition-all ${
                          selectedRating >= star
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-950 text-slate-500 border-slate-800'
                        }`}
                      >
                        ★ {star}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Review Feedback Note</label>
                  <input
                    type="text"
                    required
                    value={taskFeedback}
                    onChange={(e) => setTaskFeedback(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review &amp; Claim $1.00 (Rs 280)</span>
              </button>
            </form>
          </div>
        )}

        {/* INTERACTIVE FORM 5: CLIENT WEBSITE INVOICE GENERATOR */}
        {(activeFormTab === 'all' || activeFormTab === 'invoice') && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold inline-flex items-center gap-1.5 mb-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Form 5: Client Freelance Invoice &amp; Payment Receiver Form</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {language === 'ur' ? 'کلائنٹ کے لیے رسید / انوائس بنائیں اور ادائیگی لیں' : 'Generate Client Invoice &amp; Direct Payment Voucher'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Charge local and international clients for websites or Android apps generated on Zaynoor AI ($150 - $500).
              </p>
            </div>

            {invoiceGenerated && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Invoice text file generated and downloaded successfully!</span>
              </div>
            )}

            <form onSubmit={handleGenerateInvoice} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Client / Business Name</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Deliverable Title</label>
                  <input
                    type="text"
                    required
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Invoice Amount ($)</label>
                  <input
                    type="number"
                    min="20"
                    required
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>Generate &amp; Download Printable Client Invoice ({formatMoney(invoiceAmount)})</span>
              </button>
            </form>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Check Your Earnings &amp; Cash Out</h3>
            <p className="text-xs text-slate-400">
              Open your Wallet to see your updated balance and submit a withdrawal request to EasyPaisa or JazzCash.
            </p>
          </div>

          <button
            onClick={() => setCurrentRoute('wallet')}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-rose-600/30 transition-all shrink-0 cursor-pointer"
          >
            <span>Open Wallet &amp; Withdraw Funds</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
