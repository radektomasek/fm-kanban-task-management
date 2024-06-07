import type { Meta, StoryObj } from "@storybook/react"
import { SidebarHeader } from "./SidebarHeader.component"

const meta: Meta<typeof SidebarHeader> = {
  title: "components/Layout/SidebarHeader",
  component: SidebarHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    title: "All boards",
    numberOfBoards: 0,
  },
}

export const Populated: Story = {
  args: {
    title: "All boards",
    numberOfBoards: 3,
  },
}
