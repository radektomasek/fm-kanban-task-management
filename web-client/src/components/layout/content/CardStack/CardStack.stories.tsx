import type { Meta, StoryObj } from "@storybook/react"
import { CardStack } from "./CardStack.component"
import { groupedCards } from "@/utils/mocks/cardGroups.mocks"

const meta: Meta<typeof CardStack> = {
  title: "Content/CardStack",
  component: CardStack,
  parameters: {
    layout: "left",
    backgrounds: {
      default: "board",
      values: [{ name: "board", value: "#F2F6FDFF" }],
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: groupedCards[0].title,
    circleColor: groupedCards[0].circleColor,
    cards: groupedCards[0].cards,
  },
  render: (args) => <CardStack {...args} />,
}
