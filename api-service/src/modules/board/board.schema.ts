import { z } from "zod"
import { createSelectSchema, createUpdateSchema } from "drizzle-zod"
import { boards } from "../../db/schema"
import { errorResponses } from "../../utils/http"

export const createBoardSchema = {
  tags: ["boards"],
  queryString: z.object({
    projectId: z.string().optional(),
  }),
  body: z.object({
    name: z.string(),
  }),
  response: {
    201: createSelectSchema(boards),
    ...errorResponses,
  },
} as const

export const updateBoardSchema = {
  tags: ["boards"],
  queryString: z.object({
    projectId: z.string().optional(),
  }),
  params: z.object({
    boardId: z.string(),
  }),
  body: createUpdateSchema(boards).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  response: {
    200: createSelectSchema(boards),
    ...errorResponses,
  },
} as const

export const getBoardsSchema = {
  tags: ["boards"],
  queryString: z.object({
    projectId: z.string().optional(),
  }),
  response: {
    200: createSelectSchema(boards),
    ...errorResponses,
  },
} as const

export const getBoardSchema = {
  tags: ["boards"],
  queryString: z.object({
    projectId: z.string().optional(),
  }),
  params: z.object({
    boardId: z.string(),
  }),
  response: {
    200: createSelectSchema(boards),
    ...errorResponses,
  },
} as const

export const deleteBoardSchema = {
  tags: ["boards"],
  queryString: z.object({
    projectId: z.string().optional(),
  }),
  params: z.object({
    boardId: z.string(),
  }),
  response: {
    200: createSelectSchema(boards),
    ...errorResponses,
  },
}
