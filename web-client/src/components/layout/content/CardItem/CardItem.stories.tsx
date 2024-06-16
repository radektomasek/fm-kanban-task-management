import type { Meta, StoryObj } from "@storybook/react"
import { CardItem } from "./CardItem.component"
import { cards } from "@/utils/mocks/cards.mocks"

const meta: Meta<typeof CardItem> = {
  title: "Content/CardItem",
  component: CardItem,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "board",
      values: [{ name: "board", value: "#F2F6FDFF" }],
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: cards[0].title,
    completedSubtasks: cards[0].completedSubtasks,
    allSubtasks: cards[0].allSubtasks,
  },
}
