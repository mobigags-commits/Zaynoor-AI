export interface RouteInfo {
  id: string;
  path: string;
  nameEn: string;
  nameUr: string;
  category: 'core' | 'creation' | 'dev' | 'business' | 'optimization' | 'admin' | 'info';
  icon: string;
  descriptionEn: string;
  descriptionUr: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export const ALL_ROUTES: RouteInfo[] = [
  // Core AI (1-12)
  { id: 'home', path: '/', nameEn: 'Home', nameUr: 'ہوم', category: 'core', icon: 'Home', descriptionEn: 'Zaynoor AI luxury portal and instant generation suite', descriptionUr: 'زینور اے آئی پرتعیش پورٹل اور مرکزی ڈیش بورڈ' },
  { id: 'chat', path: '/chat', nameEn: 'AI Chat Assistant', nameUr: 'اے آئی چیٹ اسسٹنٹ', category: 'core', icon: 'MessageSquare', descriptionEn: 'Intelligent conversational model with streaming and memory', descriptionUr: 'گفتگو کرنے والا اے آئی ماڈل باآسانی یادداشت کے ساتھ', isPopular: true },
  { id: 'explore-tools', path: '/explore-tools', nameEn: 'Explore AI Tools', nameUr: 'تمام ٹولز تلاش کریں', category: 'core', icon: 'Compass', descriptionEn: 'Directory of all 70+ production-grade AI tools', descriptionUr: 'تمام 70 سے زائد ٹولز کی مکمل ڈائرکٹری' },
  { id: 'models', path: '/models', nameEn: 'AI Model Directory', nameUr: 'اے آئی ماڈلز ڈائرکٹری', category: 'core', icon: 'Cpu', descriptionEn: 'Gemini, multimodal, and specialized intelligence models', descriptionUr: 'جیمینائی اور جدید ماڈلز کا تعارف اور دستیابی' },
  { id: 'writing', path: '/writing', nameEn: 'AI Writing Assistant', nameUr: 'اے آئی تحریری اسسٹنٹ', category: 'core', icon: 'PenTool', descriptionEn: 'Generate compelling articles, reports, and marketing copy', descriptionUr: 'مضامین اور رپورٹس کی شاندار تحریر' },
  { id: 'rewriter', path: '/rewriter', nameEn: 'AI Rewriter', nameUr: 'اے آئی ری رائٹر', category: 'core', icon: 'RefreshCw', descriptionEn: 'Paraphrase and restructure content into different tones', descriptionUr: 'مواد کو مختلف انداز اور سر میں دوبارہ لکھیں' },
  { id: 'grammar', path: '/grammar', nameEn: 'Grammar Checker', nameUr: 'گرامر چیکر', category: 'core', icon: 'CheckCheck', descriptionEn: 'Flawless syntax, punctuation, and linguistic polish', descriptionUr: 'گرامر اور ہجے کی جامع جانچ اور بہتری' },
  { id: 'translator', path: '/translator', nameEn: 'Translator (Urdu & 100+)', nameUr: 'مترجم (اردو اور 100+ زبانیں)', category: 'core', icon: 'Languages', descriptionEn: 'High-fidelity contextual translation including Urdu Nastaliq', descriptionUr: 'اردو نستعلیق اور دیگر عالمی زبانوں میں درست ترجمہ', isPopular: true },
  { id: 'summarizer', path: '/summarizer', nameEn: 'Text Summarizer', nameUr: 'خلاصہ کار', category: 'core', icon: 'FileText', descriptionEn: 'Condense long articles and documents into concise briefs', descriptionUr: 'طویل دستاویزات اور مواد کا فوری جامع خلاصہ' },
  { id: 'blog-writer', path: '/blog-writer', nameEn: 'Blog Writer', nameUr: 'بلاگ رائٹر', category: 'core', icon: 'BookOpen', descriptionEn: 'Long-form SEO optimized blog post generator', descriptionUr: 'ایس ای او سے لیس معیاری بلاگ پوسٹس کی خودکار تیاری' },
  { id: 'email-writer', path: '/email-writer', nameEn: 'Email Writer', nameUr: 'ای میل رائٹر', category: 'core', icon: 'Mail', descriptionEn: 'High-converting sales, executive, and cold outreach emails', descriptionUr: 'پیشہ ورانہ ای میلز کی فوری تیاری' },
  { id: 'social-media', path: '/social-media', nameEn: 'Social Media Generator', nameUr: 'سوشل میڈیا پوسٹ جنریٹر', category: 'core', icon: 'Share2', descriptionEn: 'Viral posts, captions, and hashtags for LinkedIn, X, and IG', descriptionUr: 'سوشل میڈیا کے لیے اثر انگیز پوسٹس اور ہیش ٹیگز' },

  // Creative & Media (13-24)
  { id: 'image-generator', path: '/image-generator', nameEn: 'AI Image Generator', nameUr: 'اے آئی امیج جنریٹر', category: 'creation', icon: 'Image', descriptionEn: 'Generate photorealistic and luxury visuals from prompts', descriptionUr: 'تصویر بنانے کا طاقتور اے آئی انجن', isPopular: true },
  { id: 'image-editor', path: '/image-editor', nameEn: 'AI Image Editor', nameUr: 'اے آئی تصویر ایڈیٹر', category: 'creation', icon: 'Sliders', descriptionEn: 'Enhance, adjust, and stylize images with neural filters', descriptionUr: 'تصاویر میں ترامیم اور فلٹرز' },
  { id: 'background-remover', path: '/background-remover', nameEn: 'Background Remover', nameUr: 'پس منظر ہٹانے والا ٹول', category: 'creation', icon: 'Scissors', descriptionEn: 'Instant one-click transparent background cutout', descriptionUr: 'تصویر کا بیک گراؤنڈ فوری اور صاف ہٹائیں' },
  { id: 'logo-maker', path: '/logo-maker', nameEn: 'Logo Maker', nameUr: 'لوگو بنانے والا ٹول', category: 'creation', icon: 'Sparkles', descriptionEn: 'Custom brand logos, vector symbols, and badges', descriptionUr: 'کاروباری لوگو اور برانڈنگ کے جدید نشانات' },
  { id: 'poster-maker', path: '/poster-maker', nameEn: 'Poster & Thumbnail Maker', nameUr: 'پوسٹر اور تھمب نیل میکر', category: 'creation', icon: 'Layout', descriptionEn: 'High-CTR YouTube thumbnails and marketing banners', descriptionUr: 'یوٹیوب تھمب نیلز اور پوسٹرز کی تیاری' },
  { id: 'video-generator', path: '/video-generator', nameEn: 'AI Video Generator', nameUr: 'اے آئی ویڈیو جنریٹر', category: 'creation', icon: 'Video', descriptionEn: 'Short clips and scene visuals from prompts', descriptionUr: 'مختصر ویڈیوز کی تخلیق' },
  { id: 'long-video-studio', path: '/long-video-studio', nameEn: 'Long Video Studio (Up to 20 Min)', nameUr: 'لانگ ویڈیو اسٹوڈیو (20 منٹ تک)', category: 'creation', icon: 'Clapperboard', descriptionEn: 'Multi-scene long-form videos (1, 3, 5, 10, 15, 20 min) with Urdu/English voiceover', descriptionUr: 'لمبی ویڈیوز کی منظر وار تخلیق مع اردو و انگریزی وائس اوور', isPopular: true, isNew: true },
  { id: 'video-editor', path: '/video-editor', nameEn: 'Video Editor', nameUr: 'ویڈیو ایڈیٹر', category: 'creation', icon: 'Film', descriptionEn: 'Trim, arrange, merge, and polish video clips', descriptionUr: 'ویڈیو کلپس کی ترتیب اور تدوین' },
  { id: 'voice-assistant', path: '/voice-assistant', nameEn: 'AI Voice Assistant', nameUr: 'اے آئی وائس اسسٹنٹ', category: 'creation', icon: 'Mic', descriptionEn: 'Interactive voice conversation in real time', descriptionUr: 'صوتی گفتگو اور فوری جوابات' },
  { id: 'tts', path: '/tts', nameEn: 'Text-to-Speech Studio', nameUr: 'متن سے آواز اسٹوڈیو', category: 'creation', icon: 'Volume2', descriptionEn: 'Natural voices in English and Urdu with audio export', descriptionUr: 'متن کو قدرتی آواز میں تبدیل کر کے ڈاؤن لوڈ کریں' },
  { id: 'stt', path: '/stt', nameEn: 'Speech-to-Text', nameUr: 'آواز سے متن کنورٹر', category: 'creation', icon: 'Radio', descriptionEn: 'Live microphone speech recognition into clear text', descriptionUr: 'مائیکروفون کے ذریعے آواز کو متن میں تبدیل کریں' },
  { id: 'transcription', path: '/transcription', nameEn: 'Audio Transcription', nameUr: 'آڈیو ٹرانسکرپشن', category: 'creation', icon: 'FileAudio', descriptionEn: 'Transcribe audio recordings and meetings with timestamps', descriptionUr: 'آڈیو فائلوں کا تحریری ریکارڈ' },

  // Documents & Research (25-29)
  { id: 'pdf-assistant', path: '/pdf-assistant', nameEn: 'PDF Assistant', nameUr: 'پی ڈی ایف اسسٹنٹ', category: 'core', icon: 'FileSearch', descriptionEn: 'Extract, summarize, and query large PDF documents', descriptionUr: 'پی ڈی ایف سے معلومات نکالیں اور سوالات پوچھیں' },
  { id: 'document-analyzer', path: '/document-analyzer', nameEn: 'Document Analyzer', nameUr: 'دستاویزات کا تجزیہ', category: 'core', icon: 'Layers', descriptionEn: 'Contracts, resumes, and technical specs breakdown', descriptionUr: 'معاہدات اور تکنیکی فائلوں کی جانچ' },
  { id: 'file-qa', path: '/file-qa', nameEn: 'File Question Answering', nameUr: 'فائل سوال و جواب', category: 'core', icon: 'HelpCircle', descriptionEn: 'Chat directly with CSV, TXT, MD, and docs', descriptionUr: 'کسی بھی فائل کے ساتھ براہ راست چیٹ' },
  { id: 'research-assistant', path: '/research-assistant', nameEn: 'Research Assistant', nameUr: 'تحقیقی معاون', category: 'core', icon: 'GraduationCap', descriptionEn: 'Synthesize academic literature with citations', descriptionUr: 'علمی و سائنسی تحقیق مع حوالہ جات' },
  { id: 'web-search', path: '/web-search', nameEn: 'Web Search Assistant', nameUr: 'ویب سرچ اسسٹنٹ', category: 'core', icon: 'Globe', descriptionEn: 'Ground your answers with real-time web citations', descriptionUr: 'انٹرنیٹ سے تصدیق شدہ معلومات اور حوالہ جات' },

  // Engineering & Web Building (30-35)
  { id: 'coding-assistant', path: '/coding-assistant', nameEn: 'AI Coding Assistant', nameUr: 'کوڈنگ اسسٹنٹ', category: 'dev', icon: 'Code', descriptionEn: 'Write production-grade code across 30+ languages', descriptionUr: 'ہر پروگرامنگ زبان میں معیاری کوڈ کی تیاری' },
  { id: 'debugger', path: '/debugger', nameEn: 'Code Debugger', nameUr: 'کوڈ ڈیبگر', category: 'dev', icon: 'Bug', descriptionEn: 'Identify bugs, security vulnerabilities, and memory leaks', descriptionUr: 'غلطیوں کی نشاندہی اور فوری حل' },
  { id: 'website-builder', path: '/website-builder', nameEn: 'AI Website Builder', nameUr: 'اے آئی ویب سائٹ بلڈر', category: 'dev', icon: 'Laptop', descriptionEn: 'Generate complete responsive websites with live preview', descriptionUr: 'مکمل ویب سائٹ بنائیں اور لائیو پیش نظارہ دیکھیں', isPopular: true },
  { id: 'app-builder', path: '/app-builder', nameEn: 'AI App Builder (Android & Web)', nameUr: 'اینڈرائیڈ اور ویب ایپ بلڈر', category: 'dev', icon: 'Smartphone', descriptionEn: 'Generate native Jetpack Compose Kotlin apps and web apps', descriptionUr: 'اینڈرائیڈ اسٹوڈیو کے لیے کوٹلن پروجیکٹ تیار کریں', isPopular: true },
  { id: 'preview-workspace', path: '/preview-workspace', nameEn: 'Website Preview Workspace', nameUr: 'ویب سائٹ پیش نظارہ ورک اسپیس', category: 'dev', icon: 'MonitorPlay', descriptionEn: 'Interactive multi-device responsive testing environment', descriptionUr: 'مختلف اسکرین سائزز پر جانچ کا ورک اسپیس' },
  { id: 'code-editor', path: '/code-editor', nameEn: 'Project Code Editor', nameUr: 'پروجیکٹ کوڈ ایڈیٹر', category: 'dev', icon: 'Terminal', descriptionEn: 'Browser-based code editor with syntax highlighting', descriptionUr: 'براؤزر میں کوڈنگ اور لائیو رن' },

  // Deployment & Vercel (36-37)
  { id: 'deployment-center', path: '/deployment-center', nameEn: 'Website Deployment Center', nameUr: 'ویب سائٹ ڈیپلائمنٹ سینٹر', category: 'dev', icon: 'Server', descriptionEn: 'Multi-cloud hosting, domains, and build settings', descriptionUr: 'مختلف ہوسٹنگز اور ڈومینز کا کنٹرول' },
  { id: 'vercel-deploy', path: '/vercel-deploy', nameEn: 'Vercel Deploy Center', nameUr: 'ورسل ڈیپلائے سینٹر', category: 'dev', icon: 'Zap', descriptionEn: 'Connect Vercel, build preview, publish production with real logs', descriptionUr: 'ورسل پر لائیو پیش نظارہ اور فائنل پروڈکشن پبلش', isPopular: true, isNew: true },

  // Math, Data & Productivity (38-44)
  { id: 'math-assistant', path: '/math-assistant', nameEn: 'Math Assistant', nameUr: 'ریاضی معاون', category: 'business', icon: 'Binary', descriptionEn: 'Calculus, linear algebra, statistics with formulas', descriptionUr: 'حساب اور سائنسی مساوات کا مرحلہ وار حل' },
  { id: 'data-studio', path: '/data-studio', nameEn: 'Data Analysis Studio', nameUr: 'ڈیٹا اینالیسس اسٹوڈیو', category: 'business', icon: 'BarChart3', descriptionEn: 'Upload CSV, generate charts, and uncover data trends', descriptionUr: 'ڈیٹا سے گراف اور نتائج اخذ کریں' },
  { id: 'spreadsheet-assistant', path: '/spreadsheet-assistant', nameEn: 'Spreadsheet Assistant', nameUr: 'اسپریڈ شیٹ معاون', category: 'business', icon: 'Table', descriptionEn: 'Excel & Google Sheets formulas, complex regex, macros', descriptionUr: 'ایکسل فارمولے اور خودکار اسکرپٹس' },
  { id: 'presentation-maker', path: '/presentation-maker', nameEn: 'Presentation Maker', nameUr: 'پریزنٹیشن میکر', category: 'business', icon: 'Presentation', descriptionEn: 'Generate compelling slide decks and outlines', descriptionUr: 'شاندار سلائیڈز اور پریزنٹیشن کی تیاری' },
  { id: 'prompt-library', path: '/prompt-library', nameEn: 'Prompt Library', nameUr: 'پرامپٹ لائبریری', category: 'business', icon: 'Library', descriptionEn: '200+ battle-tested prompts for creators and developers', descriptionUr: 'بہترین اور آزمودہ پرامپٹس کا ذخیرہ' },
  { id: 'custom-agents', path: '/custom-agents', nameEn: 'Custom AI Agents', nameUr: 'کسٹم اے آئی ایجنٹس', category: 'business', icon: 'Bot', descriptionEn: 'Build specialized autonomous agents with instructions', descriptionUr: 'اپنی ضروریات کے مطابق خودکار ایجنٹس بنائیں' },
  { id: 'knowledge-base', path: '/knowledge-base', nameEn: 'AI Knowledge Base', nameUr: 'اے آئی علمی بینک', category: 'business', icon: 'Database', descriptionEn: 'Company guidelines and semantic search repository', descriptionUr: 'ذاتی ڈیٹا اور معلومات کا محفوظ بینک' },

  // Projects & User Space (45-52)
  { id: 'projects', path: '/projects', nameEn: 'Projects Dashboard', nameUr: 'پروجیکٹس ڈیش بورڈ', category: 'business', icon: 'FolderKanban', descriptionEn: 'Manage all generated sites, apps, and video projects', descriptionUr: 'اپنے تمام تیار کردہ پراجیکٹس دیکھیں' },
  { id: 'chat-history', path: '/chat-history', nameEn: 'Chat History', nameUr: 'چیٹ ہسٹری', category: 'business', icon: 'History', descriptionEn: 'Search, review, and resume past conversations', descriptionUr: 'گزشتہ تمام گفتگو کا ریکارڈ' },
  { id: 'favorites', path: '/favorites', nameEn: 'Favorites', nameUr: 'پسندیدہ ٹولز و پرامپٹس', category: 'business', icon: 'Star', descriptionEn: 'Quick access to bookmarked prompts, code, and media', descriptionUr: 'بک مارک کیے گئے پرامپٹس اور آئٹمز' },
  { id: 'saved-files', path: '/saved-files', nameEn: 'Saved Files', nameUr: 'محفوظ شدہ فائلیں', category: 'business', icon: 'HardDrive', descriptionEn: 'Cloud storage for your exported HTML, APK, and MP4s', descriptionUr: 'ڈاؤن لوڈ کے لیے تیار تمام فائلیں' },
  { id: 'profile', path: '/profile', nameEn: 'User Profile', nameUr: 'صارف کا پروفائل', category: 'business', icon: 'User', descriptionEn: 'Personal bio, tier status, and connected accounts', descriptionUr: 'ذاتی پروفائل اور اکاؤنٹ کی معلومات' },
  { id: 'settings', path: '/settings', nameEn: 'Account Settings', nameUr: 'اکاؤنٹ کی ترتیبات', category: 'business', icon: 'Settings', descriptionEn: 'Language, dark/light theme, API tokens, privacy wipe', descriptionUr: 'زبان، تھیم، پرائیویسی اور ترتیبات' },
  { id: 'notifications', path: '/notifications', nameEn: 'Notifications', nameUr: 'اطلاعات و الرٹس', category: 'business', icon: 'Bell', descriptionEn: 'Project build alerts, render completion, and news', descriptionUr: 'پروجیکٹس اور سسٹم کے تازہ نوٹیفکیشنز' },
  { id: 'usage-credits', path: '/usage-credits', nameEn: 'Usage and Credits', nameUr: 'استعمال اور کریڈٹس', category: 'business', icon: 'Gauge', descriptionEn: 'Track token consumption, quota bars, and refill', descriptionUr: 'کریڈٹس اور ٹوکنز کا لائیو حساب کتاب' },

  // Commercial, Wallet & Subscriptions (53-56)
  { id: 'wallet', path: '/wallet', nameEn: 'Wallet (Deposit & Withdraw)', nameUr: 'والٹ (ڈپازٹ اور رقم نکلوانا)', category: 'business', icon: 'Wallet', descriptionEn: 'Deposit & withdraw funds via EasyPaisa, JazzCash, Bank, USDT, and manage balances', descriptionUr: 'ایزی پیسہ، جیز کیش، بینک اور کرپٹو سے رقم جمع اور نکالیں', isPopular: true, isNew: true },
  { id: 'earning-hub', path: '/earning-hub', nameEn: 'Zero-Investment Earning Hub', nameUr: 'بغیر سرمایہ کاری آمدنی کا مرکز', category: 'business', icon: 'Coins', descriptionEn: 'Earn money without investment: Google AdSense revenue, 30% lifetime affiliate commissions, daily attendance rewards', descriptionUr: 'بغیر سرمایہ کاری کے گوگل ایڈسینس، 30% ریفرل کمیشن اور روزانہ بونس سے کمائیں', isPopular: true, isNew: true },
  { id: 'pricing', path: '/pricing', nameEn: 'Pricing Plans', nameUr: 'قیمتیں اور پلانز', category: 'business', icon: 'CreditCard', descriptionEn: 'Transparent tiers for creators, developers, and teams', descriptionUr: 'ہر قسم کے کام کے لیے شفاف اور لچکدار منصوبے', isPopular: true },
  { id: 'subscription', path: '/subscription', nameEn: 'Subscription Management', nameUr: 'سبسکرپشن مینجمنٹ', category: 'business', icon: 'ShieldCheck', descriptionEn: 'Invoices, payment methods, and plan upgrades', descriptionUr: 'انوائسز، ادائیگی اور پلان کی تبدیلی' },
  { id: 'admin-payouts', path: '/admin-payouts', nameEn: 'Owner Payouts & Approvals', nameUr: 'ایڈمن پے آؤٹس اور منظوریاں', category: 'admin', icon: 'CheckCircle', descriptionEn: 'Owner console to approve/reject user withdrawals and review AdSense yield', descriptionUr: 'صارفین کی رقوم نکلوانے کی درخواستوں کی منظوری اور کنٹرول', isNew: true },

  // Support & Help (55-58)
  { id: 'help', path: '/help', nameEn: 'Help Center', nameUr: 'ہیلپ سینٹر', category: 'info', icon: 'LifeBuoy', descriptionEn: 'Getting started tutorials, guides, and troubleshooting', descriptionUr: 'رہنمائی اور سوالات کے جوابات' },
  { id: 'contact', path: '/contact', nameEn: 'Contact Us', nameUr: 'ہم سے رابطہ کریں', category: 'info', icon: 'PhoneCall', descriptionEn: 'Get in touch with enterprise support engineers', descriptionUr: 'ٹیم سے براہ راست رابطہ اور معاونت' },
  { id: 'faq', path: '/faq', nameEn: 'Frequently Asked Questions', nameUr: 'عام سوالات و جوابات', category: 'info', icon: 'HelpCircle', descriptionEn: 'Answers to billing, limits, video models, and exports', descriptionUr: 'تمام اہم سوالات کے فوری تسلی بخش جوابات' },
  { id: 'about', path: '/about', nameEn: 'About Zaynoor AI', nameUr: 'زینور اے آئی کے بارے میں', category: 'info', icon: 'Info', descriptionEn: 'Our mission, technology architecture, and team', descriptionUr: 'ہمارا مشن، ٹیکنالوجی اور وژن' },

  // Policies & Legal (59-63)
  { id: 'privacy', path: '/privacy', nameEn: 'Privacy Policy', nameUr: 'پرائیویسی پالیسی', category: 'info', icon: 'Lock', descriptionEn: 'GDPR, CCPA compliance and zero data-selling pledge', descriptionUr: 'ڈیٹا کی مکمل حفاظت اور رازداری کی پالیسی' },
  { id: 'terms', path: '/terms', nameEn: 'Terms of Service', nameUr: 'استعمال کی شرائط', category: 'info', icon: 'FileText', descriptionEn: 'User rights, IP ownership of generated code and media', descriptionUr: 'پلیٹ فارم کے استعمال کے اصول و ضوابط' },
  { id: 'cookie-policy', path: '/cookie-policy', nameEn: 'Cookie Policy', nameUr: 'کوکی پالیسی', category: 'info', icon: 'Cookie', descriptionEn: 'Essential and optional cookie preference settings', descriptionUr: 'کوکیز کا شفاف استعمال اور ترجیحات' },
  { id: 'safety-policy', path: '/safety-policy', nameEn: 'AI Safety & Content Policy', nameUr: 'اے آئی سیفٹی اور مواد پالیسی', category: 'info', icon: 'ShieldAlert', descriptionEn: 'Responsible AI ethics, banned inputs, and guardrails', descriptionUr: 'محفوظ اور ذمہ دارانہ اے آئی کے اصول' },

  // Content & SEO Landing (64-66)
  { id: 'blog', path: '/blog', nameEn: 'Blog Home', nameUr: 'بلاگ کا صفحہ اول', category: 'info', icon: 'Newspaper', descriptionEn: 'Deep-dive articles on generative AI, video, and code', descriptionUr: 'جدید ٹیکنالوجی اور اے آئی پر تحقیقی مضامین' },
  { id: 'blog-article', path: '/blog/post', nameEn: 'Featured Blog Article', nameUr: 'نمایاں بلاگ مضمون', category: 'info', icon: 'BookMarked', descriptionEn: 'Read complete long-form guide with diagrams', descriptionUr: 'تفصیلی مضمون اور عملی گائیڈ' },
  { id: 'seo-landing', path: '/seo-landing', nameEn: 'SEO Solutions Hub', nameUr: 'ایس ای او حل مرکز', category: 'optimization', icon: 'Target', descriptionEn: 'High-intent search landing pages for niche industries', descriptionUr: 'مختلف صنعتوں کے لیے مخصوص حل' },

  // Admin & Governance (67-72)
  { id: 'admin', path: '/admin', nameEn: 'Admin Dashboard', nameUr: 'ایڈمن ڈیش بورڈ', category: 'admin', icon: 'LayoutDashboard', descriptionEn: 'Platform telemetry, server health, and revenue stats', descriptionUr: 'پلیٹ فارم کا مرکزی انتظامی کنٹرول' },
  { id: 'admin-users', path: '/admin/users', nameEn: 'User Management', nameUr: 'صارفین کی انتظامیہ', category: 'admin', icon: 'Users', descriptionEn: 'Role-based access, bans, and credit allocation', descriptionUr: 'تمام صارفین اور ان کے حقوق کی تنظیم' },
  { id: 'admin-providers', path: '/admin/providers', nameEn: 'AI Provider Settings', nameUr: 'اے آئی پرووائیڈر ترتیبات', category: 'admin', icon: 'SlidersHorizontal', descriptionEn: 'Configure Gemini API keys and provider failovers', descriptionUr: 'جیمینائی اور دیگر اے آئی کنکشنز کی ترتیبات' },
  { id: 'admin-ads', path: '/admin/ads', nameEn: 'Advertisement Management', nameUr: 'اشتہارات کی انتظامیہ', category: 'admin', icon: 'BadgeDollarSign', descriptionEn: 'Google AdSense publisher ID, unit toggles, ads.txt sync', descriptionUr: 'گوگل ایڈسینس پبلشر آئی ڈی اور اشتہارات کی جگہ' },
  { id: 'admin-seo', path: '/admin/seo', nameEn: 'SEO Management', nameUr: 'ایس ای او مینجمنٹ', category: 'admin', icon: 'Search', descriptionEn: 'XML sitemap generator, robots.txt, canonical rules', descriptionUr: 'ایکس ایم ایل سائٹ میپ اور سرچ انجن انڈیکسنگ' },
  { id: 'admin-analytics', path: '/admin/analytics', nameEn: 'Analytics and Reports', nameUr: 'تجزیات اور رپورٹس', category: 'admin', icon: 'TrendingUp', descriptionEn: 'User acquisition, tool engagement, latency graphs', descriptionUr: 'ٹریفک، استعمال اور کارکردگی کے گراف' },

  // SEO / GEO / AEO / EAO Optimization Suite (73)
  { id: 'seo-audit', path: '/seo-audit', nameEn: 'SEO, GEO, AEO & EAO Suite', nameUr: 'جامع سرچ و اینسر انجن آپٹیمائزیشن', category: 'optimization', icon: 'SearchCheck', descriptionEn: 'Audit content for Generative Engines, Answer Engines, and EAO Brand consistency', descriptionUr: 'اے آئی سرچ، اینسر انجنز اور برانڈ کوالٹی کی جانچ', isPopular: true, isNew: true },
];

export const CATEGORIES = [
  { id: 'all', nameEn: 'All Tools (70+)', nameUr: 'تمام ٹولز (70+)' },
  { id: 'core', nameEn: 'Core AI & Text', nameUr: 'بنیادی اے آئی و تحریر' },
  { id: 'creation', nameEn: 'Creative & Media', nameUr: 'تخلیقی میڈیا اور ویڈیو' },
  { id: 'dev', nameEn: 'Code & Web Builders', nameUr: 'ویب و ایپ بلڈرز' },
  { id: 'business', nameEn: 'Data & Productivity', nameUr: 'ڈیٹا اور بزنس' },
  { id: 'optimization', nameEn: 'SEO & Optimization', nameUr: 'ایس ای او اور بہتری' },
  { id: 'admin', nameEn: 'Admin & Governance', nameUr: 'ایڈمن اور کنٹرول' },
  { id: 'info', nameEn: 'About & Policies', nameUr: 'پالیسیاں اور معلومات' },
];
