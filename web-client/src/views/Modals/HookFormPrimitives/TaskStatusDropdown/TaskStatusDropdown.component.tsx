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
  boardId?: string
  onItemSelect: (item: DropdownItem) => void
  defaultValue?: string
}

export function TaskStatusDropdown<T extends FieldValues>({
  name,
  boardId,
  onItemSelect,
  defaultValue,
  ...props
}: Props<T>) {
  const { control } = useFormContext()

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
            default={items.find((element) => element.id === defaultValue)}
          />
        )
      }}
    />
  )
}
