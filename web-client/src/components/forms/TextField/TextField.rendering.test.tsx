import { render, screen } from "@testing-library/react"
import { TextField } from "./TextField.component"
import { nanoid } from "nanoid"

describe("Checkbox.component: rendering", () => {
  describe("when the component is rendered with no error", () => {
    it("renders the component with no error message", () => {
      const testId = nanoid()

      render(<TextField testId={testId} placeholder="Enter task name" />)

      const textFieldElement = screen.queryByTestId(testId)
      const errorTextElement = screen.queryByTestId(`${testId}-error`)

      expect(textFieldElement).not.toBeNull()
      expect(errorTextElement).toBeNull()
    })
  })

  describe("when the component is rendered with an error", () => {
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
