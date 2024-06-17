import { Logo } from "@/components/layout/navigation"
import { Button } from "@/components/forms"
import { ContextMenu } from "@/components/menus"
import { boardContextMenuItems } from "@/utils/mocks/menus.mocks"
import { useState } from "react"
import Modal from "@/components/modals/Modal/Modal.component"

type Props = {
  readonly testId?: string
  boardName: string
}

export const Navbar = ({ testId, boardName }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <div data-testid={testId} className="flex h-24">
        <Logo />
        <nav className="flex items-center justify-between bg-custom-white pl-8 flex-grow">
          <h1 className="text-xl ">{boardName}</h1>

          <div className="mr-8 flex w-48 justify-between items-center relative">
            <Button className="w-40" onClick={() => setShowModal(true)}>
              + Add New Task
            </Button>
            <ContextMenu items={boardContextMenuItems} />
          </div>
        </nav>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h1>Initial componnet</h1>
      </Modal>
    </>
  )
}
