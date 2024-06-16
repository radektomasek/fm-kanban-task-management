import { type CardGroup } from "@/utils/mocks/cardGroups.mocks"
import { CardItem, GroupHeader } from "@/components/layout/content"

type Props = CardGroup & {
  readonly testId?: string
}

export const CardStack = ({ id, title, circleColor, cards, testId }: Props) => {
  return (
    <div data-testid={testId} className={"w-72 flex flex-col gap-y-4"}>
      <GroupHeader
        id={id}
        title={title}
        circleColor={circleColor}
        numberOfItems={cards.length}
      />
      {cards.length > 0 &&
        cards.map((card) => <CardItem key={card.id} {...card} />)}
    </div>
  )
}
