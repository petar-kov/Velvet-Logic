import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '0mihymp4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-24',
  token: 'skw3QGlfBEi0xzMmSEUSGyAJCWXQbUcmNAxD744An3ZGqCFnEq9cWYTwNZauyyX4Ovbd4JM9ZueJCA7v6'
});

async function run() {
  const docs = await client.fetch('*[_type in ["homePage", "navigation", "settings", "footer", "contact"]]');
  console.log(`Found ${docs.length} documents to process.`);

  for (const doc of docs) {
    let patches = [];

    // Helper to recursively find paths to 'sr' keys
    const findPaths = (obj, currentPath = '') => {
      if (!obj || typeof obj !== 'object') return;

      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          if (item && item._key) {
            findPaths(item, `${currentPath}[_key=="${item._key}"]`);
          } else {
            findPaths(item, `${currentPath}[${index}]`);
          }
        });
      } else {
        for (const [key, value] of Object.entries(obj)) {
          if (key === 'sr') {
            patches.push(`${currentPath}.${key}`);
          } else {
            findPaths(value, currentPath ? `${currentPath}.${key}` : key);
          }
        }
      }
    };

    findPaths(doc);

    if (patches.length > 0) {
      console.log(`Removing ${patches.length} 'sr' fields from document ${doc._id}...`);
      await client.patch(doc._id).unset(patches).commit();
      console.log(`Successfully cleaned ${doc._id}`);
    } else {
      console.log(`No 'sr' fields found in ${doc._id}`);
    }
  }
}

run().catch(console.error);
