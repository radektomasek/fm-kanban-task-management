import { BoardPage } from "@/views/Board"
import { Logo } from "@/components/layout/logo"

function App() {
  return (
    <>
      <header>
        <Logo />
      </header>
      <main>
        <BoardPage />
      </main>
    </>
  )
}

export default App
