import type { FastifyInstance } from "fastify"
import {
  createProjectHandler,
  updateProjectHandler,
} from "./project.controller"
import { createProjectSchema, updateProjectSchema } from "./project.schema"
import { ZodTypeProvider } from "fastify-type-provider-zod"

/**
 * @TODO: Add auth mechanism to the `preHandler` array
 */
export async function projectRouter(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().post("/", {
    schema: createProjectSchema,
    preHandler: [],
    handler: createProjectHandler,
  })

  server.withTypeProvider<ZodTypeProvider>().put("/:projectId", {
    schema: updateProjectSchema,
    preHandler: [],
    handler: updateProjectHandler,
  })
}
