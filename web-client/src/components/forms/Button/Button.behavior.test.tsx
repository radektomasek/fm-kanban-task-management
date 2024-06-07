import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "@/components/forms"
import { useState } from "react"

const ButtonTestComponent = ({
  label,
  isWrapped,
}: {
  label: string
  isWrapped: boolean
}) => {
  const [wrapped, setWrapped] = useState(isWrapped)
  const handleClick = () => setWrapped((prev) => !prev)

  return (
    <Button
      intent="sidebar"
      onClick={handleClick}
      wrapped={wrapped}
      iconName="eye"
    >
      {label}
    </Button>
  )
}

describe("Button.component: behavior", () => {
  describe("when the button is rendered as an unwrapped sidebar button", () => {
    describe("and the user clicks on the button", () => {
      it("wraps the button and renders it in its wrapped form", () => {
        const label = "Hide sidebar"
        render(<ButtonTestComponent label={label} isWrapped={false} />)

        let unwrapped = screen.queryByText(label)
        expect(unwrapped).not.toBeNull()

        const buttonElement = screen.getByRole("button")
        fireEvent.click(buttonElement)

        unwrapped = screen.queryByText(label)
        expect(unwrapped).toBeNull()
      })
    })
  })

  describe("when the button is rendered as a wrapped sidebar button", () => {
    describe("and the user clicks on the button", () => {
      it("unwraps the button and renders it in its unwrapped form", () => {
        const label = "Hide sidebar"
        render(<ButtonTestComponent label={label} isWrapped={true} />)

        let wrapped = screen.queryByText(label)
        expect(wrapped).toBeNull()

        const buttonElement = screen.getByRole("button")
        fireEvent.click(buttonElement)

        wrapped = screen.queryByText(label)
        expect(wrapped).not.toBeNull()
      })
    })
  })
})
