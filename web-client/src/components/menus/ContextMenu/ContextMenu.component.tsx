import { ContextMenuItem } from "@/components/menus"
import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { Button } from "@/components/forms"
import { assertIsNode } from "@/utils/helpers/types.helpers"
import { cn } from "@/utils/helpers/styles.helpers"
import { ContextMenuElement } from "@/types/contextMenus"
import type { ModalScreenKey } from "@/types/modals"

type InteractionType = "mouse" | "keyboard"

type Props = {
  readonly testId?: string
  readonly items: ContextMenuElement[]
  onItemSelect?: (screenKey: ModalScreenKey) => void
}

export const ContextMenu = ({ items, testId, onItemSelect }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
    null
  )
  const [interactionType, setInteractionType] =
    useState<InteractionType | null>(null)

  const dropdownRef = useRef<HTMLButtonElement | null>(null)
  const menuItemsRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (
      focusedOptionIndex !== null &&
      menuItemsRefs.current[focusedOptionIndex]
    ) {
      menuItemsRefs.current[focusedOptionIndex]?.focus()
    }
  }, [focusedOptionIndex])

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current) {
      assertIsNode(event.target)
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false)
        setFocusedOptionIndex(null)
      }
    }
  }

  const handleOptionClick = (id: ModalScreenKey): void => {
    setIsOpen(false)
    setFocusedOptionIndex(null)

    if (onItemSelect) {
      onItemSelect(id)
    }
  }

  const toggleShowContextMenu = () => {
    setInteractionType("mouse")
    setIsOpen(!isOpen)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    setInteractionType("keyboard")
    if (!isOpen) {
      if (
        event.key === "Enter" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowUp"
      ) {
        setIsOpen(true)
        setFocusedOptionIndex(0)
        event.preventDefault()
      }

      return
    }

    switch (event.key) {
      case "Tab":
      case "ArrowDown":
        setFocusedOptionIndex((prevIndex) => {
          return prevIndex === null ? 0 : (prevIndex + 1) % items.length
        })
        event.preventDefault()
        break
      case "ArrowUp":
        setFocusedOptionIndex((prevIndex) => {
          return prevIndex === null
            ? 0
            : (prevIndex - 1 + items.length) % items.length
        })
        event.preventDefault()
        break
      case "Enter":
        if (focusedOptionIndex !== null) {
          handleOptionClick(items[focusedOptionIndex].id)
        }
        event.preventDefault()
        break
      case "Escape":
        setIsOpen(false)
        setFocusedOptionIndex(0)
        event.preventDefault()
        break
      default:
        break
    }
  }

  const handleMouseOver = (index: number) => () => {
    setFocusedOptionIndex(index)
    setInteractionType("mouse")
  }

  return (
    <>
      <Button
        data-testid={`${testId}-button`}
        intent={"svgOnly"}
        iconName="dots"
        onClick={toggleShowContextMenu}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={dropdownRef}
      />
      {isOpen && (
        <ul
          role="listbox"
          data-testid={`${testId}-list`}
          className="absolute flex flex-col justify-evenly px-2 w-48 min-h-24 top-14 right-4 bg-custom-white z-1 rounded-lg"
          onKeyDown={handleKeyDown}
        >
          {items.map((element, index) => (
            <ContextMenuItem
              key={element.id}
              ref={(element) => (menuItemsRefs.current[index] = element)}
              onMouseOver={handleMouseOver(index)}
              onOptionClick={handleOptionClick}
              className={cn(
                interactionType === "mouse" &&
                  "hover:bg-custom-light-purple-25",
                interactionType === "keyboard" &&
                  focusedOptionIndex === index &&
                  "border bg-custom-light-purple-25",
                "focus:outline-none focus:ring-1 focus:ring-custom-dark-purple focus:border-transparent"
              )}
              {...element}
            />
          ))}
        </ul>
      )}
    </>
  )
}
