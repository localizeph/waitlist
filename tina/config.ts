import { defineConfig } from 'tinacms';

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'changelog',
        label: 'Changelog',
        path: 'content/changelog',
        format: 'json',
        ui: {
          allowedActions: { create: true, delete: true },
        },
        fields: [
          { name: 'version', label: 'Version', type: 'string', required: true },
          { name: 'date', label: 'Date', type: 'string', required: true },
          {
            name: 'title',
            label: 'Title',
            type: 'string',
            isTitle: true,
            required: true,
          },
          {
            name: 'description',
            label: 'Description',
            type: 'string',
            ui: { component: 'textarea' },
          },
          { name: 'items', label: 'Bullet Items', type: 'string', list: true },
          { name: 'image', label: 'Image', type: 'image' },
          {
            name: 'button',
            label: 'Button',
            type: 'object',
            fields: [
              { name: 'url', label: 'URL', type: 'string' },
              { name: 'text', label: 'Text', type: 'string' },
            ],
          },
        ],
      },
    ],
  },
});
