import { nanoid } from "nanoid"
import { render, screen } from "@testing-library/react"
import { Sidebar } from "@/components/layout/menu"
import { boards } from "@/utils/mocks/boards.mocks"

describe("Sidebar.component: rendering", () => {
  it("renders the component", () => {
    const testId = nanoid()
    render(<Sidebar testId={testId} boards={boards} />)

    const sidebarElement = screen.getByTestId(testId)
    expect(sidebarElement).not.toBeNull()
  })
})
