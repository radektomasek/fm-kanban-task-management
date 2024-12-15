import type { Meta, StoryObj } from "@storybook/react"
import { ContextMenuItem } from "@/components/menus"

const meta: Meta<typeof ContextMenuItem> = {
  title: "layout/ContextMenuItem",
  component: ContextMenuItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const StandardMenuItem: Story = {
  args: {
    title: "Standard Menu Item",
    type: "standard",
  },
}

export const DesctructiveMenuItem: Story = {
  args: {
    title: "Destructive Menu Item",
    type: "destructive",
  },
}
