import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import {
  createBoardSchema,
  deleteBoardSchema,
  getBoardSchema,
  getBoardsSchema,
  updateBoardSchema,
} from "./board.schema"
import {
  createBoardHandler,
  deleteBoardHandler,
  getBoardHandler,
  getBoardsHandler,
  updateBoardHandler,
} from "./board.controller"
import { getBoardsByProjectId } from "./board.service"
import { ZodType } from "zod"

/**
 * @TODO: Add auth mechanism to the `preHandler` array
 */
export async function boardRouter(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().post("/", {
    schema: createBoardSchema,
    preHandler: [],
    handler: createBoardHandler,
  })

  server.withTypeProvider<ZodTypeProvider>().get("/", {
    schema: getBoardsSchema,
    preHandler: [],
    handler: getBoardsHandler,
  })

  server.withTypeProvider<ZodTypeProvider>().get("/:boardId", {
    schema: getBoardSchema,
    preHandler: [],
    handler: getBoardHandler,
  })

  server.withTypeProvider<ZodTypeProvider>().put("/:boardId", {
    schema: updateBoardSchema,
    preHandler: [],
    handler: updateBoardHandler,
  })

  server.withTypeProvider<ZodTypeProvider>().delete("/:boardId", {
    schema: deleteBoardSchema,
    preHandler: [],
    handler: deleteBoardHandler,
  })
}
