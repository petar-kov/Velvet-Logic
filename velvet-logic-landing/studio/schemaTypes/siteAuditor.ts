import {defineType, defineField} from 'sanity'

export const siteAuditorType = defineType({
  name: 'siteAuditor',
  title: 'Site Auditor Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Friendly Label (Internal Only)',
      type: 'string',
      description: 'Give this section a custom name to help you recognize it in the Page Builder list.',
      initialValue: 'Site Auditor'
    }),
    defineField({
      name: 'preTitle',
      title: 'Pre-Title',
      type: 'localizedString',
      description: 'E.g. "Instant Analysis"'
    }),
    defineField({
      name: 'headingPart1',
      title: 'Heading (Before Highlight)',
      type: 'localizedString',
      description: 'E.g. "Get Your Free "'
    }),
    defineField({
      name: 'headingHighlight',
      title: 'Heading Highlight (Orange)',
      type: 'localizedString',
      description: 'E.g. "Site Audit"'
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext Description',
      type: 'localizedText',
      description: 'E.g. "Enter your domain below. Our engine will instantly scan your site..."'
    }),
    
    // Form Labels
    defineField({
      name: 'formEmailLabel',
      title: 'Form Email Placeholder',
      type: 'localizedString',
      description: 'E.g. "Email address"'
    }),
    defineField({
      name: 'formUrlLabel',
      title: 'Form URL Placeholder',
      type: 'localizedString',
      description: 'E.g. "Website URL (e.g. example.com)"'
    }),
    defineField({
      name: 'formSubmitText',
      title: 'Form Submit Button Text',
      type: 'localizedString',
      description: 'E.g. "Scan My Site"'
    }),
    defineField({
      name: 'formLoadingText',
      title: 'Form Loading State Text',
      type: 'localizedString',
      description: 'E.g. "SCANNING..."'
    }),

    // Mock Report Copy
    defineField({
      name: 'mockReportTag',
      title: 'Mock Report Tag',
      type: 'localizedString',
      description: 'E.g. "Live Preview"'
    }),
    defineField({
      name: 'mockReportTitle',
      title: 'Mock Report Title',
      type: 'localizedString',
      description: 'E.g. "Diagnostic Report"'
    }),
    defineField({
      name: 'mockReportItem1Title',
      title: 'Mock Report Item 1 Title',
      type: 'localizedString',
      description: 'E.g. "Performance"'
    }),
    defineField({
      name: 'mockReportItem1Sub',
      title: 'Mock Report Item 1 Subtext',
      type: 'localizedString',
      description: 'E.g. "Sub-second load time"'
    }),
    defineField({
      name: 'mockReportItem2Title',
      title: 'Mock Report Item 2 Title',
      type: 'localizedString',
      description: 'E.g. "Conversion Leaks"'
    }),
    defineField({
      name: 'mockReportItem2Sub',
      title: 'Mock Report Item 2 Subtext',
      type: 'localizedString',
      description: 'E.g. "3 critical errors"'
    }),
    defineField({
      name: 'mockReportList1',
      title: 'Mock Report Checklist 1',
      type: 'localizedString',
      description: 'E.g. "SSL Certificate Valid"'
    }),
    defineField({
      name: 'mockReportList2',
      title: 'Mock Report Checklist 2',
      type: 'localizedString',
      description: 'E.g. "Missing sticky mobile CTA"'
    }),
    defineField({
      name: 'mockReportList3',
      title: 'Mock Report Checklist 3',
      type: 'localizedString',
      description: 'E.g. "Multiple H1 tags detected"'
    })
  ],
  preview: {
    select: { title: 'sectionLabel' },
    prepare({title}) {
      return {
        title: title || 'Site Auditor'
      }
    }
  }
})
