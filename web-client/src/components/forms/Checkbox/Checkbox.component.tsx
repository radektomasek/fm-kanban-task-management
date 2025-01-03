import { useState, forwardRef, type ComponentProps, MouseEvent } from "react"
import { cn } from "@/utils/helpers/styles.helpers"

type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  label: string
  onUpdate?: (value: boolean) => void
  readonly testId?: string
  checked?: boolean
  defaultChecked?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      label,
      testId,
      onUpdate,
      checked: controlledChecked,
      defaultChecked,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(
      defaultChecked ?? false
    )
    const isControlled = controlledChecked !== undefined
    const checked = isControlled ? controlledChecked : internalChecked

    const handleStateUpdate = (newValue: boolean) => {
      if (!isControlled) {
        setInternalChecked(newValue)
      }
      if (onUpdate) {
        onUpdate(newValue)
      }
      if (onChange) {
        onChange({
          target: { checked: newValue },
        } as React.ChangeEvent<HTMLInputElement>)
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
        className="flex bg-custom-light-grey p-3 mb-2 gap-4 rounded hover:bg-custom-light-purple-25 focus:bg-custom-light-purple-25 cursor-pointer dark:bg-custom-very-dark-grey dark:text-custom-white"
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
