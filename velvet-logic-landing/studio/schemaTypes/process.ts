import {defineType, defineField, defineArrayMember} from 'sanity'

export const processType = defineType({
  name: 'process',
  title: 'Process Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Friendly Label (Internal Only)',
      type: 'string',
      initialValue: 'Process Section'
    }),
    defineField({ name: 'tag', title: 'Tag (Build Philosophy)', type: 'localizedString' }),
    defineField({ name: 'head', title: 'Heading Start (The)', type: 'localizedString' }),
    defineField({ name: 'headSpan', title: 'Heading Span (Velvet Logic)', type: 'localizedString' }),
    defineField({ name: 'headEnd', title: 'Heading End (Framework)', type: 'localizedString' }),
    defineField({
      name: 'headTag',
      title: 'Heading HTML Tag (SEO)',
      type: 'string',
      initialValue: 'h2',
      options: {
        list: [
          { title: 'H1 (Main)', value: 'h1' },
          { title: 'H2 (Section Header)', value: 'h2' },
          { title: 'H3 (Subheader)', value: 'h3' },
          { title: 'Span (Inline)', value: 'span' }
        ]
      }
    }),
    defineField({ name: 'description', title: 'Description', type: 'localizedBlockContent' }),
    defineField({
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      validation: rule => rule.max(3).min(3),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'stepNumber', title: 'Step Number', type: 'string' }),
            defineField({ name: 'title', title: 'Step Title', type: 'localizedString' }),
            defineField({ name: 'description', title: 'Step Description', type: 'localizedBlockContent' }),
          ],
          preview: {
            select: {
              title: 'title.en',
              subtitle: 'stepNumber',
            }
          }
        })
      ]
    }),
  ],
  preview: { 
    select: { title: 'sectionLabel' },
    prepare({title}) { return { title: title || 'Process Section' } } 
  }
})
