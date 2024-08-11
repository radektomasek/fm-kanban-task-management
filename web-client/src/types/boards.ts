import { z } from "zod"

export const boardSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type Board = z.infer<typeof boardSchema>
