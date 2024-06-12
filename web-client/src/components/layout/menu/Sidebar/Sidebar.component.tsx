import { useState } from "react"
import { SidebarHeader, ThemeSwitcher } from "@/components/layout/menu"
import { Button } from "@/components/forms"
import { cn } from "@/utils/helpers/styles.helpers"
import { type Board } from "@/utils/mocks/boards.mocks"

type Props = {
  readonly testId?: string
  boards: Board[]
}

const getBoardButtonLinks = (boards: Board[], activeBoard: Board) =>
  boards.map((board) => (
    <Button
      key={board.id}
      intent={"sidebar"}
      active={board.id === activeBoard.id}
    >
      {board.name}
    </Button>
  ))

export const Sidebar = ({ testId, boards }: Props) => {
  const [showSidebar, toggleShowSidebar] = useState(true)

  const toggleShowSidebarHandler = () =>
    toggleShowSidebar((showSidebar) => !showSidebar)

  return (
    <aside data-testid={testId} className="border-r-2">
      {showSidebar && (
        <div
          className={cn(
            "flex flex-col w-[18.65rem] bg-custom-white justify-between h-[calc(100%-5rem)] relative pr-4"
          )}
        >
          <div>
            <SidebarHeader
              className="ml-8 mb-3"
              title={"All Boards"}
              numberOfBoards={boards.length}
            />
            {getBoardButtonLinks(boards, boards[0])}
            <Button
              active={false}
              intent={"sidebar"}
              className="text-custom-dark-purple"
            >
              + Create New Board
            </Button>
          </div>
          <ThemeSwitcher className={"ml-8"} />
        </div>
      )}

      <Button
        active={false}
        className={"mt-4"}
        intent={"sidebar"}
        wrapped={!showSidebar}
        iconName={"eye"}
        onClick={toggleShowSidebarHandler}
      >
        Hide Sidebar
      </Button>
    </aside>
  )
}
