import { z } from 'zod'

export const lexicalTextNodeSchema = z.object({
  format: z.number(),
  text: z.string().optional(),
  type: z.literal('text'),
})

export type LexicalTextNode = z.infer<typeof lexicalTextNodeSchema>
