import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '0mihymp4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-10',
  token: 'skEUUouBHXZZCNsusShv9uFnkIwnnGv3B7834qI9prDG8l0MrgUB44rozPHYVKRD6kdQ2lELTGEhOJobd6sxMfGe8a81BpJpWH09fLyjEGBHFX6z8COfPsM9zslJPmytIRbzddDk2P5apcmgaZo94mb87DSLeHl1tHfjfkRjRrxPgXWFFMi0',
});

async function run() {
  console.log("Fetching home-page...");
  const homePage = await client.getDocument('home-page');
  
  if (!homePage) {
    console.log("home-page document not found!");
    return;
  }

  const sections = homePage.sections || [];
  
  // Create block content helper
  const toBlock = (text) => [{
    _type: 'block',
    _key: Math.random().toString(36).substring(7),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).substring(7), marks: [], text }]
  }];

  // Replace each section with the new problem-based copy
  const updatedSections = sections.map(section => {
    if (section._type === 'hero') {
      return {
        ...section,
        preTitle: { en: "Stop Bleeding Revenue" },
        titlePart1: { en: "Your website is leaking " },
        titleVelvet: { en: "leads" },
        titlePart2: { en: " to your " },
        titleLogic: { en: "competitors." },
        description: { en: toBlock("A three-second load delay kills 50% of your traffic. We build high-converting funnels that stop the leak and dominate local search.") },
        btnStartText: { en: "Stop The Leak" }
      };
    }
    
    if (section._type === 'process') {
      return {
        ...section,
        tag: { en: "The Problems We Fix" },
        head: { en: "Stop Losing Jobs To " },
        headSpan: { en: "Bad UX" },
        headEnd: { en: "" },
        description: { en: toBlock("Every broken link, hidden phone number, and slow page load is a job handed directly to your competitor.") },
        steps: [
          {
            _type: 'processStep',
            _key: Math.random().toString(36).substring(7),
            title: { en: "Missing CTAs = Lost Calls" },
            description: { en: toBlock("If a customer has to hunt for your phone number, they will call someone else. We build sticky mobile CTA bars and optimized lead capture forms that force conversions.") },
            icon: "PhoneOff"
          },
          {
            _type: 'processStep',
            _key: Math.random().toString(36).substring(7),
            title: { en: "Slow Load Times = High Bounce Rate" },
            description: { en: toBlock("A three-second load delay kills 50% of your traffic. We engineer sub-second load times and pristine technical SEO to keep prospects engaged.") },
            icon: "Hourglass"
          },
          {
            _type: 'processStep',
            _key: Math.random().toString(36).substring(7),
            title: { en: "Invisible to AI = Irrelevant" },
            description: { en: toBlock("If your site isn't structured with pristine Schema markup, you don't exist to modern generative search engines. We build answer-first architecture.") },
            icon: "Bot"
          },
          {
            _type: 'processStep',
            _key: Math.random().toString(36).substring(7),
            title: { en: "Ad Spend Bleed" },
            description: { en: toBlock("You are spending thousands on Google Ads only to send traffic to a generic homepage. We build targeted landing pages that convert paid traffic into booked jobs.") },
            icon: "TrendingDown"
          }
        ]
      };
    }

    if (section._type === 'values') {
      return {
        ...section,
        preTitle: { en: "Audit Methodology" },
        heading: { en: "Data-Driven Diagnostics" },
        subtext: { en: toBlock("We don't guess. We scan your digital footprint to identify exactly where your funnel is broken and how much it's costing you.") },
        cards: [
          {
            _type: 'valueCard',
            _key: Math.random().toString(36).substring(7),
            tag: { en: "Discovery" },
            title: { en: "Identifying the Bleed" },
            description: { en: toBlock("We run a comprehensive audit across 40+ technical metrics to find exactly where you are losing prospects.") }
          },
          {
            _type: 'valueCard',
            _key: Math.random().toString(36).substring(7),
            tag: { en: "Strategy" },
            title: { en: "Conversion Mapping" },
            description: { en: toBlock("We map out a high-converting user journey designed specifically for your trade to maximize lead capture.") }
          },
          {
            _type: 'valueCard',
            _key: Math.random().toString(36).substring(7),
            tag: { en: "Execution" },
            title: { en: "The Velvet Logic Fix" },
            description: { en: toBlock("We deploy industrial-grade web architecture that solves the root problems and scales with your business.") }
          }
        ]
      };
    }

    if (section._type === 'whyItMatters') {
      return {
        ...section,
        preTitle: { en: "The Cost of Inaction" },
        heading: { en: "Why Standard Sites Fail" },
        subtext: { en: toBlock("See exactly where your current website is losing you money, and how Velvet Logic fixes it.") },
        comparisons: [
          {
            _type: 'comparisonItem',
            _key: Math.random().toString(36).substring(7),
            pillar: { en: "Lead Capture" },
            oldWay: { en: "Hidden phone numbers and broken contact forms." },
            ourWay: { en: "Sticky mobile CTA bars and optimized lead funnels." }
          },
          {
            _type: 'comparisonItem',
            _key: Math.random().toString(36).substring(7),
            pillar: { en: "Technical SEO" },
            oldWay: { en: "Slow load times and missing H1 tags." },
            ourWay: { en: "Sub-second load times with pristine Schema markup." }
          },
          {
            _type: 'comparisonItem',
            _key: Math.random().toString(36).substring(7),
            pillar: { en: "AI Readiness" },
            oldWay: { en: "Buried answers and generic text blocks." },
            ourWay: { en: "Answer-first architecture ready for AI search engines." }
          },
          {
            _type: 'comparisonItem',
            _key: Math.random().toString(36).substring(7),
            pillar: { en: "Analytics" },
            oldWay: { en: "Guessing what visitors are actually doing." },
            ourWay: { en: "Precision tracking on every button and form submission." }
          },
          {
            _type: 'comparisonItem',
            _key: Math.random().toString(36).substring(7),
            pillar: { en: "Security" },
            oldWay: { en: "Outdated plugins and missing SSL certificates." },
            ourWay: { en: "Enterprise-grade protection and ADA compliance." }
          },
          {
            _type: 'comparisonItem',
            _key: Math.random().toString(36).substring(7),
            pillar: { en: "Ownership" },
            oldWay: { en: "Held hostage by proprietary agency platforms." },
            ourWay: { en: "100% ownership of your code, content, and domain." }
          }
        ]
      };
    }

    if (section._type === 'faq') {
      return {
        ...section,
        preTitle: { en: "Questions" },
        heading: { en: "Common Questions" },
        subtext: { en: toBlock("Everything you need to know about stopping the leak.") },
        questions: [
          {
            _type: 'faqItem',
            _key: Math.random().toString(36).substring(7),
            question: { en: "How fast can you build a site?" },
            answer: { en: "We typically launch standard service sites within two weeks." }
          },
          {
            _type: 'faqItem',
            _key: Math.random().toString(36).substring(7),
            question: { en: "Do you guarantee leads?" },
            answer: { en: "We guarantee an optimized conversion foundation, but market demand dictates volume." }
          },
          {
            _type: 'faqItem',
            _key: Math.random().toString(36).substring(7),
            question: { en: "How do I know if my site is leaking leads?" },
            answer: { en: "If your site takes more than 3 seconds to load, lacks a sticky mobile click-to-call button, or doesn't have local schema markup, you are losing leads to competitors." }
          },
          {
            _type: 'faqItem',
            _key: Math.random().toString(36).substring(7),
            question: { en: "Do you work with generic templates?" },
            answer: { en: "No. We build custom, high-performance architectures specifically designed for lead capture in the trades and industrial sectors." }
          },
          {
            _type: 'faqItem',
            _key: Math.random().toString(36).substring(7),
            question: { en: "What happens after the audit?" },
            answer: { en: "We provide a completely free, no-obligation technical report. If you choose to hire us, we implement the fixes to plug the leaks." }
          }
        ]
      };
    }

    return section;
  });

  console.log("Updating home-page with full problem-based copy overhaul...");
  try {
    await client.patch('home-page').set({ sections: updatedSections }).commit();
    console.log("Successfully migrated Sections!");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

run();
