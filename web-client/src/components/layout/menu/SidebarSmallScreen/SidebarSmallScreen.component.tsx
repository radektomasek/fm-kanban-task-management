import { createPortal } from "react-dom"
import { useEffect, useRef } from "react"
import { Board } from "@/types/boards"
import type { ThemeMode } from "@/types/theme"
import { cn } from "@/utils/helpers/styles.helpers"
import {
  MenuLink,
  SidebarHeader,
  ThemeSwitcher,
} from "@/components/layout/menu"
import { Button } from "@/components/forms"

type Props = {
  readonly testId?: string
  isActive: boolean
  boards: Board[]
  selectedTheme: ThemeMode
  selectedBoard?: Board
  onThemeUpdate: (theme: ThemeMode) => void
  onBoardCreateClick: () => void
  onSidebarClose: () => void
}

export const SidebarSmallScreen = ({
  testId,
  isActive,
  onSidebarClose,
  boards,
  selectedTheme,
  selectedBoard,
  onThemeUpdate,
  onBoardCreateClick,
}: Props) => {
  const modalRootId = document.getElementById("layout")
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (overlayRef.current && overlayRef.current === event.target) {
      onSidebarClose()
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onSidebarClose()
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
    if (isActive) {
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
  }, [isActive])

  const getBoardButtonLinks = (boards: Board[], selectedBoard?: Board) =>
    boards.map((board) => (
      <li key={board.id} className="list-none">
        <MenuLink
          label={board.name}
          link={board.id}
          active={board.id === selectedBoard?.id}
        />
      </li>
    ))

  if (!modalRootId || !isActive) {
    return null
  }

  return createPortal(
    <>
      <div
        ref={overlayRef}
        className="fixed right-0 left-0 top-0 bottom-0 bg-custom-black-50 z-10 md:hidden"
      >
        <div
          ref={contentRef}
          className="py-4 fixed top-60 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-custom-white rounded-md dark:bg-custom-dark-grey"
        >
          <aside
            data-testid={testId}
            className="dark:bg-custom-dark-grey  relative"
          >
            <div
              className={cn(
                "flex flex-col w-[18.65rem] bg-custom-white relative pr-4 dark:bg-custom-dark-grey"
              )}
            >
              <SidebarHeader
                className="ml-8 mb-3"
                title={"All Boards"}
                numberOfBoards={boards.length}
              />
              {getBoardButtonLinks(boards, selectedBoard)}
              <li className="list-none">
                <Button
                  active={false}
                  intent={"sidebar"}
                  className="text-custom-dark-purple"
                  onClick={onBoardCreateClick}
                >
                  + Create New Board
                </Button>
              </li>
              <ThemeSwitcher
                className={"mx-auto mt-4"}
                default={selectedTheme}
                onThemeUpdate={onThemeUpdate}
              />
            </div>
          </aside>
        </div>
      </div>
    </>,
    modalRootId
  )
}
