import {defineType, defineField} from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string' }),
    defineField({ name: 'seoDesc', title: 'SEO Description', type: 'text' }),
    defineField({ name: 'ogImage', title: 'Open Graph Image', type: 'image' }),
  ],
})
