import { useShallow } from "zustand/react/shallow"
import { useStore } from "@/store/store"
import type { Task, AggregatedSubtask } from "@/types/tasks"
import { useBoardTaskDetail } from "@/services/queries"

export const CardItem = ({ id, title, subtasks }: Task) => {
  const { handleOpenModal, setSelectedTask, selectedBoard } = useStore(
    useShallow((state) => ({
      setSelectedTask: state.setSelectedTask,
      handleOpenModal: state.handleOpenModal,
      selectedBoard: state.selectedBoard,
    }))
  )

  const { data: task } = useBoardTaskDetail(selectedBoard?.id, id)

  const handleOnClick = () => {
    setSelectedTask(task)
    handleOpenModal("ViewTaskDetailScreen")
  }

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      return
    }

    event.preventDefault()

    if (event.key === "Enter" || event.key === " ") {
      handleOnClick()
    }
  }

  const getSubtasksLabel = ({ completed, total }: AggregatedSubtask) => {
    return total === 0
      ? `${total} subtasks`
      : `${completed} of ${total} subtasks`
  }

  const getSubtasksSuffix = ({ completed }: AggregatedSubtask) => {
    return completed > 0 ? "completed" : "created"
  }

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      className="flex flex-col bg-custom-white rounded-lg px-5 py-5 gap-y-1.5 cursor-pointer dark:bg-custom-dark-grey dark:text-custom-white"
      aria-label={`View Task: ${title}. ${getSubtasksLabel(subtasks)} ${getSubtasksSuffix(subtasks)}`}
    >
      <h3 className="text-base">{title}</h3>
      <h4 className="text-2xs text-custom-medium-grey">
        {getSubtasksLabel(subtasks)}
      </h4>
    </div>
  )
}
