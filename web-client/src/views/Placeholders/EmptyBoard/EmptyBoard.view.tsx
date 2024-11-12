import { Button } from "@/components/forms"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"

export const EmptyBoard = () => {
  const { handleOpenModal } = useStore(
    useShallow((state) => ({
      handleOpenModal: state.handleOpenModal,
    }))
  )

  return (
    <div className="flex bg-custom-light-grey flex-grow border-t-2 flex-col w-28 justify-center items-center gap-y-6">
      <p className="text-lg text-custom-medium-grey">
        This board is empty. Create a new column to get started.
      </p>
      <Button
        className="w-40"
        onClick={() => handleOpenModal("EditBoardScreen")}
      >
        + Add New Column
      </Button>
    </div>
  )
}
