import { nanoid } from "nanoid"
import { MemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import { boards } from "@/utils/mocks/boards.mocks"
import { SidebarLargeScreen } from "@/components/layout/menu"

describe("SidebarLargeScreen.component: rendering", () => {
  it("renders the component", () => {
    const testId = nanoid()
    render(
      <MemoryRouter>
        <SidebarLargeScreen
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
