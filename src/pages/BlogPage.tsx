import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/common/SEOHead';
import { AdBanner } from '../components/layout/AdBanner';
import { BlogPost } from '../types';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Sparkles,
  Tag,
} from 'lucide-react';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'autonomous-ai-website-building-2026',
    titleEn: 'Autonomous AI Website Synthesis: From Natural Language to Production in 2026',
    titleUr: 'مصنوعی ذہانت سے مکمل ویب سائٹس کی فوری تیاری: 2026 کا نیا انقلاب',
    excerptEn: 'How generative agents and modern component sandboxes are replacing traditional coding cycles with instantaneous full-stack deployment.',
    excerptUr: 'جانیں کہ کس طرح جدید اے آئی ایجنٹس روایتی کوڈنگ کو چند سیکنڈز کی لائیو ڈیپلائمنٹ میں تبدیل کر رہے ہیں۔',
    contentEn: `The web development landscape has shifted decisively. Modern autonomous platforms like Zaynoor AI combine generative reasoning models with sandboxed component environments to produce production-ready code with live interactive previews in seconds.

### The Death of Static Scaffolding
Rather than manually initializing node modules, configuring Tailwind CSS, and hand-crafting responsive layouts, developers and product managers now describe requirements in natural language. The neural engine creates valid semantic HTML, styles it with responsive utility classes, and verifies layout integrity on the fly.

### Direct Vercel Deployment Integration
The true magic occurs when generation connects seamlessly to edge hosting. By bridging client-side code viewers with Vercel deploy APIs, teams can inspect preview deployments on custom subdomains before committing to live production.

### Key Advantages:
1. Zero boilerplate setup time.
2. Complete responsive cross-device validation.
3. Secure sandbox execution without client secret exposure.
4. Immediate export to zip or Git repositories.`,
    contentUr: `ویب ڈویلپمنٹ کی دنیا میں ایک انقلابی تبدیلی آ چکی ہے۔ روایتی طور پر ایک ویب سائٹ بنانے کے لیے گھنٹوں اور دنوں کا وقت درکار ہوتا تھا، لیکن زینور اے آئی کے ذریعے اب یہ کام سیکنڈز میں ممکن ہے۔

صرف اپنے خیالات کو قدرتی زبان میں بیان کریں، اور جدید اے آئی ماڈل فوری طور پر جدید، خوبصورت اور موبائل فرینڈلی کوڈ تیار کر کے آپ کے سامنے پیش کر دیتا ہے۔`,
    category: 'Web Engineering',
    author: 'Zaynoor Research Team',
    date: 'October 24, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    tags: ['Website Builder', 'Vercel', 'Tailwind', 'AI Development'],
  },
  {
    id: 'post-2',
    slug: 'long-form-ai-video-generation-guide',
    titleEn: 'Mastering Long-Form AI Video: Storyboarding, Narration, and 20-Minute Renders',
    titleUr: 'طویل اے آئی ویڈیوز کی تخلیق: منظر وار اسکرپٹ اور 20 منٹ کی ڈاکومنٹریز',
    excerptEn: 'A comprehensive technical deep-dive into multi-scene video pipelines, bilingual English/Urdu voice synchronization, and retry-tolerant workflows.',
    excerptUr: 'اردو اور انگریزی صوتی بیانیے کے ساتھ 20 منٹ تک کی طویل سنیماٹک ویڈیوز بنانے کا مکمل طریقہ کار۔',
    contentEn: `Single-prompt video generation has historically suffered from strict 5-to-10 second duration barriers. For educational content, corporate documentaries, and brand showcases, creators need 10 to 20 minutes of continuous, coherent storytelling.

### The Multi-Scene Assembly Pipeline
Zaynoor AI breaks the limitation by treating long-form video as a structured storyboard:
- Scene Segmentation: A 20-minute video is divided into 30 to 40 distinct visual scenes.
- Contextual Voiceover: Synchronized narration scripts are generated in both English and Urdu Nastaliq.
- Retry Resilience: If a particular clip suffers from artifacting, creators can re-render that specific scene without restarting the entire 20-minute render.

### Bilingual Voice Synchronization
By utilizing neural text-to-speech models tuned for natural cadence, emotional inflection, and bilingual pronunciation, creators can localize content for global and South Asian audiences simultaneously.`,
    contentUr: `مختصر ویڈیوز کے بعد اب دنیا طویل اے آئی ویڈیوز کی طرف بڑھ چکی ہے۔ زینور اے آئی کے لانگ ویڈیو اسٹوڈیو میں آپ 1 سے لے کر 20 منٹ تک کی مکمل ویڈیوز آسانی سے بنا سکتے ہیں۔`,
    category: 'Video & Media',
    author: 'Media Lab Lead',
    date: 'October 21, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80',
    tags: ['AI Video', 'Long-Form', 'Storyboarding', 'Urdu Voice'],
  },
  {
    id: 'post-3',
    slug: 'seo-geo-aeo-search-evolution',
    titleEn: 'Beyond Traditional SEO: Navigating GEO, AEO, and EAO Optimization',
    titleUr: 'روایتی ایس ای او سے آگے: اے آئی سرچ انجنز اور GEO کی نئی حکمت عملی',
    excerptEn: 'Why standard keyword stuffing is obsolete, and how to structure public web content for Generative Engines and direct Answer Engines.',
    excerptUr: 'جانیں کہ سرچ انجنز اب روایتی کی ورڈز کے بجائے اے آئی جوابات کو کیسے ترجیح دے رہے ہیں۔',
    contentEn: `Search is evolving rapidly toward conversational and generative synthesis. Users are increasingly turning to answer engines like Perplexity, Gemini, and ChatGPT Search for syntheses rather than clicking 10 blue links.

### The Four Optimization Pillars:
1. SEO (Search Engine Optimization): Clean HTML structure, canonical links, XML sitemaps, and Core Web Vitals.
2. GEO (Generative Engine Optimization): Clear factual citations, topical depth across 70+ pillars, and crawler accessibility.
3. AEO (Answer Engine Optimization): Concise answers formatted for immediate extraction in featured snippets and voice assistants.
4. EAO (Brand & Entity Consistency): Standardizing organization entities, authors, and accessibility across all pages.`,
    contentUr: `سرچ انجنز میں اب اے آئی جوابات کا غلبہ ہو رہا ہے۔ ویب سائٹ مالکان کے لیے ضروری ہے کہ وہ اپنے مواد کو اے آئی ماڈلز کے لیے موزوں بنائیں۔`,
    category: 'SEO & Growth',
    author: 'Growth Architect',
    date: 'October 18, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    tags: ['GEO', 'AEO', 'SEO', 'Answer Engines'],
  },
];

