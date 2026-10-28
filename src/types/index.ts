export type Language = 'en' | 'ur';
export type Theme = 'dark' | 'light';

export interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
  tier: 'Free' | 'Pro' | 'Enterprise';
  credits: number;
  maxCredits: number;
  avatar: string;
  referralCode?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  model?: string;
  codeSnippet?: string;
}

export interface VideoScene {
  id: number;
  title: string;
  durationSeconds: number;
  prompt: string;
  narrationEn: string;
  narrationUr: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  videoUrl?: string;
}

export interface VideoJob {
  id: string;
  title: string;
  topic: string;
  totalDurationMinutes: number;
  aspectRatio: '16:9' | '9:16' | '1:1';
  language: 'en' | 'ur' | 'both';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  scenes: VideoScene[];
  createdAt: string;
}

export interface VercelDeployment {
  id: string;
  projectName: string;
  target: 'preview' | 'production';
  status: 'QUEUED' | 'BUILDING' | 'READY' | 'ERROR';
  url: string;
  createdAt: string;
  logs: string[];
}

export interface AdSettings {
  enabled: boolean;
  publisherId: string;
  headerAd: boolean;
  sidebarAd: boolean;
  inContentAd: boolean;
  footerAd: boolean;
  testMode: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleUr: string;
  excerptEn: string;
  excerptUr: string;
  contentEn: string;
  contentUr: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'ad_revenue' | 'referral' | 'task_reward';
  amount: number;
  status: 'completed' | 'pending' | 'rejected';
  method: string;
  date: string;
  reference: string;
  accountDetails?: string;
  fee?: number;
}

export interface WalletData {
  availableBalance: number;
  pendingBalance: number;
  totalEarned: number;
  currency: 'USD' | 'PKR';
  adEarnings: number;
  referralEarnings: number;
  taskEarnings: number;
}
