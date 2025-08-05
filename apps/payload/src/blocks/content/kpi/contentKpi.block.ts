import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import { getButtonField } from '@payload/fields/button/button.field'
import type { Block } from 'payload'

export const contentKpiBlock: Block = {
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
      name: 'kpiItems',
      fields: [
        {
          name: 'kpi',
          fields: [
            {
              name: 'title',
              required: true,
              type: 'text',
            },
            {
              name: 'value',
              required: true,
              type: 'text',
            },
            {
              name: 'subtitle',
              required: true,
              type: 'text',
            },
          ],
          type: 'group',
        },
      ],
      maxRows: 3,
      type: 'array',
    },
    {
      name: 'body',
      type: 'richText',
    },
  ],
  interfaceName: 'KpiBlock',
  labels: {
    plural: 'Kpi blocks',
    singular: 'Kpi block',
  },
  slug: 'kpi',
}
