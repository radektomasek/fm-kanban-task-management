import { useShallow } from "zustand/react/shallow"
import { Navbar } from "@/components/layout/navigation"
import { Sidebar } from "@/components/layout/menu"
import { Outlet } from "react-router"
import { OnboardingPage } from "@/views/Onboarding"
import { useBoards } from "@/services/queries"
import { useStore } from "@/store/store"

export const BoardsPage = () => {
  const { isPending, isError, error, data: boards } = useBoards()
  const { selectedTheme, setTheme } = useStore(
    useShallow((state) => ({
      selectedTheme: state.selectedTheme,
      setTheme: state.setTheme,
    }))
  )

  if (isPending) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>
  }

  const isEmpty = () => boards.length === 0

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex w-screen h-[calc(100vh-6rem)]">
        <Sidebar
          boards={boards}
          selectedTheme={selectedTheme}
          onThemeUpdate={setTheme}
        />
        {isEmpty() ? <OnboardingPage /> : <Outlet />}
      </main>
    </>
  )
}
