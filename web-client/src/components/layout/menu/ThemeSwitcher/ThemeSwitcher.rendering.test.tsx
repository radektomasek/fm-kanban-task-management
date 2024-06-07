import { render, screen } from "@testing-library/react"
import { ThemeSwitcher } from "@/components/layout/menu"
import { nanoid } from "nanoid"

describe("ThemeSwitcher.component: rendering", () => {
  describe("when default props are passed", () => {
    it("light theme is selected, checkbox unchecked", () => {
      const testId = nanoid()

      render(<ThemeSwitcher testId={testId} />)

      const element = screen.getByTestId(`${testId}-input`) as HTMLInputElement
      expect(element.checked).toEqual(false)
    })
  })

  describe("when light theme is passed as a default value", () => {
    it("light theme is selected, checkbox unchecked", () => {
      const testId = nanoid()

      render(<ThemeSwitcher testId={testId} default="light" />)

      const element = screen.getByTestId(`${testId}-input`) as HTMLInputElement
      expect(element.checked).toEqual(false)
    })
  })

  describe("when a dark theme is a passed as a default value", () => {
    it("dark theme is selected, checkbox ticked", () => {
      const testId = nanoid()

      render(<ThemeSwitcher testId={testId} default="dark" />)

      const element = screen.getByTestId(`${testId}-input`) as HTMLInputElement
      expect(element.checked).toEqual(true)
    })
  })
})
