import type { Meta, StoryObj } from "@storybook/react"
import { GroupHeader } from "./GroupHeader.component"
import { groupedCards } from "@/utils/mocks/cardGroups.mocks"

const meta: Meta<typeof GroupHeader> = {
  title: "Content/GroupHeader",
  component: GroupHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: groupedCards[0].title,
    circleColor: groupedCards[0].circleColor,
    numberOfItems: groupedCards[0].cards.length,
  },
}
