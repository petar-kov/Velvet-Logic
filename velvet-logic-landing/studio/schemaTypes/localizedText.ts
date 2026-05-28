import {defineType, defineField} from 'sanity'

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'Content',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
})
