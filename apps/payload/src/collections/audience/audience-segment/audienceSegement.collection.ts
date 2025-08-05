import { getSlugField } from '@payload/fields/slug/slug.field'
import type { CollectionConfig } from 'payload'

export const audienceSegmentCollection: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: [
      'title',
      'slug',
    ],
    listSearchableFields: [
      'title',
      'slug',
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
      required: true,
      type: 'upload',
    },
    {
      name: 'description',
      localized: true,
      required: true,
      type: 'text',
    },
  ],
  lockDocuments: {
    duration: 300,
  },
  slug: 'audienceSegment',
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
