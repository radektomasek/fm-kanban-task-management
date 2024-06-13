import { type CardGroup } from "@/utils/mocks/cardGroups.mocks"
import { CardItem, GroupHeader } from "@/components/layout/content"

export const CardStack = ({ id, title, circleColor, cards }: CardGroup) => {
  return (
    <div className={"w-72 flex flex-col gap-y-4"}>
      <GroupHeader
        id={id}
        title={title}
        circleColor={circleColor}
        numberOfItems={cards.length}
      />
      {cards.map((card) => (
        <CardItem key={card.id} {...card} />
      ))}
    </div>
  )
}
