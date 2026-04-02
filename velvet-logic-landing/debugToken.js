import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: '0mihymp4',
  dataset: 'production',
  apiVersion: '2024-03-24',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function check() {
  console.log('Testing Sanity Token Permissions...');
  try {
    const data = await client.fetch('*[_id == "home-page"]{title}[0]');
    console.log('✅ Read Access: Success');
    console.log('Document found:', data ? data.title : 'No home-page doc');
    
    // Testing write
    console.log('Testing Write Access (Creating temp doc)...');
    const testDoc = {
      _id: 'test-write-' + Date.now(),
      _type: 'footer',
      logoTextMain: 'TEST',
    };
    await client.create(testDoc);
    console.log('✅ Write Access: Success');
    
    // Cleanup
    await client.delete(testDoc._id);
    console.log('✅ Delete Access: Success');
  } catch (err) {
    console.error('❌ Permission Error:', err.message);
  }
}

check();
