import { Logo } from "@/components/layout/navigation"
import { Button } from "@/components/forms"
import { ContextMenu } from "@/components/menus"
import { Board } from "@/types/boards"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import type { ContextMenuElement } from "@/types/contextMenus"
import type { ModalScreenKey } from "@/types/modals"

type Props = {
  readonly testId?: string
  selectedBoard?: Board
  contextMenuItems: ContextMenuElement[]
  onContextMenuClick?: (id: ModalScreenKey) => void
}

export const Navbar = ({
  testId,
  selectedBoard,
  contextMenuItems,
  onContextMenuClick,
}: Props) => {
  const { handleOpenModal } = useStore(
    useShallow((state) => ({
      handleOpenModal: state.handleOpenModal,
    }))
  )

  /**
   * @TODO: Once we add auth mechanism, there should be a context menu with the Logout/Account option
   */
  const headerForEmptyProject = () => (
    <nav className="flex items-center justify-end bg-custom-white pr-8 flex-grow dark:bg-custom-dark-grey"></nav>
  )

  const headerForProjectWithBoards = (selectedBoard: Board) => (
    <nav className="flex items-center justify-between bg-custom-white pl-8 flex-grow dark:bg-custom-dark-grey dark:text-custom-white">
      <h1 className="text-xl ">{selectedBoard.name}</h1>

      <div className="mr-8 flex w-48 justify-between items-center relative">
        <Button
          className="w-40"
          onClick={() => handleOpenModal("AddTaskScreen")}
        >
          + Add New Task
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
      <div data-testid={testId} className="flex h-24">
        <Logo />
        {selectedBoard
          ? headerForProjectWithBoards(selectedBoard)
          : headerForEmptyProject()}
      </div>
    </>
  )
}
