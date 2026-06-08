import { createClient } from '@sanity/client';
import fs from 'fs';

// Initialize the client. The token should have write permissions.
const client = createClient({
  projectId: '0mihymp4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-10',
  token: 'skEUUouBHXZZCNsusShv9uFnkIwnnGv3B7834qI9prDG8l0MrgUB44rozPHYVKRD6kdQ2lELTGEhOJobd6sxMfGe8a81BpJpWH09fLyjEGBHFX6z8COfPsM9zslJPmytIRbzddDk2P5apcmgaZo94mb87DSLeHl1tHfjfkRjRrxPgXWFFMi0',
});

async function run() {
  try {
    console.log("Fetching home-page...");
    const homePage = await client.getDocument('home-page');
    if (!homePage) {
      console.log("home-page document not found!");
      return;
    }

    const sections = homePage.sections || [];

    // Filter out old values, faq, whyItMatters if they exist
    const updatedSections = sections.filter(s => s._type !== 'values' && s._type !== 'faq' && s._type !== 'whyItMatters');

    console.log("Adding new sections without em dashes...");
    
    // Create new Values block
    const valuesSection = {
      _type: 'values',
      _key: 'values-' + Date.now(),
      sectionLabel: 'Our Approach',
      preTitle: { en: 'Our Approach' },
      heading: { en: 'Built for Lead Generation' },
      headingTag: 'h2',
      subtext: {
        en: [
          {
            _type: 'block',
            _key: 'values-sub-1',
            style: 'normal',
            children: [{ _type: 'span', _key: 'values-sub-1-1', text: 'We understand that your website isn\'t an art project. It\'s a sales tool. We map every section directly to conversion and search engine dominance.' }]
          }
        ]
      },
      cards: [
        {
          _key: 'card-1',
          tag: { en: 'Trust' },
          icon: 'Target',
          title: { en: 'Data-Driven Trust' },
          description: {
            en: [{ _type: 'block', _key: 'card-1-desc', style: 'normal', children: [{ _type: 'span', _key: 'card-1-desc-1', text: 'We replace generic layouts with high-converting, tested funnels. Every element is tested to turn your traffic into verified leads.' }] }]
          }
        },
        {
          _key: 'card-2',
          tag: { en: 'Technical SEO' },
          icon: 'Search',
          title: { en: 'Search Foundation' },
          description: {
            en: [{ _type: 'block', _key: 'card-2-desc', style: 'normal', children: [{ _type: 'span', _key: 'card-2-desc-1', text: 'Secure certificates and lightning-fast load times. We build the foundation Google demands.' }] }]
          }
        },
        {
          _key: 'card-3',
          tag: { en: 'AI Optimized' },
          icon: 'Bot',
          title: { en: 'Generative Readiness' },
          description: {
            en: [{ _type: 'block', _key: 'card-3-desc', style: 'normal', children: [{ _type: 'span', _key: 'card-3-desc-1', text: 'Answer-first architecture. We format your content so generative AI engines recommend you first.' }] }]
          }
        }
      ]
    };

    // Create new FAQ block
    const faqSection = {
      _type: 'faq',
      _key: 'faq-' + Date.now(),
      sectionLabel: 'FAQ',
      preTitle: { en: 'Questions' },
      heading: { en: 'Frequently Asked Questions' },
      subtext: {
        en: [{ _type: 'block', _key: 'faq-sub', style: 'normal', children: [{ _type: 'span', _key: 'faq-sub-1', text: 'Straight answers about our process.' }] }]
      },
      questions: [
        {
          _key: 'q-1',
          question: { en: 'How fast can you build a site?' },
          answer: {
            en: [{ _type: 'block', _key: 'a-1', style: 'normal', children: [{ _type: 'span', _key: 'a-1-1', text: 'We typically launch standard service sites within two weeks.' }] }]
          }
        },
        {
          _key: 'q-2',
          question: { en: 'Do you guarantee leads?' },
          answer: {
            en: [{ _type: 'block', _key: 'a-2', style: 'normal', children: [{ _type: 'span', _key: 'a-2-1', text: 'We guarantee an optimized conversion foundation, but market demand dictates volume.' }] }]
          }
        }
      ]
    };

    // Create new Why It Matters block
    const whyItMattersSection = {
      _type: 'whyItMatters',
      _key: 'whyItMatters-' + Date.now(),
      sectionLabel: 'Why It Matters',
      preTitle: { en: 'Comparison' },
      heading: { en: 'Why It Matters' },
      subtext: {
        en: [{ _type: 'block', _key: 'why-sub', style: 'normal', children: [{ _type: 'span', _key: 'why-sub-1', text: 'See the difference between standard development and Velvet Logic.' }] }]
      },
      comparisons: [
        {
          _key: 'comp-1',
          pillar: { en: 'Conversion' },
          oldWay: { en: 'Hidden phone numbers and broken forms.' },
          ourWay: { en: 'Sticky mobile CTA bars and optimized lead capture.' }
        },
        {
          _key: 'comp-2',
          pillar: { en: 'Technical SEO' },
          oldWay: { en: 'Slow load times and missing tags.' },
          ourWay: { en: 'Sub-second load times with pristine Schema markup.' }
        }
      ]
    };

    // Insert these sections in the correct order (after process, before testimonials)
    // We'll just push them and maybe re-order later, or insert at specific index.
    const finalSections = [];
    for (const s of updatedSections) {
      if (s._type === 'testimonials') {
        finalSections.push(whyItMattersSection);
        finalSections.push(valuesSection);
      }
      if (s._type === 'contact') {
        finalSections.push(faqSection);
      }
      finalSections.push(s);
    }

    console.log("Patching home-page...");
    await client
      .patch('home-page')
      .set({ sections: finalSections })
      .commit();

    console.log("Successfully migrated Sections!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

run();
