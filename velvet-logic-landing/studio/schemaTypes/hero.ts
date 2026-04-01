import {defineType, defineField} from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'preTitle',
      title: 'Pre-Title (Small uppercase)',
      type: 'localizedString',
    }),
    defineField({
      name: 'titlePart1',
      title: 'Title Part 1 (Soft as)',
      type: 'localizedString',
    }),
    defineField({
      name: 'titleVelvet',
      title: 'Title Highlight 1 (Velvet)',
      type: 'localizedString',
    }),
    defineField({
      name: 'titlePart2',
      title: 'Title Part 2 (Sharp as)',
      type: 'localizedString',
    }),
    defineField({
      name: 'titleLogic',
      title: 'Title Highlight 2 (Logic.)',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedBlockContent',
    }),
    defineField({
      name: 'btnStartText',
      title: 'Start Button Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'btnStartIcon',
      title: 'Start Button Icon (lucide-react name, e.g. "Zap")',
      type: 'string',
    }),
    defineField({
      name: 'btnPortText',
      title: 'Portfolio/Testimonials Button Text',
      type: 'localizedString',
    }),
  ],
  preview: {
    select: { title: 'titlePart1.en' },
    prepare({title}) { return { title: title || 'Hero Section' } }
  }
})
