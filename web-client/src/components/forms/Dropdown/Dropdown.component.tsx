import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  forwardRef,
} from "react"
import { assertIsNode } from "@/utils/helpers/types.helpers"
import { cn } from "@/utils/helpers/styles.helpers"
import Chevron from "@/assets/chevron.svg"

type InteractionType = "mouse" | "keyboard"

export type DropdownItem = {
  id: string
  name: string
}

type DropdownProps = {
  items: DropdownItem[]
  onItemSelect?: (item: DropdownItem) => void
  readonly title?: string
  readonly testId?: string
  readonly default?: DropdownItem
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<DropdownItem>(
      props.default ?? props.items[0] ?? ""
    )
    const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
      null
    )
    const [interactionType, setInteractionType] =
      useState<InteractionType | null>(null)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const optionsRefs = useRef<(HTMLLIElement | null)[]>([])

    useEffect(() => {
      if (props.default && props.default !== selectedOption) {
        setSelectedOption(props.default)
      }
    }, [props.default, selectedOption])

    useEffect(() => {
      document.addEventListener("click", handleOutsideClick)
      return () => {
        document.removeEventListener("click", handleOutsideClick)
      }
    }, [])

    useEffect(() => {
      if (
        focusedOptionIndex !== null &&
        optionsRefs.current[focusedOptionIndex]
      ) {
        optionsRefs.current[focusedOptionIndex]?.focus()
      }
    }, [focusedOptionIndex])

    const handleOptionClick = (option: DropdownItem): void => {
      setSelectedOption(option)
      setIsOpen(false)
      setFocusedOptionIndex(null)

      if (props.onItemSelect) {
        props.onItemSelect(option)
      }
    }

    const handleToggleDropdown = (): void => {
      setIsOpen(!isOpen)
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current) {
        assertIsNode(event.target)
        if (!dropdownRef.current.contains(event.target)) {
          setIsOpen(false)
          setFocusedOptionIndex(null)
        }
      }
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
        case "ArrowDown":
          setFocusedOptionIndex((prevIndex) => {
            return prevIndex === null ? 0 : (prevIndex + 1) % props.items.length
          })
          event.preventDefault()
          break
        case "ArrowUp":
          setFocusedOptionIndex((prevIndex) => {
            return prevIndex === null
              ? 0
              : (prevIndex - 1 + props.items.length) % props.items.length
          })
          event.preventDefault()
          break
        case "Enter":
          if (focusedOptionIndex !== null) {
            handleOptionClick(props.items[focusedOptionIndex])
          }
          event.preventDefault()
          break
        case "Escape":
          setIsOpen(false)
          setFocusedOptionIndex(null)
          event.preventDefault()
          break
        default:
          break
      }
    }

    return (
      <>
        {props.title && (
          <h4 className="mt-6 mb-2 text-custom-medium-grey text-2xs dark:text-custom-white">
            {props.title}
          </h4>
        )}

        <div
          data-testid={props.testId}
          className={cn(
            "relative",
            isOpen && "border border-custom-dark-purple overflow rounded"
          )}
          ref={(el) => {
            dropdownRef.current = el
            if (typeof ref === "function") ref(el)
            else if (ref) ref.current = el
          }}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <button
            role="combobox"
            className="bg-white border border-custom-medium-grey-25 rounded px-3 py-2 w-full text-left text-xs text-custom-black dark:bg-custom-dark-grey dark:text-custom-white"
            onClick={handleToggleDropdown}
          >
            {selectedOption.name}
          </button>
          <div
            className="absolute top-4 right-4 w-2.5 cursor-pointer "
            onClick={handleToggleDropdown}
          >
            <Chevron />
          </div>
          {isOpen && (
            <ul
              role="listbox"
              data-testid={`${props.testId}-list`}
              className="absolute bg-white rounded mt-1 w-full z-10"
            >
              {props.items.map((option, index) => (
                <li
                  key={option.id}
                  role="option"
                  className={cn(
                    "px-3 py-2 cursor-pointer text-xs text-custom-medium-grey dark:bg-custom-dark-grey",
                    interactionType === "mouse" &&
                      "hover:border-custom-dark-purple",
                    interactionType === "keyboard" &&
                      focusedOptionIndex === index &&
                      "border border-custom-dark-purple",
                    "focus:outline-none focus:ring-1 focus:ring-custom-dark-purple focus:border-transparent"
                  )}
                  onClick={() => handleOptionClick(option)}
                  // onMouseEnter={() => setFocusedOptionIndex(index)}
                  onMouseOver={() => {
                    setFocusedOptionIndex(index)
                    setInteractionType("mouse")
                  }}
                  ref={(element) => (optionsRefs.current[index] = element)}
                  tabIndex={-1}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }
)
