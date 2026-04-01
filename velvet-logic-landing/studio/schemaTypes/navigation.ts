import {defineType, defineField} from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation & Global',
  type: 'document',
  fields: [
    defineField({ name: 'navWork', title: 'Work Link', type: 'localizedString' }),
    defineField({ name: 'navProcess', title: 'Process Link', type: 'localizedString' }),
    defineField({ name: 'navContact', title: 'Contact Link', type: 'localizedString' }),
    defineField({ name: 'btnStart', title: 'Start Project Button', type: 'localizedString' }),
  ],
  preview: { prepare() { return { title: 'Navigation Configuration' } } }
})
