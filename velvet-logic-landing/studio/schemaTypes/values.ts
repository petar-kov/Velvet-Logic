import {defineType, defineField, defineArrayMember} from 'sanity'

export const valuesType = defineType({
  name: 'values',
  title: 'Values/Features Section',
  type: 'object',
  fields: [
    defineField({
      name: 'preTitle',
      title: 'Pre-Title (e.g. "Our Philosophy")',
      type: 'localizedString',
    }),
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'localizedString',
    }),
    defineField({
      name: 'headingTag',
      title: 'Section Heading HTML Tag (SEO)',
      type: 'string',
      initialValue: 'h2',
      options: {
        list: [
          { title: 'H1 (Main)', value: 'h1' },
          { title: 'H2 (Section Header)', value: 'h2' },
          { title: 'H3 (Sub-header)', value: 'h3' },
          { title: 'Span (Inline)', value: 'span' }
        ]
      }
    }),
    defineField({
      name: 'subtext',
      title: 'Section Subtext',
      type: 'localizedBlockContent',
    }),
    defineField({
      name: 'cards',
      title: 'Value Cards',
      type: 'array',
      validation: rule => rule.max(3).min(3),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'tag', title: 'Card Tag (e.g. The Vision)', type: 'localizedString' }),
            defineField({ name: 'icon', title: 'Icon Name (e.g. "Zap")', type: 'string' }),
            defineField({ name: 'iconCustom', title: 'Custom Icon Upload', type: 'image' }),
            defineField({ name: 'title', title: 'Card Title', type: 'localizedString' }),
            defineField({ name: 'description', title: 'Card Description', type: 'localizedBlockContent' }),
          ],
          preview: {
            select: {
              title: 'title.en',
              subtitle: 'tag.en',
            }
          }
        })
      ]
    }),
  ],
  preview: { 
    select: { title: 'heading.en' },
    prepare({title}) { return { title: title || 'Values/Features Section' } } 
  }
})
