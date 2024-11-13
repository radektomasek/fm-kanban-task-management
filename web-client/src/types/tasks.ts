import { z } from "zod"
import { fieldErrorTooLong, fieldErrorTooShort } from "@/types/constants"

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

export const taskFormSchema = z.discriminatedUnion("variant", [
  z.object({
    variant: z.literal("create"),
    title: z
      .string()
      .min(1, { message: fieldErrorTooShort })
      .max(20, { message: fieldErrorTooLong }),
    description: z.string().min(1, { message: fieldErrorTooShort }),
    subtasks: z.array(
      z.object({
        title: z.string().min(1, { message: fieldErrorTooShort }),
      })
    ),
    columnId: z.string(),
  }),
  z.object({
    variant: z.literal("edit"),
    id: z.string(),
    title: z.string().min(1, { message: fieldErrorTooShort }),
    description: z.string().min(1, { message: fieldErrorTooShort }),
    subtasks: z.array(
      z.object({
        id: z.optional(z.string()),
        title: z.string().min(1, { message: fieldErrorTooShort }),
      })
    ),
    columnId: z.string(),
  }),
])

export type Task = z.infer<typeof taskSchema>
export type Subtask = z.infer<typeof subtaskSchema>
export type AggregatedSubtask = z.infer<typeof aggregatedSubtaskSchema>
export type TaskDetail = z.infer<typeof taskDetailSchema>
export type TaskDelete = z.infer<typeof taskDeleteSchema>
export type TaskForm = z.infer<typeof taskFormSchema>

export const isCreateTaskForm = (
  data: TaskForm
): data is Extract<TaskForm, { variant: "create" }> => {
  return data.variant === "create"
}

export const isEditTaskForm = (
  data: TaskForm
): data is Extract<TaskForm, { variant: "edit" }> => {
  return data.variant === "edit"
}

export const defaultTaskFormValues: TaskForm = {
  variant: "create",
  title: "",
  description: "",
  subtasks: [{ title: "" }, { title: "" }],
  columnId: "",
}
