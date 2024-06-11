import { ComponentProps, forwardRef } from "react"
import type { BoardContextMenu } from "@/utils/mocks/menus.mocks"
import { cn } from "@/utils/helpers/styles.helpers"

type Props = BoardContextMenu & ComponentProps<"li">

export const ContextMenuItem = forwardRef<HTMLLIElement, Props>(
  ({ title, type, className, ...props }: Props, ref) => {
    return (
      <li
        ref={ref}
        tabIndex={-1}
        className={cn(
          [
            "cursor-pointer",
            "text-xs",
            "px-2",
            "py-1",
            "rounded-md",
            className,
          ],
          type === "standard" && "text-custom-medium-grey",
          type === "destructive" && "text-custom-red"
        )}
        {...props}
      >
        {title}
      </li>
    )
  }
)
