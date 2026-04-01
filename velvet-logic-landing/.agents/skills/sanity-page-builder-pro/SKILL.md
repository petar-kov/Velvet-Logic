---
name: sanity-page-builder-pro
description: Expert Sanity Page Builder Skill for Antigravity & Claude. Unified Singletons, SEO Semantic Tagging, and High-Performance Site-wide Round-trips.
---

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

---

## 🎨 Frontend Implementations (React/Vite)

### 1. Unified Site Fetch (The Performance King)
To reduce round-trips, fetch your entire global state (page, nav, and settings) in a single request:

```javascript
const query = `*[_id in ["home-page", "navigation", "settings"]] { _id, _type, ... }`;

client.fetch(query).then(data => {
  const home = data.find(d => d._id === 'home-page');
  const navigation = data.find(d => d._id === 'navigation');
  const settings = data.find(d => d._id === 'settings');
  
  // Custom mapping for site-wide availability
  setSanityState({ home, navigation, settings });
});
```

### 2. Dynamic Semantic Heading (SEO Ready)
Create a reusable component to handle the Sanity `headingTag` choice:

```javascript
const DynamicHeading = ({ tag = 'h2', children, animate, ...props }) => {
  const Tag = (tag || 'h2').toLowerCase();
  const Component = animate ? motion[Tag] : Tag;
  return <Component {...props}>{children}</Component>;
};
```

---

## 📁 Architecture Tips & Learnings

### 🔧 Deep Content Migrations
When converting a site to this modular structure, always scan **nested arrays** (like card lists or testimonial quotes). If the schema expects an array but the data is a string, the Studio will throw a hard error. 
*   **Fix:** Use a migration script to recursively wrap strings in block objects: `[{ _type: 'block', children: [...] }]`.

### ⚠️ Import Conflicts (Vercel Build Killers)
When merging multiple Sanity features (like Image handling and Client fetching), avoid duplicate `import { client }` statements. Standardizing on a single `import { client, urlFor } from './sanity'` at the very top is crucial for preventing role-down build failures on Vercel.

### 🛡️ Security Check
Never hardcode **Write Tokens** in your production scripts. Always use `process.env.SANITY_TOKEN` to prevent critical keys from appearing in Git logs.

🏆 **This blueprint ensures every site built is as logical as it is velvet.**
