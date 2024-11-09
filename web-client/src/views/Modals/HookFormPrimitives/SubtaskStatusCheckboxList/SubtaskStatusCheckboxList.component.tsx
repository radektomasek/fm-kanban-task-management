import {
  Path,
  Controller,
  useFormContext,
  type FieldValues,
} from "react-hook-form"

import { Checkbox } from "@/components/forms"
import type { Task } from "@/types/tasks"

type Props<T extends FieldValues> = {
  id: string
  name: Path<T>
  selectedTask?: Task
  onItemCheck: (task: Task) => void
}

export function SubtaskStatusCheckboxList<T extends FieldValues>({
  name,
  selectedTask,
  onItemCheck,
  ...props
}: Props<T>) {
  const { control } = useFormContext()

  return (
    <>
      Subtasks ({selectedTask?.subtasks.completed} of{" "}
      {selectedTask?.subtasks.total})
      {selectedTask?.subtasks.data?.map((subtask, index) => (
        <Controller
          key={subtask.id}
          name={`${name}.${index}.completed`}
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              {...props}
              id={subtask.id}
              label={subtask.title}
              defaultChecked={subtask.completed}
              onUpdate={(newValue) => {
                field.onChange(newValue)
                onItemCheck({
                  ...selectedTask,
                  subtasks: {
                    ...selectedTask.subtasks,
                    data: selectedTask.subtasks.data?.map((subtask) =>
                      subtask.id === subtask.id
                        ? { ...subtask, completed: newValue }
                        : subtask
                    ),
                  },
                })
              }}
            />
          )}
        />
      ))}
    </>
  )
}
