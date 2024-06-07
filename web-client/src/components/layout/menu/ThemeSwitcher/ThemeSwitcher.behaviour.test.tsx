import { nanoid } from "nanoid"
import { render, screen, fireEvent } from "@testing-library/react"
import { ThemeSwitcher } from "@/components/layout/menu"

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
})
