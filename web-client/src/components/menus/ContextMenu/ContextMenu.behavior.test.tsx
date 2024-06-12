import { nanoid } from "nanoid"
import { fireEvent, render, screen } from "@testing-library/react"
import { ContextMenu } from "@/components/menus"
import { boardContextMenuItems } from "@/utils/mocks/menus.mocks"

describe("ContextMenu.component: behavior", () => {
  describe("when user clicks on the button with the mouse", () => {
    it("opens the context context menu", () => {
      const testId = nanoid()
      render(<ContextMenu testId={testId} items={boardContextMenuItems} />)

      const contextMenuElement = screen.getByTestId(`${testId}-button`)
      fireEvent.click(contextMenuElement)

      const contextMenuItems = screen.queryByTestId(`${testId}-list`)

      expect(contextMenuElement).not.toBeNull()
      expect(contextMenuItems).not.toBeNull()
    })

    describe("and select the first element", () => {
      it("passes the id of the element to the callback if provided", () => {
        const testId = nanoid()
        const onItemSelect = vitest.fn()
        render(
          <ContextMenu
            items={boardContextMenuItems}
            testId={testId}
            onItemSelect={onItemSelect}
          />
        )

        const contextMenuElement = screen.getByTestId(`${testId}-button`)
        fireEvent.click(contextMenuElement)

        const contextMenuItems = screen.queryByTestId(
          `${testId}-list`
        ) as HTMLElement
        fireEvent.click(contextMenuItems.children[0])

        expect(onItemSelect).toBeCalledTimes(1)
        expect(onItemSelect).toBeCalledWith(boardContextMenuItems[0].id)
      })
    })
  })

  describe("when user clicks on the button with the keyboard", () => {
    it("opens the context context menu", () => {
      const testId = nanoid()
      render(<ContextMenu items={boardContextMenuItems} testId={testId} />)

      const contextMenuElement = screen.getByTestId(`${testId}-button`)
      fireEvent.keyDown(contextMenuElement, { key: "ArrowDown" })

      const contextMenuItems = screen.queryByTestId(`${testId}-list`)

      expect(contextMenuElement).not.toBeNull()
      expect(contextMenuItems).not.toBeNull()
    })

    describe("and select the second element", () => {
      it("passes the id of the element to the callback if provided", () => {
        const testId = nanoid()
        const onItemSelect = vitest.fn()
        render(
          <ContextMenu
            items={boardContextMenuItems}
            testId={testId}
            onItemSelect={onItemSelect}
          />
        )

        const contextMenuElement = screen.getByTestId(`${testId}-button`)

        fireEvent.keyDown(contextMenuElement, { key: "Enter" })
        fireEvent.keyDown(contextMenuElement, { key: "ArrowDown" })
        fireEvent.keyDown(contextMenuElement, { key: "Enter" })

        expect(onItemSelect).toBeCalledTimes(1)
        expect(onItemSelect).toBeCalledWith(boardContextMenuItems[1].id)
      })
    })
  })
})
