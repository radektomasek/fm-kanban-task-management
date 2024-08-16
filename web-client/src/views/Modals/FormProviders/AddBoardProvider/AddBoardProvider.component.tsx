import { FormProvider, useForm } from "react-hook-form"
import {
  BoardForm,
  boardFormSchema,
  defaultBoardFormValues,
} from "@/types/boards"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddBoard } from "@/views/Modals/ModalChildren"

export const AddBoardProvider = () => {
  const methods = useForm<BoardForm>({
    mode: "all",
    resolver: zodResolver(boardFormSchema),
    defaultValues: defaultBoardFormValues,
  })

  return (
    <FormProvider {...methods}>
      <AddBoard />
    </FormProvider>
  )
}
