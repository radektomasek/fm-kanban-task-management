import { Fragment, useEffect } from "react"
import { Button } from "@/components/forms"
import { RowBlock } from "@/components/grid"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import { useCreateBoard, useEditBoard } from "@/services/mutations"
import { CustomTextField } from "@/views/Modals/HookFormPrimitives"
import type { BoardForm } from "@/types/boards"
import { useBoardColumns } from "@/services/queries"
import { FormProvider, SubmitHandler, useFieldArray } from "react-hook-form"
import { useBoardFormProvider } from "@/hooks/useBoardFormProvider"

export const AddEditBoardForm = () => {
  const methods = useBoardFormProvider()

  const {
    reset,
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
    name: "columns",
  })

  const isEditMode = activeModal === "EditBoardScreen"
  const createBoardMutation = useCreateBoard()
  const editBoardMutation = useEditBoard()
  const boardColumnData = useBoardColumns(selectedBoard?.id)

  useEffect(() => {
    if (isEditMode) {
      reset({
        variant: "edit",
        id: selectedBoard?.id,
        name: selectedBoard?.name,
        columns: boardColumnData.data?.map((element) => ({
          id: element.id,
          name: element.name,
        })),
      })
    }
  }, [
    boardColumnData.data,
    selectedBoard?.id,
    selectedBoard?.name,
    isEditMode,
    reset,
  ])

  const handleAddColumn = () => {
    append({ name: "" })
  }

  const handleRemoveColumn = (index: number) => remove(index)

  const onSubmit: SubmitHandler<BoardForm> = (data: BoardForm) => {
    if (data.variant === "create") {
      createBoardMutation.mutate(data)
    } else {
      editBoardMutation.mutate(data)
    }

    handleCloseModal()
  }

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-lg dark:text-custom-white">
          {isEditMode ? "Edit Board" : "Add New Board"}
        </h3>

        <label
          className={"text-2xs text-custom-medium-grey my-2"}
          htmlFor={"name"}
        >
          Name
        </label>

        <CustomTextField
          id="name"
          name="name"
          placeholder="e.g. Web Design"
          errorText={errors?.name?.message}
        />

        <label className={"text-2xs text-custom-medium-grey my-4"}>
          Columns
        </label>

        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <RowBlock>
              <CustomTextField
                id={`columns.${index}.name`}
                name={`columns.${index}.name`}
                placeholder="e.g. Done"
                errorText={errors?.columns?.[index]?.name?.message}
              />
              <Button
                wrapped={true}
                iconName={"cross"}
                onClick={() => {
                  handleRemoveColumn(index)
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
          onClick={handleAddColumn}
        >
          + Add New Column
        </Button>

        <Button type={"submit"} intent={"primary"} className="w-full">
          {isEditMode ? "Save Changes" : "Create New Board"}
        </Button>
      </form>
    </FormProvider>
  )
}
