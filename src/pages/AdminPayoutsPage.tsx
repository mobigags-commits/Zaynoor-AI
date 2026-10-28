import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import {
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Shield,
  CreditCard,
  User,
  AlertCircle,
  Search,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

export const AdminPayoutsPage: React.FC = () => {
  const {
    transactions,
    approveTransaction,
    rejectTransaction,
    language,
    currency,
  } = useApp();

  const [feedback, setFeedback] = useState<string | null>(null);

  const pendingWithdrawals = transactions.filter(
    (t) => t.type === 'withdrawal' && t.status === 'pending'
  );

  const completedWithdrawals = transactions.filter(
    (t) => t.type === 'withdrawal' && t.status === 'completed'
  );

  const handleApprove = (id: string) => {
    approveTransaction(id);
    setFeedback(`Transaction ${id} successfully approved and marked as paid.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleReject = (id: string) => {
    rejectTransaction(id);
    setFeedback(`Transaction ${id} rejected. Funds returned to user balance.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'پے آؤٹس اور منظوریاں — زینور ایڈمن' : 'Admin Payouts & Approvals — Zaynoor AI'}
        description="Owner console to manage withdrawal requests, verify payment accounts, and approve payouts."
      />

      <div className="max-w-6xl mx-auto w-full space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Owner Financial Administration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Payout Requests &amp; Payment Approval Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Review, verify, and approve/reject user withdrawal requests across EasyPaisa, JazzCash, Bank, and Crypto.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{pendingWithdrawals.length} Pending Payouts</span>
          </div>
        </div>

        {feedback && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Pending Withdrawals Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Awaiting Owner Approval ({pendingWithdrawals.length})</span>
          </h2>

          {pendingWithdrawals.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
              <p>All withdrawal requests are cleared! Zero pending payouts.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <tr>
                    <th className="p-4">Txn ID</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Method &amp; Account Details</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {pendingWithdrawals.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-mono font-bold text-white">{t.id}</td>
                      <td className="p-4 font-mono font-bold text-emerald-400 text-sm">
                        ${t.amount.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-white">{t.method}</span>
                        <p className="text-[11px] text-slate-400 font-mono">{t.accountDetails}</p>
                      </td>
                      <td className="p-4 text-slate-400 font-mono text-[11px]">{t.date}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleApprove(t.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-1 shadow-md transition-all"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Approve &amp; Pay</span>
                        </button>
                        <button
                          onClick={() => handleReject(t.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 font-bold text-xs inline-flex items-center gap-1 transition-all"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Processed Payouts History */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Completed Payouts History ({completedWithdrawals.length})</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="p-4">Txn ID</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Recipient Account</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Cleared Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {completedWithdrawals.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-white">{t.id}</td>
                    <td className="p-4 font-mono font-bold text-white text-sm">
                      ${t.amount.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-white">{t.method}</span>
                      <p className="text-[11px] text-slate-400 font-mono">{t.accountDetails}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-emerald-400 font-bold text-[11px]">
                        ● PAID OUT
                      </span>
                    </td>
                    <td className="p-4 text-right text-slate-400 font-mono text-[11px]">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
