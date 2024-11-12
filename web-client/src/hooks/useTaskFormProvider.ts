import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  type TaskForm,
  taskFormSchema,
  defaultTaskFormValues,
} from "@/types/tasks"

export function useTaskFormProvider() {
  return useForm<TaskForm>({
    mode: "all",
    resolver: zodResolver(taskFormSchema),
    defaultValues: defaultTaskFormValues,
  })
}
