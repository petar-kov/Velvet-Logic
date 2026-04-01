import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {myStructure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Velvet Logic',

  projectId: '0mihymp4',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: myStructure,
    }),
    presentationTool({
      previewUrl: {
        origin: 'https://www.velvetlogicagency.com',
        preview: '/?preview=true',
      }
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
