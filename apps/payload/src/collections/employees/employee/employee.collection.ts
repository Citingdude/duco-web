import type { CollectionConfig } from 'payload'

export const employeeCollection: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: [
      'name',
    ],
    listSearchableFields: [
      'name',
    ],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      localized: true,
      required: true,
      type: 'text',
    },
    {
      name: 'image',
      relationTo: 'images',
      type: 'upload',
    },
    {
      name: 'role',
      localized: true,
      type: 'text',
    },
  ],
  lockDocuments: {
    duration: 300,
  },
  slug: 'employees',
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
