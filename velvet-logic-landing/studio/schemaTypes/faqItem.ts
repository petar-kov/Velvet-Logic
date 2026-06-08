import {defineType, defineField} from 'sanity'

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'localizedString',
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'localizedBlockContent',
    }),
  ],
  preview: {
    select: {
      title: 'question.en',
    }
  }
})
