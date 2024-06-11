import { nanoid } from "nanoid"
import { render, screen, fireEvent } from "@testing-library/react"
import { ThemeSwitcher } from "@/components/layout/menu"
import { Dropdown } from "@/components/forms"

describe("ThemeSwitcher.component: behavior", () => {
  describe("when 'onThemeUpdate' callback is passed", () => {
    describe("and component is set in light mode", () => {
      it("pass the 'dark' as a callback when triggered", () => {
        const testId = nanoid()
        const onThemeUpdate = vitest.fn()

        render(
          <ThemeSwitcher
            testId={testId}
            onThemeUpdate={onThemeUpdate}
            default="light"
          />
        )

        const element = screen.getByTestId(testId)
        fireEvent.click(element)

        expect(onThemeUpdate).toBeCalledTimes(1)
        expect(onThemeUpdate).toBeCalledWith("dark")
      })
    })

    describe("and component is set in dark mode", () => {
      it("pass the 'light' as a callback when triggered", () => {
        const testId = nanoid()
        const onThemeUpdate = vitest.fn()

        render(
          <ThemeSwitcher
            testId={testId}
            onThemeUpdate={onThemeUpdate}
            default="dark"
          />
        )

        const element = screen.getByTestId(testId)
        fireEvent.click(element)

        expect(onThemeUpdate).toBeCalledTimes(1)
        expect(onThemeUpdate).toBeCalledWith("light")
      })
    })
  })

  describe("when the user choose keyboard for the state change", () => {
    describe("and the 'Enter' key is pressed", () => {
      it("toggles the state", () => {
        const testId = nanoid()
        const onThemeUpdate = vitest.fn()

        render(
          <ThemeSwitcher
            testId={testId}
            default="light"
            onThemeUpdate={onThemeUpdate}
          />
        )

        const themeSwitcherElement = screen.getByTestId(testId)

        fireEvent.keyDown(themeSwitcherElement, { key: "Enter" })
        fireEvent.keyDown(themeSwitcherElement, { key: "Enter" })
        fireEvent.keyDown(themeSwitcherElement, { key: "Enter" })

        expect(onThemeUpdate).toHaveBeenNthCalledWith(1, "dark")
        expect(onThemeUpdate).toHaveBeenNthCalledWith(2, "light")
        expect(onThemeUpdate).toHaveBeenNthCalledWith(3, "dark")
      })
    })

    describe("and the 'Left and Right Arrow' keys are pressed", () => {
      it("toggles the state", () => {
        const testId = nanoid()
        const onThemeUpdate = vitest.fn()

        render(
          <ThemeSwitcher
            testId={testId}
            default="dark"
            onThemeUpdate={onThemeUpdate}
          />
        )

        const themeSwitcherElement = screen.getByTestId(testId)

        fireEvent.keyDown(themeSwitcherElement, { key: "ArrowRight" })
        fireEvent.keyDown(themeSwitcherElement, { key: "ArrowRight" })
        fireEvent.keyDown(themeSwitcherElement, { key: "ArrowRight" })
        fireEvent.keyDown(themeSwitcherElement, { key: "ArrowLeft" })

        expect(onThemeUpdate).toHaveBeenNthCalledWith(1, "light")
        expect(onThemeUpdate).toHaveBeenNthCalledWith(2, "dark")
        expect(onThemeUpdate).toHaveBeenNthCalledWith(3, "light")
        expect(onThemeUpdate).toHaveBeenNthCalledWith(4, "dark")
      })
    })
  })
})
