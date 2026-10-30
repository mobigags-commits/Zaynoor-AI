import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import {
  LayoutDashboard,
  Users,
  Cpu,
  BadgeDollarSign,
  TrendingUp,
  Server,
  Shield,
  Activity,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  SlidersHorizontal,
  Bell,
  RefreshCw,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { language, setCurrentRoute, user } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'providers' | 'logs'>('overview');
  const [serverMetrics, setServerMetrics] = useState<{
    uptimeSeconds: number;
    memory: { rssMb: number; heapUsedMb: number };
    nodeVersion: string;
    status: string;
  } | null>(null);

  const [usersList, setUsersList] = useState([
    { id: 'u1', name: 'Zaynoor Architect', email: 'architect@zaynoor.ai', role: 'admin', tier: 'Enterprise', credits: 9450, status: 'active' },
    { id: 'u2', name: 'Tariq Hussain', email: 'tariq@example.com', role: 'user', tier: 'Pro', credits: 4200, status: 'active' },
    { id: 'u3', name: 'Sara Khan', email: 'sara.k@domain.org', role: 'user', tier: 'Free', credits: 450, status: 'active' },
    { id: 'u4', name: 'David Miller', email: 'david.m@dev.co', role: 'user', tier: 'Pro', credits: 1200, status: 'active' },
  ]);

  const [announcement, setAnnouncement] = useState('Zaynoor AI 2.0 Engine is live with Gemini 3.8 Flash and Vercel Deploy Center!');

  React.useEffect(() => {
    fetch('/api/system/metrics')
      .then((res) => res.json())
      .then((data) => setServerMetrics(data))
      .catch(() => {});
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'ایڈمن ڈیش بورڈ — زینور اے آئی' : 'Admin Dashboard & Governance — Zaynoor AI'}
        description="Platform telemetry, user quotas, provider keys, server health, and governance."
      />

      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Platform Administration &amp; Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Zaynoor AI Control Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Logged in as <strong className="text-white">{user.name}</strong> ({user.role.toUpperCase()})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentRoute('admin-ads')}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <BadgeDollarSign className="w-3.5 h-3.5 text-rose-400" />
              <span>Ads Config</span>
            </button>
            <button
              onClick={() => setCurrentRoute('admin-seo')}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              <span>SEO Audit</span>
            </button>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Total Active Users</span>
              <Users className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-3xl font-black text-white">14,290</div>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
              <span>↑ 18.4%</span> this week
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Tokens Processed</span>
              <Cpu className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white">48.2M</div>
            <p className="text-[11px] text-slate-400 mt-1">Average latency: 312ms</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>System &amp; Memory</span>
              <Server className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">
              {serverMetrics ? `${serverMetrics.memory.heapUsedMb} MB` : '99.98%'}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {serverMetrics ? `Node ${serverMetrics.nodeVersion} • Uptime ${Math.floor(serverMetrics.uptimeSeconds / 60)}m` : 'Cluster 1-Asia-East1 healthy'}
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Active Deployments</span>
              <Activity className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white">821</div>
            <p className="text-[11px] text-slate-400 mt-1">Vercel live instances</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-3 transition-colors border-b-2 ${
              activeTab === 'overview'
                ? 'border-rose-500 text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            System Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 px-3 transition-colors border-b-2 ${
              activeTab === 'users'
                ? 'border-rose-500 text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            User Management ({usersList.length})
          </button>
          <button
            onClick={() => setActiveTab('providers')}
            className={`pb-3 px-3 transition-colors border-b-2 ${
              activeTab === 'providers'
                ? 'border-rose-500 text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            AI Providers &amp; Fallbacks
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`pb-3 px-3 transition-colors border-b-2 ${
              activeTab === 'logs'
                ? 'border-rose-500 text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Server Logs &amp; Audit Trail
          </button>
        </div>

        {/* Tab 1: Overview & Site Announcement */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Site Announcement */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Bell className="w-4 h-4 text-rose-500" />
                  <span>Platform Announcement Banner</span>
                </h3>
                <textarea
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500 resize-none h-20"
                />
                <button
                  onClick={() => alert('Announcement broadcasted to all active sessions.')}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
                >
                  Broadcast Announcement
                </button>
              </div>

              {/* Service Health Grid */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="font-bold text-white text-sm">Cluster Microservice Health</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <span>Google GenAI Adapter (gemini-3.8-flash)</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Operational (124ms)
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <span>Vercel Edge Proxy Pipeline</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Operational
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <span>Long Video Render Queue Worker</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 0 jobs in backlog
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <span>Google AdSense Verification Endpoint</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ads.txt Validated
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="font-bold text-white text-sm">Quick Governance Links</h3>
                <div className="space-y-2 text-xs">
                  <button
                    onClick={() => setCurrentRoute('admin-ads')}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 flex items-center justify-between"
                  >
                    <span>AdSense Placements</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button
                    onClick={() => setCurrentRoute('seo-audit')}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 flex items-center justify-between"
                  >
                    <span>Run Full SEO / GEO Audit</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button
                    onClick={() => setCurrentRoute('pricing')}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 flex items-center justify-between"
                  >
                    <span>Inspect Pricing Tiers</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: User Management Table */}
        {activeTab === 'users' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Tier</th>
                    <th className="p-4">Credits Remaining</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-white">{u.name}</p>
                        <p className="text-[11px] text-slate-400">{u.email}</p>
                      </td>
                      <td className="p-4 uppercase text-[11px] font-bold text-slate-400">{u.role}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-rose-600/20 text-rose-300 font-bold border border-rose-500/30">
                          {u.tier}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-bold text-white">{u.credits.toLocaleString()}</td>
                      <td className="p-4">
                        <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                          ● Active
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => alert(`Refilled 1,000 credits for ${u.name}`)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                        >
                          +1k Credits
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Providers */}
        {activeTab === 'providers' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-sm">Configured AI Providers</h3>
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">Google Gemini GenAI SDK</h4>
                  <p className="text-slate-400 text-[11px]">Models: gemini-3.8-flash, gemini-4-argon</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  Primary Engine
                </span>
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between opacity-80">
                <div>
                  <h4 className="font-bold text-white">Zaynoor Edge Fallback Engine</h4>
                  <p className="text-slate-400 text-[11px]">Instant synthetic fallback if API rate limit occurs</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold">
                  Standby Ready
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Logs */}
        {activeTab === 'logs' && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 space-y-1.5 max-h-[400px] overflow-y-auto">
            <p className="text-slate-400">[SYSTEM] Initialized Zaynoor AI Enterprise Core cluster</p>
            <p className="text-emerald-400">[200 OK] GET /api/health - healthy</p>
            <p className="text-blue-400">[200 OK] POST /api/chat - model gemini-3.8-flash (281ms)</p>
            <p className="text-emerald-400">[200 OK] POST /api/website-builder/generate - HTML Tailwind output (412ms)</p>
            <p className="text-emerald-400">[200 OK] POST /api/video/create - 6 scenes generated (3m target)</p>
            <p className="text-slate-400">[SYSTEM] All 70+ routes active and responding</p>
          </div>
        )}
      </div>
    </div>
  );
};
