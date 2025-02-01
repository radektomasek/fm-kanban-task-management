import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { getColumnsSchema } from "./column.schema"
import { getColumnsByBoardId } from "./column.service"
import { logger } from "../../utils/logger"
import { httpError } from "../../utils/http"
import { StatusCodes } from "http-status-codes"

export async function getColumnsHandler(
  request: FastifyRequest<{
    Querystring: z.infer<typeof getColumnsSchema.queryString>
  }>,
  reply: FastifyReply
) {
  try {
    /**
     * @TODO: Incorporate projectId
     */
    const { boardId } = request.query

    const result = await getColumnsByBoardId(boardId, request.db)

    return reply.send(result)
  } catch (error) {
    logger.error({ error }, "getColumnsHandler: unexpected error")

    return httpError({
      reply,
      message: "Failed to fetch the columns by specified 'boardId'",
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    })
  }
}
