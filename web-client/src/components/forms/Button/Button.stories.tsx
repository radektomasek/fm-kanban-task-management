import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button.component"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    intent: "primary",
    children: "Button Primary (S)",
  },
}

export const Secondary: Story = {
  args: {
    intent: "secondary",
    children: "Button Secondary",
  },
}

export const Destructive: Story = {
  args: {
    intent: "destructive",
    children: "Button Destructive",
  },
}

export const Regular: Story = {
  args: {
    size: "regular",
    children: "Button Primary (S)",
  },
}

export const Large: Story = {
  args: {
    size: "large",
    children: "Button Primary (L)",
  },
}
