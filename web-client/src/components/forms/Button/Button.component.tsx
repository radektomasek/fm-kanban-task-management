import { forwardRef, type ComponentProps } from "react"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/utils/helpers/styles.helpers"
import FluentBoard from "@/assets/fluent-board.svg"

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
          "bg-custom-dark-purple text-custom-white hover:bg-custom-light-purple w-[15.9375rem] justify-center",
        secondary:
          "bg-custom-light-purple-10 text-custom-dark-purple hover:bg-custom-light-purple-25 w-[15.9375rem] justify-center",
        destructive:
          "bg-custom-red text-custom-white hover:bg-custom-light-red w-[15.9375rem] justify-center",
        sidebar: "gap-4 text-base w-[17.25rem] h-12 justify-start pl-8",
      },
      size: {
        large: "text-base h-12",
        regular: "text-xs h-10",
      },
      active: {
        false:
          "text-custom-medium-grey hover:bg-custom-light-purple-10 hover:text-custom-dark-purple",
        true: "bg-custom-dark-purple text-custom-white",
      },
      rounded: {
        default: "rounded-[1.25rem]",
        large: "rounded-3xl",
        rightSideOnly: "rounded-r-3xl",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "regular",
      rounded: "default",
    },
  }
)

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonStyles>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ intent, size, active, rounded, className, ...props }, ref) => {
    if (intent === "sidebar") {
      return (
        <button
          ref={ref}
          className={cn(
            buttonStyles({
              intent,
              active,
              className,
              size: "large",
              rounded: "rightSideOnly",
            })
          )}
          {...props}
        >
          <FluentBoard />
          <span>{props.children}</span>
        </button>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ intent, size, rounded, className }))}
        {...props}
      >
        {props.children}
      </button>
    )
  }
)
