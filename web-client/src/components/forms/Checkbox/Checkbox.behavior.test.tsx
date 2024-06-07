import { nanoid } from "nanoid"
import { render, screen, fireEvent } from "@testing-library/react"
import { Checkbox } from "@/components/forms"

describe("Checkbox.component: behavior", () => {
  describe("when 'onUpdate' callback is passed", () => {
    it("triggers the callback function when checkbox is clicked", () => {
      const testId = nanoid()
      const label = "Default component"
      const handleUpdate = vitest.fn()

      render(
        <Checkbox
          id={label}
          label={label}
          testId={testId}
          onUpdate={handleUpdate}
        />
      )

      const checkboxElement = screen.getByTestId(testId)
      fireEvent.click(checkboxElement)

      expect(handleUpdate).toBeCalledTimes(1)
      expect(handleUpdate).toBeCalledWith(true)
    })
  })
})
