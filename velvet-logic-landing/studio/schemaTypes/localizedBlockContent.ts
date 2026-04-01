import {defineType, defineField} from 'sanity'

export const localizedBlockContent = defineType({
  name: 'localizedBlockContent',
  title: 'Localized Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}}
      ]
    }),
    defineField({
      name: 'sr',
      title: 'Serbian',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}}
      ]
    }),
  ],
})
