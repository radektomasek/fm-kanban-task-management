import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"
import { PostgresError } from "postgres"
import { PostgresError as PostgresErrorEnum } from "pg-error-enum/dist/PostgresError"
import { httpError } from "../../utils/http"
import { logger } from "../../utils/logger"
import {
  createBoardSchema,
  deleteBoardSchema,
  getBoardSchema,
  getBoardsSchema,
  updateBoardSchema,
} from "./board.schema"
import {
  createBoard,
  deleteBoardById,
  getBoardById,
  getBoardsByProjectId,
  updateBoardById,
} from "./board.service"
import { createColumns } from "../column/column.service"

export async function createBoardHandler(
  request: FastifyRequest<{
    Querystring: z.infer<typeof createBoardSchema.queryString>
    Body: z.infer<typeof createBoardSchema.body>
  }>,
  reply: FastifyReply
) {
  try {
    const { projectId } = request.query
    if (!projectId) {
      throw new ReferenceError(
        "createBoardHandler: Missing 'projectId' query string parameter"
      )
    }

    const { name, columns } = request.body

    const transactionResult = await request.db.transaction(async (trx) => {
      const boardResult = await createBoard(
        {
          name,
          projectId,
        },
        trx
      )

      const columnsInput = columns.map((element) => ({
        name: element.name,
        boardId: boardResult.id,
        projectId: projectId,
      }))

      const columnsResult = await createColumns(columnsInput, trx)

      return { board: boardResult, columns: columnsResult }
    })

    return reply.status(StatusCodes.CREATED).send(transactionResult)
  } catch (error) {
    if (error instanceof ReferenceError) {
      logger.error(
        { error, body: request.body },
        "createBoardHandler: missing required query parameter projectId"
      )

      return httpError({
        reply,
        message: "Missing 'projectId' querystring parameter",
        code: StatusCodes.BAD_REQUEST,
      })
    }

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

export async function updateBoardHandler(
  request: FastifyRequest<{
    Querystring: z.infer<typeof updateBoardSchema.queryString>
    Params: z.infer<typeof updateBoardSchema.params>
    Body: z.infer<typeof updateBoardSchema.body>
  }>,
  reply: FastifyReply
) {
  try {
    const { projectId } = request.query
    if (!projectId) {
      throw new ReferenceError(
        "updateBoardHandler: Missing 'projectId' query string parameter"
      )
    }

    const { boardId } = request.params
    const board = await getBoardById(boardId, request.db)

    if (!board) {
      return httpError({
        reply,
        message: "Board not found",
        code: StatusCodes.NOT_FOUND,
      })
    }

    const result = await updateBoardById(boardId, request.body, request.db)

    return reply.send(result)
  } catch (error) {
    if (error instanceof ReferenceError) {
      logger.error(
        { error, body: request.body },
        "updateBoardHandler: missing required query parameter projectId"
      )

      return httpError({
        reply,
        message: "Missing 'projectId' querystring parameter",
        code: StatusCodes.BAD_REQUEST,
      })
    }

    logger.error(
      { error, body: request.body },
      "updateBoardHandler: unexpected error"
    )

    return httpError({
      reply,
      message: "Failed to update the board",
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function getBoardsHandler(
  request: FastifyRequest<{
    Querystring: z.infer<typeof getBoardsSchema.queryString>
  }>,
  reply: FastifyReply
) {
  try {
    const { projectId } = request.query
    if (!projectId) {
      throw new ReferenceError(
        "getBoardsHandler: Missing 'projectId' query string parameter"
      )
    }

    const result = await getBoardsByProjectId(projectId, request.db)

    return reply.send(result)
  } catch (error) {
    if (error instanceof ReferenceError) {
      logger.error(
        { error, body: request.body },
        "getBoardsHandler: missing required query parameter projectId"
      )

      return httpError({
        reply,
        message: "Missing 'projectId' querystring parameter",
        code: StatusCodes.BAD_REQUEST,
      })
    }

    logger.error(
      { error, body: request.body },
      "getBoardsHandler: unexpected error"
    )

    return httpError({
      reply,
      message: "Failed to fetch the boards by specified projectId",
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function getBoardHandler(
  request: FastifyRequest<{
    Querystring: z.infer<typeof getBoardSchema.queryString>
    Params: z.infer<typeof getBoardSchema.params>
  }>,
  reply: FastifyReply
) {
  try {
    const { projectId } = request.query
    if (!projectId) {
      throw new ReferenceError(
        "getBoardHandler: Missing 'projectId' query string parameter"
      )
    }

    const result = await getBoardById(request.params.boardId, request.db)

    return reply.send(result)
  } catch (error) {
    if (error instanceof ReferenceError) {
      logger.error(
        { error, body: request.body },
        "getBoardHandler: missing required query parameter projectId"
      )

      return httpError({
        reply,
        message: "Missing 'projectId' querystring parameter",
        code: StatusCodes.BAD_REQUEST,
      })
    }

    logger.error(
      { error, body: request.body },
      "getBoardsHandler: unexpected error"
    )

    return httpError({
      reply,
      message: "Failed to fetch the boards by specified projectId",
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    })
  }
}

export async function deleteBoardHandler(
  request: FastifyRequest<{
    Querystring: z.infer<typeof deleteBoardSchema.queryString>
    Params: z.infer<typeof deleteBoardSchema.params>
  }>,
  reply: FastifyReply
) {
  try {
    const { projectId } = request.query
    if (!projectId) {
      throw new ReferenceError(
        "deleteBoardHandler: Missing 'projectId' query string parameter"
      )
    }

    const result = await deleteBoardById(request.params.boardId, request.db)

    return reply.send(result)
  } catch (error) {
    if (error instanceof ReferenceError) {
      logger.error(
        { error, body: request.body },
        "deleteBoardHandler: missing required query parameter projectId"
      )

      return httpError({
        reply,
        message: "Missing 'projectId' querystring parameter",
        code: StatusCodes.BAD_REQUEST,
      })
    }

    logger.error(
      { error, body: request.body },
      "getBoardsHandler: unexpected error"
    )

    return httpError({
      reply,
      message: "Failed to fetch the boards by specified projectId",
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    })
  }
}
