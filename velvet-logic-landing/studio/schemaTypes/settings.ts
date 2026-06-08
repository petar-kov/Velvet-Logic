import {defineType, defineField} from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string' }),
    defineField({ name: 'seoDesc', title: 'SEO Description', type: 'text' }),
    defineField({ name: 'logo', title: 'Main Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'favicon', title: 'Favicon (32x32)', type: 'image' }),
    defineField({ name: 'ogImage', title: 'Open Graph Image (Social Share)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'defaultHeroImage', title: 'Default Hero Background', type: 'image', options: { hotspot: true } }),
  ],
})
