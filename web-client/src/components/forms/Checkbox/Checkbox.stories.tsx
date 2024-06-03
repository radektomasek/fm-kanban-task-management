import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "./Checkbox.component"

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {
  args: {
    id: "idle-example",
    label: "Idle",
  },
}

export const Completed: Story = {
  args: {
    id: "completed-example",
    label: "Completed",
    default: true,
  },
}
