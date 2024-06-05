import { type Board } from "@/utils/mocks/boards.mocks"
import { SidebarHeader, ThemeSwitcher } from "@/components/layout/menu"
import { Button } from "@/components/forms"
import { cn } from "@/utils/helpers/styles.helpers"
import { useState } from "react"

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
    <>
      <div
        className={cn(
          "flex flex-col bg-custom-white justify-between min-h-[calc(100vh-6rem)] relative",
          !showSidebar && "hidden",
          showSidebar && "w-72"
        )}
      >
        <div>
          <SidebarHeader title={"All Boards"} numberOfBoards={boards.length} />
          {getBoardButtonLinks(boards, boards[0])}
          <Button
            intent={"sidebar"}
            active={false}
            className="text-custom-dark-purple"
          >
            + Create New Board
          </Button>
        </div>
        <ThemeSwitcher />
      </div>
      <Button
        intent={"sidebar"}
        active={false}
        wrapped={!showSidebar}
        iconName={"eye"}
        onClick={toggleShowSidebarHandler}
      >
        Hide Sidebar
      </Button>
    </>
  )
}
