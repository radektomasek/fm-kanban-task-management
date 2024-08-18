import { z } from "zod"
import { fieldErrorTooShort, fieldErrorTooLong } from "@/types/constants"

export const boardSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const boardDeleteSchema = z.object({
  id: z.string(),
  message: z.string(),
})

export const boardFormSchema = z.discriminatedUnion("variant", [
  z.object({
    variant: z.literal("create"),
    name: z
      .string()
      .min(1, { message: fieldErrorTooShort })
      .max(20, { message: fieldErrorTooLong }),
    columns: z.array(
      z.object({
        name: z
          .string()
          .min(1, { message: fieldErrorTooShort })
          .max(20, { message: fieldErrorTooLong }),
      })
    ),
  }),
  z.object({
    variant: z.literal("edit"),
    id: z.string(),
    name: z
      .string()
      .min(1, { message: fieldErrorTooShort })
      .max(20, { message: fieldErrorTooLong }),
    columns: z.array(
      z.object({
        id: z.string(),
        name: z
          .string()
          .min(1, { message: fieldErrorTooShort })
          .max(20, { message: fieldErrorTooLong }),
      })
    ),
  }),
])

export type Board = z.infer<typeof boardSchema>
export type BoardDelete = z.infer<typeof boardDeleteSchema>
export type BoardForm = z.infer<typeof boardFormSchema>

export const isCreateBoardForm = (
  data: BoardForm
): data is Extract<BoardForm, { variant: "create" }> => {
  return data.variant === "create"
}

export const isEditBoardForm = (
  data: BoardForm
): data is Extract<BoardForm, { variant: "edit" }> => {
  return data.variant === "edit"
}

export const defaultBoardFormValues: BoardForm = {
  variant: "create",
  name: "",
  columns: [{ name: "Todo" }, { name: "Doing" }],
}
