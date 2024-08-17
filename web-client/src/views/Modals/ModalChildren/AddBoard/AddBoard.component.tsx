import { Button } from "@/components/forms"
import { RowBlock } from "@/components/grid"
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form"
import { BoardForm } from "@/types/boards"
import { CustomTextField } from "@/views/Modals/HookFormPrimitives"
import { Fragment } from "react"
import { useCreateBoard } from "@/services/mutations"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"

export const AddBoard = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useFormContext<BoardForm>()

  const { handleCloseModal } = useStore(
    useShallow((state) => ({
      handleCloseModal: state.handleCloseModal,
    }))
  )

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  })

  const createBoardMutation = useCreateBoard()

  const handleAddColumn = () => {
    append({ name: "" })
  }

  const isSubmittable = isDirty && isValid

  const onSubmit: SubmitHandler<BoardForm> = (data: BoardForm) => {
    if (data.variant === "create") {
      createBoardMutation.mutate(data)
    }

    handleCloseModal()
  }

  return (
    <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-lg">Add New Board</h3>

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

      <label className={"text-2xs text-custom-medium-grey my-4"}>Columns</label>

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
                remove(index)
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

      <Button
        disabled={!isSubmittable}
        type={"submit"}
        intent={"primary"}
        className="w-full"
      >
        Create New Board
      </Button>
    </form>
  )
}
