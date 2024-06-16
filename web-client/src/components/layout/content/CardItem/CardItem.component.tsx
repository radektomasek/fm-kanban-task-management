import type { Card } from "@/utils/mocks/cards.mocks"

export const CardItem = ({ title, completedSubtasks, allSubtasks }: Card) => {
  return (
    <div
      className="flex flex-col bg-custom-white rounded-lg px-5 py-5 gap-y-1.5 cursor-pointer"
      tabIndex={0}
    >
      <h3 className="text-base">{title}</h3>
      <h4 className="text-2xs text-custom-medium-grey">
        {completedSubtasks} of {allSubtasks} subtasks
      </h4>
    </div>
  )
}
