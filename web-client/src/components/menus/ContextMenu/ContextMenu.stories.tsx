import type { Meta, StoryObj } from "@storybook/react"
import { ContextMenu } from "@/components/menus"

const meta: Meta<typeof ContextMenu> = {
  title: "layout/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const SvgButton: Story = {
  args: {},
}
