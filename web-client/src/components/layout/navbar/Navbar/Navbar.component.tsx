import { Logo } from "@/components/layout/logo"
import { Button } from "@/components/forms"
import { ContextMenu } from "@/components/menus"

type Props = {
  boardName: string
}

export const Navbar = ({ boardName }: Props) => {
  return (
    <div className="flex h-24">
      <Logo />
      <nav className="flex items-center justify-between bg-custom-white pl-8 flex-grow">
        <h1 className="text-xl ">{boardName}</h1>

        <div className="mr-8 flex w-48 justify-between items-center relative">
          <Button className="w-40">+ Add New Task</Button>
          <ContextMenu />
        </div>
      </nav>
    </div>
  )
}
