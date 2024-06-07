import { render, screen } from "@testing-library/react"
import { Button } from "@/components/forms"

describe("Button.component: rendering", () => {
  it("renders a Button component with a defined text", () => {
    const label = "Click me"
    render(<Button>{label}</Button>)
    const buttonElement = screen.getByRole("button")

    expect(buttonElement).not.toBeNull()
    expect(buttonElement.innerHTML).toContain(label)
  })
})
