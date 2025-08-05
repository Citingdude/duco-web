import { z } from 'zod'

import { lexicalTextNodeSchema } from './lexicalTextNode.model'

export const lexicalHeadingNodeSchema = z.object({
  tag: z.enum([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ]),
  type: z.literal('heading'),
  children: lexicalTextNodeSchema.array(),
})

export type LexicalHeadingNode = z.infer<typeof lexicalHeadingNodeSchema>
