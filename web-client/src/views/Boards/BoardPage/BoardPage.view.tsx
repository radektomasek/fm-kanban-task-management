import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { CardStack } from "@/components/layout/content"
import { Button } from "@/components/forms"
import { useShallow } from "zustand/react/shallow"
import { useStore } from "@/store/store"
import { useBoardColumns, useBoards, useBoardTasks } from "@/services/queries"
import { EmptyBoard } from "@/views/Placeholders"

export const BoardPage = () => {
  const { boardId } = useParams()
  const { setSelectedBoard, handleOpenModal } = useStore(
    useShallow((state) => ({
      setSelectedBoard: state.setSelectedBoard,
      handleOpenModal: state.handleOpenModal,
    }))
  )
  const { data: boards } = useBoards()
  const { data: columns } = useBoardColumns(boardId)
  const { data: tasks } = useBoardTasks(boardId)

  useEffect(() => {
    const board = boards?.find((element) => element.id === boardId)
    setSelectedBoard(board)
  }, [setSelectedBoard, boardId])

  if (columns?.length === 0) {
    return <EmptyBoard />
  }

  return (
    <div className="bg-custom-light-grey flex-grow border-t-[1px] flex w-full dark:bg-custom-very-dark-grey dark:border-t-[#3E3F4E]">
      <div className="grid grid-flow-col auto-cols-min gap-x-6 p-6 overflow-x-auto">
        {columns?.map((column) => (
          <CardStack
            key={column.id}
            id={column.id}
            title={column.name}
            circleColor={column.color}
            cards={(tasks ?? []).filter(
              (element) => element.columnId === column.id
            )}
          />
        ))}
        <Button
          className={"mt-8 "}
          intent={"gridItem"}
          onClick={() => handleOpenModal("EditBoardScreen")}
        >
          + New Column
        </Button>
      </div>
    </div>
  )
}
