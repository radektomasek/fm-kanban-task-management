import { z } from "zod"

export const boardColumnSchema = z.object({
  id: z.string(),
  boardId: z.string(),
  name: z.string(),
  color: z.string(),
})

export type BoardColumn = z.infer<typeof boardColumnSchema>
