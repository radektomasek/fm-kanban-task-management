import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"
import { Navbar } from "@/components/layout/navigation"
import {
  SidebarLargeScreen,
  SidebarSmallScreen,
} from "@/components/layout/menu"
import { Outlet, useNavigate } from "react-router"
import { EmptyProject, NoActiveBoard } from "@/views/Placeholders"
import { useBoards, useBoardColumnsParallel } from "@/services/queries"
import { useStore } from "@/store/store"
import { useParams } from "react-router-dom"
import { boardContextMenuItems } from "@/types/contextMenus"
import type { ModalScreenKey } from "@/types/modals"

export const BoardsPage = () => {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { isPending, isError, error, data: boards } = useBoards()
  const {
    selectedTheme,
    setTheme,
    handleOpenModal,
    selectedBoard,
    activeSidebarSmallScreen,
    activeSidebarLargeScreen,
    handleOpenSidebarMobile,
    handleCloseSidebarMobile,
    toggleLargeSidebarVisibility,
  } = useStore(
    useShallow((state) => ({
      setTheme: state.setTheme,
      selectedBoard: state.selectedBoard,
      selectedTheme: state.selectedTheme,
      handleOpenModal: state.handleOpenModal,
      activeSidebarSmallScreen: state.activeSidebarSmallScreen,
      activeSidebarLargeScreen: state.activeSidebarLargeScreen,
      toggleLargeSidebarVisibility: state.toggleLargeSidebarVisibility,
      handleOpenSidebarMobile: state.handleOpenMobileSidebar,
      handleCloseSidebarMobile: state.handleCloseMobileSidebar,
    }))
  )

  useBoardColumnsParallel(boards)
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
      <header className="flex h-16 md:h-24 dark:bg-custom-dark-grey dark:text-custom-white border-b dark:border-b-custom-dark-lines fixed left-0 right-0 top-0">
        <Navbar
          selectedBoard={selectedBoard}
          contextMenuItems={boardContextMenuItems}
          hasActiveSidebarMobile={activeSidebarSmallScreen}
          onContextMenuClick={(id: ModalScreenKey) => handleOpenModal(id)}
          onModalOpen={handleOpenModal}
          onSidebarMobileOpen={handleOpenSidebarMobile}
        />
      </header>
      <main className="flex w-screen min-h-screen overflow-auto">
        <SidebarLargeScreen
          boards={boards}
          selectedTheme={selectedTheme}
          selectedBoard={selectedBoard}
          onThemeUpdate={setTheme}
          isActive={activeSidebarLargeScreen}
          toggleLargeSidebarVisibility={toggleLargeSidebarVisibility}
          onBoardCreateClick={() => handleOpenModal("AddBoardScreen")}
        />
        <SidebarSmallScreen
          boards={boards}
          selectedTheme={selectedTheme}
          selectedBoard={selectedBoard}
          isActive={activeSidebarSmallScreen}
          onThemeUpdate={setTheme}
          onBoardCreateClick={() => handleOpenModal("AddBoardScreen")}
          onSidebarClose={handleCloseSidebarMobile}
        />
        {renderChildComponent()}
      </main>
    </>
  )
}
