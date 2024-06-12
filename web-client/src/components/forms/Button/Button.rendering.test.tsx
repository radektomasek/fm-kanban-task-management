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

  describe("when 'svgOnly' is set as intent", () => {
    it("renders the button with specified icon but no visible label", () => {
      const label = "Click me"
      render(
        <Button intent={"svgOnly"} iconName={"dots"}>
          {label}
        </Button>
      )

      const buttonElement = screen.getByRole("button")
      expect(buttonElement).not.toBeNull()
      expect(buttonElement.innerHTML).toContain(label)
      expect(buttonElement.children[1].className).contains("sr-only")
    })
  })
})
