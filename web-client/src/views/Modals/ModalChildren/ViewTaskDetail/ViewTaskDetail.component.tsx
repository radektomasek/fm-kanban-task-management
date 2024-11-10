import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import { RowBlock } from "@/components/grid"
import { ContextMenu } from "@/components/menus"
import { taskContextMenuItems } from "@/types/contextMenus"
import { FormProvider } from "react-hook-form"
import { useTaskDetailProvider } from "@/hooks/useTaskDetailProvider"
import {
  SubtaskStatusCheckboxList,
  TaskStatusDropdown,
} from "@/views/Modals/HookFormPrimitives"
import type { ModalScreenKey } from "@/types/modals"
import type { DropdownItem } from "@/components/forms"
import type { Subtask } from "@/types/tasks"
import { useUpdateTaskDetail } from "@/services/mutations"
import {
  mergeTaskWithUpdatedColumnId,
  mergeTaskWithUpdatedSubtask,
} from "@/utils/helpers/tasks.helpers"

export const ViewTaskDetail = () => {
  const { selectedTask, selectedBoard, handleOpenModal } = useStore(
    useShallow((state) => ({
      selectedTask: state.selectedTask,
      selectedBoard: state.selectedBoard,
      handleOpenModal: state.handleOpenModal,
    }))
  )

  const methods = useTaskDetailProvider(selectedTask)

  const updateTaskDetailMutation = useUpdateTaskDetail()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleItemSelection = (item: DropdownItem) => {
    if (!selectedTask) {
      return
    }

    const payload = mergeTaskWithUpdatedColumnId(selectedTask, item.id)

    updateTaskDetailMutation.mutate(payload)
  }

  const handleItemCheck = (subtask: Subtask) => {
    if (!selectedTask) {
      return
    }

    const payload = mergeTaskWithUpdatedSubtask(selectedTask, subtask)

    updateTaskDetailMutation.mutate(payload)
  }

  return (
    <>
      <RowBlock>
        <h3 className="text-lg">{selectedTask?.title}</h3>
        <ContextMenu
          items={taskContextMenuItems}
          onItemSelect={(id: ModalScreenKey) => handleOpenModal(id)}
        />
      </RowBlock>
      <p className={"text-2xs text-custom-medium-grey my-2"}>
        {selectedTask?.description}
      </p>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <SubtaskStatusCheckboxList
            id="subtasks"
            name="subtasks"
            selectedTask={selectedTask}
            onItemCheck={handleItemCheck}
          />
          <TaskStatusDropdown
            id="status"
            name="status"
            boardId={selectedBoard?.id}
            onItemSelect={handleItemSelection}
            defaultValue={selectedTask?.columnId}
          />
        </form>
      </FormProvider>
    </>
  )
}
