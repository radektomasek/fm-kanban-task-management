import { BoardPage } from "@/views/Board"
import { Navbar } from "@/components/layout/navbar"

function App() {
  return (
    <>
      <header>
        <Navbar boardName="Platform Launch" />
      </header>
      <main>
        <BoardPage />
      </main>
    </>
  )
}

export default App
