import { z } from "zod"
import { createSelectSchema } from "drizzle-zod"
import { tasks } from "../../db/schema"
import { errorResponses } from "../../utils/http"

export const createTaskSchema = {
  tags: ["tasks"],
  queryString: z.object({
    boardId: z.string(),
    columnId: z.string(),
    projectId: z.string(),
  }),
  body: z.object({
    title: z.string(),
    description: z.string(),
  }),
  response: {
    201: createSelectSchema(tasks),
    ...errorResponses,
  },
} as const

export const updateTaskSchema = {
  tags: ["tasks"],
  queryString: z.object({
    boardId: z.string(),
    columnId: z.string(),
    projectId: z.string(),
  }),
  params: z.object({
    taskId: z.string(),
  }),
  body: z.object({
    title: z.string(),
    description: z.string(),
  }),
  response: {
    200: createSelectSchema(tasks),
    ...errorResponses,
  },
} as const

export const getTasksSchema = {
  tags: ["tasks"],
  queryString: z.object({
    boardId: z.string(),
    projectId: z.string(),
  }),
  response: {
    200: createSelectSchema(tasks),
    ...errorResponses,
  },
} as const

export const getTaskSchema = {
  tags: ["tasks"],
  queryString: z.object({
    boardId: z.string(),
    projectId: z.string(),
  }),
  params: z.object({
    taskId: z.string(),
  }),
  response: {
    200: createSelectSchema(tasks),
    ...errorResponses,
  },
} as const

export const deleteTaskSchema = {
  tags: ["tasks"],
  queryString: z.object({
    boardId: z.string(),
    projectId: z.string(),
  }),
  params: z.object({
    taskId: z.string(),
  }),
  response: {
    200: createSelectSchema(tasks),
    ...errorResponses,
  },
} as const
