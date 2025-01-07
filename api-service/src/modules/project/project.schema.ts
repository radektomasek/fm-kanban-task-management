import { z } from "zod";
import { createSelectSchema, createUpdateSchema } from "drizzle-zod"
import { projects } from "../../db/schema"
import { errorResponses } from "../../utils/http"

export const createProjectSchema = {
  tags: ["project"],
  body: z.object({
    name: z.string()
  }),
  response: {
    201: createSelectSchema(projects),
    ...errorResponses
  }
} as const;

export type CreateProjectBody = z.infer<
  typeof createProjectSchema.body
>

export const updateProjectSchema = {
  tags: ["project"],
  params: z.object({
    projectId: z.string()
  }),
  body: createUpdateSchema(projects).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  response: {
    200: createSelectSchema(projects),
    ...errorResponses,
  }
} as const;

export type UpdateProjectParams = z.infer<
  typeof updateProjectSchema.params
>

export type UpdateProjectBody = z.infer<
  typeof updateProjectSchema.body
>