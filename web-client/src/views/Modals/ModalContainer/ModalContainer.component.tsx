import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import * as modalChildren from "@/views/Modals/ModalChildren"
import type { ModalScreenKey } from "@/types/modals"
import { FormProvider, useForm } from "react-hook-form"
import {
  BoardForm,
  boardFormSchema,
  defaultBoardFormValues,
} from "@/types/boards"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddBoard } from "@/views/Modals/ModalChildren"

const ModalChild = (modalScreenKey: ModalScreenKey) => {
  switch (modalScreenKey) {
    case "AddBoardScreen":
      return modalChildren["AddBoard"]
    case "DeleteBoardScreen":
      return modalChildren["DeleteBoard"]
    case "None":
    default:
      return null
  }
}

export const ModalContainer = () => {
  const methods = useForm<BoardForm>({
    mode: "all",
    resolver: zodResolver(boardFormSchema),
    defaultValues: defaultBoardFormValues,
  })

  const { activeModal, handleCloseModal } = useStore(
    useShallow((state) => ({
      activeModal: state.activeModal,
      handleCloseModal: state.handleCloseModal,
    }))
  )

  const modalRootId = document.getElementById("modal")
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (overlayRef.current && overlayRef.current === event.target) {
      handleCloseModal()
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCloseModal()
    }

    if (event.key === "Tab" && contentRef.current) {
      const focusableElements =
        contentRef.current.querySelectorAll<HTMLElement>(
          "a[href], button, textarea, input, select, [tabindex]:not([tabindex='-1'])"
        )

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus()
        event.preventDefault()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus()
        event.preventDefault()
      }
    }
  }

  useEffect(() => {
    if (activeModal) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)

      if (contentRef.current) {
        const focusableElements =
          contentRef.current.querySelectorAll<HTMLElement>(
            "a[href], button, textarea, input, select, [tabindex]:not([tabindex='-1'])"
          )

        if (focusableElements.length > 0) {
          focusableElements[0].focus()
        }
      }
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)

      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus()
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeModal])

  if (!modalRootId || activeModal === "None") {
    return null
  }

  const modalChild = ModalChild(activeModal)

  return (
    modalChild &&
    createPortal(
      <>
        <div
          ref={overlayRef}
          className="fixed right-0 left-0 top-0 bottom-0 bg-custom-black-50 z-10"
        >
          <div
            ref={contentRef}
            className="w-[30rem] px-8 pt-8 pb-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-custom-white rounded-md"
          >
            <FormProvider {...methods}>
              <AddBoard />
            </FormProvider>
            {/*{modalChild()}*/}
          </div>
        </div>
      </>,
      modalRootId
    )
  )
}
