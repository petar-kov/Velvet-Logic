import {defineType, defineField} from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Friendly Label (Internal Only)',
      type: 'string',
      description: 'Give this section a custom name to help you recognize it in the Page Builder list.',
      initialValue: 'Hero Section'
    }),
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
      name: 'titleTag',
      title: 'Main Title HTML Tag (SEO)',
      type: 'string',
      initialValue: 'h1',
      options: {
        list: [
          { title: 'H1 (Standard)', value: 'h1' },
          { title: 'H2 (Sub-section)', value: 'h2' },
          { title: 'H3 (Section)', value: 'h3' },
          { title: 'H4 (Subsection)', value: 'h4' },
          { title: 'Span (Inline)', value: 'span' }
        ]
      }
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
      title: 'Start Button Icon (lucide name, e.g. "Zap")',
      type: 'string',
    }),
    defineField({
      name: 'btnStartIconCustom',
      title: 'Start Button Custom SVG Override',
      type: 'image',
      description: 'Upload an SVG file here to bypass the Lucide icon name above.',
      options: { accept: 'image/svg+xml' }
    }),
    defineField({
      name: 'btnPortText',
      title: 'Portfolio/Testimonials Button Text',
      type: 'localizedString',
    }),
  ],
  preview: {
    select: { title: 'sectionLabel' },
    prepare({title}) {
      return {
        title: title || 'Hero Section'
      }
    }
  }
})
