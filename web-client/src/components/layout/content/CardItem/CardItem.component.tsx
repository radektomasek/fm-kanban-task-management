import { useShallow } from "zustand/react/shallow"
import { useStore } from "@/store/store"
import type {
  AggregatedSubtask,
  TaskWithAggregatedSubtasks,
} from "@/types/tasks"

export const CardItem = ({
  id,
  title,
  subtasks,
}: TaskWithAggregatedSubtasks) => {
  const { handleOpenModal, setSelectedTaskId } = useStore(
    useShallow((state) => ({
      setSelectedTaskId: state.setSelectedTaskId,
      handleOpenModal: state.handleOpenModal,
    }))
  )

  const handleOnClick = () => {
    setSelectedTaskId(id)
    handleOpenModal("ViewTaskDetailScreen")
  }

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    // We can preserve the original Tab functionality
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
      className="flex flex-col bg-custom-white rounded-lg px-5 py-5 gap-y-1.5 cursor-pointer"
      aria-label={`View Task: ${title}. ${getSubtasksLabel(subtasks)} ${getSubtasksSuffix(subtasks)}`}
    >
      <h3 className="text-base">{title}</h3>
      <h4 className="text-2xs text-custom-medium-grey">
        {getSubtasksLabel(subtasks)}
      </h4>
    </div>
  )
}