export const BlogPage: React.FC = () => {
  const { setCurrentRoute, language } = useApp();
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filtered = BLOG_POSTS.filter(
    (p) =>
      p.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      p.titleUr.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedPost) {
    return (
      <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
        <SEOHead
          title={`${language === 'ur' ? selectedPost.titleUr : selectedPost.titleEn} | Zaynoor AI Blog`}
          description={language === 'ur' ? selectedPost.excerptUr : selectedPost.excerptEn}
          schemaType="Article"
        />

        <div className="max-w-4xl mx-auto w-full space-y-6">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-xs text-rose-400 hover:underline flex items-center gap-1 font-semibold"
          >
            ← {language === 'ur' ? 'تمام مضامین پر واپس جائیں' : 'Back to All Articles'}
          </button>

          <img
            src={selectedPost.image}
            alt={selectedPost.titleEn}
            className="w-full h-80 object-cover rounded-3xl border border-slate-800 shadow-2xl"
          />

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-600/20 text-rose-300 font-semibold border border-rose-500/30">
              {selectedPost.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {selectedPost.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {selectedPost.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            {language === 'ur' ? selectedPost.titleUr : selectedPost.titleEn}
          </h1>

          <div className="pt-6 border-t border-slate-800 text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-wrap">
            {language === 'ur' ? selectedPost.contentUr : selectedPost.contentEn}
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-2">
            {selectedPost.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                #{tag}
              </span>
            ))}
          </div>

          <AdBanner placement="inContent" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-8">
      <SEOHead
        title={language === 'ur' ? 'بلاگ اور تحقیقی مضامین — زینور اے آئی' : 'Blog & Research Articles — Zaynoor AI'}
        description="Read original tutorials on AI website building, long-form video pipelines, Kotlin Jetpack Compose apps, and SEO/GEO strategies."
      />

      <div className="max-w-7xl mx-auto w-full space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'علمی و تحقیقی بلاگ' : 'Research & Engineering Insights'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">
            {language === 'ur' ? 'زینور اے آئی بلاگ اور گائیڈز' : 'Zaynoor AI Engineering Blog'}
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            {language === 'ur'
              ? 'مصنوعی ذہانت، لانگ ویڈیوز، اینڈرائیڈ ایپس، اور سرچ انجن آپٹیمائزیشن پر گہرے مضامین۔'
              : 'Original deep-dive guides on autonomous generative systems, long-form video architecture, and SEO.'}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
          />
        </div>

        <AdBanner placement="header" />

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-slate-900/60 border border-slate-800 hover:border-rose-500/50 rounded-3xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between group shadow-lg"
            >
              <div>
                <img
                  src={post.image}
                  alt={post.titleEn}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-xs text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-rose-600/20 text-rose-300 font-semibold border border-rose-500/30">
                      {post.category}
                    </span>
                    <span>• {post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-400 transition-colors line-clamp-2">
                    {language === 'ur' ? post.titleUr : post.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {language === 'ur' ? post.excerptUr : post.excerptEn}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-rose-400 mt-4">
                <span>{language === 'ur' ? 'مکمل مضمون پڑھیں' : 'Read Article'}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
