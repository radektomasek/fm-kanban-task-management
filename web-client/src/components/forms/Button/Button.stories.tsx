import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button.component"

const meta: Meta<typeof Button> = {
  title: "Components/Forms/Button",
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

export const SidebarActive: Story = {
  args: {
    intent: "sidebar",
    children: "Platform Launch",
    active: true,
  },
}

export const SidebarInactive: Story = {
  args: {
    intent: "sidebar",
    children: "Platform Launch",
    active: false,
  },
}

export const SidebarToggleDefault: Story = {
  args: {
    intent: "sidebar",
    children: "Hide Sidebar",
    iconName: "eye",
    wrapped: false,
    active: false,
  },
}

export const SidebarToggleWrapped: Story = {
  args: {
    intent: "sidebar",
    children: "Hide Sidebar",
    iconName: "eye",
    wrapped: true,
    active: false,
  },
}

export const SvgOnly: Story = {
  args: {
    intent: "svgOnly",
    iconName: "dots",
    children: "Hidden Title",
  },
}

export const GridItem: Story = {
  args: {
    intent: "gridItem",
    children: "+ New Column",
  },
}

export const Large: Story = {
  args: {
    size: "large",
    children: "Button Primary (L)",
  },
}
