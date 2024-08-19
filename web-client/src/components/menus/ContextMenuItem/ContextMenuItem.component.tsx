import { ComponentProps, forwardRef } from "react"
import { cn } from "@/utils/helpers/styles.helpers"
import type { BoardContextMenu } from "@/types/contextMenus"
import type { ModalScreenKey } from "@/types/modals"

type Props = BoardContextMenu &
  ComponentProps<"li"> & {
    readonly id: string
    onOptionClick?: (id: ModalScreenKey) => void
  }

export const ContextMenuItem = forwardRef<HTMLLIElement, Props>(
  ({ id, title, type, className, onOptionClick, ...props }: Props, ref) => {
    const handleItemClick = () => {
      if (onOptionClick) {
        onOptionClick(id)
      }
    }

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
            "list-none",
            className,
          ],
          type === "standard" && "text-custom-medium-grey",
          type === "destructive" && "text-custom-red"
        )}
        onClick={handleItemClick}
        {...props}
      >
        {title}
      </li>
    )
  }
)
