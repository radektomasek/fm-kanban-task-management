import type { Meta, StoryObj } from "@storybook/react"
import { Navbar } from "./Navbar.component"

const meta: Meta<typeof Navbar> = {
  title: "Layout/Navbar",
  component: Navbar,
  parameters: {
    layout: "left",
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => <Navbar {...args} />,
}
