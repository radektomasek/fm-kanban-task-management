import Sun from "@/assets/sun.svg"
import Moon from "@/assets/moon.svg"
import { type ComponentProps, forwardRef, useState } from "react"
import { cn } from "@/utils/helpers/styles.helpers"
import { toggleTheme, type ThemeMode } from "@/utils/helpers/theme.helpers"

type ThemeSwitcherProps = Omit<ComponentProps<"input">, "type"> & {
  testId?: string
  default?: ThemeMode
}

export const ThemeSwitcher = forwardRef<HTMLInputElement, ThemeSwitcherProps>(
  ({ id, testId, className, ...props }, ref) => {
    const [themeMode, updateThemeMode] = useState<ThemeMode>(
      props.default ?? "light"
    )

    const handleInputChange = () => {
      updateThemeMode(toggleTheme(themeMode))
      /**
       * @TODO: add a callback function that pass data towards the centralized state (e.g. via callback)
       */
    }

    return (
      <div
        data-testid={testId}
        className={cn([
          "w-[15.69rem] h-12 bg-custom-light-grey inline-flex items-center justify-around rounded-md",
          className,
        ])}
      >
        <label
          htmlFor={id}
          className="w-36 text-custom-medium-grey cursor-pointer inline-flex items-center justify-around"
        >
          <Sun />

          <input
            id={id}
            ref={ref}
            type="checkbox"
            onClick={handleInputChange}
            value={""}
            className="sr-only peer"
          />
          <div
            className={cn(
              "relative cursor-pointer w-9 h-5 bg-custom-dark-purple",
              "peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full",
              "rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']",
              "after:absolute after:top-[2.5px] after:start-[4px] after:bg-white after:border-gray-300 after:border",
              "after:rounded-full after:h-3.5 after:w-3.5  after:transition-all dark:border-gray-600 peer-checked:bg-custom-dark-purple"
            )}
          />

          <Moon />
        </label>
      </div>
    )
  }
)
