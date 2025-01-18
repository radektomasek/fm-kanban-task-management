import { z } from "zod"

export const createColumnSchema = z.array(
  z.object({
    projectId: z.string(),
    boardId: z.string(),
    name: z.string(),
  })
)

export const updateColumnSchema = z.array(
  z.object({
    projectId: z.string(),
    boardId: z.string(),
    name: z.string(),
    columnId: z.string().optional(),
  })
)
