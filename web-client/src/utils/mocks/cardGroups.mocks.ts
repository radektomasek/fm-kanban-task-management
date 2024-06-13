import { cards, type Card } from "@/utils/mocks/cards.mocks"
import { generateStatusColor } from "@/utils/helpers/colors.helpers"

export type CardGroupHeader = {
  id: string
  title: string
  circleColor: string
}

export type CardGroup = CardGroupHeader & {
  cards: Card[]
}

export const groupedCards: CardGroup[] = [
  {
    id: "e-55dZDINc",
    title: "Todo",
    circleColor: generateStatusColor(),
    cards: [...cards.filter((card) => card.status === "todo")],
  },
  {
    id: "mVgWw6y5e6",
    title: "Doing",
    circleColor: generateStatusColor(),
    cards: [...cards.filter((card) => card.status === "doing")],
  },
  {
    id: "Qnit6ESA4q",
    title: "Done",
    circleColor: generateStatusColor(),
    cards: [...cards.filter((card) => card.status === "done")],
  },
]
