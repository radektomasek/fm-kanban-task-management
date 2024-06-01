import { useState, forwardRef, type ComponentProps } from "react"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/utils/helpers/styles.helpers"

const checkboxStyles = cva([], {
  variants: {},
  defaultVariants: {},
})

type CheckboxProps = Omit<ComponentProps<"input">, "type"> &
  VariantProps<typeof checkboxStyles> & {
    label: string
    defaultValue?: boolean
  }

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, ...props }, ref) => {
    const [checked, setChecked] = useState<boolean>(props.defaultValue ?? false)

    const handleChange = () => {
      setChecked(!checked)
    }

    return (
      <div className="flex min-w-96 bg-custom-light-grey p-3 gap-4 rounded hover:bg-custom-light-purple-25 focus:bg-custom-light-purple-25 cursor-pointer">
        <input
          id={id}
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className={cn(
            "w-4 h-4 rounded-sm",
            checked && "accent-custom-dark-purple",
            !checked && "border border-custom-medium-grey"
          )}
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
