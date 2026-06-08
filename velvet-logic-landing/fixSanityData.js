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

const fixBlock = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  return {
    ...obj,
    en: stringToBlock(obj.en)
  };
};

async function fix() {
  console.log('Fixing Array vs String errors...');
  const doc = await client.getDocument('home-page');
  if (!doc) return console.log('No home-page doc found');

  const updatedSections = doc.sections.map(section => {
    if (section._type === 'process' && Array.isArray(section.steps)) {
      section.steps = section.steps.map(step => ({
        ...step,
        _type: 'processStep',
        description: typeof step.description?.en === 'string' ? fixBlock(step.description) : step.description
      }));
    }
    if (section._type === 'values' && Array.isArray(section.cards)) {
      section.cards = section.cards.map(card => ({
        ...card,
        _type: 'valueCard',
        description: typeof card.description?.en === 'string' ? fixBlock(card.description) : card.description
      }));
    }
    if (section._type === 'testimonials' && Array.isArray(section.list)) {
      section.list = section.list.map(item => ({
        ...item,
        _type: 'testimonialItem',
        quote: typeof item.quote?.en === 'string' ? fixBlock(item.quote) : item.quote
      }));
    }
    if (section._type === 'faq' && Array.isArray(section.questions)) {
      section.questions = section.questions.map(q => ({
        ...q,
        _type: 'faqItem',
        answer: typeof q.answer?.en === 'string' ? fixBlock(q.answer) : q.answer
      }));
    }
    return section;
  });

  await client.patch('home-page').set({ sections: updatedSections }).commit();
  console.log('Data fixed successfully!');
}

fix().catch(console.error);
