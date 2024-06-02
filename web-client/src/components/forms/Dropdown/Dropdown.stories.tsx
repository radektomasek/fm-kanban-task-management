import type { Meta, StoryObj } from "@storybook/react"
import { Dropdown } from "./Dropdown.component"

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {
  args: {
    items: ["Todo", "Doing", "Done"],
  },
}
