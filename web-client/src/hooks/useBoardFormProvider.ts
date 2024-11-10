import type { ModalScreenKey } from "@/types/modals"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  BoardForm,
  boardFormSchema,
  defaultBoardFormValues,
} from "@/types/boards"

export function useBoardFormProvider(modalScreenKey: ModalScreenKey) {
  const methods = useForm<BoardForm>({
    mode: "all",
    resolver: zodResolver(boardFormSchema),
    defaultValues: defaultBoardFormValues,
  })

  switch (modalScreenKey) {
    case "AddBoardScreen":
      return methods

    case "None":
    default:
      return methods
  }
}
