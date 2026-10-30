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

    let schemaData: any;

    if (schemaType === 'Organization') {
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Zaynoor AI Inc.',
        'url': 'https://zaynoor.ai',
        'logo': 'https://zaynoor.ai/icon-512.svg',
        'description': metaDesc,
        'sameAs': [
          'https://twitter.com/zaynoor_ai',
          'https://github.com/mobigags-commits/Zaynoor-AI',
          'https://linkedin.com/company/zaynoor-ai'
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'contactType': 'customer support',
          'email': 'support@zaynoor.ai',
          'availableLanguage': ['English', 'Urdu']
        }
      };
    } else if (faqItems && faqItems.length > 0) {
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
    } else {
      schemaData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            'name': fullTitle,
            'description': metaDesc,
            'url': canonicalUrl,
            'applicationCategory': 'DeveloperApplication',
            'operatingSystem': 'Web, Android',
            'inLanguage': ['en', 'ur'],
            'offers': {
              '@type': 'Offer',
              'price': '0.00',
              'priceCurrency': 'USD',
            },
          },
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://zaynoor.ai/'
              },
              ...(currentRoute !== 'home' ? [{
                '@type': 'ListItem',
                'position': 2,
                'name': pageTitle,
                'item': canonicalUrl
              }] : [])
            ]
          }
        ]
      };
    }

    scriptTag.textContent = JSON.stringify(schemaData);
  }, [fullTitle, metaDesc, canonicalUrl, schemaType, faqItems, currentRoute, pageTitle]);

  return null;
};
