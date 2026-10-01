import { defineType } from 'sanity'

export default defineType({
  name: 'designPhilosophy',
  title: 'Design Philosophy Block',
  type: 'object',
  fields: [
    {
      name: 'internalTitle',
      title: 'Internal Title',
      type: 'string',
      description: 'Used only for labeling in the CMS (e.g. "Design Philosophy")',
      initialValue: 'Design Philosophy Block'
    }
  ],
  preview: {
    select: {
      title: 'internalTitle'
    },
    prepare({ title }) {
      return {
        title: title || 'Design Philosophy Block',
        subtitle: 'Static text block'
      }
    }
  }
})
