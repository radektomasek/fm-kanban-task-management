import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  getTasksSchema,
  updateTaskSchema,
} from "./task.schema"
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from "./task.controller"

export async function taskRouter(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().post("/", {
    schema: createTaskSchema,
    preHandler: [],
    handler: createTaskHandler,
  })

  server.withTypeProvider<ZodTypeProvider>().get("/", {
    schema: getTasksSchema,
    preHandler: [],
    handler: getTasksHandler,
  })

  server.withTypeProvider<ZodTypeProvider>().get("/:taskId", {
    schema: getTaskSchema,
    preHandler: [],
    handler: getTaskHandler,
  })

  server.withTypeProvider<ZodTypeProvider>().put("/:taskId", {
    schema: updateTaskSchema,
    preHandler: [],
    handler: updateTaskHandler,
  })

  server.withTypeProvider<ZodTypeProvider>().delete("/:taskId", {
    schema: deleteTaskSchema,
    preHandler: [],
    handler: deleteTaskHandler,
  })
}
