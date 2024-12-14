import { FormProvider, SubmitHandler, useFieldArray } from "react-hook-form"
import { useTaskFormProvider } from "@/hooks/useTaskFormProvider"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import type { TaskForm } from "@/types/tasks"
import {
  CustomTextField,
  TaskStatusDropdown,
} from "@/views/Modals/HookFormPrimitives"
import { Fragment, useEffect } from "react"
import { RowBlock } from "@/components/grid"
import { Button, type DropdownItem } from "@/components/forms"
import { useCreateTask, useUpdateTask } from "@/services/mutations"
import { useBoardColumns } from "@/services/queries"

export const AddEditTaskForm = () => {
  const methods = useTaskFormProvider()

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods

  const { activeModal, selectedBoard, selectedTask, handleCloseModal } =
    useStore(
      useShallow((state) => ({
        activeModal: state.activeModal,
        selectedTask: state.selectedTask,
        selectedBoard: state.selectedBoard,
        handleCloseModal: state.handleCloseModal,
      }))
    )

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  })

  const isEditMode = activeModal === "EditTaskScreen"
  const createTaskMutation = useCreateTask(selectedBoard?.id)
  const editTaskMutation = useUpdateTask(selectedBoard?.id)
  const { data: boardColumns = [] } = useBoardColumns(selectedBoard?.id)

  useEffect(() => {
    if (isEditMode) {
      reset({
        variant: "edit",
        id: selectedTask?.id,
        title: selectedTask?.title,
        description: selectedTask?.description,
        columnId: selectedTask?.columnId,
        subtasks: (selectedTask?.subtasks?.data ?? []).map((element) => ({
          id: element.id,
          title: element.title,
        })),
      })

      if (selectedTask?.columnId) {
        setValue("columnId", selectedTask.columnId)
      }
    }
  }, [
    selectedTask?.id,
    selectedTask?.title,
    selectedTask?.subtasks?.data,
    selectedTask?.columnId,
    isEditMode,
    reset,
    setValue,
  ])

  useEffect(() => {
    if (!isEditMode && boardColumns.length > 0) {
      const defaultColumnId = boardColumns[0]?.id
      setValue("columnId", defaultColumnId)
    }
  }, [isEditMode, boardColumns, setValue])

  const handleAddSubtask = () => {
    append({ title: "" })
  }

  const handleRemoveSubtask = (index: number) => remove(index)

  const handleDropdownItemSelection = (item: DropdownItem) => {
    setValue("columnId", item.id)
  }

  const onSubmit: SubmitHandler<TaskForm> = (data: TaskForm) => {
    if (data.variant === "create") {
      createTaskMutation.mutate(data)
    } else {
      editTaskMutation.mutate(data)
    }

    handleCloseModal()
  }

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-lg dark:text-custom-white">
          {isEditMode ? "Edit Task" : "Add New Task"}
        </h3>

        <label
          className={
            "text-2xs text-custom-medium-grey my-2 dark:text-custom-white"
          }
          htmlFor={"title"}
        >
          Title
        </label>

        <CustomTextField
          id="title"
          name="title"
          placeholder="e.g. Take coffee break"
          errorText={errors?.title?.message}
        />

        <label
          className={
            "text-2xs text-custom-medium-grey my-2 dark:text-custom-white"
          }
          htmlFor={"description"}
        >
          Description
        </label>

        <CustomTextField
          id="description"
          name="description"
          placeholder="e.g. It's always good to take a break"
          errorText={errors?.description?.message}
        />

        <label
          className={
            "text-2xs text-custom-medium-grey my-4 dark:text-custom-white"
          }
        >
          Subtasks
        </label>

        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <RowBlock>
              <CustomTextField
                id={`subtasks.${index}.title`}
                name={`subtasks.${index}.title`}
                placeholder="e.g. Make coffee"
                errorText={errors?.subtasks?.[index]?.title?.message}
              />
              <Button
                wrapped={true}
                iconName={"cross"}
                onClick={() => {
                  handleRemoveSubtask(index)
                }}
                intent={"svgOnly"}
              />
            </RowBlock>
          </Fragment>
        ))}
        <Button
          type={"submit"}
          intent={"secondary"}
          className="w-full"
          onClick={handleAddSubtask}
        >
          + Add New Subtask
        </Button>

        <TaskStatusDropdown
          id="columnId"
          name="columnId"
          title={"Status"}
          boardId={selectedBoard?.id}
          defaultValue={selectedTask?.columnId}
          onItemSelect={handleDropdownItemSelection}
        />

        <Button type={"submit"} intent={"primary"} className="w-full mt-6">
          {isEditMode ? "Save Changes" : "Create Task"}
        </Button>
      </form>
    </FormProvider>
  )
}
