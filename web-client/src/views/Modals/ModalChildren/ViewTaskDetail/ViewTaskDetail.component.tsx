import { Checkbox } from "@/components/forms"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import { RowBlock } from "@/components/grid"
import { ContextMenu } from "@/components/menus"
import { taskContextMenuItems } from "@/types/contextMenus"
import type { ModalScreenKey } from "@/types/modals"

export const ViewTaskDetail = () => {
  const { selectedTask, handleOpenModal } = useStore(
    useShallow((state) => ({
      selectedTask: state.selectedTask,
      handleOpenModal: state.handleOpenModal,
    }))
  )

  return (
    <>
      <RowBlock>
        <h3 className="text-lg">{selectedTask?.title}</h3>
        <ContextMenu
          items={taskContextMenuItems}
          onItemSelect={(id: ModalScreenKey) => handleOpenModal(id)}
        />
      </RowBlock>
      <p>{selectedTask?.description}</p>
      Subtasks ({selectedTask?.subtasks.completed} of{" "}
      {selectedTask?.subtasks.total}) Checkbox
      {selectedTask?.subtasks.data?.map((subtask) => (
        <Checkbox
          key={subtask.id}
          id={subtask.id}
          label={subtask.title}
          checked={subtask.completed}
        />
      ))}
    </>
  )
}
