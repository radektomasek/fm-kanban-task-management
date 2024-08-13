import { Logo } from "@/components/layout/navigation"
import { Button } from "@/components/forms"
import { ContextMenu } from "@/components/menus"
import { Board } from "@/types/boards"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import { boardContextMenuItems } from "@/utils/mocks/menus.mocks"

type Props = {
  readonly testId?: string
  selectedBoard?: Board
}

export const Navbar = ({ testId, selectedBoard }: Props) => {
  const { handleOpenModal } = useStore(
    useShallow((state) => ({
      handleOpenModal: state.handleOpenModal,
    }))
  )

  const headerForEmptyProject = () => (
    <nav className="flex items-center justify-end bg-custom-white pr-8 flex-grow">
      <ContextMenu items={boardContextMenuItems} />
    </nav>
  )

  const headerForProjectWithBoards = (selectedBoard: Board) => (
    <nav className="flex items-center justify-between bg-custom-white pl-8 flex-grow">
      <h1 className="text-xl ">{selectedBoard.name}</h1>

      <div className="mr-8 flex w-48 justify-between items-center relative">
        <Button
          className="w-40"
          onClick={() => handleOpenModal("AddTaskScreen")}
        >
          + Add New Task
        </Button>
        <ContextMenu items={boardContextMenuItems} />
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
