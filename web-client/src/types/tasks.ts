import { z } from "zod"

export const subtaskSchema = z.object({
  id: z.string(),
  taskId: z.string(),
  title: z.string(),
  completed: z.boolean(),
})

export const aggregatedSubtaskSchema = z.object({
  total: z.number(),
  completed: z.number(),
  data: z.array(subtaskSchema).optional(),
})

export const taskSchema = z.object({
  id: z.string(),
  boardId: z.string(),
  columnId: z.string(),
  title: z.string(),
  description: z.string(),
  subtasks: aggregatedSubtaskSchema,
})

export const taskDetailSchema = z.object({
  id: z.string(),
  boardId: z.string(),
  columnId: z.string(),
  title: z.string(),
  description: z.string(),
  subtasks: z.array(subtaskSchema).optional(),
})

export const taskDeleteSchema = z.object({
  id: z.string(),
  message: z.string(),
})

export type Task = z.infer<typeof taskSchema>
export type Subtask = z.infer<typeof subtaskSchema>
export type AggregatedSubtask = z.infer<typeof aggregatedSubtaskSchema>
export type TaskDetailSchema = z.infer<typeof taskDetailSchema>
export type TaskDelete = z.infer<typeof taskDeleteSchema>
