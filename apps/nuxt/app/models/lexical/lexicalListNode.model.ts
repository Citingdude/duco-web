import { z } from 'zod'

import { lexicalTextNodeSchema } from './lexicalTextNode.model'

export const lexicalListItemSchema = z.object({
  type: z.literal('listitem'),
  children: lexicalTextNodeSchema.array(),
})

export const lexicalListNodeSchema = z.object({
  tag: z.enum([
    'ul',
    'ol',
  ]),
  type: z.literal('list'),
  children: lexicalListItemSchema.array(),
})

export type LexicalListItem = z.infer<typeof lexicalListItemSchema>
export type LexicalListNode = z.infer<typeof lexicalListNodeSchema>
