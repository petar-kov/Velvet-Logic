async function scrapePage(url) {
  const { default: puppeteer } = await import('puppeteer');

  if (!url.startsWith('http')) {
    url = 'https://' + url;
  }
  
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const type = req.resourceType();
    if (['image', 'font', 'media'].includes(type)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  const isHttps = url.startsWith('https');

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  } catch (err) {
    console.error('Puppeteer navigation error', err);
  }

  const data = await page.evaluate(() => {
    // C1: Conversion & Trust
    const hasTelLink = !!document.querySelector('a[href^="tel:"]');
    
    const heroElements = document.querySelectorAll('header a, header button, section:first-of-type a, section:first-of-type button');
    let hasHeroAction = false;
    const ctaKeywords = ['estimate', 'quote', 'call', 'booking', 'book', 'schedule', 'contact'];
    heroElements.forEach(el => {
      const text = el.innerText.toLowerCase();
      if (ctaKeywords.some(kw => text.includes(kw))) {
        hasHeroAction = true;
      }
    });

    const hasForm = !!document.querySelector('form');
    
    const footerText = (document.querySelector('footer') || document.body).innerText.toLowerCase();
    const yearMatch = footerText.match(/202[0-5]/);
    const hasOutdatedYear = !!yearMatch;

    const chatFrameworks = ['intercom', 'drift', 'tawk.to', 'zendesk', 'crisp', 'tidio', 'hubspot', 'gorgias', 'livechat'];
    const scripts = Array.from(document.querySelectorAll('script')).map(s => (s.src + s.innerText).toLowerCase());
    const hasChatWidget = scripts.some(src => chatFrameworks.some(fw => src.includes(fw)));

    // C2: Local SEO & Technical Health
    const allHeaders = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let hasHeaderHierarchyError = false;
    let currentLevel = 0;
    allHeaders.forEach(header => {
      const level = parseInt(header.tagName.substring(1), 10);
      if (currentLevel !== 0 && level > currentLevel + 1) {
        hasHeaderHierarchyError = true;
      }
      currentLevel = level;
    });

    const h1s = document.querySelectorAll('h1');
    const hasOneH1 = h1s.length === 1;
    let hasValidH1 = false;
    let h1ErrorType = null;
    
    if (h1s.length === 0) {
      h1ErrorType = 'missing';
    } else if (h1s.length > 1) {
      h1ErrorType = 'multiple';
    } else {
      const h1Text = h1s[0].innerText.trim();
      if (h1Text.length < 5) {
        h1ErrorType = 'empty';
      } else {
        hasValidH1 = true;
      }
    }

    const title = document.title;
    const hasValidTitle = title && title.trim().length > 0 && title.length <= 60;

    const hasMetaDescription = !!document.querySelector('meta[name="description"]');

    const schemaTags = document.querySelectorAll('script[type="application/ld+json"]');
    let hasSchemaData = false;
    let hasStackedSchema = false;
    schemaTags.forEach(tag => {
      const content = tag.innerText.toLowerCase();
      if (content.includes('schema.org') && (content.includes('localbusiness') || content.includes('roofingcontractor') || content.includes('plumbingservice') || content.includes('electrician'))) {
        hasSchemaData = true;
      }
      // Check for stacked schemas for GEO
      if (content.includes('schema.org') && (content.includes('faqpage') || content.includes('article') || content.includes('organization'))) {
        hasStackedSchema = true;
      }
    });

    // C3: AI Search Readiness (GEO/AEO)
    const hasScannableListsOrTables = !!document.querySelector('ul, table');
    
    const h2h3s = document.querySelectorAll('h2, h3');
    let hasConversationalHeadings = false;
    const conversationalWords = ['how', 'what', 'why', 'cost', 'when', 'where', 'guide'];
    h2h3s.forEach(h => {
      const text = h.innerText.toLowerCase();
      if (conversationalWords.some(w => text.includes(w))) {
        hasConversationalHeadings = true;
      }
    });

    // Check for "Answer Nugget"
    let hasAnswerNugget = false;
    const firstH1 = document.querySelector('h1');
    if (firstH1) {
      let nextElement = firstH1.nextElementSibling;
      while (nextElement && !['P', 'DIV', 'SPAN', 'H2', 'H3'].includes(nextElement.tagName)) {
        nextElement = nextElement.nextElementSibling;
      }
      if (nextElement && nextElement.tagName === 'P') {
        const wordCount = nextElement.innerText.trim().split(/\s+/).length;
        if (wordCount >= 10 && wordCount <= 80) {
          hasAnswerNugget = true;
        }
      }
    }

    // Check for external citations
    const allLinks = document.querySelectorAll('a');
    let externalCitationCount = 0;
    allLinks.forEach(a => {
      const href = a.href.toLowerCase();
      // Simple heuristic: if it starts with http and doesn't contain current domain
      if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        externalCitationCount++;
      }
    });
    const hasExternalCitations = externalCitationCount >= 1;

    // C4: Compliance
    let hasComplianceLinks = false;
    allLinks.forEach(a => {
      const text = a.innerText.toLowerCase();
      if (text.includes('privacy') || text.includes('terms')) {
        hasComplianceLinks = true;
      }
    });

    const images = document.querySelectorAll('img');
    let hasImagesWithoutAlt = false;
    images.forEach(img => {
      if (!img.hasAttribute('alt') || img.getAttribute('alt').trim() === '') {
        hasImagesWithoutAlt = true;
      }
    });

    return {
      hasTelLink,
      hasHeroAction,
      hasForm,
      hasOutdatedYear,
      hasChatWidget,
      hasHeaderHierarchyError,
      hasValidH1,
      h1ErrorType,
      hasValidTitle,
      hasMetaDescription,
      hasSchemaData,
      hasStackedSchema,
      hasScannableListsOrTables,
      hasConversationalHeadings,
      hasAnswerNugget,
      hasExternalCitations,
      hasComplianceLinks,
      hasImagesWithoutAlt
    };
  });

  await browser.close();
  
  return {
    url,
    isHttps,
    ...data
  };
}

module.exports = { scrapePage };
