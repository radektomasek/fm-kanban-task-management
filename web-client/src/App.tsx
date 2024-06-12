import { BoardPage } from "@/views/Board"
import { Navbar } from "@/components/layout/navigation"
import { Sidebar } from "@/components/layout/menu"
import { boards } from "@/utils/mocks/boards.mocks"

function App() {
  return (
    <>
      <header>
        <Navbar boardName="Platform Launch" />
      </header>
      <main className="flex w-screen">
        <Sidebar boards={boards} />
        <BoardPage />
      </main>
    </>
  )
}

export default App
