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
