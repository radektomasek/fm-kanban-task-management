import { render, screen } from "@testing-library/react"
import { CardItem } from "@/components/layout/content"

describe("CardItem.component: rendering", () => {
  it("renders the component with provided parameters", () => {
    const id = "some-id"
    const status = "todo"
    const title = "Build UI for onboarding flow"
    const completedSubtasks = 0
    const allSubtasks = 3

    render(
      <CardItem
        id={id}
        status={status}
        title={title}
        allSubtasks={allSubtasks}
        completedSubtasks={completedSubtasks}
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
