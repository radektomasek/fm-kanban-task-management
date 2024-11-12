import { FormProvider, SubmitHandler, useFieldArray } from "react-hook-form"
import { useTaskFormProvider } from "@/hooks/useTaskFormProvider"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import type { TaskForm } from "@/types/tasks"
import {
  CustomTextField,
  TaskStatusDropdown,
} from "@/views/Modals/HookFormPrimitives"
import { Fragment } from "react"
import { RowBlock } from "@/components/grid"
import { Button, type DropdownItem } from "@/components/forms"

export const AddEditTaskForm = () => {
  const methods = useTaskFormProvider()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  const { activeModal, selectedBoard, handleCloseModal } = useStore(
    useShallow((state) => ({
      activeModal: state.activeModal,
      selectedBoard: state.selectedBoard,
      handleCloseModal: state.handleCloseModal,
    }))
  )

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  })

  const isEditMode = activeModal === "EditTaskScreen"

  const handleAddSubtask = () => {
    append({ title: "" })
  }

  const handleRemoveSubtask = (index: number) => remove(index)

  const handleDropdownItemSelection = (item: DropdownItem) => {
    console.log(item)
  }

  const onSubmit: SubmitHandler<TaskForm> = (data: TaskForm) => {
    if (data.variant === "create") {
      console.log("create task")
    } else {
      console.log("update task")
    }

    handleCloseModal()
  }

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-lg">{isEditMode ? "Edit Task" : "Add New Task"}</h3>

        <label
          className={"text-2xs text-custom-medium-grey my-2"}
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
          className={"text-2xs text-custom-medium-grey my-2"}
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

        <label className={"text-2xs text-custom-medium-grey my-4"}>
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
          className="w-full my-4"
          onClick={handleAddSubtask}
        >
          + Add New Subtask
        </Button>

        <TaskStatusDropdown
          id="columnId"
          name="columnId"
          title={"Status"}
          boardId={selectedBoard?.id}
          // defaultValue={}
          onItemSelect={handleDropdownItemSelection}
        />

        <Button type={"submit"} intent={"primary"} className="w-full">
          {isEditMode ? "Save Changes" : "Create Task"}
        </Button>
      </form>
    </FormProvider>
  )
}
