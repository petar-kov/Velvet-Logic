import {defineType, defineField, defineArrayMember} from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Friendly Label (Internal Only)',
      type: 'string',
      initialValue: 'FAQ Section'
    }),
    defineField({ name: 'preTitle', title: 'Pre-Title', type: 'localizedString' }),
    defineField({ name: 'heading', title: 'Heading', type: 'localizedString' }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'localizedBlockContent' }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [{type: 'faqItem'}]
    })
  ],
  preview: {
    select: { title: 'sectionLabel' },
    prepare({title}) { return { title: title || 'FAQ Section' } }
  }
})
