import { getSlugField } from '@payload/fields/slug/slug.field'
import type { CollectionConfig } from 'payload'

export const environmentCollection: CollectionConfig = {
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
      name: 'icon',
      relationTo: 'icons',
      type: 'upload',
    },
  ],
  lockDocuments: {
    duration: 300,
  },
  slug: 'environments',
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
