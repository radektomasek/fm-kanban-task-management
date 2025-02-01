import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  getTasksSchema,
  updateTaskSchema,
} from "./task.schema"

export async function createTaskHandler(
  request: FastifyRequest<{
    Querystring: z.infer<typeof createTaskSchema.queryString>
    Body: z.infer<typeof createTaskSchema.body>
  }>,
  reply: FastifyReply
) {}

export async function updateTaskHandler(
  request: FastifyRequest<{
    Querystring: z.infer<typeof updateTaskSchema.queryString>
    Params: z.infer<typeof updateTaskSchema.params>
    Body: z.infer<typeof updateTaskSchema.body>
  }>,
  reply: FastifyReply
) {}

export async function getTaskHandler(
  request: FastifyRequest<{
    Querystring: z.infer<typeof getTaskSchema.queryString>
    Params: z.infer<typeof getTaskSchema.params>
  }>,
  reply: FastifyReply
) {}

export async function getTasksHandler(
  request: FastifyRequest<{
    Querystring: z.infer<typeof getTasksSchema.queryString>
  }>,
  reply: FastifyReply
) {}

export async function deleteTaskHandler(
  request: FastifyRequest<{
    Querystring: z.infer<typeof deleteTaskSchema.queryString>
    Params: z.infer<typeof deleteTaskSchema.params>
  }>,
  reply: FastifyReply
) {}
