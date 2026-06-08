import {defineType, defineField, defineArrayMember} from 'sanity'

export const whyItMattersType = defineType({
  name: 'whyItMatters',
  title: 'Why It Matters Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Friendly Label (Internal Only)',
      type: 'string',
      initialValue: 'Why It Matters Section'
    }),
    defineField({ name: 'preTitle', title: 'Pre-Title', type: 'localizedString' }),
    defineField({ name: 'heading', title: 'Heading', type: 'localizedString' }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'localizedBlockContent' }),
    defineField({
      name: 'comparisons',
      title: 'Comparisons (Old Way vs Our Way)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'pillar', title: 'Audit Pillar', type: 'localizedString' }),
            defineField({ name: 'oldWay', title: 'The Old Way', type: 'localizedString' }),
            defineField({ name: 'ourWay', title: 'The Velvet Logic Way', type: 'localizedString' }),
          ],
          preview: {
            select: { title: 'pillar.en' }
          }
        })
      ]
    })
  ],
  preview: {
    select: { title: 'sectionLabel' },
    prepare({title}) { return { title: title || 'Why It Matters Section' } }
  }
})
