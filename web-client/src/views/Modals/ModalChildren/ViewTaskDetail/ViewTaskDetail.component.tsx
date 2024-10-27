import { Checkbox, DropdownItem } from "@/components/forms"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import { RowBlock } from "@/components/grid"
import { ContextMenu } from "@/components/menus"
import { taskContextMenuItems } from "@/types/contextMenus"
import type { ModalScreenKey } from "@/types/modals"
import { FormProvider } from "react-hook-form"
import { useTaskDetailProvider } from "@/hooks/useTaskDetailProvider"
import { StatusDropdown } from "@/views/Modals/HookFormPrimitives"

export const ViewTaskDetail = () => {
  const { selectedTask, selectedBoard, handleOpenModal } = useStore(
    useShallow((state) => ({
      selectedTask: state.selectedTask,
      selectedBoard: state.selectedBoard,
      handleOpenModal: state.handleOpenModal,
    }))
  )

  const methods = useTaskDetailProvider(selectedTask)

  const itemSelectionHandler = (item: DropdownItem) => {
    console.log(item)
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
        <form>
          Subtasks ({selectedTask?.subtasks.completed} of{" "}
          {selectedTask?.subtasks.total})
          {selectedTask?.subtasks.data?.map((subtask) => (
            <Checkbox
              key={subtask.id}
              id={subtask.id}
              label={subtask.title}
              checked={subtask.completed}
            />
          ))}
          <StatusDropdown
            id="status"
            name="status"
            boardId={selectedBoard?.id}
            itemSelectionHandler={itemSelectionHandler}
          />
        </form>
      </FormProvider>
    </>
  )
}
