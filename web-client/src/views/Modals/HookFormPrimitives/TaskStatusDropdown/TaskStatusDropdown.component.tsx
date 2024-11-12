import {
  Path,
  Controller,
  useFormContext,
  type FieldValues,
} from "react-hook-form"

import { Dropdown, type DropdownItem } from "@/components/forms"
import { useBoardColumns } from "@/services/queries"

type Props<T extends FieldValues> = {
  id: string
  name: Path<T>
  title?: string
  boardId?: string
  defaultValue?: string
  onItemSelect: (item: DropdownItem) => void
}

export function TaskStatusDropdown<T extends FieldValues>({
  name,
  boardId,
  defaultValue,
  onItemSelect,
  ...props
}: Props<T>) {
  const { control } = useFormContext<T>()

  const { data: items = [] } = useBoardColumns(boardId)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Dropdown
            {...field}
            {...props}
            items={items.map(({ id, name }) => ({ id, name }))}
            onItemSelect={onItemSelect}
            default={
              items.find((element) => element.id === defaultValue) ?? items[0]
            }
          />
        )
      }}
    />
  )
}
