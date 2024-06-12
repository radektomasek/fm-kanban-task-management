import { nanoid } from "nanoid"
import { render, screen } from "@testing-library/react"
import { ContextMenu } from "@/components/menus"
import { boardContextMenuItems } from "@/utils/mocks/menus.mocks"

describe("ContextMenu.component: rendering", () => {
  it("renders the SVG button with the context menu closed", () => {
    const testId = nanoid()
    render(<ContextMenu testId={testId} items={boardContextMenuItems} />)

    const contextMenuElement = screen.getByTestId(`${testId}-button`)
    const contextMenuItems = screen.queryByTestId(`${testId}-list`)

    expect(contextMenuElement).not.toBeNull()
    expect(contextMenuItems).toBeNull()
  })
})
