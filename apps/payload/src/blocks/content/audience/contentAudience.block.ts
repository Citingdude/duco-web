import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import { getButtonField } from '@payload/fields/button/button.field'
import type { Block } from 'payload'

export const contentAudienceBlock: Block = {
  admin: {
    group: BLOCK_GROUPS.content,
  },
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      name: 'body',
      type: 'richText',
    },
    {
      name: 'buttons',
      fields: [
        getButtonField({
          name: 'button',
          label: 'Button',
        }),
      ],
      maxRows: 2,
      type: 'array',
    },
    {
      hasMany: true,
      name: 'audienceSegmants',
      maxRows: 3,
      relationTo: 'audienceSegment',
      type: 'relationship',
    },
  ],
  interfaceName: 'AudienceBlock',
  labels: {
    plural: 'Audience blocks',
    singular: 'Audience block',
  },
  slug: 'audience',
}
