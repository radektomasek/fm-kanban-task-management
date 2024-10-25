import { Checkbox } from "@/components/forms"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import { useBoardTaskDetail } from "@/services/queries"

export const ViewTaskDetail = () => {
  const { selectedBoard, selectedTaskId } = useStore(
    useShallow((state) => ({
      selectedTaskId: state.selectedTaskId,
      selectedBoard: state.selectedBoard,
    }))
  )

  const { data: task } = useBoardTaskDetail(selectedBoard?.id, selectedTaskId)

  if (!task) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h3 className="text-lg">{task.title}</h3>
      <p>{task.description}</p>
      Subtasks (2 of 3) Checkbox
      {task.subtasks.map((subtask) => (
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
