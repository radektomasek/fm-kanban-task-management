import { ComponentProps, forwardRef } from "react"
import type { BoardContextMenu } from "@/utils/mocks/menus.mocks"
import { cn } from "@/utils/helpers/styles.helpers"

type Props = BoardContextMenu &
  ComponentProps<"li"> & {
    onMouseOver: () => void
  }

export const ContextMenuItem = forwardRef<HTMLLIElement, Props>(
  ({ title, type, className, onMouseOver }: Props, ref) => {
    return (
      <li
        ref={ref}
        tabIndex={-1}
        onMouseOver={() => {
          if (onMouseOver) {
            onMouseOver()
          }
        }}
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
      >
        {title}
      </li>
    )
  }
)
