import { useState, forwardRef, type ComponentProps, MouseEvent } from "react"
import { cn } from "@/utils/helpers/styles.helpers"

type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  label: string
  onUpdate?: (value: boolean) => void
  readonly testId?: string
  readonly default?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, testId, onUpdate, ...props }, ref) => {
    const [checked, setChecked] = useState<boolean>(props.default ?? false)

    const handleStateUpdate = (newValue: boolean) => {
      setChecked(newValue)
      if (onUpdate) {
        onUpdate(newValue)
      }
    }

    const handleDivClick = (event: MouseEvent<HTMLDivElement>) => {
      if (
        (event.target instanceof HTMLInputElement &&
          event.target.type === "checkbox") ||
        event.target instanceof HTMLLabelElement
      ) {
        return
      }

      handleStateUpdate(!checked)
    }

    const handleInputChange = () => {
      handleStateUpdate(!checked)
    }

    return (
      <div
        data-testid={testId}
        onClick={handleDivClick}
        className="flex min-w-96 bg-custom-light-grey p-3 gap-4 rounded hover:bg-custom-light-purple-25 focus:bg-custom-light-purple-25 cursor-pointer"
      >
        <input
          id={id}
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={handleInputChange}
          className="text-custom-dark-purple focus:custom-dark-purple border-custom-medium-grey peer rounded-sm w-4 h-4"
          {...props}
        />
        <label
          htmlFor={id}
          className={cn("text-2xs", checked && "opacity-50 line-through")}
        >
          {label}
        </label>
      </div>
    )
  }
)
