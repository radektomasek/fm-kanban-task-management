import { InferInsertModel, eq } from "drizzle-orm"
import { PgTransaction } from "drizzle-orm/pg-core"
import { boards } from "../../db/schema"
import { DB } from "../../db"
import { logger } from "../../utils/logger"

export async function createBoard(
  input: InferInsertModel<typeof boards>,
  trx: Parameters<Parameters<DB["transaction"]>[0]>[0]
) {
  try {
    const result = await trx.insert(boards).values(input).returning()

    return result[0]
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error({ message }, "createBoard: failed to insert data")
    throw error
  }
}

export async function updateBoardById(
  boardId: string,
  props: Partial<Pick<InferInsertModel<typeof boards>, "name" | "projectId">>,
  trx: Parameters<Parameters<DB["transaction"]>[0]>[0]
) {
  try {
    const result = await trx
      .update(boards)
      .set(props)
      .where(eq(boards.id, boardId))
      .returning()

    return result[0]
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error({ boardId, message }, "updateBoardById: failed to update data")
  }
}

export async function getBoardById(boardId: string, db: DB) {
  try {
    const result = await db.query.boards.findFirst({
      where: eq(boards.id, boardId),
    })

    return result
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error({ boardId, message }, "getBoardById: failed to get data")
  }
}

export async function getBoardsByProjectId(projectId: string, db: DB) {
  try {
    const result = await db.query.boards.findMany({
      where: eq(boards.projectId, projectId),
    })

    return result
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error(
      { projectId, message },
      "getBoardsByProjectId: failed to get data"
    )
  }
}

export async function deleteBoardById(boardId: string, db: DB) {
  try {
    const result = await db
      .delete(boards)
      .where(eq(boards.id, boardId))
      .returning()

    return result[0]
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    logger.error({ boardId, message }, "deleteBoardById: failed to delete data")
  }
}
