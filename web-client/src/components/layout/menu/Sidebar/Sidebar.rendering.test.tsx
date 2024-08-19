import { nanoid } from "nanoid"
import { render, screen } from "@testing-library/react"
import { Sidebar } from "@/components/layout/menu"
import { boards } from "@/utils/mocks/boards.mocks"
import { MemoryRouter } from "react-router-dom"

describe("Sidebar.component: rendering", () => {
  it("renders the component", () => {
    const testId = nanoid()
    render(
      <MemoryRouter>
        <Sidebar
          selectedTheme={"light"}
          selectedBoard={undefined}
          onBoardCreateClick={() => {}}
          onThemeUpdate={() => {}}
          testId={testId}
          boards={boards}
        />
      </MemoryRouter>
    )

    const sidebarElement = screen.getByTestId(testId)
    expect(sidebarElement).not.toBeNull()
  })
})
