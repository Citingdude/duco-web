import { getLinkField } from '@payload/fields/link/link.field'
import type { Field, GroupField } from 'payload'

export interface GetButtonFieldOptions {
  name: string
  label: GroupField['label']
}

export function getButtonField({ name, label }: GetButtonFieldOptions): GroupField {
  const fields: Field[] = [
    {
      name: 'label',
      required: true,
      type: 'text',
    },
    {
      name: 'ctaVariant',
      defaultValue: 'primary',
      enumName: 'button_variant',
      label: 'Variant',
      options: [
        {
          label: 'Primary',
          value: 'primary',
        },
        {
          label: 'Secondary',
          value: 'secondary',
        },
      ],
      type: 'select',
    },
    getLinkField({
      disableLabel: true,
    }),
  ]

  return {
    name,
    fields,
    label,
    type: 'group',
  }
}
