import { nanoid } from "nanoid"
import { render, screen } from "@testing-library/react"
import { TextField } from "@/components/forms"

describe("Checkbox.component: rendering", () => {
  describe("when the component is loaded with no error", () => {
    it("renders the component with no error message", () => {
      const testId = nanoid()

      render(<TextField testId={testId} placeholder="Enter task name" />)

      const textFieldElement = screen.queryByTestId(testId)
      const errorTextElement = screen.queryByTestId(`${testId}-error`)

      expect(textFieldElement).not.toBeNull()
      expect(errorTextElement).toBeNull()
    })
  })

  describe("when the component is loaded with an error", () => {
    it("renders the component with an error message displayed", () => {
      const testId = nanoid()

      render(
        <TextField
          testId={testId}
          placeholder="Enter task name"
          errorText="Can't be empty"
        />
      )

      const textFieldElement = screen.queryByTestId(testId)
      const errorTextElement = screen.queryByTestId(`${testId}-error`)

      expect(textFieldElement).not.toBeNull()
      expect(errorTextElement).not.toBeNull()
    })
  })
})
