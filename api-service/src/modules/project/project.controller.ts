import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { PostgresError as PostgresErrorEnum } from "pg-error-enum"
import { PostgresError } from "postgres"
import { StatusCodes } from "http-status-codes"
import { createProjectSchema, updateProjectSchema } from "./project.schema"
import {
  createProject,
  getProjectById,
  updateProjectById,
} from "./project.service"
import { httpError } from "../../utils/http"
import { logger } from "../../utils/logger"

export async function createProjectHandler(
  request: FastifyRequest<{ Body: z.infer<typeof createProjectSchema.body> }>,
  reply: FastifyReply
) {
  try {
    const result = await createProject(
      {
        ...request.body,
      },
      request.db
    )

    return reply.status(StatusCodes.CREATED).send(result)
  } catch (error) {
    if (error instanceof PostgresError) {
      logger.error({ error, body: request.body }, "database error")

      if (error.code === PostgresErrorEnum.UNIQUE_VIOLATION) {
        return httpError({
          reply,
          message: "Project already exists",
          code: StatusCodes.CONFLICT,
        })
      }
    }

    logger.error(
      { error, body: request.body },
      "createProjectHandler: unexpected error"
    )

    return httpError({
      reply,
      message: "Failed to create project",
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function updateProjectHandler(
  request: FastifyRequest<{
    Params: z.infer<typeof updateProjectSchema.params>
    Body: z.infer<typeof updateProjectSchema.body>
  }>,
  reply: FastifyReply
) {
  try {
    const { projectId } = request.params
    const project = await getProjectById(projectId, request.db)

    if (!project) {
      return httpError({
        reply,
        message: "Project not found",
        code: StatusCodes.NOT_FOUND,
      })
    }

    const result = await updateProjectById(projectId, request.body, request.db)

    return reply.send(result)
  } catch (error) {
    logger.error(
      { error, params: request.params, body: request.body },
      "updateProjectHandler: failed to update the project"
    )
  }
}
