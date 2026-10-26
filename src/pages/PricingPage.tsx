import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import { Check, Zap, Sparkles, Shield, ArrowRight } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { language, setCurrentRoute } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      id: 'free',
      nameEn: 'Starter Free',
      nameUr: 'اسٹارٹر مفت',
      priceMonthly: 0,
      priceAnnual: 0,
      descEn: 'Perfect for exploring the 70+ AI tools and quick experiments.',
      descUr: 'مفت ٹولز کے لیے اور بنیادی تجربات کے لیے موزوں۔',
      credits: '1,000 credits/mo',
      featuresEn: [
        'Access to AI Chat (Gemini 3.8 Flash)',
        'Basic Website Generation',
        'Up to 1-Minute Video Generation',
        'Standard Urdu & English Translation',
        'Community Support',
      ],
      featuresUr: [
        'اے آئی چیٹ (جیمینائی 3.8 فلیش)',
        'بنیادی ویب سائٹ جنریشن',
        '1 منٹ تک کی ویڈیو تخلیق',
        'اردو اور انگریزی ترجمہ',
        'کمیونٹی سپورٹ',
      ],
      ctaEn: 'Current Plan',
      ctaUr: 'موجودہ پلان',
      popular: false,
    },
    {
      id: 'pro',
      nameEn: 'Creator Pro',
      nameUr: 'کریئیٹر پرو',
      priceMonthly: 29,
      priceAnnual: 22,
      descEn: 'For developers, designers, and creators building production projects.',
      descUr: 'پیشہ ورانہ ویب سائٹس، ایپس اور ویڈیوز کے لیے۔',
      credits: '25,000 credits/mo',
      featuresEn: [
        'Unlimited AI Chat & Coding Assistant',
        'Full AI Website Builder + Code Export',
        'Native Android Compose App Builder',
        'Up to 10-Minute Long Video Studio',
        'Vercel 1-Click Production Deployments',
        'Complete SEO, GEO & AEO Suite',
        'Priority GPU Rendering Queues',
      ],
      featuresUr: [
        'لامحدود اے آئی چیٹ اور کوڈنگ اسسٹنٹ',
        'مکمل ویب سائٹ بلڈر مع کوڈ ڈاؤن لوڈ',
        'اینڈرائیڈ جیٹ پیک کمپوز بلڈر',
        '10 منٹ تک کی لانگ ویڈیوز',
        'ورسل پر فوری 1 کلک پروڈکشن ہوسٹنگ',
        'جامع ایس ای او اور GEO سویٹ',
        'ترجیحی ویڈیو پروسیسنگ',
      ],
      ctaEn: 'Upgrade to Pro',
      ctaUr: 'پرو پلان منتخب کریں',
      popular: true,
    },
    {
      id: 'enterprise',
      nameEn: 'Zaynoor Enterprise Elite',
      nameUr: 'انٹرپرائز ایلیٹ',
      priceMonthly: 99,
      priceAnnual: 79,
      descEn: 'Full autonomous ecosystem access with dedicated cluster resources.',
      descUr: 'بڑے کاروباروں اور ٹیموں کے لیے مکمل آزادی۔',
      credits: '100,000 credits/mo',
      featuresEn: [
        'Up to 20-Minute Cinematic Long Videos',
        'Custom AI Agents & Private Knowledge Base',
        'Unlimited Vercel Deploys & Custom Domains',
        'Dedicated Enterprise SLA & Phone Support',
        'AdSense Monetization Custom Integrations',
        'Early Access to Gemini 4 Argon Models',
        'Custom Team Workspaces & Roles',
      ],
      featuresUr: [
        '20 منٹ تک کی مکمل سنیماٹک ویڈیوز',
        'کسٹم اے آئی ایجنٹس اور نالج بیس',
        'لامحدود ورسل ڈیپلائمنٹ اور کسٹم ڈومینز',
        '24/7 ترجیحی سپورٹ اور ایس ایل اے',
        'ایڈسینس مونیٹائزیشن کنٹرولز',
        'جیمینائی 4 ماڈلز تک جلد رسائی',
        'ٹیم ورک اسپیسز اور رولز',
      ],
      ctaEn: 'Contact Enterprise',
      ctaUr: 'انٹرپرائز سے رابطہ کریں',
      popular: false,
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'قیمتوں کے منصوبے — زینور اے آئی' : 'Pricing Plans — Zaynoor AI'}
        description="Transparent pricing for creators, developers, and enterprises. Monthly and annual plans with substantial savings."
      />

      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'شفاف اور لچکدار قیمتیں' : 'Simple, Transparent Pricing'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">
            {language === 'ur' ? 'اپنی ضروریات کے مطابق پلان منتخب کریں' : 'Choose Your Superpower Plan'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mb-8">
            {language === 'ur'
              ? 'کسی بھی وقت اپ گریڈ یا منسوخ کریں۔ کوئی پوشیدہ فیس نہیں۔'
              : 'Cancel or switch plans anytime. All plans include full access to our 70+ AI tools directory.'}
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center p-1.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'ur' ? 'ماہانہ بلنگ' : 'Monthly Billing'}
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{language === 'ur' ? 'سالانہ بلنگ' : 'Annual Billing'}</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 text-[10px] font-black">
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                  plan.popular
                    ? 'bg-gradient-to-b from-slate-900 via-rose-950/40 to-slate-950 border-2 border-rose-500 shadow-2xl shadow-rose-950/50 scale-105 z-10'
                    : 'bg-slate-900/60 border border-slate-800'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-rose-600 to-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {language === 'ur' ? plan.nameUr : plan.nameEn}
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">
                    {language === 'ur' ? plan.descUr : plan.descEn}
                  </p>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl sm:text-5xl font-black text-white">${price}</span>
                    <span className="text-xs text-slate-400">/month</span>
                  </div>
                  <p className="text-xs font-semibold text-rose-400 mb-6">{plan.credits}</p>

                  <div className="pt-6 border-t border-slate-800 space-y-3">
                    {(language === 'ur' ? plan.featuresUr : plan.featuresEn).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    alert(`Selected ${plan.nameEn}. Redirecting to checkout sandbox...`);
                  }}
                  className={`w-full mt-8 py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <span>{language === 'ur' ? plan.ctaUr : plan.ctaEn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Ad Placement */}
        <AdBanner placement="inContent" />
      </div>
    </div>
  );
};
