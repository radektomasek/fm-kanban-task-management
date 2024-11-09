import type { Subtask, Task, TaskDetailSchema } from "@/types/tasks"

export const mergeTaskWithUpdatedColumnId = (
  task: Task,
  columnId: string
): TaskDetailSchema => {
  const {
    id,
    title,
    boardId,
    description,
    subtasks: { data: subtasks },
  } = task

  return {
    id: id,
    columnId,
    title,
    boardId,
    description,
    subtasks,
  }
}

export const mergeTaskWithUpdatedSubtask = (
  task: Task,
  updatedSubtask: Subtask
): TaskDetailSchema => {}
