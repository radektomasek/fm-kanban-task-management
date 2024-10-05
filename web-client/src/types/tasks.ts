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
})

export const taskSchema = z.object({
  id: z.string(),
  boardId: z.string(),
  columnId: z.string(),
  title: z.string(),
  subtasks: z.union([z.array(subtaskSchema), aggregatedSubtaskSchema]),
})

export type Task = z.infer<typeof taskSchema>
export type Subtask = z.infer<typeof subtaskSchema>
export type AggregatedSubtask = z.infer<typeof aggregatedSubtaskSchema>

export type TaskWithSubtasks = Omit<Task, "subtasks"> & { subtasks: Subtask[] }
export type TaskWithAggregatedSubtasks = Omit<Task, "subtasks"> & {
  subtasks: AggregatedSubtask
}

export const isAggregatedSubtask = (
  subtasks: AggregatedSubtask | Subtask[]
): subtasks is AggregatedSubtask => {
  return !Array.isArray(subtasks)
}
