import {defineType, defineField, defineArrayMember} from 'sanity'

export const testimonialsType = defineType({
  name: 'testimonials',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
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
      name: 'description',
      title: 'Description',
      type: 'localizedBlockContent',
    }),
    defineField({
      name: 'list',
      title: 'Testimonials List',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonialItem',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role/Company', type: 'localizedString' }),
            defineField({ name: 'quote', title: 'Quote', type: 'localizedBlockContent' }),
            defineField({ name: 'initials', title: 'Initials (Fallback)', type: 'string', description: 'e.g. "JD" if no image is uploaded' }),
            defineField({ name: 'avatar', title: 'Client Image', type: 'image', options: { hotspot: true } }),
            defineField({
              name: 'color',
              title: 'Glow Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Violet (Primary)', value: 'bg-primary' },
                  { title: 'Emerald (CTA)', value: 'bg-cta' },
                  { title: 'Amber (Accent)', value: 'bg-accent' },
                ]
              }
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role.en',
            }
          }
        })
      ]
    }),
  ],
  preview: {
    select: { title: 'headSub.en' },
    prepare({title}) {
      return { title: title || 'Testimonials Section' }
    }
  }
})
