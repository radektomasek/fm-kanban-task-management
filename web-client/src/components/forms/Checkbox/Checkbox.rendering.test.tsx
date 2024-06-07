import { render, screen } from "@testing-library/react"
import { Checkbox } from "@/components/forms"
import { nanoid } from "nanoid"

describe("Checkbox.component: rendering", () => {
  describe("when default props are passed", () => {
    it("renders a component with 'not checked' state", () => {
      const testId = nanoid()
      const label = "Default component"

      render(<Checkbox id={label} label={label} testId={testId} />)

      const checkboxContainer = screen.getByTestId(testId)
      const checkboxElement = checkboxContainer.children[0] as HTMLInputElement
      const labelElement = checkboxContainer.children[1] as HTMLLabelElement

      expect(checkboxElement).not.toBeNull()
      expect(checkboxElement.checked).toBeFalsy()
      expect(labelElement.className).not.toContain("line-through")
    })
  })

  describe("when props default value set to 'true' is passed", () => {
    it("renders a component with 'checked' state", () => {
      const testId = nanoid()
      const label = "Checked component"

      render(
        <Checkbox id={label} label={label} testId={testId} default={true} />
      )

      const checkboxContainer = screen.getByTestId(testId)
      const checkboxElement = checkboxContainer.children[0] as HTMLInputElement
      const labelElement = checkboxContainer.children[1] as HTMLLabelElement

      expect(checkboxElement).not.toBeNull()
      expect(checkboxElement.checked).toBeTruthy()
      expect(labelElement.className).toContain("line-through")
    })
  })
})
