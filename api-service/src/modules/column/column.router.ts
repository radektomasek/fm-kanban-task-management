import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { getColumnsSchema } from "./column.schema"
import { getColumnsHandler } from "./column.controller"

/**
 * @TODO: Add auth mechanism to the `preHandler` array
 */
export async function columnRouter(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().get("/", {
    schema: getColumnsSchema,
    preHandler: [],
    handler: getColumnsHandler,
  })
}
