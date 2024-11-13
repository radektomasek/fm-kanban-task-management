import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  type BoardForm,
  boardFormSchema,
  defaultBoardFormValues,
} from "@/types/boards"

export function useBoardFormProvider() {
  return useForm<BoardForm>({
    mode: "all",
    resolver: zodResolver(boardFormSchema),
    defaultValues: defaultBoardFormValues,
  })
}
