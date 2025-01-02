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
  isActive: boolean
  toggleLargeSidebarVisibility: () => void
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

export const SidebarLargeScreen = ({
  testId,
  isActive,
  boards,
  selectedTheme,
  selectedBoard,
  onThemeUpdate,
  onBoardCreateClick,
  toggleLargeSidebarVisibility,
}: Props) => {
  return (
    <aside
      data-testid={testId}
      className="hidden border-r dark:bg-custom-dark-grey dark:border-custom-dark-lines relative md:block"
    >
      {isActive && (
        <div
          className={cn(
            "flex flex-col fixed w-[18.65rem] bg-custom-white pr-4 pt-4 dark:bg-custom-dark-grey bottom-0 top-[5.9rem] border-r dark:border-custom-dark-lines"
          )}
        >
          <div>
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
          wrapped={!isActive}
          iconName={"eye"}
          onClick={toggleLargeSidebarVisibility}
        >
          Hide Sidebar
        </Button>
      </div>
    </aside>
  )
}
