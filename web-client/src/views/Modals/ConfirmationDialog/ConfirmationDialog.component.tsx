import { Button } from "@/components/forms"

type Props = {
  title: string
  description: string
  onCancel: () => void
  onDelete: () => void
}

export const ConfirmationDialog = ({
  title,
  description,
  onCancel,
  onDelete,
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg text-custom-red">{title}</h3>
      <p className="text-xs text-custom-medium-grey">{description}</p>
      <div className="flex flex-col h-24 md:h-min md:flex-row justify-between">
        <Button
          className="w-full md:w-[12.5rem]"
          intent={"destructive"}
          onClick={onDelete}
        >
          Delete
        </Button>
        <Button
          className="w-full md:w-[12.5rem]"
          intent={"secondary"}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
