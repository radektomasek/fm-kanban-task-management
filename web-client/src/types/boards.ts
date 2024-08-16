import { z } from "zod"
import { fieldErrorTooShort, fieldErrorTooLong } from "@/types/constants"

export const boardSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const boardFormSchema = z.intersection(
  z.object({
    name: z
      .string()
      .min(1, { message: fieldErrorTooShort })
      .max(20, { message: fieldErrorTooLong }),
  }),

  z.discriminatedUnion("variant", [
    z.object({
      variant: z.literal("create"),
      columns: z.array(
        z.object({
          name: z.string(
            z
              .string()
              .min(1, { message: fieldErrorTooShort })
              .max(20, { message: fieldErrorTooLong })
          ),
        })
      ),
    }),
    z.object({
      variant: z.literal("edit"),
      id: z.string().min(1),
      columns: z.array(
        z.object({
          id: z.string().min(1),
          name: z.string(
            z
              .string()
              .min(1, { message: fieldErrorTooShort })
              .max(20, { message: fieldErrorTooLong })
          ),
        })
      ),
    }),
  ])
)

export type Board = z.infer<typeof boardSchema>
export type BoardForm = z.infer<typeof boardFormSchema>

export const defaultBoardFormValues: BoardForm = {
  variant: "create",
  name: "",
  columns: [{ name: "Todo" }, { name: "Doing" }],
}
