import { render, screen } from "@testing-library/react"
import { SidebarHeader } from "./SidebarHeader.component"

describe("SidebarHeader.component: rendering", () => {
  it("render the header including the numeric parameter and capitalized style", () => {
    const title = "All Boards"
    const numberOfBoards = 6

    const expectedResult = `${title} (${numberOfBoards})`

    render(<SidebarHeader title={title} numberOfBoards={numberOfBoards} />)

    const headingElement = screen.getByRole("heading")

    expect(headingElement).not.toBeNull()
    expect(headingElement.innerHTML).toEqual(expectedResult)
    expect(headingElement.className).toContain("uppercase")
  })
})
