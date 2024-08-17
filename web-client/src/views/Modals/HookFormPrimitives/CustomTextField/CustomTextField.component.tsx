import {
  Path,
  Controller,
  useFormContext,
  type FieldValues,
} from "react-hook-form"
import { TextField } from "@/components/forms"

type Props<T extends FieldValues> = {
  id: string
  name: Path<T>
  placeholder: string
  errorText?: string
}

export function CustomTextField<T extends FieldValues>({
  id,
  name,
  placeholder,
  errorText,
  ...props
}: Props<T>) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <TextField
            {...field}
            {...props}
            id={id}
            errorText={errorText}
            placeholder={placeholder}
          />
        )
      }}
    />
  )
}
