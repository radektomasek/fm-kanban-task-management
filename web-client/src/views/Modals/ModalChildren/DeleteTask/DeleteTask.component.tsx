import { ConfirmationDialog } from "@/views/Modals"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import { useDeleteTask } from "@/services/mutations"

export const DeleteTask = () => {
  const { selectedTask, selectedBoard, clearSelectedTask, handleCloseModal } =
    useStore(
      useShallow((state) => ({
        selectedBoard: state.selectedBoard,
        selectedTask: state.selectedTask,
        clearSelectedTask: state.clearSelectedTask,
        handleCloseModal: state.handleCloseModal,
      }))
    )

  const deleteTaskMutation = useDeleteTask()

  const handleDeleteTask = () => {
    if (!selectedTask || !selectedBoard) {
      return
    }

    deleteTaskMutation.mutate({
      taskId: selectedTask.id,
      boardId: selectedBoard.id,
    })
    clearSelectedTask()
    handleCloseModal()
  }

  return (
    <ConfirmationDialog
      title="Delete this task?"
      description={`Are you sure you want to delete the ‘${selectedTask?.title}’ task and its subtasks? This action cannot be reversed.`}
      onCancel={handleCloseModal}
      onDelete={handleDeleteTask}
    />
  )
}
