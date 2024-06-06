import { useState } from "react"
import { SidebarHeader, ThemeSwitcher } from "@/components/layout/menu"
import { Button } from "@/components/forms"
import { type Board } from "@/utils/mocks/boards.mocks"
import { cn } from "@/utils/helpers/styles.helpers"

type Props = {
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

export const Sidebar = ({ boards }: Props) => {
  const [showSidebar, toggleShowSidebar] = useState(true)

  const toggleShowSidebarHandler = () =>
    toggleShowSidebar((showSidebar) => !showSidebar)

  return (
    <div className="w-[18.75rem] border-r-2">
      <div
        className={cn(
          "flex flex-col bg-custom-white justify-between min-h-[calc(100vh-10rem)] relative pr-4 ",
          !showSidebar && "hidden"
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

      <Button
        className={"mt-4"}
        intent={"sidebar"}
        active={false}
        wrapped={!showSidebar}
        iconName={"eye"}
        onClick={toggleShowSidebarHandler}
      >
        Hide Sidebar
      </Button>
    </div>
  )
}
