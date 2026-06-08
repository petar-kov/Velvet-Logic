import {defineType, defineField} from 'sanity'

export const processStepType = defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'object',
  fields: [
    defineField({ name: 'stepNumber', title: 'Step Number', type: 'string' }),
    defineField({ name: 'title', title: 'Step Title', type: 'localizedString' }),
    defineField({ name: 'icon', title: 'Icon (Lucide name)', type: 'string' }),
    defineField({ 
      name: 'iconCustom', 
      title: 'Upload Custom SVG', 
      type: 'image',
      options: { accept: 'image/svg+xml' }
    }),
    defineField({ name: 'description', title: 'Step Description', type: 'localizedBlockContent' }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'stepNumber',
    }
  }
})
