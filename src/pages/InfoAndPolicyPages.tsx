import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import {
  Shield,
  FileText,
  Cookie,
  ShieldAlert,
  HelpCircle,
  PhoneCall,
  Info,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Mail,
  Send,
} from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { language } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Zaynoor AI and how does it differ from a standard chatbot?',
      a: 'Zaynoor AI is an end-to-end autonomous creative and software engineering ecosystem. In addition to multi-turn conversational intelligence, it provides full AI Website Building with sandboxed live preview, Native Android App synthesis using Kotlin and Jetpack Compose, 20-minute continuous long video studio pipelines, and one-click Vercel production hosting.',
    },
    {
      q: 'How does the 20-minute long video generation feature work?',
      a: 'For videos between 1 and 20 minutes, Zaynoor AI uses a structured multi-scene storyboard pipeline. It breaks the narrative into sequential scenes, synthesizes synchronized bilingual Urdu and English voiceovers, adds subtitles and background audio, and offers isolated scene re-render controls so you never lose an entire video if one clip needs adjustment.',
    },
    {
      q: 'Can I deploy my generated websites to Vercel?',
      a: 'Yes! Zaynoor AI features a dedicated Vercel Deploy Center. You can test your website in a live preview environment, inspect terminal build output logs, verify custom domain DNS records, and publish directly to production with a verified SSL URL.',
    },
    {
      q: 'How is Google AdSense integrated into Zaynoor AI?',
      a: 'AdSense is architected with strict layout-shift (CLS) prevention containers, clear advertisement labels, ads.txt verification, and consent management. In the Admin Dashboard, publishers can configure their publisher ID, toggle individual unit placements, and preview slots in test mode.',
    },
    {
      q: 'Do you support Urdu language and RTL typography?',
      a: 'Yes, Zaynoor AI provides first-class support for Urdu with right-to-left (RTL) layout switching, Noto Nastaliq Urdu typography, and bidirectional AI translation and voiceover synthesis.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'عام سوالات و جوابات — زینور اے آئی' : 'Frequently Asked Questions (FAQ) — Zaynoor AI'}
        description="Get instant answers about Zaynoor AI tools, 20-minute video studio, website builder, and Vercel deployments."
        schemaType="FAQPage"
        faqItems={faqs.map((f) => ({ question: f.q, answer: f.a }))}
      />

      <div className="max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support &amp; Answers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-400">Everything you need to know about Zaynoor AI platform capabilities.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-rose-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-rose-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <AdBanner placement="inContent" />
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { language } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'ہم سے رابطہ کریں — زینور اے آئی' : 'Contact Us — Zaynoor AI'}
        description="Contact Zaynoor AI technical support and enterprise sales teams."
      />

      <div className="max-w-3xl mx-auto w-full space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-semibold mb-3">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Direct Support Channel</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Get in Touch with Zaynoor AI
          </h1>
          <p className="text-sm text-slate-400">Our engineering and customer success teams respond within 2 hours.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Message Received</h3>
              <p className="text-xs text-slate-400">Thank you for contacting us. A senior engineer will follow up shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Sarah Jenkins"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Inquiry regarding Enterprise API & Video Pipelines"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Please describe your use case, expected monthly token volume, or question..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Engineers</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const LegalPolicyPage: React.FC<{ type: 'privacy' | 'terms' | 'cookie' | 'safety' }> = ({ type }) => {
  const config = {
    privacy: {
      title: 'Privacy Policy',
      desc: 'Our strict zero-sale data pledge and compliance with GDPR and CCPA regulations.',
      content: `At Zaynoor AI, data privacy is non-negotiable.

1. Information We Collect:
We collect user account information (email, name) and technical metrics required to authenticate sessions and manage API quotas. We do not sell your personal information or private conversational history to third parties.

2. Generation Data & Intellectual Property:
All code, websites, video scripts, and media generated through your account belong entirely to you. Zaynoor AI claims zero copyright or IP ownership over your synthetic deliverables.

3. Cookies & AdSense:
We use strictly necessary cookies to keep you signed in. For monetized public pages, Google AdSense uses anonymous identifiers to serve relevant advertising in accordance with your consent preferences.

4. Account Data Deletion:
You may request permanent deletion of your profile, chats, and saved projects at any time via Account Settings.`,
    },
    terms: {
      title: 'Terms of Service',
      desc: 'Rules and terms governing the use of the Zaynoor AI ecosystem.',
      content: `Welcome to Zaynoor AI. By accessing or using our platform, you agree to these Terms.

1. License and Access:
Zaynoor AI grants you a personal, non-exclusive license to use the tools, website builder, video studio, and deployment services in accordance with your plan limits.

2. Prohibited Uses:
You agree not to use Zaynoor AI to generate malicious software, phishing pages, deceptive deepfakes, or harassment. Violation results in immediate account suspension.

3. SLA and Uptime:
While we strive for 99.98% availability, autonomous generation relies on upstream AI models and edge providers. We do not guarantee uninterrupted availability during upstream outages.`,
    },
    cookie: {
      title: 'Cookie Policy',
      desc: 'How Zaynoor AI uses cookies and tracking technologies responsibly.',
      content: `This Cookie Policy explains how Zaynoor AI uses cookies and similar technologies.

1. Essential Cookies:
Required for session authentication, theme persistence (dark/light), and language selection (Urdu/English).

2. Analytics & Performance:
Help us monitor tool latencies and resolve server bottlenecks.

3. Advertising Cookies:
Set by Google AdSense to serve non-intrusive advertisements with full user consent controls.`,
    },
    safety: {
      title: 'AI Content and Safety Policy',
      desc: 'Our guardrails and responsible AI governance framework.',
      content: `Zaynoor AI is committed to safe, transparent, and ethical artificial intelligence.

1. Moderation Guardrails:
All prompts and media pipelines are filtered through content safety layers to prevent CSAM, hate speech, dangerous weapon instructions, and illegal acts.

2. Attribution & Transparency:
We encourage users to clearly disclose when media or articles are synthetically generated.

3. Model Disclosures:
We clearly label all configured AI providers (e.g. Gemini 3.8 Flash) and never fabricate results.`,
    },
  }[type];

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead title={`${config.title} — Zaynoor AI`} description={config.desc} />

      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white mb-2">{config.title}</h1>
          <p className="text-xs sm:text-sm text-slate-400">{config.desc}</p>
          <p className="text-[11px] text-slate-500 mt-2">Last Updated: October 2026 • Effective Worldwide</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
          {config.content}
        </div>

        <AdBanner placement="inContent" />
      </div>
    </div>
  );
};
