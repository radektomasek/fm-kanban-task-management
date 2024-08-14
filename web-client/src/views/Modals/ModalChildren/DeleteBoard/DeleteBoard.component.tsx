import { ConfirmationDialog } from "@/views/Modals"

export const DeleteBoard = () => {
  return (
    <ConfirmationDialog
      title="Delete this board?"
      description="Are you sure you want to delete the 'Platform Launch' board? This action will remove all columns and tasks and cannot be reversed."
      onCancel={() => {}}
      onDelete={() => {}}
    />
  )
}
