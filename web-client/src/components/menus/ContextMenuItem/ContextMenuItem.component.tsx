import type { ComponentProps } from "react"
import type { BoardContextMenu } from "@/utils/mocks/menus.mocks"
import { cn } from "@/utils/helpers/styles.helpers"

type Props = BoardContextMenu & ComponentProps<"li">

export const ContextMenuItem = ({ title, type }: Props) => {
  return (
    <li
      className={cn(
        ["cursor-pointer", "text-xs"],
        type === "standard" && "text-custom-medium-grey",
        type === "destructive" && "text-custom-red"
      )}
    >
      {title}
    </li>
  )
}
