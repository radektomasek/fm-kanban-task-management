import type { Task } from "@/types/tasks"
import { useForm } from "react-hook-form"

export function useTaskDetailProvider(task?: Task) {
  return useForm({
    mode: "all",
    defaultValues: {
      status: task?.columnId,
      subtasks:
        task?.subtasks.data?.map((subtask) => ({
          id: subtask.id,
          title: subtask.title,
          completed: subtask.completed,
        })) ?? [],
    },
  })
}
