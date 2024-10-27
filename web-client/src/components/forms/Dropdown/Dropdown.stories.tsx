import type { Meta, StoryObj } from "@storybook/react"
import { Dropdown } from "@/components/forms"

const meta: Meta<typeof Dropdown> = {
  title: "Components/Forms/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
    docs: {
      story: {
        height: "12rem",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {
  args: {
    items: [
      { id: "todo", name: "Todo" },
      { id: "doing", name: "Doing" },
      { id: "done", name: "Done" },
    ],
  },
}
