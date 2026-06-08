import {defineType, defineField} from 'sanity'

export const valueCardType = defineType({
  name: 'valueCard',
  title: 'Value Card',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Card Title', type: 'localizedString' }),
    defineField({ name: 'icon', title: 'Lucide Icon Name', type: 'string' }),
    defineField({ 
      name: 'iconCustom', 
      title: 'Upload Custom SVG', 
      type: 'image',
      options: { accept: 'image/svg+xml' }
    }),
    defineField({ name: 'description', title: 'Card Description', type: 'localizedBlockContent' }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'icon',
    }
  }
})
