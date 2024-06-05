import type { Meta, StoryObj } from "@storybook/react"
import { Sidebar } from "./Sidebar.component"
import { boards } from "@/utils/mocks/boards.mocks"

const meta: Meta<typeof Sidebar> = {
  title: "Layout/Sidebar",
  component: Sidebar,
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
  render: (args) => <Sidebar {...args} />,
}
