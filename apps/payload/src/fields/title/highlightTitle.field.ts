import { BoldFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'

export interface GetHighlightTitleFieldOptions {
  name?: string
  required: boolean
}
export function getHighlightTitleField({
  name = 'highlightTitle',
  required,
}: GetHighlightTitleFieldOptions): Field {
  return {
    name,
    editor: lexicalEditor({
      features: [
        BoldFeature(),
      ],
    }),
    required,
    type: 'richText',
  }
}
