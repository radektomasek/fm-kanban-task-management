import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"
import { Navbar } from "@/components/layout/navigation"
import { Sidebar } from "@/components/layout/menu"
import { Outlet, useNavigate } from "react-router"
import { EmptyProject, NoActiveBoard } from "@/views/Placeholders"
import { useBoardColumns, useBoards } from "@/services/queries"
import { useStore } from "@/store/store"
import { useParams } from "react-router-dom"
import { boardContextMenuItems } from "@/types/contextMenus"
import type { ModalScreenKey } from "@/types/modals"

export const BoardsPage = () => {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { isPending, isError, error, data: boards } = useBoards()
  const { selectedTheme, setTheme, handleOpenModal, selectedBoard } = useStore(
    useShallow((state) => ({
      setTheme: state.setTheme,
      selectedBoard: state.selectedBoard,
      selectedTheme: state.selectedTheme,
      handleOpenModal: state.handleOpenModal,
    }))
  )

  useBoardColumns(boards)
  useEffect(() => {
    if (!boardId && selectedBoard) {
      navigate(`/boards/${selectedBoard.id}`)
    }

    if (boardId && !selectedBoard) {
      navigate(`/boards`)
    }
  }, [boardId, navigate, selectedBoard])

  if (isPending) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>
  }

  const renderChildComponent = () => {
    if (boards?.length === 0) {
      return <EmptyProject />
    } else if (!boardId) {
      return <NoActiveBoard />
    } else {
      return <Outlet />
    }
  }

  return (
    <>
      <header>
        <Navbar
          selectedBoard={selectedBoard}
          contextMenuItems={boardContextMenuItems}
          onContextMenuClick={(id: ModalScreenKey) => handleOpenModal(id)}
        />
      </header>
      <main className="flex w-screen h-[calc(100vh-6rem)]">
        <Sidebar
          boards={boards}
          selectedTheme={selectedTheme}
          selectedBoard={selectedBoard}
          onThemeUpdate={setTheme}
          onBoardCreateClick={() => handleOpenModal("AddBoardScreen")}
        />
        {renderChildComponent()}
      </main>
    </>
  )
}
