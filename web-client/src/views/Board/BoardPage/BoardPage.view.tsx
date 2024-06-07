import { Sidebar } from "@/components/layout/menu"
import { boards } from "@/utils/mocks/boards.mocks"

export const BoardPage = () => {
  return (
    <>
      <aside>
        <Sidebar boards={boards} />
      </aside>
    </>
  )
}
