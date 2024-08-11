import { Button } from "@/components/forms"

export const OnboardingPage = () => {
  return (
    <div className="flex bg-custom-light-grey flex-grow border-t-2 flex-col w-28 justify-center items-center gap-y-6">
      <p className="text-lg text-custom-medium-grey">
        No board found. Create a new board to get started.
      </p>
      <Button className="w-40" onClick={() => {}}>
        + Add New Board
      </Button>
    </div>
  )
}
