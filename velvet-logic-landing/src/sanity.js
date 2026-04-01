import { createClient } from '@sanity/client'

// Detect if we are in preview mode via URL parameter or cookie
const isPreview = typeof window !== 'undefined' && window.location.search.includes('preview=true');

export const client = createClient({
  projectId: '0mihymp4',
  dataset: 'production',
  useCdn: !isPreview, // Bypass CDN in preview mode
  apiVersion: '2024-03-24',
  // Required for draft viewing
  perspective: isPreview ? 'previewDrafts' : 'published',
  token: isPreview ? import.meta.env.VITE_SANITY_API_READ_TOKEN : undefined,
  // Enable visual editing overlays (stega)
  stega: {
    enabled: isPreview,
    studioUrl: '/studio', // Change this if your studio lives elsewhere
  }
})
