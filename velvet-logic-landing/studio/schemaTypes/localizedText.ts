import {defineType, defineField} from 'sanity'

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sr',
      title: 'Serbian',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
})
