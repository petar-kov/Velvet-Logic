import {defineType, defineField} from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'String',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'Content',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
