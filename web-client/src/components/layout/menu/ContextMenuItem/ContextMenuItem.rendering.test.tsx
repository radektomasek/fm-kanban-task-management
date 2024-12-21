import { render, screen } from "@testing-library/react"
import { ContextMenuItem } from "@/components/menus"

describe("ContextMenuItem.component: rendering", () => {
  describe("when type is set to 'standard'", () => {
    it("renders a button with a custom grey text", () => {
      const title = "Standard Item"
      render(
        <ContextMenuItem id={"standard"} type={"standard"} title={title} />
      )

      const listItemElement = screen.getByRole("listitem")
      expect(listItemElement).not.toBeNull()
      expect(listItemElement.className).toContain("text-custom-medium-grey")
    })
  })

  describe("when type is set to 'destructive'", () => {
    it("renders a button with a custom red text", () => {
      const title = "Destructive Item"
      render(
        <ContextMenuItem
          id={"destructive"}
          type={"destructive"}
          title={title}
        />
      )

      const listItemElement = screen.getByRole("listitem")
      expect(listItemElement).not.toBeNull()
      expect(listItemElement.className).toContain("text-custom-red")
    })
  })
})
