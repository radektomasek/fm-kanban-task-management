import {
  Path,
  Controller,
  useFormContext,
  type FieldValues,
  PathValue,
} from "react-hook-form"

import { Dropdown, type DropdownItem } from "@/components/forms"
import { useBoardColumns } from "@/services/queries"
import { useEffect, useState } from "react"

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
  const { control, setValue } = useFormContext<T>()
  const { data: items = [] } = useBoardColumns(boardId)
  const [selectedOption, setSelectedOption] = useState<
    DropdownItem | undefined
  >(items.find((element) => element.id === defaultValue) ?? items[0])

  useEffect(() => {
    const initialOption = items.find((element) => element.id === defaultValue)
    if (initialOption) {
      setSelectedOption(initialOption)
      setValue(name, initialOption.id as PathValue<T, Path<T>>)
    }
  }, [defaultValue, items, name, setValue])

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
            onItemSelect={(item) => {
              setSelectedOption(item)
              field.onChange(item.id)
              onItemSelect(item)
            }}
            default={selectedOption}
          />
        )
      }}
    />
  )
}
