import type { ComponentProps } from "react"
import { cn } from "@/utils/helpers/styles.helpers"

type Props = {
  title: string
  numberOfBoards: number
  readonly testId?: string
} & ComponentProps<"h3">

export const SidebarHeader = ({
  testId,
  title,
  numberOfBoards,
  className,
}: Props) => {
  return (
    <h3
      data-testid={testId}
      className={cn(
        "uppercase text-2xs text-custom-medium-grey tracking-[.15em]",
        className
      )}
    >
      {title} ({numberOfBoards})
    </h3>
  )
}
