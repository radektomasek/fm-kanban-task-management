import { nanoid } from "nanoid"
import { render, screen } from "@testing-library/react"
import { Dropdown } from "@/components/forms"

describe("Dropdown.component: rendering", () => {
  describe("when the component is rendered by default", () => {
    it("renders with the first selected element from the items array", () => {
      const testId = nanoid()
      const items = [
        { id: "todo", name: "Todo" },
        { id: "doing", name: "Doing" },
        { id: "done", name: "Done" },
      ]

      render(<Dropdown testId={testId} items={items} />)

      const dropdownElement = screen.getByTestId(testId)
      const firstChild = dropdownElement.children[0].innerHTML

      expect(firstChild, items[0].name)
    })
  })
})
