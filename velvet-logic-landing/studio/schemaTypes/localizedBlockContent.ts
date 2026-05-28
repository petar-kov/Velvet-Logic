import {defineType, defineField} from 'sanity'

export const localizedBlockContent = defineType({
  name: 'localizedBlockContent',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}}
      ]
    }),
  ],
})
