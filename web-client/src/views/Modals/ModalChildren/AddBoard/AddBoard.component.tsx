import { Button, TextField } from "@/components/forms"
import { RowBlock } from "@/components/grid"

export const AddBoard = () => {
  return (
    <form className="flex flex-col min-h-[22.8125rem] justify-between">
      <h3 className="text-lg">Add New Board</h3>

      <label
        className={"text-2xs text-custom-medium-grey"}
        htmlFor={"boardName"}
      >
        Name
      </label>

      <TextField
        id={"boardName"}
        name="boardName"
        placeholder={"e.g. Web Design"}
      />

      <label className={"text-2xs text-custom-medium-grey"}>Columns</label>

      <RowBlock>
        <TextField name="column" value={"Todo"} placeholder={"e.g. Done"} />

        <Button
          wrapped={true}
          iconName={"cross"}
          onClick={() => {}}
          intent={"svgOnly"}
        />
      </RowBlock>

      <RowBlock>
        <TextField name="column" value={"Doing"} placeholder={"e.g. Done"} />

        <Button
          wrapped={true}
          iconName={"cross"}
          onClick={() => {}}
          intent={"svgOnly"}
        />
      </RowBlock>

      <Button type={"submit"} intent={"secondary"} className="w-full">
        + Add New Column
      </Button>

      <Button type={"submit"} intent={"primary"} className="w-full">
        Create New Board
      </Button>
    </form>
  )
}
