import { Button } from "@/components/forms"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"

export const EmptyProject = () => {
  const { handleOpenModal } = useStore(
    useShallow((state) => ({
      handleOpenModal: state.handleOpenModal,
    }))
  )

  return (
    <div className="flex bg-custom-light-grey flex-grow border-t-2 flex-col w-28 justify-center items-center gap-y-6">
      <p className="text-lg text-custom-medium-grey">
        No board found. Create a new board to get started.
      </p>
      <Button
        className="w-40"
        onClick={() => handleOpenModal("AddBoardScreen")}
      >
        + Add New Board
      </Button>
    </div>
  )
}
