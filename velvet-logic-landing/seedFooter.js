import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

/**
 * Seed script for Footer configuration.
 */

const client = createClient({
  projectId: '0mihymp4', // From migrateToHomePage.js
  dataset: 'production',
  apiVersion: '2024-03-24',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_API_WRITE_TOKEN) {
  console.log('⚠️  Warning: Missing SANITY_API_WRITE_TOKEN. Migration likely to fail.');
}

async function seed() {
  console.log('🚀 Seeding Footer Configuration...');

  try {
    const footerDoc = {
      _id: 'footer',
      _type: 'footer',
      logoTextMain: 'VELVET',
      logoTextHighlight: 'LOGIC',
      socialLinks: [
        { _key: 'ig', label: 'Instagram', url: '#instagram' },
        { _key: 'li', label: 'LinkedIn', url: '#linkedin' },
        { _key: 'dr', label: 'Dribbble', url: '#dribbble' },
      ],
    };

    console.log('📦 Updating Footer with current landing content...');
    await client.createOrReplace(footerDoc);
    
    console.log('✅ Success! Footer configuration seeded.');

  } catch (error) {
    console.error('💥 Seeding failed:', error.message);
  }
}

seed();
