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
        name: 'nav',
        label: 'Navigation',
        path: 'content/config',
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        match: { include: 'nav' },
        fields: [
          {
            name: 'header',
            label: 'Header Links',
            type: 'object',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title ?? 'Untitled' }),
            },
            fields: [
              { name: 'title', type: 'string', label: 'Title' },
              { name: 'href', type: 'string', label: 'Href' },
            ],
          },
          {
            name: 'footer',
            label: 'Footer',
            type: 'object',
            fields: [
              {
                name: 'menuItems',
                label: 'Menu Sections',
                type: 'object',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title ?? 'Untitled Section' }),
                },
                fields: [
                  { name: 'title', type: 'string' },
                  {
                    name: 'links',
                    type: 'object',
                    list: true,
                    ui: {
                      itemProps: (item) => ({ label: item?.text ?? 'Untitled Link' }),
                    },
                    fields: [
                      { name: 'text', type: 'string' },
                      { name: 'url', type: 'string' },
                    ],
                  },
                ],
              },
              { name: 'copyright', type: 'string', label: 'Copyright Text' },
              {
                name: 'bottomLinks',
                label: 'Bottom Links',
                type: 'object',
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.text ?? 'Untitled Link' }),
                },
                fields: [
                  { name: 'text', type: 'string' },
                  { name: 'url', type: 'string' },
                ],
              },
            ],
          },
        ],
      },
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