import type { Meta, StoryObj } from "@storybook/react"
import { Logo } from "./Logo.component"

const meta: Meta<typeof Logo> = {
  title: "components/Layout/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
