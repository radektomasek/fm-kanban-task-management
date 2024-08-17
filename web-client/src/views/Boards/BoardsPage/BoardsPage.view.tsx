import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"
import { Navbar } from "@/components/layout/navigation"
import { Sidebar } from "@/components/layout/menu"
import { Outlet, useNavigate } from "react-router"
import { OnboardingPage } from "@/views/Onboarding"
import { useBoards } from "@/services/queries"
import { useStore } from "@/store/store"
import { useParams } from "react-router-dom"
import { BoardContextMenu } from "@/types/contextMenus"
import { ModalScreenKey } from "@/types/modals"

export const BoardsPage = () => {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { isPending, isError, error, data: boards } = useBoards()
  const { selectedTheme, selectedBoardId, setTheme, handleOpenModal } =
    useStore(
      useShallow((state) => ({
        setTheme: state.setTheme,
        selectedBoardId: state.selectedBoardId,
        selectedTheme: state.selectedTheme,
        handleOpenModal: state.handleOpenModal,
      }))
    )

  useEffect(() => {
    if (!boardId && selectedBoardId) {
      navigate(`/boards/${selectedBoardId}`)
    }
  }, [boardId, navigate, selectedBoardId])

  if (isPending) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>
  }

  const boardContextMenuItems: BoardContextMenu[] = [
    {
      id: "EditBoardScreen",
      title: "Edit Board",
      type: "standard",
    },
    {
      id: "DeleteBoardScreen",
      title: "Delete Board",
      type: "destructive",
    },
  ]

  const selectedBoard = boards?.find((board) => board.id === selectedBoardId)

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
        {boardId ? <Outlet /> : <OnboardingPage />}
      </main>
    </>
  )
}
