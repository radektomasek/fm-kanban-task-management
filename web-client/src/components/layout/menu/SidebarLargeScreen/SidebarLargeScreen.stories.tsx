import type { Meta, StoryObj } from "@storybook/react"
import { SidebarLargeScreen } from "@/components/layout/menu"
import { boards } from "@/utils/mocks/boards.mocks"

const meta: Meta<typeof SidebarLargeScreen> = {
  title: "Layout/SidebarLargeScreen",
  component: SidebarLargeScreen,
  parameters: {
    layout: "left",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    boards,
  },
  render: (args) => <SidebarLargeScreen {...args} />,
}
