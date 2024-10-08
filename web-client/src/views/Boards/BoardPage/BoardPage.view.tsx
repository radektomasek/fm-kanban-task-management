import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { CardStack } from "@/components/layout/content"
import { Button } from "@/components/forms"
import { useShallow } from "zustand/react/shallow"
import { useStore } from "@/store/store"
import { groupedCards } from "@/utils/mocks/cardGroups.mocks"
import { useBoards } from "@/services/queries"

export const BoardPage = () => {
  const { boardId } = useParams()
  const { setSelectedBoard } = useStore(
    useShallow((state) => ({
      setSelectedBoard: state.setSelectedBoard,
    }))
  )

  const { data } = useBoards()

  useEffect(() => {
    const board = data?.find((element) => element.id === boardId)
    setSelectedBoard(board)
  }, [setSelectedBoard, boardId])

  return (
    <div className="bg-custom-light-grey flex-grow border-t-2 flex-col w-28">
      <div className="grid grid-flow-col auto-cols-min gap-x-6 pl-6 pt-6">
        {groupedCards.map((group) => (
          <CardStack
            key={group.id}
            id={group.id}
            cards={group.cards}
            title={group.title}
            circleColor={group.circleColor}
          />
        ))}
        <Button className={"mt-8"} intent={"gridItem"}>
          + New Column
        </Button>
      </div>
    </div>
  )
}
