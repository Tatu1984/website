import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
// Define and export your schema types here
export const schemaTypes = [];

export default defineConfig({
  name: 'default',
  title: 'Infinititech Partners CMS',

  projectId: 'nwa9weet', // Replace with your Project ID from Step 3
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})