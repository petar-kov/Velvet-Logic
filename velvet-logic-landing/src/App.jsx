import React, { useState, useEffect } from 'react';
import { client, urlFor } from './sanity';
import { VisualEditing } from '@sanity/visual-editing/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { l } from './components/shared/SharedComponents';

// Blocks
import HeroBlock from './components/blocks/HeroBlock';
import ProcessBlock from './components/blocks/ProcessBlock';
import ValuesBlock from './components/blocks/ValuesBlock';
import WhyItMattersBlock from './components/blocks/WhyItMattersBlock';
import DesignPhilosophyBlock from './components/blocks/DesignPhilosophyBlock';
import TestimonialsBlock from './components/blocks/TestimonialsBlock';
import FaqBlock from './components/blocks/FaqBlock';
import ContactBlock from './components/blocks/ContactBlock';

// Shared
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

// Detect if we are in preview mode via URL parameter (same as client)
const isPreview = typeof window !== 'undefined' && window.location.search.includes('preview=true');

export default function App() {
  const [sanityData, setSanityData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = `*[_id in ["home-page", "drafts.home-page", "navigation", "settings", "footer"]] {
      _id,
      _type,
      ...
    }`;

    client.fetch(query).then(data => {
      // Prioritize draft over published if in preview
      const homePageDocs = data.filter(d => d._type === 'homePage');
      const homePage = homePageDocs.find(d => d._id === 'drafts.home-page') || homePageDocs.find(d => d._id === 'home-page');
      
      const navigation = data.find(d => d._type === 'navigation');
      const settings = data.find(d => d._type === 'settings');
      const footer = data.find(d => d._type === 'footer');

      setSanityData({ homePage, navigation, settings, footer });
    }).catch(err => {
      console.error(err);
      setError(err.message || 'Unknown Sanity Error');
    });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-mercury flex flex-col items-center justify-center font-body text-navy p-6">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Failed to connect to Sanity CMS</h1>
        <p className="bg-white p-4 rounded-lg shadow font-mono text-sm">{error}</p>
      </div>
    );
  }

  if (!sanityData) {
    return <div className="min-h-screen bg-mercury flex items-center justify-center font-heading text-navy font-bold">Loading...</div>;
  }

  const { homePage, navigation, settings, footer } = sanityData;

  const canonicalUrl = "https://velvetlogicagency.com";
  
  // SEO logic: Prefer homePage.seo, fallback to global settings
  const seoTitle = l(homePage?.seo?.metaTitle) || l(settings?.siteTitle) || "Velvet Logic | High-Performance Websites for the Trades";
  const seoDescription = l(homePage?.seo?.metaDescription) || l(settings?.seoDesc) || "We build high-converting, lightning-fast websites for roofing, plumbing, HVAC, electrical, and manufacturing businesses. Stop leaking leads and dominate local search.";
  const keywords = l(homePage?.seo?.keywords);
  
  // Images
  const faviconUrl = settings?.favicon?.asset ? urlFor(settings.favicon).width(32).height(32).url() : "/favicon.svg";
  const seoOgImage = homePage?.seo?.ogImage || settings?.ogImage;
  const ogImageUrl = seoOgImage?.asset ? urlFor(seoOgImage).width(1200).height(630).url() : "";

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Velvet Logic",
        "url": canonicalUrl,
        "description": seoDescription,
        "logo": faviconUrl,
        ...(ogImageUrl && { "image": ogImageUrl })
      }
    ]
  };

  // Find FAQ block for JSON-LD if it exists in the pageBuilder array
  const faqBlock = homePage?.pageBuilder?.find(b => b._type === 'faq');
  if (faqBlock && faqBlock.questions?.length > 0) {
    jsonLdData["@graph"].push({
      "@type": "FAQPage",
      "mainEntity": faqBlock.questions.map(q => ({
        "@type": "Question",
        "name": l(q.question),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": l(q.answer)
        }
      }))
    });
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href={faviconUrl} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </script>
      </Helmet>
      
      <div className="bg-mercury text-slate min-h-screen font-body antialiased selection:bg-orange/20 selection:text-orange">
        <Navbar data={navigation} settings={settings} />

        {homePage?.pageBuilder?.map((block) => {
          switch(block._type) {
            case 'hero': return <HeroBlock key={block._key} data={{...block, backgroundImage: block.backgroundImage || settings?.defaultHeroImage}} />;
            case 'process': return <ProcessBlock key={block._key} data={block} />;
            case 'values': return <ValuesBlock key={block._key} data={block} />;
            case 'whyItMatters': 
              return (
                <React.Fragment key={block._key}>
                  <WhyItMattersBlock data={block} />
                  <DesignPhilosophyBlock data={{}} />
                </React.Fragment>
              );
            case 'siteAuditor': return null;
            case 'testimonials': return null;
            case 'faq': return <FaqBlock key={block._key} data={block} />;
            case 'contact': return <ContactBlock key={block._key} data={block} />;
            default: return <div key={block._key} className="py-20 text-center text-red-500">Unknown block type: {block._type}</div>;
          }
        })}
        
        <Footer data={footer} settings={settings} />
        
        {isPreview && <VisualEditing />}
      </div>
    </HelmetProvider>
  );
}
