import { CardStack } from "@/components/layout/content"
import { groupedCards } from "@/utils/mocks/cardGroups.mocks"
import { Button } from "@/components/forms"

export const BoardPage = () => {
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
