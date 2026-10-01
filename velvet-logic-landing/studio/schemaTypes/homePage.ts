import {defineType, defineField} from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO & Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Page Name',
      type: 'string',
      initialValue: 'Home Page',
      readOnly: true,
      group: 'content',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      group: 'content',
      of: [
        { type: 'hero' },
        { type: 'values' },
        { type: 'process' },
        { type: 'whyItMatters' },
        { type: 'siteAuditor' },
        { type: 'testimonials' },
        { type: 'faq' },
        { type: 'contact' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
        subtitle: 'Main landing page content'
      }
    }
  }
})
