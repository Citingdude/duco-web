import { getSlugField } from '@payload/fields/slug/slug.field'
import type { CollectionConfig } from 'payload'

export const referenceCollection: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: [
      'title',
    ],
    listSearchableFields: [
      'title',
    ],
    useAsTitle: 'title',
  },
  fields: [
    ...getSlugField(),
    {
      name: 'type',
      admin: {
        position: 'sidebar',
      },
      options: [
        'case',
        'gallery',
      ],
      required: true,
      type: 'select',
    },
    {
      name: 'productType',
      admin: {
        position: 'sidebar',
      },
      relationTo: 'productTypes',
      type: 'relationship',
    },
    {
      name: 'title',
      localized: true,
      required: true,
      type: 'text',
    },
    {
      name: 'image',
      relationTo: 'images',
      required: true,
      type: 'upload',
    },

  ],
  lockDocuments: {
    duration: 300,
  },
  slug: 'references',
  versions: {
    drafts: {
      autosave: {
        interval: 2000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
