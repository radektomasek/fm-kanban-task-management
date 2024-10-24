import { Checkbox } from "@/components/forms"

export const ViewTaskDetail = () => {
  return (
    <>
      <h3 className="text-lg">
        Research pricing points of various competitors and trial different
        business models
      </h3>
      <p>
        We know that we are planning to to build for the version one. Now we
        need to finalize the first pricing model, we'll use. Keep iterating the
        subtasks until we have a coherent proposition.
      </p>
      Subtasks (2 of 3) Checkbox
      <Checkbox
        name={"subtask"}
        label={"Research competitors pricing and business models"}
      />
    </>
  )
}
