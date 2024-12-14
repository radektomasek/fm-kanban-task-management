import {
  forwardRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
} from "react"
import Sun from "@/assets/sun.svg"
import Moon from "@/assets/moon.svg"
import { cn } from "@/utils/helpers/styles.helpers"
import { ThemeMode } from "@/types/theme"
import { toggleTheme } from "@/utils/helpers/theme.helpers"

type ThemeSwitcherProps = Omit<ComponentProps<"input">, "type"> & {
  onThemeUpdate: (newTheme: ThemeMode) => void
  readonly testId?: string
  readonly default?: ThemeMode
}

export const ThemeSwitcher = forwardRef<HTMLInputElement, ThemeSwitcherProps>(
  ({ id, testId, className, onThemeUpdate, ...props }, ref) => {
    const [themeMode, updateThemeMode] = useState<ThemeMode>(
      props.default ?? "light"
    )

    const handleInputChange = () => {
      const updatedValue = toggleTheme(themeMode)
      updateThemeMode(updatedValue)
      onThemeUpdate(updatedValue)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
      ) {
        handleInputChange()
        event.preventDefault()
      }
    }

    return (
      <div
        className={cn([
          "w-[15.69rem] h-12 bg-custom-light-grey inline-flex items-center justify-around rounded-md dark:bg-custom-very-dark-grey",
          className,
        ])}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <label
          data-testid={testId}
          htmlFor={id}
          className="w-36 text-custom-medium-grey cursor-pointer inline-flex items-center justify-around"
        >
          <Sun />
          <input
            id={id}
            ref={ref}
            data-testid={`${testId}-input`}
            type="checkbox"
            value={""}
            onChange={handleInputChange}
            checked={themeMode === "dark"}
            className="sr-only peer"
            tabIndex={-1}
          />
          <div
            className={cn(
              "relative cursor-pointer w-10 h-[1.32rem] bg-custom-dark-purple",
              "peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full",
              "after:absolute after:top-[2.5px] after:start-[4px] after:bg-white after:border-gray-300 after:border",
              "after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-custom-dark-purple dark:hover:peer-checked:bg-custom-light-purple"
            )}
          />
          <Moon />
        </label>
      </div>
    )
  }
)
