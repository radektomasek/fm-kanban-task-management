import { nanoid } from "nanoid"
import { render, screen } from "@testing-library/react"
import { Navbar } from "@/components/layout/navigation"
import { Board } from "@/types/boards"

describe("Navbar.component: rendering", () => {
  it("renders the component with the boardName as title", () => {
    const testId = nanoid()
    const boardName = "Platform launch"
    const selectedBoard: Board = { id: nanoid(), name: boardName }

    render(<Navbar testId={testId} selectedBoard={selectedBoard} />)

    const navBarElement = screen.getByTestId(testId)
    const titleElement = screen.getByRole("heading")

    expect(navBarElement).not.toBeNull()
    expect(titleElement.textContent).toEqual(boardName)
  })
})
