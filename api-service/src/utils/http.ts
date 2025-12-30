import { FastifyReply } from "fastify"
import type { StatusCodes } from "http-status-codes"
import { z } from "zod"

type HttpError = {
  reply: FastifyReply
  message: string
  code: StatusCodes
  cause?: string
}

export function httpError({ reply, message, code, cause }: HttpError) {
  return reply.status(code).send({
    message,
    cause,
  })
}

export const httpErrorSchema = z.object({
  message: z.string(),
  cause: z.string().optional(),
})

export const errorResponses = {
  400: httpErrorSchema,
  401: httpErrorSchema,
  404: httpErrorSchema,
  500: httpErrorSchema,
}
