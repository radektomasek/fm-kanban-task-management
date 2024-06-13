import type { CardGroupHeader } from "@/utils/mocks/cardGroups.mocks"
import { cn } from "@/utils/helpers/styles.helpers"

type Props = CardGroupHeader & {
  readonly numberOfItems: number
  readonly testId?: string
}

export const GroupHeader = ({
  testId,
  title,
  circleColor,
  numberOfItems,
}: Props) => {
  return (
    <h3
      data-testid={testId}
      className={cn(
        "uppercase text-2xs text-custom-medium-grey tracking-[.15em] inline-flex gap-3 items-center"
      )}
    >
      <div
        className={"w-3.5 h-3.5 rounded-lg"}
        style={{ backgroundColor: circleColor }}
      />
      {title} ({numberOfItems})
    </h3>
  )
}
