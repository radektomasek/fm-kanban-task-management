import { type ReactNode } from "react"
import { createPortal } from "react-dom"

type Props = {
  isOpen: boolean
  children: ReactNode
  onClose: () => void
}

export const Modal = ({ isOpen, onClose, children }: Props) => {
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
        <div className="w-[30rem] px-8 pt-8 pb-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-custom-white rounded-md">
          {children}
        </div>
      </div>
    </>,
    modalRootId
  )
}
