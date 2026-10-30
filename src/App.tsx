import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/layout/CommandPalette';
import { CookieConsent } from './components/layout/CookieConsent';

// Pages
import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import { ExploreToolsPage } from './pages/ExploreToolsPage';
import { WebsiteBuilderPage } from './pages/WebsiteBuilderPage';
import { AppBuilderPage } from './pages/AppBuilderPage';
import { LongVideoStudioPage } from './pages/LongVideoStudioPage';
import { VercelDeployPage } from './pages/VercelDeployPage';
import { SEOAuditPage } from './pages/SEOAuditPage';
import { AdminAdsPage } from './pages/AdminAdsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PricingPage } from './pages/PricingPage';
import { BlogPage } from './pages/BlogPage';
import { FAQPage, ContactPage, LegalPolicyPage } from './pages/InfoAndPolicyPages';
import { ToolEnginePage } from './pages/ToolEnginePage';
import { WalletPage } from './pages/WalletPage';
import { EarningHubPage } from './pages/EarningHubPage';
import { AdminPayoutsPage } from './pages/AdminPayoutsPage';
import { AboutPage } from './pages/AboutPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { SecuritySettingsPage } from './pages/SecuritySettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ALL_ROUTES } from './data/routesData';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderRoute = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'chat':
        return <ChatPage />;
      case 'explore-tools':
        return <ExploreToolsPage />;
      case 'website-builder':
        return <WebsiteBuilderPage />;
      case 'app-builder':
        return <AppBuilderPage />;
      case 'long-video-studio':
        return <LongVideoStudioPage />;
      case 'vercel-deploy':
        return <VercelDeployPage />;
      case 'seo-audit':
        return <SEOAuditPage />;
      case 'admin-ads':
        return <AdminAdsPage />;
      case 'admin':
      case 'admin-users':
      case 'admin-providers':
      case 'admin-seo':
      case 'admin-analytics':
        return <AdminDashboardPage />;
      case 'pricing':
      case 'subscription':
        return <PricingPage />;
      case 'blog':
      case 'blog-article':
        return <BlogPage />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'help':
        return <HelpCenterPage />;
      case 'privacy':
        return <LegalPolicyPage type="privacy" />;
      case 'terms':
        return <LegalPolicyPage type="terms" />;
      case 'cookie-policy':
        return <LegalPolicyPage type="cookie" />;
      case 'safety-policy':
        return <LegalPolicyPage type="safety" />;
      case 'disclaimer':
        return <LegalPolicyPage type="disclaimer" />;
      case 'wallet':
        return <WalletPage />;
      case 'earning-hub':
        return <EarningHubPage />;
      case 'admin-payouts':
        return <AdminPayoutsPage />;
      case 'projects':
      case 'dashboard':
        return <UserDashboardPage />;
      case 'settings':
      case 'security':
        return <SecuritySettingsPage />;
      case '404':
        return <NotFoundPage />;
      default: {
        // If route exists in our registered 70+ tools, render ToolEnginePage
        const exists = ALL_ROUTES.some((r) => r.id === currentRoute);
        if (exists) {
          return <ToolEnginePage />;
        }
        return <NotFoundPage />;
      }
    }
  };

  const isHome = currentRoute === 'home';

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased font-sans">
      <Navbar />

      <div className="flex-1 flex w-full">
        {/* On non-home pages, show the persistent quick-switching sidebar */}
        {!isHome && <Sidebar />}

        <main className="flex-1 flex flex-col min-w-0">
          {renderRoute()}
        </main>
      </div>

      <Footer />
      <CommandPalette />
      <CookieConsent />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
