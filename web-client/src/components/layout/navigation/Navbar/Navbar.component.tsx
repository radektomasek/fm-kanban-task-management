import { Logo } from "@/components/layout/navigation"
import { Button } from "@/components/forms"
import {
  BoardTitleLargeScreen,
  BoardTitleSmallScreen,
  ContextMenu,
} from "@/components/layout/menu"
import { Board } from "@/types/boards"
import type { ContextMenuElement } from "@/types/contextMenus"
import type { ModalScreenKey } from "@/types/modals"
import PlusIcon from "@/assets/plus.svg"

type Props = {
  readonly testId?: string
  hasActiveSidebarMobile: boolean
  selectedBoard?: Board
  contextMenuItems: ContextMenuElement[]
  onContextMenuClick?: (id: ModalScreenKey) => void
  onSidebarMobileOpen?: () => void
  onModalOpen?: (modalScreenKey: ModalScreenKey) => void
}

export const Navbar = ({
  selectedBoard,
  onModalOpen,
  contextMenuItems,
  onContextMenuClick,
  onSidebarMobileOpen,
  hasActiveSidebarMobile,
}: Props) => {
  const handleOpenModal = (modalScreenKey: ModalScreenKey) => {
    if (!onModalOpen) {
      return
    }

    onModalOpen(modalScreenKey)
  }

  /**
   * @TODO: Once we add auth mechanism, there should be a context menu with the Logout/Account option
   */
  const headerForEmptyProject = () => (
    <nav className="flex items-center justify-end bg-custom-white pr-8 flex-grow dark:bg-custom-dark-grey"></nav>
  )

  const headerForProjectWithBoards = (selectedBoard: Board) => (
    <nav className="flex items-center justify-between bg-custom-white flex-grow dark:bg-custom-dark-grey dark:text-custom-white">
      <BoardTitleLargeScreen boardName={selectedBoard.name} />

      <BoardTitleSmallScreen
        boardName={selectedBoard.name}
        onClick={onSidebarMobileOpen}
        isActive={hasActiveSidebarMobile}
      />

      <div className="mr-8 flex w-48 gap-6 justify-end relative">
        <Button
          className="w-40 hidden md:flex"
          onClick={() => handleOpenModal("AddTaskScreen")}
        >
          + Add New Task
        </Button>

        <Button
          className="w-14 md:hidden"
          onClick={() => handleOpenModal("AddTaskScreen")}
        >
          <PlusIcon />
        </Button>

        <ContextMenu
          items={contextMenuItems}
          onItemSelect={onContextMenuClick}
        />
      </div>
    </nav>
  )

  return (
    <>
      <Logo />
      {selectedBoard
        ? headerForProjectWithBoards(selectedBoard)
        : headerForEmptyProject()}
    </>
  )
}
