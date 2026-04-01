import {defineType, defineField, defineArrayMember} from 'sanity'

export const contactType = defineType({
  name: 'contact',
  title: 'Contact Section',
  type: 'document',
  fields: [
    defineField({ name: 'tag', title: 'Tag', type: 'localizedString' }),
    defineField({ name: 'head1', title: 'Heading Start', type: 'localizedString' }),
    defineField({ name: 'headSpan', title: 'Heading Highlight', type: 'localizedString' }),
    defineField({ name: 'head2', title: 'Heading End', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description', type: 'localizedText' }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      validation: rule => rule.max(2),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Feature Title', type: 'localizedString' }),
            defineField({ name: 'subtext', title: 'Feature Subtext', type: 'localizedString' }),
          ],
          preview: {
            select: { title: 'title.en' }
          }
        })
      ]
    }),
    defineField({
      name: 'formLabels',
      title: 'Form Labels',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Name Label', type: 'localizedString' }),
        defineField({ name: 'company', title: 'Company Label', type: 'localizedString' }),
        defineField({ name: 'email', title: 'Email Label', type: 'localizedString' }),
        defineField({ name: 'phone', title: 'Phone Label', type: 'localizedString' }),
        defineField({ name: 'details', title: 'Details Label', type: 'localizedString' }),
        defineField({ name: 'detailsPlace', title: 'Details Placeholder', type: 'localizedString' }),
        defineField({ name: 'submit', title: 'Submit Button', type: 'localizedString' }),
      ]
    })
  ],
  preview: { prepare() { return { title: 'Contact Section Configuration' } } }
})
