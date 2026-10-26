import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_ROUTES } from '../../data/routesData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  schemaType?: 'SoftwareApplication' | 'Article' | 'FAQPage' | 'Organization';
  faqItems?: Array<{ question: string; answer: string }>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  schemaType = 'SoftwareApplication',
  faqItems,
}) => {
  const { currentRoute, language } = useApp();
  const routeData = ALL_ROUTES.find((r) => r.id === currentRoute);

  const pageTitle = title || (routeData ? (language === 'ur' ? routeData.nameUr : routeData.nameEn) : 'Zaynoor AI Premium');
  const fullTitle = `${pageTitle} | Zaynoor AI`;
  const metaDesc = description || (routeData ? (language === 'ur' ? routeData.descriptionUr : routeData.descriptionEn) : 'Production-grade AI ecosystem with 70+ AI tools, web and Android builder, long-form video studio, and Vercel deployment.');
  const canonicalUrl = `https://zaynoor.ai/${currentRoute === 'home' ? '' : currentRoute}`;

  useEffect(() => {
    document.title = fullTitle;

    // Update meta description
    let metaDescriptionEl = document.querySelector('meta[name="description"]');
    if (!metaDescriptionEl) {
      metaDescriptionEl = document.createElement('meta');
      metaDescriptionEl.setAttribute('name', 'description');
      document.head.appendChild(metaDescriptionEl);
    }
    metaDescriptionEl.setAttribute('content', metaDesc);

    // Update og tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', metaDesc);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Inject Schema.org JSON-LD structured data
    let scriptTag = document.getElementById('json-ld-seo') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-seo';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    let schemaData: any = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      'name': fullTitle,
      'description': metaDesc,
      'url': canonicalUrl,
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Web, Android',
      'offers': {
        '@type': 'Offer',
        'price': '0.00',
        'priceCurrency': 'USD',
      },
    };

    if (faqItems && faqItems.length > 0) {
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqItems.map((item) => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer,
          },
        })),
      };
    }

    scriptTag.textContent = JSON.stringify(schemaData);
  }, [fullTitle, metaDesc, canonicalUrl, schemaType, faqItems]);

  return null;
};
