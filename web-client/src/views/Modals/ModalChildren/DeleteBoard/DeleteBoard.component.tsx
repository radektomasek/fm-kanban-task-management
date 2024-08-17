import { ConfirmationDialog } from "@/views/Modals"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import { useDeleteBoard } from "@/services/mutations"

export const DeleteBoard = () => {
  const { selectedBoardId, setSelectedBoardId, handleCloseModal } = useStore(
    useShallow((state) => ({
      selectedBoardId: state.selectedBoardId,
      setSelectedBoardId: state.setSelectedBoardId,
      handleCloseModal: state.handleCloseModal,
    }))
  )

  const deleteBoardMutation = useDeleteBoard()

  const handleDeleteBoard = () => {
    if (!selectedBoardId) {
      return
    }

    deleteBoardMutation.mutate(selectedBoardId)
    setSelectedBoardId(undefined)
  }

  return (
    <ConfirmationDialog
      title="Delete this board?"
      description="Are you sure you want to delete the 'Platform Launch' board? This action will remove all columns and tasks and cannot be reversed."
      onCancel={handleCloseModal}
      onDelete={handleDeleteBoard}
    />
  )
}
