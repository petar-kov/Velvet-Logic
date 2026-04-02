import {defineType, defineField} from 'sanity'

export const footerType = defineType({
  name: 'footer',
  title: 'Footer Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'logoTextMain',
      title: 'Logo Text (Main)',
      type: 'string',
      initialValue: 'VELVET',
    }),
    defineField({
      name: 'logoTextHighlight',
      title: 'Logo Text (Highlight)',
      type: 'string',
      initialValue: 'LOGIC',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'url', title: 'URL', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Configuration',
      }
    },
  },
})
