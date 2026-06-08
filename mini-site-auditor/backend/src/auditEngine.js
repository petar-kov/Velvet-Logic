const { scrapePage } = require('./scraper');

const IMPACT_MAP = {
  conversion: '[Impact: High Customer Churn] Your website is actively leaking mobile leads who want to book immediately but face technical friction.',
  seo: '[Impact: Invisible on Google Maps] Competitors are intercepting your organic local search traffic because your site metadata is hidden from search crawlers.',
  geo_aeo: '[Impact: Blocked by AI Search Engines] Next-generation AI models (ChatGPT, Gemini) will skip over your business when local homeowners use prompts to find recommendations.',
  compliance: '[Impact: Legal & Ad Platform Vulnerability] Lacking standard baseline compliance documentation exposes your business to ad account suspensions and predatory legal risks.'
};

async function auditEngine(url) {
  const data = await scrapePage(url);
  
  let scores = {
    conversion: 25,
    seo: 25,
    geo_aeo: 25,
    compliance: 25
  };
  
  const deductions = {
    conversion: [],
    seo: [],
    geo_aeo: [],
    compliance: []
  };

  // Category 1: Conversion & Trust (Max 25)
  if (!data.hasTelLink) {
    scores.conversion -= 5;
    deductions.conversion.push('Missing clickable tel: link for phone numbers (-5 pts)');
  }
  if (!data.hasHeroAction) {
    scores.conversion -= 5;
    deductions.conversion.push('Primary hero section lacks a clear action button (-5 pts)');
  }
  if (!data.hasForm) {
    scores.conversion -= 5;
    deductions.conversion.push('No interactive <form> element present for capturing leads (-5 pts)');
  }
  if (data.hasOutdatedYear) {
    scores.conversion -= 5;
    deductions.conversion.push('Copyright text in footer contains an outdated year (-5 pts)');
  }
  if (!data.hasChatWidget) {
    scores.conversion -= 5;
    deductions.conversion.push('No active embedded scripts or widgets for live chat/SMS (-5 pts)');
  }

  // Category 2: Local SEO & Technical Health (Max 25)
  if (!data.isHttps) {
    scores.seo -= 4;
    deductions.seo.push('Site protocol is not secure (HTTP instead of HTTPS) (-4 pts)');
  }
  if (!data.hasValidH1) {
    scores.seo -= 4;
    deductions.seo.push('Missing exactly one <h1> tag or lacks regional stop-words/trade keywords (-4 pts)');
  }
  if (!data.hasValidTitle) {
    scores.seo -= 4;
    deductions.seo.push('Title tag is missing, empty, or exceeds 60 characters (-4 pts)');
  }
  if (!data.hasMetaDescription) {
    scores.seo -= 4;
    deductions.seo.push('Meta description is missing from the document header (-4 pts)');
  }
  if (!data.hasSchemaData) {
    scores.seo -= 4;
    deductions.seo.push('Page lacks local business structured schema data (-4 pts)');
  }
  // New Header Hierarchy check
  if (data.hasHeaderHierarchyError) {
    scores.seo -= 5;
    deductions.seo.push('Heading structure is broken (skips levels like h1 to h3) (-5 pts)');
  }

  // Category 3: AI Search Readiness - GEO/AEO (Max 25)
  if (!data.hasScannableListsOrTables || !data.hasConversationalHeadings) {
    scores.geo_aeo -= 10;
    deductions.geo_aeo.push('Content lacks conversational headings ("How", "What") and scannable lists (-10 pts)');
  }
  if (!data.hasStackedSchema) {
    scores.geo_aeo -= 5;
    deductions.geo_aeo.push('Missing "stacked" JSON-LD schemas (FAQPage, Article, or Organization) (-5 pts)');
  }
  if (!data.hasExternalCitations) {
    scores.geo_aeo -= 5;
    deductions.geo_aeo.push('Missing external citations or outbound trust links (-5 pts)');
  }
  if (!data.hasAnswerNugget) {
    scores.geo_aeo -= 5;
    deductions.geo_aeo.push('Missing a concise "Answer Nugget" definition immediately following the main heading (-5 pts)');
  }

  // Category 4: Competitive & Compliance Risks (Max 25)
  if (!data.hasComplianceLinks) {
    scores.compliance -= 15;
    deductions.compliance.push('Lacks hyperlink to Privacy Policy or Terms of Service (-15 pts)');
  }
  if (data.hasImagesWithoutAlt) {
    scores.compliance -= 10;
    deductions.compliance.push('Image elements found missing descriptive alt attributes (ADA risk) (-10 pts)');
  }

  const totalScore = scores.conversion + scores.seo + scores.geo_aeo + scores.compliance;

  const impacts = [];
  if (scores.conversion < 20) impacts.push(IMPACT_MAP.conversion);
  if (scores.seo < 20) impacts.push(IMPACT_MAP.seo);
  if (scores.geo_aeo < 20) impacts.push(IMPACT_MAP.geo_aeo);
  if (scores.compliance < 20) impacts.push(IMPACT_MAP.compliance);

  return {
    url,
    totalScore,
    scores,
    deductions,
    impacts
  };
}

module.exports = { auditEngine };
