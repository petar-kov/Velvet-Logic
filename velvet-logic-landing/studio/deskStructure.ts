export const myStructure = (S: any) =>
  S.list()
    .title('Velvet Logic Studio')
    .items([
      // 1. Dedicated Home Page entry at the very top
      S.listItem()
        .title('Home Page Content')
        .id('home-page')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('home-page')
        ),

      S.divider(),

      // 2. Grouped folder for static/global config
      S.listItem()
        .title('Site Assets')
        .child(
          S.list()
            .title('Assets & Global Config')
            .items([
              S.listItem()
                .title('Navigation Items')
                .id('navigation')
                .child(
                  S.document()
                    .schemaType('navigation')
                    .documentId('navigation')
                ),
              S.listItem()
                .title('SEO & Site Settings')
                .id('settings')
                .child(
                  S.document()
                    .schemaType('settings')
                    .documentId('settings')
                ),
            ])
        ),

      // 3. Hide all singleton/object types from the generic 'All Documents' list
      ...S.documentTypeListItems().filter(
        (listItem: any) => !['homePage', 'navigation', 'settings', 'hero', 'values', 'process', 'testimonials', 'contact'].includes(listItem.getId())
      ),
    ]);
