import { cva } from "class-variance-authority"
import { cn } from "@/utils/helpers/styles.helpers"
import FluentBoard from "@/assets/fluent-board.svg"

import { Link } from "react-router-dom"

const navLinkStyles = cva(
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
    "dark:hover:bg-custom-white",
  ],
  {
    variants: {
      intent: {
        sidebar: "gap-4 text-base h-12 justify-start",
      },
      size: {
        large: "text-base h-12",
        regular: "text-xs h-10",
      },
      active: {
        false:
          "text-custom-medium-grey hover:bg-custom-light-purple-10 hover:text-custom-dark-purple",
        true: "bg-custom-dark-purple text-custom-white dark:hover:text-custom-dark-purple",
      },
    },
    compoundVariants: [
      {
        intent: "sidebar",
        size: "large",
        className: "w-[17.25rem] pl-8 rounded-r-3xl",
      },
    ],
    defaultVariants: {
      intent: "sidebar",
      size: "large",
    },
  }
)

type MenuLinkProps = {
  active: boolean
  label: string
  link: string
}

export const MenuLink = ({ link, active, label, ...props }: MenuLinkProps) => {
  return (
    <Link
      to={link}
      className={cn(navLinkStyles({ intent: "sidebar", active: active }))}
      {...props}
    >
      <FluentBoard />
      {label}
    </Link>
  )
}
