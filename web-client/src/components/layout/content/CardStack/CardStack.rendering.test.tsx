import { render, screen } from "@testing-library/react"
import { CardStack } from "@/components/layout/content"
import { cards } from "@/utils/mocks/cards.mocks"
import { nanoid } from "nanoid"

describe("CardStack.component: rendering", () => {
  describe("when cards array is empty", () => {
    it("renders the header part only", () => {
      const testId = nanoid()
      const title = "Todo"
      const circleColor = "hsl(53,91%,56%)"

      render(
        <CardStack
          id={title}
          testId={testId}
          title={title}
          circleColor={circleColor}
          cards={[]}
        />
      )

      const container = screen.getByTestId(testId)
      expect(container.children.length).toEqual(1)
      expect(container.children[0].textContent).toEqual(`${title} (0)`)
    })
  })

  describe("when cards array contain some elements", () => {
    it("renders the header part + the cards based on the passed array", () => {
      const testId = nanoid()
      const title = "Doing"
      const circleColor = "hsl(53,91%,56%)"
      const sampleCards = cards.slice(0, 2)

      render(
        <CardStack
          id={title}
          testId={testId}
          title={title}
          circleColor={circleColor}
          cards={sampleCards}
        />
      )

      const container = screen.getByTestId(testId)
      expect(container.children.length).toEqual(3)
      expect(container.children[0].textContent).toEqual(`${title} (2)`)
      sampleCards.forEach((card) => {
        const component = screen.getByText(card.title)
        expect(component).not.toBeNull()
      })
    })
  })
})
