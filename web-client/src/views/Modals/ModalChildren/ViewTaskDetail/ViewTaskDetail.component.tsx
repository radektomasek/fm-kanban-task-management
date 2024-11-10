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
import { useBoardTaskDetail } from "@/services/queries"
import { useLayoutEffect } from "react"

export const ViewTaskDetail = () => {
  const { selectedTask, selectedBoard, handleOpenModal, handleCloseModal } =
    useStore(
      useShallow((state) => ({
        selectedTask: state.selectedTask,
        selectedBoard: state.selectedBoard,
        handleOpenModal: state.handleOpenModal,
        handleCloseModal: state.handleCloseModal,
      }))
    )

  const { data: activeTask } = useBoardTaskDetail(
    selectedBoard?.id,
    selectedTask?.id
  )

  useLayoutEffect(() => {
    // This check make sure when the app is fully refreshed,
    // it hides the modal to ensure the data consistency.
    // @TODO: Find a better way how to handle the hard refresh for the modal screens.
    if (!activeTask?.columnId) {
      handleCloseModal()
    }
  }, [])

  const methods = useTaskDetailProvider(selectedTask)

  const updateTaskDetailMutation = useUpdateTaskDetail()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleItemSelection = (item: DropdownItem) => {
    if (!activeTask) {
      return
    }
    const payload = mergeTaskWithUpdatedColumnId(activeTask, item.id)
    updateTaskDetailMutation.mutate(payload)
  }

  const handleItemCheck = (subtask: Subtask) => {
    if (!activeTask) {
      return
    }
    const payload = mergeTaskWithUpdatedSubtask(activeTask, subtask)
    updateTaskDetailMutation.mutate(payload)
  }

  return (
    <>
      <RowBlock>
        <h3 className="text-lg">{activeTask?.title}</h3>
        <ContextMenu
          items={taskContextMenuItems}
          onItemSelect={(id: ModalScreenKey) => handleOpenModal(id)}
        />
      </RowBlock>
      <p className={"text-2xs text-custom-medium-grey my-2"}>
        {activeTask?.description}
      </p>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <SubtaskStatusCheckboxList
            id="subtasks"
            name="subtasks"
            selectedTask={activeTask}
            onItemCheck={handleItemCheck}
          />
          <TaskStatusDropdown
            id="status"
            name="status"
            boardId={selectedBoard?.id}
            onItemSelect={handleItemSelection}
            defaultValue={activeTask?.columnId}
          />
        </form>
      </FormProvider>
    </>
  )
}
