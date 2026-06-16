import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Quest Web App',

  // Embedded at /studio in the Next.js app — without this the Studio
  // router reads the "studio" URL segment as a tool ("Tool not found: studio").
  basePath: '/studio',

  projectId: '2pg6mq7a',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
