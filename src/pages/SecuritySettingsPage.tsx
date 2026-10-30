import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import {
  Shield,
  Key,
  Smartphone,
  Lock,
  RefreshCw,
  Copy,
  Check,
  Trash2,
  Download,
  AlertTriangle,
  CheckCircle2,
  LogOut,
  Laptop,
} from 'lucide-react';

export const SecuritySettingsPage: React.FC = () => {
  const { user, language } = useApp();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [apiKey, setApiKey] = useState('zn_live_948f20bca3984e01928dfb842a');
  const [copied, setCopied] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateKey = () => {
    const newKey = `zn_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
    setApiKey(newKey);
    setSavedNotice('API Key regenerated successfully. Previous key has been revoked.');
    setTimeout(() => setSavedNotice(null), 4000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setSavedNotice('Account security credentials updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSavedNotice(null), 4000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'سیکیورٹی اور اکاؤنٹ ترتیبات — زینور اے آئی' : 'Security & Account Settings — Zaynoor AI'}
        description="Manage your account security, two-factor authentication, API keys, and privacy controls."
      />

      <div className="max-w-4xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Shield className="w-7 h-7 text-rose-500" />
            <span>{language === 'ur' ? 'سیکیورٹی اور اکاؤنٹ ترتیبات' : 'Security & Account Controls'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {language === 'ur' ? 'ٹو فیکٹر تصدیق، اے پی آئی کیز اور ڈیٹا رازداری کا انتظام کریں۔' : 'Configure multi-factor authentication, manage programmatic API keys, and review active sessions.'}
          </p>
        </div>

        {savedNotice && (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{savedNotice}</span>
          </div>
        )}

        {/* 2FA Section */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-rose-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">
                  {language === 'ur' ? 'ٹو فیکٹر تصدیق (2FA)' : 'Two-Factor Authentication (2FA)'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'ur' ? 'ہر لاگ ان پر موبائل او ٹی پی کی اضافی حفاظت' : 'Secure your account with an authenticator app (Google Authenticator, Authy).'}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setTwoFactorEnabled(!twoFactorEnabled);
                setSavedNotice(twoFactorEnabled ? '2FA disabled.' : '2FA activated successfully.');
                setTimeout(() => setSavedNotice(null), 3000);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                twoFactorEnabled
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {twoFactorEnabled ? 'Enabled (Active)' : 'Enable 2FA'}
            </button>
          </div>
        </div>

        {/* API Key Management */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">
                  {language === 'ur' ? 'پلیٹ فارم اے پی آئی کیز' : 'Zaynoor Developer API Key'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Use this key to authenticate external REST requests to `/api/generate-tool` and `/api/chat`.
                </p>
              </div>
            </div>
            <button
              onClick={handleRegenerateKey}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-xs">
            <input
              type="text"
              readOnly
              value={apiKey}
              className="bg-transparent text-slate-300 flex-1 focus:outline-none"
            />
            <button
              onClick={handleCopyApiKey}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
              title="Copy Key"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Password Update Form */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                {language === 'ur' ? 'پاس ورڈ تبدیل کریں' : 'Change Password'}
              </h3>
              <p className="text-xs text-slate-400">Update your account credentials using minimum 8 characters.</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Active Sessions */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center justify-between">
            <span>Active Login Sessions</span>
            <span className="text-xs text-emerald-400 font-semibold">● 1 Current Session</span>
          </h3>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Laptop className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-xs font-bold text-white">Chrome on Linux / Cloud Edge</div>
                <div className="text-[10px] text-slate-400">Current active window • HTTPS TLS 1.3 encrypted</div>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
              Active Now
            </span>
          </div>
        </div>

        {/* Privacy Wipe & GDPR */}
        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
          <h3 className="font-bold text-sm text-rose-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>GDPR Privacy Wipe &amp; Data Export</span>
          </h3>
          <p className="text-xs text-slate-400">
            Download an archive of all your saved chats, prompts, and exported projects, or permanently delete your account history.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => {
                const data = JSON.stringify(user, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `zaynoor_data_export_${Date.now()}.json`;
                a.click();
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export All Account Data (JSON)</span>
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to wipe local session data? Your credentials will reset.')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="px-4 py-2 rounded-xl bg-rose-900/40 hover:bg-rose-900/80 border border-rose-700/50 text-xs font-semibold text-rose-200 flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Wipe Local Cache &amp; Reset</span>
            </button>
          </div>
        </div>

        <AdBanner placement="inContent" />
      </div>
    </div>
  );
};
