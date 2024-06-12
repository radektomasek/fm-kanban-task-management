import { nanoid } from "nanoid"
import { fireEvent, render, screen } from "@testing-library/react"
import { ContextMenuItem } from "@/components/menus"

describe("ContextMenuItem.component: behavior", () => {
  describe("and 'onOptionClick' callback is passed", () => {
    it("triggers the callback after the item is selected", () => {
      const id = nanoid()
      const title = "A standard element"
      const onOptionClick = vitest.fn()
      render(
        <ContextMenuItem
          id={id}
          onOptionClick={onOptionClick}
          title={title}
          type={"standard"}
        />
      )

      const listItemElement = screen.getByRole("listitem")
      fireEvent.click(listItemElement)

      expect(onOptionClick).toHaveBeenCalledTimes(1)
      expect(onOptionClick).toHaveBeenCalledWith(id)
    })
  })
})
