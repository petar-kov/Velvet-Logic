import { createClient } from '@sanity/client';

/**
 * Migration Script 2.0: Singleton -> Array Optimized Page Builder
 * Includes String-to-Block conversion to prevent "Invalid property value" errors.
 */

const client = createClient({
  projectId: '0mihymp4',
  dataset: 'production',
  apiVersion: '2024-03-24',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_API_WRITE_TOKEN) {
  console.log('⚠️  Warning: Missing SANITY_API_WRITE_TOKEN. Migration likely to fail.');
}


// Helper to wrap a string in a standard Sanity block
const stringToBlock = (str) => {
  if (!str) return [];
  if (Array.isArray(str)) return str; // Already an array
  return [
    {
      _type: 'block',
      _key: `block_${Math.random().toString(36).substring(2, 11)}`,
      children: [{ _type: 'span', _key: `span_${Math.random().toString(36).substring(2, 11)}`, text: String(str), marks: [] }],
      markDefs: [],
      style: 'normal'
    }
  ];
};

// Helper to convert LocalizedString object {en, sr} to LocalizedBlockContent {en, sr}
const convertToLocalizedBlock = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  return {
    ...obj,
    en: stringToBlock(obj.en),
    sr: stringToBlock(obj.sr)
  };
};

async function migrate() {
  console.log('🚀 Starting Data Upgrade (String -> Array conversion)...');

  try {
    const query = `*[_type in ["hero", "values", "process", "testimonials", "contact"]]`;
    const oldDocs = await client.fetch(query);
    
    if (oldDocs.length === 0) {
      console.log('❌ No documents found.'); return;
    }

    const sections = [];
    const order = ["hero", "values", "process", "testimonials", "contact"];
    
    order.forEach(type => {
      const doc = oldDocs.find(d => d._type === type);
      if (doc) {
        let cleanData = { ...doc };
        delete cleanData._id; delete cleanData._rev; delete cleanData._type;
        delete cleanData._updatedAt; delete cleanData._createdAt;

        // --- FIELD SPECIFIC UPGRADES ---
        // Hero
        if (type === 'hero') {
          cleanData.description = convertToLocalizedBlock(cleanData.description);
        }
        // Values
        if (type === 'values') {
          cleanData.subtext = convertToLocalizedBlock(cleanData.subtext);
          if (Array.isArray(cleanData.cards)) {
            console.log(' - Upgrading Values cards...');
            cleanData.cards = cleanData.cards.map(card => ({
              ...card,
              description: convertToLocalizedBlock(card.description)
            }));
          }
        }
        // Process
        if (type === 'process') {
          cleanData.description = convertToLocalizedBlock(cleanData.description);
          if (Array.isArray(cleanData.steps)) {
            console.log(' - Upgrading Process steps...');
            cleanData.steps = cleanData.steps.map(step => ({
              ...step,
              description: convertToLocalizedBlock(step.description)
            }));
          }
        }
        // Testimonials
        if (type === 'testimonials') {
          cleanData.description = convertToLocalizedBlock(cleanData.description);
          if (Array.isArray(cleanData.list)) {
            console.log(' - Upgrading Testimonial quotes...');
            cleanData.list = cleanData.list.map(item => ({
              ...item,
              quote: convertToLocalizedBlock(item.quote)
            }));
          }
        }
        // Contact
        if (type === 'contact') {
          cleanData.description = convertToLocalizedBlock(cleanData.description);
        }


        sections.push({
          ...cleanData,
          _type: type,
          _key: `section_${Date.now()}_${type}`
        });
      }
    });

    const homePageDoc = {
      _id: 'home-page',
      _type: 'homePage',
      title: 'Home Page',
      sections: sections
    };

    console.log('📦 Updating Home Page with array-compatible content...');
    await client.createOrReplace(homePageDoc);
    
    console.log('✅ Success! Your text is now "Block Content" compatible.');

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  }
}

migrate();
