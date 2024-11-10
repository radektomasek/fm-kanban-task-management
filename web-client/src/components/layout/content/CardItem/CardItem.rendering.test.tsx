import { render, screen } from "@testing-library/react"
import { CardItem } from "@/components/layout/content"

describe("CardItem.component: rendering", () => {
  it("renders the component with provided parameters", () => {
    const id = "some-id"
    const boardId = "some-board-id"
    const columnId = "some-column-id"
    const description = "some description"
    const title = "Build UI for onboarding flow"
    const completedSubtasks = 0
    const allSubtasks = 3

    render(
      <CardItem
        id={id}
        title={title}
        boardId={boardId}
        columnId={columnId}
        description={description}
        subtasks={{ total: allSubtasks, completed: completedSubtasks }}
      />
    )

    const header = screen.getByText(title)
    const subheader = screen.getByText(
      `${completedSubtasks} of ${allSubtasks} subtasks`
    )

    expect(header).not.toBeNull()
    expect(subheader).not.toBeNull()
  })
})
