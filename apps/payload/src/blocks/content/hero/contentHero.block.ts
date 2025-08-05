import { BLOCK_GROUPS } from '@payload/blocks/blockGroups'
import { getImageField } from '@payload/fields/media/image.field'
import { getHighlightTitleField } from '@payload/fields/title/highlightTitle.field'
import type { Block } from 'payload'

export const contentHeroBlock: Block = {
  admin: {
    group: BLOCK_GROUPS.hero,
  },
  fields: [
    {
      name: 'subtitle',
      required: true,
      type: 'text',
    },
    getHighlightTitleField({
      required: true,
    }),
    {
      name: 'body',
      required: true,
      type: 'richText',
    },
    getImageField({
      name: 'backgroundImage',
      label: 'Background image',
    }),
    {
      hasMany: true,
      name: 'productsTypes',
      maxRows: 3,
      relationTo: 'productTypes',
      type: 'relationship',
    },
  ],
  interfaceName: 'HeroBlock',
  labels: {
    plural: 'Hero blocks',
    singular: 'Hero block',
  },
  slug: 'hero',
}
