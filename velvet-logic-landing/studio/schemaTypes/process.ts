import {defineType, defineField, defineArrayMember} from 'sanity'

export const processType = defineType({
  name: 'process',
  title: 'Process Section',
  type: 'document',
  fields: [
    defineField({ name: 'tag', title: 'Tag (Build Philosophy)', type: 'localizedString' }),
    defineField({ name: 'head', title: 'Heading Start (The)', type: 'localizedString' }),
    defineField({ name: 'headSpan', title: 'Heading Span (Velvet Logic)', type: 'localizedString' }),
    defineField({ name: 'headEnd', title: 'Heading End (Framework)', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description', type: 'localizedText' }),
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
            defineField({ name: 'description', title: 'Step Description', type: 'localizedText' }),
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
  preview: { prepare() { return { title: 'Process Section Configuration' } } }
})
