import {defineType, defineField, defineArrayMember} from 'sanity'

export const valuesType = defineType({
  name: 'values',
  title: 'Values/Features Section',
  type: 'document',
  fields: [
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
            defineField({ name: 'title', title: 'Card Title', type: 'localizedString' }),
            defineField({ name: 'description', title: 'Card Description', type: 'localizedText' }),
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
  preview: { prepare() { return { title: 'Values/Features Section Config' } } }
})
