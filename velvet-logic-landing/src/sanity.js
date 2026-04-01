import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '0mihymp4',
  dataset: 'production',
  useCdn: false, // set to false if you want to bypass the edge cache
  apiVersion: '2024-03-24', // use current date
})
