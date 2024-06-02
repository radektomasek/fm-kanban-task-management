import { useEffect, useRef, useState } from "react"
import { assertIsNode } from "@/utils/helpers/types.helpers"
import { cn } from "@/utils/helpers/styles.helpers"
import Chevron from "@/assets/chevron.svg"

type DropdownProps = {
  testId?: string
  items: string[]
  default?: string
}

export const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>(
    props.default ?? props.items[0] ?? ""
  )
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [])

  const handleOptionClick = (option: string): void => {
    setSelectedOption(option)
    setIsOpen(false)
    /**
     * @TODO: add a callback function that pass data towards the centralized state (e.g. via callback)
     */
  }

  const handleToggleDropdown = (): void => {
    setIsOpen(!isOpen)
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current) {
      assertIsNode(event.target)
      if (!dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
  }

  return (
    <div
      data-testid={props.testId}
      className={cn(
        "relative min-w-96",
        isOpen && "border border-custom-dark-purple overflow rounded"
      )}
      ref={dropdownRef}
    >
      <button
        className="bg-white border border-custom-medium-grey-25 rounded px-3 py-2 w-full text-left text-xs text-custom-black"
        onClick={handleToggleDropdown}
      >
        {selectedOption}
      </button>
      <div
        className="absolute top-4 right-4 w-2.5 cursor-pointer"
        onClick={handleToggleDropdown}
      >
        <Chevron />
      </div>
      {isOpen && (
        <ul
          data-testid={`${props.testId}-list`}
          className="absolute bg-white rounded mt-1 w-full z-10"
        >
          {props.items.map((option) => (
            <li
              key={option}
              className={cn(
                "px-3 py-2 cursor-pointer text-xs text-custom-medium-grey first:pt-4 last:pb-4",
                {}
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
