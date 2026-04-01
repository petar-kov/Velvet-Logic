import {defineType, defineField} from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sr',
      title: 'Serbian',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
