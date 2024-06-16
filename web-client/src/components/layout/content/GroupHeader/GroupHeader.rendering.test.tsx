import { nanoid } from "nanoid"
import { render, screen } from "@testing-library/react"
import { GroupHeader } from "@/components/layout/content"

describe("GroupHeader.component: rendering", () => {
  it("renders the component", () => {
    const testId = nanoid()
    const title = "Todo"
    const circleColor = "hsl(53,91%,56%)"
    const numberOfItems = 4

    render(
      <GroupHeader
        id={testId}
        testId={testId}
        title={title}
        circleColor={circleColor}
        numberOfItems={numberOfItems}
      />
    )

    const headerElement = screen.queryByText(`${title} (${numberOfItems})`)
    const circleBoxContainer = screen.queryByTestId(`${testId}-circleBox`)
    expect(headerElement).not.toBeNull()
    expect(circleBoxContainer).not.toBeNull()
  })
})
