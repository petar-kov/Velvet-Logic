import {defineType, defineField, defineArrayMember} from 'sanity'

export const testimonialsType = defineType({
  name: 'testimonials',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Friendly Label (Internal Only)',
      type: 'string',
      initialValue: 'Testimonials Section'
    }),
    defineField({
      name: 'headPre',
      title: 'Heading Prefix (Client)',
      type: 'localizedString',
    }),
    defineField({
      name: 'headSub',
      title: 'Heading Highlight (Testimonials)',
      type: 'localizedString',
    }),
    defineField({
      name: 'headTag',
      title: 'Section Heading Tag (SEO)',
      type: 'string',
      initialValue: 'h2',
      options: {
        list: [
          { title: 'H1 (Main)', value: 'h1' },
          { title: 'H2 (Section Header)', value: 'h2' },
          { title: 'H3 (Subheader)', value: 'h3' },
          { title: 'Span (Inline)', value: 'span' }
        ]
      }
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedBlockContent',
    }),
    defineField({
      name: 'list',
      title: 'Testimonials List',
      type: 'array',
      of: [
        { type: 'testimonialItem' }
      ]
    }),
  ],
  preview: { 
    select: { title: 'sectionLabel' },
    prepare({title}) { return { title: title || 'Testimonials Section' } } 
  }
})
