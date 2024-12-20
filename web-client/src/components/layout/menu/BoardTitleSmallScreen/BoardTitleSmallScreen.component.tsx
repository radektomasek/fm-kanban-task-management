import ChevronUpIcon from "@/assets/chevron-up.svg"
import ChevronDownIcon from "@/assets/chevron-down.svg"

type Props = {
  boardName: string
  isActive: boolean
  onClick?: () => void
}

export const BoardTitleSmallScreen = ({
  boardName,
  isActive,
  onClick,
}: Props) => (
  <button
    onClick={onClick}
    className={"flex flex-row items-center md:hidden gap-x-2 w-full"}
  >
    <h1 className="text-lg pl-0 md:pl-6 ">{boardName} </h1>
    <span>{isActive ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
  </button>
)
