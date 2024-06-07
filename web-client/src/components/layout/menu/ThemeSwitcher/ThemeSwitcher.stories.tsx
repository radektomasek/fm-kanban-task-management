import type { Meta, StoryObj } from "@storybook/react"
import { ThemeSwitcher } from "./ThemeSwitcher.component"

const meta: Meta<typeof ThemeSwitcher> = {
  title: "Components/Layout/ThemeSwitcher",
  component: ThemeSwitcher,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
