import { ComponentProps, forwardRef, useState, type ChangeEvent } from "react"
import { cn } from "@/utils/helpers/styles.helpers"

type TextFieldProps = Omit<ComponentProps<"input">, "type"> & {
  placeholder: string
  errorText?: string
  readonly testId?: string
  readonly default?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ testId, errorText, ...props }, ref) => {
    const [value, setValue] = useState<string>(props.default ?? "")

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    }

    const canDisplayError = (): boolean => {
      if (errorText) {
        return errorText.length > 0
      }

      return false
    }

    return (
      <div className="relative w-full">
        <input
          data-testid={testId}
          ref={ref}
          value={value}
          onChange={handleInputChange}
          className={cn(
            "w-full text-xs border-custom-medium-grey-25 placeholder-custom-medium-grey-25 text-black rounded dark:bg-custom-dark-grey dark:placeholder:text-custom-white-25 dark:caret-custom-white dark:text-custom-white hover:cursor-pointer",
            canDisplayError() && "border-custom-red"
          )}
          {...props}
        />
        {canDisplayError() && (
          <span
            data-testid={`${testId}-error`}
            className="absolute right-4 top-2 text-custom-red text-xs"
          >
            {errorText}
          </span>
        )}
      </div>
    )
  }
)
