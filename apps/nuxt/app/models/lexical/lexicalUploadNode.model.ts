import { z } from 'zod'

export const lexicalUploadNodeSchema = z.object({
  id: z.string(),
  relationTo: z.literal('media'),
  type: z.literal('upload'),
  value: z.object({
    id: z.number(),
    alt: z.string(),
    focalX: z.number(),
    focalY: z.number(),
    height: z.number(),
    url: z.string(),
    width: z.number(),
  }),
})

export type LexicalUploadNode = z.infer<typeof lexicalUploadNodeSchema>
