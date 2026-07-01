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

  // Public, safe fallbacks so the embedded Studio loads even without a local
  // .env (mirrors src/sanity/client.ts).
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2pg6mq7a',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
