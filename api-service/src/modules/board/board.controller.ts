import { FastifyReply, FastifyRequest } from "fastify"
import { CreateBoardBody, CreateBoardQueryString } from "./board.schema"
import { createBoard } from "./board.service"
import { StatusCodes } from "http-status-codes"
import { PostgresError } from "postgres"
import { logger } from "../../utils/logger"
import { PostgresError as PostgresErrorEnum } from "pg-error-enum/dist/PostgresError"
import { httpError } from "../../utils/http"

export async function createBoardHandler(
  request: FastifyRequest<{
    Querystring: CreateBoardQueryString
    Body: CreateBoardBody
  }>,
  reply: FastifyReply
) {
  try {
    const projectId = request.query.projectId
    if (!projectId) {
      throw new ReferenceError(
        "createBoardHandler: Missing 'projectId' query string parameter"
      )
    }

    const result = await createBoard(
      {
        ...request.body,
        projectId,
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
          message: "Board already exists",
          code: StatusCodes.CONFLICT,
        })
      }
    }

    logger.error(
      { error, body: request.body },
      "createBoardHandler: unexpected error"
    )

    return httpError({
      reply,
      message: "Failed to create a board",
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    })
  }
}
