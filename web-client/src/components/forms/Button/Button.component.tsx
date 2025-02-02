import { forwardRef, type ComponentProps } from "react"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/utils/helpers/styles.helpers"
import FluentBoard from "@/assets/fluent-board.svg"
import EyeOpen from "@/assets/eye-open.svg"
import EyeSlash from "@/assets/eye-slash.svg"
import DotGroup from "@/assets/dot-group.svg"
import Cross from "@/assets/cross.svg"

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
          "bg-custom-dark-purple text-custom-white hover:bg-custom-light-purple justify-center",
        secondary:
          "bg-custom-light-purple-10 text-custom-dark-purple hover:bg-custom-light-purple-25 justify-center dark:bg-custom-white dark:hover:bg-custom-white",
        destructive:
          "bg-custom-red text-custom-white hover:bg-custom-light-red justify-center",
        sidebar:
          "gap-4 text-base h-12 justify-start dark:hover:bg-custom-white",
        svgOnly: "h-10 inline-flex items-center justify-center cursor-pointer",
        gridItem: "bg-custom-grey",
      },
      size: {
        large: "text-base h-12",
        regular: "text-xs h-10",
        wrapped: "text-xs h-10 justify-center",
      },
      active: {
        false:
          "text-custom-medium-grey hover:bg-custom-light-purple-10 hover:text-custom-dark-purple",
        true: "bg-custom-dark-purple text-custom-white",
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        size: "regular",
        className: "rounded-[1.25rem]",
      },
      {
        intent: "secondary",
        size: "regular",
        className: "rounded-[1.25rem]",
      },
      {
        intent: "destructive",
        size: "regular",
        className: "rounded-[1.25rem]",
      },
      {
        intent: "primary",
        size: "large",
        className: "rounded-3xl",
      },
      {
        intent: "secondary",
        size: "large",
        className: "rounded-3xl",
      },
      {
        intent: "destructive",
        size: "large",
        className: "rounded-3xl",
      },
      {
        intent: "sidebar",
        size: "large",
        className: "w-[17.25rem] pl-8 rounded-r-3xl dark:bg-custom-dark-grey",
      },
      {
        intent: "sidebar",
        size: "wrapped",
        className:
          "w-14 rounded-r-3xl bg-custom-dark-purple text-custom-white fixed bottom-6 left-0 dark:hover:bg-custom-light-purple",
      },
      {
        intent: "gridItem",
        className:
          "text-xl text-custom-medium-grey w-32 bg-gradient-light dark:bg-gradient-dark w-[17.5rem] min-h-[200px] h-full rounded-lg hover:text-custom-dark-purple",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "regular",
    },
  }
)

type IconName = "board" | "eye" | "dots" | "cross"

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonStyles> & {
    wrapped?: boolean
    iconName?: IconName
  }

const getButtonSvgIcon = (name?: IconName, wrapped: boolean = false) => {
  switch (name) {
    case "eye":
      return wrapped ? <EyeOpen /> : <EyeSlash />
    case "dots":
      return <DotGroup />
    case "cross":
      return <Cross />
    case "board":
    default:
      return <FluentBoard />
  }
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ intent, size, active, className, iconName, wrapped, ...props }, ref) => {
    const isWrapped = wrapped === true
    if (intent === "svgOnly") {
      return (
        <button
          ref={ref}
          className={cn(
            buttonStyles({
              intent,
              className,
            })
          )}
          {...props}
        >
          {getButtonSvgIcon(iconName)}
          <span className="sr-only">{props.children}</span>
        </button>
      )
    }

    if (intent === "sidebar") {
      return (
        <button
          ref={ref}
          className={cn(
            buttonStyles({
              intent,
              active: !isWrapped ? active : true,
              size: isWrapped ? "wrapped" : "large",
              className,
            })
          )}
          {...props}
        >
          {getButtonSvgIcon(iconName, wrapped)}
          {!isWrapped && <span>{props.children}</span>}
        </button>
      )
    }

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
