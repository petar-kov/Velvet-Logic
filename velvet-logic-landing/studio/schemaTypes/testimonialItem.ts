import {defineType, defineField} from 'sanity'

export const testimonialItemType = defineType({
  name: 'testimonialItem',
  title: 'Testimonial Item',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'role', title: 'Role/Company', type: 'localizedString' }),
    defineField({ name: 'quote', title: 'Quote', type: 'localizedBlockContent' }),
    defineField({ name: 'initials', title: 'Initials (Fallback)', type: 'string', description: 'e.g. "JD" if no image is uploaded' }),
    defineField({ name: 'avatar', title: 'Client Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      initialValue: 5,
      validation: Rule => Rule.min(1).max(5)
    }),
    defineField({
      name: 'color',
      title: 'Glow Color',
      type: 'string',
      options: {
        list: [
          { title: 'Navy (Brand)', value: 'navy' },
          { title: 'Orange (Accent)', value: 'orange' },
          { title: 'Green (Success)', value: 'green' },
          { title: 'Slate (Neutral)', value: 'slate' },
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
