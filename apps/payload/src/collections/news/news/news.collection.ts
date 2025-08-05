import { getSlugField } from '@payload/fields/slug/slug.field'
import type { CollectionConfig } from 'payload'

export const newsCollection: CollectionConfig = {
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
  slug: 'news',
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
