import { Logo } from "@/components/layout/navigation"
import { Button } from "@/components/forms"
import { ContextMenu } from "@/components/menus"
import { boardContextMenuItems } from "@/utils/mocks/menus.mocks"

type Props = {
  readonly testId?: string
  boardName: string
}

export const Navbar = ({ testId, boardName }: Props) => {
  return (
    <div data-testid={testId} className="flex h-24">
      <Logo />
      <nav className="flex items-center justify-between bg-custom-white pl-8 flex-grow">
        <h1 className="text-xl ">{boardName}</h1>

        <div className="mr-8 flex w-48 justify-between items-center relative">
          <Button className="w-40">+ Add New Task</Button>
          <ContextMenu items={boardContextMenuItems} />
        </div>
      </nav>
    </div>
  )
}
