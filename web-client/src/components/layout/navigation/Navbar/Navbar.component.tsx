import { Logo } from "@/components/layout/navigation"
import { Button } from "@/components/forms"
import { ContextMenu } from "@/components/menus"
import { useState } from "react"
import { ConfirmationDialog, Modal } from "@/components/modals"
import { boardContextMenuItems } from "@/utils/mocks/menus.mocks"

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
        <ConfirmationDialog
          title="Delete this board?"
          description="Are you sure you want to delete the 'Platform Launch' board? This action will remove all columns and tasks and cannot be reversed."
          onDelete={() => {}}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </>
  )
}
