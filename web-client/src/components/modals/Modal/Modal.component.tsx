import { type ReactNode } from "react"
import { createPortal } from "react-dom"

type Props = {
  isOpen: boolean
  children: ReactNode
  onClose: () => void
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  const modalRootId = document.getElementById("modal")

  if (!modalRootId || !isOpen) {
    return null
  }

  return createPortal(
    <>
      <div
        className="fixed right-0 left-0 top-0 bottom-0 bg-custom-black-50 z-10"
        onClick={onClose}
      >
        <div className="fixed top-1/2 left-1/2 bg-custom-white p-2 rounded-md flex flex-col">
          {children}
        </div>
      </div>
    </>,
    modalRootId
  )
}

export default Modal
