import { z } from "zod"
import { createSelectSchema, createUpdateSchema } from "drizzle-zod"
import { columns, projects } from "../../db/schema"
import { errorResponses } from "../../utils/http"

export const createColumnSchema = {
  tags: ["columns"],
  params: z.object({
    projectId: z.string(),
    boardId: z.string(),
  }),
  body: z.object({
    name: z.string(),
  }),
  response: {
    201: createSelectSchema(columns),
    ...errorResponses,
  },
} as const

export const updateColumnSchema = {
  tags: ["columns"],
  params: z.object({
    projectId: z.string(),
    boardId: z.string(),
  }),
  body: createUpdateSchema(columns).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  response: {
    200: createSelectSchema(projects),
    ...errorResponses,
  } as const,
}
