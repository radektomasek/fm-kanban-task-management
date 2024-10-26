import { ConfirmationDialog } from "@/views/Modals"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import { useDeleteBoard } from "@/services/mutations"

export const DeleteTask = () => {
  const { selectedBoard, clearSelectedBoard, handleCloseModal } = useStore(
    useShallow((state) => ({
      selectedBoard: state.selectedBoard,
      clearSelectedBoard: state.clearSelectedBoard,
      handleCloseModal: state.handleCloseModal,
    }))
  )

  const deleteBoardMutation = useDeleteBoard()

  const handleDeleteBoard = () => {
    if (!selectedBoard) {
      return
    }

    deleteBoardMutation.mutate(selectedBoard.id)
    clearSelectedBoard()
    handleCloseModal()
  }

  return (
    <ConfirmationDialog
      title="Delete this board?"
      description={`Are you sure you want to delete the '${selectedBoard?.name}' board? This action will remove all columns and tasks and cannot be reversed.`}
      onCancel={handleCloseModal}
      onDelete={handleDeleteBoard}
    />
  )
}
