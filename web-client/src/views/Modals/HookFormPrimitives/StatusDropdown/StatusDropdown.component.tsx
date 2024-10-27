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
  itemSelectionHandler: (item: DropdownItem) => void
}

export function StatusDropdown<T extends FieldValues>({
  name,
  boardId,
  itemSelectionHandler,
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
            onItemSelect={itemSelectionHandler}
          />
        )
      }}
    />
  )
}
