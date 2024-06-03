import { nanoid } from "nanoid"
import { render, screen, fireEvent } from "@testing-library/react"
import { Dropdown } from "@/components/forms"

describe("Dropdown.component: behavior", () => {
  const items = ["Todo", "Doing", "Done"]

  describe("when user decide to use a mouse to control", () => {
    it("click event list the items", () => {
      const testId = nanoid()
      render(<Dropdown testId={testId} items={items} />)

      const buttonElement = screen.getByRole("combobox")
      fireEvent.click(buttonElement)

      const dropdownListElement = screen.getByTestId(`${testId}-list`)
      const list = Array.from(dropdownListElement.children).map(
        (element) => element.innerHTML
      )

      expect(list).toEqual(items)
    })

    describe("and 'onItemSelect' callback is passed", () => {
      it("triggers the callback after the item is selected", () => {
        const testId = nanoid()
        const onItemSelect = vitest.fn()
        render(
          <Dropdown testId={testId} items={items} onItemSelect={onItemSelect} />
        )

        const buttonElement = screen.getByRole("combobox")
        fireEvent.click(buttonElement)

        const selectedItem = screen.getByText(items[1])
        fireEvent.click(selectedItem)

        expect(onItemSelect).toHaveBeenCalledTimes(1)
        expect(onItemSelect).toHaveBeenCalledWith(items[1])
      })
    })
  })

  describe("when user decide to use a keyboard to control", () => {
    it("click event list the items", () => {
      const testId = nanoid()
      render(<Dropdown testId={testId} items={items} />)

      const buttonElement = screen.getByRole("combobox")
      fireEvent.keyDown(buttonElement, { key: "ArrowDown" })

      const dropdownListElement = screen.getByTestId(`${testId}-list`)
      const list = Array.from(dropdownListElement.children).map(
        (element) => element.innerHTML
      )

      expect(list).toEqual(items)
    })

    describe("and 'onItemSelect' callback is passed", () => {
      it("triggers the callback after the item is selected", () => {
        const testId = nanoid()
        const onItemSelect = vitest.fn()
        render(
          <Dropdown testId={testId} items={items} onItemSelect={onItemSelect} />
        )

        const buttonElement = screen.getByRole("combobox")

        fireEvent.keyDown(buttonElement, { key: "ArrowDown" })
        fireEvent.keyDown(buttonElement, { key: "ArrowDown" })
        fireEvent.keyDown(buttonElement, { key: "ArrowUp" })
        fireEvent.keyDown(buttonElement, { key: "ArrowDown" })
        fireEvent.keyDown(buttonElement, { key: "ArrowDown" })
        fireEvent.keyDown(buttonElement, { key: "ArrowUp" })
        fireEvent.keyDown(buttonElement, { key: "ArrowDown" })
        fireEvent.keyDown(buttonElement, { key: "ArrowDown" })
        fireEvent.keyDown(buttonElement, { key: "Enter" })

        expect(onItemSelect).toHaveBeenCalledTimes(1)
        expect(onItemSelect).toHaveBeenCalledWith(items[0])
      })
    })
  })
})
