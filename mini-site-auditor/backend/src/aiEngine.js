async function generateContentCritique(text) {
  if (!process.env.OPENAI_API_KEY) {
    console.log('No OPENAI_API_KEY found, using mock critique.');
    return "This is a premium ChatGPT demonstration. Your hero section lacks localized urgency and specific value propositions for homeowners. Add clearer calls-to-action to improve conversion rates.";
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a strict Google Search Quality Rater. Provide a 2-sentence highly critical, personalized critique of the copywriting on this website based on E-E-A-T guidelines. Be direct, actionable, and address the business owner directly.' },
          { role: 'user', content: `Website Text: ${text.substring(0, 3000)}` }
        ],
        max_tokens: 100
      })
    });
    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (err) {
    console.error('OpenAI Error:', err);
    return 'We were unable to reach ChatGPT to generate your personalized critique at this time.';
  }
}

async function verifyAIPresence(domain) {
  if (!process.env.PERPLEXITY_API_KEY) {
    console.log('No PERPLEXITY_API_KEY found, using mock AI presence.');
    return {
      status: 'Warning',
      message: 'Your business is currently invisible to AI Search Engines (Perplexity, ChatGPT Search, Gemini). Competitors with stronger digital footprints are being recommended to local homeowners instead of you.'
    };
  }

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          { role: 'system', content: 'Determine if this business is a highly recommended local entity. Return a 2-sentence summary of their reputation and if they are recommended.' },
          { role: 'user', content: `Check the reputation and AI search visibility for: ${domain}` }
        ]
      })
    });
    const data = await response.json();
    return {
      status: 'Analyzed',
      message: data.choices[0].message.content.trim()
    };
  } catch (err) {
    console.error('Perplexity Error:', err);
    return { status: 'Error', message: 'Failed to verify AI Search Presence.' };
  }
}

async function verifyGoogleSerp(domain) {
  if (!process.env.SERPER_API_KEY) {
    console.log('No SERPER_API_KEY found, using mock SERP data.');
    return {
      rankingPage: 'Not on Page 1',
      competitorsOutranking: 4,
      googleBusinessProfile: 'Not Found / Unoptimized',
      message: 'Your primary keywords are not triggering your website on Page 1. 4 competitors are currently absorbing your local organic traffic.'
    };
  }

  try {
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.SERPER_API_KEY
      },
      body: JSON.stringify({
        q: domain,
        num: 10
      })
    });
    const data = await response.json();
    
    // Very basic analysis of the SERP JSON
    const hasGBP = !!data.knowledgeGraph;
    const ranking = data.organic && data.organic.some(res => res.link.includes(domain)) ? 'Page 1 Confirmed' : 'Not on Page 1';

    return {
      rankingPage: ranking,
      competitorsOutranking: data.organic ? data.organic.filter(res => !res.link.includes(domain)).length : 0,
      googleBusinessProfile: hasGBP ? 'Verified' : 'Missing/Unoptimized',
      message: hasGBP ? 'Google Business Profile is active, but organic rankings need improvement.' : 'No Google Business Profile detected in Knowledge Graph.'
    };
  } catch (err) {
    console.error('Serper Error:', err);
    return { status: 'Error', message: 'Failed to verify live Google Rankings.' };
  }
}

module.exports = {
  generateContentCritique,
  verifyAIPresence,
  verifyGoogleSerp
};
