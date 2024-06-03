import type { Meta, StoryObj } from "@storybook/react"
import { TextField } from "./TextField.component"

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {
  args: {
    placeholder: "Enter task name",
  },
}

export const Active: Story = {
  args: {
    placeholder: "Enter task name",
    default: "Building a slideshow",
  },
}

export const Error: Story = {
  args: {
    placeholder: "Enter task name",
    errorText: "Can't be empty",
  },
}
