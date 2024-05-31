import { forwardRef, type ComponentProps } from "react"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/utils/helpers/styles.helpers"

const buttonStyles = cva(
  [
    "font-plus-jakarta-sans",
    "font-bold",
    "inline-flex",
    "items-center",
    "justify-center",
    "transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "disabled:opacity-50",
    "disabled:pointer-events-none",
    "ring-offset-background",
  ],
  {
    variants: {
      intent: {
        primary:
          "bg-custom-dark-purple text-custom-white hover:bg-custom-light-purple",
        secondary:
          "bg-custom-light-purple-10 text-custom-dark-purple hover:bg-custom-light-purple-25",
        destructive:
          "bg-custom-red text-custom-white hover:bg-custom-light-red",
      },
      size: {
        large: "text-base h-12 px-[3.844rem] rounded-3xl",
        regular: "text-xs h-10 px-[4.344rem] rounded-[1.25rem]",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "regular",
    },
  }
)

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonStyles>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ intent, size, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ intent, size, className }))}
        {...props}
      >
        {props.children}
      </button>
    )
  }
)
