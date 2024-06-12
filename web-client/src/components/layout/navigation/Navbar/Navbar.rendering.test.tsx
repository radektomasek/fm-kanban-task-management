import { nanoid } from "nanoid"
import { render, screen } from "@testing-library/react"
import { Navbar } from "@/components/layout/navigation"

describe("Navbar.component: rendering", () => {
  it("renders the component with the boardName as title", () => {
    const testId = nanoid()
    const boardName = "Platform launch"

    render(<Navbar testId={testId} boardName={boardName} />)

    const navBarElement = screen.getByTestId(testId)
    const titleElement = screen.getByRole("heading")

    expect(navBarElement).not.toBeNull()
    expect(titleElement.textContent).toEqual(boardName)
  })
})
