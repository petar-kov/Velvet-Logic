# Sanity Page Builder Pro — High-Performance CMS Skill ✨

This skill informs **Antigravity** and **Claude** on how to build elite, professional-grade Sanity CMS architectures using a **Unified Singleton & Page Builder** pattern. It is designed for maximum SEO control, visual editing, and multi-language support.

## 🚀 Core Philosophy
1.  **Unified Singleton:** Every page (e.g., Home Page) is a single document (`_id: "home-page"`).
2.  **Modular Sections:** All sections (Hero, Values, etc.) are **Objects** inside an array on that singleton.
3.  **Visual First:** Enable Sanity Presentation and Stega for "Point-and-Click" content editing.
4.  **Global Assets:** Group Navigation, Settings, and Branding in a "Site Assets" folder.
5.  **SEO Authority:** Provide H1-H4 tag selectors for every heading.

---

## 🛠️ Schema Recipes

### 1. Localized String (Multi-language Support)
```typescript
{
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    { name: 'en', title: 'English', type: 'string' },
    { name: 'sr', title: 'Serbian', type: 'string' }
  ]
}
```

### 2. The Page Builder Singleton
```typescript
{
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'values' },
        { type: 'testimonials' },
        { type: 'process' },
        { type: 'contact' }
      ]
    }
  ]
}
```

### 3. Professional SVG Control
Always include a fallback for Lucide icons:
```typescript
{ name: 'icon', title: 'Lucide Icon Name', type: 'string' },
{ name: 'iconCustom', title: 'Custom SVG Upload', type: 'image' }
```

### 4. SEO Header Controls
Allow editors to define the HTML tag:
```typescript
{
  name: 'headingTag',
  title: 'SEO Tag',
  type: 'string',
  options: {
    list: [
      { title: 'H1', value: 'h1' }, { title: 'H2', value: 'h2' }, { title: 'Span', value: 'span' }
    ]
  }
}
```

### 5. Modular "Lego Blocks" (Reusable Objects)

#### A. Standard Button
```typescript
{
  name: 'ctaButton',
  title: 'Button',
  type: 'object',
  fields: [
    { name: 'text', title: 'Button Text', type: 'localizedString' },
    { name: 'url', title: 'Link (URL)', type: 'string' },
    { 
      name: 'style', 
      title: 'Style', 
      type: 'string',
      options: { list: ['primary', 'secondary', 'outline'] }
    }
  ]
}
```

#### B. Pro Image Block (SEO Ready)
```typescript
{
  name: 'proImage',
  title: 'Image Block',
  type: 'object',
  fields: [
    { name: 'image', title: 'Source', type: 'image', options: { hotspot: true } },
    { name: 'alt', title: 'Alt Text (SEO)', type: 'string' },
    { name: 'caption', title: 'Caption', type: 'localizedString' }
  ]
}
```

#### C. Accordion / FAQ Item
```typescript
{
  name: 'accordionItem',
  title: 'Accordion Item',
  type: 'object',
  fields: [
    { name: 'question', title: 'Question', type: 'localizedString' },
    { name: 'answer', title: 'Answer', type: 'localizedBlockContent' }
  ]
}
```

---

## 🎨 Visual Editing Handshake (Frontend)


To activate visual editing in **Vite**, update your `sanity.js` client:

```javascript
import { createClient } from '@sanity/client';
const isPreview = window.location.search.includes('preview=true');

export const client = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  useCdn: !isPreview,
  perspective: isPreview ? 'previewDrafts' : 'published',
  token: isPreview ? VITE_TOKEN : undefined,
  stega: { enabled: isPreview, studioUrl: '/studio' }
});
```

And render the `<VisualEditing />` listener in your `App.jsx`.

---

## 📁 Structure Builder (Desk Structure)
Organize the sidebar to pin the Home Page to the top:

```typescript
export const myStructure = (S) =>
  S.list()
    .title('Velvet Logic CMS')
    .items([
      // 1. PIN HOME PAGE
      S.listItem()
        .title('Home Page Content')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('home-page')),
      
      S.divider(),

      // 2. GROUP SITE ASSETS
      S.listItem()
        .title('Site Assets')
        .child(
          S.list()
            .title('Site Assets')
            .items([
               S.documentListItem().id('navigation').schemaType('navigation').title('Navigation'),
               S.documentListItem().id('settings').schemaType('settings').title('SEO & Settings')
            ])
        ),
      
      // 3. HIDE RAW TYPES
      ...S.documentTypeListItems().filter(item => !['homePage', 'hero', 'values'].includes(item.getId()))
    ]);
```

🏆 **This Skill ensures every site built is as logical as it is velvet.**
