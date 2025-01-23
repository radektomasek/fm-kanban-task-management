import { z } from "zod"
import { createSelectSchema } from "drizzle-zod"
import { columns } from "../../db/schema"
import { errorResponses } from "../../utils/http"

export const createColumnSchema = z.array(
  z.object({
    projectId: z.string(),
    boardId: z.string(),
    name: z.string(),
  })
)

export const updateColumnSchema = z.array(
  z.object({
    projectId: z.string(),
    boardId: z.string(),
    name: z.string(),
    columnId: z.string().optional(),
  })
)

export const getColumnsSchema = {
  tags: ["columns"],
  queryString: z.object({
    projectId: z.string(),
    boardId: z.string(),
  }),
  response: {
    200: createSelectSchema(columns),
    ...errorResponses,
  },
} as const
