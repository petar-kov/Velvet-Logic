import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const client = createClient({
  projectId: '0mihymp4',
  dataset: 'production',
  apiVersion: '2024-03-24',
  token: process.env.SANITY_API_WRITE_TOKEN_NEWEST,
  useCdn: false,
});

const stringToBlock = (str) => {
  if (!str) return [];
  if (Array.isArray(str)) return str;
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

async function sync() {
  const doc = await client.getDocument('home-page');
  if (!doc || !doc.pageBuilder) return console.log('No pageBuilder found');

  let updatedPageBuilder = [];

  for (let block of doc.pageBuilder) {
    if (block._type === 'hero') {
      block.description = { en: stringToBlock("A three-second load delay kills 50% of your traffic. We build visually stunning, high-converting digital experiences that stop the leak and elevate your brand.") };
      updatedPageBuilder.push(block);
    } 
    else if (block._type === 'whyItMatters') {
      if (Array.isArray(block.comparisons)) {
        block.comparisons = block.comparisons.map(comp => {
          if (comp.pillar?.en === 'Analytics') {
            return {
              ...comp,
              pillar: { en: 'Design Aesthetics' },
              oldWay: { en: 'Generic templates and forgettable visuals.' },
              ourWay: { en: 'Premium, conversion-focused design that elevates your brand.' }
            };
          }
          return comp;
        });
      }
      updatedPageBuilder.push(block);
      // Immediately push Design Philosophy block
      updatedPageBuilder.push({
        _type: 'designPhilosophy',
        _key: `dp_${Math.random().toString(36).substring(2, 11)}`
      });
    }
    else if (block._type === 'process') {
      if (Array.isArray(block.steps)) {
        block.steps = block.steps.map(step => {
          if (step.title?.en === 'Ad Spend Bleed') {
            return {
              ...step,
              title: { en: 'Unprofessional, Generic Design' },
              description: { en: stringToBlock("If your brand looks like a generic template from 2015, high-end clients will assume your work is equally outdated. We build striking, premium interfaces that instantly establish authority and trust.") },
              icon: 'Palette'
            };
          }
          return step;
        });
      }
      updatedPageBuilder.push(block);
    }
    else if (block._type === 'testimonials' || block._type === 'siteAuditor') {
      // Exclude these
    }
    else {
      updatedPageBuilder.push(block);
    }
  }

  await client.patch('home-page').set({ pageBuilder: updatedPageBuilder }).commit();
  console.log('Successfully synced data to Sanity!');
}

sync().catch(console.error);
