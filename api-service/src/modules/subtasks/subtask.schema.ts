import { z } from "zod"

export const createSubtaskSchema = z.array(
  z.object({
    taskId: z.string(),
    title: z.string(),
    completed: z.boolean(),
  })
)

export const updateSubtasksSchema = z.array(
  z.object({
    id: z.string().optional(),
    taskId: z.string(),
    title: z.string(),
    completed: z.boolean(),
  })
)
