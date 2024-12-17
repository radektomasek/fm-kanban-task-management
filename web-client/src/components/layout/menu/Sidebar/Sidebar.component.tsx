import { useState } from "react"
import {
  MenuLink,
  SidebarHeader,
  ThemeSwitcher,
} from "@/components/layout/menu"
import { Button } from "@/components/forms"
import { cn } from "@/utils/helpers/styles.helpers"
import { Board } from "@/types/boards"
import type { ThemeMode } from "@/types/theme"

type Props = {
  readonly testId?: string
  boards: Board[]
  selectedTheme: ThemeMode
  selectedBoard?: Board
  onThemeUpdate: (theme: ThemeMode) => void
  onBoardCreateClick: () => void
}

const getBoardButtonLinks = (boards: Board[], selectedBoard?: Board) =>
  boards.map((board) => (
    <li key={board.id} className="list-none">
      <MenuLink
        label={board.name}
        link={board.id}
        active={board.id === selectedBoard?.id}
      />
    </li>
  ))

export const Sidebar = ({
  testId,
  boards,
  selectedTheme,
  selectedBoard,
  onThemeUpdate,
  onBoardCreateClick,
}: Props) => {
  const [showSidebar, toggleShowSidebar] = useState(true)

  const toggleShowSidebarHandler = () =>
    toggleShowSidebar((showSidebar) => !showSidebar)

  return (
    <aside
      data-testid={testId}
      className="hidden border-r-[1px] dark:bg-custom-dark-grey dark:border-[#3E3F4E] relative md:block"
    >
      {showSidebar && (
        <div
          className={cn(
            "flex flex-col w-[18.65rem] bg-custom-white relative pr-4 dark:bg-custom-dark-grey"
          )}
        >
          <div className="px-4">
            <SidebarHeader
              className="ml-8 mb-3"
              title={"All Boards"}
              numberOfBoards={boards.length}
            />
            {getBoardButtonLinks(boards, selectedBoard)}
            <li className="list-none">
              <Button
                active={false}
                intent={"sidebar"}
                className="text-custom-dark-purple"
                onClick={onBoardCreateClick}
              >
                + Create New Board
              </Button>
            </li>
          </div>

          <div className="fixed bottom-20 left-4">
            <ThemeSwitcher
              className={"mx-auto"}
              default={selectedTheme}
              onThemeUpdate={onThemeUpdate}
            />
          </div>
        </div>
      )}
      <div className="fixed bottom-4">
        <Button
          active={false}
          className={""}
          intent={"sidebar"}
          wrapped={!showSidebar}
          iconName={"eye"}
          onClick={toggleShowSidebarHandler}
        >
          Hide Sidebar
        </Button>
      </div>
    </aside>
  )
}
